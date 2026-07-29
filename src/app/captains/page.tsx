import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CaptainCard } from "@/components/captains/CaptainCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { CAPTAINS } from "@/data/captains";

export const metadata: Metadata = buildMetadata({
  title: "Captain List",
  description:
    "Meet the captains of Top Fun Charters — experienced, local captains who navigate Anna Maria Island, Bradenton and the Gulf Coast. Safe, fun private yacht charters.",
  path: "/captains",
  keywords: ["Anna Maria Island yacht captains", "licensed boat captain Bradenton FL"],
});

export default function CaptainsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your Crew"
        title="Captains who call these waters home"
        intro="Every charter runs with a professional captain at the helm — people who know the tides, the wildlife and the quiet corners most visitors never find."
        crumbs={[{ name: "Captains", path: "/captains" }]}
      />

      <Section tone="sand" spacing="lg">
        <Stagger className="grid gap-4 md:grid-cols-2">
          {CAPTAINS.map((c) => (
            <StaggerItem key={c.slug}>
              <CaptainCard captain={c} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-line bg-sand-100 p-5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brass-600" />
          <p className="text-sm leading-relaxed text-muted">
            Your captain is assigned based on your date and charter. Several of
            our captains hold U.S. Coast Guard and Master of Yachts credentials,
            and safety always comes first — on the water, the captain&apos;s word
            is the final say.
          </p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
