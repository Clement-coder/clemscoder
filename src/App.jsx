import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import ScrollToTop from './components/ScrollToTop';
import Resume from './pages/Resume';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import PageProgress from './components/PageProgress';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
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
