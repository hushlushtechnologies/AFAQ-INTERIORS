import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: readonly string[];
  body: string;
  actions?: React.ReactNode;
};

export function SplitHeader({ id, eyebrow, title, body, actions }: Props) {
  return (
    <Container>
      <Reveal>
        <p className="text-base text-accent">{eyebrow}</p>
      </Reveal>
      <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:items-end">
        <LineReveal
          id={id}
          as="h2"
          lines={title}
          className="font-display text-[40px] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[84px]"
        />
        <div className="lg:pb-2">
          <Reveal>
            <p className="max-w-[640px] text-lg leading-snug md:text-[22px]">{body}</p>
          </Reveal>
          {actions && (
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4 md:gap-6">
              {actions}
            </Reveal>
          )}
        </div>
      </div>
    </Container>
  );
}