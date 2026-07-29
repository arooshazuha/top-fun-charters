import { MapPin, Navigation } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/booking/BookingButton";
import { Icon } from "@/lib/icons";
import { PICKUP } from "@/data/pickup";
import { MAPS_EMBED_URL, MAPS_LINK_URL } from "@/config/site";

export function PickupTeaser() {
  return (
    <Section id="pickup" tone="sand-2" spacing="lg">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Where We Meet"
            title={PICKUP.marina}
            intro={`${PICKUP.directions} ${PICKUP.parking}`}
          />

          <div className="mt-6 flex items-start gap-3 text-sm text-ink/80">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brass-600" />
            <span>{PICKUP.address}</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PICKUP.highlights.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-3 rounded-lg border border-line bg-sand-100 px-4 py-3"
              >
                <Icon name={h.icon} className="size-5 shrink-0 text-brass-600" />
                <span className="text-sm text-ink/80">{h.label}</span>
              </div>
            ))}
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
      </div>
    </Section>
  );
}
