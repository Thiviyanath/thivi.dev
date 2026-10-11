'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

const NAV_ITEMS = [
  { id: 'hero', number: '01', label: 'HERO' },
  { id: 'stack', number: '02', label: 'STACK' },
  { id: 'experience', number: '03', label: 'EXPERIENCE' },
  { id: 'projects', number: '04', label: 'INTERACTIVE LAB' },
];

interface NavbarProps {
  activeSection?: string;
}

export function Navbar({ activeSection = 'hero' }: NavbarProps) {
  const [currentSection, setCurrentSection] = useState(activeSection);

  // Intersection Observer to track exact active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      sections.forEach((section) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sound.playClick();
    setCurrentSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto font-mono">
      <nav className="relative bg-black/80 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl p-2.5 md:p-3 flex items-center justify-between shadow-[0_0_30px_rgba(0,0,0,0.9)]">
        
        {/* Brand Badge */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center font-black text-emerald-400 text-sm group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
            Th
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-black tracking-widest text-white uppercase block">
              Thiviyanath <span className="text-emerald-400">M.</span>
            </span>
            <span className="text-[9px] text-emerald-400/70 tracking-tight block">
              LOC: // {NAV_ITEMS.find((n) => n.id === currentSection)?.label}
            </span>
          </div>
        </div>

        {/* Dynamic Sliding Section Pill Nav */}
        <div className="flex items-center bg-black/60 p-1 rounded-xl border border-emerald-500/20">
          {NAV_ITEMS.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 md:px-4 py-1.5 text-xs tracking-wider transition-colors duration-300 rounded-lg flex items-center space-x-1.5 ${
                  isActive ? 'text-black font-extrabold' : 'text-gray-400 hover:text-emerald-300'
                }`}
              >
                {/* Active Sliding Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-emerald-400 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10 text-[10px] opacity-70">// {item.number}</span>
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <a
          href="mailto:thiviyanath15@gmail.com"
          onClick={() => sound.playSuccess()}
          className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>INITIATE CONTACT</span>
        </a>
      </nav>
    </header>
  );
}