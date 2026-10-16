import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SparkleDivider } from "@/components/motion/SparkleDivider";
import { process } from "@/content/process";
import { BlueprintBackdrop } from "./BlueprintBackdrop";
import { ProcessAccordion } from "./ProcessAccordion";
import { VideoCard } from "./VideoCard";

export function ProcessSection() {
  const [first, second] = process.videos;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-background py-24 text-cream md:py-32 xl:pb-[160px] xl:pt-[140px]"
    >
      <BlueprintBackdrop src="/images/process/blueprint.svg" />

      <Container className="relative z-10">
        <LineReveal
          id="process-heading"
          as="h2"
          lines={[process.title]}
          className="font-display text-3xl leading-tight md:text-4xl xl:text-[42px]"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[1180px] text-lg leading-snug text-white/90 md:text-[22px]">{process.body}</p>
        </Reveal>

        <SparkleDivider className="mx-auto mt-16 w-full max-w-[930px] md:mt-20" />

        <div className="mt-16 md:mt-24">
          <ProcessAccordion />
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-2 lg:mt-48 lg:grid-cols-[494px_494px] lg:gap-[35px] lg:pl-[128px]">
          <VideoCard {...first} speed={40} className="lg:mt-[160px]" />
          <VideoCard {...second} speed={110} />
        </div>
      </Container>
    </section>
  );
}