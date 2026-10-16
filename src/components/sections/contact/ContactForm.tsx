"use client";
import { useActionState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { contact } from "@/content/contact";
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";

const initial: EnquiryState = { status: "idle" };
const control =
  "w-full bg-transparent px-2.5 py-5 text-base text-ink outline-none placeholder:text-ink/45 md:text-lg";

function Row({
  index,
  id,
  error,
  children,
}: {
  index: number;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="group relative border-b border-terracotta/30"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: ease.out, delay: index * 0.07 }}
    >
      {children}
      {/* Focus underline */}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100"
      />
      {error && (
        <p id={`${id}-error`} className="px-2.5 pb-3 text-sm text-accent">
          {error}
        </p>
      )}
    </motion.div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  const a11y = (name: keyof typeof e) =>
    e[name] ? { "aria-invalid": true, "aria-describedby": `cf-${name}-error` } : {};

  return (
    <form action={action} noValidate className="relative">
      <Row index={0} id="cf-name" error={e.name}>
        <label htmlFor="cf-name" className="sr-only">Name</label>
        <input id="cf-name" name="name" autoComplete="name" required placeholder="Name"
          defaultValue={v.name} className={control} {...a11y("name")} />
      </Row>

      <Row index={1} id="cf-phone" error={e.phone}>
        <label htmlFor="cf-phone" className="sr-only">Phone number</label>
        <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required
          placeholder="Phone Number" defaultValue={v.phone} className={control} {...a11y("phone")} />
      </Row>

      <Row index={2} id="cf-email" error={e.email}>
        <label htmlFor="cf-email" className="sr-only">Email address</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required
          placeholder="Email Address" defaultValue={v.email} className={control} {...a11y("email")} />
      </Row>

      <Row index={3} id="cf-service" error={e.service}>
        <label htmlFor="cf-service" className="sr-only">Service required</label>
        <select id="cf-service" name="service" required defaultValue={v.service ?? ""}
          className={cn(control, "cursor-pointer appearance-none pr-10 invalid:text-ink/45")} {...a11y("service")}>
          <option value="" disabled hidden>Service Required</option>
          {contact.serviceOptions.map((s) => (
            <option key={s} value={s} className="text-ink">{s}</option>
          ))}
        </select>
        <svg aria-hidden viewBox="0 0 24 24"
          className="pointer-events-none absolute right-3 top-[26px] size-5 fill-none stroke-ink stroke-[1.5] transition-transform duration-300 group-focus-within:rotate-180">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Row>

      <Row index={4} id="cf-message" error={e.message}>
        <label htmlFor="cf-message" className="sr-only">Message</label>
        <textarea id="cf-message" name="message" rows={5} placeholder="Write Something..."
          defaultValue={v.message} className={cn(control, "resize-none")} {...a11y("message")} />
      </Row>

      {/* Honeypot: hidden from people, irresistible to bots */}
      <div aria-hidden className="absolute -left-[9999px] top-0">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-14 inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full py-3.5 text-base font-medium text-white transition-[filter,opacity] duration-300 [background:radial-gradient(50%_50%_at_50%_0%,rgb(255_255_255/0.25),transparent),var(--color-accent)] hover:brightness-110 disabled:cursor-wait disabled:opacity-75 md:text-lg"
      >
        {pending && (
          <svg aria-hidden viewBox="0 0 24 24" className="size-5 animate-spin fill-none stroke-current stroke-2">
            <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
          </svg>
        )}
        {pending ? "Sending…" : "Send Enquiry"}
      </button>

      <div role="status" aria-live="polite" className="mt-5 min-h-6">
        <AnimatePresence mode="wait">
          {state.status !== "idle" && !pending && (
            <motion.p
              key={state.status + (state.message ?? "")}
              className={cn("text-center text-base", state.status === "success" ? "text-ink" : "text-accent")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: ease.out }}
            >
              {state.status === "success"
                ? "Thank you — we’ve received your enquiry and will be in touch shortly."
                : state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}