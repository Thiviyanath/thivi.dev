import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { STACK_GROUPS } from "../components/portfolio-data";

export default function StackPage() {
  return (
    <div className="space-y-12">
      <ScrollReveal sectionLabel="Stack">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Tools & responsibilities
          </p>
          <h1 className="title-depth text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Stack & tools
          </h1>
          <p className="text-base leading-7 text-zinc-400">
            A practical toolkit, grouped by the kind of engineering work it
            supports—not a list of tools without context.
          </p>
        </header>
      </ScrollReveal>

      <div
        data-section-sync="Tool groups"
        className="grid gap-5 lg:grid-cols-3"
      >
        {STACK_GROUPS.map((group, index) => (
          <ScrollReveal key={group.code} delayMs={index * 70} tilt>
            <section className="h-full rounded-2xl border border-line bg-surface/85 p-5 sm:p-6">
              <p className="font-mono text-xs text-accent">{group.code}</p>
              <h2 className="mt-3 text-lg font-semibold text-zinc-100">
                {group.label}
              </h2>
              <dl className="mt-6 space-y-5">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="border-t border-line pt-4 first:border-0 first:pt-0"
                  >
                    <dt className="font-medium text-zinc-200">{item.name}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-zinc-500">
                      {item.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal sectionLabel="Selection criteria">
        <aside className="flex flex-col gap-4 rounded-xl border border-accent/20 bg-accent/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-zinc-400">
            I choose tools based on reliability, clear ownership, and how easily
            the next engineer can understand the system.
          </p>
          <a
            href="https://github.com/Thiviyanath"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-accent hover:text-emerald-300"
          >
            Browse GitHub
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </aside>
      </ScrollReveal>
    </div>
  );
}
