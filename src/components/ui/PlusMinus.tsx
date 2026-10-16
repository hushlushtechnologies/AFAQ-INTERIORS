"use client";
import { motion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = { open: boolean; closedClass?: string; openClass?: string; className?: string };

export function PlusMinus({ open, closedClass = "bg-cream", openClass = "bg-accent", className }: Props) {
  const bar = cn("absolute transition-colors duration-500", open ? openClass : closedClass);
  return (
    <span aria-hidden className={cn("relative block size-8 shrink-0 md:size-9", className)}>
      <span className={cn(bar, "inset-x-0 top-[calc(50%-1px)] h-0.5")} />
      <motion.span
        className={cn(bar, "inset-y-0 left-[calc(50%-1px)] w-0.5")}
        animate={{ rotate: open ? 90 : 0 }}
        transition={{ duration: 0.5, ease: ease.inOut }}
      />
    </span>
  );
}