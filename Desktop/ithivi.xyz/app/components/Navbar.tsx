'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { name: '// HOME', path: '/' },
  { name: '// ABOUT & STACK', path: '/about' },
  { name: '// EXPERIENCE & ROLES', path: '/experience' },
  { name: '// PROJECT BATCHES', path: '/projects' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-emerald-500/10 bg-black/60 px-8 py-5 flex justify-between items-center font-mono">
      <Link href="/" className="flex items-center space-x-2 group">
        <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center font-bold text-emerald-400 text-sm group-hover:bg-emerald-500 group-hover:text-black transition-all">
          Th
        </div>
        <span className="text-sm font-semibold tracking-wider uppercase text-gray-300">
          Thiviyanath <span className="text-emerald-400">M.</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8 text-xs">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-colors duration-300 tracking-wider ${
              pathname === item.path
                ? 'text-emerald-400 font-bold border-b border-emerald-400 pb-0.5'
                : 'text-gray-400 hover:text-emerald-300'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <a
        href="mailto:thiviyanath15@gmail.com"
        className="px-4 py-2 rounded-lg text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300"
      >
        INITIATE CONTACT
      </a>
    </nav>
  );
}