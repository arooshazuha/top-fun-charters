/**
 * Typed, validated access to server-side environment variables.
 *
 * SERVER-ONLY. Never import this from a client component — it exposes secrets
 * (auth signing key, GHL API key, admin/captain passcodes) that must never
 * reach the browser bundle. Validation is lazy (first access) and does NOT
 * throw at import time, so `next build` succeeds without a populated `.env`;
 * any consumer that needs a value which is absent surfaces a clear runtime
 * error at its own point of use instead.
 *
 * `AUTH_SECRET` also accepts the legacy `NEXTAUTH_SECRET` name for
 * compatibility with the requested `.env.example` template.
 */
import { z } from "zod";

const EnvSchema = z.object({
  // ---- Auth (native signed-cookie sessions) ----
  /** HMAC signing key for session tokens. 32+ chars: `openssl rand -base64 32`. */
  AUTH_SECRET: z.string().optional(),
  /** Owner passcode — full access incl. financials. */
  ADMIN_PASSWORD: z.string().optional(),
  /** Optional captain passcode — enables the role-restricted captain view. */
  CAPTAIN_PASSWORD: z.string().optional(),
  /** Optional captain roster slug the captain passcode logs in as (scopes data). */
  CAPTAIN_SLUG: z.string().optional(),
  /** Session lifetime in hours. */
  DASHBOARD_SESSION_TTL_HOURS: z.coerce.number().int().positive().default(12),
  /** Per-identity request budget for dashboard API routes, per minute. */
  DASHBOARD_RATE_LIMIT_PER_MIN: z.coerce.number().int().positive().default(60),
  /**
   * Sales-tax rate applied to taxable 7–13 guest bareboat rentals. Defaults to
   * 0.07 (Florida 6% state + 1% Manatee County surtax) per the operator's
   * directive. Confirm the current rate/classification with your accountant.
   */
  DASHBOARD_TAX_RATE: z.coerce.number().min(0).max(1).default(0.07),

  // ---- GoHighLevel / LeadConnector read API (server-only) ----
  /** Private Integration token / API key. NEVER exposed to the client. */
  GHL_API_KEY: z.string().optional(),
  /** GHL sub-account location id (already used by the deposit webhook). */
  GHL_LOCATION_ID: z.string().optional(),
  /** API origin — override only for testing. */
  GHL_API_BASE: z.url().default("https://services.leadconnectorhq.com"),
  /** LeadConnector API version header. */
  GHL_API_VERSION: z.string().default("2021-07-28"),
});

export type ServerEnv = z.infer<typeof EnvSchema>;

let cached: ServerEnv | null = null;

/** Parse + cache `process.env`. Throws only on structurally-invalid values. */
export function serverEnv(): ServerEnv {
  if (cached) return cached;
  const source = {
    ...process.env,
    // Accept NEXTAUTH_SECRET as an alias for AUTH_SECRET.
    AUTH_SECRET: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  };
  const parsed = EnvSchema.safeParse(source);
  if (!parsed.success) {
    console.error(
      "[env] invalid environment configuration:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid server environment configuration — see server logs.");
  }
  cached = parsed.data;
  return cached;
}

/** True when the GHL read API is fully configured (key + location). */
export function isGhlConfigured(): boolean {
  const e = serverEnv();
  return Boolean(e.GHL_API_KEY && e.GHL_LOCATION_ID);
}

/** True when at least one login passcode is set (auth is usable). */
export function isAuthConfigured(): boolean {
  const e = serverEnv();
  return Boolean(e.AUTH_SECRET && (e.ADMIN_PASSWORD || e.CAPTAIN_PASSWORD));
}
