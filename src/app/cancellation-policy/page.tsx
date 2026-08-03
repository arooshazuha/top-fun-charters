import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalContent } from "@/components/legal/LegalContent";
import { CANCELLATION } from "@/data/legal";

export const metadata: Metadata = buildMetadata({
  title: "Cancellation Policy",
  description:
    "Top Fun Charters cancellation policy, how to request a cancellation in writing, and how weather, conduct and payment are handled for your Anna Maria Island yacht charter.",
  path: "/cancellation-policy",
});

export default function CancellationPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Cancellation Policy"
        crumbs={[{ name: "Cancellation Policy", path: "/cancellation-policy" }]}
      />
      <Section tone="sand" spacing="lg">
        <LegalContent doc={CANCELLATION} />
      </Section>
    </>
  );
}
