'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { PeriodicElement } from './components/PeriodicElement';
import { InteractiveCLI } from './components/InteractiveCLI';
import { HorizontalProjects, Project } from './components/HorizontalProjects';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';

const TECH_CATEGORIES = ['ALL', 'LANGUAGES', 'FRAMEWORKS', 'CLOUD & DEVOPS', 'DATABASES & AI'];

const TECH_STACK = [
  { symbol: 'Py', name: 'Python', num: 1, cat: 'LANGUAGES', purity: '99.5%', desc: 'AST, OpenCV, TensorFlow, Flask' },
  { symbol: 'Ts', name: 'TypeScript', num: 2, cat: 'LANGUAGES', purity: '98.0%', desc: 'Next.js, React, Node.js' },
  { symbol: 'Js', name: 'JavaScript', num: 3, cat: 'LANGUAGES', purity: '98.5%', desc: 'Modern ES6+, Web APIs, React' },
  { symbol: 'Ja', name: 'Java', num: 4, cat: 'LANGUAGES', purity: '92.0%', desc: 'Object-Oriented Programming, Data Structures' },
  { symbol: 'Re', name: 'React', num: 5, cat: 'FRAMEWORKS', purity: '98.5%', desc: 'UI/UX Architecture, Next.js, Framer Motion' },
  { symbol: 'Fl', name: 'Flask', num: 6, cat: 'FRAMEWORKS', purity: '90.0%', desc: 'Python Micro-framework REST APIs' },
  { symbol: 'Dk', name: 'Docker', num: 7, cat: 'CLOUD & DEVOPS', purity: '95.0%', desc: 'Containerization & Microservices' },
  { symbol: 'Aws', name: 'AWS Cloud', num: 8, cat: 'CLOUD & DEVOPS', purity: '90.0%', desc: 'EC2, S3, IAM, Cloud Foundations' },
  { symbol: 'Gcp', name: 'GCP Basics', num: 9, cat: 'CLOUD & DEVOPS', purity: '85.0%', desc: 'Google Cloud Platform Basics' },
  { symbol: 'Pg', name: 'PostgreSQL', num: 10, cat: 'DATABASES & AI', purity: '96.0%', desc: 'Relational Schema Design & Odoo ERP' },
  { symbol: 'Cv', name: 'OpenCV', num: 11, cat: 'DATABASES & AI', purity: '94.0%', desc: 'MediaPipe Gesture Systems & Computer Vision' },
  { symbol: 'Tf', name: 'TensorFlow', num: 12, cat: 'DATABASES & AI', purity: '88.0%', desc: 'CNN Deep Learning Image Models' }
];

const PROJECTS: Project[] = [
  {
    batch: 'BATCH #01',
    category: 'AI DEVSECOPS',
    title: 'AI DevSecOps Secret Audit Tool',
    metrics: '100% AST Coverage',
    tech: ['Python', 'AST', 'Gemini LLM', 'Regex', 'Rich CLI'],
    desc: 'Static security analysis CLI scanning source code for API leaks, SQL injections, and dynamic risks.',
    longDesc: 'Built a static security analysis CLI to scan source code for hardcoded secrets, SQL hazard patterns, and risky dynamic code execution (eval, shell=True). Integrated Gemini LLM agentic reasoning to automatically map detected AST flaws to OWASP Top 10 categories and generate secure code refactoring patches.',
    architecture: [
      'AST (Abstract Syntax Tree) static code parser',
      'Gemini LLM agentic patch generator',
      'OWASP Top 10 automated category mapping',
      'Rich CLI terminal output formatting'
    ],
    githubUrl: 'https://github.com/Thiviyanath'
  },
  {
    batch: 'BATCH #02',
    category: 'COMPUTER VISION',
    title: 'NeuroTouch AI Gesture Control',
    metrics: 'Real-Time Control',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyQt5'],
    desc: 'Human-computer interaction system translating hand gestures into system cursor controls via real-time computer vision.',
    longDesc: 'Developed a real-time hand gesture recognition system using computer vision. Implemented gesture-based cursor movement, clicking, scrolling, and presentation controls into an interactive desktop application built with PyQt5.',
    architecture: [
      'MediaPipe 21-point hand landmark tracking',
      'Low-latency cursor smoothing pipeline',
      'PyQt5 desktop application interface'
    ],
    githubUrl: 'https://github.com/Thiviyanath'
  },
  {
    batch: 'BATCH #03',
    category: 'FULLSTACK ENGINE',
    title: 'Neirah Tech Web Applications',
    metrics: '6-Month Production',
    tech: ['React', 'Node.js', 'REST APIs', 'PostgreSQL', 'Git'],
    desc: 'Full-stack web applications and REST APIs developed during 6-month tenure as Full Stack Developer at Neirah Tech Solutions.',
    longDesc: 'Developed and maintained production full-stack web applications and REST APIs. Handled database integration, tested features, debugged issues, and collaborated using Git/GitHub workflows to deliver project requirements.',
    architecture: [
      'Modular REST API backend architecture',
      'Relational database integration',
      'Git/GitHub collaborative workflow'
    ],
    githubUrl: 'https://github.com/Thiviyanath'
  },
  {
    batch: 'BATCH #04',
    category: 'ENTERPRISE ERP',
    title: 'Business Management ERP System',
    metrics: 'Automated Workflows',
    tech: ['Odoo ERP', 'Python', 'PostgreSQL', 'XML'],
    desc: 'Custom enterprise modules for inventory management, automated invoicing, sales pipelines, and reporting.',
    longDesc: 'Developed custom Odoo ERP modules using Python for inventory, sales, invoicing, and financial reporting. Automated business workflows and integrated PostgreSQL for data management.',
    architecture: [
      'Odoo ORM data modeling',
      'Automated invoicing and sales workflows',
      'PostgreSQL data storage'
    ],
    githubUrl: 'https://github.com/Thiviyanath'
  },
  {
    batch: 'BATCH #05',
    category: 'DEEP LEARNING',
    title: 'Cats vs Dogs CNN Classifier',
    metrics: '85-90% Accuracy',
    tech: ['Python', 'TensorFlow', 'Keras'],
    desc: 'Convolutional Neural Network classification model trained on 25,000+ dataset images for visual recognition.',
    longDesc: 'Developed a CNN-based image classification model using Python, TensorFlow, and Keras. Achieved ~85-90% validation accuracy on a dataset of over 25,000 images.',
    architecture: [
      'Multi-layer Convolutional Neural Network',
      '25,000+ image dataset processing',
      'Keras model evaluation pipeline'
    ],
    githubUrl: 'https://github.com/Thiviyanath'
  },
  {
    batch: 'BATCH #06',
    category: 'CLOUD & DEVOPS',
    title: 'AWS Infrastructure Pipeline',
    metrics: 'AWS Academy Progress',
    tech: ['AWS EC2', 'S3', 'IAM', 'Docker'],
    desc: 'Cloud containerization and deployment architecture built following AWS Cloud Foundations principles.',
    longDesc: 'Configured cloud infrastructure environments using AWS EC2 instances, S3 object storage policies, IAM security configurations, and Docker containerization.',
    architecture: [
      'AWS EC2 compute instance provisioning',
      'S3 object storage security policies',
      'Docker containerized deployment'
    ],
    githubUrl: 'https://github.com/Thiviyanath'
  }
];

