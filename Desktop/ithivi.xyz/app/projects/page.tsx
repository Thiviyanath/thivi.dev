'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_PROJECTS = [
  {
    id: 'devsecops',
    batch: 'BATCH #01',
    category: 'AI DEVSECOPS & SECURITY',
    title: 'AI DevSecOps Secret Audit Tool',
    metrics: '100% AST Coverage',
    tech: ['Python', 'AST', 'Gemini LLM', 'Regex', 'Rich CLI'],
    desc: 'Static security analysis CLI scanning source code for API leaks, SQL hazard patterns, and dynamic code risks.',
    demoOutput: [
      '[AST SCANNER] Inspecting target script main.py...',
      '[WARNING] Hardcoded Secret found: AWS_SECRET_ACCESS_KEY at line 42',
      '[LLM REASONING] Gemini Agent mapping flaw to OWASP A03:2021-Injection...',
      '[AUTO-PATCH GENERATED] Refactored code saved to patches/refactored_main.py'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'neurotouch',
    batch: 'BATCH #02',
    category: 'COMPUTER VISION',
    title: 'NeuroTouch AI Gesture Control',
    metrics: 'Real-Time Low Latency',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyQt5'],
    desc: 'Human-computer interaction system translating hand gestures into OS cursor controls and presentation triggers.',
    demoOutput: [
      '[CV CAMERA] Tracking 21 3D hand landmarks at 60 FPS...',
      '[GESTURE RECOGNIZED] Index Pinch Detected -> Triggering Mouse Click Event',
      '[GESTURE RECOGNIZED] Swipe Right -> Next Slide Triggered in PyQt5 UI'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'erp',
    batch: 'BATCH #03',
    category: 'ENTERPRISE ARCHITECTURE',
    title: 'Business Management ERP System',
    metrics: 'Automated Workflows',
    tech: ['Odoo ERP', 'Python', 'PostgreSQL', 'XML'],
    desc: 'Custom enterprise modules for inventory management, automated invoicing pipelines, and reporting.',
    demoOutput: [
      '[ERP ORM] Executing PostgreSQL database migration v2.4...',
      '[INVENTORY TRIGGER] Automated Reorder Rule triggered for Stock #1042',
      '[INVOICE GENERATOR] PDF Sales Receipt #INV-8893 generated and e-mailed'
    ],
    github: 'https://github.com/Thiviyanath'
  },
  {
    id: 'cnn',
    batch: 'BATCH #04',
    category: 'DEEP LEARNING',
    title: 'Cats vs Dogs CNN Classifier',
    metrics: '85-90% Accuracy',
    tech: ['Python', 'TensorFlow', 'Keras'],
    desc: 'Convolutional Neural Network image classification model trained on 25,000+ dataset images.',
    demoOutput: [
      '[EPOCH 50/50] Loss: 0.1824 - Accuracy: 0.8942 - Val Loss: 0.2105',
      '[MODEL EVALUATION] Testing image sample_test_04.jpg...',
      '[PREDICTION RESULT] Label: DOG (Confidence: 94.82%)'
    ],
    github: 'https://github.com/Thiviyanath'
  }
];

export default function ProjectsPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 border-b border-emerald-500/20 pb-6"
      >
        <span className="text-emerald-400 text-xs tracking-widest uppercase">// SYSTEM INVENTORY</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mt-1">
          Project Batches & Live Demos
        </h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {ALL_PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-black relative flex flex-col justify-between group hover:border-emerald-400 transition-all"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                  {project.batch}
                </span>
                <span className="text-xs text-yellow-400">{project.metrics}</span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-3">
                {project.title}
              </h2>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">{project.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setActiveDemo(activeDemo === project.id ? null : project.id)}
                className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded hover:bg-emerald-500 hover:text-black font-bold text-xs transition-all mb-3"
              >
                {activeDemo === project.id ? '✕ HIDE LIVE DEMO' : '► EXECUTE LIVE DEMO SIMULATION'}
              </button>

              <AnimatePresence>
                {activeDemo === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-black/90 border border-emerald-500/50 p-4 rounded text-[11px] text-emerald-400 font-mono space-y-1 mb-4 overflow-hidden"
                  >
                    <p className="text-gray-500">// INITIALIZING PIPELINE RUN...</p>
                    {project.demoOutput.map((line, i) => (
                      <p key={i} className="text-emerald-300">{line}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="block text-center text-xs text-gray-400 hover:text-white transition-colors"
              >
                Inspect Source Code on GitHub →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}