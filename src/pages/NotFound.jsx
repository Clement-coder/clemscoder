import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => (
  <div className="min-h-screen bg-navy flex flex-col items-center justify-center text-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-green text-sm mb-4">404</p>
      <h1 className="text-lightest-slate text-5xl sm:text-7xl font-bold mb-4">Page Not Found</h1>
      <p className="text-slate text-lg mb-10">
        Looks like you've wandered into the void.
      </p>
      <Link
        to="/"
        className="font-mono text-sm text-green border border-green rounded px-7 py-4 hover:bg-green/10 transition-colors"
      >
        Go Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
