import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Globe, Zap, Cpu, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-40 overflow-hidden">
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black opacity-0"></div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-white/20 text-sm font-semibold text-blue-700 mb-8 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        ProjectSuite 2.0 is Live
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold font-heading tracking-tight text-gray-900 mb-8 leading-[1.1]">
                        Build Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                            Digital Future
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-body leading-relaxed">
                        The ultimate platform for building innovative student projects and developing professional business websites.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5"
                    >
                        <Link to="/projects" className="group relative px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold font-heading overflow-hidden shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-1">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center gap-3">
                                <Code className="w-5 h-5" />
                                <span>Browse Projects</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link to="/services" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-semibold font-heading hover:bg-gray-50 transition-all flex items-center gap-3 hover:border-gray-300 shadow-sm hover:shadow-md hover:-translate-y-1">
                            <Globe className="w-5 h-5 text-gray-500" />
                            <span>Web Services</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Glass Cards Feature Highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        {
                            title: "Student Zone",
                            description: "Premium source code & documentation for final year projects.",
                            icon: <Cpu className="w-8 h-8 text-blue-500" />,
                            color: "group-hover:text-blue-600"
                        },
                        {
                            title: "Business Hub",
                            description: "High-performance websites designed to scale your business.",
                            icon: <Rocket className="w-8 h-8 text-purple-500" />,
                            color: "group-hover:text-purple-600"
                        },
                        {
                            title: "Free Tools",
                            description: "Leveraging open-source power to keep your costs at zero.",
                            icon: <Zap className="w-8 h-8 text-pink-500" />,
                            color: "group-hover:text-pink-600"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="group relative bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 text-left">
                                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className={`text-2xl font-bold text-gray-900 mb-3 font-heading transition-colors ${feature.color}`}>{feature.title}</h3>
                                <p className="text-gray-600 font-body leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
