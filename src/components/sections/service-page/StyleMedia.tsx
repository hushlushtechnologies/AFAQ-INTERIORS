"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import type { DesignStyle } from "@/content/service-pages";
import { StepDots } from "@/components/motion/StepDots";

type Props = { style: DesignStyle; index: number; total: number; delay?: number };

export function StyleBanner({ style, index, total }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show = reduce || inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const img = style.images[0];

  return (
    <div ref={ref} className="relative aspect-[4/3] md:aspect-[1280/395]">
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(10% 30% 10% 30%)" }}
        animate={{ clipPath: show ? "inset(0% 0% 0% 0%)" : "inset(10% 30% 10% 30%)" }}
        transition={{ duration: 1.4, ease: ease.inOut }}
      >
        <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={reduce ? undefined : { y: imageY }}>
          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-black/40" />

        <motion.div
          className="absolute inset-0 grid place-items-center px-6 text-center text-white"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: ease.out, delay: 0.7 }}
        >
          <div>
            <StepDots total={total} active={index} inactiveClassName="bg-white" className="justify-center" delay={0.9} />
            <h3 className="mt-4 font-display text-2xl text-gold xl:text-[30px]">{style.title}</h3>
            {/* <p className="mt-1 text-base">{style.subtitle}</p> */}
                        {style.subtitle && <p className="mx-auto mt-1 max-w-[320px] text-base leading-snug">{style.subtitle}</p>}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function StyleCard({ style, index, total, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const show = reduce || inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const img = style.images[0];

  return (
    <div ref={ref}>
      <motion.div
        className="group relative isolate aspect-[308/354] overflow-hidden"
        initial={reduce ? false : { opacity: 0, y: 50 }}
        animate={show ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1, ease: ease.out, delay }}
      >
        <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={reduce ? undefined : { y: imageY }}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 310px, 50vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <StepDots total={total} active={index} inactiveClassName="bg-white" delay={delay + 0.4} />
          <h3 className="mt-3 font-display text-xl text-gold transition-transform duration-500 group-hover:-translate-y-1 xl:text-[26px]">
            {style.title}
          </h3>
               {style.subtitle && <p className="mt-1 text-sm xl:text-[15px]">{style.subtitle}</p>}
        </div>
      </motion.div>
    </div>
  );
}