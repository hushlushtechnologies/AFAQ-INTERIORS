"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

type Props = { lines: readonly string[]; className?: string };

export function WriteOn({ lines, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const show = reduce || inView;

  return (
    <p ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={line}
          className="block"
          // Negative insets leave room for script swashes and descenders
          initial={reduce ? false : { clipPath: "inset(-20% 100% -20% 0%)" }}
          animate={show ? { clipPath: "inset(-20% -5% -20% 0%)" } : undefined}
          transition={{ duration: 1.4, ease: ease.inOut, delay: i * 0.5 }}
        >
          {line}
        </motion.span>
      ))}
    </p>
  );
}