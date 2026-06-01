import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ZoomIn } from 'lucide-react';
import { galleryItems } from '../assets/img/index.js';

const PREVIEW_COUNT = 9;

const gridClasses = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];

function BentoTile({ item, index, gridClass, animDelay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${gridClass}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: animDelay }}
      whileHover={{ boxShadow: '0 0 0 2px #64ffda55, 0 8px 32px rgba(100,255,218,0.12)' }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Media */}
      {item.type === 'video' ? (
        <video
          src={item.src}
          autoPlay muted loop playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ filter: 'brightness(0.82) contrast(1.05)' }}
        />
      ) : (
        <img
          src={item.src}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ filter: 'brightness(0.82) contrast(1.05)' }}
          loading="lazy"
        />
      )}

      {/* Always-on bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,25,47,0.75) 0%, transparent 100%)' }}
      />

      {/* Mobile: teal accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green/60 to-transparent" />

      {/* Mobile: index badge */}
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

export default function GalleryPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const preview = galleryItems.slice(0, PREVIEW_COUNT);

  return (
    <section id="gallery" ref={ref} className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="numbered-heading">Gallery</h2>
        <p className="text-slate font-mono text-sm mb-10 max-w-md">
          Moments, events &amp; behind-the-scenes from my journey.
        </p>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[520px]">
        {preview.map((item, i) => (
          <BentoTile
            key={i}
            item={item}
            index={i}
            gridClass={gridClasses[i]}
            animDelay={inView ? i * 0.06 : 0}
          />
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Link
          to="/gallery"
          className="group relative inline-flex items-center gap-3 font-mono text-sm text-green border border-green rounded px-8 py-4 hover:bg-green/10 transition-all duration-300"
        >
          <span>View All Photos</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          <span className="absolute bottom-0 left-0 h-px bg-green transition-all duration-300 w-0 group-hover:w-full" />
        </Link>
      </motion.div>
    </section>
  );
}
