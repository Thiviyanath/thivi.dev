import { ArrowUpRight, Mail } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import CopyEmailButton from "../components/CopyEmailButton";
import { PROFILE } from "../components/portfolio-data";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <ScrollReveal sectionLabel="Contact">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Direct channel
          </p>
          <h1 className="title-depth text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Contact
          </h1>
          <p className="text-base leading-7 text-zinc-400">
            For software engineering opportunities, applied AI or computer
            vision work, and thoughtful technical collaboration.
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delayMs={80}>
        <section
          data-section-sync="Email"
          className="max-w-3xl rounded-2xl border border-line bg-surface/90 p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/20 bg-accent/5 text-accent">
              <Mail aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-zinc-100">
                Email is the best place to start.
              </h2>
              <a
                href={`mailto:${PROFILE.email}`}
                className="mt-2 inline-block break-all text-base text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
              >
                {PROFILE.email}
              </a>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Include a little context about the role, project, or question
                so I can reply with the right details.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-start gap-x-5 gap-y-3 border-t border-line pt-6">
            <CopyEmailButton email={PROFILE.email} />
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent"
            >
              GitHub profile
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
