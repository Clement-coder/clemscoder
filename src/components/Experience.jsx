import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, GitFork, GitPullRequest } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    company: 'Blockfuse Labs',
    url: 'https://blockfuselabs.com',
    title: 'Blockchain Developer & Web3 Innovator',
    range: '2025 — Present',
    badge: 'Current',
    stack: ['Solidity', 'React', 'Next.js', 'Hardhat', 'Web3.js', 'USDC'],
    duties: [
      <>Architect and ship <span className="text-lightest-slate font-medium">production-grade smart contracts</span> deployed on Ethereum, Base, and Starknet — optimized for gas efficiency and security.</>,
      <>Contributed to <span className="text-green font-medium">open-source projects</span> including <a href="https://github.com/drips-network" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">Drips Network</a> (decentralized funding protocol) and multiple Web3 tooling repos.</>,
      <>Built <span className="text-lightest-slate font-medium">RecurChain</span> — a live recurring crypto payment system on Base using USDC and autonomous payment agents.</>,
      <>Mentored a cohort of <span className="text-lightest-slate font-medium">10+ junior developers</span> on React, Solidity, and DeFi fundamentals.</>,
      <>Explored and integrated <span className="text-lightest-slate font-medium">Account Abstraction (ERC-4337)</span> for gasless wallet UX on Starknet.</>,
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
      <>Contributed to <a href="https://github.com/drips-network" target="_blank" rel="noopener noreferrer" className="text-green hover:underline">Drips Network</a> — a protocol for streaming money and funding open-source software on-chain.</>,
      <>Submitted PRs and bug fixes to multiple <span className="text-lightest-slate font-medium">Web3 tooling libraries</span> across the Ethereum and Starknet ecosystems.</>,
      <>Maintained and published <span className="text-lightest-slate font-medium">web3-contract-collection</span> — a reference library of production Solidity patterns used by other developers.</>,
      <>Active on GitHub with consistent contributions — smart contracts, frontend integrations, and developer tooling.</>,
    ],
  },
  {
    company: 'Personal Projects',
    url: 'https://github.com/Clement-coder',
    title: 'Full Stack & Web3 Developer',
    range: '2023 — 2025',
    badge: null,
    stack: ['React', 'Node.js', 'Next.js', 'Tailwind', 'MongoDB'],
    duties: [
      <>Shipped <span className="text-lightest-slate font-medium">11 production projects</span> spanning DeFi, NFT marketplaces, AI agents, and AgriTech — all live on Vercel.</>,
      <>Built <span className="text-lightest-slate font-medium">AxiomSphere</span>, a decentralized AI agent platform with on-chain micropayments and autonomous task execution.</>,
      <>Developed <span className="text-lightest-slate font-medium">Foodra</span>, a blockchain-powered agricultural platform connecting farmers to credit, insurance, and markets.</>,
      <>Designed and built this portfolio from scratch — pixel-perfect, fully responsive, and animated.</>,
    ],
  },
  {
    company: 'Blockfuse Intern',
    url: 'https://blockfuselabs.com',
    title: 'Frontend & Backend Developer Intern',
    range: '2022 — 2023',
    badge: null,
    stack: ['React', 'JavaScript', 'Solidity', 'CSS'],
    duties: [
      <>Integrated smart contract calls into React frontends using <span className="text-lightest-slate font-medium">ethers.js</span> and Web3.js.</>,
      <>Deployed and tested contracts on Goerli and Sepolia testnets, learning the full DApp development lifecycle.</>,
      <>Collaborated on UI/UX designs that became the foundation for Blockfuse's internal tooling.</>,
      <>Went from zero blockchain knowledge to shipping a working DApp in under 6 months.</>,
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

  useEffect(() => {
    // Profile
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setStats(s => ({ ...s, repos: data.public_repos, followers: data.followers }));
      });

    // PRs
    fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`)
      .then(r => r.json())
      .then(data => setStats(s => ({ ...s, prs: data.total_count })));

    // Recent public events (contributions)
    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRecentEvents(data);
      });

    // All repos — paginate all 3 pages in parallel
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
    });
  }, []);

  const own = allRepos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
  const forked = allRepos.filter(r => r.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const visible = (repoTab === 'own' ? own : forked).slice(0, 6);

  // Deduplicate recent contributions by repo
  const contributions = recentEvents
    .filter(e => ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'ForkEvent'].includes(e.type))
    .reduce((acc, e) => {
      const key = e.repo.name;
      if (!acc.find(x => x.repo === key)) acc.push({ repo: key, type: e.type, url: `https://github.com/${key}`, at: e.created_at });
      return acc;
    }, [])
    .slice(0, 6);

  const eventLabel = { PushEvent: 'pushed to', PullRequestEvent: 'opened PR in', IssuesEvent: 'opened issue in', CreateEvent: 'created', ForkEvent: 'forked' };

  return (
    <div className="mt-16 border border-lightest-navy/40 rounded-lg overflow-hidden">
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
            ? Array(4).fill(0).map((_, i) => <div key={i} className="h-24 bg-lightest-navy/20 rounded animate-pulse" />)
            : visible.map(repo => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col justify-between p-4 bg-navy border border-lightest-navy/30 rounded hover:border-green/40 transition-colors group">
                  <div>
                    <p className="font-mono text-sm text-lightest-slate group-hover:text-green transition-colors truncate mb-1">
                      {repo.fork ? <span className="text-slate/50 mr-1">⑂</span> : null}{repo.name}
                    </p>
                    <p className="text-xs text-slate line-clamp-2 leading-relaxed">
                      {repo.description || 'No description'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    {repo.language && (
                      <span className="flex items-center gap-1 font-mono text-xs text-slate">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor[repo.language] || '#8892b0' }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 font-mono text-xs text-slate">
                        <Star size={11} /> {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 font-mono text-xs text-slate">
                        <GitFork size={11} /> {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              ))
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
        {/* Tab list */}
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-visible border-b sm:border-b-0 sm:border-l border-lightest-navy min-w-max">
          {jobs.map((job, i) => (
            <button
              key={job.company + i}
              onClick={() => setActive(i)}
              className={`font-mono text-sm px-5 py-3 text-left whitespace-nowrap transition-all duration-200 border-b-2 sm:border-b-0 sm:border-l-2 -mb-px sm:-ml-px ${
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
