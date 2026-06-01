import React from 'react';
import { motion } from 'framer-motion';

const Email = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.5 }}
    className="hidden lg:flex fixed bottom-0 right-10 z-40 flex-col items-center gap-5"
  >
    <a
      href="mailto:chinexzy37@gmail.com"
      className="font-mono text-xs text-light-slate hover:text-green hover:-translate-y-1 transition-all duration-200 tracking-widest"
      style={{ writingMode: 'vertical-rl' }}
    >
      chinexzy37@gmail.com
    </a>
    {/* vertical line to bottom */}
    <div className="w-px h-24 bg-light-slate/50 mt-1" />
  </motion.div>
);

export default Email;
