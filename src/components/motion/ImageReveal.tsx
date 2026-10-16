"use client";
import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = ImageProps & {
  wrapperClassName?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
};

const clipFrom = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};
const clipTo = "inset(0% 0% 0% 0%)";

export function ImageReveal({ wrapperClassName, direction = "up", delay = 0, alt, ...img }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const show = reduce || inView;

  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden", wrapperClassName)}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: reduce ? clipTo : clipFrom[direction] }}
        animate={{ clipPath: show ? clipTo : clipFrom[direction] }}
        transition={{ duration: 1.4, ease: ease.inOut, delay }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.2 }}
          animate={{ scale: show ? 1 : 1.2 }}
          transition={{ duration: 1.8, ease: ease.out, delay }}
        >
          <Image alt={alt} {...img} className={cn("object-cover", img.className)} />
        </motion.div>
      </motion.div>
    </div>
  );
}