"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Props = {
  src: string;
  width: number;
  height: number;
  letters?: string;
};

export function FooterBackdrop({ src, width, height, letters = "AFAQ" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const shapesY = useTransform(scrollYProgress, [0, 1], ["6%", "0%"]);
  const shapesScale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);
  const lettersY = useTransform(scrollYProgress, [0, 1], ["35%", "12%"]); // rises into place

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Rounded shapes */}
      <motion.div
        className="absolute inset-x-0 bottom-0 origin-bottom"
        style={reduce ? undefined : { y: shapesY, scale: shapesScale }}
      >
        <Image src={src} alt="" width={width} height={height} sizes="100vw" className="h-auto w-full" />
      </motion.div>

      {/* Giant "AFAQ" overlay along the bottom */}
      <motion.p
        className="absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center font-sans text-[31vw] font-bold leading-[0.8] tracking-[-0.02em] text-ink/[0.045]"
        style={reduce ? { y: "12%" } : { y: lettersY }}
      >
        {letters}
      </motion.p>
    </div>
  );
}