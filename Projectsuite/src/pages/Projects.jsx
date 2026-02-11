import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { Search } from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [projectsList, setProjectsList] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data: dbProjects, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Normalize database column names to camelCase for component compatibility
                const normalizedProjects = (dbProjects || []).map(project => ({
                    ...project,
                    techStack: project.techstack || project.techStack || [],
                    demoLink: project.demolink || project.demoLink,
                    codeLink: project.codelink || project.codeLink
                }));

                // Only use database projects
                setProjectsList(normalizedProjects);

                // Extract unique categories from projects
                const uniqueCategories = ['All', ...new Set(normalizedProjects.map(p => p.category).filter(Boolean))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjectsList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projectsList.filter(project => {
        const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen py-24 relative overflow-hidden">
            <SEO
                title="Explore Projects"
                description="Browse our collection of final year B.Tech projects including Web Dev, AI/ML, and IoT applications."
            />

            {/* Background elements to ensure visibility if body bg is covered */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50"></div>

            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold font-heading mb-6 tracking-tight"
                    >
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Innovation</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 font-body leading-relaxed"
                    >
                        Discover cutting-edge projects built with modern technologies. From AI to Web3, find your inspiration here.
                    </motion.p>
                </div>

                {/* Filter and Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 glass p-2 rounded-2xl shadow-lg border border-white/40"
                >
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto p-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold font-heading transition-all duration-300 ${activeCategory === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105'
                                    : 'bg-white/50 text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80 p-2">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-white/60 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 focus:bg-white transition-all font-body text-gray-800 placeholder-gray-400 backdrop-blur-sm"
                        />
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 glass-card rounded-3xl"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">No projects found</h3>
                        <p className="text-gray-500 font-body">Try adjusting your search or filter to find what you're looking for.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Projects;
