import { Ship, Compass, Anchor, CalendarCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const PILLARS = [
  {
    icon: Ship,
    title: "The whole boat, just your group",
    text: "No strangers, no sharing. Up to 13 guests and the run of a 50-foot yacht for 4, 6 or 8 hours.",
  },
  {
    icon: Compass,
    title: "Captains who know these waters",
    text: "Local captains who read the tide, find the dolphins and know where the good sandbars are.",
  },
  {
    icon: Anchor,
    title: "Set up for a real day out",
    text: "Two staterooms, two baths, a full galley and a swim platform — comfort from the dock and back.",
  },
  {
    icon: CalendarCheck,
    title: "Simple, private booking",
    text: "Check live availability, choose your hours, and your day is on the calendar in minutes.",
  },
];

export function WhyUs() {
  return (
    <Section id="why" tone="sand" spacing="lg">
      <div className="max-w-4xl">
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 text-brass-600">
            <span className="h-px w-6 bg-current opacity-60" aria-hidden />
            Why Top Fun
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 text-balance font-display text-[clamp(1.8rem,3.8vw,3rem)] font-light leading-[1.12] text-ink">
            There are plenty of boats for hire on Anna Maria Island. There&apos;s
            only one that&apos;s <em className="italic text-brass-600">yours </em> for
            the whole day — captain, crew, and a fifty-foot deck with nowhere
            you&apos;d rather be.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {PILLARS.map(({ icon: Icon, title, text }) => (
          <StaggerItem key={title} className="border-t border-line pt-6">
            <Icon className="size-6 text-brass-600" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
