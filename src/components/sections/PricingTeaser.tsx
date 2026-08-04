import { Info } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PRICING_TIERS, PRICING_NOTES } from "@/data/pricing";

export function PricingTeaser() {
  return (
    <Section id="pricing" tone="sand" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Pricing"
        title="Simple, transparent charter rates"
        intro="One flat rate for the whole boat. Pick your group size and charter length, from a relaxed 4-hour trip to a full day out. Taxes are not included."
        className="mx-auto"
      />

      <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        {PRICING_TIERS.map((tier) => (
          <Reveal key={tier.id} delay={tier.featured ? 0.08 : 0}>
            <PricingCard tier={tier} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-line bg-sand-100 p-5">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-brass-600" />
            <ul className="space-y-1.5 text-sm text-muted">
              {PRICING_NOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 flex justify-center">
        <LinkButton href="/pricing" variant="outline" size="md">
          See full price list
        </LinkButton>
      </div>
    </Section>
  );
}
