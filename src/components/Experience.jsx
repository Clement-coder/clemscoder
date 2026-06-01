import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, GitFork, GitPullRequest } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    company: 'Foodra',
    url: 'https://www.foodramarket.com/',
    title: 'Co-Founder & Lead Engineer',
    range: '2024 — Present',
    badge: 'Co-Founder',
    stack: ['Next.js', 'Solidity', 'Web3', 'AI', 'AgriTech', 'Node.js'],
    duties: [
      <>Co-founded <a href="https://www.foodramarket.com/" target="_blank" rel="noopener noreferrer" className="text-green hover:underline font-medium">Foodra</a> — a blockchain-powered AgriTech platform bridging African smallholder farmers to credit, insurance, inputs, and global markets.</>,
      <><span className="text-green font-medium">Vision:</span> Contribute towards an Africa that does not depend on the outside world to feed her — using the least available resources to maximize African food production and supply chain capacity.</>,
      <><span className="text-green font-medium">Mission:</span> Offer value to African farmers through sustainable practices, a fair supply chain, and farmer empowerment through technology and market access.</>,
      <>Architected the full-stack platform: <span className="text-lightest-slate font-medium">farmer identity on-chain, AI credit scoring, market access dashboard</span>, and smart contract-based payment rails.</>,
      <>Led product, engineering, and go-to-market strategy — from zero to a live production platform with real farmers onboarded.</>,
      <>Integrated <span className="text-lightest-slate font-medium">DeFi lending primitives</span> to give unbanked farmers access to micro-credit without traditional collateral.</>,
    ],
  },
  {
    company: 'Blockfuse Labs',
    url: 'https://blockfuselabs.com',
    title: 'Blockchain Developer & Web3 Innovator',
    range: '2024 — Present',
    badge: 'Current',
    stack: ['Solidity', 'React', 'Next.js', 'Hardhat', 'Web3.js', 'USDC', 'Cairo'],
    duties: [
      <>Architect and ship <span className="text-lightest-slate font-medium">production-grade smart contracts</span> deployed on Ethereum, Base, and Starknet — optimized for gas efficiency and security.</>,
      <>Built <span className="text-lightest-slate font-medium">RecurChain</span> — a live recurring crypto payment system on Base using USDC and autonomous payment agents.</>,
      <>Explored and integrated <span className="text-lightest-slate font-medium">Account Abstraction (ERC-4337)</span> for gasless wallet UX on Starknet via the Kizo Gasless Wallet project.</>,
      <>Mentored a cohort of <span className="text-lightest-slate font-medium">10+ junior developers</span> on React, Solidity, and DeFi fundamentals.</>,
      <>Contributed to internal tooling, developer education, and the Blockfuse open-source ecosystem.</>,
    ],
  },
  {
    company: 'Hackathons',
    url: '#',
    title: 'Hackathon Participant & Builder',
    range: '2023 — Present',
    badge: 'Builder',
    stack: ['Solidity', 'Hedera', 'Cairo', 'TypeScript', 'Next.js'],
    duties: [
      <><span className="text-green font-medium">🏆 Hedera Hackathon</span> — Built a decentralized solution leveraging <a href="https://hedera.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">Hedera's</a> hashgraph consensus, HTS token service, and HCS for verifiable on-chain messaging.</>,
      <><span className="text-green font-medium">⚡ ETHGlobal</span> — Participated in global Ethereum hackathons, shipping DeFi and Web3 tooling projects under 48-hour sprints.</>,
      <><span className="text-green font-medium">🌍 Web3Lagos</span> — Competed in Nigeria's premier Web3 hackathon, building blockchain solutions for African markets.</>,
      <><span className="text-green font-medium">🔥 Stacks Hackathon</span> — Built <span className="text-lightest-slate font-medium">TaskFlow</span>, a decentralized task OS on Stacks — won recognition for UX and smart contract design.</>,
      <><span className="text-green font-medium">🌱 Celo Build</span> — Built <span className="text-lightest-slate font-medium">CeloTasks</span>, a MiniPay-compatible micro-task protocol — recognized for mobile-first DeFi UX.</>,
    ],
  },
  {
    company: 'Open Source',
    url: 'https://github.com/Clement-coder',
    title: 'Open Source Contributor',
    range: '2023 — Present',
    badge: 'Active',
    stack: ['Solidity', 'TypeScript', 'React', 'Cairo', 'Rust'],
    duties: [
      <><a href="https://onlydust.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline font-medium">OnlyDust</a> — Contributor on the leading open-source platform for Web3 developers. Picked up issues, shipped PRs, and earned on-chain contribution rewards.</>,
      <><a href="https://www.codetriage.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline font-medium">CodeTriage</a> — Triaged and resolved issues across multiple open-source repositories, helping maintainers manage backlogs.</>,
      <><a href="https://bountysource.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline font-medium">BountySource</a> — Claimed and completed bounties on open-source bugs and features across the ecosystem.</>,
      <>Contributed to <a href="https://github.com/drips-network" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">Drips Network</a> — a protocol for streaming money and funding open-source software on-chain.</>,
      <>Maintained <a href="https://github.com/Clement-coder/web3-contract-collection" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">web3-contract-collection</a> — a reference library of production Solidity patterns used by other developers.</>,
    ],
  },
  {
    company: 'On-Chain Rep',
    url: 'https://app.talentprotocol.com',
    title: 'On-Chain Reputation & Identity',
    range: '2023 — Present',
    badge: 'Verified',
    stack: ['Talent Protocol', 'Gitcoin', 'Passport', 'ENS', 'POAP'],
    duties: [
      <><a href="https://app.talentprotocol.com" target="_blank" rel="noopener noreferrer" className="text-green hover:underline font-medium">Talent Protocol</a> — Building verifiable on-chain developer identity and reputation. Passport score reflects real contributions, skills, and community standing.</>,
      <><a href="https://gitcoin.co" target="_blank" rel="noopener noreferrer" className="text-green hover:underline font-medium">Gitcoin</a> — Active contributor and grant recipient. Funded public goods projects and participated in Gitcoin Grants rounds supporting the Web3 ecosystem.</>,
      <><a href="https://passport.gitcoin.co" target="_blank" rel="noopener noreferrer" className="text-green hover:underline font-medium">Gitcoin Passport</a> — Verified identity across multiple Web3 platforms, contributing to a high Passport score for Sybil resistance.</>,
      <><span className="text-lightest-slate font-medium">POAPs & NFT Credentials</span> — Collected proof-of-attendance and contribution NFTs from hackathons, conferences, and on-chain events.</>,
      <><span className="text-lightest-slate font-medium">GitHub Contributions</span> — Consistent open-source activity tracked on-chain via Talent Protocol's builder score algorithm.</>,
    ],
  },
  {
    company: 'Personal Projects',
    url: 'https://github.com/Clement-coder',
    title: 'Full Stack & Web3 Developer',
    range: '2023 — Present',
    badge: null,
    stack: ['React', 'Node.js', 'Next.js', 'Tailwind', 'MongoDB', 'Solidity'],
    duties: [
      <>Shipped <span className="text-lightest-slate font-medium">11+ production projects</span> spanning DeFi, NFT platforms, AgriTech, e-commerce, and developer tools — all live on Vercel.</>,
      <>Built <span className="text-lightest-slate font-medium">CeloTasks</span> — a MiniPay-compatible micro-task protocol on Celo with on-chain reputation and instant payments.</>,
      <>Built <span className="text-lightest-slate font-medium">TaskFlow</span> — a decentralized task OS for teams on Stacks with wallet-native collaboration.</>,
      <>Built <span className="text-lightest-slate font-medium">Plateau Potatoes</span> — a farm-to-doorstep e-commerce platform for fresh produce from Jos Plateau.</>,
      <>Built <span className="text-lightest-slate font-medium">Cipherlink</span> — secure message encryption and sharing with local history tracking.</>,
      <>Designed and built this portfolio from scratch — pixel-perfect, fully responsive, and animated with Framer Motion.</>,
    ],
  },
  {
    company: 'Blockfuse Intern',
    url: 'https://blockfuselabs.com',
    title: 'Frontend & Backend Developer Intern',
    range: '2023 — 2024',
    badge: null,
    stack: ['React', 'JavaScript', 'Solidity', 'Node.js', 'CSS'],
    duties: [
      <>Integrated smart contract calls into React frontends using <span className="text-lightest-slate font-medium">ethers.js</span> and Web3.js — bridging on-chain logic with polished UIs.</>,
      <>Deployed and tested contracts on Goerli and Sepolia testnets, learning the full DApp development lifecycle end-to-end.</>,
      <>Built and shipped backend REST APIs with <span className="text-lightest-slate font-medium">Node.js and Express</span> — handling auth, data persistence, and third-party integrations.</>,
      <>Collaborated on UI/UX designs that became the foundation for Blockfuse's internal tooling and client projects.</>,
      <>Went from zero blockchain knowledge to <span className="text-lightest-slate font-medium">shipping a working DApp in under 6 months</span>.</>,
    ],
  },
];

