"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const STAR = "M12 0 L13 11 L24 12 L13 13 L12 24 L11 13 L0 12 L11 11 Z";

function Star({ show, reduce, className }: { show: boolean; reduce: boolean | null; className: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={cn("absolute top-1/2 size-7 -mt-3.5 fill-accent", className)}
      initial={reduce ? false : { scale: 0, rotate: -90, opacity: 0 }}
      animate={show ? { scale: 1, rotate: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.8, ease: ease.out, delay: 1 }}
    >
      <path d={STAR} className="origin-center animate-pulse [animation-duration:3s]" />
    </motion.svg>
  );
}

export function SparkleDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const show = !!reduce || inView;

  return (
    <div ref={ref} aria-hidden className={cn("relative h-7", className)}>
      <motion.span
        className="absolute inset-x-3.5 top-1/2 h-px origin-center bg-linear-to-r from-accent/30 via-accent/60 to-accent/30"
        initial={reduce ? false : { scaleX: 0 }}
        animate={show ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.4, ease: ease.inOut }}
      />
      <Star show={show} reduce={reduce} className="left-0" />
      <Star show={show} reduce={reduce} className="right-0" />
    </div>
  );
}