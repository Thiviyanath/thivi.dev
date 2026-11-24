"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "./portfolio-data";
import CommandPalette from "./CommandPalette";

type PortfolioShellProps = {
  children: ReactNode;
};

function isCurrentRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

const buildCommit =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_BUILD_COMMIT;
const BUILD_LABEL = buildCommit
  ? `BUILD // ${buildCommit.slice(0, 7)}`
  : process.env.NODE_ENV === "development"
    ? "DEV BUILD"
    : "LOCAL BUILD";

export default function PortfolioShell({ children }: PortfolioShellProps) {
  const pathname = usePathname();

  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-accent px-4 py-2 font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-5 sm:px-6 sm:py-4 lg:px-8">
          <Link
            href="/"
            className="col-start-1 row-start-1 inline-flex min-w-0 w-fit items-center gap-3 rounded-sm focus-visible:outline-offset-4"
            aria-label={`${PROFILE.handle} home`}
          >
            <span className="grid size-9 place-items-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent">
              TM
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-zinc-100">
                {PROFILE.handle}
              </span>
              <span className="hidden text-xs text-zinc-500 sm:block">
                Software · Systems · Applied AI
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="col-span-2 row-start-2 flex min-w-0 items-center gap-1 overflow-x-auto sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-center sm:overflow-visible"
          >
            {NAV_ITEMS.map((item) => {
              const active = isCurrentRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-offset-2 ${
                    active
                      ? "bg-white/8 text-accent"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="col-start-2 row-start-1 flex items-center justify-end gap-2 sm:col-start-3">
            <span
              aria-label={`System online; ${BUILD_LABEL.toLowerCase()}`}
              className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-2.5 py-2 font-mono text-[10px] tracking-wide text-zinc-500"
            >
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(52,211,153,0.65)]" />
              <span className="hidden sm:inline">SYS // ONLINE</span>
            </span>
            <span className="hidden rounded-md border border-line px-2.5 py-2 font-mono text-[10px] tracking-wide text-zinc-500 sm:inline">
              {BUILD_LABEL}
            </span>
            <CommandPalette />
          </div>

        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 focus:outline-none sm:px-6 sm:py-16 lg:px-8"
      >
        {children}
      </main>

      <footer className="border-t border-line bg-background/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-7 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-zinc-500">
            © {PROFILE.name} · Built with Next.js and a little geometry.
          </p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
            {NAV_ITEMS.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-400 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-accent"
            >
              GitHub <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
