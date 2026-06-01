import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import portrait from '../assets/clement\'s_portraite.jpeg';

const S = {
  page: {
    background: '#fff',
    color: '#1a1a2e',
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    fontSize: '14px',
    lineHeight: '1.6',
    maxWidth: '860px',
    margin: '0 auto',
    padding: '40px 44px',
  },
  name: { fontSize: '32px', fontWeight: '700', color: '#0a192f', letterSpacing: '-0.5px', margin: 0 },
  title: { fontSize: '15px', color: '#2563eb', fontWeight: '600', marginTop: '5px' },
  contactRow: { display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px', fontSize: '12.5px', color: '#475569' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '5px', color: '#475569', textDecoration: 'none' },
  divider: { border: 'none', borderTop: '2px solid #0a192f', margin: '16px 0 20px' },
  sectionTitle: {
    fontSize: '11.5px', fontWeight: '700', color: '#2563eb', letterSpacing: '1.5px',
    textTransform: 'uppercase', marginBottom: '10px', marginTop: '20px',
    borderBottom: '1px solid #e2e8f0', paddingBottom: '4px',
  },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 210px', gap: '32px', alignItems: 'start' },
  jobHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' },
  jobTitle: { fontWeight: '700', color: '#0a192f', fontSize: '13.5px' },
  jobCompany: { color: '#2563eb', fontWeight: '600', textDecoration: 'none' },
  jobRange: { fontSize: '11.5px', color: '#94a3b8', whiteSpace: 'nowrap' },
  ul: { margin: '6px 0 12px 0', paddingLeft: '16px' },
  li: { marginBottom: '4px', color: '#334155', fontSize: '13px' },
  tag: {
    display: 'inline-block', background: '#f1f5f9', border: '1px solid #e2e8f0',
    borderRadius: '4px', padding: '2px 8px', fontSize: '11.5px', color: '#475569', marginRight: '4px', marginBottom: '4px',
  },
  projectTitle: { fontWeight: '700', color: '#0a192f', fontSize: '13px' },
  projectLink: { color: '#2563eb', fontSize: '11.5px', textDecoration: 'none' },
  skillGroup: { marginBottom: '8px' },
  skillLabel: { fontWeight: '700', color: '#0a192f', fontSize: '11.5px', minWidth: '80px', display: 'inline-block' },
  skillVal: { color: '#475569', fontSize: '12.5px' },
};

const jobs = [
  {
    title: 'Co-Founder & Lead Engineer', company: 'Foodra', range: '2024 — Present',
    url: 'https://www.foodramarket.com',
    points: [
      'Co-founded blockchain-powered AgriTech platform bridging African smallholder farmers to credit, insurance, and global markets.',
      'Architected full-stack platform: farmer identity on-chain, AI credit scoring, market access dashboard, and smart contract payment rails.',
      'Integrated DeFi lending primitives to give unbanked farmers access to micro-credit without traditional collateral.',
    ],
    stack: ['Next.js', 'Solidity', 'Node.js', 'Web3', 'AI'],
  },
  {
    title: 'Blockchain Developer & Web3 Innovator', company: 'Blockfuse Labs', range: '2024 — Present',
    url: 'https://blockfuselabs.com',
    points: [
      'Architect and ship production-grade smart contracts on Ethereum, Base, and Starknet — optimized for gas efficiency and security.',
      'Built RecurChain — a live recurring crypto payment system on Base using USDC and autonomous payment agents.',
      'Integrated Account Abstraction (ERC-4337) for gasless wallet UX on Starknet (Kizo Gasless Wallet).',
      'Mentored 10+ junior developers on React, Solidity, and DeFi fundamentals.',
    ],
    stack: ['Solidity', 'Cairo', 'React', 'Next.js', 'Hardhat', 'Web3.js'],
  },
  {
    title: 'Frontend & Backend Developer Intern', company: 'Blockfuse Labs', range: '2023 — 2024',
    url: 'https://blockfuselabs.com',
    points: [
      'Integrated smart contract calls into React frontends using ethers.js and Web3.js.',
      'Built and shipped backend REST APIs with Node.js and Express — auth, data persistence, third-party integrations.',
      'Deployed and tested contracts on Goerli and Sepolia testnets; shipped a working DApp in under 6 months.',
    ],
    stack: ['React', 'JavaScript', 'Node.js', 'Solidity', 'CSS'],
  },
];

const projects = [
  { name: 'Foodra Platform', url: 'https://www.foodramarket.com', desc: 'Blockchain AgriTech — farmer identity, AI credit scoring, market access.', stack: 'Next.js · Solidity · Web3' },
  { name: 'CeloTasks', url: 'https://celo-tasks.vercel.app', desc: 'MiniPay-compatible micro-task protocol on Celo with on-chain reputation.', stack: 'Celo · Solidity · TypeScript' },
  { name: 'TaskFlow', url: 'https://task-flow-alpha-olive.vercel.app', desc: 'Decentralized task OS for teams on Stacks with wallet-native collaboration.', stack: 'Stacks · Next.js · TypeScript' },
  { name: 'Kizo Gasless Wallet', url: 'https://kezo-gasless-wallet.vercel.app', desc: 'Starknet-native gasless wallet via Account Abstraction (ERC-4337).', stack: 'Starknet · Cairo · Next.js' },
  { name: 'Plateau Potatoes', url: 'https://plateau-potatoes-web.vercel.app', desc: 'Farm-to-doorstep e-commerce for fresh produce from Jos Plateau.', stack: 'React · Node.js' },
  { name: 'Cipherlink', url: 'https://cipherlink-delta.vercel.app', desc: 'Secure message encryption & sharing with local history tracking.', stack: 'React · Encryption' },
];

export default function Resume() {
  const printRef = useRef(null);

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8"/>
      <title>Clement Raymond — Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
      <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter','Segoe UI',Arial,sans-serif;font-size:13px;color:#1a1a2e;background:#fff}
        @page{margin:0.55in 0.6in;size:A4}
        @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
        a{color:#2563eb;text-decoration:none}
        img{display:block}
      </style>
      </head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 400);
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green/3 rounded-full blur-3xl" />
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-12 py-4 border-b border-lightest-navy/40 backdrop-blur-sm bg-navy/80"
      >
        <Link to="/" className="flex items-center gap-2 font-mono text-sm text-slate hover:text-green transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          cd ~/home
        </Link>
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
          Clement_Raymond_Resume
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 font-mono text-sm text-green border border-green rounded px-4 py-2 hover:bg-green/10 transition-colors"
        >
          <Download size={14} /> Download PDF
        </button>
      </motion.div>

      {/* Resume preview */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-2 sm:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          {/* Terminal chrome bar */}
          <div className="flex items-center gap-2 bg-light-navy rounded-t-lg px-4 py-2 border border-lightest-navy/40 border-b-0">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green/70" />
            <span className="ml-4 font-mono text-xs text-slate">resume — Clement Raymond</span>
          </div>

          <div className="rounded-b-lg overflow-x-auto border border-lightest-navy/40 shadow-2xl shadow-black/50">
            {/* The printable resume */}
            <div ref={printRef} style={{ ...S.page, minWidth: '600px' }}>

              {/* Header with photo */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <h1 style={S.name}>Clement Raymond</h1>
                  <p style={S.title}>Full-Stack Engineer · Blockchain Developer · Co-Founder @ Foodra</p>
                  <div style={S.contactRow}>
                    <a href="mailto:chinexzy37@gmail.com" style={S.contactItem}>✉ chinexzy37@gmail.com</a>
                    <a href="https://github.com/Clement-coder" style={S.contactItem}>⌥ github.com/Clement-coder</a>
                    <a href="https://www.linkedin.com/in/clement-raymond-861154335/" style={S.contactItem}>in linkedin.com/in/clement-raymond</a>
                    <a href="https://clemscoder.vercel.app" style={S.contactItem}>⊕ clemscoder.vercel.app</a>
                    <span style={S.contactItem}>📍 Jos, Plateau State, Nigeria</span>
                  </div>
                </div>
                {/* Profile photo */}
                <img
                  src={portrait}
                  alt="Clement Raymond"
                  style={{
                    width: '120px', height: '120px', borderRadius: '10px',
                    objectFit: 'cover', objectPosition: 'top',
                    border: '2px solid #e2e8f0', flexShrink: 0,
                  }}
                />
              </div>

              <hr style={S.divider} />

              <div style={S.twoCol}>
                {/* LEFT */}
                <div>
                  <div style={S.sectionTitle}>Professional Summary</div>
                  <p style={{ color: '#334155', fontSize: '12.5px', lineHeight: '1.6' }}>
                    Full-stack engineer and blockchain architect with 3+ years building production-grade applications across Web2 and Web3.
                    Co-founder of Foodra — a live blockchain AgriTech platform. Proficient in React, Next.js, Node.js, Solidity, and Cairo.
                    Experienced in DeFi protocols, smart contract security, Account Abstraction, and open-source contribution.
                    Currently at Blockfuse Labs shipping cutting-edge blockchain applications and mentoring junior developers.
                  </p>

                  <div style={S.sectionTitle}>Experience</div>
                  {jobs.map((j, i) => (
                    <div key={i} style={{ marginBottom: '14px' }}>
                      <div style={S.jobHeader}>
                        <div>
                          <span style={S.jobTitle}>{j.title}</span>
                          {' · '}
                          <a href={j.url} style={S.jobCompany}>{j.company}</a>
                        </div>
                        <span style={S.jobRange}>{j.range}</span>
                      </div>
                      <ul style={S.ul}>
                        {j.points.map((p, pi) => <li key={pi} style={S.li}>{p}</li>)}
                      </ul>
                      <div>{j.stack.map(t => <span key={t} style={S.tag}>{t}</span>)}</div>
                    </div>
                  ))}

                  <div style={S.sectionTitle}>Open Source & Hackathons</div>
                  <ul style={S.ul}>
                    <li style={S.li}><strong>Hedera Hackathon</strong> — Built decentralized solution using Hedera hashgraph consensus & HTS token service.</li>
                    <li style={S.li}><strong>Stacks Hackathon</strong> — Built TaskFlow, recognized for UX and smart contract design.</li>
                    <li style={S.li}><strong>Celo Build</strong> — Built CeloTasks, recognized for mobile-first DeFi UX.</li>
                    <li style={S.li}><strong>OnlyDust / CodeTriage / BountySource</strong> — Active bounty hunter and issue triager across Web3 repos.</li>
                    <li style={S.li}><strong>Gitcoin</strong> — Contributor and grant participant supporting public goods in Web3.</li>
                    <li style={S.li}><strong>Talent Protocol</strong> — Verified on-chain developer identity and builder score.</li>
                  </ul>

                  <div style={S.sectionTitle}>Featured Projects</div>
                  {projects.map((p, i) => (
                    <div key={i} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={S.projectTitle}>{p.name}</span>
                        <a href={p.url} style={S.projectLink}>{p.url.replace('https://', '')}</a>
                      </div>
                      <p style={{ ...S.li, margin: '2px 0' }}>{p.desc}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>{p.stack}</p>
                    </div>
                  ))}
                </div>

                {/* RIGHT */}
                <div>
                  <div style={S.sectionTitle}>Technical Skills</div>
                  {[
                    { label: 'Frontend', val: 'React, Next.js, Vue, Angular, TypeScript, Tailwind' },
                    { label: 'Backend', val: 'Node.js, Express, Python, Rust, GraphQL' },
                    { label: 'Mobile', val: 'React Native, Expo' },
                    { label: 'Blockchain', val: 'Solidity, Cairo, Hardhat, Foundry, Ethers.js, Wagmi' },
                    { label: 'Databases', val: 'PostgreSQL, MongoDB, Redis, MySQL' },
                    { label: 'Tools', val: 'Git, Docker, Vercel, IPFS, The Graph' },
                  ].map(({ label, val }) => (
                    <div key={label} style={S.skillGroup}>
                      <span style={S.skillLabel}>{label}</span>
                      <span style={S.skillVal}>{val}</span>
                    </div>
                  ))}

                  <div style={{ ...S.sectionTitle, marginTop: '20px' }}>Education</div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={S.jobTitle}>Computer Science</div>
                    <div style={{ color: '#475569', fontSize: '12px' }}>University · Nigeria</div>
                    <div style={S.jobRange}>2022 — Present</div>
                  </div>

                  <div style={{ ...S.sectionTitle, marginTop: '16px' }}>Certifications</div>
                  <ul style={{ ...S.ul, paddingLeft: '14px' }}>
                    <li style={S.li}>Blockfuse Labs Web3 Bootcamp</li>
                    <li style={S.li}>Solidity & Smart Contract Security</li>
                    <li style={S.li}>Starknet Cairo Developer Program</li>
                    <li style={S.li}>Hedera Developer Certification</li>
                  </ul>

                  <div style={{ ...S.sectionTitle, marginTop: '16px' }}>Languages</div>
                  <ul style={{ ...S.ul, paddingLeft: '14px' }}>
                    <li style={S.li}>English — Fluent</li>
                    <li style={S.li}>Hausa — Native</li>
                  </ul>

                  <div style={{ ...S.sectionTitle, marginTop: '16px' }}>Interests</div>
                  <p style={{ ...S.skillVal, lineHeight: '1.7' }}>
                    DeFi Architecture · ZK Proofs · AgriTech · Open Source · Hackathons · Developer Education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
