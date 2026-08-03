import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { BookingButton } from "@/components/booking/BookingButton";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/lib/icons";
import { YACHT, YACHT_STATS, YACHT_FEATURES } from "@/data/yacht";

export function YachtShowcase() {
  return (
    <Section id="yacht" tone="ink" spacing="lg" className="grain">
      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal className="order-2 lg:order-1" y={40}>
          <Parallax speed={26} className="relative">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-lg ring-1 ring-foam/10">
              <Image
                src="/images/yacht-front-view.jpg"
                alt="The 50-foot Top Fun luxury yacht anchored on a calm Gulf sandbar near Anna Maria Island"
                fill
                quality={82}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
          </Parallax>
          {/* floating spec card */}
          <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-xl border border-foam/10 bg-deep/90 px-5 py-4 shadow-[var(--shadow-float)] backdrop-blur-md sm:-right-5">
            <Icon name="Sailboat" className="size-6 text-brass" />
            <div>
              <div className="font-display text-lg leading-none text-sand">50 feet</div>
              <div className="mt-1 text-xs text-sand/60">up to 13 guests</div>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            tone="light"
            eyebrow="The Yacht"
            title={YACHT.headline}
            intro={YACHT.intro}
          />

          <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-4">
            {YACHT_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-foam/10 bg-foam/[0.03] p-4"
              >
                <Icon name={s.icon} className="size-5 text-brass" />
                <div className="mt-3 font-display text-2xl text-sand">{s.value}</div>
                <div className="mt-0.5 text-xs uppercase tracking-wider text-sand/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <BookingButton size="md" />
            <LinkButton href="/photos" variant="outlineLight" size="md">
              See the gallery
            </LinkButton>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 mt-20 border-t border-foam/10 pt-14 lg:mt-28">
        <Stagger className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {YACHT_FEATURES.map((f) => (
            <StaggerItem key={f.title} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10">
                <Icon name={f.icon} className="size-5 text-brass" />
              </div>
              <div>
                <h3 className="font-display text-lg text-sand">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sand/65">
                  {f.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
