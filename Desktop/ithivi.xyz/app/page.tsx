'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { 
  Scan, FastForward, Mail, Phone, MapPin, 
  ExternalLink, User, Globe, Code2, ShieldCheck, Terminal,
  Layers, Play, Shield, Cpu, RefreshCw, Zap, CheckCircle2,
  Activity, ArrowRight, Radio, Sparkles, Power, Send
} from 'lucide-react';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { InteractiveCLI } from './components/InteractiveCLI';
import { PeriodicElement } from './components/PeriodicElement';
import { NextSectionWormhole } from './components/NextSectionWormhole';
import { SystemTelemetryHUD } from './components/SystemTelemetryHUD';
import { sound } from './utils/sound';

// Native SVG Logomarks
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
  </svg>
);

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

const PROFILE_DATA = {
  name: "Thiviyanath Maheswaran",
  title: "Full Stack Developer",
  location: "Kalubowila, Colombo, Sri Lanka",
  status: "Seeking Software Engineering Internships",
  bio: "Undergraduate Software Engineer specializing in DevSecOps, Cloud Infrastructure, and Deep Learning Vision. Experienced in building static code analysis engines (AST), containerized microservice architectures, and interactive computer vision tools.",
  github: "https://github.com/Thiviyanath",
  linkedin: "https://linkedin.com/in/thiviyanath-m",
  email: "thiviyanath15@gmail.com",
  phone: "+94 077-064-9966",
  website: "https://ithivi.xyz"
};

const PROJECT_CASE_STUDIES = [
  {
    id: "cs1",
    title: "AI DevSecOps Vulnerability & Secret Audit Engine",
    tagline: "Automated AST Static Analysis & LLM Code Patching Engine",
    category: "AI / DevSecOps Security",
    architecture: {
      frontend: "CLI / Web AST Inspector Interface",
      api: "Gemini API OWASP Classifier",
      backend: "Python Abstract Syntax Tree (AST) Parser",
      database: "OWASP Rule Index (AST/Regex)"
    },
    problem: "Hardcoded AWS secrets and dynamic SQL execution flaws bypass standard regex string matching.",
    solution: "Engineered an AST static analysis engine that parses Python syntax trees, isolates vulnerable node structures, and streams OWASP patches.",
    demoType: "ast_auditor",
    logs: [
      "Parsing /src/auth/service.py syntax tree...",
      "CRITICAL: AWS Access Key detected at AST Node [Line 42]",
      "HIGH: Unsanitized SQL execution detected at AST Node [Line 88]",
      "Dispatching payload to Gemini API...",
      "✔ Classified as OWASP A03 (Injection) & A07 (Identification)",
      "✔ Patch generated: os.getenv('AWS_SECRET_KEY')"
    ]
  },
  {
    id: "cs2",
    title: "Student Credit Evaluation REST API",
    tagline: "Containerized & Hardened Academic Endpoint Suite",
    category: "Backend / API Security",
    architecture: {
      frontend: "Swagger / Next.js API Explorer",
      api: "Flask REST API Router",
      backend: "JWT Middleware & Schema Validation Engine",
      database: "Isolated SQLite Docker Data Volume"
    },
    problem: "Academic credit evaluation systems require strictly validated endpoints immune to unauthorized data access.",
    solution: "Deployed a containerized Flask API with token-based authentication, strict payload validation schemas, and database isolation.",
    demoType: "api_tester",
    logs: [
      "POST /api/v1/students/evaluate HTTP/1.1",
      "Host: api.ithivi.xyz",
      "Authorization: Bearer eyJhbGciOiJIUzI1Ni...",
      "Executing JWT authentication middleware...",
      "HTTP/1.1 200 OK - Approved (Risk Level: LOW)"
    ]
  },
  {
    id: "cs3",
    title: "Cats vs Dogs Deep Learning CNN Classifier",
    tagline: "High-Accuracy Binary Visual Recognition Network",
    category: "AI / Deep Learning",
    architecture: {
      frontend: "Matplotlib Visual Dashboard",
      api: "TensorFlow Keras Sequential Model",
      backend: "Batch Image Processing Pipeline",
      database: "25,000+ Image Dataset Buffer"
    },
    problem: "Large-scale visual classification suffers from overfitting without proper convolutional layer depth.",
    solution: "Trained a custom CNN pipeline using TensorFlow and Keras across 25,000+ images with data augmentation, achieving 85–90% accuracy.",
    demoType: "cnn_classifier",
    logs: [
      "Loading Keras CNN weights into execution graph...",
      "Processing input tensor [Batch 32, 224x224x3]...",
      "Conv2D -> ReLU -> MaxPool2D -> Dropout (0.25)",
      "Classification: 'Dog' (Confidence: 97.9%)"
    ]
  },
  {
    id: "cs4",
    title: "NeuroTouch AI - Gesture Control System",
    tagline: "Low-Latency Touchless HCI Desktop Interaction Engine",
    category: "Computer Vision / HCI",
    architecture: {
      frontend: "PyQt5 Interactive GUI Suite",
      api: "MediaPipe Hand Mesh Landmark Tracker",
      backend: "PyAutoGUI System Input Driver",
      database: "Real-time Frame Buffer"
    },
    problem: "Touchless interface execution requires minimal processing latency between video frames and mouse actions.",
    solution: "Constructed an HCI application mapping 21 3D hand mesh coordinates from MediaPipe to real-time OS input events.",
    demoType: "gesture_sim",
    logs: [
      "Initializing OpenCV camera feed (60 FPS)...",
      "Tracking 21 3D coordinates via MediaPipe",
      "Tracked Landmark 8 (Index Tip) at (x: 420, y: 310)",
      "Distance (Thumb - Index) < 12px -> Triggering LEFT_CLICK",
      "Pipeline Latency: 6.2ms"
    ]
  }
];

