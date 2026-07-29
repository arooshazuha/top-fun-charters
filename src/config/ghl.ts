/**
 * GoHighLevel / LeadConnector integration layer.
 *
 * GoHighLevel remains the operational backend for booking, calendars, forms and
 * lead capture. Every URL below is verified from the existing website. Keep ALL
 * GHL/LeadConnector URLs in this file — never scatter them through components.
 */
import { SITE } from "@/config/site";

export const GHL = {
  /** Primary booking calendar — powers the "Check pricing and availability" CTA. */
  bookingCalendar: "https://api.leadconnectorhq.com/booking/top-fun-charters",

  /** Embeddable LeadConnector widget forms (verified ids). */
  forms: {
    waiver: "https://api.leadconnectorhq.com/widget/form/Ax5emYN27Ij6Q6buJBRq",
    sixPersonCharter:
      "https://api.leadconnectorhq.com/widget/form/CB7bbOmWyiviBZmVnIU7",
    thirteenPersonCharter:
      "https://api.leadconnectorhq.com/widget/form/2i9KRLZvAf0mLF48rFBa",
    thirteenPersonWithCaptain:
      "https://api.leadconnectorhq.com/widget/form/iXuzJy92DxXXhg3fIgiE",
  },
} as const;

export type GhlFormKey = keyof typeof GHL.forms;

/**
 * Canonical CTA target. Everything that says "book / check availability" should
 * resolve through here so the destination can change in exactly one place.
 */
export function bookingUrl(): string {
  return GHL.bookingCalendar;
}

/** The primary CTA label used site-wide (per brief). */
export const PRIMARY_CTA_LABEL = "Check pricing and availability";

/* ------------------------------------------------------------------ *
 * Post-submission redirect (branded Thank You page)
 *
 * GHL forms & calendars are hosted by LeadConnector, so the redirect that
 * fires AFTER a successful submission is configured inside GoHighLevel — not in
 * our React code. This is the single canonical destination to paste into each
 * form's builder so every submission lands on our branded page:
 *
 *   For each LeadConnector form  → Settings → On Submit → "Open URL" (Redirect)
 *   For the booking calendar     → Booking widget → Confirmation → Redirect URL
 *   Set the value to `thankYouUrl` (below).
 *
 * If a form is ever embedded on-site via iframe instead of linked out, GHL will
 * still honor this same redirect, so the guest experience stays seamless.
 * ------------------------------------------------------------------ */

/** Path of the branded confirmation page (`app/thank-you`). */
export const THANK_YOU_PATH = "/thank-you";

/** Absolute URL to set as the redirect in every GHL form + calendar. */
export const thankYouUrl = `${SITE.url}${THANK_YOU_PATH}`;
