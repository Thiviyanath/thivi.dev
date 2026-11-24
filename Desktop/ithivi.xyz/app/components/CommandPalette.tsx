"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Command, Search, X } from "lucide-react";
import { NAV_ITEMS } from "./portfolio-data";

const COMMANDS = [
  ...NAV_ITEMS.map((item) => ({
    href: item.href,
    label: item.label,
    description: `Open the ${item.label.toLowerCase()} page`,
    keywords: item.label,
  })),
  {
    href: "/about#experience",
    label: "Experience",
    description: "Jump to work experience",
    keywords: "career work history",
  },
];

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCommands = COMMANDS.filter((command) =>
    `${command.label} ${command.description} ${command.keywords}`
      .toLowerCase()
      .includes(normalizedQuery)
  );
  const activeCommand =
    filteredCommands[activeIndex] ?? filteredCommands[0] ?? null;

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      const shortcut = (event.metaKey || event.ctrlKey) && event.key === "k";
      const slashShortcut = event.key === "/" && !isTypingTarget(event.target);

      if (shortcut || slashShortcut) {
        event.preventDefault();
        if (!open) {
          previousFocusRef.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
          setQuery("");
          setActiveIndex(0);
        }
        setOpen((current) => !current);
      }

      if (open && event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    searchRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [open]);

  const navigateTo = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    if (event.key === "ArrowDown" && filteredCommands.length > 0) {
      event.preventDefault();
      setActiveIndex((index) =>
        index >= filteredCommands.length - 1 ? 0 : index + 1
      );
    } else if (event.key === "ArrowUp" && filteredCommands.length > 0) {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? filteredCommands.length - 1 : index - 1
      );
    } else if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      navigateTo(activeCommand.href);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          previousFocusRef.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
          setQuery("");
          setActiveIndex(0);
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-md border border-line bg-white/[0.03] px-3 py-2 text-xs text-zinc-400 transition-colors hover:border-accent/30 hover:text-zinc-100"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Search aria-hidden="true" className="size-3.5 sm:hidden" />
        <Command aria-hidden="true" className="hidden size-3.5 sm:block" />
        <span className="sm:hidden">Jump</span>
        <span className="hidden sm:inline">Quick jump</span>
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] md:inline">
          ⌘K / Ctrl K
        </kbd>
        <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          /
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close command palette"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
            onKeyDown={handleDialogKeyDown}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60"
          >
            <h2 id="command-palette-title" className="sr-only">
              Quick navigation
            </h2>
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search
                aria-hidden="true"
                className="size-4 shrink-0 text-zinc-500"
              />
              <input
                ref={searchRef}
                type="search"
                role="combobox"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                aria-label="Search pages and sections"
                aria-autocomplete="list"
                aria-controls="command-results"
                aria-expanded="true"
                aria-activedescendant={
                  activeCommand
                    ? `command-${activeCommand.href.replace(/[^a-z0-9]/gi, "-")}`
                    : undefined
                }
                placeholder="Search pages and sections..."
                className="min-w-0 flex-1 bg-transparent py-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-100"
                aria-label="Close quick navigation"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div
              id="command-results"
              role="listbox"
              aria-label="Navigation results"
              className="max-h-[min(60vh,24rem)] overflow-y-auto p-2"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => {
                  const id = `command-${command.href.replace(/[^a-z0-9]/gi, "-")}`;
                  const active = activeCommand?.href === command.href;
                  return (
                    <button
                      key={command.href}
                      id={id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => navigateTo(command.href)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                        active
                          ? "bg-accent/10 text-zinc-100"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
                      }`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {command.label}
                        </span>
                        <span className="mt-1 block text-xs text-zinc-500">
                          {command.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className={`size-4 shrink-0 ${
                          active ? "text-accent" : "text-zinc-600"
                        }`}
                      />
                    </button>
                  );
                })
              ) : (
                <p className="px-3 py-8 text-center text-sm text-zinc-500">
                  No matching pages or sections.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-zinc-600">
              <span>↑↓ navigate · Enter open · Esc close</span>
              <span>LOCAL NAV</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
