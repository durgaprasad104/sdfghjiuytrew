import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { projectCategories } from '../data/projects';
import { LogOut, Plus, Trash2, FolderOpen, Edit, X, Key } from 'lucide-react';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(projectCategories[1]);
    const [customCategory, setCustomCategory] = useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [demoLink, setDemoLink] = useState('');
    const [demoAvailable, setDemoAvailable] = useState(true);
    const [codeLink, setCodeLink] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoadingProjects(false);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
                fetchProjects();
            } else {
                navigate('/admin');
            }
        };

        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUser(session.user);
                fetchProjects();
            } else {
                navigate('/admin');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = imageUrl;

            if (image) {
                // Create unique filename using timestamp and sanitized original name
                const timestamp = Date.now();
                const sanitizedName = image.name.replace(/[^a-zA-Z0-9.]/g, '_');
                const fileName = `${timestamp}_${sanitizedName}`;

                console.log('Uploading image:', fileName);

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('project-images')
                    .upload(fileName, image, {
                        cacheControl: '3600',
                        upsert: false // Prevent overwriting if file exists
                    });

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    // If file already exists, use the existing file
                    if (uploadError.message.includes('already exists')) {
                        console.log('File already exists, using existing file');
                    } else {
                        alert(`Image upload failed: ${uploadError.message}\n\nTip: Use the Image URL field instead to paste a direct image link.`);
                        throw uploadError;
                    }
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('project-images')
                    .getPublicUrl(fileName);

                console.log('Image uploaded successfully:', publicUrl);
                finalImageUrl = publicUrl;
            }

            const techStackArray = techStack.split(',').map(item => item.trim());

            // Use custom category if "Other" is selected
            const finalCategory = category === 'Other' ? customCategory : category;

            const { error: insertError } = await supabase
                .from('projects')
                .insert([
                    {
                        title,
                        category: finalCategory,
                        description,
                        techstack: techStackArray,
                        image: finalImageUrl,
                        demolink: demoAvailable ? demoLink : null,
                        codelink: codeLink
                    }
                ]);

            if (insertError) throw insertError;

            alert('Project added successfully!');
            setTitle('');
            setDescription('');
            setTechStack('');
            setDemoLink('');
            setDemoAvailable(true);
            setCodeLink('');
            setImage(null);
            setImageUrl('');
            setCustomCategory('');

            // Refresh projects list
            fetchProjects();
        } catch (error) {
            console.error("Error adding project: ", error);
            alert(`Error adding project: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (project) => {
        setEditingProject(project);
        setTitle(project.title);
        setCategory(project.category);
        setDescription(project.description);
        setTechStack(Array.isArray(project.techstack) ? project.techstack.join(', ') : '');
        setDemoLink(project.demolink || '');
        setDemoAvailable(!!project.demolink);
        setCodeLink(project.codelink || '');
        setImageUrl(project.image || '');
        setImage(null);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingProject(null);
        setTitle('');
        setCategory(projectCategories[1]);
        setCustomCategory('');
        setDescription('');
        setTechStack('');
        setDemoLink('');
        setDemoAvailable(true);
        setCodeLink('');
        setImage(null);
        setImageUrl('');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalImageUrl = imageUrl;

            if (image) {
                // Create unique filename using timestamp and sanitized original name
                const timestamp = Date.now();
                const sanitizedName = image.name.replace(/[^a-zA-Z0-9.]/g, '_');
                const fileName = `${timestamp}_${sanitizedName}`;

                console.log('Uploading image:', fileName);

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('project-images')
                    .upload(fileName, image, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    if (uploadError.message.includes('already exists')) {
                        console.log('File already exists, using existing file');
                    } else {
                        alert(`Image upload failed: ${uploadError.message}\n\nTip: Use the Image URL field instead to paste a direct image link.`);
                        throw uploadError;
                    }
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('project-images')
                    .getPublicUrl(fileName);

                console.log('Image uploaded successfully:', publicUrl);
                finalImageUrl = publicUrl;
            }

            const techStackArray = techStack.split(',').map(item => item.trim());
            const finalCategory = category === 'Other' ? customCategory : category;

            const { error: updateError } = await supabase
                .from('projects')
                .update({
                    title,
                    category: finalCategory,
                    description,
                    techstack: techStackArray,
                    image: finalImageUrl,
                    demolink: demoAvailable ? demoLink : null,
                    codelink: codeLink
                })
                .eq('id', editingProject.id);

            if (updateError) throw updateError;

            alert('Project updated successfully!');
            cancelEdit();
            fetchProjects();
        } catch (error) {
            console.error("Error updating project: ", error);
            alert(`Error updating project: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (projectId) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', projectId);

            if (error) throw error;

            alert('Project deleted successfully!');
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
            alert(`Error deleting project: ${error.message}`);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin');
    };

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Admin Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage your project portfolio</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to="/admin/license-keys"
                                className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                            >
                                <Key className="w-5 h-5" />
                                License Keys
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

                {/* Statistics Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Projects */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Total Projects</h3>
                            <FolderOpen className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-4xl font-bold">{projects.length}</p>
                        <p className="text-sm opacity-75 mt-1">All categories</p>
                    </div>

                    {/* Projects by Category */}
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Categories</h3>
                            <Plus className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-4xl font-bold">
                            {new Set(projects.map(p => p.category)).size}
                        </p>
                        <p className="text-sm opacity-75 mt-1">Unique project types</p>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium opacity-90">Latest Addition</h3>
                            <Edit className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-2xl font-bold truncate">
                            {projects.length > 0 ? projects[0].title : 'No projects'}
                        </p>
                        <p className="text-sm opacity-75 mt-1">
                            {projects.length > 0 ? new Date(projects[0].created_at).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Quick Insights */}
                {projects.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Insights</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(
                                projects.reduce((acc, project) => {
                                    acc[project.category] = (acc[project.category] || 0) + 1;
                                    return acc;
                                }, {})
                            )
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 4)
                                .map(([category, count]) => (
                                    <div key={category} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                                        <p className="text-2xl font-bold text-gray-900">{count}</p>
                                        <p className="text-sm text-gray-600 truncate">{category}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Add Project Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            {editingProject ? (
                                <>
                                    <Edit className="w-6 h-6 text-purple-600" />
                                    Edit Project
                                </>
                            ) : (
                                <>
                                    <Plus className="w-6 h-6 text-blue-600" />
                                    Add New Project
                                </>
                            )}
                        </h2>
                        {editingProject && (
                            <button
                                onClick={cancelEdit}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </button>
                        )}
                    </div>

                    <form onSubmit={editingProject ? handleUpdate : handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter project title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            >
                                {projectCategories.filter(c => c !== 'All').map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                                <option value="Other">Other (Custom)</option>
                            </select>
                        </div>

                        {/* Custom Category Input */}
                        {category === 'Other' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Category Name</label>
                                <input
                                    type="text"
                                    value={customCategory}
                                    onChange={(e) => setCustomCategory(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g., Machine Learning, Blockchain, etc."
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Describe your project..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                value={techStack}
                                onChange={(e) => setTechStack(e.target.value)}
                                placeholder="React, Node.js, MongoDB"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Demo Link</label>
                                <div className="flex items-center gap-3 mb-2">
                                    <input
                                        type="checkbox"
                                        id="demoAvailable"
                                        checked={demoAvailable}
                                        onChange={(e) => setDemoAvailable(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="demoAvailable" className="text-sm text-gray-600">
                                        Live demo is available
                                    </label>
                                </div>
                                {demoAvailable && (
                                    <input
                                        type="url"
                                        value={demoLink}
                                        onChange={(e) => setDemoLink(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                )}
                                {!demoAvailable && (
                                    <div className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-sm">
                                        Demo not available
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Code Link</label>
                                <input
                                    type="url"
                                    value={codeLink}
                                    onChange={(e) => setCodeLink(e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mt-8"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Image</label>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Image URL (optional)</label>
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <div className="text-center text-xs text-gray-500">OR</div>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Adding Project...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Add Project
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Projects List */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <FolderOpen className="w-6 h-6 text-blue-600" />
                        Manage Projects
                    </h2>

                    {loadingProjects ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-12">
                            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No projects yet. Add your first project above!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all hover:border-blue-300">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                                                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full">
                                                    {project.category}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(project.techstack || []).map((tech, i) => (
                                                    <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEdit(project)}
                                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm hover:shadow"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
