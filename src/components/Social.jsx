import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, TwitterIcon, DiscordIcon, FacebookIcon, TelegramIcon } from './Icons';

const links = [
  { Icon: GithubIcon, href: 'https://github.com/Clement-coder', label: 'GitHub' },
  { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/clement-raymond-861154335/', label: 'LinkedIn' },
  { Icon: TwitterIcon, href: 'https://x.com/PhantomOfCode', label: 'Twitter' },
  { Icon: DiscordIcon, href: 'https://discord.com/users/clement_ray', label: 'Discord' },
  { Icon: FacebookIcon, href: 'https://web.facebook.com/profile.php?id=61576995156869', label: 'Facebook' },
  { Icon: TelegramIcon, href: 'https://t.me/phantomOvCode', label: 'Telegram' },
];

export const socialLinks = links;

const Social = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.5 }}
    className="hidden lg:flex fixed bottom-0 left-10 z-40 flex-col items-center gap-5"
  >
    {links.map(({ Icon, href, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-light-slate hover:text-green hover:-translate-y-1 transition-all duration-200"
      >
        <Icon size={20} />
      </a>
    ))}
    {/* vertical line to bottom */}
    <div className="w-px h-24 bg-light-slate/50 mt-1" />
  </motion.div>
);

export default Social;
