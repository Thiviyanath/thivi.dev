'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 border-b border-emerald-500/20 pb-6"
      >
        <span className="text-emerald-400 text-xs tracking-widest uppercase">// CAREER PROTOCOL</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mt-1">
          Work Experience & Roles
        </h1>
      </motion.div>

      {/* Primary Role: Neirah Tech */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-black mb-12 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <span className="text-xs text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-800">
              6 MONTHS TENURE
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">FULL STACK DEVELOPER</h2>
            <p className="text-sm text-emerald-400">Neirah Tech Solutions</p>
          </div>
          <span className="text-xs text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full mt-2 md:mt-0">
            Production Software Architecture
          </span>
        </div>

        <ul className="space-y-3 text-xs text-gray-300 leading-relaxed mb-6 list-disc list-inside">
          <li>Developed and maintained production full-stack web applications and RESTful APIs using modern frameworks[cite: 1].</li>
          <li>Handled frontend state management, backend service orchestration, and relational database schema design[cite: 1].</li>
          <li>Debugged critical edge-case flaws, ran performance optimization profiles, and authored unit/integration tests[cite: 1].</li>
          <li>Collaborated in agile sprint teams using Git/GitHub version control workflows to deliver enterprise solutions[cite: 1].</li>
        </ul>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-500/20 text-[10px]">
          <span className="bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded">React</span>
          <span className="bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded">Node.js</span>
          <span className="bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded">REST APIs</span>
          <span className="bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded">PostgreSQL</span>
          <span className="bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded">Git/GitHub</span>
        </div>
      </motion.div>

      {/* Education & Certifications */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-6 rounded-xl border border-emerald-500/20 bg-black/60"
        >
          <span className="text-xs text-emerald-400">// ACADEMIC FOUNDATION</span>
          <h3 className="text-xl font-bold text-white mt-2">BSc (Hons) Software Engineering</h3>
          <p className="text-xs text-gray-400 mb-4">SLIIT City Uni / University of Bedfordshire (Reading 2024 - 2027)[cite: 1]</p>
          <p className="text-xs text-gray-300">Software Engineering Foundation Studies at IIT (2023)[cite: 1]. Core focus on OOP, DSA, and SDLC[cite: 1].</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="p-6 rounded-xl border border-emerald-500/20 bg-black/60"
        >
          <span className="text-xs text-emerald-400">// CREDENTIALS & CERTIFICATIONS</span>
          <ul className="space-y-3 text-xs text-gray-300 mt-2">
            <li>• <strong className="text-white">AWS Academy Cloud Foundations:</strong> Cloud Computing Infrastructure (Ongoing)[cite: 1]</li>
            <li>• <strong className="text-white">IBM Skills Build:</strong> Generative AI Fundamentals[cite: 1]</li>
            <li>• <strong className="text-white">IEEE Xtreme Programming:</strong> 24-Hour Global Algorithmic Competition[cite: 1]</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}