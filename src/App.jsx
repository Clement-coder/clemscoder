import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Social from './components/Social';
import Email from './components/Email';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import GalleryPreview from './components/GalleryPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resume from './pages/Resume';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import PageProgress from './components/PageProgress';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-50 p-3 rounded-full"
          style={{
            background: 'rgba(17,34,64,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(100,255,218,0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(100,255,218,0.1)',
            color: '#64ffda',
          }}
          whileHover={{ scale: 1.1, boxShadow: '0 4px 24px rgba(100,255,218,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden" style={{ transform: 'translateZ(0)', isolation: 'isolate' }}>
      <Nav />
      <Social />
      <Email />
      <main className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GalleryPreview />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
