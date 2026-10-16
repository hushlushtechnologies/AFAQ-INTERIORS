"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function FooterBackdrop({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // 0 when the footer starts entering, 1 when the page bottom is reached
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 origin-bottom" style={reduce ? undefined : { y, scale }}>
        <Image src={src} alt="" fill sizes="100vw" className="object-cover object-top" />
      </motion.div>
    </div>
  );
}