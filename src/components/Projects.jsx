import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon } from './Icons';
import FoodraImage from '../assets/foodra.png';
import FansOnlyImage from '../assets/fansOnly.png';
import CipherlinkImage from '../assets/cipherlink.png';
import OfframpImage from '../assets/offramp_1.png';
import CroptrustImage from '../assets/croptrust.png';
import KezoImage from '../assets/kezo.png';

import CeloTasksImage from '../assets/celo-task.png';
import TaskFlowImage  from '../assets/task-flow.png';
import PortfolioImage from '../assets/portfolio.png';
import PlateauPotatoeImage from '../assets/plateaupotatoe.png';

const featured = [
  {
    title: 'Foodra Platform',
    description:
      'A decentralized agricultural platform using blockchain, AI, and digital finance to empower farmers with identity, credit, inputs, training, insurance, and market access.',
    image: FoodraImage,
    tags: ['Next.js', 'Solidity', 'Web3', 'AgriTech'],
    github: 'https://github.com/Clement-coder/foodra-platform',
    live: 'https://www.foodramarket.com/',
  },
  {
    title: 'CeloTasks',
    description:
      'MiniPay-compatible micro-task protocol on Celo. Complete small tasks, receive instant on-chain payments, and build a verifiable reputation — all from a mobile-first DApp.',
    image: CeloTasksImage,
    tags: ['Celo', 'MiniPay', 'Solidity', 'TypeScript'],
    github: 'https://github.com/Clement-coder/CeloTasks',
    live: 'https://celo-tasks.vercel.app/',
  },
  {
    title: 'TaskFlow',
    description:
      'Decentralized task OS for teams on Stacks. Polished workflows, on-chain reputation, and wallet-native collaboration — modern, fast, and trustless.',
    image: TaskFlowImage,
    tags: ['Stacks', 'Web3', 'TypeScript', 'Next.js'],
    github: 'https://github.com/Clement-coder/TaskFlow',
    live: 'https://task-flow-alpha-olive.vercel.app/',
  },
  {
    title: 'Plateau Potatoes',
    description:
      'E-commerce platform for fresh farm produce delivered directly from Jos Plateau farms to your doorstep. Features product listings, delivery tracking, and a clean consumer-facing storefront.',
    image: PlateauPotatoeImage,
    tags: ['React', 'E-commerce', 'Node.js'],
    github: 'https://github.com/Clement-coder/Plateau-Potatoes',
    live: 'https://plateau-potatoes-web.vercel.app/',
  },
  {
    title: 'Cipherlink',
    description:
      'Lightweight web app that enables developers to securely encrypt messages, share them, and decrypt them using a clean, modern interface with local history tracking.',
    image: CipherlinkImage,
    tags: ['React', 'Encryption', 'LocalStorage'],
    github: 'https://github.com/Clement-coder/cipherlink',
    live: 'https://cipherlink-delta.vercel.app/',
  },
];

const other = [
  {
    title: 'Cipherlink',
    description: 'Lightweight web app for secure encryption, sharing, and decryption of messages with local history tracking.',
    tags: ['React', 'Encryption', 'LocalStorage'],
    github: 'https://github.com/Clement-coder/cipherlink',
    live: 'https://cipherlink-delta.vercel.app/',
  },
  {
    title: 'FansOnly',
    description: 'Decentralized loyalty platform for creators and influencers with exclusive content and token-based rewards.',
    tags: ['Web3', 'NFTs', 'Smart Contracts'],
    github: 'https://github.com/Clement-coder/FansOnly',
    live: 'https://fans-only-kd4t.vercel.app/',
  },
  {
    title: 'Offramp API',
    description: 'Scalable backend API for crypto-to-fiat off-ramp services, handling rates, providers, and transaction status.',
    tags: ['Node.js', 'API', 'Crypto'],
    github: 'https://github.com/Clement-coder/offramp-api',
    live: 'https://offramp-api.vercel.app/',
  },
  {
    title: 'CropTrust',
    description: 'Modern agriculture marketplace bridging farmers and buyers through trust, transparency, and blockchain.',
    tags: ['AgriTech', 'Web3', 'Marketplace'],
    github: 'https://github.com/Clement-coder/Crop-Trust',
    live: 'https://crop-trust.vercel.app/',
  },
  {
    title: 'Kizo Gasless Wallet',
    description: 'Starknet-native gasless wallet enabling frictionless on-chain transactions via Account Abstraction.',
    tags: ['Starknet', 'Web3', 'Next.js'],
    github: 'https://github.com/Clement-coder/Kezo-Gasless-Wallet',
    live: 'https://kezo-gasless-wallet.vercel.app/',
  },
  {
    title: 'This Portfolio',
    description: 'Personal developer portfolio built from scratch — pixel-perfect, fully responsive, animated, and blazing fast.',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    github: 'https://github.com/Clement-coder/clement-v2',
    live: 'https://clement-raymond.vercel.app/',
  },
  {
    title: 'Web3 Contract Collection',
    description: 'Production-grade Solidity contracts: Student System, Hospital Manager, Bank DeFi Module, DAO Voting.',
    tags: ['Solidity', 'Hardhat', 'OpenZeppelin'],
    github: 'https://github.com/Clement-coder/web3-contract-collection',
    live: '',
  },
];

