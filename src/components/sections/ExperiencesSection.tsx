import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { LinkButton } from "@/components/ui/Button";
import { BookingButton } from "@/components/booking/BookingButton";
import { Icon } from "@/lib/icons";
import { EXPERIENCES } from "@/data/experiences";
import { cn } from "@/lib/utils";

function ExperienceCard({
  exp,
  featured,
}: {
  exp: (typeof EXPERIENCES)[number];
  featured?: boolean;
}) {
  return (
    <StaggerItem
      className={cn(
        "min-h-[220px]",
        featured && "sm:col-span-2 sm:row-span-2",
      )}
    >
      <article className="group relative h-full overflow-hidden rounded-lg bg-ink">
        <Image
          src={exp.image}
          alt={exp.imageAlt}
          fill
          quality={75}
          sizes={featured ? "(max-width: 640px) 100vw, 55vw" : "(max-width: 640px) 100vw, 30vw"}
          className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-5 md:p-6">
          <Icon
            name={exp.icon}
            className={cn("text-brass-300", featured ? "size-7" : "size-6")}
            strokeWidth={1.5}
          />
          <h3
            className={cn(
              "mt-3 font-display text-foam",
              featured ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {exp.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 max-w-md text-sm leading-relaxed text-sand/80",
              featured ? "line-clamp-4" : "line-clamp-2",
            )}
          >
            {exp.blurb}
          </p>
        </div>
      </article>
    </StaggerItem>
  );
}

export function ExperiencesSection() {
  return (
    <Section id="experiences" tone="sand" spacing="lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="On the Water"
          title="Ways to spend your day"
          intro="Every charter is private and yours to shape. Here's how most days begin. Mix and match with your captain."
        />
        <div className="hidden md:block">
          <LinkButton href="/photos" variant="outline" size="md">
            Browse the gallery
          </LinkButton>
        </div>
      </div>

      <Stagger className="mt-12 grid auto-rows-[minmax(200px,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.slug} exp={exp} featured={i === 0} />
        ))}
      </Stagger>

      <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <BookingButton size="md" />
        <p className="text-sm text-muted">
          Not sure which trip fits? Your captain will help you plan it.
        </p>
      </div>
    </Section>
  );
}
