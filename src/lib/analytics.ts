/**
 * Lightweight, provider-agnostic conversion tracking.
 *
 * This does NOT ship a tracker. It forwards named events to whatever is present
 * on the page (Google Tag Manager's dataLayer or gtag) and no-ops otherwise, so
 * analytics can be wired up later without touching components. No fake events.
 */

export type AnalyticsEvent =
  | "booking_cta_click"
  | "pricing_viewed"
  | "availability_cta_click"
  | "contact_started"
  | "contact_form_opened"
  | "calendar_opened"
  | "form_opened"
  | "ghl_flow_opened"
  | "phone_click"
  | "review_leave_click";

type Props = Record<string, string | number | boolean | undefined>;

interface WindowWithTrackers extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithTrackers;

  try {
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event, ...props });
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", event, props);
    }
    if (process.env.NODE_ENV === "development") {
      console.debug(`[analytics] ${event}`, props);
    }
  } catch {
    /* analytics must never break the UI */
  }
}
