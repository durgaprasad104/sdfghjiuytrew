import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowRight, Heart, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo_crop.png';

// Newsletter Form Component
const NewsletterForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    setMessage({ type: 'error', text: 'This email is already subscribed!' });
                } else {
                    throw new Error(data.message || 'Failed to subscribe');
                }
            } else {
                setMessage({ type: 'success', text: 'Successfully subscribed! Check your email.' });
                setEmail('');
            }

        } catch (error) {
            console.error('Subscription error:', error);
            setMessage({ type: 'error', text: error.message || 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 5000);
        }
    };

    return (
        <div>
            <form className="space-y-2" onSubmit={handleSubmit}>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-2 bg-white/60 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all font-body text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-gray-900 text-white rounded-lg font-bold font-heading text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                    {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
            </form>

            {/* Toast Notification */}
            {message && (
                <div className={`mt-2 p-2 rounded-lg text-xs font-body flex items-center gap-2 ${message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {message.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    ) : (
                        <XCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span>{message.text}</span>
                </div>
            )}
        </div>
    );
};


const Footer = () => {
    return (
        <footer className="relative mt-24 border-t border-white/40 bg-white/40 backdrop-blur-lg">
            {/* Decorative top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

            <div className="container-custom pt-10 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2 group w-fit">
                            <img src={logo} alt="ProjectsSuite" className="h-8 w-auto" />
                            <span className="text-xl font-bold font-heading text-gray-900 group-hover:text-blue-600 transition-colors">
                                Projects<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Suite</span>
                            </span>
                        </Link>
                        <p className="text-gray-600 font-body leading-relaxed text-sm">
                            Your #1 destination for Major & Minor Student Projects. We provide complete source codes and documentation. We also offer custom web development and software solutions.
                        </p>
                        <div className="flex space-x-3">
                            <SocialIcon icon={<Github className="w-5 h-5" />} href="#" color="hover:text-gray-900 hover:bg-gray-200" />
                            <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" color="hover:text-blue-700 hover:bg-blue-50" />
                            <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" color="hover:text-blue-400 hover:bg-blue-50" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold font-heading text-gray-900 mb-4 text-sm">Platform</h3>
                        <ul className="space-y-2 font-body text-sm">
                            <FooterLink to="/projects" label="Browse Projects" />
                            <FooterLink to="/services" label="Web Services" />
                            <FooterLink to="/projects" label="Source Codes" />
                            <FooterLink to="/services" label="Pricing Plans" />
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold font-heading text-gray-900 mb-4 text-sm">Company</h3>
                        <ul className="space-y-2 font-body text-sm">
                            <FooterLink to="/about" label="About Us" />
                            <FooterLink to="/contact" label="Contact Support" />
                            <FooterLink to="/privacy" label="Privacy Policy" />
                            <FooterLink to="/terms" label="Terms of Service" />
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold font-heading text-gray-900 mb-4 text-sm">Stay Updated</h3>
                        <p className="text-gray-600 text-sm mb-3 font-body">
                            Subscribe to get the latest project drops and tech news.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-4 border-t border-gray-200/60 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-500 font-body">
                    <div>
                        &copy; {new Date().getFullYear()} ProjectsSuite. All rights reserved.
                    </div>
                    <div className="flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> in India
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, href, color }) => (
    <a
        href={href}
        className={`w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 transition-all duration-300 hover:scale-110 hover:shadow-md ${color}`}
    >
        {icon}
    </a>
);

const FooterLink = ({ to, label }) => (
    <li>
        <Link to={to} className="text-gray-600 hover:text-blue-600 transition-colors hover:translate-x-1 inline-block">
            {label}
        </Link>
    </li>
);

export default Footer;
