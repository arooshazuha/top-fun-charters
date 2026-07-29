import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowUpRight, Clock, Anchor, Users, Camera } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { SuccessCheck } from "@/components/thank-you/SuccessCheck";
import { SITE } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Thank You",
  description:
    "Thank you — your Top Fun Charters inquiry has been received. Our team will reach out shortly to plan your private yacht charter on Anna Maria Island.",
  path: "/thank-you",
  noIndex: true,
});

const STEPS = [
  {
    icon: Clock,
    title: "We review your details",
    text: "Our team looks over your dates, group size and the experience you're after.",
  },
  {
    icon: Phone,
    title: "We reach out",
    text: "You'll hear from us by email or phone to confirm availability and answer any questions.",
  },
  {
    icon: Anchor,
    title: "You set sail",
    text: "Meet us at Safe Harbor Pier 77 and enjoy your private day on the Gulf.",
  },
];

const SHORTCUTS = [
  {
    href: "/captains",
    title: "Meet Our Captains",
    sub: "The local crew who know these waters.",
    image: "/images/aerial-cruising.jpg",
    icon: Users,
  },
  {
    href: "/photos",
    title: "Explore the Photo Gallery",
    sub: "Real days aboard Top Fun Charters.",
    image: "/images/aerial-overhead-yacht.jpg",
    icon: Camera,
  },
];

export default function ThankYouPage() {
  return (
    <>
      {/* Hero confirmation banner */}
      <section className="grain relative isolate overflow-hidden bg-ink text-sand">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(21,105,123,0.4),transparent_60%)]"
        />
        <div className="container-x relative z-10 flex flex-col items-center pb-16 pt-[calc(var(--header-h)+3rem)] text-center md:pb-24 md:pt-[calc(var(--header-h)+4.5rem)]">
          <SuccessCheck />

          <Reveal delay={0.15}>
            <span className="eyebrow mt-8 inline-block text-brass-300">Inquiry received</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-light leading-[1.05] text-foam">
              Thank You! Your Inquiry Has Been Received.
            </h1>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-5 max-w-xl text-pretty text-lg text-sand/80">
              We&apos;re excited to host you aboard Top Fun Charters in Anna Maria
              Island!
            </p>
          </Reveal>
        </div>
      </section>

      {/* Expectations + call CTA */}
      <Section tone="sand" spacing="lg">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-sand-100 p-8 shadow-[var(--shadow-card)] md:p-10">
            <h2 className="font-display text-2xl text-ink md:text-3xl">
              What happens next?
            </h2>
            <p className="mt-3 text-muted">
              One of our team members will review your details and reach out via
              email or phone shortly.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.title}>
                  <div className="flex size-11 items-center justify-center rounded-full border border-brass/30 bg-brass/10">
                    <s.icon className="size-5 text-brass-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-display text-lg text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">Need immediate assistance?</p>
              <LinkButton href={SITE.phone.href} variant="primary" size="lg">
                <Phone className="size-[1.1em]" />
                Call {SITE.phone.display}
              </LinkButton>
            </div>
          </div>
        </Reveal>

        {/* Engagement shortcuts */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {SHORTCUTS.map((s) => (
            <Reveal key={s.href}>
              <Link
                href={s.href}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-ink"
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  quality={75}
                  sizes="(max-width: 640px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <s.icon className="size-6 text-brass-300" strokeWidth={1.5} />
                  <h3 className="mt-2 font-display text-xl text-foam">{s.title}</h3>
                  <p className="mt-1 text-sm text-sand/80">{s.sub}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brass-300">
                    View
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-brass-600"
          >
            ← Back to home
          </Link>
        </div>
      </Section>
    </>
  );
}
