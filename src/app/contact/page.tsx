import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, Navigation, Info } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/booking/BookingButton";
import { SITE, FULL_ADDRESS, MAPS_EMBED_URL, MAPS_LINK_URL } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Top Fun Charters in Bradenton / Anna Maria Island, FL. Call or text 941-241-2000, email info@topfuncharters.com, or check live availability to book your private yacht charter.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's plan your day on the water"
        intro="Questions about dates, group size or the best trip for your crew? We're quick to answer by phone, text or email."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <Section tone="sand" spacing="lg">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Methods */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={SITE.phone.href}
                className="lift group rounded-xl border border-line bg-sand-100 p-6 shadow-[var(--shadow-card)]"
              >
                <Phone className="size-6 text-brass-600" />
                <h2 className="mt-4 font-display text-lg text-ink">Call us</h2>
                <p className="mt-1 text-sm text-muted">{SITE.phone.display}</p>
              </a>
              <a
                href={`sms:${SITE.phone.e164}`}
                className="lift group rounded-xl border border-line bg-sand-100 p-6 shadow-[var(--shadow-card)]"
              >
                <MessageCircle className="size-6 text-brass-600" />
                <h2 className="mt-4 font-display text-lg text-ink">Text us</h2>
                <p className="mt-1 text-sm text-muted">{SITE.phone.display}</p>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="lift group rounded-xl border border-line bg-sand-100 p-6 shadow-[var(--shadow-card)] sm:col-span-2"
              >
                <Mail className="size-6 text-brass-600" />
                <h2 className="mt-4 font-display text-lg text-ink">Email us</h2>
                <p className="mt-1 text-sm text-muted">{SITE.email}</p>
              </a>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brass-600" />
              <div>
                <p className="font-medium text-ink">Departs from</p>
                <p className="text-sm text-muted">{FULL_ADDRESS}</p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-brass/25 bg-brass/[0.06] p-5">
              <Info className="mt-0.5 size-5 shrink-0 text-brass-600" />
              <p className="text-sm leading-relaxed text-muted">
                Planning a cancellation? Please send your request in writing by
                email or text, we&apos;re unable to acknowledge verbal,
                over-the-phone requests or voicemails.
              </p>
            </div>
          </div>

          {/* Map + CTA */}
          <div className="flex flex-col gap-6">
            <Reveal y={30}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line shadow-[var(--shadow-card)]">
                <iframe
                  src={MAPS_EMBED_URL}
                  title="Map to Safe Harbor Pier 77 Marina, Bradenton, FL"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full grayscale-[0.15]"
                />
              </div>
            </Reveal>

            <div className="rounded-2xl bg-ink p-8 text-center">
              <h2 className="font-display text-2xl text-sand">
                Ready to check dates?
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-sand/70">
                Open our live calendar to see availability and book in minutes.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <BookingButton size="md" />
                <a
                  href={MAPS_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-sand/80 hover:text-brass-300"
                >
                  <Navigation className="size-4" /> Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
