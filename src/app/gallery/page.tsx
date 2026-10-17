import type { Metadata } from "next";
import { GalleryHero } from "@/components/sections/gallery/GalleryHero";
import { MediaGallery } from "@/components/sections/gallery/MediaGallery";
import { designGallery, galleryBeforeAfter, videoGallery } from "@/content/gallery";
import { ServiceBeforeAfter } from "@/components/sections/service-page/ServiceBeforeAfter";


export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Afaq Al Manzel Interiors projects — luxury residences, transformations, and interior details across Dubai and the UAE.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <MediaGallery
        id="design-gallery"
        eyebrow={designGallery.eyebrow}
        title={designGallery.title}
        projects={designGallery.projects}
      />
      <MediaGallery
        id="video-gallery"
        kind="video"
        eyebrow={videoGallery.eyebrow}
        title={videoGallery.title}
        projects={videoGallery.projects}
      />
       <ServiceBeforeAfter data={galleryBeforeAfter} />
    </>
  );
}