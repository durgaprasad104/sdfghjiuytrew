import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Code, Palette, Cloud, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const features = [
        {
            icon: <Code className="w-6 h-6" />,
            title: "Complete Project Development",
            description: "Full project setup from scratch to deployment with clean, documented code"
        },
        {
            icon: <Palette className="w-6 h-6" />,
            title: "Documentation Support",
            description: "Optional comprehensive documentation perfect for academic submissions and presentations"
        },
        {
            icon: <Cloud className="w-6 h-6" />,
            title: "Smart Tool Integration",
            description: "Free tools (Netlify, Vercel, Supabase) and paid options to fit your budget"
        }
    ];

    const values = [
        { icon: <Target className="w-8 h-8" />, title: "Excellence", description: "We deliver nothing but the best" },
        { icon: <Lightbulb className="w-8 h-8" />, title: "Innovation", description: "Pushing boundaries with creativity" },
        { icon: <Users className="w-8 h-8" />, title: "Collaboration", description: "Working together to achieve more" }
    ];

    return (
        <div className="min-h-screen pb-20 pt-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -z-10 w-[50vw] h-[50vw] bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[50vw] h-[50vw] bg-purple-400/20 rounded-full blur-3xl"></div>

            {/* Hero Section */}
            <div className="relative py-20">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-semibold font-heading text-sm"
                    >
                        Our Story
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-8 font-heading text-gray-900"
                    >
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Us</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Empowering students with innovative project solutions delivered fast, with comprehensive documentation
                    </motion.p>
                </div>
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
                            To deliver exceptional student projects quickly and affordably using smart technology choices.
                            We specialize in building complete project solutions—from scratch to deployment—using both free
                            and paid tools tailored to your requirements and budget.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Whether you need a simple website or a complex application, we provide full source code,
                            internet deployment, and optional comprehensive documentation perfect for academic submissions.
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Get your project delivered in 3-7 days with source code, deployment, and optional documentation support.
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
