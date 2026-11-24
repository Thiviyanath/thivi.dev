"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { PROFILE, PROJECTS, STACK_GROUPS } from "./portfolio-data";

const COMMANDS = ["help", "projects", "stack", "whoami", "ping", "clear"];
const INITIAL_OUTPUT = [
  "ithivi-cli · local demo",
  'Type "help" to see the available commands.',
];

export function InteractiveCLI() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState(INITIAL_OUTPUT);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    setHistory((previous) => [...previous, command]);
    setHistoryIndex(-1);

    if (command === "clear") {
      setLogs(["$ clear", "Output cleared. Type `help` to start again."]);
      setInput("");
      return;
    }

    let response: string;
    switch (command) {
      case "help":
        response = `Available commands: ${COMMANDS.join(", ")}`;
        break;
      case "projects":
        response = PROJECTS.map((project) => project.title).join(" · ");
        break;
      case "stack":
        response = STACK_GROUPS.flatMap((group) =>
          group.items.map((item) => item.name)
        ).join(" · ");
        break;
      case "whoami":
        response = `${PROFILE.name} · ${PROFILE.role} · ${PROFILE.location}`;
        break;
      case "ping":
        response = "pong · local demo response (no network request)";
        break;
      default:
        response = `Unknown command: "${command}". Use "help" to see the allowlist.`;
    }

    setLogs((previous) => [...previous, `$ ${command}`, response].slice(-24));
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();
      const nextIndex =
        historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  return (
    <section className="rounded-2xl border border-line bg-surface/90 p-5 sm:p-7">
      <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Allowlisted local commands · no shell or network access
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Developer CLI
          </h3>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            Inspect portfolio data and navigate a small command set.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] text-zinc-500">
          <span className="size-1.5 rounded-full bg-accent" />
          LOCAL // READY
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-line bg-[#0b0d10]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 font-mono text-[10px] text-zinc-500">
          <span>ithivi://portfolio-cli</span>
          <span>SAFE MODE</span>
        </div>
        <div
          role="log"
          aria-label="Command output"
          aria-live="polite"
          aria-relevant="additions text"
          className="h-40 space-y-1 overflow-y-auto p-4 font-mono text-xs leading-5"
        >
          {logs.map((line, index) => (
            <p
              key={`${index}-${line}`}
              className={
                line.startsWith("$ ")
                  ? "break-words text-amber-300"
                  : "break-words text-zinc-400"
              }
            >
              {line}
            </p>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-line px-4 py-3"
        >
          <label htmlFor="portfolio-cli-input" className="sr-only">
            Enter a local portfolio command
          </label>
          <span aria-hidden="true" className="font-mono text-accent">
            $
          </span>
          <input
            id="portfolio-cli-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
            spellCheck={false}
            placeholder="Type a command..."
            className="min-w-0 flex-1 bg-transparent font-mono text-xs text-zinc-200 outline-none placeholder:text-zinc-600"
          />
          <button
            type="submit"
            className="rounded-md border border-accent/25 px-2.5 py-1.5 font-mono text-[10px] text-accent transition-colors hover:bg-accent/10"
          >
            RUN
          </button>
        </form>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Quick commands">
        {COMMANDS.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => runCommand(command)}
            className="rounded-md border border-line px-2.5 py-1.5 font-mono text-[10px] text-zinc-500 transition-colors hover:border-accent/30 hover:text-accent focus-visible:outline-offset-2"
          >
            {command}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-600">
        Tip: use ↑ and ↓ in the input to review command history.
      </p>
    </section>
  );
}
