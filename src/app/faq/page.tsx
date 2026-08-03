import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { BookingButton } from "@/components/booking/BookingButton";
import { FinalCta } from "@/components/sections/FinalCta";
import { FAQ_CATEGORIES, ALL_FAQS } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Top Fun Charters, guests and capacity, food and drinks, what to bring, pets, smoking, fishing, cancellations, weather, pickup and booking for Anna Maria Island yacht charters.",
  path: "/faq",
  keywords: ["Anna Maria Island yacht charter FAQ", "what to bring on a boat charter"],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(ALL_FAQS)} />

      <PageHeader
        eyebrow="Good to Know"
        title="Frequently asked questions"
        intro="Everything guests ask most before their first charter. Can't find your answer? We're a call, text or email away."
        crumbs={[{ name: "FAQ", path: "/faq" }]}
      />

      <Section tone="sand" spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {/* Sticky category index */}
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="eyebrow text-brass-600">Categories</h2>
            <ul className="mt-4 space-y-2">
              {FAQ_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="text-sm text-ink/70 transition-colors hover:text-brass-600"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-line bg-sand-100 p-5">
              <p className="text-sm text-muted">Still have a question?</p>
              <Link
                href="/contact"
                className="mt-1 inline-block font-display text-lg text-ink underline-offset-4 hover:text-brass-600 hover:underline"
              >
                Get in touch →
              </Link>
            </div>
          </nav>

          <div className="space-y-14">
            {FAQ_CATEGORIES.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-28">
                <Reveal>
                  <h2 className="font-display text-2xl text-ink">{cat.title}</h2>
                </Reveal>
                <div className="mt-2">
                  <FaqAccordion items={cat.items} idPrefix={cat.id} defaultOpen={null} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-ink px-6 py-12 text-center">
          <h2 className="font-display text-2xl text-sand md:text-3xl">
            Ready when you are
          </h2>
          <p className="max-w-md text-sand/70">
            Check live availability and pick the date that fits your group.
          </p>
          <BookingButton size="md" />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
