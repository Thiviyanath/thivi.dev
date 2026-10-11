'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

const BOOT_LOGS = [
  'INITIALIZING VAPOR-OS KERNEL v2.4.9...',
  'LOADING AST PARSER & AGENT REASONING PIPELINE...',
  'ESTABLISHING WEBGPU / THREE.JS CANVAS CONTEXT...',
  'MOUNTING WEBAUDIO HAPTIC FEEDBACK ENGINE...',
  'VERIFYING PRODUCT PURITY: 99.99% OK',
  'SYSTEM READY. ACCESS GRANTED.'
];

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar tick
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Terminal log line sequence
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        sound.playClick();
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        }
        clearInterval(logInterval);
        setTimeout(() => {
          sound.playSuccess();
          onComplete();
        }, 600);
        return prev;
      });
    }, 450);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-[#050807] flex flex-col justify-between p-8 md:p-16 font-mono text-white select-none"
    >
      {/* Top Telemetry Header */}
      <div className="flex justify-between items-center text-xs text-gray-500 border-b border-emerald-500/20 pb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold tracking-widest">// VAPOR-LAB BOOT SEQUENCE</span>
        </div>
        <span>LOCATION: COLOMBO / LK</span>
      </div>

      {/* Main Terminal Boot Stream */}
      <div className="max-w-3xl my-auto space-y-3">
        <div className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-8">
          THIVIYANATH <span className="text-emerald-400">M.</span>
        </div>

        <div className="space-y-2 text-xs md:text-sm text-emerald-400">
          {BOOT_LOGS.slice(0, currentLogIndex + 1).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <span className="text-yellow-400 font-bold">[OK]</span>
              <span>{log}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>SYSTEM LOADING PIPELINE</span>
          <span className="text-emerald-400 font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-emerald-950/60 rounded-full overflow-hidden border border-emerald-500/30">
          <motion.div
            className="h-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}