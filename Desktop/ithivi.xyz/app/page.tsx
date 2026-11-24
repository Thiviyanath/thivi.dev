import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Layers3,
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";
import ScrollReveal from "./components/ScrollReveal";
import { PROJECTS, PROFILE } from "./components/portfolio-data";

const SECTION_LINKS = [
  {
    href: "/projects",
    label: "Selected work",
    description: "Engineering problems, implementation choices, and outcomes.",
    icon: BriefcaseBusiness,
  },
  {
    href: "/stack",
    label: "Stack & systems",
    description: "Tools grouped by the work they support.",
    icon: Layers3,
  },
  {
    href: "/about",
    label: "About",
    description: "Background, experience, and how I approach engineering.",
    icon: UserRound,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Get in touch about engineering roles or collaboration.",
    icon: Mail,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <ScrollReveal className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-sm text-accent">
            <MapPin aria-hidden="true" className="size-4" />
            <span>{PROFILE.location}</span>
            <span aria-hidden="true" className="text-accent/40">/</span>
            <span className="text-zinc-300">Open to engineering opportunities</span>
          </div>

          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Full-stack · Applied AI · Systems
            </p>
            <h1 className="title-depth max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Building practical software with clear system boundaries.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              {PROFILE.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-emerald-300"
            >
              Explore projects
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-accent/40 hover:text-accent"
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={100} className="mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-line bg-surface p-3 shadow-2xl shadow-black/20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${PROFILE.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 25rem, 80vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
              <div>
                <p className="font-medium text-zinc-100">{PROFILE.name}</p>
                <p className="mt-1 text-sm text-zinc-500">{PROFILE.role}</p>
              </div>
              <span className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_14px_rgba(52,211,153,0.65)]" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ScrollReveal>
        <section className="grid gap-6 rounded-2xl border border-line bg-surface/80 p-6 sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Current focus
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">
              Learning by shipping.
            </h2>
          </div>
          <ul className="space-y-4">
            {PROFILE.now.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <section aria-labelledby="sections-heading" className="space-y-7">
        <ScrollReveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Explore
            </p>
            <h2
              id="sections-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100"
            >
              A closer look at the work.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-500">
            Each section has its own page, with the shared navigation always
            close at hand.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {SECTION_LINKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.href} delayMs={index * 70}>
                <Link
                  href={item.href}
                  className="group flex h-full items-start gap-4 rounded-xl border border-line bg-surface/80 p-5 transition-colors hover:border-accent/35 hover:bg-surface"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/5 text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3 font-medium text-zinc-100">
                      {item.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-zinc-600 transition-colors group-hover:text-accent"
                      />
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-zinc-500">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="space-y-7">
        <ScrollReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Selected work
            </p>
            <h2
              id="featured-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100"
            >
              Systems, trade-offs, results.
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-emerald-300"
          >
            View all projects
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {PROJECTS.slice(0, 3).map((project, index) => (
            <ScrollReveal key={project.id} delayMs={index * 70}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface/80 p-5">
                <p className="font-mono text-xs text-accent">{project.code}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-zinc-100">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
                  {project.problem}
                </p>
                <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-zinc-500">
                  <span className="font-medium text-zinc-300">Trade-off: </span>
                  {project.tradeoff}
                </p>
                <Link
                  href={`/projects#${project.id}`}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent hover:text-emerald-300"
                >
                  Read case note
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="flex flex-col gap-5 rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Direct channel
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
              Have a system worth building?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-accent/30 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
          >
            Contact me
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      </ScrollReveal>
    </div>
  );
}
