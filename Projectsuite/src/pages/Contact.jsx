import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        serviceType: 'Business Website',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Form Submitted:', formData);
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', serviceType: 'Business Website', message: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            <SEO
                title="Contact Us"
                description="Get in touch with ProjectSuite for your web development needs or project inquiries."
            />

            {/* Background blobs */}
            <div className="absolute top-[20%] left-[10%] -z-10 w-[30vw] h-[30vw] bg-purple-400/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-[20%] right-[10%] -z-10 w-[30vw] h-[30vw] bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

            <div className="container-custom">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6"
                    >
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 max-w-2xl mx-auto font-body leading-relaxed"
                    >
                        Whether you need a custom project or a professional business website, we're here to turn your ideas into reality.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="glass-card p-8 rounded-3xl border border-white/50 bg-white/40">
                            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-8">Contact Information</h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 font-heading text-lg">Email Us</h4>
                                        <p className="text-gray-600 font-body">contact@projectsuite.com</p>
                                        <p className="text-sm text-gray-400 mt-1 font-body">We typically reply within 24 hours.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="bg-purple-100 p-4 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 font-heading text-lg">Call Us</h4>
                                        <p className="text-gray-600 font-body">+91 98765 43210</p>
                                        <p className="text-sm text-gray-400 mt-1 font-body">Mon-Fri from 9am to 6pm.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="bg-pink-100 p-4 rounded-2xl text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 font-heading text-lg">Location</h4>
                                        <p className="text-gray-600 font-body">Hyderabad, India</p>
                                        <p className="text-sm text-gray-400 mt-1 font-body">Serving clients globally.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4 font-heading">Ready to start?</h3>
                                <p className="text-blue-50 mb-8 font-body text-lg leading-relaxed">
                                    Get a free consultation for your project or business website today. We're excited to work with you!
                                </p>
                                <a href="mailto:contact@projectsuite.com" className="inline-block px-6 py-3 bg-white text-blue-600 rounded-xl font-bold font-heading hover:bg-blue-50 transition-colors shadow-lg">
                                    Book a Call
                                </a>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl" />
                            <div className="absolute -left-10 -top-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl" />
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-10 rounded-3xl border border-white/60 bg-white/50 backdrop-blur-xl shadow-2xl"
                    >
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <Check className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3 font-heading">Message Sent!</h3>
                                <p className="text-gray-600 mb-10 font-body text-lg">
                                    Thank you for reaching out. We'll get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-bold font-heading shadow-lg"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 font-heading">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-body text-gray-900 placeholder-gray-400"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 font-heading">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-body text-gray-900 placeholder-gray-400"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="serviceType" className="block text-sm font-bold text-gray-700 mb-2 font-heading">I'm interested in</label>
                                    <div className="relative">
                                        <select
                                            id="serviceType"
                                            name="serviceType"
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-body text-gray-900 appearance-none cursor-pointer"
                                        >
                                            <option value="Business Website">Business Website</option>
                                            <option value="Student Project">Student Project Help</option>
                                            <option value="Custom Software">Custom Software</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2 font-heading">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none font-body text-gray-900 placeholder-gray-400"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 font-heading ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/30'
                                        }`}
                                >
                                    {isSubmitting ? 'Sending...' : (
                                        <>
                                            Send Message <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
