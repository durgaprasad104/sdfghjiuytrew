import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LicenseKeyManager from './pages/LicenseKeyManager';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes with Layout (navbar + footer) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />

        {/* Admin routes without Layout (no navbar/footer) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/license-keys" element={<LicenseKeyManager />} />
      </Routes>
    </Router>
  );
}

export default App;
