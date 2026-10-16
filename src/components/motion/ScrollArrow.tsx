 "use client";
import { useId, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export type ArrowShape = {
  d: string;
  head: string;
  viewBox: string;
  dot?: { cx: number; cy: number };
};

export function ScrollArrow({ d, head, viewBox, dot, className }: ArrowShape & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null); // ← was SVGSVGElement
  const reduce = useReducedMotion();
  const maskId = `arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.5"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);
  const headOpacity = useTransform(scrollYProgress, [0.85, 1], [reduce ? 1 : 0, 1]);

  return (
    // ← NEW wrapper: holds the ref and the positioning classes
    <div ref={ref} aria-hidden className={className}>
      <svg viewBox={viewBox} fill="none" className="block h-auto w-full overflow-visible">
        <defs>
          <mask id={maskId} x="-20%" y="-20%" width="140%" height="140%">
            <motion.path d={d} stroke="white" strokeWidth={6} style={{ pathLength }} />
          </mask>
        </defs>
        {dot && <circle cx={dot.cx} cy={dot.cy} r={3} fill="var(--color-accent)" />}
        <path
          d={d}
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          strokeDasharray="4 5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          mask={`url(#${maskId})`}
        />
        <motion.path d={head} fill="var(--color-accent)" style={{ opacity: headOpacity }} />
      </svg>
    </div>
  );
}