'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

export function GestureSimulator() {
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [gesture, setGesture] = useState('TRACKING LANDMARKS');
  const [isPinching, setIsPinching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setCursorPos({ x, y });
  };

  const handleMouseDown = () => {
    setIsPinching(true);
    setGesture('INDEX-THUMB PINCH DETECTED (TRIGGER CLICK)');
    sound.playClick();
  };

  const handleMouseUp = () => {
    setIsPinching(false);
    setGesture('TRACKING 21 3D HAND LANDMARKS');
  };

  return (
    <div className="border border-emerald-500/40 bg-black/90 rounded-2xl p-6 font-mono text-white my-8">
      <div className="flex justify-between items-center pb-3 border-b border-emerald-500/20 mb-4">
        <div>
          <span className="text-emerald-400 text-[10px] uppercase">// LIVE CV SIMULATION</span>
          <h3 className="text-lg font-bold text-white">NeuroTouch Gesture Control Sandbox</h3>
        </div>
        <span className="text-xs text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full">
          60 FPS Landmark Pipeline
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        Move your mouse over the radar canvas below to simulate camera hand tracking. Click and hold to simulate a hand gesture pinch click.
      </p>

      {/* Camera Simulator Box */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="relative w-full h-64 bg-emerald-950/20 border border-emerald-500/30 rounded-xl overflow-hidden cursor-crosshair flex items-center justify-center select-none"
      >
        {/* Radar Overlay Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 border-t border-emerald-500/10 pointer-events-none" />
        <div className="absolute left-1/2 top-0 bottom-0 border-l border-emerald-500/10 pointer-events-none" />

        {/* Dynamic Hand Tracker Pointer */}
        <motion.div
          animate={{
            x: `${cursorPos.x}%`,
            y: `${cursorPos.y}%`,
            scale: isPinching ? 0.7 : 1,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center"
        >
          <div className={`w-10 h-10 rounded-full border ${isPinching ? 'border-yellow-400 bg-yellow-400/20' : 'border-emerald-400 bg-emerald-400/10'} animate-ping`} />
          <div className={`absolute w-4 h-4 rounded-full ${isPinching ? 'bg-yellow-400 shadow-[0_0_15px_#facc15]' : 'bg-emerald-400 shadow-[0_0_15px_#10b981]'}`} />
        </motion.div>

        {/* Live Tracking Telemetry overlay */}
        <div className="absolute bottom-3 left-3 text-[10px] text-emerald-400 bg-black/80 px-3 py-1.5 rounded border border-emerald-500/30">
          <span>X: {cursorPos.x.toFixed(1)}% | Y: {cursorPos.y.toFixed(1)}% | STATUS: </span>
          <span className={isPinching ? 'text-yellow-400 font-bold' : 'text-emerald-300'}>{gesture}</span>
        </div>
      </div>
    </div>
  );
}