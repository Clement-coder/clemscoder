import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'About', url: '#about' },
  { name: 'Experience', url: '#experience' },
  { name: 'GitHub', url: '#github' },
  { name: 'Projects', url: '#projects' },
  { name: 'Contact', url: '#contact' },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Spin once on load
    setRotation(360);
  }, []);

  const handleHoverStart = () => {
    setIsHovered(true);
    setRotation(r => r + 360);
  };
  const handleHoverEnd = () => setIsHovered(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 w-full z-50 px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur shadow-lg py-4' : 'py-6'
      }`}
    >
      <nav className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Logo */}
        <a
          href="/"
          aria-label="home"
          className="group flex items-center gap-2 select-none"
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
          onTouchStart={handleHoverStart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-9 h-9 flex-shrink-0"
          >
            <motion.g
              style={{ transformOrigin: '50px 50px' }}
              animate={{ rotate: rotation }}
              transition={{
                duration: rotation === 360 ? 1.2 : 0.5,
                ease: 'easeInOut',
                delay: rotation === 360 ? 0.3 : 0,
              }}
            >
              <polygon
                points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5"
                fill="none"
                stroke="#64ffda"
                strokeWidth="5"
              />
              <polygon
                points="50 5, 90 27.5, 90 72.5, 50 95, 10 72.5, 10 27.5"
                fill="transparent"
                stroke="none"
              />
            </motion.g>
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#64ffda"
              fontSize="48"
              fontFamily="SF Mono, Fira Code, monospace"
            >
              C
            </text>
          </svg>

          <div className="overflow-hidden">
            <motion.span
              className="font-mono text-base text-green whitespace-nowrap block"
              initial={{ x: -24, opacity: 0, width: 0 }}
              animate={{ x: 0, opacity: 1, width: 'auto' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
            >
              Clement&nbsp;<span className="text-lightest-slate">Raymond</span>
            </motion.span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ol className="flex items-center gap-8 list-none font-mono text-sm">
            {navLinks.map(({ name, url }, i) => (
              <li key={name}>
                <a href={url} className="text-lightest-slate hover:text-green transition-colors">
                  <span className="text-green mr-1">0{i + 1}.</span>
                  {name}
                </a>
              </li>
            ))}
          </ol>
          <Link
            to="/resume"
            className="font-mono text-sm text-green border border-green rounded px-4 py-2 hover:bg-green/10 transition-colors"
          >
            Resume
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-[60] relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-green transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-green transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-green transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu — rendered outside nav to avoid layout issues */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-[#112240] flex flex-col items-center justify-center z-50 shadow-2xl"
          >
            <ol className="flex flex-col items-center gap-8 list-none font-mono text-sm mb-8 w-full px-8">
              {navLinks.map(({ name, url }, i) => (
                <li key={name} className="w-full text-center">
                  <a
                    href={url}
                    onClick={() => setMenuOpen(false)}
                    className="text-lightest-slate hover:text-green transition-colors text-lg"
                  >
                    <div className="text-green text-sm mb-1">0{i + 1}.</div>
                    {name}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              to="/resume"
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm text-green border border-green rounded px-8 py-4 hover:bg-green/10 transition-colors"
            >
              Resume
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
