import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 text-center sm:text-left">
    <motion.p {...fadeUp(0.2)} className="font-mono text-green text-base mb-5">
      Hi, my name is
    </motion.p>

    <motion.h1 {...fadeUp(0.3)} className="text-4xl sm:text-6xl md:text-7xl font-bold text-lightest-slate leading-tight mb-4 whitespace-nowrap">
      <img
        src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=48&pause=1000&color=CCD6F6&center=false&vCenter=true&width=520&height=60&lines=Clement+Raymond."
        alt="Clement Raymond."
        className="inline-block max-w-full"
      />
    </motion.h1>

    <motion.h2 {...fadeUp(0.4)} className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate leading-tight mb-8">
      I build for the web, mobile & blockchain.
    </motion.h2>

    <motion.p {...fadeUp(0.5)} className="max-w-xl text-slate text-lg leading-relaxed mb-12 mx-auto sm:mx-0">
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
