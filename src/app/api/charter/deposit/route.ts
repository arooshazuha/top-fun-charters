/**
 * POST /api/charter/deposit
 *
 * Receives a collected Square deposit, mints the deterministic charter_ref,
 * builds the `charter.deposit_paid` payload and forwards it to GHL (WF-1).
 *
 * ── Square seam ─────────────────────────────────────────────────────────
 * The auth check below is a shared-secret PLACEHOLDER. When the Square
 * collection method is locked in, replace `assertAuthorized` with the real
 * verification for that method:
 *   • Payment Link / Invoice webhook → verify the `x-square-hmacsha256-signature`
 *     header against SQUARE_WEBHOOK_SIGNATURE_KEY, then map the event to DepositInput.
 *   • Web Payments SDK charge → charge the token via the Square Payments API
 *     server-side first, then build DepositInput from the payment result.
 * The core (validate → build → send) does not change either way.
 * ────────────────────────────────────────────────────────────────────────
 */
import { timingSafeEqual } from "node:crypto";

import type { NextRequest } from "next/server";

import {
  buildDepositPayload,
  DepositInputSchema,
  GhlDeliveryError,
  sendDepositToGhl,
} from "@/lib/ghl";

export const runtime = "nodejs"; // relies on node:crypto
export const dynamic = "force-dynamic"; // never cache; every deposit is unique

/** Constant-time secret compare (placeholder auth, see Square seam above). */
function assertAuthorized(request: NextRequest): boolean {
  const secret = process.env.CHARTER_WEBHOOK_SECRET;
  if (!secret) return true; // unset ⇒ open (dev only, set it before go-live)
  const provided = request.headers.get("x-charter-secret") ?? "";
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!assertAuthorized(request)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = DepositInputSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  try {
    const payload = buildDepositPayload(parsed.data);
    await sendDepositToGhl(payload);
    return Response.json(
      {
        ok: true,
        charterRef: payload.charter.charterRef,
        idempotencyKey: payload.idempotencyKey,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("[api/charter/deposit]", err);
    // GHL rejected the delivery (bad gateway) vs. our own misconfig (500).
    const status = err instanceof GhlDeliveryError ? 502 : 500;
    return Response.json(
      { ok: false, error: "unable to deliver charter to GHL" },
      { status },
    );
  }
}
