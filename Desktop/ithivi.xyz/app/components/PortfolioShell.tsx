"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "./portfolio-data";

type PortfolioShellProps = {
  children: ReactNode;
};

function isCurrentRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

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
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-3 rounded-sm focus-visible:outline-offset-4"
            aria-label={`${PROFILE.handle} home`}
          >
            <span className="grid size-9 place-items-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent">
              TM
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-zinc-100">
                {PROFILE.handle}
              </span>
              <span className="block text-xs text-zinc-500">
                Software · Systems · Applied AI
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex flex-wrap items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const active = isCurrentRoute(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-offset-2 ${
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
