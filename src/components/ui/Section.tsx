import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "sand" | "sand-2" | "ink" | "deep";

const toneClasses: Record<Tone, string> = {
  sand: "bg-sand text-ink",
  "sand-2": "bg-sand-200 text-ink",
  ink: "bg-ink text-sand",
  deep: "bg-deep text-sand",
};

export function Section({
  as: Tag = "section",
  id,
  tone = "sand",
  className,
  containerClassName,
  container = true,
  spacing = "lg",
  children,
}: {
  as?: ElementType;
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  container?: boolean;
  spacing?: "sm" | "md" | "lg" | "none";
  children: ReactNode;
}) {
  const pad =
    spacing === "none"
      ? ""
      : spacing === "sm"
        ? "py-14 md:py-20"
        : spacing === "md"
          ? "py-20 md:py-28"
          : "py-24 md:py-36";

  return createElement(
    Tag,
    {
      id,
      className: cn("relative scroll-mt-24", toneClasses[tone], pad, className),
    },
    container ? (
      <div className={cn("container-x", containerClassName)}>{children}</div>
    ) : (
      children
    ),
  );
}
