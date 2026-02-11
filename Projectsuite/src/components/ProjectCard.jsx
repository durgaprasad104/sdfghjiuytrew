import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LicenseKeyModal from './LicenseKeyModal';

const ProjectCard = ({ project, index }) => {
    const [imageError, setImageError] = useState(false);
    const [showLicenseModal, setShowLicenseModal] = useState(false);

    const handleDemoClick = (e) => {
        // Check if demo is available
        const isDemoAvailable = project.demo_available !== false && project.demolink && project.demolink.trim() !== '';

        if (!isDemoAvailable) {
            e.preventDefault();
            alert('Live demo is not available for this project.');
        }
    };


    const handleSourceCodeClick = (e) => {
        e.preventDefault();
        console.log('Source code button clicked, opening modal for project:', project.id);
        setShowLicenseModal(true);
    };

    const handleLicenseSuccess = (result) => {
        console.log('License validated successfully:', result);
        // Redirect to source code after successful validation
        if (project.codelink) {
            console.log('Opening source code link:', project.codelink);
            window.open(project.codelink, '_blank');
        } else {
            console.warn('No codelink found for project:', project);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
            <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden aspect-[4/3]">
                    {!imageError ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                            <div className="text-center p-4">
                                <div className="mb-2 text-4xl">🖼️</div>
                                <p className="text-xs font-semibold">Image Not Available</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                        <span className="text-white text-sm font-bold font-heading tracking-wide bg-blue-600/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
                            {project.category}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 font-body leading-relaxed">
                        {project.description}
                    </p>

                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech, i) => (
                                <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium font-body rounded-md border border-gray-100">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                            <div className="flex space-x-2">
                                <a
                                    href={project.demolink || '#'}
                                    onClick={handleDemoClick}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all hover:scale-110"
                                    title={project.demo_available !== false && project.demolink ? "View Demo" : "Demo Not Available"}
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                                <button
                                    onClick={handleSourceCodeClick}
                                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all hover:scale-110"
                                    title="Get Source Code"
                                >
                                    <Github className="w-5 h-5" />
                                </button>
                            </div>
                            <Link to={`/projects/${project.id}`} className="text-sm font-bold font-heading text-blue-600 flex items-center gap-1 hover:gap-2 transition-all group/link">
                                View Details <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* License Key Modal */}
            <LicenseKeyModal
                isOpen={showLicenseModal}
                onClose={() => setShowLicenseModal(false)}
                projectId={project.id}
                projectTitle={project.title}
                onSuccess={handleLicenseSuccess}
            />
        </motion.div>
    );
};

export default ProjectCard;