export default function Home() {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
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

  const filteredTech = activeTab === 'ALL' 
    ? TECH_STACK 
    : TECH_STACK.filter(t => t.cat === activeTab);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 ${recruiterMode ? 'bg-slate-950 text-slate-100 font-sans' : 'bg-[#050807] text-white font-mono'}`}>
      
      {!recruiterMode && (
        <>
          <ThreeBackground />
          <CustomCursor />
        </>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-emerald-500/10 bg-black/40 px-8 py-5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center font-bold text-emerald-400 text-sm">
            Th
          </div>
          <span className="text-sm font-semibold tracking-wider uppercase text-gray-300">
            Thiviyanath <span className="text-emerald-400">M.</span>
          </span>
        </div>

        <button
          onClick={() => setRecruiterMode(!recruiterMode)}
          className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border ${
            recruiterMode
              ? 'bg-emerald-400 text-black border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-500/10'
          }`}
        >
          {recruiterMode ? '● RECRUITER VIEW ACTIVE' : 'SWITCH TO RECRUITER MODE'}
        </button>
      </nav>

      <header className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Software Engineer & DevOps Specialist</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none mb-6"
        >
          PURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">CODE.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed tracking-wide font-mono mb-10"
        >
          Architecting full-stack web applications, AI analysis engines, and automated DevOps infrastructure with high yield and zero vulnerability compromises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 text-xs font-mono"
        >
          <a href="mailto:thiviyanath15@gmail.com" className="px-8 py-4 bg-emerald-500 text-black font-bold tracking-widest uppercase rounded-lg hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300">
            Initiate Contact
          </a>
          <a href="https://github.com/Thiviyanath" target="_blank" rel="noreferrer" className="px-8 py-4 border border-emerald-500/40 text-emerald-400 tracking-widest uppercase rounded-lg hover:bg-emerald-500/10 transition-all duration-300">
            Inspect GitHub
          </a>
        </motion.div>
      </header>

      {!recruiterMode && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-6 py-6 max-w-5xl mx-auto relative z-10"
        >
          <InteractiveCLI />
        </motion.section>
      )}

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-emerald-500/20 pb-6"
        >
          <div>
            <span className="text-emerald-400 text-xs tracking-widest uppercase">INVENTORY CATALOG</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mt-1">
              Periodic Table of Stack
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 border ${
                activeTab === cat
                  ? 'bg-emerald-500 text-black border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-black/60 text-emerald-400/80 border-emerald-500/30 hover:border-emerald-400 hover:text-emerald-300'
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
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -4 }}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                className="relative rounded-xl overflow-hidden cursor-pointer"
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
              className="mt-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between backdrop-blur-md"
            >
              <div>
                <span className="text-white font-bold mr-2">[{hoveredTech.symbol}] {hoveredTech.name}:</span>
                <span>{hoveredTech.desc}</span>
              </div>
              <span className="text-emerald-400/80 uppercase tracking-widest">{hoveredTech.purity} Purity Rating</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <HorizontalProjects projects={PROJECTS} />

      <footer className="relative z-10 border-t border-emerald-500/20 py-12 text-center text-xs font-mono text-gray-500">
        <p>© 2026 Thiviyanath Maheswaran • Kalubowila Colombo</p>
        <p className="mt-2 text-emerald-400/80">Crafted with Next.js & Lenis Smooth Motion</p>
      </footer>
    </div>
  );
}