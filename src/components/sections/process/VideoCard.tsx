"use client";
import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { FADE_BOTTOM } from "@/components/motion/ParallaxImage";
import { VideoLightbox } from "@/components/ui/VideoLightbox";

type Props = {
  poster: string;
  video: string;
  title: string;
  alt: string;
  speed?: number;
  aspect?: string;
  className?: string;
};

export function VideoCard({ poster, video, title, alt, speed = 60, aspect = "aspect-[494/570]", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={isDesktop && !reduce ? { y } : undefined}>
        <div className="group relative">
          <ImageReveal
            src={poster}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 494px, (min-width: 768px) 50vw, 100vw"
            wrapperClassName={cn(aspect, FADE_BOTTOM)}
            className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 grid cursor-pointer place-items-center"
          >
            <span className="relative grid size-16 place-items-center rounded-full bg-terracotta text-white shadow-lg transition-transform duration-500 group-hover:scale-110 md:size-[72px]">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-terracotta/40 [animation-duration:2.4s]" />
              <svg viewBox="0 0 24 24" className="relative ml-1 size-6 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </div>
      </motion.div>

      <VideoLightbox open={open} onClose={close} src={video} title={title} />
    </div>
  );
}