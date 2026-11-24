"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ScanSearch, ShieldCheck, Terminal } from "lucide-react";
import { AIPatchSimulator } from "./AIPatchSimulator";
import { InferenceVisualizer } from "./InferenceVisualizer";
import { InteractiveCLI } from "./InteractiveCLI";

const DEMOS = [
  { id: "patch", label: "Patch inspector", icon: ShieldCheck },
  { id: "vision", label: "Vision pipeline", icon: ScanSearch },
  { id: "cli", label: "Developer CLI", icon: Terminal },
] as const;

type DemoId = (typeof DEMOS)[number]["id"];

function DemoPanel({ activeDemo }: { activeDemo: DemoId }) {
  switch (activeDemo) {
    case "vision":
      return <InferenceVisualizer />;
    case "cli":
      return <InteractiveCLI />;
    case "patch":
      return <AIPatchSimulator />;
  }
}

export default function LiveDemoTabs() {
  const [activeDemo, setActiveDemo] = useState<DemoId>("patch");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = DEMOS.findIndex((demo) => demo.id === activeDemo);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % DEMOS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + DEMOS.length) % DEMOS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = DEMOS.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextDemo = DEMOS[nextIndex];
      setActiveDemo(nextDemo.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        aria-label="Interactive engineering demos"
        onKeyDown={handleKeyDown}
        className="flex flex-wrap gap-2"
      >
        {DEMOS.map((demo, index) => {
          const Icon = demo.icon;
          const selected = demo.id === activeDemo;
          return (
            <button
              key={demo.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`live-demo-tab-${demo.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`live-demo-panel-${demo.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveDemo(demo.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm transition-colors focus-visible:outline-offset-2 ${
                selected
                  ? "border-accent/35 bg-accent/10 text-accent"
                  : "border-line bg-surface/70 text-zinc-400 hover:border-white/20 hover:text-zinc-100"
              }`}
            >
              <Icon aria-hidden="true" className="size-4" />
              {demo.label}
            </button>
          );
        })}
      </div>

      {DEMOS.map((demo) => {
        const selected = demo.id === activeDemo;
        return (
          <div
            key={demo.id}
            id={`live-demo-panel-${demo.id}`}
            role="tabpanel"
            aria-labelledby={`live-demo-tab-${demo.id}`}
            tabIndex={selected ? 0 : -1}
            hidden={!selected}
            className="rounded-2xl focus-visible:outline-offset-4"
          >
            <DemoPanel activeDemo={demo.id} />
          </div>
        );
      })}
    </div>
  );
}
