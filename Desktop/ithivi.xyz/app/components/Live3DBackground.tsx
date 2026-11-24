"use client";

import { useEffect, useRef } from "react";

type Point3 = { x: number; y: number; z: number };
type ProjectedPoint = Point3 & {
  screenX: number;
  screenY: number;
  depth: number;
  scale: number;
};
type Edge = [number, number];

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const ICOSAHEDRON_VERTICES: Point3[] = [
  [-1, GOLDEN_RATIO, 0],
  [1, GOLDEN_RATIO, 0],
  [-1, -GOLDEN_RATIO, 0],
  [1, -GOLDEN_RATIO, 0],
  [0, -1, GOLDEN_RATIO],
  [0, 1, GOLDEN_RATIO],
  [0, -1, -GOLDEN_RATIO],
  [0, 1, -GOLDEN_RATIO],
  [GOLDEN_RATIO, 0, -1],
  [GOLDEN_RATIO, 0, 1],
  [-GOLDEN_RATIO, 0, -1],
  [-GOLDEN_RATIO, 0, 1],
].map(([x, y, z]) => {
  const length = Math.hypot(x, y, z);
  return { x: x / length, y: y / length, z: z / length };
});

const ICOSAHEDRON_FACES: Array<[number, number, number]> = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

function edgesFromFaces(faces: Array<[number, number, number]>): Edge[] {
  const edges = new Map<string, Edge>();

  for (const [a, b, c] of faces) {
    for (const [start, end] of [[a, b], [b, c], [c, a]]) {
      const key = `${Math.min(start, end)}:${Math.max(start, end)}`;
      edges.set(key, [start, end]);
    }
  }

  return Array.from(edges.values());
}

const ICOSAHEDRON_EDGES = edgesFromFaces(ICOSAHEDRON_FACES);
const OCTAHEDRON_VERTICES: Point3[] = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
];
const OCTAHEDRON_EDGES: Edge[] = [];

for (let start = 0; start < OCTAHEDRON_VERTICES.length; start++) {
  for (let end = start + 1; end < OCTAHEDRON_VERTICES.length; end++) {
    const a = OCTAHEDRON_VERTICES[start];
    const b = OCTAHEDRON_VERTICES[end];
    if (a.x * b.x + a.y * b.y + a.z * b.z === 0) {
      OCTAHEDRON_EDGES.push([start, end]);
    }
  }
}

