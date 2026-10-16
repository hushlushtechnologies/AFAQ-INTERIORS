"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  imageClassName?: string;
  overlayClassName?: string;
};

export function BlueprintBackdrop({
  src,
  imageClassName = "opacity-70",
  overlayClassName = "bg-linear-to-r from-background via-background/70 to-transparent",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute -inset-[8%]" style={reduce ? undefined : { y, rotate }}>
        <Image src={src} alt="" fill sizes="100vw" className={cn("object-cover", imageClassName)} />
      </motion.div>
      <div className={cn("absolute inset-0", overlayClassName)} />
    </div>
  );
}