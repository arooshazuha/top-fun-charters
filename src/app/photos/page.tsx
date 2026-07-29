import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Photos",
  description:
    "Photo gallery from Top Fun Charters — aerial shots of our 50-foot yacht, sandbars, Egmont Key, the marina and real days out on the water around Anna Maria Island, Florida.",
  path: "/photos",
  image: "/images/aerial-overhead-yacht.jpg",
  keywords: ["Anna Maria Island yacht photos", "Top Fun Charters gallery"],
});

export default function PhotosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A look aboard Top Fun"
        intro="Real photos from real charters — the yacht, the water, and the destinations that make a day on the Gulf worth remembering."
        image="/images/aerial-overhead-yacht.jpg"
        imageAlt="Overhead aerial of the Top Fun yacht cruising near Anna Maria Island"
        crumbs={[{ name: "Photos", path: "/photos" }]}
      />

      <Section tone="sand" spacing="lg">
        <GalleryGrid />
      </Section>

      <FinalCta />
    </>
  );
}
