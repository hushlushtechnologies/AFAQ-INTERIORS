"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { careers } from "@/content/careers";
import { Container } from "@/components/ui/Container";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { StepDots } from "@/components/motion/StepDots";

type Role = (typeof careers.roles.items)[number];

function RoleCard({ role, index, total, show, reduce }: {
  role: Role; index: number; total: number; show: boolean; reduce: boolean;
}) {
  const delay = (index % 2) * 0.15;
  const rise = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: show ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, ease: ease.out, delay: delay + d },
  });

  return (
    <article className="group flex flex-col border-t border-terracotta/40 pb-12 pt-2 lg:min-h-[320px] lg:border-0 lg:pb-0 lg:pr-12">
      <StepDots total={total} active={index} delay={delay + 0.2} />

      <motion.h3
        className="mt-5 font-display text-2xl text-terracotta transition-transform duration-500 group-hover:translate-x-1.5 xl:text-[30px]"
        {...rise(0.3)}
      >
        {role.title}
      </motion.h3>

      <motion.p
        className="mt-8 max-w-[540px] text-lg leading-snug md:text-[22px] lg:mt-auto"
        {...rise(0.45)}
      >
        {role.text}
      </motion.p>

      <motion.div className="mt-6" {...rise(0.55)}>
        <CopyEmailButton
          email={careers.hero.email}
          label="Copy the Mail to Apply"
          subject={`Application – ${role.title}`}
          variant="outline"
          statusPlacement="inline"
        />
      </motion.div>
    </article>
  );
}

function RoleRow({ roles, startIndex, total, last }: {
  roles: readonly Role[]; startIndex: number; total: number; last: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show = reduce || inView;

  const rail = {
    initial: reduce ? false : { scaleX: 0 },
    animate: show ? { scaleX: 1 } : undefined,
    transition: { duration: 1.2, ease: ease.inOut },
  };

  return (
    <div ref={ref} className="relative">
      <motion.span aria-hidden className="absolute inset-x-0 top-0 hidden h-px origin-left bg-terracotta/40 lg:block" {...rail} />
      {last && (
        <motion.span aria-hidden className="absolute inset-x-0 bottom-0 hidden h-px origin-left bg-terracotta/40 lg:block" {...rail} />
      )}
      <Container>
        <div className="grid lg:grid-cols-2">
          {roles.map((role, j) => (
            <RoleCard
              key={role.title}
              role={role}
              index={startIndex + j}
              total={total}
              show={show}
              reduce={reduce}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export function RolesGrid() {
  const items = careers.roles.items;
  const rows: Role[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));

  return (
    <div>
      {rows.map((row, r) => (
        <RoleRow
          key={r}
          roles={row}
          startIndex={r * 2}
          total={items.length}
          last={r === rows.length - 1}
        />
      ))}
    </div>
  );
}