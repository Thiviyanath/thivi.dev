'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export interface Project {
  batch: string;
  category?: string;
  title: string;
  metrics: string;
  tech: string[];
  desc: string;
  longDesc?: string;
  architecture?: string[];
  githubUrl?: string;
}

export function HorizontalProjects({ projects }: { projects: Project[] }) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Dynamically clamps horizontal transform to -40% so cards never scroll into a black void
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  return (
    <section ref={targetRef} className="relative h-[180vh] bg-black">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-12">
        
        {/* Section Header */}
        <div className="px-8 md:px-16 mb-4 z-20">
          <span className="text-emerald-400 text-xs tracking-widest uppercase font-mono">
            // LAB OUTPUT
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white mt-1">
            Verified Production Batches
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Scroll down to inspect horizontally • Click card to view details →
          </p>
        </div>

        {/* Horizontal Moving Cards Track */}
        <motion.div style={{ x }} className="flex gap-6 pl-8 md:pl-16 pr-16">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => setSelectedProject(project)}
              className="h-[400px] w-[350px] md:w-[450px] flex-shrink-0 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-black to-black p-6 md:p-8 backdrop-blur-xl relative flex flex-col justify-between cursor-pointer group hover:border-emerald-400/80 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[11px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {project.batch} {project.category ? `• ${project.category}` : ''}
                  </span>
                  <span className="text-[11px] font-mono text-yellow-400 bg-yellow-950/30 border border-yellow-500/30 px-2.5 py-1 rounded-full">
                    {project.metrics}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors mt-2 leading-tight">
                  {project.title}
                </h3>

                <p className="text-xs font-mono text-gray-400 mt-3 leading-relaxed line-clamp-4">
                  {project.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4 pt-3 border-t border-emerald-500/20">
                  {project.tech.map((t: string, i: number) => (
                    <span key={i} className="text-[10px] font-mono bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-emerald-400 group-hover:text-emerald-300">
                  <span>INSPECT SPECIFICATIONS</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal View for Project Architecture */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full bg-slate-950 border border-emerald-500/40 rounded-2xl p-8 font-mono text-white shadow-[0_0_50px_rgba(16,185,129,0.3)] relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-emerald-400 text-sm"
              >
                [CLOSE ✕]
              </button>

              <span className="text-xs text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-800">
                {selectedProject.batch} // SYSTEM SPECIFICATION
              </span>

              <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2 text-white">{selectedProject.title}</h2>
              <p className="text-xs text-yellow-400 mb-6">Purity Rating / Yield: {selectedProject.metrics}</p>

              <div className="space-y-4 text-xs text-gray-300 leading-relaxed mb-6">
                <p>{selectedProject.longDesc || selectedProject.desc}</p>
              </div>

              {selectedProject.architecture && (
                <div className="mb-6 p-4 rounded bg-black/60 border border-emerald-500/20">
                  <h4 className="text-xs font-bold text-emerald-400 mb-2">// ARCHITECTURE HIGHLIGHTS</h4>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-400">
                    {selectedProject.architecture.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4 text-xs">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-500 text-black font-bold rounded hover:bg-emerald-400 transition-colors"
                  >
                    View Source Code (GitHub)
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 border border-emerald-500/40 text-emerald-400 rounded hover:bg-emerald-500/10 transition-colors"
                >
                  Return to Lab
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}