const FeaturedProject = ({ project, index }) => {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="fade-up mb-16">
      {/* Image */}
      <a href={project.live || project.github} target="_blank" rel="noopener noreferrer"
        className="block relative group rounded overflow-hidden mb-4">
        <div className="absolute inset-0 bg-green/20 group-hover:bg-transparent transition-colors duration-300 z-10 rounded" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-52 sm:h-64 object-contain bg-navy group-hover:scale-105 transition-all duration-300"
        />
      </a>

      {/* Content */}
      <div className={`${isEven ? 'text-left' : 'text-left md:text-right'}`}>
        <p className="font-mono text-green text-sm mb-2">Featured Project</p>
        <h3 className="text-lightest-slate text-2xl font-bold mb-4">
          <a href={project.live || project.github} target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors">
            {project.title}
          </a>
        </h3>
        <div className="bg-light-navy p-6 rounded shadow-xl mb-4">
          <p className="text-slate">{project.description}</p>
        </div>
        <ul className="flex flex-wrap gap-3 font-mono text-xs text-slate mb-4 justify-start">
          {project.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="flex gap-4 justify-start">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-light-slate hover:text-green transition-colors">
              <GithubIcon size={20} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live" className="text-light-slate hover:text-green transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const visible = showMore ? other : other.slice(0, 3);

  return (
    <section id="projects" className="py-24">
      <h2 className="numbered-heading">Some Things I've Built</h2>

      {/* Featured */}
      <div className="mb-16">
        {featured.map((p, i) => <FeaturedProject key={p.title} project={p} index={i} />)}
      </div>

      {/* Other projects */}
      <h3 ref={ref} className="fade-up text-center text-lightest-slate text-2xl font-bold mb-10">
        Other Noteworthy Projects
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {/* Always-visible first 3 */}
        {other.slice(0, 3).map((p) => (
          <div key={p.title} className="bg-light-navy rounded p-7 flex flex-col hover:-translate-y-1 transition-transform duration-200 group">
            <div className="flex justify-between items-start mb-8">
              <Folder className="text-green" size={40} />
              <div className="flex gap-4">
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-green transition-colors"><GithubIcon size={18} /></a>}
                {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-green transition-colors"><ExternalLink size={18} /></a>}
              </div>
            </div>
            <h4 className="text-lightest-slate font-bold text-lg mb-3 group-hover:text-green transition-colors">{p.title}</h4>
            <p className="text-slate text-sm flex-1 mb-6">{p.description}</p>
            <ul className="flex flex-wrap gap-3 font-mono text-xs text-slate">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}

        {/* Animated extra cards */}
        <AnimatePresence>
          {showMore && other.slice(3).map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-light-navy rounded p-7 flex flex-col hover:-translate-y-1 transition-transform duration-200 group"
            >
              <div className="flex justify-between items-start mb-8">
                <Folder className="text-green" size={40} />
                <div className="flex gap-4">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-green transition-colors"><GithubIcon size={18} /></a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-green transition-colors"><ExternalLink size={18} /></a>}
                </div>
              </div>
              <h4 className="text-lightest-slate font-bold text-lg mb-3 group-hover:text-green transition-colors">{p.title}</h4>
              <p className="text-slate text-sm flex-1 mb-6">{p.description}</p>
              <ul className="flex flex-wrap gap-3 font-mono text-xs text-slate">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className="font-mono text-sm text-green border border-green rounded px-7 py-4 hover:bg-green/10 transition-colors"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </section>
  );
};

export default Projects;
