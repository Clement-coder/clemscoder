import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
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
          <motion.div
            key={i}
            className={`relative overflow-hidden rounded-2xl cursor-pointer group ${gridClasses[i]}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
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
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ filter: 'brightness(0.82) contrast(1.05)' }}
                loading="lazy"
              />
            )}

            {/* Permanent bottom vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,25,47,0.55) 0%, transparent 50%)' }}
            />

            {/* Hover teal shimmer */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green/70 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green/70 rounded-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Video badge */}
            {item.type === 'video' && (
              <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-xs text-green bg-navy/75 backdrop-blur-sm px-2 py-0.5 rounded-full border border-green/30">
                <Play size={9} className="fill-green" /> video
              </div>
            )}
          </motion.div>
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
