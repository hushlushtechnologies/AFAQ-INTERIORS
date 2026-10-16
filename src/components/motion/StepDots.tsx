"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  total: number;
  active: number;
  delay?: number;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
};

export function StepDots({
  total,
  active,
  delay = 0,
  className,
  activeClassName = "bg-terracotta",
  inactiveClassName = "bg-terracotta/25",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 1 });
  const show = reduce || inView;

  return (
    <div ref={ref} aria-hidden className={cn("flex gap-1.5", className)}>
      {Array.from({ length: total }).map((_, i) =>
        i === active ? (
          <motion.span
            key={i}
            className={cn("size-2 rounded-full", activeClassName)}
            initial={reduce ? false : { scale: 0 }}
            animate={show ? { scale: 1 } : undefined}
            transition={{ duration: 0.5, ease: ease.out, delay }}
          />
        ) : (
          <span key={i} className={cn("size-2 rounded-full", inactiveClassName)} />
        ),
      )}
    </div>
  );
}