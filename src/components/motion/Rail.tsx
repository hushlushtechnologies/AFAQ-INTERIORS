"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Rail({ className, lineClassName = "bg-terracotta/30" }: { className?: string; lineClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const show = reduce || inView;

  return (
    <div ref={ref} aria-hidden className={cn("relative h-px w-full", className)}>
      <motion.div
        className={cn("absolute inset-0 origin-left", lineClassName)}
        initial={reduce ? false : { scaleX: 0 }}
        animate={show ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.4, ease: ease.inOut }}
      />
    </div>
  );
}