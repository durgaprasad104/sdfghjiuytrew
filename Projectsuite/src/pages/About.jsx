import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Code, Palette, Cloud, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const features = [
        {
            icon: <Code className="w-6 h-6" />,
            title: "Full-Stack Development",
            description: "End-to-end web and mobile solutions using cutting-edge technologies"
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "UI/UX Design",
            description: "Beautiful, intuitive interfaces that users love to interact with"
        },
        {
            icon: <Cloud className="w-6 h-6" />,
            title: "Cloud Solutions",
            description: "Scalable deployment and infrastructure management"
        }
    ];

    const values = [
        { icon: <Target className="w-8 h-8" />, title: "Excellence", description: "We deliver nothing but the best" },
        { icon: <Lightbulb className="w-8 h-8" />, title: "Innovation", description: "Pushing boundaries with creativity" },
        { icon: <Users className="w-8 h-8" />, title: "Collaboration", description: "Working together to achieve more" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="absolute inset-0 bg-grid-white/10"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container-custom relative z-10"
                >
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-6"
                        >
                            <Users className="w-12 h-12" />
                        </motion.div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">About Us</h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            We're a passionate team of developers and designers crafting digital experiences that make a difference
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="container-custom py-20">
                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-4">
                            To deliver high-quality, scalable, and user-friendly digital products that solve real-world problems
                            and exceed client expectations. We believe in continuous learning and staying up-to-date with the
                            latest technologies to provide cutting-edge solutions.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Every project we undertake is an opportunity to push boundaries, challenge conventions, and create
                            something truly remarkable.
                        </p>
                    </div>
                </motion.div>

                {/* What We Do */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive digital solutions tailored to your needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative">
                                    <div className="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Our Values */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-xl text-gray-600">The principles that guide everything we do</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center hover:scale-105 transition-transform"
                            >
                                <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-xl mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                                <p className="text-blue-100">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Have a project in mind? We'd love to hear about it and discuss how we can help bring your vision to life.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:gap-3 shadow-lg"
                        >
                            Get In Touch <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
