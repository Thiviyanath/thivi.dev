"use client";

import React, { useEffect, useRef } from "react";

type Vec3 = {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
};

export default function Live3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let prefersReducedMotion = motionPreference.matches;

    let animationId = 0;
    let width = window.innerWidth || 1280;
    let height = window.innerHeight || 800;

    // Normalized pointer (-1 to 1) for gentle 3D camera parallax
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    // Build a 3D lattice / point cloud in object space (-1 to 1)
    const COLS = 7;
    const ROWS = 5;
    const LAYERS = 3;
    const spacingX = 0.42;
    const spacingY = 0.42;
    const spacingZ = 0.55;

    const points: Vec3[] = [];
    for (let ix = 0; ix < COLS; ix++) {
      for (let iy = 0; iy < ROWS; iy++) {
        for (let iz = 0; iz < LAYERS; iz++) {
          const bx = (ix - (COLS - 1) / 2) * spacingX;
          const by = (iy - (ROWS - 1) / 2) * spacingY;
          const bz = (iz - (LAYERS - 1) / 2) * spacingZ;
          points.push({
            x: bx,
            y: by,
            z: bz,
            baseX: bx,
            baseY: by,
            baseZ: bz,
            phase: (ix + iy + iz) * 0.65,
          });
        }
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth || window.innerWidth;
      height = canvas.offsetHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rotate3D = (
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number
    ) => {
      // Rotate around Y axis
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // Rotate around X axis
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    };

    const project = (x: number, y: number, z: number) => {
      const fov = 2.6;
      const cameraDist = 3.4;
      const depth = cameraDist + z;
      const safeDepth = Math.max(0.4, depth);
      const scale = (fov / safeDepth) * Math.min(width, height) * 0.42;
      return {
        sx: width * 0.5 + x * scale,
        sy: height * 0.5 + y * scale,
        scale: fov / safeDepth,
        depth: safeDepth,
      };
    };

    let t = 0;

    const render = () => {
      animationId = 0;

      if (!prefersReducedMotion) {
        t += 0.008;
      }

      // Smoothly ease camera tilt toward pointer
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltY += (targetTiltY - tiltY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const rotY = t * 0.45 + tiltX * 0.55;
      const rotX = Math.sin(t * 0.35) * 0.14 - tiltY * 0.45;

      const projected: Array<{
        sx: number;
        sy: number;
        scale: number;
        depth: number;
        ix: number;
        iy: number;
        iz: number;
      }> = [];

      let idx = 0;
      for (let ix = 0; ix < COLS; ix++) {
        for (let iy = 0; iy < ROWS; iy++) {
          for (let iz = 0; iz < LAYERS; iz++) {
            const p = points[idx++];
            const wave = prefersReducedMotion
              ? 0
              : Math.sin(t * 1.4 + p.phase) * 0.045;

            const rot = rotate3D(
              p.baseX + wave * 0.5,
              p.baseY + wave,
              p.baseZ - wave * 0.5,
              rotX,
              rotY
            );
            const pr = project(rot.x, rot.y, rot.z);
            projected.push({ ...pr, ix, iy, iz });
          }
        }
      }

      // Connect adjacent grid neighbors in 3D for subtle wireframe depth
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          const manhattan =
            Math.abs(a.ix - b.ix) +
            Math.abs(a.iy - b.iy) +
            Math.abs(a.iz - b.iz);

          if (manhattan === 1) {
            const avgScale = (a.scale + b.scale) * 0.5;
            const alpha = Math.max(0.03, Math.min(0.18, avgScale * 0.11));
            ctx.strokeStyle = `rgba(52, 211, 153, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      // Draw depth-scaled 3D nodes
      for (const pt of projected) {
        const radius = Math.max(1.2, Math.min(3.4, pt.scale * 1.65));
        const alpha = Math.max(0.15, Math.min(0.65, pt.scale * 0.36));
        ctx.fillStyle = `rgba(52, 211, 153, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      scheduleRender();
    };

    const scheduleRender = () => {
      if (
        !prefersReducedMotion &&
        !document.hidden &&
        animationId === 0
      ) {
        animationId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || width <= 0 || height <= 0) return;
      targetTiltX = (e.clientX / width) * 2 - 1;
      targetTiltY = (e.clientY / height) * 2 - 1;
    };

    const handlePointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    const handlePointerOut = (e: PointerEvent) => {
      if (e.relatedTarget === null) handlePointerLeave();
    };

    const handleResize = () => {
      resize();
      if (prefersReducedMotion) render();
    };

    const handleMotionPreferenceChange = () => {
      prefersReducedMotion = motionPreference.matches;
      if (prefersReducedMotion) {
        targetTiltX = 0;
        targetTiltY = 0;
        tiltX = 0;
        tiltY = 0;
        cancelAnimationFrame(animationId);
        animationId = 0;
        render();
      } else {
        scheduleRender();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      } else {
        scheduleRender();
      }
    };

    resize();
    render();

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-50"
    />
  );
}