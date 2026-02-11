import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Check } from 'lucide-react';
import { projects as staticProjects } from '../data/projects';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import LicenseKeyModal from '../components/LicenseKeyModal';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLicenseModal, setShowLicenseModal] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);

            // 1. Try Supabase first
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (!error && data) {
                    // Normalize database column names to camelCase
                    const normalizedProject = {
                        ...data,
                        techStack: data.techstack || data.techStack || [],
                        demoLink: data.demolink || data.demoLink,
                        codeLink: data.codelink || data.codeLink,
                        demo_available: data.demo_available !== false
                    };
                    setProject(normalizedProject);
                    setLoading(false);
                    return;
                }
            } catch (error) {
                console.error("Error fetching from Supabase:", error);
            }

            // 2. Fallback to static projects - convert both IDs to strings for comparison
            const staticProject = staticProjects.find(p => String(p.id) === String(id));
            if (staticProject) {
                setProject(staticProject);
            }

            setLoading(false);
        };

        fetchProject();
    }, [id]);

    const handleLicenseSuccess = (result) => {
        console.log('License validated successfully:', result);
        // Redirect to source code after successful validation
        if (project.codeLink) {
            console.log('Opening source code link:', project.codeLink);
            window.open(project.codeLink, '_blank');
        } else {
            console.warn('No codeLink found for project:', project);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!project) {
        return (
            <div className="container-custom py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Project not found</h2>
                <Link to="/projects" className="text-blue-600 hover:underline">Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={project.title}
                description={`Details about ${project.title}: ${project.description.substring(0, 150)}...`}
            />
            {/* Header Image */}
            <div className="relative h-64 md:h-96 w-full group">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay for Text Visibility (dark at bottom, light at top for navbar) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent h-24"></div>

                <div className="absolute inset-0 flex items-end">
                    <div className="container-custom pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white"
                        >
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" /> Back to Projects
                            </button>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                    {project.category}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">About the Project</h2>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            {project.description}
                            {/* Add more lorem ipsum or detailed text here if needed for real projects */}
                            <br /><br />
                            This project demonstrates the practical application of modern web technologies to solve real-world problems. It includes features such as user authentication, real-time data processing, and responsive design.
                        </p>

                        <h3 className="text-xl font-bold mb-4 text-gray-900">Key Features</h3>
                        <ul className="space-y-3 mb-8">
                            {[
                                "Responsive and User-Friendly Interface",
                                "Secure Authentication & Authorization",
                                "Real-time Data Updates",
                                "Scalable Architecture",
                                "Comprehensive Documentation"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600">
                                    <div className="bg-green-100 p-1 rounded-full">
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Tech Stack */}
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.techStack.map((tech, i) => (
                                <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold mb-6 text-gray-900">Project Resources</h3>

                            <div className="space-y-4">
                                <a
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    View Live Demo
                                </a>

                                <button
                                    onClick={() => setShowLicenseModal(true)}
                                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors font-medium"
                                >
                                    <Github className="w-5 h-5" />
                                    Get Source Code
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-4">
                                    Need a similar project or customization? We can help you build it.
                                </p>
                                <Link to="/contact" className="text-blue-600 font-semibold hover:underline">
                                    Contact Us for Customization
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* License Key Modal */}
            <LicenseKeyModal
                isOpen={showLicenseModal}
                onClose={() => setShowLicenseModal(false)}
                projectId={project?.id}
                projectTitle={project?.title}
                onSuccess={handleLicenseSuccess}
                fullScreen={true}
            />
        </div>
    );
};

export default ProjectDetail;
