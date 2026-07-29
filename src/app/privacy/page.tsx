import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalContent } from "@/components/legal/LegalContent";
import { PRIVACY } from "@/data/legal";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for Top Fun Charters — how we collect and use your information when you book or contact us about a private yacht charter on Anna Maria Island, Florida.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        crumbs={[{ name: "Privacy Policy", path: "/privacy" }]}
      />
      <Section tone="sand" spacing="lg">
        <LegalContent doc={PRIVACY} />
      </Section>
    </>
  );
}
