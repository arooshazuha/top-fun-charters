/**
 * Charter deposit, core logic (integration-agnostic).
 *
 * These three functions are identical no matter how Square collects the
 * deposit (payment link + webhook, Web Payments charge, or invoice). The
 * Square-specific step is the seam in the route handler that produces a
 * `DepositInput`; everything below is stable.
 */
import { createHash } from "node:crypto";

import { GHL } from "@/config/ghl";
import { FULL_ADDRESS } from "@/config/site";
import { YACHT } from "@/data/yacht";

import type { CharterDepositPayload, CharterType, DepositInput } from "./types";

/** Default vessel, single boat today, object-ready for a fleet later. */
const VESSEL_ID = "topfun-50";
const VESSEL_NAME = `${YACHT.name} (${YACHT.lengthFt}ft Luxury Yacht)`;

/** Thrown when the GHL webhook rejects the delivery (non-2xx). */
export class GhlDeliveryError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: string,
  ) {
    super(`GHL webhook returned ${status}`);
    this.name = "GhlDeliveryError";
  }
}

function guestBandLabel(type: CharterType): string {
  return type === "captained_1_6" ? "1-6" : "7-13";
}

/**
 * Deterministic charter reference: `TFC-2026-0815-<hash6>`.
 *
 * Derived from (email + date + start time) so a retried Square webhook
 * produces the SAME ref, this is the idempotency anchor the GHL upsert keys
 * on. If you later add a datastore, swap this for a per-day sequence.
 */
export function mintCharterRef(input: DepositInput): string {
  const { charterDate, startTime } = input.charter;
  const seed = `${input.contact.email.toLowerCase()}|${charterDate}|${startTime}`;
  const hash = createHash("sha256")
    .update(seed)
    .digest("base64url")
    .replace(/[-_]/g, "")
    .slice(0, 6)
    .toUpperCase();
  const [y, m, d] = charterDate.split("-");
  return `TFC-${y}-${m}${d}-${hash}`;
}

/**
 * Build the `charter.deposit_paid` payload (§2a) from validated input.
 * `sentAt` is injectable so this stays pure/testable.
 */
export function buildDepositPayload(
  input: DepositInput,
  opts: { sentAt?: string } = {},
): CharterDepositPayload {
  const { contact, charter, payment } = input;
  const charterRef = mintCharterRef(input);
  const charterName = `${contact.lastName}, ${charter.charterDate}, ${charter.durationHours}hr (${guestBandLabel(charter.charterType)})`;

  return {
    event: "charter.deposit_paid",
    version: "1.0",
    source: "topfuncharters-nextjs",
    idempotencyKey: `${payment.processor}:${payment.paymentId}`,
    sentAt: opts.sentAt ?? new Date().toISOString(),
    locationId: process.env.GHL_LOCATION_ID ?? "",

    contact: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      tags: ["charter-lead", "deposit-paid"],
    },

    charter: {
      charterRef,
      charterName,
      charterDate: charter.charterDate,
      startTime: charter.startTime,
      durationHours: charter.durationHours,
      guestCount: charter.guestCount,
      charterType: charter.charterType,
      vesselId: VESSEL_ID,
      vesselName: VESSEL_NAME,
      pickupLocation: charter.pickupLocation ?? FULL_ADDRESS,
      assignedCaptainId: charter.assignedCaptainId ?? null,
      pricing: {
        currency: charter.pricing.currency,
        totalAmount: charter.pricing.totalAmount,
        depositAmount: charter.pricing.depositAmount,
        balanceDue: charter.pricing.balanceDue,
      },
    },

    payment: {
      processor: "square",
      type: "deposit",
      status: payment.status,
      paymentId: payment.paymentId,
      orderId: payment.orderId,
      invoiceUrl: payment.invoiceUrl,
      receiptUrl: payment.receiptUrl,
      amount: payment.amount,
      currency: payment.currency,
      paidAt: payment.paidAt,
    },

    routing: {
      pipelineId: GHL.pipeline.chartersId,
      targetStage: "deposit_paid_confirmed",
      assetObjectKey: GHL.objects.charter,
    },
  };
}

/**
 * POST the payload to the GHL/n8n inbound webhook. Prefers the
 * `GHL_WEBHOOK_DEPOSIT` env var, falling back to the config placeholder; an
 * optional `GHL_WEBHOOK_TOKEN` is sent as a bearer credential if present.
 */
export async function sendDepositToGhl(
  payload: CharterDepositPayload,
): Promise<{ status: number; body: string }> {
  const url = process.env.GHL_WEBHOOK_DEPOSIT ?? GHL.webhooks.charterDepositPaid;
  if (!url || url.includes("{{")) {
    throw new Error(
      "GHL deposit webhook is not configured, set GHL_WEBHOOK_DEPOSIT or fill GHL.webhooks.charterDepositPaid.",
    );
  }

  const token = process.env.GHL_WEBHOOK_TOKEN;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  if (!res.ok) throw new GhlDeliveryError(res.status, body);
  return { status: res.status, body };
}
