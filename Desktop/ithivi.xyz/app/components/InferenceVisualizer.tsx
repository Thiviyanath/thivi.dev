"use client";

import { useMemo, useState } from "react";

const SYNTHETIC_DETECTIONS = [
  {
    label: "person",
    confidence: 0.94,
    box: { left: 18, top: 16, width: 23, height: 68 },
    color: "emerald",
  },
  {
    label: "vehicle",
    confidence: 0.78,
    box: { left: 51, top: 48, width: 35, height: 29 },
    color: "amber",
  },
  {
    label: "sign",
    confidence: 0.43,
    box: { left: 73, top: 14, width: 13, height: 24 },
    color: "sky",
  },
] as const;

const PIPELINE_STEPS = ["frame", "normalize", "threshold", "JSON"];

export function InferenceVisualizer() {
  const [threshold, setThreshold] = useState(55);
  const minimumConfidence = threshold / 100;
  const visibleDetections = useMemo(
    () =>
      SYNTHETIC_DETECTIONS.filter(
        (detection) => detection.confidence >= minimumConfidence
      ),
    [minimumConfidence]
  );
  const output = useMemo(
    () =>
      JSON.stringify(
        {
          frame: "synthetic-001",
          threshold: Number(minimumConfidence.toFixed(2)),
          detections: visibleDetections.map((detection) => ({
            label: detection.label,
            confidence: detection.confidence,
            box: detection.box,
          })),
        },
        null,
        2
      ),
    [minimumConfidence, visibleDetections]
  );

  return (
    <section className="rounded-2xl border border-line bg-surface/90 p-5 sm:p-7">
      <div className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Synthetic frame data · deterministic demo
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-100">
            Inference pipeline visualizer
          </h3>
          <p className="mt-1 text-sm leading-6 text-zinc-500">
            Adjust the confidence threshold and inspect the resulting
            frame-to-JSON output.
          </p>
        </div>
        <span className="w-fit rounded-full border border-line px-3 py-1 font-mono text-[10px] text-zinc-500">
          NO MODEL / NO CAMERA
        </span>
      </div>

      <ol
        aria-label="Simulated inference pipeline"
        className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {PIPELINE_STEPS.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-2 rounded-lg border border-line bg-background/50 px-3 py-2 font-mono text-[10px] text-zinc-400"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
              Frame // synthetic-001
            </p>
            <p className="font-mono text-[10px] text-zinc-600">
              {visibleDetections.length} active
            </p>
          </div>
          <div
            role="img"
            aria-label={`Synthetic detection frame. ${visibleDetections.length} detections pass the confidence threshold.`}
            className="relative aspect-video overflow-hidden rounded-xl border border-line bg-[#10181a]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.055)_1px,transparent_1px)] bg-size-[24px_24px]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-950/30 to-transparent" />
            <div className="absolute left-[8%] top-[39%] h-[45%] w-[2px] bg-emerald-300/10" />
            <div className="absolute right-[9%] top-[30%] h-[55%] w-[2px] bg-emerald-300/10" />
            <div className="absolute inset-x-0 top-[78%] border-t border-dashed border-emerald-300/15" />
            {visibleDetections.map((detection) => {
              const colorClasses = {
                emerald: "border-emerald-300/80 text-emerald-100 bg-emerald-300/10",
                amber: "border-amber-300/80 text-amber-100 bg-amber-300/10",
                sky: "border-sky-300/80 text-sky-100 bg-sky-300/10",
              };

              return (
                <div
                  key={detection.label}
                  aria-hidden="true"
                  className={`absolute rounded-sm border ${colorClasses[detection.color]}`}
                  style={{
                    left: `${detection.box.left}%`,
                    top: `${detection.box.top}%`,
                    width: `${detection.box.width}%`,
                    height: `${detection.box.height}%`,
                  }}
                >
                  <span className="absolute -top-5 left-0 whitespace-nowrap rounded-t-sm bg-black/70 px-1.5 py-0.5 font-mono text-[9px]">
                    {detection.label} {(detection.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
            <span className="absolute bottom-2 left-2 font-mono text-[9px] text-zinc-500">
              FRAME 001 · NORMALIZED
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="confidence-threshold"
              className="text-sm font-medium text-zinc-300"
            >
              Confidence threshold
            </label>
            <output
              htmlFor="confidence-threshold"
              className="font-mono text-xs text-accent"
            >
              {threshold}%
            </output>
          </div>
          <input
            id="confidence-threshold"
            type="range"
            min="25"
            max="95"
            step="1"
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
            className="mt-3 h-2 w-full cursor-pointer accent-emerald-400"
          />
          <div className="mt-1 flex justify-between font-mono text-[9px] text-zinc-600">
            <span>25%</span>
            <span>95%</span>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-line bg-[#0b0d10]">
            <div className="flex items-center justify-between border-b border-line px-3 py-2 font-mono text-[10px] text-zinc-500">
              <span>OUTPUT // application/json</span>
              <span aria-live="polite">
                {visibleDetections.length} DETECTIONS
              </span>
            </div>
            <pre
              aria-label="Simulated JSON inference output"
              className="max-h-52 overflow-auto p-3 font-mono text-[10px] leading-5 text-emerald-100/80"
            >
              <code>{output}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
