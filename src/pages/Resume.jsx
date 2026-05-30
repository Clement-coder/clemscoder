import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import CV from '../assets/Clement_Raymond_CV.pdf';

const Resume = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-navy flex flex-col overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-12 py-4 border-b border-lightest-navy/40 backdrop-blur-sm bg-navy/80"
      >
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-sm text-slate hover:text-green transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          cd ~/home
        </Link>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
          Clement_Raymond_CV.pdf
        </div>

        <div className="flex items-center gap-3">
          <a
            href={CV}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-slate hover:text-green transition-colors"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Open</span>
          </a>
          <a
            href={CV}
            download="Clement_Raymond_CV.pdf"
            className="flex items-center gap-2 font-mono text-sm text-green border border-green rounded px-3 sm:px-4 py-2 hover:bg-green/10 transition-colors"
          >
            <Download size={14} /> Download
          </a>
        </div>
      </motion.div>

      {/* PDF viewer */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-2 sm:px-8 py-6 gap-6">
        {/* Terminal-style label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <div className="flex items-center gap-2 bg-light-navy rounded-t-lg px-4 py-2 border border-lightest-navy/40 border-b-0">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green/70" />
            <span className="ml-4 font-mono text-xs text-slate">resume.pdf — preview</span>
          </div>

          {/* PDF frame */}
          <div className="relative rounded-b-lg overflow-hidden border border-lightest-navy/40 shadow-2xl shadow-black/50">
            {!loaded && (
              <div className="absolute inset-0 bg-light-navy flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-2 border-green/30 border-t-green rounded-full"
                  />
                  <span className="font-mono text-xs text-slate">Loading preview...</span>
                </div>
              </div>
            )}
            <motion.iframe
              src={CV}
              title="Clement Raymond Resume"
              className="w-full"
              style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}
              onLoad={() => setLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Bottom download CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 pb-4"
        >
          <p className="font-mono text-sm text-slate">Like what you see?</p>
          <a
            href={CV}
            download="Clement_Raymond_CV.pdf"
            className="flex items-center gap-2 font-mono text-sm text-green border border-green rounded px-6 py-3 hover:bg-green/10 transition-colors"
          >
            <Download size={14} /> Save a copy
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
