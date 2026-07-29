import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalContent } from "@/components/legal/LegalContent";
import { TERMS } from "@/data/legal";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for Top Fun Charters (Get Serious LLC), governing the use of our private yacht charter services on Anna Maria Island and Bradenton, Florida.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        crumbs={[{ name: "Terms of Service", path: "/terms" }]}
      />
      <Section tone="sand" spacing="lg">
        <LegalContent doc={TERMS} />
      </Section>
    </>
  );
}
