"use client";

import { useState } from "react";

const PATCH_SAMPLES = [
  {
    id: "query-parameters",
    label: "Query parameters",
    rule: "DB-001 · Unparameterized query construction",
    detail:
      "Values are concatenated into a query string. Bind values through the database driver instead.",
    before: [
      "function findRecord(recordId: string) {",
      '  const query = "SELECT * FROM records WHERE id = " + recordId;',
      "  return database.query(query);",
      "}",
    ],
    after: [
      "function findRecord(recordId: string) {",
      '  return database.query("SELECT * FROM records WHERE id = ?", [recordId]);',
      "}",
    ],
    vulnerableHighlight: 1,
    patchedHighlights: [1],
    removed: 'const query = "SELECT * FROM records WHERE id = " + recordId;',
    added:
      'return database.query("SELECT * FROM records WHERE id = ?", [recordId]);',
  },
  {
    id: "secret-config",
    label: "Secret configuration",
    rule: "CFG-002 · Secret-like value in source",
    detail:
      "A credential-shaped placeholder is embedded in source. Read configuration from the runtime environment and fail clearly when absent.",
    before: [
      'const serviceToken = "REDACTED_EXAMPLE_TOKEN";',
      "",
      "connectToService({ token: serviceToken });",
    ],
    after: [
      'const serviceToken = process.env.SERVICE_TOKEN;',
      'if (!serviceToken) throw new Error("SERVICE_TOKEN is required");',
      "",
      "connectToService({ token: serviceToken });",
    ],
    vulnerableHighlight: 0,
    patchedHighlights: [0, 1],
    removed: 'const serviceToken = "REDACTED_EXAMPLE_TOKEN";',
    added: "const serviceToken = process.env.SERVICE_TOKEN;",
  },
] as const;

type ReviewMode = "vulnerable" | "patched";

export function AIPatchSimulator() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [reviewMode, setReviewMode] = useState<ReviewMode>("vulnerable");
  const sample = PATCH_SAMPLES[sampleIndex];
  const lines = reviewMode === "vulnerable" ? sample.before : sample.after;

  return (
    <section className="rounded-2xl border border-line bg-surface/90 p-5 sm:p-7">
      <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Static rule demo · no source execution
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Patch inspector
          </h3>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            Compare a synthetic finding with a minimal defensive change.
          </p>
        </div>
        <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] text-zinc-500">
          LOCAL ONLY
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Sample rules">
        {PATCH_SAMPLES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={sampleIndex === index}
            onClick={() => {
              setSampleIndex(index);
              setReviewMode("vulnerable");
            }}
            className={`rounded-lg border px-3 py-2 text-xs transition-colors focus-visible:outline-offset-2 ${
              sampleIndex === index
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-line text-zinc-400 hover:border-white/20 hover:text-zinc-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-lg border border-line bg-background/70 p-1">
          {(["vulnerable", "patched"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={reviewMode === mode}
              onClick={() => setReviewMode(mode)}
              className={`rounded-md px-3 py-1.5 text-xs capitalize transition-colors ${
                reviewMode === mode
                  ? mode === "vulnerable"
                    ? "bg-rose-400/10 text-rose-300"
                    : "bg-accent/10 text-accent"
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-zinc-600">
          SAMPLE // {sample.id.toUpperCase()}
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-[#0b0d10]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="font-mono text-[10px] text-zinc-500">
            {reviewMode === "vulnerable" ? "SOURCE" : "PATCH"}
          </span>
          <span
            className={`font-mono text-[10px] ${
              reviewMode === "vulnerable" ? "text-rose-300" : "text-accent"
            }`}
          >
            {reviewMode === "vulnerable" ? "1 FINDING" : "RULE ADDRESSED"}
          </span>
        </div>
        <pre
          aria-label={`${reviewMode} code sample for ${sample.label}`}
          className="overflow-x-auto p-4 text-xs leading-6"
        >
          <code>
            {lines.map((line, index) => {
              const isChangedLine =
                reviewMode === "vulnerable"
                  ? index === sample.vulnerableHighlight
                  : sample.patchedHighlights.some(
                      (highlight) => highlight === index
                    );
              let lineClass = "text-zinc-300";
              if (isChangedLine) {
                lineClass =
                  reviewMode === "vulnerable"
                    ? "bg-rose-400/10 text-rose-200"
                    : "bg-accent/10 text-emerald-200";
              }
              return (
                <span
                  key={`${sample.id}-${reviewMode}-${index}`}
                  className={`block min-w-max px-2 ${lineClass}`}
                >
                  <span aria-hidden="true" className="mr-3 text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {line || " "}
                </span>
              );
            })}
          </code>
        </pre>
      </div>

      <div
        aria-live="polite"
        className={`mt-4 rounded-xl border p-4 ${
          reviewMode === "vulnerable"
            ? "border-rose-300/15 bg-rose-300/[0.04]"
            : "border-accent/15 bg-accent/[0.04]"
        }`}
      >
        <p
          className={`font-mono text-[10px] uppercase tracking-wide ${
            reviewMode === "vulnerable" ? "text-rose-300" : "text-accent"
          }`}
        >
          {reviewMode === "vulnerable" ? sample.rule : "PATCH REVIEW"}
        </p>
        <p className="mt-1.5 text-sm leading-6 text-zinc-400">
          {reviewMode === "vulnerable"
            ? sample.detail
            : "The displayed change addresses this sample rule; review surrounding code and test behavior before adopting it."}
        </p>
      </div>

      <details className="group mt-4 rounded-xl border border-line bg-background/50">
        <summary className="cursor-pointer list-none px-4 py-3 text-xs font-medium text-zinc-400 marker:hidden focus-visible:outline-offset-2 group-open:border-b group-open:border-line">
          <span aria-hidden="true" className="mr-2 text-accent">
            +
          </span>
          View focused diff
        </summary>
        <div className="grid gap-2 p-3 sm:grid-cols-2">
          <code className="block overflow-x-auto rounded-lg bg-rose-300/[0.06] p-3 font-mono text-[11px] leading-5 text-rose-200">
            <span aria-hidden="true" className="mr-2 text-rose-400">
              −
            </span>
            {sample.removed}
          </code>
          <code className="block overflow-x-auto rounded-lg bg-accent/[0.06] p-3 font-mono text-[11px] leading-5 text-emerald-200">
            <span aria-hidden="true" className="mr-2 text-accent">
              +
            </span>
            {sample.added}
          </code>
        </div>
      </details>
    </section>
  );
}
