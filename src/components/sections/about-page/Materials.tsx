import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { contactHref } from "@/content/navigation";
import { MaterialsAccordion, type MaterialItem } from "./MaterialsAccordion";

export type MaterialsData = {
  title: readonly string[];
  body: string;
  items: readonly MaterialItem[];
};

type Props = { data: MaterialsData; id?: string };

export function Materials({ data, id = "materials" }: Props) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative overflow-x-clip bg-ivory pb-24 pt-24 text-ink md:pt-32 lg:[--cell:calc((100vw_-_4rem)/4)] xl:pb-[180px] xl:pt-[150px] xl:[--cell:min(320px,25vw)]"
    >
      <ColumnLines lineClassName="bg-ink/15" />

      <Container className="relative">
        <div className="grid gap-8 pb-16 lg:grid-cols-4 lg:gap-0 xl:pb-[160px]">
          <LineReveal
            id={headingId}
            as="h2"
            lines={data.title}
            className="font-display text-[40px] leading-[1.1] sm:text-5xl lg:col-span-2 xl:text-[76px]"
          />
          <div className="lg:col-span-2 lg:pt-6">
            <Reveal>
              <p className="max-w-[620px] text-base leading-snug md:text-lg xl:text-[21px]">{data.body}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-6">
              <Button href={contactHref} variant="accent" className="md:px-6 md:py-2.5 md:text-base">
                Contact Us
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>

      <MaterialsAccordion items={data.items} />
    </section>
  );
}