import type { Metadata } from "next";
import { Info, CreditCard, CalendarCheck, FileSignature, Anchor } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PricingCard } from "@/components/pricing/PricingCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { PRICING_TIERS, PRICING_NOTES } from "@/data/pricing";

export const metadata: Metadata = buildMetadata({
  title: "Price List",
  description:
    "Top Fun Charters price list for Anna Maria Island & Bradenton, FL. Private 50-foot yacht charters from $1,299, 4, 6 and 8-hour options for 1-6 or 7-13 guests. Taxes not included.",
  path: "/pricing",
  keywords: [
    "Anna Maria Island yacht charter price",
    "boat charter cost Bradenton FL",
    "private yacht rental rates Anna Maria",
  ],
});

const STEPS = [
  { icon: CalendarCheck, title: "Check availability", text: "Open the live booking calendar and choose the date and length that works for your group." },
  { icon: FileSignature, title: "Complete the forms", text: "Fill out the short charter form and participant waiver before your trip." },
  { icon: Anchor, title: "Meet at the marina", text: "Arrive at Safe Harbor Pier 77, step aboard, and your captain takes it from there." },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, all-in charter rates"
        intro="One flat rate for the whole yacht. Pick your group size and charter length, with our relaxed 4-hour charter the most popular way out. The boat is entirely yours."
        crumbs={[{ name: "Price List", path: "/pricing" }]}
      />

      <Section tone="sand" spacing="lg">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
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
                <li className="flex items-center gap-2 pt-1 text-ink/70">
                  <CreditCard className="size-4 text-brass-600" />
                  Payment accepted by Zelle, Venmo, CashApp or credit card.
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section tone="sand-2" spacing="md">
        <h2 className="text-center font-display text-3xl text-ink">How booking works</h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-brass/30 bg-brass/10">
                  <s.icon className="size-6 text-brass-600" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta directBooking />
    </>
  );
}
