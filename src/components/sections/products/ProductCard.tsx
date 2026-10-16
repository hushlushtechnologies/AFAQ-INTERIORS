"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/content/products";

type Props = {
  product: Product;
  index: number;
  total: number;
  delay?: number;
  sizes: string;
  className?: string;   // grid placement
  aspect: string;       // aspect-ratio classes
};

export function ProductCard({ product, index, total, delay = 0, sizes, className, aspect }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const show = reduce || inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 50 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: ease.out, delay }}
    >
      <Link
        ref={ref}
        href={`/products/${product.slug}`}
        className={cn("group relative isolate block overflow-hidden", aspect)}
      >
        {/* Photo: parallax drift, reveal zoom, hover zoom */}
        <motion.div
          className="absolute inset-x-0 -top-[8%] h-[116%]"
          style={reduce ? undefined : { y: imageY }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.15 }}
            animate={show ? { scale: 1 } : undefined}
            transition={{ duration: 1.6, ease: ease.out, delay }}
          >
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
          </motion.div>
        </motion.div>

        {/* Tint for readable text */}
        <div aria-hidden className="absolute inset-0 bg-black/35 transition-colors duration-700 group-hover:bg-black/45" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {/* Arrow */}
        <span
          aria-hidden
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-transparent text-white transition-colors duration-500 group-hover:border-accent group-hover:bg-accent lg:right-5 lg:top-5"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-[1.5] transition-transform duration-500 group-hover:rotate-45"
          >
            <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white lg:p-7">
          <div aria-hidden className="mb-6 flex gap-2">
            {Array.from({ length: total }).map((_, di) =>
              di === index ? (
                <motion.span
                  key={di}
                  className="size-2 rounded-full bg-accent"
                  initial={reduce ? false : { scale: 0 }}
                  animate={show ? { scale: 1 } : undefined}
                  transition={{ duration: 0.5, ease: ease.out, delay: delay + 0.6 }}
                />
              ) : (
                <span key={di} className="size-2 rounded-full bg-cream/90" />
              ),
            )}
          </div>

          <h3 className="font-display text-2xl transition-transform duration-500 group-hover:-translate-y-1 xl:text-[26px]">
            {product.title}
          </h3>
          <p className="mt-2 max-w-[540px] text-[15px] leading-snug text-white/90 transition-colors duration-500 group-hover:text-white">
            {product.text}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}