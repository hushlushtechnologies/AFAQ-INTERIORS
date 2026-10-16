import type { Variants, Transition } from "motion/react";

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,      // smooth premium ease-out
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = { fast: 0.4, base: 0.8, slow: 1.2 };

export const baseTransition: Transition = { duration: duration.base, ease: ease.out };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});