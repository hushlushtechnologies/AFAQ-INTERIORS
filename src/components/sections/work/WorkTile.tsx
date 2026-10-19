 "use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Corner = "tl" | "tr" | "br" | "bl";

// Radius = half a row height, so every curve is a true half-circle at any screen size
const cornerClass: Record<Corner, string> = {
  tl: "rounded-tl-[calc(var(--row)/2)]",
  tr: "rounded-tr-[calc(var(--row)/2)]",
  br: "rounded-br-[calc(var(--row)/2)]",
  bl: "rounded-bl-[calc(var(--row)/2)]",
};

type Props = {
  corners: Corner[];
  className?: string;
  delay?: number;
  image?: { src: string; alt: string };
  sizes?: string;
  color?: string;               // e.g. "bg-gold" for solid shapes
  circle?: "left" | "right";    // terracotta circle that rolls across on scroll
};

export function WorkTile({
  corners,
  className,
  delay = 0,
  image,
  sizes = "(min-width: 1024px) 22vw, 50vw",
  color,
  circle,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const show = reduce || inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Circle travels a full diameter each way, smoothed with a spring
  const circleTravel = useTransform(
    scrollYProgress,
    [0, 1],
    circle === "left" ? [-100, 100] : [100, -100], // % of the circle's own width
  );
  const circleSpring = useSpring(circleTravel, { stiffness: 70, damping: 22, mass: 0.6 });
  const circleX = useTransform(circleSpring, (v) => `${v}%`);
  // Gentle breathing: slightly smaller at the edges of the scroll, full size in the middle
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={cn(
          "group relative isolate h-full w-full overflow-hidden",
          corners.map((c) => cornerClass[c]),
          color,
        )}
        initial={reduce ? false : { opacity: 0, y: 60, scale: 0.94 }}
        animate={show ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1.1, ease: ease.out, delay }}
      >
        {image && (
          <motion.div
            className="absolute inset-x-0 -top-[10%] h-[120%]"
            style={reduce ? undefined : { y: imageY }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </motion.div>
        )}

        {circle && (
          <motion.div
            aria-hidden
            className={cn(
              "absolute top-0 aspect-square h-full rounded-full bg-terracotta",
              circle === "left" ? "left-0" : "right-0",
            )}
            // Scroll controls position + size; the entrance is a simple fade
            style={reduce ? undefined : { x: circleX, scale: circleScale }}
            initial={reduce ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, ease: ease.out, delay: delay + 0.4 }}
          />
        )}
      </motion.div>
    </div>
  );
}