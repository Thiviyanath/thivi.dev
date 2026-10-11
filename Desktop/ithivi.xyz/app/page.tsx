'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { BootLoader } from './components/BootLoader';
import { InteractiveCLI } from './components/InteractiveCLI';
import { PeriodicElement } from './components/PeriodicElement';
import { AIPatchSimulator } from './components/AIPatchSimulator';
import { GestureSimulator } from './components/GestureSimulator';
import { NextSectionWormhole } from './components/NextSectionWormhole';
import { SystemTelemetryHUD } from './components/SystemTelemetryHUD';
import { sound } from './utils/sound';

const TECH_CATEGORIES = ['ALL', 'LANGUAGES', 'FRAMEWORKS', 'DEVOPS & CLOUD', 'DATABASES & AI'];

const TECH_STACK = [
  { symbol: 'Py', name: 'Python', num: 1, cat: 'LANGUAGES', purity: '99.5%', desc: 'AST, OpenCV, TensorFlow, Flask' },
  { symbol: 'Ts', name: 'TypeScript', num: 2, cat: 'LANGUAGES', purity: '98.0%', desc: 'Next.js, React, Node.js' },
  { symbol: 'Js', name: 'JavaScript', num: 3, cat: 'LANGUAGES', purity: '98.5%', desc: 'Modern ES6+, Web APIs, React State' },
  { symbol: 'Ja', name: 'Java', num: 4, cat: 'LANGUAGES', purity: '92.0%', desc: 'OOP, Data Structures & Algorithms' },
  { symbol: 'Re', name: 'React', num: 5, cat: 'FRAMEWORKS', purity: '98.5%', desc: 'Next.js, Framer Motion, UI Architecture' },
  { symbol: 'Fl', name: 'Flask', num: 6, cat: 'FRAMEWORKS', purity: '90.0%', desc: 'Python Micro-framework REST APIs' },
  { symbol: 'Dk', name: 'Docker', num: 7, cat: 'DEVOPS & CLOUD', purity: '95.0%', desc: 'Containerization & Microservices' },
  { symbol: 'Aws', name: 'AWS Cloud', num: 8, cat: 'DEVOPS & CLOUD', purity: '90.0%', desc: 'EC2, S3, IAM, Cloud Foundations' },
  { symbol: 'Gcp', name: 'GCP Basics', num: 9, cat: 'DEVOPS & CLOUD', purity: '85.0%', desc: 'Google Cloud Infrastructure' },
  { symbol: 'Pg', name: 'PostgreSQL', num: 10, cat: 'DATABASES & AI', purity: '96.0%', desc: 'Relational Schema & Odoo ORM' },
  { symbol: 'Cv', name: 'OpenCV', num: 11, cat: 'DATABASES & AI', purity: '94.0%', desc: 'MediaPipe Gesture Landmark Systems' },
  { symbol: 'Tf', name: 'TensorFlow', num: 12, cat: 'DATABASES & AI', purity: '88.0%', desc: 'CNN Deep Learning Classifiers' }
];

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeStackTab, setActiveStackTab] = useState('ALL');
  const [hoveredTech, setHoveredTech] = useState<typeof TECH_STACK[0] | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const filteredTech = activeStackTab === 'ALL'
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.cat === activeStackTab);

  return (
    <div className="relative min-h-screen bg-[#050807] text-white font-mono selection:bg-emerald-500 selection:text-black">
      {/* Booting Loader Animation */}
      <AnimatePresence>
        {isBooting && <BootLoader onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <ThreeBackground />
      <CustomCursor />
      <Navbar />
      <SystemTelemetryHUD />

      {/* SECTION 1: HERO & TERMINAL CLI */}
      <section id="hero" className="relative z-10 min-h-screen pt-32 pb-16 px-6 flex flex-col justify-between max-w-6xl mx-auto">
        <div className="text-center pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] tracking-widest uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Software Engineer & DevOps Specialist</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-4"
          >
            PURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">CODE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-xs md:text-sm leading-relaxed mb-8"
          >
            Architecting full-stack web applications, AI analysis engines, and automated DevOps infrastructure with high yield and zero security compromises[cite: 1].
          </motion.p>
        </div>

        {/* Command CLI Workspace */}
        <div className="w-full max-w-4xl mx-auto my-8">
          <InteractiveCLI />
        </div>

        {/* Jump Wormhole to Section 2 */}
        <NextSectionWormhole
          nextSectionId="stack"
          nextSectionName="INVENTORY STACK"
          sectionNumber="02"
        />
      </section>

      {/* SECTION 2: TECH STACK PERIODIC TABLE */}
      <section id="stack" className="relative z-10 min-h-screen py-24 px-6 max-w-6xl mx-auto flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 border-b border-emerald-500/20 pb-6"
        >
          <span className="text-emerald-400 text-xs tracking-widest uppercase">// INVENTORY CATALOG</span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mt-1">
            Periodic Table of Stack
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveStackTab(cat);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                activeStackTab === cat
                  ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-black/60 text-emerald-400/80 border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.symbol}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => {
                  sound.playClick();
                  setHoveredTech(tech);
                }}
                onMouseLeave={() => setHoveredTech(null)}
                className="cursor-pointer"
              >
                <PeriodicElement
                  symbol={tech.symbol}
                  name={tech.name}
                  number={tech.num}
                  category={tech.cat}
                  purity={tech.purity}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {hoveredTech && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex justify-between items-center backdrop-blur-md"
            >
              <div>
                <span className="text-white font-bold mr-2">[{hoveredTech.symbol}] {hoveredTech.name}:</span>
                <span>{hoveredTech.desc}</span>
              </div>
              <span className="text-emerald-400 font-bold uppercase">{hoveredTech.purity} Purity</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jump Wormhole to Section 3 */}
        <NextSectionWormhole
          nextSectionId="projects"
          nextSectionName="INTERACTIVE AI & CV LAB"
          sectionNumber="04"
        />
      </section>

      {/* SECTION 3: INTERACTIVE PROJECTS LAB */}
      <section id="projects" className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
        <div className="mb-8 border-b border-emerald-500/20 pb-6">
          <span className="text-emerald-400 text-xs tracking-widest uppercase">// SYNTHESIS PIPELINE</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
            Interactive AI & CV Workbenches
          </h2>
        </div>

        <AIPatchSimulator />
        <GestureSimulator />
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-emerald-500/10 py-12 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 Thiviyanath Maheswaran • Kalubowila Colombo[cite: 1]</p>
        <p className="mt-1 text-emerald-400/80">Built with Next.js, Framer Motion & Lenis Smooth Motion</p>
      </footer>
    </div>
  );
}