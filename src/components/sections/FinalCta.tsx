import Image from "next/image";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/booking/BookingButton";
import { bookingUrl } from "@/config/ghl";
import { SITE } from "@/config/site";

/**
 * Closing booking CTA band.
 *
 * @param directBooking When true (i.e. already on `/pricing`), the button reads
 * "Check availability" and links straight to the GHL calendar. Elsewhere it
 * stays the funnel default: "Check pricing and availability" → `/pricing`.
 */
export function FinalCta({ directBooking = false }: { directBooking?: boolean }) {
  return (
    <section
      aria-label="Book your charter"
      className="grain relative isolate overflow-hidden bg-ink text-sand"
    >
      <Image
        src="/images/aerial-coastline.jpg"
        alt=""
        aria-hidden
        fill
        quality={75}
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/55" />

      <div className="container-x relative z-10 py-24 text-center md:py-32">
        <Reveal>
          <span className="eyebrow text-brass-300">Book your charter</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] text-foam">
            The whole boat. The whole day. <em className="italic text-brass-300">Yours.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-sand/80">
            Check live availability, pick your hours, and we&apos;ll see you on
            the dock at Anna Maria Island.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {directBooking ? (
              <BookingButton
                label="Check availability"
                href={bookingUrl()}
                size="lg"
                event="availability_cta_click"
              />
            ) : (
              <BookingButton size="lg" />
            )}
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-2 text-lg font-medium text-sand transition-colors hover:text-brass-300"
            >
              <Phone className="size-5" />
              {SITE.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
