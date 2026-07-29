import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { FormsDirectory } from "@/components/forms/FormsDirectory";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Forms & Waivers",
  description:
    "Charter forms and the required participant waiver for Top Fun Charters. Complete your waiver and charter booking form before your Anna Maria Island yacht charter.",
  path: "/forms",
});

export default function FormsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Forms"
        title="Forms & waivers"
        intro="A few quick forms keep everyone safe and your day running smoothly. Complete your charter form and participant waiver before you set sail."
        crumbs={[{ name: "Forms", path: "/forms" }]}
      />

      <Section tone="sand" spacing="lg">
        <FormsDirectory />
      </Section>

      <FinalCta />
    </>
  );
}
