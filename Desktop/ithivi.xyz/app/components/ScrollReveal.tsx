"use client";

import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
  sectionLabel?: string;
  tilt?: boolean;
};

export default function ScrollReveal({
  children,
  delayMs = 0,
  className = "",
  sectionLabel,
  tilt = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-scroll-reveal", "visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );

    el.setAttribute("data-scroll-reveal", "pending");
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeAttribute("data-scroll-reveal");
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = tiltRef.current;
    if (
      !tilt ||
      !element ||
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) return;

    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    element.style.setProperty(
      "--tilt-x",
      `${((0.5 - relativeY) * 4).toFixed(2)}deg`
    );
    element.style.setProperty(
      "--tilt-y",
      `${((relativeX - 0.5) * 4).toFixed(2)}deg`
    );
  };

  const resetTilt = () => {
    tiltRef.current?.style.setProperty("--tilt-x", "0deg");
    tiltRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={className}
      data-section-sync={sectionLabel}
      onPointerMove={tilt ? handlePointerMove : undefined}
      onPointerLeave={tilt ? resetTilt : undefined}
    >
      {tilt ? (
        <div
          ref={tiltRef}
          data-scroll-tilt="true"
          className="h-full"
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}