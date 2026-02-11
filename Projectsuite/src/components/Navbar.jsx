import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo_crop.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-2' : 'bg-transparent py-6'}`}>
            <div className="container-custom">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img src={logo} alt="ProjectSuite" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md" />
                        <span className="text-2xl font-bold font-heading text-gray-900 group-hover:text-blue-600 transition-colors">
                            Project<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Suite</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium font-heading tracking-wide transition-all duration-300 hover:text-blue-600 relative group ${isActive(link.path) ? 'text-blue-600' : 'text-gray-700'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full ${isActive(link.path) ? 'w-full' : ''}`}></span>
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-medium font-heading hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 border border-transparent hover:border-blue-500/30"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-lg transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden glass border-t border-white/20 overflow-hidden"
                    >
                        <div className="container-custom py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium font-heading transition-all ${isActive(link.path)
                                        ? 'bg-blue-50/80 text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium font-heading hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
