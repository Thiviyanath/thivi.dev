'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

interface WormholeProps {
  nextSectionId: string;
  nextSectionName: string;
  sectionNumber: string;
}

export function NextSectionWormhole({
  nextSectionId,
  nextSectionName,
  sectionNumber,
}: WormholeProps) {
  const handleJump = () => {
    sound.playSuccess();
    const element = document.getElementById(nextSectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full pt-16 pb-8 flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-xl border-t border-emerald-500/20 mb-12 relative flex justify-center">
        <span className="bg-[#050807] px-4 text-[10px] text-emerald-500 uppercase tracking-widest absolute -top-2.5">
          // CONTINUED SYNTHESIS
        </span>
      </div>

      <motion.button
        onClick={handleJump}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-8 py-5 rounded-2xl bg-black/80 border border-emerald-500/40 hover:border-emerald-400 overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/20 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex items-center space-x-4">
          <div className="text-left">
            <span className="text-[10px] text-gray-400 block uppercase font-mono">
              PROCEED TO // SECTION {sectionNumber}
            </span>
            <span className="text-base md:text-lg font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
              {nextSectionName}
            </span>
          </div>

          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300">
            <span className="text-lg font-bold group-hover:translate-y-0.5 transition-transform">↓</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}