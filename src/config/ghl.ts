/**
 * GoHighLevel / LeadConnector integration layer.
 *
 * GoHighLevel remains the operational backend for booking, calendars, forms and
 * lead capture. Every URL below is verified from the existing website. Keep ALL
 * GHL/LeadConnector URLs in this file, never scatter them through components.
 */
import { SITE } from "@/config/site";

export const GHL = {
  /** Primary booking calendar, powers the "Check pricing and availability" CTA. */
  bookingCalendar: "https://api.leadconnectorhq.com/booking/top-fun-charters",

  /** Embeddable LeadConnector widget forms (verified ids). */
  forms: {
    waiver: "https://api.leadconnectorhq.com/widget/form/Ax5emYN27Ij6Q6buJBRq",
    sixPersonCharter:
      "https://api.leadconnectorhq.com/widget/form/CB7bbOmWyiviBZmVnIU7",
    thirteenPersonCharter:
      "https://api.leadconnectorhq.com/widget/form/2i9KRLZvAf0mLF48rFBa",
    /**
     * Retained for reference only. The standalone "13-person + captain" form is
     * no longer surfaced; captain selection is now a dedicated step inside the
     * 7-13 guest workflow (see FormsDirectory + /forms#captain-selection).
     */
    thirteenPersonWithCaptain:
      "https://api.leadconnectorhq.com/widget/form/iXuzJy92DxXXhg3fIgiE",
  },

  /* ------------------------------------------------------------------ *
   * Phase 3, Charter data model wiring.
   *
   * The values below are configuration ids from the GHL sub-account, not
   * verified business facts. Replace every `{{PLACEHOLDER}}` with the real id
   * once the pipeline, custom objects and inbound webhooks exist in GHL.
   * See PHASE_3_CHARTER_DATA_MODEL.md for how each one is used.
   *
   * Webhook URLs carry a capture token, if you'd rather not commit them, read
   * them from env instead, e.g. `process.env.GHL_WEBHOOK_DEPOSIT ?? "{{...}}"`.
   * ------------------------------------------------------------------ */

  /** Inbound webhook endpoints the Next.js Square handlers POST to. */
  webhooks: {
    /** Fired on Square deposit success → WF-1 (Create/Update Charter). */
    charterDepositPaid: "{{INBOUND_WEBHOOK_URL_DEPOSIT}}",
    /** Fired on Square final-balance payment → WF-7 (Final Payment). */
    charterFinalPaid: "{{INBOUND_WEBHOOK_URL_FINAL}}",
  },

  /** GHL Custom Object keys (stable, prefixed with `custom_objects.`). */
  objects: {
    charter: "custom_objects.charter",
    captain: "custom_objects.captain",
  },

  /** The lean 5-stage "Charters" opportunity pipeline. */
  pipeline: {
    chartersId: "{{CHARTERS_PIPELINE_ID}}",
    stages: {
      inquiry: "{{STAGE_INQUIRY}}",
      quoted: "{{STAGE_QUOTED}}",
      depositPaidConfirmed: "{{STAGE_CONFIRMED}}",
      readyForCharter: "{{STAGE_READY}}",
      complete: "{{STAGE_COMPLETE}}",
    },
  },
} as const;

export type GhlFormKey = keyof typeof GHL.forms;
/** Pipeline stage keys, use for typed stage lookups in webhook routing. */
export type GhlPipelineStage = keyof typeof GHL.pipeline.stages;

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
 * fires AFTER a successful submission is configured inside GoHighLevel, not in
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