export default function Live3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let prefersReducedMotion = motionPreference.matches;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let elapsed = 0;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const updateScrollProgress = () => {
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress =
        scrollRange > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollRange))
          : 0;
    };

    const rotatePoint = (
      point: Point3,
      rotateX: number,
      rotateY: number,
      rotateZ: number
    ): Point3 => {
      const cosY = Math.cos(rotateY);
      const sinY = Math.sin(rotateY);
      const x1 = point.x * cosY + point.z * sinY;
      const z1 = -point.x * sinY + point.z * cosY;

      const cosX = Math.cos(rotateX);
      const sinX = Math.sin(rotateX);
      const y2 = point.y * cosX - z1 * sinX;
      const z2 = point.y * sinX + z1 * cosX;

      const cosZ = Math.cos(rotateZ);
      const sinZ = Math.sin(rotateZ);
      return {
        x: x1 * cosZ - y2 * sinZ,
        y: x1 * sinZ + y2 * cosZ,
        z: z2,
      };
    };

    const render = () => {
      animationFrame = 0;
      if (width <= 0 || height <= 0) return;

      if (!prefersReducedMotion) {
        elapsed += 0.006;
        pointerX += (targetPointerX - pointerX) * 0.035;
        pointerY += (targetPointerY - pointerY) * 0.035;
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.075;
      }

      context.clearRect(0, 0, width, height);

      const compact = width < 720;
      const centerX = width * (compact ? 0.8 : 0.77);
      const centerY = height * (0.5 + scrollProgress * 0.12);
      const radius =
        Math.min(width, height) * 0.22 * (1 + scrollProgress * 0.18);
      const cameraDistance = 3.35;
      const focalLength = 2.8;
      const rotateY =
        elapsed * 0.16 + scrollProgress * Math.PI * 1.25 + pointerX * 0.24;
      const rotateX =
        Math.sin(elapsed * 0.12) * 0.09 +
        scrollProgress * 0.5 -
        pointerY * 0.27;
      const rotateZ = scrollProgress * 0.16 + pointerX * 0.08;

      const project = (point: Point3): ProjectedPoint => {
        const depth = Math.max(1.45, cameraDistance - point.z);
        const scale = (focalLength / depth) * radius;
        return {
          ...point,
          screenX: centerX + point.x * scale,
          screenY: centerY + point.y * scale,
          depth,
          scale,
        };
      };

      const transformVertices = (
        vertices: Point3[],
        objectScale = 1
      ): ProjectedPoint[] =>
        vertices.map((vertex) => {
          const rotated = rotatePoint(
            {
              x: vertex.x * objectScale,
              y: vertex.y * objectScale,
              z: vertex.z * objectScale,
            },
            rotateX,
            rotateY,
            rotateZ
          );
          return project(rotated);
        });

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * 1.7
      );
      glow.addColorStop(0, "rgba(16, 185, 129, 0.08)");
      glow.addColorStop(1, "rgba(16, 185, 129, 0)");
      context.fillStyle = glow;
      context.fillRect(
        centerX - radius * 1.7,
        centerY - radius * 1.7,
        radius * 3.4,
        radius * 3.4
      );

      const projectOrbit = (plane: "xy" | "xz", orbitRadius: number) => {
        const points: ProjectedPoint[] = [];
        const segments = 72;
        for (let index = 0; index <= segments; index++) {
          const angle = (index / segments) * Math.PI * 2;
          const orbitPoint =
            plane === "xy"
              ? {
                  x: Math.cos(angle) * orbitRadius,
                  y: Math.sin(angle) * orbitRadius,
                  z: 0,
                }
              : {
                  x: Math.cos(angle) * orbitRadius,
                  y: 0,
                  z: Math.sin(angle) * orbitRadius,
                };
          points.push(project(rotatePoint(orbitPoint, rotateX, rotateY, rotateZ)));
        }

        context.beginPath();
        points.forEach((point, index) => {
          if (index === 0) context.moveTo(point.screenX, point.screenY);
          else context.lineTo(point.screenX, point.screenY);
        });
        context.strokeStyle = "rgba(52, 211, 153, 0.1)";
        context.lineWidth = 0.8;
        context.stroke();
      };

      projectOrbit("xy", 1.3);
      projectOrbit("xz", 1.18);

      const drawAxes = () => {
        const axes: Point3[] = [
          { x: 1.45, y: 0, z: 0 },
          { x: 0, y: 1.45, z: 0 },
          { x: 0, y: 0, z: 1.45 },
        ];
        const colors = [
          "rgba(52, 211, 153, 0.14)",
          "rgba(52, 211, 153, 0.11)",
          "rgba(52, 211, 153, 0.1)",
        ];

        axes.forEach((axis, axisIndex) => {
          const start = project(
            rotatePoint(
              { x: -axis.x, y: -axis.y, z: -axis.z },
              rotateX,
              rotateY,
              rotateZ
            )
          );
          const end = project(
            rotatePoint(axis, rotateX, rotateY, rotateZ)
          );
          const dx = end.screenX - start.screenX;
          const dy = end.screenY - start.screenY;
          const length = Math.hypot(dx, dy) || 1;
          const normalX = -dy / length;
          const normalY = dx / length;

          context.strokeStyle = colors[axisIndex];
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(start.screenX, start.screenY);
          context.lineTo(end.screenX, end.screenY);
          context.stroke();

          for (const tick of [-1, -0.5, 0.5, 1]) {
            const point = project(
              rotatePoint(
                {
                  x: axis.x * tick,
                  y: axis.y * tick,
                  z: axis.z * tick,
                },
                rotateX,
                rotateY,
                rotateZ
              )
            );
            context.beginPath();
            context.moveTo(
              point.screenX - normalX * 2.5,
              point.screenY - normalY * 2.5
            );
            context.lineTo(
              point.screenX + normalX * 2.5,
              point.screenY + normalY * 2.5
            );
            context.stroke();
          }
        });
      };

      drawAxes();

      const drawEdges = (
        vertices: ProjectedPoint[],
        edges: Edge[],
        phaseOffset: number
      ) => {
        const orderedEdges = edges
          .map(([start, end], index) => ({
            start: vertices[start],
            end: vertices[end],
            phase: index * 0.43 + phaseOffset,
            depth: (vertices[start].depth + vertices[end].depth) / 2,
          }))
          .sort((a, b) => b.depth - a.depth);

        for (const edge of orderedEdges) {
          const depth = Math.max(
            0,
            Math.min(1, 1 - (edge.depth - 2.2) / 2.2)
          );
          const pulse =
            0.5 +
            0.5 *
              Math.sin(
                elapsed * 1.1 + edge.phase + scrollProgress * Math.PI * 1.5
              );
          const alpha = (0.045 + depth * 0.12) * (0.45 + pulse * 0.55);
          context.beginPath();
          context.moveTo(edge.start.screenX, edge.start.screenY);
          context.lineTo(edge.end.screenX, edge.end.screenY);
          context.strokeStyle = `rgba(52, 211, 153, ${alpha.toFixed(3)})`;
          context.lineWidth = 0.7 + depth * 0.45;
          context.shadowColor = `rgba(52, 211, 153, ${(alpha * 0.9).toFixed(3)})`;
          context.shadowBlur = 2 + pulse * 4;
          context.stroke();
        }

        context.shadowBlur = 0;
      };

      const outerVertices = transformVertices(ICOSAHEDRON_VERTICES);
      const innerVertices = transformVertices(OCTAHEDRON_VERTICES, 0.52);
      drawEdges(outerVertices, ICOSAHEDRON_EDGES, 0);
      drawEdges(innerVertices, OCTAHEDRON_EDGES, 2.4);

      const nodes = [...outerVertices, ...innerVertices].sort(
        (a, b) => b.depth - a.depth
      );
      for (const node of nodes) {
        const depth = Math.max(
          0,
          Math.min(1, 1 - (node.depth - 2.2) / 2.2)
        );
        const size = 1.1 + depth * 1.5;
        context.beginPath();
        context.arc(node.screenX, node.screenY, size, 0, Math.PI * 2);
        context.fillStyle = `rgba(110, 231, 183, ${(0.16 + depth * 0.4).toFixed(3)})`;
        context.shadowColor = "rgba(52, 211, 153, 0.6)";
        context.shadowBlur = 2 + depth * 5;
        context.fill();
      }
      context.shadowBlur = 0;

      for (let index = 0; index < 3; index++) {
        const angle = elapsed * 0.28 + index * ((Math.PI * 2) / 3);
        const satellite = project(
          rotatePoint(
            {
              x: Math.cos(angle) * 1.38,
              y: Math.sin(angle) * 0.14,
              z: Math.sin(angle) * 1.38,
            },
            rotateX,
            rotateY,
            rotateZ
          )
        );
        context.beginPath();
        context.arc(satellite.screenX, satellite.screenY, 1.7, 0, Math.PI * 2);
        context.fillStyle = "rgba(167, 243, 208, 0.65)";
        context.fill();
      }

      if (!prefersReducedMotion && !document.hidden) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const scheduleRender = () => {
      if (!prefersReducedMotion && !document.hidden && animationFrame === 0) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion || width === 0 || height === 0) return;
      targetPointerX = (event.clientX / width) * 2 - 1;
      targetPointerY = (event.clientY / height) * 2 - 1;
    };

    const resetPointer = () => {
      targetPointerX = 0;
      targetPointerY = 0;
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) resetPointer();
    };

    const handleMotionChange = () => {
      prefersReducedMotion = motionPreference.matches;
      if (prefersReducedMotion) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        elapsed = 0;
        pointerX = 0;
        pointerY = 0;
        targetPointerX = 0;
        targetPointerY = 0;
        scrollProgress = targetScrollProgress;
        render();
      } else {
        scheduleRender();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        scheduleRender();
      }
    };

    const handleResize = () => {
      resize();
      if (prefersReducedMotion) render();
      updateScrollProgress();
    };

    resize();
    updateScrollProgress();
    render();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", resetPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
