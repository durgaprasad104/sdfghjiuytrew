import React from 'react';
import { motion } from 'framer-motion';
import { Check, Rocket, Globe, Smartphone, Server, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Services = () => {
    const features = [
        {
            icon: <Globe className="w-6 h-6 text-blue-600" />,
            title: "Modern Web Design",
            description: "Stunning, responsive websites built with React and Tailwind CSS that look great on all devices."
        },
        {
            icon: <Rocket className="w-6 h-6 text-purple-600" />,
            title: "Fast Performance",
            description: "Optimized for speed and SEO to ensure your business ranks high on Google and loads instantly."
        },
        {
            icon: <Server className="w-6 h-6 text-green-600" />,
            title: "Free Hosting Setup",
            description: "We utilize powerful free platforms like Vercel and Netlify to eliminate monthly hosting costs."
        },
        {
            icon: <Smartphone className="w-6 h-6 text-pink-600" />,
            title: "Mobile First",
            description: "Designs that prioritize the mobile experience, ensuring you capture customers on the go."
        },
        {
            icon: <Shield className="w-6 h-6 text-indigo-600" />,
            title: "Secure & Reliable",
            description: "Built with security best practices using modern frameworks that are resilient to attacks."
        },
        {
            icon: <Zap className="w-6 h-6 text-orange-600" />,
            title: "Easy Maintenance",
            description: "Clean code structure that makes future updates and maintenance straightforward and cost-effective."
        }
    ];

    const pricing = [
        {
            name: "Starter",
            description: "Perfect for personal portfolios and small businesses.",
            price: "₹4,999",
            features: [
                "One Page Website (Landing Page)",
                "Mobile Responsive Design",
                "Contact Form Integration",
                "Social Media Links",
                "Free Hosting Setup",
                "1 Month Support"
            ],
            recommended: false
        },
        {
            name: "Professional",
            description: "Ideal for growing businesses needing more presence.",
            price: "₹9,999",
            features: [
                "Up to 5 Pages",
                "Advanced SEO Optimization",
                "Google Maps Integration",
                "Custom Animations",
                "Free Domain Connection",
                "3 Months Support"
            ],
            recommended: true
        },
        {
            name: "E-Commerce",
            description: "Start selling your products online today.",
            price: "₹19,999+",
            features: [
                "Full E-Commerce Functionality",
                "Product Management",
                "Payment Gateway Integration",
                "User Accounts",
                "Admin Dashboard",
                "6 Months Support"
            ],
            recommended: false
        }
    ];

    return (
        <div className="min-h-screen pb-20 pt-20 overflow-hidden relative">
            <SEO
                title="Web Services"
                description="Professional web development services including custom websites, e-commerce solutions, and final year projects."
            />

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
                        Transform Your Business
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-8 font-heading text-gray-900"
                    >
                        Launch Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Business Online
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-body leading-relaxed"
                    >
                        We build professional, high-converting websites using modern tools that save you money on hosting and maintenance.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/contact" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold font-heading hover:bg-gray-800 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Start Your Project <Rocket className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container-custom py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">Why Choose ProjectSuite?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto font-body text-lg">
                        We don't just build websites; we build digital assets that help your business grow without breaking the bank.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 rounded-2xl border border-white/40 group bg-white/60"
                        >
                            <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold font-heading text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                            <p className="text-gray-600 font-body leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="container-custom py-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">Transparent Pricing</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto font-body text-lg">
                        Choose a package that fits your needs. No hidden fees, just quality delivery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricing.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className={`relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${tier.recommended
                                ? 'bg-white shadow-2xl scale-105 border-2 border-blue-500 z-10'
                                : 'bg-white/60 backdrop-blur-md shadow-xl border border-white/50 hover:bg-white hover:scale-105'
                                }`}
                        >
                            {tier.recommended && (
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-bold font-heading tracking-wide">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="p-8 flex-grow">
                                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">{tier.name}</h3>
                                <p className="text-gray-500 mb-6 font-body text-sm">{tier.description}</p>
                                <div className="text-4xl font-bold text-gray-900 mb-6 font-heading tracking-tight">{tier.price}</div>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700 font-body">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 text-green-600" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-8 pt-0 mt-auto">
                                <Link
                                    to="/contact"
                                    className={`block w-full text-center py-4 rounded-xl font-bold font-heading transition-all shadow-lg hover:shadow-xl ${tier.recommended
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
