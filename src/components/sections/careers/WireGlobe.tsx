"use client";
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

const C = 500; // centre of the 1000×1000 canvas
const R = 440; // radius
const N = 26;  // number of orbit lines

// Deterministic "random" great circles, so server and browser render identically
const rings = Array.from({ length: N }, (_, i) => ({
  ry: Math.max(18, Math.round(R * Math.abs(Math.cos(i * 0.53 + 0.2)))),
  rot: (i * 37) % 180,
}));

export function WireGlobe({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const gradientId = `globe-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg viewBox="0 0 1000 1000" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c4562a" />
          <stop offset="1" stopColor="#ebb811" />
        </linearGradient>
      </defs>

      <g
        className={reduce ? undefined : "animate-[spin_140s_linear_infinite]"}
        style={{ transformOrigin: `${C}px ${C}px` }}
      >
        {rings.map((r, i) => (
          <motion.ellipse
            key={i}
            cx={C}
            cy={C}
            rx={R}
            ry={r.ry}
            transform={`rotate(${r.rot} ${C} ${C})`}
            stroke={`url(#${gradientId})`}
            strokeWidth={1}
            strokeOpacity={0.45}
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: ease.inOut, delay: 0.2 + i * 0.04 }}
          />
        ))}
      </g>
    </svg>
  );
}