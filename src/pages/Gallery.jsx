import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowLeft, Play, ZoomIn } from 'lucide-react';
import { galleryItems } from '../assets/img/index.js';
import ScrollToTop from '../components/ScrollToTop';

function MediaTile({ item }) {
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        autoPlay muted loop playsInline
        className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ display: 'block', filter: 'brightness(0.82) contrast(1.05)' }}
      />
    );
  }
  return (
    <img
      src={item.src}
      alt=""
      className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
      style={{ filter: 'brightness(0.82) contrast(1.05)' }}
      loading="lazy"
    />
  );
}

function LightboxMedia({ item }) {
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        autoPlay muted loop playsInline controls
        className="max-h-[82vh] max-w-full rounded-2xl"
        style={{ boxShadow: '0 0 80px rgba(100,255,218,0.15)' }}
      />
    );
  }
  return (
    <img
      src={item.src}
      alt=""
      className="max-h-[82vh] max-w-full object-contain rounded-2xl"
      style={{ boxShadow: '0 0 80px rgba(100,255,218,0.15)' }}
    />
  );
}

function GalleryTile({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="break-inside-avoid relative cursor-pointer overflow-hidden rounded-2xl group"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.7) }}
      whileHover={{ boxShadow: '0 0 0 2px #64ffda55, 0 8px 32px rgba(100,255,218,0.12)' }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{ willChange: 'transform' }}
    >
      <MediaTile item={item} />

      {/* Always-on bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,25,47,0.75) 0%, transparent 100%)' }}
      />

      {/* Mobile: teal accent bar — always visible */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green/60 to-transparent" />

      {/* Mobile: index badge — always visible */}
      <div className="absolute bottom-2 left-2 font-mono text-xs text-green/80">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Hover: scan-line sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ y: '-100%', opacity: 0 }}
        animate={hovered ? { y: '100%', opacity: [0, 0.4, 0] } : { y: '-100%', opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(100,255,218,0.15) 50%, transparent 60%)' }}
      />

      {/* Hover: dark overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: 'linear-gradient(135deg, rgba(100,255,218,0.07) 0%, rgba(10,25,47,0.55) 100%)' }}
      />

      {/* Hover: spring-scale center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="w-12 h-12 rounded-full border-2 border-green bg-navy/50 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-green/30"
        >
          {item.type === 'video'
            ? <Play size={18} className="text-green ml-0.5" />
            : <ZoomIn size={16} className="text-green" />
          }
        </motion.div>
      </div>

      {/* Hover: sliding corner accents */}
      <motion.div
        className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-green rounded-tl"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4, y: hovered ? 0 : -4 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-green rounded-br"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      />

      {/* Video badge */}
      {item.type === 'video' && (
        <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-xs text-green bg-navy/75 backdrop-blur-sm px-2 py-0.5 rounded-full border border-green/30">
          <Play size={9} className="fill-green" /> video
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const open  = (i) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev  = useCallback(() => setLightbox(i => (i - 1 + galleryItems.length) % galleryItems.length), []);
  const next  = useCallback(() => setLightbox(i => (i + 1) % galleryItems.length), []);

  React.useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prev, next]);

  return (
    <div className="min-h-screen bg-navy px-6 sm:px-10 lg:px-16 py-24 relative overflow-x-hidden">
      {/* Ambient glows — absolute not fixed to avoid scroll repaint */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-2 font-mono text-sm text-slate hover:text-green transition-colors group mb-10">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            cd ~/home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14"
        >
          <h1 className="numbered-heading">Moments &amp; Memories</h1>
          <p className="text-slate mt-3 max-w-lg text-base">
            A visual journey through events, hackathons, and behind-the-scenes moments.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-slate border border-lightest-navy/60 rounded-full px-4 py-1.5 bg-light-navy/40">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            {galleryItems.filter(i => i.type === 'image').length} photos &nbsp;·&nbsp;
            {galleryItems.filter(i => i.type === 'video').length} videos
          </div>
        </motion.div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryItems.map((item, i) => (
            <GalleryTile key={i} item={item} index={i} onClick={() => open(i)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(5,15,30,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            onClick={close}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 bg-green/5 rounded-full blur-3xl" />
            </div>

            <motion.div
              key={lightbox}
              className="relative mx-4"
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: [0.645, 0.045, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <LightboxMedia item={galleryItems[lightbox]} />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-green bg-light-navy/90 border border-green/20 px-4 py-1.5 rounded-full whitespace-nowrap">
                {lightbox + 1} <span className="text-slate">/</span> {galleryItems.length}
              </div>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-green/25 text-green bg-navy/60 backdrop-blur-sm hover:bg-green/10 hover:border-green/60 transition-all duration-200">
              <ChevronLeft size={22} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-green/25 text-green bg-navy/60 backdrop-blur-sm hover:bg-green/10 hover:border-green/60 transition-all duration-200">
              <ChevronRight size={22} />
            </button>
            <button onClick={close} aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full border border-green/25 text-green bg-navy/60 backdrop-blur-sm hover:bg-green/10 hover:border-green/60 transition-all duration-200">
              <X size={18} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-slate/50 hidden sm:flex items-center gap-3">
              <span>← → navigate</span><span>·</span><span>esc close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollToTop />
    </div>
  );
}
