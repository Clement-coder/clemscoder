import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowLeft, Play } from 'lucide-react';
import { galleryItems } from '../assets/img/index.js';

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

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Back — matches Resume page */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-slate hover:text-green transition-colors group mb-10"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            cd ~/home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-14"
        >
          <p className="font-mono text-green text-sm mb-3 tracking-widest uppercase">05. Gallery</p>
          <h1 className="font-mono text-4xl sm:text-5xl font-bold text-lightest-slate leading-tight">
            Moments &amp; Memories
          </h1>
          <p className="text-slate mt-3 max-w-lg text-base">
            A visual journey through events, hackathons, and behind-the-scenes moments.
          </p>
          {/* Animated teal underline */}
          <motion.div
            className="mt-5 h-px bg-gradient-to-r from-green via-green/40 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '180px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          {/* Stats pill */}
          <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-slate border border-lightest-navy/60 rounded-full px-4 py-1.5 bg-light-navy/40">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            {galleryItems.filter(i => i.type === 'image').length} photos &nbsp;·&nbsp;
            {galleryItems.filter(i => i.type === 'video').length} videos
          </div>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.025, 0.7) }}
              onClick={() => open(i)}
            >
              <MediaTile item={item} />

              {/* Permanent dark vignette at bottom */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(10,25,47,0.55) 0%, transparent 50%)',
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(135deg, rgba(100,255,218,0.08) 0%, rgba(10,25,47,0.5) 100%)' }}
              />

              {/* Hover center icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 rounded-full border-2 border-green bg-navy/40 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-green/20">
                  {item.type === 'video'
                    ? <Play size={16} className="text-green ml-0.5" />
                    : <span className="text-green text-lg leading-none font-light">⊕</span>
                  }
                </div>
              </div>

              {/* Corner accent lines */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green/70 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green/70 rounded-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Video badge — always visible */}
              {item.type === 'video' && (
                <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-xs text-green bg-navy/75 backdrop-blur-sm px-2 py-0.5 rounded-full border border-green/30">
                  <Play size={9} className="fill-green" /> video
                </div>
              )}
            </motion.div>
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
            style={{ background: 'rgba(5,15,30,0.97)', backdropFilter: 'blur(20px)' }}
            onClick={close}
          >
            {/* Glow behind active image */}
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

              {/* Counter pill */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-green bg-light-navy/90 border border-green/20 px-4 py-1.5 rounded-full whitespace-nowrap">
                {lightbox + 1} <span className="text-slate">/</span> {galleryItems.length}
              </div>
            </motion.div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-green/25 text-green bg-navy/60 backdrop-blur-sm hover:bg-green/10 hover:border-green/60 transition-all duration-200"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full border border-green/25 text-green bg-navy/60 backdrop-blur-sm hover:bg-green/10 hover:border-green/60 transition-all duration-200"
            >
              <ChevronRight size={22} />
            </button>

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-full border border-green/25 text-green bg-navy/60 backdrop-blur-sm hover:bg-green/10 hover:border-green/60 transition-all duration-200"
            >
              <X size={18} />
            </button>

            {/* Keyboard hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-slate/50 hidden sm:flex items-center gap-3">
              <span>← → navigate</span>
              <span>·</span>
              <span>esc close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
