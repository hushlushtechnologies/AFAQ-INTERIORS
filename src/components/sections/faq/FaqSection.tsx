import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { contactHref } from "@/content/navigation";
import { BlueprintBackdrop } from "@/components/sections/process/BlueprintBackdrop";
import { FaqList, type FaqItem } from "./FaqList";

const link = "text-accent underline-offset-4 transition-colors hover:underline";

type Props = {
  items: readonly FaqItem[];
  id?: string;
  title?: readonly string[];
};

export function FaqSection({ items, id = "faq", title = ["Frequently", "Asked", "Questions"] }: Props) {
  const headingId = `${id}-heading`;

  // FAQ rich results for Google, built from this page's own questions
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-ivory py-24 text-ink md:py-32 xl:py-[150px]"
    >
      <BlueprintBackdrop src="/images/faq/sketch.svg" imageClassName="opacity-80" overlayClassName="bg-ivory/30" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <LineReveal
            id={headingId}
            as="h2"
            lines={title}
            className="font-display text-[44px] leading-[1.1] sm:text-6xl xl:text-[84px]"
          />

          <div>
            <Reveal>
              <p className="max-w-[640px] text-lg leading-snug md:text-[22px]">
                Still have questions? We’re happy to help! If you don’t find your answer below, just drop us a
                mail at{" "}
                <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                  {site.email}
                </a>{" "}
                or give us a call at{" "}
                <a href={site.phoneHref} className={`${link} whitespace-nowrap`}>
                  {site.phone}
                </a>{" "}
                — we’d love to hear from you!
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <Button href={contactHref} variant="accent">Contact Us</Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 xl:mt-[120px]">
          <FaqList items={items} />
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}