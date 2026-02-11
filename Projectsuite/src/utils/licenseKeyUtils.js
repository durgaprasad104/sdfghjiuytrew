import { supabase } from '../lib/supabase';

/**
 * Generate a unique license key in format: PROJ-XXXX-XXXX-XXXX
 * @returns {string} Generated license key
 */
export const generateLicenseKey = () => {
    const segments = 3;
    const segmentLength = 4;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const generateSegment = () => {
        let segment = '';
        for (let i = 0; i < segmentLength; i++) {
            segment += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return segment;
    };

    const keySegments = [];
    for (let i = 0; i < segments; i++) {
        keySegments.push(generateSegment());
    }

    return `PROJ-${keySegments.join('-')}`;
};

/**
 * Create a new license key in the database
 * @param {Object} keyData - License key data
 * @param {string} keyData.projectId - Project UUID
 * @param {string} keyData.keyType - Type: 'single_use', 'multi_use', 'time_limited', 'unlimited'
 * @param {number} keyData.maxUses - Maximum uses (default: 1)
 * @param {Date} keyData.expiresAt - Expiration date (optional)
 * @param {string} keyData.notes - Additional notes (optional)
 * @returns {Promise<Object>} Created license key or error
 */
export const createLicenseKey = async (keyData) => {
    try {
        const keyCode = generateLicenseKey();

        const { data, error } = await supabase
            .from('license_keys')
            .insert([{
                key_code: keyCode,
                project_id: keyData.projectId,
                key_type: keyData.keyType,
                max_uses: keyData.maxUses || 1,
                expires_at: keyData.expiresAt || null,
                notes: keyData.notes || null,
                is_active: true,
                current_uses: 0
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, data, keyCode };
    } catch (error) {
        console.error('Error creating license key:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Validate a license key
 * @param {string} keyCode - License key to validate
 * @param {string} projectId - Project UUID
 * @returns {Promise<Object>} Validation result
 */
export const validateLicenseKey = async (keyCode, projectId) => {
    try {
        // Fetch the key
        const { data: key, error } = await supabase
            .from('license_keys')
            .select('*')
            .eq('key_code', keyCode.toUpperCase())
            .eq('project_id', projectId)
            .eq('is_active', true)
            .single();

        if (error || !key) {
            return {
                valid: false,
                message: 'Invalid license key or key not found for this project.'
            };
        }

        // Check expiry
        if (key.expires_at && new Date(key.expires_at) < new Date()) {
            return {
                valid: false,
                message: 'This license key has expired.'
            };
        }

        // Check usage limit
        if (key.key_type !== 'unlimited' && key.current_uses >= key.max_uses) {
            return {
                valid: false,
                message: 'This license key has reached its usage limit.'
            };
        }

        return {
            valid: true,
            message: 'License key is valid!',
            key: key
        };
    } catch (error) {
        console.error('Error validating license key:', error);
        return {
            valid: false,
            message: 'An error occurred while validating the key.'
        };
    }
};

/**
 * Redeem a license key
 * @param {string} keyCode - License key to redeem
 * @param {string} projectId - Project UUID
 * @param {string} userEmail - User's email (optional)
 * @param {string} userIp - User's IP address (optional)
 * @returns {Promise<Object>} Redemption result
 */
export const redeemLicenseKey = async (keyCode, projectId, userEmail = null, userIp = null) => {
    try {
        // First validate the key
        const validation = await validateLicenseKey(keyCode, projectId);

        if (!validation.valid) {
            return { success: false, message: validation.message };
        }

        // Create redemption record
        const { data: redemption, error: redemptionError } = await supabase
            .from('license_redemptions')
            .insert([{
                license_key_id: validation.key.id,
                project_id: projectId,
                redeemed_by_email: userEmail,
                redeemed_by_ip: userIp,
                download_count: 0
            }])
            .select()
            .single();

        if (redemptionError) throw redemptionError;

        return {
            success: true,
            message: 'License key redeemed successfully!',
            redemption: redemption,
            key: validation.key
        };
    } catch (error) {
        console.error('Error redeeming license key:', error);
        return {
            success: false,
            message: 'An error occurred while redeeming the key.'
        };
    }
};

/**
 * Check if user has already redeemed a key for a project
 * @param {string} projectId - Project UUID
 * @param {string} userEmail - User's email
 * @returns {Promise<Object>} Redemption status
 */
export const checkUserRedemption = async (projectId, userEmail) => {
    try {
        const { data, error } = await supabase
            .from('license_redemptions')
            .select('*, license_keys(*)')
            .eq('project_id', projectId)
            .eq('redeemed_by_email', userEmail)
            .order('redeemed_at', { ascending: false })
            .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
            return {
                hasRedeemed: true,
                redemption: data[0]
            };
        }

        return { hasRedeemed: false };
    } catch (error) {
        console.error('Error checking user redemption:', error);
        return { hasRedeemed: false };
    }
};

/**
 * Track a download for a redemption
 * @param {string} redemptionId - Redemption UUID
 * @returns {Promise<Object>} Update result
 */
export const trackDownload = async (redemptionId) => {
    try {
        const { data, error } = await supabase
            .from('license_redemptions')
            .update({
                download_count: supabase.raw('download_count + 1'),
                last_download_at: new Date().toISOString()
            })
            .eq('id', redemptionId)
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error tracking download:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get all license keys (admin only)
 * @param {Object} filters - Optional filters
 * @returns {Promise<Object>} License keys
 */
export const getAllLicenseKeys = async (filters = {}) => {
    try {
        let query = supabase
            .from('license_keys')
            .select('*, projects(title)')
            .order('created_at', { ascending: false });

        if (filters.projectId) {
            query = query.eq('project_id', filters.projectId);
        }

        if (filters.keyType) {
            query = query.eq('key_type', filters.keyType);
        }

        if (filters.isActive !== undefined) {
            query = query.eq('is_active', filters.isActive);
        }

        const { data, error } = await query;

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching license keys:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Revoke/Activate a license key
 * @param {string} keyId - License key UUID
 * @param {boolean} isActive - New active status
 * @returns {Promise<Object>} Update result
 */
export const updateKeyStatus = async (keyId, isActive) => {
    try {
        const { data, error } = await supabase
            .from('license_keys')
            .update({ is_active: isActive })
            .eq('id', keyId)
            .select()
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        console.error('Error updating key status:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Get redemption analytics
 * @param {string} projectId - Optional project filter
 * @returns {Promise<Object>} Analytics data
 */
export const getRedemptionAnalytics = async (projectId = null) => {
    try {
        let query = supabase
            .from('license_redemptions')
            .select('*, license_keys(key_type), projects(title)');

        if (projectId) {
            query = query.eq('project_id', projectId);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Calculate analytics
        const analytics = {
            totalRedemptions: data.length,
            totalDownloads: data.reduce((sum, r) => sum + (r.download_count || 0), 0),
            recentRedemptions: data.slice(0, 10),
            redemptionsByType: data.reduce((acc, r) => {
                const type = r.license_keys?.key_type || 'unknown';
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {})
        };

        return { success: true, data: analytics };
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return { success: false, error: error.message };
    }
};
