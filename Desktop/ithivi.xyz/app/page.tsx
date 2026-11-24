"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Terminal,
} from "lucide-react";

type ProjectItem = {
  id: string;
  index: string;
  title: string;
  domain: string;
  summary: string;
  tradeoff: string;
  outcome: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
};

type CredentialItem = {
  title: string;
  organization: string;
  period: string;
  note: string;
};

const PROFILE = {
  name: "Thiviyanath Maheswaran",
  handle: "ithivi.xyz",
  role: "Software Engineer — Full-Stack, Applied AI & Systems",
  location: "Sri Lanka",
  availability: "Open to Software Engineering & AI/Systems Roles",
  email: "thiviyanath15@gmail.com",
  github: "https://github.com/Thiviyanath",
  bio: "I build practical software across web applications, backend APIs, computer vision, and applied machine learning. Rather than over-engineering interfaces, I care about clear system boundaries, reliable data flows, and code that another engineer can read and maintain without guesswork.",
  now: [
    "Refining my portfolio architecture and project documentation on ithivi.xyz",
    "Building and benchmarking full-stack, API, and computer vision workflows",
    "Sharpening system design fundamentals, security hygiene, and production delivery",
  ],
};

const STACK_GROUPS = [
  {
    label: "Core Languages & Web",
    items: [
      { name: "TypeScript / JavaScript", note: "Typed UIs, Next.js App Router, and tooling" },
      { name: "Python", note: "Scripting, ML/CV pipelines, and backend services" },
      { name: "SQL & Relational Data", note: "Structured schemas, queries, and consistency" },
      { name: "Tailwind CSS", note: "Predictable layout spacing and responsive UI" },
    ],
  },
  {
    label: "Frameworks, Cloud & Tooling",
    items: [
      { name: "Next.js & React", note: "Component architecture and server/client boundaries" },
      { name: "Git & GitHub", note: "Version control, branches, and release tracking" },
      { name: "Vercel", note: "Continuous preview and production deployments" },
      { name: "Linux / macOS CLI", note: "Local environments, builds, and debugging" },
    ],
  },
  {
    label: "Applied AI, CV & Security",
    items: [
      { name: "Computer Vision", note: "Image/video processing and detection workflows" },
      { name: "Applied Machine Learning", note: "Model integration, evaluation, and inference" },
      { name: "API & Auth Security", note: "Input validation, least privilege, and safe defaults" },
      { name: "System Architecture", note: "Decoupling UI, business logic, and persistence" },
    ],
  },
];

const PROJECTS: ProjectItem[] = [
  {
    id: "devsecops-ast",
    index: "01",
    title: "Code & Dependency Security Auditor",
    domain: "Security & Tooling",
    summary:
      "Static inspection workflow focused on catching unsafe code patterns, risky configurations, and common vulnerability smells early in development.",
    tradeoff:
      "Prioritized fast, deterministic rule checks and clear remediation hints over heavy multi-pass scans that slow down everyday feedback.",
    outcome:
      "Surfaces actionable fixes with line-level context so issues are resolved before commit rather than late in review.",
    stack: ["TypeScript", "Static Analysis", "Security Rules", "CLI / Web"],
    repoUrl: "https://github.com/Thiviyanath",
  },
  {
    id: "cv-pipeline",
    index: "02",
    title: "Computer Vision & Inference Pipeline",
    domain: "Applied AI & CV",
    summary:
      "End-to-end visual processing pipeline handling frame/image ingestion, preprocessing, model inference, and structured result output.",
    tradeoff:
      "Kept preprocessing deterministic and modular so model weights or thresholds can be swapped without rewriting downstream consumers.",
    outcome:
      "Produces consistent, inspectable outputs with clear separation between raw media handling and application logic.",
    stack: ["Python", "Computer Vision", "Model Inference", "Pipelines"],
    repoUrl: "https://github.com/Thiviyanath",
  },
  {
    id: "api-service",
    index: "03",
    title: "Full-Stack Web & API Platform",
    domain: "Full-Stack & APIs",
    summary:
      "Structured web application pairing a responsive frontend with clean backend endpoints, validation, and predictable state management.",
    tradeoff:
      "Chose explicit data contracts and straightforward error states over overly clever abstractions that hide failures.",
    outcome:
      "Keeps client and server responsibilities clean, testable, and easy to extend as features grow.",
    stack: ["Next.js", "TypeScript", "REST / APIs", "Tailwind CSS"],
    liveUrl: "https://ithivi.xyz",
    repoUrl: "https://github.com/Thiviyanath",
  },
  {
    id: "ops-workflows",
    index: "04",
    title: "Business & Operations Management System",
    domain: "Systems & Data",
    summary:
      "Workflow-driven application for organizing records, tracking status transitions, and generating reliable operational summaries.",
    tradeoff:
      "Enforced strict validation at entry boundaries so downstream reports stay accurate without manual cleanup.",
    outcome:
      "Reduces repetitive manual tracking and gives clear visibility into current operational state.",
    stack: ["React", "Relational Modeling", "Workflow Logic", "UI Systems"],
    repoUrl: "https://github.com/Thiviyanath",
  },
];

