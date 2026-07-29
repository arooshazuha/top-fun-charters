import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { LinkButton } from "@/components/ui/Button";
import { CaptainCard } from "@/components/captains/CaptainCard";
import { CAPTAINS } from "@/data/captains";

export function CaptainsPreview() {
  const featured = CAPTAINS.slice(0, 4);

  return (
    <Section tone="sand-2" spacing="lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Your Crew"
          title="Captains who call these waters home"
          intro="Every charter runs with a professional captain at the helm. They know the tides, the wildlife and the quiet corners most visitors never find."
        />
        <div className="hidden shrink-0 md:block">
          <LinkButton href="/captains" variant="outline" size="md">
            Meet all {CAPTAINS.length} captains
          </LinkButton>
        </div>
      </div>

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
        {featured.map((c) => (
          <StaggerItem key={c.slug}>
            <CaptainCard captain={c} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-10 md:hidden">
        <LinkButton href="/captains" variant="outline" size="md" className="w-full">
          Meet all {CAPTAINS.length} captains
        </LinkButton>
      </div>
    </Section>
  );
}
