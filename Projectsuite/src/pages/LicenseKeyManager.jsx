import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Key, Plus, Search, Filter, Copy, CheckCircle, XCircle,
    Trash2, Calendar, Users, TrendingUp, Download, Eye, EyeOff, ArrowLeft, LogOut, LayoutDashboard
} from 'lucide-react';
import {
    createLicenseKey,
    getAllLicenseKeys,
    updateKeyStatus,
    getRedemptionAnalytics
} from '../utils/licenseKeyUtils';
import { supabase } from '../lib/supabase';

const LicenseKeyManager = () => {
    const navigate = useNavigate();
    const [keys, setKeys] = useState([]);
    const [projects, setProjects] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [copiedKey, setCopiedKey] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        projectId: '',
        keyType: 'single_use',
        maxUses: 1,
        expiresAt: '',
        notes: '',
        quantity: 1
    });

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin');
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Load projects
            const { data: projectsData } = await supabase
                .from('projects')
                .select('id, title')
                .order('title');
            setProjects(projectsData || []);

            // Load license keys
            const keysResult = await getAllLicenseKeys();
            if (keysResult.success) {
                setKeys(keysResult.data);
            }

            // Load analytics
            const analyticsResult = await getRedemptionAnalytics();
            if (analyticsResult.success) {
                setAnalytics(analyticsResult.data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateKey = async (e) => {
        e.preventDefault();

        const quantity = parseInt(formData.quantity) || 1;
        const createdKeys = [];

        for (let i = 0; i < quantity; i++) {
            const result = await createLicenseKey({
                projectId: formData.projectId,
                keyType: formData.keyType,
                maxUses: formData.keyType === 'unlimited' ? 999999 : parseInt(formData.maxUses),
                expiresAt: formData.expiresAt || null,
                notes: formData.notes
            });

            if (result.success) {
                createdKeys.push(result.keyCode);
            }
        }

        if (createdKeys.length > 0) {
            alert(`Successfully created ${createdKeys.length} license key(s)!`);
            setShowCreateForm(false);
            setFormData({
                projectId: '',
                keyType: 'single_use',
                maxUses: 1,
                expiresAt: '',
                notes: '',
                quantity: 1
            });
            loadData();
        }
    };

    const handleCopyKey = (keyCode) => {
        navigator.clipboard.writeText(keyCode);
        setCopiedKey(keyCode);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const handleToggleStatus = async (keyId, currentStatus) => {
        const result = await updateKeyStatus(keyId, !currentStatus);
        if (result.success) {
            loadData();
        }
    };

    const filteredKeys = keys.filter(key => {
        const matchesSearch = key.key_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            key.projects?.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || key.key_type === filterType;
        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'active' && key.is_active) ||
            (filterStatus === 'inactive' && !key.is_active);

        return matchesSearch && matchesType && matchesStatus;
    });

    const getKeyStatusBadge = (key) => {
        if (!key.is_active) {
            return <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Inactive</span>;
        }
        if (key.expires_at && new Date(key.expires_at) < new Date()) {
            return <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Expired</span>;
        }
        if (key.key_type !== 'unlimited' && key.current_uses >= key.max_uses) {
            return <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">Exhausted</span>;
        }
        return <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Active</span>;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Admin Navigation Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                                <Key className="w-7 h-7 text-blue-600" />
                                License Key Manager
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">Generate and manage license keys for project source code access</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Analytics Cards */}
                {analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Total Keys</p>
                                    <p className="text-3xl font-bold text-gray-900">{keys.length}</p>
                                </div>
                                <Key className="w-10 h-10 text-blue-600 opacity-20" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Active Keys</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {keys.filter(k => k.is_active).length}
                                    </p>
                                </div>
                                <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Redemptions</p>
                                    <p className="text-3xl font-bold text-purple-600">{analytics.totalRedemptions}</p>
                                </div>
                                <Users className="w-10 h-10 text-purple-600 opacity-20" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm mb-1">Downloads</p>
                                    <p className="text-3xl font-bold text-orange-600">{analytics.totalDownloads}</p>
                                </div>
                                <Download className="w-10 h-10 text-orange-600 opacity-20" />
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Actions Bar */}
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 w-full md:w-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by key code or project..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Types</option>
                                <option value="single_use">Single Use</option>
                                <option value="multi_use">Multi Use</option>
                                <option value="time_limited">Time Limited</option>
                                <option value="unlimited">Unlimited</option>
                            </select>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Create Button */}
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 w-full md:w-auto justify-center"
                        >
                            <Plus className="w-5 h-5" />
                            Create Key
                        </button>
                    </div>
                </div>

                {/* Create Form */}
                {showCreateForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6"
                    >
                        <h3 className="text-xl font-bold mb-4">Create New License Key</h3>
                        <form onSubmit={handleCreateKey} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                                <select
                                    required
                                    value={formData.projectId}
                                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a project</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.id}>{project.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Key Type</label>
                                <select
                                    value={formData.keyType}
                                    onChange={(e) => setFormData({ ...formData, keyType: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="single_use">Single Use</option>
                                    <option value="multi_use">Multi Use</option>
                                    <option value="time_limited">Time Limited</option>
                                    <option value="unlimited">Unlimited</option>
                                </select>
                            </div>

                            {formData.keyType === 'multi_use' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Uses</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.maxUses}
                                        onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            {formData.keyType === 'time_limited' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Expires At</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.expiresAt}
                                        onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="2"
                                    placeholder="Add any notes about this key..."
                                />
                            </div>

                            <div className="md:col-span-2 flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                                >
                                    Generate Key{formData.quantity > 1 ? 's' : ''}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Keys Table */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Key Code</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usage</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredKeys.map((key, index) => (
                                    <motion.tr
                                        key={key.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                                    {key.key_code}
                                                </code>
                                                <button
                                                    onClick={() => handleCopyKey(key.key_code)}
                                                    className="p-1 hover:bg-gray-200 rounded transition-all"
                                                    title="Copy to clipboard"
                                                >
                                                    {copiedKey === key.key_code ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {key.projects?.title || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">
                                                {key.key_type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {key.key_type === 'unlimited' ? '∞' : `${key.current_uses} / ${key.max_uses}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getKeyStatusBadge(key)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleStatus(key.id, key.is_active)}
                                                    className={`p-2 rounded-lg transition-all ${key.is_active
                                                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                    title={key.is_active ? 'Deactivate' : 'Activate'}
                                                >
                                                    {key.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredKeys.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <Key className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>No license keys found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LicenseKeyManager;
