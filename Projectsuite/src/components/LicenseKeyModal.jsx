import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Key, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { validateLicenseKey, redeemLicenseKey } from '../utils/licenseKeyUtils';

const LicenseKeyModal = ({ isOpen, onClose, projectId, projectTitle, onSuccess, fullScreen = false }) => {
    const [keyCode, setKeyCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error', null
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!keyCode.trim()) {
            setStatus('error');
            setMessage('Please enter a license key.');
            return;
        }

        setLoading(true);
        setStatus(null);
        setMessage('');

        try {
            // Validate and redeem the key
            const result = await redeemLicenseKey(
                keyCode.trim().toUpperCase(),
                projectId,
                null, // userEmail - can be added if you have auth
                null  // userIp - can be added if needed
            );

            if (result.success) {
                setStatus('success');
                setMessage(result.message);

                // Call success callback after a short delay
                setTimeout(() => {
                    onSuccess && onSuccess(result);
                    handleClose();
                }, 2000);
            } else {
                setStatus('error');
                setMessage(result.message);
            }
        } catch (error) {
            setStatus('error');
            setMessage('An unexpected error occurred. Please try again.');
            console.error('License validation error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setKeyCode('');
        setStatus(null);
        setMessage('');
        setLoading(false);
        onClose();
    };

    const formatKeyInput = (value) => {
        // Auto-format as user types: PROJ-XXXX-XXXX-XXXX
        const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        const parts = [];

        if (cleaned.startsWith('PROJ')) {
            parts.push('PROJ');
            const rest = cleaned.slice(4);
            for (let i = 0; i < rest.length; i += 4) {
                parts.push(rest.slice(i, i + 4));
            }
        } else {
            for (let i = 0; i < cleaned.length; i += 4) {
                parts.push(cleaned.slice(i, i + 4));
            }
        }

        return parts.join('-');
    };

    const handleKeyChange = (e) => {
        const formatted = formatKeyInput(e.target.value);
        setKeyCode(formatted);
        setStatus(null);
        setMessage('');
    };

    if (!isOpen) return null;

    // Full screen modal wrapper
    if (fullScreen) {
        return (
            <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
                >
                    {renderModalContent()}
                </motion.div>
            </div>
        );
    }

    // Inline popover (for project cards)
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            className="absolute inset-0 z-10 bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-blue-500 overflow-auto"
        >
            {renderModalContent()}
        </motion.div>
    );

    function renderModalContent() {
        return (
            <>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-1.5 text-white/90 hover:text-white hover:bg-white/20 rounded-full transition-all z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Key className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold font-heading">Enter License Key</h2>
                    </div>
                    <p className="text-blue-100 text-xs">
                        Access source code for <span className="font-semibold">{projectTitle}</span>
                    </p>
                </div>

                {/* Content */}
                <div className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Input Field */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                License Key
                            </label>
                            <input
                                type="text"
                                value={keyCode}
                                onChange={handleKeyChange}
                                placeholder="PROJ-XXXX-XXXX-XXXX"
                                disabled={loading || status === 'success'}
                                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono text-sm tracking-wider disabled:bg-gray-50 disabled:cursor-not-allowed"
                                maxLength={19}
                            />
                        </div>

                        {/* Status Message */}
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-2 p-2.5 rounded-lg text-xs ${status === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}
                            >
                                {status === 'success' ? (
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                )}
                                <p className="font-medium">{message}</p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || status === 'success' || !keyCode.trim()}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Validating...
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle className="w-4 h-4" />
                                    Validated!
                                </>
                            ) : (
                                'Validate License Key'
                            )}
                        </button>
                    </form>

                    {/* Info Text */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center leading-relaxed">
                            Don't have a license key?{' '}
                            <a href="/contact" className="text-blue-600 hover:underline font-medium">
                                Contact us
                            </a>
                        </p>
                    </div>
                </div>
            </>
        );
    }
};

export default LicenseKeyModal;
