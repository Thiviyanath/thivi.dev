"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollEffects() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const sectionLabelRef = useRef<HTMLSpanElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollRange > 0 ? Math.min(1, window.scrollY / scrollRange) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const scheduleProgressUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", scheduleProgressUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleProgressUpdate);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleProgressUpdate);
    resizeObserver?.observe(document.body);

    return () => {
      window.removeEventListener("scroll", scheduleProgressUpdate);
      window.removeEventListener("resize", scheduleProgressUpdate);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-sync]")
    );

    if (
      sections.length === 0 ||
      typeof IntersectionObserver === "undefined"
    ) {
      if (sectionLabelRef.current) {
        sectionLabelRef.current.textContent = "PAGE // READY";
      }
      return;
    }

    if (sectionLabelRef.current) {
      sectionLabelRef.current.textContent = "SECTION // SYNCING";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nearestSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.4) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.4)
          )[0];

        if (nearestSection && sectionLabelRef.current) {
          const label =
            nearestSection.target.getAttribute("data-section-sync") ??
            "PAGE // READY";
          sectionLabelRef.current.textContent = `SECTION // ${label}`;
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 bg-white/10"
      >
        <div
          ref={progressRef}
          className="h-full origin-left bg-accent transition-[transform] duration-75 ease-out"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-2 font-mono text-[10px] tracking-wide text-zinc-500 shadow-lg shadow-black/20 backdrop-blur md:flex"
      >
        <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        <span ref={sectionLabelRef}>SECTION // READY</span>
      </div>
    </>
  );
}
