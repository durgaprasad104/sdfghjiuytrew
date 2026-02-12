import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, Globe, FileText, AlertCircle } from 'lucide-react';

const Privacy = () => {
    const sections = [
        {
            icon: <Database className="w-6 h-6" />,
            title: "Information We Collect",
            content: [
                "Contact information (name, email address) when you submit a contact form",
                "Usage data and analytics to improve our website",
                "Cookies and similar tracking technologies for better user experience"
            ]
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "How We Use Your Information",
            content: [
                "Responding to your inquiries and requests",
                "Improving our website and services",
                "Sending updates and promotional materials (with your consent)",
                "Analyzing website usage and performance"
            ]
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Data Security",
            content: [
                "We implement appropriate security measures to protect your personal information",
                "Protection from unauthorized access, alteration, disclosure, or destruction",
                "Regular security audits and updates to our systems"
            ]
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Third-Party Services",
            content: [
                "We may use third-party services for analytics and hosting",
                "These services have their own privacy policies",
                "We encourage you to review their policies"
            ]
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "Your Rights",
            content: [
                "Access your personal information",
                "Correct inaccurate data",
                "Request deletion of your data",
                "Opt-out of marketing communications"
            ]
        }
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
                        Your Privacy Matters
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-8 font-heading text-gray-900"
                    >
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
                    >
                        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                    </motion.p>
                    <p className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="container-custom py-20">
                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-l-4 border-blue-600 rounded-r-2xl p-8 shadow-lg">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Introduction</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    This Privacy Policy describes how we collect, use, and handle your information when you
                                    visit our website and use our services. We are committed to protecting your privacy and
                                    ensuring your data is handled responsibly.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Sections */}
                <div className="max-w-5xl mx-auto space-y-8 mb-16">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                                        {section.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {section.content.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600">
                                            <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Questions About Privacy?</h2>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            If you have any questions about this Privacy Policy or how we handle your data,
                            please don't hesitate to contact us. We're here to help and ensure your privacy concerns are addressed.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Contact Us
                            </a>
                            <a
                                href="/terms"
                                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                            >
                                View Terms of Service
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
