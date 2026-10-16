import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { careers } from "@/content/careers";
import { RolesGrid } from "./RolesGrid";

export function OpenRoles() {
  return (
    <section
      id="open-roles"
      aria-labelledby="open-roles-heading"
      className="relative overflow-x-clip bg-ivory pb-24 pt-24 text-ink md:pb-32 md:pt-32 xl:pb-[200px] xl:pt-[190px]"
    >
      <ColumnLines />

      <Container className="relative">
        <LineReveal
          id="open-roles-heading"
          as="h2"
          lines={careers.roles.title}
          className="font-display text-[40px] leading-[1.1] sm:text-5xl xl:text-[64px]"
        />
      </Container>

      <div className="relative mt-16 lg:mt-[175px]">
        <RolesGrid />
      </div>
    </section>
  );
}