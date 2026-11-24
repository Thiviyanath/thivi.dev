export type ProjectItem = {
  id: string;
  code: string;
  title: string;
  domain: string;
  problem: string;
  tradeoff: string;
  outcome: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
};

export type CredentialItem = {
  title: string;
  organization: string;
  period: string;
  note: string;
};

export const PROFILE = {
  name: "Thiviyanath Maheswaran",
  handle: "ithivi.xyz",
  role: "Full-Stack, Applied AI & Systems Engineer",
  location: "Sri Lanka",
  availability: "Available for Software & AI/Systems Engineering",
  email: "thiviyanath15@gmail.com",
  github: "https://github.com/Thiviyanath",
  bio: "I build practical software across web applications, backend APIs, computer vision, and applied machine learning. Rather than over-engineering interfaces, I care about clear system boundaries, reliable data flows, and code that another engineer can read and maintain without guesswork.",
  now: [
    "Refining portfolio architecture and case documentation on ithivi.xyz",
    "Building and benchmarking full-stack, API, and computer vision workflows",
    "Deepening system design fundamentals, security hygiene, and delivery reliability",
  ],
};

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/stack", label: "Stack" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const STACK_GROUPS = [
  {
    code: "MOD // 01",
    label: "Core Languages & Web",
    items: [
      { name: "TypeScript / JavaScript", note: "Typed UIs, Next.js App Router, and tooling" },
      { name: "Python", note: "Scripting, ML/CV pipelines, and backend services" },
      { name: "SQL & Relational Data", note: "Structured schemas, queries, and consistency" },
      { name: "Tailwind CSS", note: "Predictable layout spacing and responsive UI" },
    ],
  },
  {
    code: "MOD // 02",
    label: "Frameworks, Cloud & Tooling",
    items: [
      { name: "Next.js & React", note: "Component architecture and server/client boundaries" },
      { name: "Git & GitHub", note: "Version control, branches, and release tracking" },
      { name: "Vercel", note: "Continuous preview and production deployments" },
      { name: "Linux / macOS CLI", note: "Local environments, builds, and debugging" },
    ],
  },
  {
    code: "MOD // 03",
    label: "Applied AI, CV & Security",
    items: [
      { name: "Computer Vision", note: "Image/video processing and detection workflows" },
      { name: "Applied Machine Learning", note: "Model integration, evaluation, and inference" },
      { name: "API & Auth Security", note: "Input validation, least privilege, and safe defaults" },
      { name: "System Architecture", note: "Decoupling UI, business logic, and persistence" },
    ],
  },
];

export const ENGINEERING_APPROACH = [
  {
    title: "Make boundaries explicit",
    note: "Keep UI state, service contracts, and persistence responsibilities clear so changes stay local.",
  },
  {
    title: "Prefer useful feedback",
    note: "Choose deterministic checks and understandable failure states over complexity that slows iteration.",
  },
  {
    title: "Measure the practical result",
    note: "Describe what a workflow enables and what trade-offs it makes, not just the tools it uses.",
  },
];

export const EXPERIENCE = {
  role: "Full Stack Developer",
  organization: "Neirah Tech Solutions",
  period: "6 months",
  summary:
    "Contributed to production web applications and REST APIs across frontend state, backend services, and relational data.",
  highlights: [
    "Worked across frontend features, backend endpoints, and database schema changes.",
    "Debugged edge cases and added unit or integration tests as part of delivery.",
    "Collaborated through Git-based workflows with an engineering team.",
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "devsecops-ast",
    code: "SPEC-01",
    title: "Code & Dependency Security Auditor",
    domain: "Security & Tooling",
    problem:
      "Code reviews need a fast, repeatable way to flag risky patterns and dependency configuration issues before changes land.",
    tradeoff:
      "Prioritized fast, deterministic rule checks and clear remediation hints over heavy multi-pass scans that slow down everyday feedback.",
    outcome:
      "Surfaces actionable fixes with line-level context so issues are resolved before commit rather than late in review.",
    stack: ["TypeScript", "Static Analysis", "Security Rules", "CLI / Web"],
    repoUrl: "https://github.com/Thiviyanath",
  },
  {
    id: "cv-pipeline",
    code: "SPEC-02",
    title: "Computer Vision & Inference Pipeline",
    domain: "Applied AI & CV",
    problem:
      "Vision applications need predictable handling of image or video input before model inference and downstream use.",
    tradeoff:
      "Kept preprocessing deterministic and modular so model weights or thresholds can be swapped without rewriting downstream consumers.",
    outcome:
      "Produces consistent, inspectable outputs with clear separation between raw media handling and application logic.",
    stack: ["Python", "Computer Vision", "Model Inference", "Pipelines"],
    repoUrl: "https://github.com/Thiviyanath",
  },
  {
    id: "api-service",
    code: "SPEC-03",
    title: "Full-Stack Web & API Platform",
    domain: "Full-Stack & APIs",
    problem:
      "A growing web application needs clear request contracts and validation between its responsive UI and backend services.",
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
    code: "SPEC-04",
    title: "Business & Operations Management System",
    domain: "Systems & Data",
    problem:
      "Operations teams need a reliable way to organize records, track status changes, and produce consistent summaries.",
    tradeoff:
      "Enforced strict validation at entry boundaries so downstream reports stay accurate without manual cleanup.",
    outcome:
      "Reduces repetitive manual tracking and gives clear visibility into current operational state.",
    stack: ["React", "Relational Modeling", "Workflow Logic", "UI Systems"],
    repoUrl: "https://github.com/Thiviyanath",
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    title: "B.Sc. (Hons) Software Engineering",
    organization: "SLIIT City Uni / University of Bedfordshire",
    period: "2024–2027",
    note: "Undergraduate study in software engineering, systems development, and computing fundamentals.",
  },
  {
    title: "Software Engineering Foundation Studies",
    organization: "IIT",
    period: "2023",
    note: "Foundation study covering programming and core software engineering concepts.",
  },
  {
    title: "AWS Academy Cloud Foundations",
    organization: "AWS Academy",
    period: "Completed",
    note: "Cloud computing foundations, infrastructure concepts, and AWS services.",
  },
  {
    title: "IBM SkillsBuild — Generative AI",
    organization: "IBM SkillsBuild",
    period: "Completed",
    note: "Introductory learning in generative AI concepts and responsible application.",
  },
  {
    title: "IEEE & Technical Community",
    organization: "Student engineering community",
    period: "Ongoing",
    note: "Peer learning and collaboration on technical initiatives and practical projects.",
  },
];