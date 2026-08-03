import type { Metadata } from "next";
import { buildMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VideoHero } from "@/components/hero/VideoHero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { YachtShowcase } from "@/components/sections/YachtShowcase";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { CaptainsPreview } from "@/components/sections/CaptainsPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { PickupTeaser } from "@/components/sections/PickupTeaser";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Anna Maria Private Yacht Charter",
  description:
    "Private luxury yacht charters on Anna Maria Island & Bradenton, FL. A 50-foot luxury yacht for up to 13 guests. Sunset cruises, dolphin watching, sandbars and Egmont Key, with relaxed 4-hour charters. Check pricing and availability.",
  path: "/",
  keywords: [
    "Anna Maria Island yacht charter",
    "private yacht charter Anna Maria Island",
    "boat charter Bradenton FL",
    "private boat tours Anna Maria Island",
    "Egmont Key charter",
    "sunset cruise Anna Maria Island",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[serviceSchema(), breadcrumbSchema([{ name: "Home", path: "/" }])]} />
      <VideoHero />
      <TrustBar />
      <WhyUs />
      <YachtShowcase />
      <ExperiencesSection />
      <CaptainsPreview />
      <GalleryPreview />
      <PricingTeaser />
      <ReviewsSection />
      <PickupTeaser />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
