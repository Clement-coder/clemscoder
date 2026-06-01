import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE = 1500;

const TypingName = () => {
  const text = 'Clement Raymond.';
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!deleting && displayed.length < text.length) {
      timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), TYPE_SPEED);
    } else if (!deleting && displayed.length === text.length) {
      timeout = setTimeout(() => setDeleting(true), PAUSE);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), DELETE_SPEED);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting]);

  return (
    <span>
      <span style={{ whiteSpace: 'nowrap' }}>{displayed}</span>
      <span
        className="text-green"
        style={{
          display: 'inline-block',
          width: '2px',
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'cursor-blink 1s step-end infinite',
        }}
      >|</span>
    </span>
  );
};

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 text-left">
    <motion.p {...fadeUp(0.2)} className="font-mono text-green text-base mb-5">
      Hi, my name is
    </motion.p>

    <motion.h1 {...fadeUp(0.3)} className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate leading-tight mb-4 whitespace-nowrap">
      <TypingName />
    </motion.h1>

    <motion.h2 {...fadeUp(0.4)} className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight mb-8">
      I build for the web, mobile & blockchain.
    </motion.h2>

    <motion.p {...fadeUp(0.5)} className="max-w-xl text-slate text-lg leading-relaxed mb-12">
      I'm a full-stack engineer and blockchain developer based in Jos, Nigeria. I specialize in
      building exceptional digital experiences — from pixel-perfect UIs and mobile apps to
      production APIs, decentralized Web3 applications, and smart contracts.
    </motion.p>

    <motion.div {...fadeUp(0.6)} className="flex flex-col sm:flex-row gap-4">
      <a
        href="#projects"
        className="font-mono text-sm text-green border border-green rounded px-7 py-4 hover:bg-green/10 transition-colors text-center"
      >
        Check out my work!
      </a>
      <Link
        to="/resume"
        className="font-mono text-sm text-green border border-green rounded px-7 py-4 hover:bg-green/10 transition-colors text-center"
      >
        View Resume
      </Link>
    </motion.div>
  </section>
);

export default Hero;
