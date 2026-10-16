"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

type Props = { className?: string; lineClassName?: string };

export function ScrollLine({ className, lineClassName = "bg-terracotta/40" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.85"] });

  return (
    <div ref={ref} aria-hidden className={className}>
      <motion.div
        className={cn("h-full w-full origin-top", lineClassName)}
        style={reduce ? undefined : { scaleY: scrollYProgress }}
      />
    </div>
  );
}