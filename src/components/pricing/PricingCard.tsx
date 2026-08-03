import { Check, ArrowUpRight } from "lucide-react";
import type { PricingTier } from "@/data/pricing";
import { GHL, bookingUrl } from "@/config/ghl";
import { BookingButton } from "@/components/booking/BookingButton";
import { cn } from "@/lib/utils";

export function PricingCard({ tier }: { tier: PricingTier }) {
  const featured = !!tier.featured;
  const from = Math.min(...tier.options.map((o) => o.price));
  const formUrl = GHL.forms[tier.formKey];

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border p-6 md:p-8",
        featured
          ? "border-brass/40 bg-ink text-sand shadow-[var(--shadow-float)]"
          : "border-line bg-sand-100 text-ink shadow-[var(--shadow-card)]",
      )}
    >
      {featured && (
        <span className="absolute right-5 top-5 rounded-full bg-brass px-3 py-1 text-xs font-semibold text-ink">
          Most popular
        </span>
      )}

      <h3 className={cn("font-display text-2xl", featured ? "text-sand" : "text-ink")}>
        {tier.name}
      </h3>
      <p className={cn("mt-1 text-sm font-medium", featured ? "text-brass-300" : "text-brass-600")}>
        {tier.guests}
      </p>
      <p className={cn("mt-4 text-sm leading-relaxed", featured ? "text-sand/70" : "text-muted")}>
        {tier.summary}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className={cn("text-sm", featured ? "text-sand/60" : "text-muted")}>from</span>
        <span className="font-display text-4xl">${from.toLocaleString()}</span>
      </div>

      <ul className={cn("mt-5 divide-y", featured ? "divide-foam/10" : "divide-line")}>
        {tier.options.map((o) => (
          <li key={o.duration} className="flex items-center justify-between py-2.5 text-sm">
            <span className={cn("flex items-center gap-2", featured ? "text-sand/80" : "text-ink/80")}>
              {o.duration}
              {o.hours === 4 && (
                <span className="rounded-full bg-warm px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-ink">
                  Sweet spot
                </span>
              )}
            </span>
            <span className="font-semibold">${o.price.toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 space-y-2.5">
        {tier.includes.map((inc) => (
          <li key={inc} className="flex items-start gap-2.5 text-sm">
            <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-brass-300" : "text-brass-600")} />
            <span className={featured ? "text-sand/80" : "text-ink/80"}>{inc}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 pt-2">
        {/* Pricing cards ARE the "checked pricing" step, link straight to the
            GHL booking calendar so guests can check live availability. */}
        <BookingButton
          label="Check availability"
          href={bookingUrl()}
          size="md"
          variant={featured ? "primary" : "dark"}
          className="w-full"
          event="availability_cta_click"
        />
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-1 text-sm font-medium transition-colors",
            featured ? "text-sand/70 hover:text-brass-300" : "text-muted hover:text-brass-600",
          )}
        >
          Open the {tier.id === "1-6" ? "6" : "13"}-person charter form
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
