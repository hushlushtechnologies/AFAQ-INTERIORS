 "use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

const CLOSED = "inset(0% 0% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";

export function MapEmbed({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const show = reduce || inView;

  return (
    // Outer box: never clipped, gives the map its size and is what we watch
    <div ref={ref} className="relative aspect-[4/3] w-full bg-[#e8e2d9] md:aspect-[1280/381]">
      {/* Inner layer: does the curtain reveal */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: reduce ? OPEN : CLOSED }}
        animate={{ clipPath: show ? OPEN : CLOSED }}
        transition={{ duration: 1.4, ease: ease.inOut }}
      >
        <iframe
          title={title}
          src={src}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] sepia-[0.15] transition-[filter] duration-700 hover:grayscale-0 hover:sepia-0"
        />
      </motion.div>
    </div>
  );
}