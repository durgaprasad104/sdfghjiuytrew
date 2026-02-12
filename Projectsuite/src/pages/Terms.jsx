import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileCheck, AlertTriangle, Shield, Gavel, RefreshCw, Link2, Globe } from 'lucide-react';

const Terms = () => {
    const terms = [
        {
            icon: <FileCheck className="w-6 h-6" />,
            title: "1. Acceptance of Terms",
            content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this website."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "2. Use License",
            content: "Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
            list: [
                "Modify or copy the materials",
                "Use the materials for any commercial purpose",
                "Attempt to decompile or reverse engineer any software",
                "Remove any copyright or proprietary notations",
                "Transfer the materials to another person"
            ]
        },
        {
            icon: <AlertTriangle className="w-6 h-6" />,
            title: "3. Disclaimer",
            content: "The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties of merchantability, fitness for a particular purpose, or non-infringement."
        },
        {
            icon: <Gavel className="w-6 h-6" />,
            title: "4. Limitations",
            content: "In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on this website, even if we have been notified of the possibility of such damage."
        },
        {
            icon: <RefreshCw className="w-6 h-6" />,
            title: "5. Accuracy of Materials",
            content: "The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any materials are accurate, complete, or current. We may make changes at any time without notice."
        },
        {
            icon: <Link2 className="w-6 h-6" />,
            title: "6. Links",
            content: "We have not reviewed all sites linked to our website and are not responsible for their contents. The inclusion of any link does not imply endorsement. Use of any linked website is at the user's own risk."
        },
        {
            icon: <FileCheck className="w-6 h-6" />,
            title: "7. Modifications",
            content: "We may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "8. Governing Law",
            content: "These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
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
                        Legal Terms
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-8 font-heading text-gray-900"
                    >
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Service</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
                    >
                        Please read these terms carefully before using our services
                    </motion.p>
                    <p className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="container-custom py-20">
                {/* Important Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-indigo-600 rounded-r-2xl p-8 shadow-lg">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Important Notice</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms of Service constitute a legally binding agreement between you and us.
                                    By accessing or using our website, you acknowledge that you have read, understood,
                                    and agree to be bound by these terms.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Terms Sections */}
                <div className="max-w-5xl mx-auto space-y-6 mb-16">
                    {terms.map((term, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="p-8">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl text-white group-hover:scale-110 transition-transform flex-shrink-0">
                                        {term.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{term.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{term.content}</p>
                                        {term.list && (
                                            <div className="mt-4">
                                                <p className="text-gray-700 font-semibold mb-2">Under this license you may not:</p>
                                                <ul className="space-y-2">
                                                    {term.list.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-gray-600">
                                                            <div className="w-2 h-2 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                            <span className="leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl">
                                <FileCheck className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Questions About These Terms?</h2>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            If you have any questions about these Terms of Service, please contact us through our contact page.
                            We're here to clarify any concerns you may have.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Contact Us
                            </a>
                            <a
                                href="/privacy"
                                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                            >
                                View Privacy Policy
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
