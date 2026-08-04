import type { Metadata } from "next";
import {
  Info,
  CreditCard,
  CalendarCheck,
  FileSignature,
  Anchor,
  Ship,
  UserRoundCheck,
  Wallet,
  BadgeCheck,
} from "lucide-react";
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

/** How the USCG bareboat structure works for 7-13 guest charters. */
const BAREBOAT_POINTS = [
  {
    icon: Ship,
    title: "You charter the boat",
    text: "The listed rate covers exclusive, private use of the 50-foot yacht for your chosen length of time.",
  },
  {
    icon: UserRoundCheck,
    title: "You choose your captain",
    text: "Every trip runs with a licensed, professional captain for safety. You select your captain from our roster and hire them directly.",
  },
  {
    icon: Wallet,
    title: "The captain is paid separately",
    text: "The captain's fee is arranged with and paid directly to your captain, separate from the boat charter fee. It is not bundled into the boat rate or paid by Top Fun Charters.",
  },
  {
    icon: BadgeCheck,
    title: "Direct, with no markups",
    text: "You work straight with the owner-operator, so there are no broker markups or hidden booking fees, just competitive, transparent pricing.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, transparent charter rates"
        intro="Clear rates for the whole yacht. Pick your group size and charter length, with our relaxed 4-hour charter the most popular way out. The boat is entirely yours."
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

        {/* Bareboat charter explainer for 7-13 guests (USCG compliance) */}
        <Reveal>
          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-brass/30 bg-brass/[0.05] p-6 md:p-8">
            <span className="eyebrow text-brass-600">7 to 13 guests</span>
            <h2 className="mt-2 font-display text-2xl text-ink">What this means for you</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Charters for more than six guests follow the U.S. Coast Guard
              bareboat charter model. Here is exactly how it works, and why it
              keeps your pricing transparent.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {BAREBOAT_POINTS.map((p) => (
                <div key={p.title} className="flex gap-3">
                  <p.icon className="mt-0.5 size-5 shrink-0 text-brass-600" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-medium text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </div>
              ))}
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
