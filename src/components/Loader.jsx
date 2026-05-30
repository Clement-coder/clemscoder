import React from 'react';
import { motion } from 'framer-motion';

const letters = 'Clement Raymond'.split('');

const Loader = () => (
  <div className="fixed inset-0 bg-navy flex flex-col items-center justify-center z-50 gap-6">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-20 h-20"
    >
      <motion.polygon
        points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5"
        fill="none"
        stroke="#64ffda"
        strokeWidth="5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#64ffda"
        fontSize="40"
        fontFamily="SF Mono, Fira Code, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        C
      </motion.text>
    </motion.svg>

    {/* Animated name */}
    <div className="flex font-mono text-sm tracking-widest">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
          className={char === ' ' ? 'w-2' : char === char.toUpperCase() && char !== ' ' ? 'text-green' : 'text-light-slate'}
        >
          {char}
        </motion.span>
      ))}
    </div>
  </div>
);

export default Loader;
