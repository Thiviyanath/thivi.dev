"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { PROJECTS, PROFILE } from "../components/portfolio-data";

const DOMAINS = ["All", ...new Set(PROJECTS.map((project) => project.domain))];

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchesDomain =
        selectedDomain === "All" || project.domain === selectedDomain;
      const searchableText = [
        project.title,
        project.domain,
        project.problem,
        project.tradeoff,
        project.outcome,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesDomain &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });
  }, [query, selectedDomain]);

  return (
    <div className="space-y-12">
      <ScrollReveal>
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Engineering case notes
          </p>
          <h1 className="title-depth text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Projects
          </h1>
          <p className="text-base leading-7 text-zinc-400">
            A selection of systems and experiments, described through the
            problem, implementation trade-offs, and practical outcome.
          </p>
        </header>
      </ScrollReveal>

      <section aria-label="Filter projects" className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="Filter by domain">
            {DOMAINS.map((domain) => {
              const active = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedDomain(domain)}
                  className={`rounded-full border px-3.5 py-2 text-sm transition-colors focus-visible:outline-offset-2 ${
                    active
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-line bg-surface text-zinc-400 hover:border-white/20 hover:text-zinc-100"
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">Search projects by keyword or stack</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, problem, or stack"
              className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent/50 focus:outline-none"
            />
          </label>
        </div>

        <p aria-live="polite" className="text-sm text-zinc-500">
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </p>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delayMs={(index % 2) * 70}>
                <article
                  id={project.id}
                  className="flex h-full scroll-mt-28 flex-col rounded-2xl border border-line bg-surface/90 p-5 sm:p-7"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs text-accent">
                      {project.code}
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 text-xs text-zinc-400">
                      {project.domain}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-semibold tracking-tight text-zinc-100">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {project.problem}
                  </p>

                  <dl className="mt-6 grid gap-4 border-t border-line pt-5">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        Technical trade-off
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-zinc-500">
                        {project.tradeoff}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        Practical outcome
                      </dt>
                      <dd className="mt-1.5 text-sm leading-6 text-zinc-500">
                        {project.outcome}
                      </dd>
                    </div>
                  </dl>

                  <ul
                    aria-label={`${project.title} technology stack`}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {project.stack.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-400"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-5 border-t border-line pt-5">
                    <a
                      href={project.repoUrl ?? PROFILE.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-emerald-300"
                    >
                      GitHub profile
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
                      >
                        Live site
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </a>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-line bg-surface/60 p-10 text-center">
            <p className="font-medium text-zinc-200">No matching projects.</p>
            <p className="mt-2 text-sm text-zinc-500">
              Try a different keyword or clear the selected domain.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDomain("All");
                setQuery("");
              }}
              className="mt-5 rounded-lg border border-accent/30 px-4 py-2 text-sm text-accent hover:bg-accent/10"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