const langColor = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Solidity: '#aa6746',
  Python: '#3572A5', Rust: '#dea584', CSS: '#563d7c', HTML: '#e34c26',
  Cairo: '#f39914', Go: '#00ADD8', Shell: '#89e051',
};

const Skeleton = ({ className }) => (
  <span className={`inline-block bg-lightest-navy/40 rounded animate-pulse ${className}`} />
);

const GitHubActivity = () => {
  const username = 'Clement-coder';
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ repos: null, stars: null, forks: null, followers: null, prs: null });
  const [repoTab, setRepoTab] = useState('own');
  const [allRepos, setAllRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [recentEvents, setRecentEvents] = useState([]);
  const [repoLangs, setRepoLangs] = useState({});

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setStats(s => ({ ...s, repos: data.public_repos, followers: data.followers }));
      });

    fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`)
      .then(r => r.json())
      .then(data => setStats(s => ({ ...s, prs: data.total_count })));

    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setRecentEvents(data); });

    Promise.all([1, 2, 3].map(page =>
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&page=${page}`)
        .then(r => r.json())
        .then(d => Array.isArray(d) ? d : [])
    )).then(pages => {
      const all = pages.flat();
      const stars = all.reduce((acc, r) => acc + r.stargazers_count, 0);
      const forks = all.reduce((acc, r) => acc + r.forks_count, 0);
      setStats(s => ({ ...s, stars, forks }));
      setAllRepos(all);
      setReposLoading(false);

      // Fetch language for forked repos that have no language set
      const forked = all.filter(r => r.fork && !r.language);
      Promise.all(
        forked.slice(0, 12).map(r =>
          fetch(`https://api.github.com/repos/${r.full_name}/languages`)
            .then(res => res.json())
            .then(langs => {
              const top = Object.keys(langs)[0] || null;
              return [r.id, top];
            })
            .catch(() => [r.id, null])
        )
      ).then(results => {
        setRepoLangs(Object.fromEntries(results));
      });
    });
  }, []);

  const own = allRepos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
  const forked = allRepos.filter(r => r.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const visible = (repoTab === 'own' ? own : forked).slice(0, 6);

  const contributions = recentEvents
    .filter(e => ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'ForkEvent'].includes(e.type))
    .reduce((acc, e) => {
      const key = e.repo.name;
      if (!acc.find(x => x.repo === key)) acc.push({ repo: key, type: e.type, url: `https://github.com/${key}`, at: e.created_at });
      return acc;
    }, [])
    .slice(0, 6);

  const eventLabel = { PushEvent: 'pushed to', PullRequestEvent: 'opened PR in', IssuesEvent: 'opened issue in', CreateEvent: 'created', ForkEvent: 'forked' };

  const getRepoLang = (repo) => repo.language || repoLangs[repo.id] || null;

  return (
    <div className="mt-16 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(100,255,218,0.12)', boxShadow: '0 0 40px rgba(100,255,218,0.04)' }}>
      {/* Profile header */}
      <div className="flex items-center gap-4 px-5 py-4 bg-light-navy border-b border-lightest-navy/40">
        {profile?.avatar_url
          ? <img src={profile.avatar_url} alt="Clement Raymond" className="w-12 h-12 rounded-full border-2 border-green/40" />
          : <Skeleton className="w-12 h-12 rounded-full" />
        }
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm text-lightest-slate font-medium">{profile?.name || username}</span>
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="font-mono text-xs text-slate">@{username}</span>
          </div>
          <p className="font-mono text-xs text-slate/70 mt-0.5 truncate">{profile?.bio || ''}</p>
        </div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
          className="font-mono text-xs text-slate hover:text-green transition-colors flex items-center gap-1 flex-shrink-0">
          View profile <ExternalLink size={11} />
        </a>
      </div>

      {/* Contribution graph */}
      <div className="bg-navy/60 p-4">
        <img src={`https://ghchart.rshah.org/64ffda/${username}`} alt="GitHub contribution graph"
          className="w-full rounded opacity-90" />
        <p className="font-mono text-xs text-slate/60 mt-2 text-center">contribution activity · {username}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-lightest-navy/40 border-t border-lightest-navy/40">
        {[
          { label: 'Repos', value: stats.repos, icon: GitFork },
          { label: 'Followers', value: stats.followers, icon: Star },
          { label: 'Stars', value: stats.stars, icon: Star },
          { label: 'Forks', value: stats.forks, icon: GitFork },
          { label: 'Pull Requests', value: stats.prs, icon: GitPullRequest },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center py-4 gap-1">
            <Icon size={13} className="text-green" />
            <span className="text-lightest-slate font-bold text-base">
              {value === null ? <Skeleton className="w-8 h-4" /> : value}
            </span>
            <span className="font-mono text-[10px] text-slate text-center">{label}</span>
          </div>
        ))}
      </div>

      {/* Recent contributions */}
      {contributions.length > 0 && (
        <div className="border-t border-lightest-navy/40 px-4 py-4">
          <p className="font-mono text-xs text-green uppercase tracking-widest mb-3">Recent Activity</p>
          <div className="space-y-2">
            {contributions.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate">
                <span className="text-green flex-shrink-0">▹</span>
                <span className="text-slate/60">{eventLabel[c.type] || 'contributed to'}</span>
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  className="text-lightest-slate hover:text-green transition-colors truncate">
                  {c.repo}
                </a>
                <span className="text-slate/40 flex-shrink-0 ml-auto">
                  {new Date(c.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Repos section */}
      <div className="border-t border-lightest-navy/40">
        <div className="flex border-b border-lightest-navy/40">
          {[
            { key: 'own', label: `My Repos (${reposLoading ? '…' : own.length})` },
            { key: 'forked', label: `Forked (${reposLoading ? '…' : forked.length})` },
          ].map(t => (
            <button key={t.key} onClick={() => setRepoTab(t.key)}
              className={`font-mono text-xs px-5 py-3 transition-colors border-b-2 -mb-px ${
                repoTab === t.key ? 'text-green border-green' : 'text-slate border-transparent hover:text-green'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3 p-4">
          {reposLoading
            ? Array(4).fill(0).map((_, i) => <div key={i} className="h-24 bg-lightest-navy/20 rounded-xl animate-pulse" />)
            : visible.map(repo => {
                const lang = getRepoLang(repo);
                return (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-4 bg-navy rounded-xl group relative overflow-hidden"
                    style={{ border: '1px solid rgba(35,53,84,0.8)' }}
                    whileHover={{ borderColor: 'rgba(100,255,218,0.35)', boxShadow: '0 0 20px rgba(100,255,218,0.07)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Top glow on hover */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-mono text-sm text-lightest-slate group-hover:text-green transition-colors truncate">
                          {repo.fork && <span className="text-slate/50 mr-1 text-xs">⑂</span>}{repo.name}
                        </p>
                        <ExternalLink size={12} className="text-slate/40 group-hover:text-green/60 transition-colors flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-slate line-clamp-2 leading-relaxed">
                        {repo.description || <span className="italic text-slate/40">No description</span>}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      {lang && (
                        <span className="flex items-center gap-1.5 font-mono text-xs text-slate">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: langColor[lang] || '#8892b0' }} />
                          {lang}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 font-mono text-xs text-slate">
                          <Star size={11} className="text-yellow-400/70" /> {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1 font-mono text-xs text-slate">
                          <GitFork size={11} /> {repo.forks_count}
                        </span>
                      )}
                      <span className="ml-auto font-mono text-[10px] text-slate/40">
                        {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                      </span>
                    </div>
                  </motion.a>
                );
              })
          }
        </div>

        <div className="px-4 pb-4 text-center">
          <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-slate hover:text-green transition-colors">
            See all {stats.repos || ''} repositories on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [active, setActive] = useState(0);
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
    <section id="experience" className="py-24 max-w-3xl">
      <h2 className="numbered-heading">Where I've Worked</h2>

      <div ref={ref} className="fade-up flex flex-col sm:flex-row gap-0">
        {/* Tab list — horizontal scroll on mobile, vertical on desktop */}
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible border-b sm:border-b-0 sm:border-l border-lightest-navy scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {jobs.map((job, i) => (
            <button
              key={job.company + i}
              onClick={() => setActive(i)}
              className={`font-mono text-sm px-5 py-3 text-left whitespace-nowrap transition-all duration-200 border-b-2 sm:border-b-0 sm:border-l-2 -mb-px sm:-ml-px flex-shrink-0 ${
                active === i
                  ? 'text-green border-green bg-light-navy'
                  : 'text-slate border-transparent hover:text-green hover:bg-light-navy/50'
              }`}
            >
              {job.company}
              {job.badge && (
                <span className="ml-2 text-[10px] text-green border border-green/40 rounded px-1 py-0.5">
                  {job.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div className="pt-4 sm:pt-0 sm:pl-8 flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lightest-slate text-xl font-medium mb-1">
                {jobs[active].title}{' '}
                <span className="text-green">
                  @{' '}
                  <a href={jobs[active].url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {jobs[active].company}
                  </a>
                </span>
              </h3>
              <p className="font-mono text-sm text-slate mb-4">{jobs[active].range}</p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {jobs[active].stack.map((t) => (
                  <span key={t} className="font-mono text-xs text-green bg-green/10 border border-green/20 rounded-full px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-4">
                {jobs[active].duties.map((d, i) => (
                  <li key={i} className="flex gap-3 text-slate leading-relaxed">
                    <span className="text-green mt-1 flex-shrink-0">▹</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* GitHub Activity */}
      <div className="pt-24">
        <h2 id="github" className="numbered-heading" style={{ scrollMarginTop: '100px' }}>Open Source & GitHub</h2>
        <GitHubActivity />
      </div>

      <div className="mt-10">
        <Link
          to="/resume"
          className="font-mono text-sm text-green border border-green rounded px-7 py-4 hover:bg-green/10 transition-colors inline-flex items-center gap-2"
        >
          View Full Résumé <ExternalLink size={14} />
        </Link>
      </div>
    </section>
  );
};

export default Experience;
