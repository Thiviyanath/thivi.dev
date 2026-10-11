'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = ['ALL BATCHES', 'AI & SECURITY', 'COMPUTER VISION', 'ENTERPRISE ERP', 'CLOUD & DEVOPS'];

const PROJECT_BATCHES = [
  {
    id: 'batch-01',
    batch: 'BATCH #01',
    category: 'AI & SECURITY',
    title: 'AI DevSecOps Secret Audit Tool',
    purity: '100% AST Coverage',
    tech: ['Python', 'AST', 'Gemini LLM', 'Regex', 'Rich CLI'],
    description: 'Built an agentic static analysis CLI tool that parses AST trees to detect exposed API keys and SQL injection vectors[cite: 1]. Utilizes Gemini API reasoning to map vulnerabilities to OWASP categories and auto-generate refactored security patches[cite: 1].',
    architecture: [
      'Python AST (Abstract Syntax Tree) Static Parser[cite: 1]',
      'Gemini LLM Agentic Patch Engine[cite: 1]',
      'OWASP Top 10 Automated Categorizer[cite: 1]',
      'Rich Terminal UI Log Streamer[cite: 1]'
    ],
    liveLogs: [
      '[AST ENGINE] Parsing source code AST for security vulnerabilities...[cite: 1]',
      '[CRITICAL] Exposed API Secret detected at line 42 (AWS_SECRET_KEY)[cite: 1]',
      '[AGENT REASONING] Mapping flaw to OWASP A03:2021-Injection...[cite: 1]',
      '[PATCH GENERATED] Refactoring script saved to /patches/secured_main.py[cite: 1]',
      '[STATUS] Product Purity: 99.99% • Zero Vulnerabilities Remaining[cite: 1]'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'batch-02',
    batch: 'BATCH #02',
    category: 'COMPUTER VISION',
    title: 'NeuroTouch AI Gesture Control',
    purity: '60 FPS Low Latency',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyQt5'],
    description: 'Real-time gesture control application tracking 21 3D hand landmarks via camera input[cite: 1]. Maps specific hand pinches and movements to operating system cursor actions, slide presentations, and desktop triggers[cite: 1].',
    architecture: [
      'MediaPipe 21-Point Hand Landmark Pipeline[cite: 1]',
      'Low-Latency Cursor Interpolation Math[cite: 1]',
      'PyQt5 Hardware Accelerated Control UI[cite: 1]'
    ],
    liveLogs: [
      '[CV CAMERA] Initializing hardware video capture stream at 1080p...[cite: 1]',
      '[TRACKING] 21 3D Hand Landmarks isolated at 60 FPS[cite: 1]',
      '[EVENT DETECTED] Index-Thumb Pinch -> Triggering OS Left Click[cite: 1]',
      '[EVENT DETECTED] Horizontal Swipe -> Slide Forward Event Dispatched[cite: 1]'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'batch-03',
    batch: 'BATCH #03',
    category: 'ENTERPRISE ERP',
    title: 'Neirah Tech Web Applications',
    purity: '6-Month Production',
    tech: ['React', 'Node.js', 'REST APIs', 'PostgreSQL', 'Git'],
    description: 'Production full-stack web applications and REST APIs developed during a 6-month tenure as Full Stack Developer at Neirah Tech Solutions[cite: 1]. Included state management, database schemas, and CI/CD collaboration[cite: 1].',
    architecture: [
      'Modular REST API Microservices[cite: 1]',
      'PostgreSQL Relational Schema Design[cite: 1]',
      'Git/GitHub Agile Sprint Workflows[cite: 1]'
    ],
    liveLogs: [
      '[HTTP GATEWAY] Request GET /api/v1/analytics - 200 OK (18ms)[cite: 1]',
      '[DATABASE] Executing indexed query over 150,000 records...[cite: 1]',
      '[STATE ENGINE] React Virtual DOM updated successfully[cite: 1]'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'batch-04',
    batch: 'BATCH #04',
    category: 'ENTERPRISE ERP',
    title: 'Business Management ERP System',
    purity: 'Automated Workflows',
    tech: ['Odoo ERP', 'Python', 'PostgreSQL', 'XML'],
    description: 'Custom enterprise Odoo ERP modules for inventory automation, sales tracking, and financial reporting backed by PostgreSQL[cite: 1].',
    architecture: [
      'Odoo ORM Custom Models[cite: 1]',
      'Automated Invoicing & Sales Triggers[cite: 1]',
      'PostgreSQL Data Persistence Layer[cite: 1]'
    ],
    liveLogs: [
      '[ERP ORM] Migration script executing on database schema v2.4...[cite: 1]',
      '[INVENTORY TRIGGER] Low stock threshold reached for item #1042[cite: 1]',
      '[AUTOMATION] Auto-generating PDF purchase order -> Dispatched[cite: 1]'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'batch-05',
    batch: 'BATCH #05',
    category: 'AI & SECURITY',
    title: 'Cats vs Dogs CNN Classifier',
    purity: '89.4% Accuracy',
    tech: ['Python', 'TensorFlow', 'Keras'],
    description: 'Deep Convolutional Neural Network trained on 25,000+ dataset images for high-precision image classification[cite: 1].',
    architecture: [
      'Multi-Layer Convolutional Neural Net[cite: 1]',
      'Data Augmentation Pipeline[cite: 1]',
      'TensorFlow Model Profiler[cite: 1]'
    ],
    liveLogs: [
      '[MODEL LOADING] Loading pre-trained weights cnn_v2.h5...[cite: 1]',
      '[EVALUATION] Testing sample image sample_dog_08.jpg...[cite: 1]',
      '[PREDICTION] Output: DOG (Confidence Score: 94.82%)[cite: 1]'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'batch-06',
    batch: 'BATCH #06',
    category: 'CLOUD & DEVOPS',
    title: 'AWS Cloud Infrastructure Pipeline',
    purity: 'AWS Foundations',
    tech: ['AWS EC2', 'S3', 'IAM', 'Docker'],
    description: 'Containerized infrastructure deployment built adhering to AWS Cloud Foundations principles and IAM security access boundaries[cite: 1].',
    architecture: [
      'AWS EC2 Compute Provisioning[cite: 1]',
      'S3 Bucket Security Policies[cite: 1]',
      'Docker Microservice Containers[cite: 1]'
    ],
    liveLogs: [
      '[AWS CLI] Authenticating IAM user session via STS...[cite: 1]',
      '[EC2 INSTANCE] Provisioning t3.micro container node...[cite: 1]',
      '[DOCKER BUILD] Image vapor-app:latest deployed to EC2 cluster[cite: 1]'
    ],
    github: 'https://github.com/Thiviyanath'
  }
];

export default function ProjectsPage() {
  const [activeBatch, setActiveBatch] = useState(PROJECT_BATCHES[0]);
  const [activeFilter, setActiveFilter] = useState('ALL BATCHES');

  const filteredBatches = activeFilter === 'ALL BATCHES'
    ? PROJECT_BATCHES
    : PROJECT_BATCHES.filter((b) => b.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-mono text-white">
      <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl pt-4 pb-6 border-b border-emerald-500/20 mb-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-emerald-400 text-xs tracking-widest uppercase">// SYNTHESIS PIPELINE</span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
              Scroll-Driven Project Stream
            </h1>
          </div>
          <span className="text-xs text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
            ACTIVE COMPOUND: {activeBatch.batch}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded text-xs transition-all border ${
                activeFilter === cat
                  ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-black/60 text-emerald-400/80 border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-48 space-y-6">
          <div className="border border-emerald-500/40 rounded-2xl bg-black/90 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-500/20 mb-4">
              <span className="text-xs text-emerald-400 font-bold">// REAL-TIME HUD</span>
              <span className="text-[10px] text-yellow-400 bg-yellow-950/30 border border-yellow-500/30 px-2 py-0.5 rounded">
                {activeBatch.purity}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-2">{activeBatch.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">{activeBatch.description}</p>

            <div className="bg-black border border-emerald-500/30 rounded-lg p-4 text-[11px] text-emerald-400 space-y-1.5 mb-4">
              <p className="text-gray-500 border-b border-emerald-500/20 pb-1 mb-2">// EXECUTION LOGS</p>
              {activeBatch.liveLogs.map((log, i) => (
                <p key={i} className={log.includes('[CRITICAL]') ? 'text-yellow-400 font-bold' : 'text-emerald-300'}>
                  {log}
                </p>
              ))}
            </div>

            <a
              href={activeBatch.github}
              target="_blank"
              rel="noreferrer"
              className="block w-full py-2.5 text-center bg-emerald-500 text-black font-bold rounded text-xs hover:bg-emerald-400 transition-colors"
            >
              Inspect Source Code on GitHub ↗
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          {filteredBatches.map((batch) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
              onViewportEnter={() => setActiveBatch(batch)}
              viewport={{ margin: '-30% 0px -30% 0px' }}
              className={`p-8 rounded-2xl border transition-all duration-300 relative ${
                activeBatch.id === batch.id
                  ? 'border-emerald-400 bg-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                  : 'border-emerald-500/20 bg-black/60'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-800">
                  {batch.batch} • {batch.category}
                </span>
                <span className="text-xs text-yellow-400">{batch.purity}</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">{batch.title}</h2>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">{batch.description}</p>

              <div className="mb-6 p-4 rounded bg-black/60 border border-emerald-500/20">
                <h4 className="text-xs font-bold text-emerald-400 mb-2">// ARCHITECTURE HIGHLIGHTS</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
                  {batch.architecture.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-500/20">
                {batch.tech.map((t, i) => (
                  <span key={i} className="text-[10px] bg-emerald-900/40 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}