"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Props = { children: React.ReactNode; speed?: number; className?: string };

export function Float({ children, speed = 40, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div className="relative" style={isDesktop && !reduce ? { y } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}