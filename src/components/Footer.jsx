import React from 'react';
import { socialLinks } from './Social';

const Footer = () => (
  <footer className="py-6 text-center">
    {/* Mobile social links */}
    <div className="flex justify-center flex-wrap gap-6 mb-4 lg:hidden">
      {socialLinks.map(({ Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
          className="text-light-slate hover:text-green transition-colors">
          <Icon size={20} />
        </a>
      ))}
    </div>

    <a
      href="https://github.com/Clement-coder"
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-xs text-slate hover:text-green transition-colors"
    >
      <div>Designed &amp; Built by Clement Raymond</div>
      <div className="mt-1">© {new Date().getFullYear()} · All rights reserved</div>
    </a>
  </footer>
);

export default Footer;
