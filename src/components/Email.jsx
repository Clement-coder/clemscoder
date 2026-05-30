import React from 'react';
import { motion } from 'framer-motion';

const Email = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.5 }}
    className="hidden lg:flex fixed bottom-0 right-10 flex-col items-center gap-6 after:content-[''] after:block after:w-px after:h-24 after:bg-light-slate"
  >
    <a
      href="mailto:chinexzy37@gmail.com"
      className="font-mono text-xs text-light-slate hover:text-green hover:-translate-y-1 transition-all duration-200 tracking-widest"
      style={{ writingMode: 'vertical-rl' }}
    >
      chinexzy37@gmail.com
    </a>
  </motion.div>
);

export default Email;
