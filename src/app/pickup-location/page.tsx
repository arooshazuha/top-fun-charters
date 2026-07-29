import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Navigation, Clock, Info } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/booking/BookingButton";
import { FinalCta } from "@/components/sections/FinalCta";
import { PICKUP } from "@/data/pickup";
import { MAPS_EMBED_URL, MAPS_LINK_URL } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Pickup Location",
  description:
    "Top Fun Charters departs from Safe Harbor Pier 77 Marina, 12312 Manatee Ave W, Bradenton, FL — directly across the bridge from Anna Maria Island. Free parking and easy-board floating docks.",
  path: "/pickup-location",
  keywords: ["Safe Harbor Pier 77 Marina", "yacht charter pickup Anna Maria Island", "Bradenton marina charter"],
});

export default function PickupLocationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where We Meet"
        title="Safe Harbor Pier 77 Marina"
        intro="Your charter departs from a full-service marina just across the bridge from Anna Maria Island — easy to find, easy to park, and easy to board."
        image="/images/pier-77-marina.jpg"
        imageAlt="Safe Harbor Pier 77 Marina in Bradenton, the Top Fun Charters departure point"
        crumbs={[{ name: "Pickup Location", path: "/pickup-location" }]}
      />

      <Section tone="sand" spacing="lg">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl text-ink">Getting here</h2>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-brass-600" />
                <div>
                  <p className="font-medium text-ink">{PICKUP.marina}</p>
                  <p className="text-sm text-muted">{PICKUP.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Navigation className="mt-0.5 size-5 shrink-0 text-brass-600" />
                <p className="text-sm text-muted">{PICKUP.directions}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-brass-600" />
                <p className="text-sm text-muted">{PICKUP.meetingPoint}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="eyebrow text-brass-600">At the marina</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {PICKUP.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-ink/80">
                    <span className="size-1.5 rounded-full bg-brass" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <BookingButton size="md" />
              <a
                href={MAPS_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/25 px-6 text-[0.95rem] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-sand"
              >
                <Navigation className="size-4" />
                Get directions
              </a>
            </div>
          </div>

          <Reveal y={30}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line shadow-[var(--shadow-card)] lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <iframe
                src={MAPS_EMBED_URL}
                title="Map to Safe Harbor Pier 77 Marina, Bradenton, FL"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.15]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand-2" spacing="md">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-[var(--shadow-card)]">
              <Image
                src="/images/marina-pickup-view.jpg"
                alt="View across Safe Harbor Pier 77 Marina near Anna Maria Island"
                fill
                quality={82}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <div className="flex items-start gap-3 rounded-xl border border-line bg-sand-100 p-5">
              <Info className="mt-0.5 size-5 shrink-0 text-brass-600" />
              <div>
                <h3 className="font-display text-xl text-ink">
                  Need a different pickup point?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {PICKUP.alternate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
