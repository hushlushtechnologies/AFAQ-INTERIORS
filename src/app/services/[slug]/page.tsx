import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/service-page/ServiceHero";
import { servicePages } from "@/content/service-pages";
import { ServiceSpaces } from "@/components/sections/service-page/ServiceSpaces";
import { ServiceStyles } from "@/components/sections/service-page/ServiceStyles";

type Props = { params: Promise<{ slug: string }> };

// Pre-build every known service page at deploy time
export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = servicePages[slug];
  if (!data) return {};
  return { title: data.eyebrow, description: data.metaDescription };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const data = servicePages[slug];
  if (!data) notFound();

  return (
    <>
      <ServiceHero data={data} />
       {data.spaces && <ServiceSpaces data={data.spaces} />}
       {data.styles && <ServiceStyles data={data.styles} />}
    </>
  );
}