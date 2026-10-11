'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function SystemTelemetryHUD() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const calcFps = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(calcFps);
    };

    animationFrameId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center space-x-3 bg-black/80 backdrop-blur-xl border border-emerald-500/30 rounded-xl px-3.5 py-2 text-[10px] font-mono text-emerald-400 shadow-[0_0_20px_rgba(0,0,0,0.8)] pointer-events-none select-none"
    >
      <div className="flex items-center space-x-1.5 border-r border-emerald-500/20 pr-3">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-bold text-white">VAPOR-OS</span>
      </div>

      <div className="border-r border-emerald-500/20 pr-3">
        <span className="text-gray-400">FPS: </span>
        <span className="text-emerald-300 font-bold">{fps}</span>
      </div>

      <div>
        <span className="text-gray-400">YIELD: </span>
        <span className="text-yellow-400 font-bold">99.99% PURE</span>
      </div>
    </motion.div>
  );
}