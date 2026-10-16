import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { signature } from "@/content/signature";
import { contactHref } from "@/content/navigation";
import { SignatureBand } from "./SignatureBand";

export function SignatureSection() {
  return (
    <section
      id="signature"
      aria-labelledby="signature-heading"
      className="bg-ivory pb-24 pt-8 text-ink md:pb-32 xl:pb-[180px]"
    >
      <Container>
        <Reveal>
          <p className="text-base text-accent">{signature.eyebrow}</p>
        </Reveal>
        <LineReveal
          id="signature-heading"
          as="h2"
          underline
          lines={signature.title}
          className="mt-4 font-display text-[40px] leading-[1.15] sm:text-5xl lg:text-6xl xl:text-[80px]"
        />
        <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4 md:gap-6">
          <Button href="/products" variant="accent">Discover Our Products</Button>
          <Button href={contactHref} variant="outline">Contact Us</Button>
        </Reveal>
      </Container>

      {/* Near full-bleed gallery */}
      <div className="mt-14 px-4 md:mt-16 md:px-7">
        <div className="border border-ink/70">
          {signature.bands.map((band, i) => (
            <SignatureBand
              key={band.label}
              band={band}
              className={i > 0 ? "border-t border-ink/70" : undefined}
            />
          ))}
        </div>
      </div>

      <Container>
        <Reveal>
          <p className="mt-16 max-w-[620px] text-lg leading-snug md:text-[22px] xl:mt-[90px]">
            {signature.body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}