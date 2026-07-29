"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  tone = "light",
  defaultOpen = 0,
  idPrefix = "faq",
}: {
  items: FaqItem[];
  tone?: "light" | "dark";
  defaultOpen?: number | null;
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<Set<number>>(
    new Set(defaultOpen === null ? [] : [defaultOpen]),
  );
  const dark = tone === "dark";

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn("divide-y", dark ? "divide-foam/10" : "divide-line")}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-btn-${i}`}
                className={cn(
                  "flex w-full items-center justify-between gap-4 py-5 text-left transition-colors",
                  dark ? "text-sand hover:text-brass-300" : "text-ink hover:text-brass-600",
                )}
              >
                <span className="font-display text-lg md:text-xl">{item.question}</span>
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    dark ? "border-foam/20" : "border-line",
                    isOpen && "rotate-45 border-brass bg-brass text-ink",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${idPrefix}-panel-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-btn-${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "max-w-2xl pb-6 pr-10 text-[0.95rem] leading-relaxed",
                    dark ? "text-sand/70" : "text-muted",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
