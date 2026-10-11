'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PeriodicElement } from '../components/PeriodicElement';

const TABS = [
  { id: 'ALL', label: '[00] ALL ELEMENTS' },
  { id: 'LANGUAGES', label: '[01] CORE LANGUAGES' },
  { id: 'FRAMEWORKS', label: '[02] FRAMEWORKS & LIBRARIES' },
  { id: 'DEVOPS', label: '[03] CLOUD & DEVOPS' },
  { id: 'AI', label: '[04] DATABASES & AI' },
];

const STACK_DATA = [
  { symbol: 'Py', name: 'Python', num: 1, cat: 'LANGUAGES', purity: '99.5%', desc: 'AST, OpenCV, TensorFlow, Flask' },
  { symbol: 'Ts', name: 'TypeScript', num: 2, cat: 'LANGUAGES', purity: '98.0%', desc: 'Next.js, React, Node.js' },
  { symbol: 'Js', name: 'JavaScript', num: 3, cat: 'LANGUAGES', purity: '98.5%', desc: 'ES6+, Web APIs, React State' },
  { symbol: 'Ja', name: 'Java', num: 4, cat: 'LANGUAGES', purity: '92.0%', desc: 'OOP, Data Structures & Algorithms' },
  { symbol: 'Re', name: 'React', num: 5, cat: 'FRAMEWORKS', purity: '98.5%', desc: 'Next.js, Framer Motion, UI Architecture' },
  { symbol: 'Fl', name: 'Flask', num: 6, cat: 'FRAMEWORKS', purity: '90.0%', desc: 'Python REST Microservices' },
  { symbol: 'Dk', name: 'Docker', num: 7, cat: 'DEVOPS', purity: '95.0%', desc: 'Containerization & Microservices' },
  { symbol: 'Aws', name: 'AWS Cloud', num: 8, cat: 'DEVOPS', purity: '90.0%', desc: 'EC2, S3, IAM, Cloud Foundations' },
  { symbol: 'Gcp', name: 'GCP Basics', num: 9, cat: 'DEVOPS', purity: '85.0%', desc: 'Cloud Infrastructure' },
  { symbol: 'Pg', name: 'PostgreSQL', num: 10, cat: 'AI', purity: '96.0%', desc: 'Schema Design & Odoo ORM' },
  { symbol: 'Cv', name: 'OpenCV', num: 11, cat: 'AI', purity: '94.0%', desc: 'MediaPipe Landmark Systems' },
  { symbol: 'Tf', name: 'TensorFlow', num: 12, cat: 'AI', purity: '88.0%', desc: 'CNN Deep Learning Classifiers' },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [hoveredTech, setHoveredTech] = useState<typeof STACK_DATA[0] | null>(null);

  const filteredTech = activeTab === 'ALL' ? STACK_DATA : STACK_DATA.filter((item) => item.cat === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-mono text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-emerald-500/20 pb-8">
        <span className="text-emerald-400 text-xs tracking-widest uppercase">// INVENTORY & SPECIFICATION</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mt-1">
          Technical Inventory
        </h1>
        <p className="text-xs text-gray-400 max-w-2xl mt-3 leading-relaxed">
          Software Engineer & Full Stack Developer based in Kalubowila, Colombo[cite: 1]. Focused on building 99.99% pure code architectures, automated DevSecOps pipelines, and computer vision systems[cite: 1].
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs tracking-wider transition-all border ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-black/60 text-emerald-400/80 border-emerald-500/30 hover:border-emerald-400'
            }`}
          >
            {tab.label}
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
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
              className="cursor-pointer"
            >
              <PeriodicElement symbol={tech.symbol} name={tech.name} number={tech.num} category={tech.cat} purity={tech.purity} />
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
            className="mt-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex justify-between items-center"
          >
            <div>
              <span className="text-white font-bold mr-2">[{hoveredTech.symbol}] {hoveredTech.name}:</span>
              <span>{hoveredTech.desc}</span>
            </div>
            <span className="text-emerald-400 font-bold">{hoveredTech.purity}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}