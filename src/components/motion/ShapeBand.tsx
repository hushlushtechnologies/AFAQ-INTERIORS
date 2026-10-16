"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Corner = "tl" | "tr" | "br" | "bl";
export type BandShape = { left: number; width: number; corners: Corner[]; tone: string }; // left/width in vw

// Band height is 21.5vw, so a 10.75vw radius = perfect half-circle ends
const radius: Record<Corner, string> = {
  tl: "rounded-tl-[10.75vw]",
  tr: "rounded-tr-[10.75vw]",
  br: "rounded-br-[10.75vw]",
  bl: "rounded-bl-[10.75vw]",
};

type Props = {
  shapes: BandShape[];
  direction?: "left" | "right";
  letters?: string;
  className?: string;
};

export function ShapeBand({ shapes, direction = "left", letters, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const toLeft = direction === "left";
  const x = useTransform(scrollYProgress, [0, 1], toLeft ? ["8vw", "-8vw"] : ["-8vw", "8vw"]);
  const lettersX = useTransform(scrollYProgress, [0, 1], toLeft ? ["-4vw", "4vw"] : ["4vw", "-4vw"]);

  return (
    <div ref={ref} aria-hidden className={cn("relative h-[21.5vw]", className)}>
      {letters && (
        <motion.p
          className="absolute bottom-0 left-0 select-none whitespace-nowrap font-sans text-[29vw] font-bold leading-[0.74] tracking-tight text-[#e2dcd3]"
          style={reduce ? undefined : { x: lettersX }}
        >
          {letters}
        </motion.p>
      )}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { x }}>
        {shapes.map((s, i) => (
          <div
            key={i}
            className={cn("absolute inset-y-0", s.tone, s.corners.map((c) => radius[c]))}
            style={{ left: `${s.left}vw`, width: `${s.width}vw` }}
          />
        ))}
      </motion.div>
    </div>
  );
}