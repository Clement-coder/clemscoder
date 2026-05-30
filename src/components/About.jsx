import React, { useEffect, useRef } from 'react';
import portrait from '../assets/clement\'s_portraite.jpeg';

const categories = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React',      type: 'devicon', icon: 'devicon-react-original colored' },
      { name: 'Next.js',    type: 'devicon', icon: 'devicon-nextjs-plain' },
      { name: 'Vue.js',     type: 'devicon', icon: 'devicon-vuejs-plain colored' },
      { name: 'Angular',    type: 'devicon', icon: 'devicon-angular-plain colored' },
      { name: 'TypeScript', type: 'devicon', icon: 'devicon-typescript-plain colored' },
      { name: 'JavaScript', type: 'devicon', icon: 'devicon-javascript-plain colored' },
      { name: 'Tailwind',   type: 'devicon', icon: 'devicon-tailwindcss-original colored' },
      { name: 'HTML5',      type: 'devicon', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3',       type: 'devicon', icon: 'devicon-css3-plain colored' },
      {
        name: 'Framer',
        type: 'svg', color: '#0055FF', viewBox: '0 0 24 24',
        svg: 'M4 0h16v8H4zm0 8h8l8 8H4zm0 8h8v8z',
      },
    ],
  },
  {
    label: 'Mobile',
    skills: [
      { name: 'React Native', type: 'devicon', icon: 'devicon-react-original colored' },
      { name: 'Expo',         type: 'devicon', icon: 'devicon-expo-original' },
    ],
  },
  {
    label: 'Backend & Systems',
    skills: [
      { name: 'Node.js',  type: 'devicon', icon: 'devicon-nodejs-plain colored' },
      { name: 'Express',  type: 'devicon', icon: 'devicon-express-original' },
      { name: 'Python',   type: 'devicon', icon: 'devicon-python-plain colored' },
      { name: 'Rust',     type: 'devicon', icon: 'devicon-rust-original' },
      { name: 'GraphQL',  type: 'devicon', icon: 'devicon-graphql-plain colored' },
      {
        name: 'REST APIs',
        type: 'svg', color: '#64ffda', viewBox: '0 0 24 24',
        svg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
      },
    ],
  },
  {
    label: 'Web3 & Blockchain',
    skills: [
      { name: 'Solidity', type: 'devicon', icon: 'devicon-solidity-plain' },
      { name: 'Hardhat',  type: 'devicon', icon: 'devicon-hardhat-plain colored' },
      { name: 'Web3.js',  type: 'devicon', icon: 'devicon-web3js-plain colored' },
      { name: 'Polygon',  type: 'devicon', icon: 'devicon-polygon-plain colored' },
      {
        name: 'Ethers.js',
        type: 'svg', color: '#6c8ebf', viewBox: '0 0 24 24',
        svg: 'M12 1.75l-8.5 12.5L12 17l8.5-2.75L12 1.75zM3.5 15.75L12 22.25l8.5-6.5L12 18.5l-8.5-2.75z',
      },
      {
        name: 'Wagmi',
        type: 'svg', color: '#1b5ee4', viewBox: '0 0 24 24',
        svg: 'M3 7h4v10H3zm7-3h4v16h-4zm7 5h4v8h-4z',
      },
      {
        name: 'Viem',
        type: 'svg', color: '#ffc517', viewBox: '0 0 24 24',
        svg: 'M12 2L2 19h20L12 2zm0 4l7 13H5l7-13z',
      },
      {
        name: 'Cairo',
        type: 'svg', color: '#f39914', viewBox: '0 0 128 128',
        svg: 'M64 8L8 40v48l56 32 56-32V40L64 8zm0 12l44 25v38L64 108 20 83V45L64 20z',
      },
      {
        name: 'Foundry',
        type: 'svg', color: '#64ffda', viewBox: '0 0 24 24', stroke: true,
        svg: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      },
      {
        name: 'IPFS',
        type: 'svg', color: '#65c2cb', viewBox: '0 0 24 24',
        svg: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L20 8.5v7L12 19.82 4 15.5v-7L12 4.18zM12 7l-4 2.25V14l4 2.25L16 14V9.25L12 7z',
      },
      {
        name: 'The Graph',
        type: 'svg', color: '#6f4cff', viewBox: '0 0 24 24',
        svg: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a7 7 0 110 14A7 7 0 0112 5zm0 2a5 5 0 100 10A5 5 0 0012 7zm0 2a3 3 0 110 6 3 3 0 010-6z',
      },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', type: 'devicon', icon: 'devicon-postgresql-plain colored' },
      { name: 'MongoDB',    type: 'devicon', icon: 'devicon-mongodb-plain colored' },
      { name: 'Redis',      type: 'devicon', icon: 'devicon-redis-plain colored' },
      { name: 'MySQL',      type: 'devicon', icon: 'devicon-mysql-plain colored' },
    ],
  },
  {
    label: 'Data Science',
    skills: [
      { name: 'Pandas',  type: 'devicon', icon: 'devicon-pandas-original colored' },
      { name: 'NumPy',   type: 'devicon', icon: 'devicon-numpy-original colored' },
      { name: 'Jupyter', type: 'devicon', icon: 'devicon-jupyter-plain colored' },
    ],
  },
];

