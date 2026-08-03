"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRIMARY_CTA_LABEL } from "@/config/ghl";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import {
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "@/lib/button-variants";

type Props = {
  label?: string;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  event?: AnalyticsEvent;
  showArrow?: boolean;
};

/**
 * The site-wide primary CTA and first step of the booking funnel.
 *
 * By default it says "Check pricing and availability" and routes INTERNALLY to
 * the pricing page (`/pricing`), where the guest then taps "Check availability"
 * to open the GHL booking calendar. Pass an absolute `http(s)` href (e.g.
 * `bookingUrl()`) to link straight out to GHL instead, those open in a new tab.
 *
 * Centralised so the label + destination live in one place (see config/ghl.ts).
 */
export function BookingButton({
  label = PRIMARY_CTA_LABEL,
  href = "/pricing",
  variant = "primary",
  size = "lg",
  className,
  event = "booking_cta_click",
  showArrow = true,
}: Props) {
  const external = /^https?:\/\//.test(href);
  const classes = buttonVariants({ variant, size, className });

  const inner = (
    <>
      <span>{label}</span>
      {showArrow && (
        <ArrowRight
          className="size-[1.1em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </>
  );

  // External (GHL) destinations open safely in a new tab.
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track(event, { label })}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  // Internal funnel step, client-side navigation, same tab.
  return (
    <Link href={href} onClick={() => track(event, { label })} className={classes}>
      {inner}
    </Link>
  );
}
