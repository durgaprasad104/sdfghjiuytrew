import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <div>
            <SEO
                title="Home"
                description="Showcasing innovative student projects and offering professional web development services for businesses."
            />
            <Hero />
            {/* Additional sections (Featured Projects, Services Preview) will go here */}
        </div>
    );
};

export default Home;