// BIOMETRIC PROFILE BOOT INTRO OVERLAY
function BiometricBootLoader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    'INITIALIZING ITHIVI.OS KERNEL v3.0...',
    'CONNECTING CLOUD SECURITY MODULES...',
    'LOADING AST SECURITY ENGINE...',
    'PERFORMING BIOMETRIC PROFILE SCAN...',
    'VERIFYING SECURITY CREDENTIALS... MATCHED [100%]',
    'ESTABLISHING SECURE INTERACTION WORKBENCH...'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const stepInterval = setInterval(() => {
      setStep((prev) => {
        if (prev >= bootLogs.length - 1) {
          clearInterval(stepInterval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 550);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center font-mono text-xs selection:bg-emerald-500 selection:text-black"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-black" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      <button
        onClick={onComplete}
        className="absolute top-8 right-8 flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg hover:text-emerald-400 hover:border-emerald-500/50 transition z-50"
      >
        <FastForward className="w-3.5 h-3.5" /> SKIP_INTRO [ESC]
      </button>

      <div className="relative z-10 max-w-sm w-full px-6 flex flex-col items-center space-y-6 text-center">
        <div className="relative group w-44 h-44">
          <div className="absolute -inset-3 rounded-full border border-emerald-500/30 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute -inset-1 rounded-full border border-dashed border-emerald-400/50 animate-spin" style={{ animationDuration: '12s' }} />

          <div className="absolute inset-0 z-20 overflow-hidden rounded-2xl pointer-events-none">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce" style={{ animationDuration: '2s' }} />
          </div>

          <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-500/60 bg-[#070d18] shadow-[0_0_30px_rgba(16,185,129,0.25)] relative">
            <img
              src="/profile.jpg"
              alt={PROFILE_DATA.name}
              className="w-full h-full object-cover object-top filter contrast-125 transition-all duration-700"
              style={{
                filter: progress < 100 ? `grayscale(100%) blur(${(100 - progress) / 10}px)` : 'grayscale(0%)'
              }}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
              }}
            />

            <div className="absolute top-2 left-2 text-emerald-400 font-bold text-[8px]">+</div>
            <div className="absolute top-2 right-2 text-emerald-400 font-bold text-[8px]">+</div>
            <div className="absolute bottom-2 left-2 text-emerald-400 font-bold text-[8px]">+</div>
            <div className="absolute bottom-2 right-2 text-emerald-400 font-bold text-[8px]">+</div>
          </div>
        </div>

        <div className="w-full space-y-2 text-left bg-[#070d18] border border-emerald-500/30 p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1"><Scan className="w-3 h-3 text-emerald-400" /> SYSTEM BOOT DIAGNOSTIC</span>
            <span className="text-emerald-400 font-bold">{progress}%</span>
          </div>

          <p className="text-emerald-300 font-bold text-[11px] h-5 truncate">
            &gt; {bootLogs[step]}
          </p>

          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// MAIN PAGE COMPONENT
export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [activeStackTab, setActiveStackTab] = useState('ALL');
  const [hoveredTech, setHoveredTech] = useState<typeof TECH_STACK[0] | null>(null);

  // Active Project Selection & Demo State
  const [selectedProject, setSelectedProject] = useState(PROJECT_CASE_STUDIES[0]);
  const [demoActive, setDemoActive] = useState(false);
  const [astInputCode, setAstInputCode] = useState(
    "AWS_SECRET_KEY = 'AKIAIOSFODNN7EXAMPLE'\nquery = \"SELECT * FROM users WHERE id = '\" + user_input + \"'\"\neval(untrusted_payload)"
  );
  const [astResults, setAstResults] = useState<any[] | null>(null);

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

  const runLiveProjectDemo = () => {
    sound.playClick();
    setDemoActive(true);
    setAstResults(null);

    setTimeout(() => {
      setDemoActive(false);
      if (selectedProject.demoType === 'ast_auditor') {
        setAstResults([
          { level: 'CRITICAL', msg: 'Hardcoded AWS Access Key in AST Node', fix: "Use os.getenv('AWS_SECRET_KEY')" },
          { level: 'HIGH', msg: 'Unsanitized SQL String Injection risk', fix: 'Use Parameterized Queries (cursor.execute)' },
          { level: 'CRITICAL', msg: 'Arbitrary execution flaw via eval()', fix: 'Parse via safe json.loads()' }
        ]);
      }
    }, 1100);
  };

  const filteredTech = activeStackTab === 'ALL'
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.cat === activeStackTab);

  return (
    <div className="relative min-h-screen bg-[#050807] text-white font-mono selection:bg-emerald-500 selection:text-black">
      {/* Biometric Boot Loader Overlay */}
      <AnimatePresence>
        {isBooting && <BiometricBootLoader onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <ThreeBackground />
      <CustomCursor />

      {/* Render Navbar and Telemetry HUD once boot finishes */}
      {!isBooting && (
        <>
          <Navbar />
          <SystemTelemetryHUD />
        </>
      )}

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
            <span>{PROFILE_DATA.status}</span>
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
            {PROFILE_DATA.bio}
          </motion.p>
        </div>

        {/* Command CLI Workspace */}
        <div className="w-full max-w-4xl mx-auto my-8">
          <InteractiveCLI />
        </div>

        <NextSectionWormhole
          nextSectionId="about"
          nextSectionName="ABOUT & SOCIAL CONNECT"
          sectionNumber="02"
        />
      </section>

      {/* SECTION 2: ABOUT ME & SOCIAL CONNECT HUB */}
      <section id="about" className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 border-b border-emerald-500/20 pb-6"
        >
          <span className="text-emerald-400 text-xs tracking-widest uppercase">// IDENTITY & CHANNELS</span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mt-1">
            About Me & Social Connect
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 bg-[#070d18]/90 border border-emerald-500/30 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <img
                src="/profile.jpg"
                alt={PROFILE_DATA.name}
                className="w-full h-full object-cover object-top"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{PROFILE_DATA.name}</h3>
              <p className="text-xs text-emerald-400 font-mono pt-1">{PROFILE_DATA.title}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{PROFILE_DATA.location}</span>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#070d18]/90 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full">
                SOFTWARE ENGINEER & DEVSECOPS
              </span>
              <p className="text-sm text-slate-300 leading-relaxed pt-2">
                Undergraduate Software Engineer studying at SLIIT City Uni (University of Bedfordshire). Passionate about cloud computing, AST vulnerability scanning, deep learning computer vision, and building secure automated microservices.
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-800 pt-6">
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">// DIRECT CONNECT CHANNELS</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-400 transition"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-emerald-400" /> GitHub / Thiviyanath
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-400 transition"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-emerald-400" /> LinkedIn / thiviyanath-m
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="flex items-center justify-between p-3 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-400 transition"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-400" /> {PROFILE_DATA.email}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${PROFILE_DATA.phone}`}
                  className="flex items-center justify-between p-3 bg-slate-900/80 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:text-emerald-400 transition"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" /> {PROFILE_DATA.phone}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <NextSectionWormhole
          nextSectionId="stack"
          nextSectionName="INVENTORY STACK"
          sectionNumber="03"
        />
      </section>

      {/* SECTION 3: TECH STACK PERIODIC TABLE */}
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

        <NextSectionWormhole
          nextSectionId="projects"
          nextSectionName="FEATURED PROJECTS & CASE STUDIES"
          sectionNumber="04"
        />
      </section>

      {/* SECTION 4: FULL-STACK PROJECTS & CASE STUDIES SHOWCASE */}
      <section id="projects" className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 border-b border-emerald-500/20 pb-6"
        >
          <span className="text-emerald-400 text-xs tracking-widest uppercase">// ENGINEERING PORTFOLIO</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
            Projects & Case Studies
          </h2>
        </motion.div>

        {/* SELECTOR TAB STRIP */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-6">
          {PROJECT_CASE_STUDIES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                sound.playClick();
                setSelectedProject(p);
                setAstResults(null);
              }}
              className={`px-4 py-3 rounded-xl border text-left shrink-0 text-xs transition ${
                selectedProject.id === p.id
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-[#070d18] text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <p className="font-bold text-white">{p.title}</p>
              <p className="text-[10px] text-emerald-400 pt-0.5">{p.category}</p>
            </button>
          ))}
        </div>

        {/* ACTIVE PROJECT DISPLAY PANEL */}
        <div className="bg-[#070d18]/90 border border-emerald-500/30 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-bold text-white pt-2">{selectedProject.title}</h3>
              <p className="text-xs text-slate-400 pt-1 font-sans">{selectedProject.tagline}</p>
            </div>

            <button
              onClick={runLiveProjectDemo}
              disabled={demoActive}
              className="px-5 py-2.5 bg-emerald-400 text-black font-bold rounded-xl hover:bg-emerald-300 transition flex items-center gap-2 text-xs shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              {demoActive ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              {demoActive ? 'RUNNING DEMO...' : 'EXECUTE LIVE DEMO'}
            </button>
          </div>

          {/* ARCHITECTURE LAYERS */}
          <div className="space-y-2">
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">// FULL-STACK ARCHITECTURE LAYERS</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <p className="text-cyan-400 font-bold">1. FRONTEND / UI</p>
                <p className="text-slate-300 text-[11px]">{selectedProject.architecture.frontend}</p>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <p className="text-yellow-400 font-bold">2. API / ROUTING</p>
                <p className="text-slate-300 text-[11px]">{selectedProject.architecture.api}</p>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <p className="text-emerald-400 font-bold">3. BACKEND / LOGIC</p>
                <p className="text-slate-300 text-[11px]">{selectedProject.architecture.backend}</p>
              </div>
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <p className="text-purple-400 font-bold">4. DATABASE / STORE</p>
                <p className="text-slate-300 text-[11px]">{selectedProject.architecture.database}</p>
              </div>
            </div>
          </div>

          {/* LIVE DEMO CONSOLE */}
          <div className="bg-black/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" /> LIVE INTERACTIVE OUTPUT CONSOLE
              </span>
              <span className="text-[10px] text-slate-500">ENGINE STATE: ACTIVE</span>
            </div>

            {selectedProject.demoType === 'ast_auditor' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-sans">Source code evaluated by AST engine:</p>
                <textarea
                  value={astInputCode}
                  onChange={(e) => setAstInputCode(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-cyan-300 text-xs font-mono focus:outline-none focus:border-emerald-500"
                />
                {astResults && (
                  <div className="space-y-2 pt-2 text-xs">
                    <p className="font-bold text-emerald-400">AUDIT FINDINGS & OWASP FIXES:</p>
                    {astResults.map((r, idx) => (
                      <div key={idx} className="p-2.5 bg-red-500/10 border border-red-500/30 rounded flex justify-between items-center">
                        <div>
                          <span className="text-red-400 font-bold">[{r.level}]</span> <span className="text-slate-200">{r.msg}</span>
                          <p className="text-emerald-400 text-[11px] pt-0.5">Recommended Fix: {r.fix}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedProject.demoType !== 'ast_auditor' && (
              <div className="space-y-1 text-xs">
                {selectedProject.logs.map((log, i) => (
                  <p key={i} className="text-slate-300 flex items-start gap-1">
                    <span className="text-emerald-400">›</span> {log}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* PROBLEM & SOLUTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs font-sans">
            <div className="space-y-1">
              <p className="font-mono text-slate-200 font-bold">ENGINEERING PROBLEM:</p>
              <p className="text-slate-400 leading-relaxed">{selectedProject.problem}</p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-emerald-400 font-bold">ARCHITECTURAL SOLUTION:</p>
              <p className="text-slate-400 leading-relaxed">{selectedProject.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LIVE TERMINAL RE-INIT & SYSTEM SHUTDOWN PORTAL */}
      <section className="relative z-10 py-20 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-[#070d18]/90 border border-emerald-500/40 p-8 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> SYSTEM READY FOR DIRECT EVALUATION
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            ESTABLISH ENGAGEMENT PROTOCOL
          </h2>

          <p className="text-xs text-slate-400 max-w-lg mx-auto font-sans leading-relaxed">
            Interested in reviewing full architectural code repos, scheduling an interview, or discussing software engineering roles? Initiate contact below.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              onClick={() => sound.playSuccess()}
              className="px-6 py-3 bg-emerald-400 text-black font-extrabold rounded-xl hover:bg-emerald-300 transition flex items-center gap-2 text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <Send className="w-4 h-4" /> [EXECUTE_CONTACT_PROTOCOL]
            </a>

            <button
              onClick={() => {
                sound.playClick();
                setIsBooting(true);
              }}
              className="px-6 py-3 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl hover:text-emerald-400 hover:border-emerald-500/50 transition flex items-center gap-2 text-xs"
            >
              <Power className="w-4 h-4 text-emerald-400" /> [REBOOT_SYSTEM_SCAN]
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-emerald-500/10 py-12 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 Thiviyanath Maheswaran • Kalubowila Colombo</p>
        <p className="mt-1 text-emerald-400/80">Built with Next.js, Framer Motion & Lenis Smooth Motion</p>
      </footer>
    </div>
  );
}