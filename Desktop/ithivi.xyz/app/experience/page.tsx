'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EXP_TABS = [
  { id: 'NEIRAH', title: 'FULL STACK ROLE', sub: 'Neirah Tech Solutions' },
  { id: 'EDU', title: 'ACADEMIC DEGREE', sub: 'SLIIT City Uni / Bedfordshire' },
  { id: 'CERTS', title: 'CREDENTIALS', sub: 'AWS & Industry Badges' },
];

export default function ExperiencePage() {
  const [activeExp, setActiveExp] = useState('NEIRAH');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-mono text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 border-b border-emerald-500/20 pb-6">
        <span className="text-emerald-400 text-xs tracking-widest uppercase">// CAREER PROTOCOL</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mt-1">
          Work Experience & Roles
        </h1>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {EXP_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveExp(tab.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeExp === tab.id
                ? 'border-emerald-400 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                : 'border-emerald-500/20 bg-black/60 hover:border-emerald-500/40'
            }`}
          >
            <span className="text-[10px] text-emerald-400 font-bold">{tab.id}</span>
            <h3 className="text-base font-bold text-white mt-1">{tab.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{tab.sub}</p>
          </button>
        ))}
      </div>

      <div className="p-8 rounded-2xl border border-emerald-500/30 bg-black/90 min-h-[300px]">
        {activeExp === 'NEIRAH' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex justify-between items-center border-b border-emerald-500/20 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Full Stack Developer</h2>
                <p className="text-xs text-emerald-400">Neirah Tech Solutions • 6 Months Tenure[cite: 1]</p>
              </div>
              <span className="text-xs text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full">Production Software Engine[cite: 1]</span>
            </div>
            <ul className="space-y-3 text-xs text-gray-300 leading-relaxed list-disc list-inside pt-2">
              <li>Developed and maintained production full-stack web applications and RESTful APIs using modern frameworks[cite: 1].</li>
              <li>Handled frontend state management, backend service orchestration, and relational database schema design[cite: 1].</li>
              <li>Debugged critical edge-case flaws, ran performance optimization profiles, and authored unit/integration tests[cite: 1].</li>
              <li>Collaborated in agile sprint teams using Git/GitHub version control workflows to deliver enterprise solutions[cite: 1].</li>
            </ul>
          </motion.div>
        )}

        {activeExp === 'EDU' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">BSc (Hons) Software Engineering</h2>
            <p className="text-xs text-emerald-400">SLIIT City Uni / University of Bedfordshire (Reading 2024 - 2027)[cite: 1]</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              Software Engineering Foundation Studies completed at IIT (2023)[cite: 1]. Deep specialization in Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), System Design, and Modern Web Architecture[cite: 1].
            </p>
          </motion.div>
        )}

        {activeExp === 'CERTS' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Certifications & Credentials</h2>
            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded border border-emerald-500/20 bg-emerald-950/20">
                <h4 className="text-xs font-bold text-white">AWS Academy Cloud Foundations</h4>
                <p className="text-[11px] text-gray-400 mt-1">Cloud Computing Infrastructure & EC2 Provisioning[cite: 1]</p>
              </div>
              <div className="p-4 rounded border border-emerald-500/20 bg-emerald-950/20">
                <h4 className="text-xs font-bold text-white">IBM Skills Build - Generative AI</h4>
                <p className="text-[11px] text-gray-400 mt-1">LLM Architecture & Prompt Engineering[cite: 1]</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}