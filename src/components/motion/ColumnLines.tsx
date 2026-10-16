import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ScrollLine } from "./ScrollLine";

const positions = ["left-0", "left-1/4", "left-1/2", "left-3/4", "left-full"];

type Props = { lineClassName?: string; className?: string };

export function ColumnLines({ lineClassName, className }: Props) {
  return (
    <Container className={cn("pointer-events-none absolute inset-0 hidden lg:block", className)}>
      <div className="relative h-full">
        {positions.map((pos) => (
          <ScrollLine key={pos} className={`absolute inset-y-0 w-px ${pos}`} lineClassName={lineClassName} />
        ))}
      </div>
    </Container>
  );
}