import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import {
  CREDENTIALS,
  ENGINEERING_APPROACH,
  EXPERIENCE,
  PROFILE,
} from "../components/portfolio-data";

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <ScrollReveal>
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Background & practice
          </p>
          <h1 className="title-depth text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            About
          </h1>
          <p className="text-lg leading-8 text-zinc-300">{PROFILE.bio}</p>
          <p className="text-sm leading-6 text-zinc-500">
            Based in {PROFILE.location}. I enjoy working where product needs
            meet thoughtful engineering constraints.
          </p>
        </header>
      </ScrollReveal>

      <section aria-labelledby="approach-heading" className="space-y-6">
        <ScrollReveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              How I work
            </p>
            <h2
              id="approach-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100"
            >
              Engineering with intent.
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {ENGINEERING_APPROACH.map((item, index) => (
            <ScrollReveal key={item.title} delayMs={index * 70}>
              <article className="h-full rounded-xl border border-line bg-surface/80 p-5">
                <h3 className="font-semibold text-zinc-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {item.note}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[0.65fr_1.35fr]"
      >
        <ScrollReveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100"
            >
              Work in practice.
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delayMs={80}>
          <article className="rounded-xl border border-line bg-surface/80 p-5 sm:p-7">
            <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  {EXPERIENCE.role}
                </h3>
                <p className="mt-1 text-sm text-accent">
                  {EXPERIENCE.organization}
                </p>
              </div>
              <span className="w-fit rounded-full border border-line px-3 py-1 text-xs text-zinc-400">
                {EXPERIENCE.period}
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-zinc-400">
              {EXPERIENCE.summary}
            </p>
            <ul className="mt-5 space-y-3">
              {EXPERIENCE.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-6 text-zinc-500"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </article>
        </ScrollReveal>
      </section>

      <section
        id="education"
        aria-labelledby="education-heading"
        className="space-y-6 border-t border-line pt-10"
      >
        <ScrollReveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Education & community
            </p>
            <h2
              id="education-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100"
            >
              Foundations and continued learning.
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map((credential, index) => (
            <ScrollReveal key={credential.title} delayMs={(index % 3) * 60}>
              <article className="h-full rounded-xl border border-line bg-surface/80 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-zinc-500">
                    {credential.organization}
                  </p>
                  <span className="font-mono text-xs text-accent">
                    {credential.period}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-zinc-100">
                  {credential.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {credential.note}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-emerald-300"
        >
          Start a conversation
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </ScrollReveal>
    </div>
  );
}
