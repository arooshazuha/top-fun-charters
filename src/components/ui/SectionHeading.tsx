import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  as: TitleTag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  /** "dark" = for light backgrounds, "light" = for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "eyebrow inline-flex items-center gap-2",
              isLight ? "text-brass-300" : "text-brass-600",
            )}
          >
            <span className="h-px w-6 bg-current opacity-60" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <TitleTag
          className={cn(
            "mt-4 text-balance text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.05]",
            isLight ? "text-sand" : "text-ink",
          )}
        >
          {title}
        </TitleTag>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-pretty text-base leading-relaxed md:text-lg",
              isLight ? "text-sand/75" : "text-muted",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