const SkillCard = ({ skill }) => (
  <div
    title={skill.name}
    style={{ aspectRatio: '1 / 1' }}
    className="flex flex-col items-center justify-center gap-1.5 p-2 bg-light-navy border border-lightest-navy/40 rounded-md cursor-default group hover:border-green hover:bg-navy hover:shadow-[0_0_14px_rgba(100,255,218,0.12)] hover:-translate-y-1 transition-all duration-200"
  >
    {skill.type === 'devicon' ? (
      <i
        className={`${skill.icon} text-[1.65rem] group-hover:scale-110 transition-transform duration-200`}
        style={!skill.icon.includes('colored') ? { color: '#8892b0' } : undefined}
      />
    ) : (
      <svg
        viewBox={skill.viewBox}
        className="w-7 h-7 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
        fill={skill.stroke ? 'none' : skill.color}
        stroke={skill.stroke ? skill.color : 'none'}
        strokeWidth={skill.stroke ? 2 : 0}
        strokeLinecap={skill.stroke ? 'round' : undefined}
        strokeLinejoin={skill.stroke ? 'round' : undefined}
      >
        <path d={skill.svg} />
      </svg>
    )}
    <span className="font-mono text-[9px] text-slate/70 group-hover:text-green transition-colors text-center leading-tight w-full truncate px-0.5">
      {skill.name}
    </span>
  </div>
);

const About = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 max-w-4xl">
      <h2 className="numbered-heading">About Me</h2>

      <div ref={ref} className="fade-up grid md:grid-cols-3 gap-12 items-start">
        {/* Text */}
        <div className="md:col-span-2 space-y-4 text-slate text-lg">
          <p>
            I'm <span className="text-lightest-slate font-medium">Clement Raymond</span> — a
            full-stack engineer and blockchain architect who builds across the entire stack: from
            pixel-perfect frontends and production APIs to smart contracts and mobile apps. I don't
            just write code — I ship products.
          </p>
          <p>
            On the <span className="text-lightest-slate font-medium">Web2 side</span>, I build
            fast, accessible, and beautifully animated interfaces with React, Next.js, Vue, and
            Angular. I write backends in Node.js, Python, and{' '}
            <span className="text-lightest-slate font-medium">Rust</span> — from REST and GraphQL
            APIs to real-time systems. I also build cross-platform{' '}
            <span className="text-lightest-slate font-medium">mobile apps</span> with React Native
            and Expo.
          </p>
          <p>
            On the <span className="text-lightest-slate font-medium">Web3 side</span>, I architect
            and deploy production smart contracts on Ethereum, Base, and Starknet. I've built
            DeFi protocols, NFT platforms, DAO systems, gasless wallets via Account Abstraction,
            and autonomous on-chain payment agents. I write Solidity and Cairo fluently.
          </p>
          <p>
            I also handle third-party integrations — payment gateways, oracles, webhooks, and
            cloud services — and I've dabbled in Python data pipelines and AI/ML integrations when
            projects call for it.
          </p>
          <p>
            Currently at{' '}
            <a href="https://blockfuselabs.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">
              Blockfuse Labs
            </a>
            , building cutting-edge blockchain applications, mentoring junior developers, and
            contributing to open-source Web3 tooling. Some things I've shipped:{' '}
            <span className="text-lightest-slate font-medium">Foodra</span>,{' '}
            <span className="text-lightest-slate font-medium">RecurChain</span>,{' '}
            <span className="text-lightest-slate font-medium">Celo Task</span>,{' '}
            <span className="text-lightest-slate font-medium">Starknet Task</span>,{' '}
            <span className="text-lightest-slate font-medium">Mesho</span>, and a lot more.
          </p>

          {/* Skill categories */}
          <div className="pt-2 space-y-6">
            {categories.map(({ label, skills }) => (
              <div key={label}>
                <p className="font-mono text-xs text-green mb-3 uppercase tracking-widest">{label}</p>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(62px, 1fr))' }}
                >
                  {skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="relative group w-full max-w-[260px] mx-auto md:mx-0 md:sticky md:top-28 self-start">
          <div className="relative rounded overflow-hidden">
            <img
              src={portrait}
              alt="Clement Raymond"
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-300 mix-blend-multiply group-hover:mix-blend-normal"
            />
            <div className="absolute inset-0 bg-green/20 group-hover:bg-transparent transition-colors duration-300 rounded" />
          </div>
          <div className="absolute inset-0 border-2 border-green rounded translate-x-4 translate-y-4 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
        </div>
      </div>
    </section>
  );
};

export default About;