const CREDENTIALS: CredentialItem[] = [
  {
    title: "B.Sc. (Hons) / Computing & Software Engineering",
    organization: "Academic Foundation",
    period: "Undergraduate",
    note: "Core coursework in algorithms, software engineering practices, databases, and systems development.",
  },
  {
    title: "Cloud & Security Fundamentals",
    organization: "Technical Training & Self-Directed Labs",
    period: "Ongoing",
    note: "Hands-on practice with cloud deployment workflows, identity/access principles, and secure coding.",
  },
  {
    title: "IEEE & Technical Community Involvement",
    organization: "Student / Engineering Community",
    period: "Active",
    note: "Collaboration on technical initiatives, peer learning, and practical engineering projects.",
  },
];

function LiveNodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999 };

    const NODE_COUNT = 44;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (const n of nodes) {
        if (n.x > width) n.x = Math.random() * width;
        if (n.y > height) n.y = Math.random() * height;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < 120) {
          n.x += (dx / dist) * 0.45;
          n.y += (dy / dist) * 0.45;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            const alpha = 0.14 * (1 - dist / 130);
            ctx.strokeStyle = `rgba(15, 118, 110, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(15, 118, 110, 0.35)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
}

export default function HomePage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const domains = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.domain)))],
    []
  );

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesDomain =
        selectedDomain === "All" || project.domain === selectedDomain;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.stack.some((tech) => tech.toLowerCase().includes(q));
      return matchesDomain && matchesQuery;
    });
  }, [selectedDomain, query]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#18181B] antialiased selection:bg-[#18181B] selection:text-[#FAF9F6]">
      <LiveNodeBackground />

      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/90 bg-[#FAF9F6]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-900"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-teal-700" />
            <span>{PROFILE.name}</span>
            <span className="hidden text-zinc-400 sm:inline">/</span>
            <span className="hidden font-mono text-xs text-zinc-500 sm:inline">
              {PROFILE.handle}
            </span>
          </a>

          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <a href="#work" className="hover:text-zinc-950 transition-colors">
              Work
            </a>
            <a href="#stack" className="hover:text-zinc-950 transition-colors">
              Stack
            </a>
            <a href="#about" className="hover:text-zinc-950 transition-colors">
              About
            </a>
            <a
              href="#contact"
              className="rounded-md border border-zinc-300 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:border-zinc-900 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-5xl px-6 py-14 sm:py-20 space-y-20">
        {/* Hero / Intro */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs text-zinc-600 backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-zinc-500" />
              <span>{PROFILE.location}</span>
              <span className="text-zinc-300">•</span>
              <span>{PROFILE.availability}</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.12]">
              {PROFILE.role}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              {PROFILE.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                <FolderGit2 className="h-4 w-4" />
                <span>Selected Work</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 hover:border-zinc-900 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-800 hover:border-zinc-900 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-4 w-4 text-teal-700" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-zinc-500" />
                    <span>{PROFILE.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Profile Photo + Current Focus */}
          <aside className="space-y-5 lg:col-span-4">
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white/95 p-2 backdrop-blur-sm">
              <img
                src="/profile.jpg"
                alt={PROFILE.name}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <div className="flex items-center justify-between px-2 pt-2.5 pb-1 text-xs text-zinc-500">
                <span className="font-medium text-zinc-800">{PROFILE.name}</span>
                <span>{PROFILE.location}</span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white/95 p-5 space-y-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <Terminal className="h-3.5 w-3.5" />
                <span>Currently Focusing On</span>
              </div>
              <ul className="space-y-2.5 text-sm text-zinc-700">
                {PROFILE.now.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <hr className="relative z-10 border-zinc-200" />

        {/* Projects / Case Notes */}
        <section id="work" className="space-y-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-1.5">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                Selected Engineering Work
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                Projects, Trade-offs & Outcomes
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by stack or keyword..."
                className="w-full rounded-md border border-zinc-300 bg-white/95 py-2 pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => {
              const active = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 bg-white/90 text-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white/95 p-6 backdrop-blur-sm transition-colors hover:border-zinc-400"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-mono">NO. {project.index}</span>
                    <span className="rounded bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">
                      {project.domain}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-zinc-950">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-600">
                    {project.summary}
                  </p>

                  <div className="space-y-2.5 rounded-lg border border-zinc-100 bg-[#FAF9F6]/90 p-4 text-xs leading-relaxed">
                    <div>
                      <span className="font-semibold text-zinc-900">
                        Key Trade-off:{" "}
                      </span>
                      <span className="text-zinc-600">{project.tradeoff}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-zinc-900">
                        Result:{" "}
                      </span>
                      <span className="text-zinc-600">{project.outcome}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-zinc-100 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[11px] text-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
                      >
                        <span>Live Site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-950"
                      >
                        <span>Source on GitHub</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-white/90 p-8 text-center text-sm text-zinc-500">
              No projects match that filter.{" "}
              <button
                type="button"
                onClick={() => {
                  setSelectedDomain("All");
                  setQuery("");
                }}
                className="font-medium text-zinc-900 underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        <hr className="relative z-10 border-zinc-200" />

        {/* Stack & How I Use It */}
        <section id="stack" className="space-y-8">
          <div className="space-y-1.5">
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              Tools & Practice
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Technologies Grouped by Role
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STACK_GROUPS.map((group, index) => (
              <div
                key={group.label}
                className="rounded-xl border border-zinc-200 bg-white/95 p-6 space-y-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-950">
                  {index === 0 && <Layers className="h-4 w-4 text-zinc-600" />}
                  {index === 1 && <FileText className="h-4 w-4 text-zinc-600" />}
                  {index === 2 && (
                    <ShieldCheck className="h-4 w-4 text-zinc-600" />
                  )}
                  <h3>{group.label}</h3>
                </div>

                <dl className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.name} className="space-y-0.5">
                      <dt className="text-sm font-medium text-zinc-900">
                        {item.name}
                      </dt>
                      <dd className="text-xs leading-relaxed text-zinc-500">
                        {item.note}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <hr className="relative z-10 border-zinc-200" />

        {/* Background & Credentials */}
        <section id="about" className="space-y-8">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-5 w-5 text-zinc-700" />
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Education & Background
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred.title}
                className="rounded-xl border border-zinc-200 bg-white/95 p-5 space-y-2 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
                  <span>{cred.organization}</span>
                  <span className="font-mono">{cred.period}</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-950">
                  {cred.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-600">
                  {cred.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="rounded-2xl border border-zinc-200 bg-white/95 p-8 sm:p-10 backdrop-blur-sm"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-2 max-w-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                Get in Touch
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                Building something thoughtful? Let’s talk.
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600">
                Reach out directly by email for engineering roles, project
                collaborations, or technical discussions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 hover:border-zinc-900 transition-colors"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-200 bg-[#FAF9F6]/85 py-8 text-xs text-zinc-500 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span>
            {PROFILE.name} — {PROFILE.handle}
          </span>
          <span>Built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}