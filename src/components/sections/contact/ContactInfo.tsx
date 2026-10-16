import { Reveal } from "@/components/motion/Reveal";
import { StepDots } from "@/components/motion/StepDots";
import { socialIcons } from "@/components/ui/icons";
import { site } from "@/content/site";

const label = "font-display text-xl text-terracotta";
const value = "mt-2 text-sm leading-snug md:text-[15px]";
const link = "link-underline hover:text-accent";

export function ContactInfo() {
  const cells = [
    {
      title: "Address",
      body: (
        <a href={site.mapHref} target="_blank" rel="noopener noreferrer" className={link}>
          {site.address.join(", ")}
        </a>
      ),
    },
    { title: "Phone", body: <a href={site.phoneHref} className={link}>{site.phone}</a> },
    { title: "Email", body: <a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a> },
    {
      title: "Follow Us On",
      body: (
        <ul className="mt-1 flex gap-6">
          {site.socials.map((s) => {
            const Icon = socialIcons[s.label];
            return (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="block transition-colors hover:text-accent">
                  <Icon className="size-6" />
                </a>
              </li>
            );
          })}
        </ul>
      ),
    },
  ];

  return (
    <address className="grid gap-10 py-10 not-italic sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-0 lg:pb-8">
      {cells.map((c, i) => (
        <div key={c.title} className="lg:pr-8">
          <StepDots total={4} active={i} delay={i * 0.12} className="lg:-mt-1" />
          <Reveal delay={0.15 + i * 0.12} className="mt-6 lg:mt-[70px]">
            <h2 className={label}>{c.title}</h2>
            <div className={value}>{c.body}</div>
          </Reveal>
        </div>
      ))}
    </address>
  );
}