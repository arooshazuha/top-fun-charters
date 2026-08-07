/**
 * Credential verification. SERVER-ONLY.
 *
 * There is no user database — this is a small internal console gated by shared
 * passcodes held in environment variables, matching the app's existing
 * shared-secret pattern (see src/app/api/charter/deposit/route.ts). Passwords
 * are compared in constant time via fixed-length SHA-256 digests, so neither
 * the value nor its length leaks through timing.
 */
import { createHash, timingSafeEqual } from "node:crypto";

import { serverEnv } from "@/env";

import type { Principal } from "./session";

/** Constant-time, length-independent equality on two secret strings. */
function safeEqual(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/**
 * Resolve a submitted passcode to a principal, or `null` if it matches nothing.
 * Both configured passcodes are always checked so a match on the first doesn't
 * change timing relative to a match on the second.
 */
export function authenticate(password: string): Principal | null {
  const { ADMIN_PASSWORD, CAPTAIN_PASSWORD, CAPTAIN_SLUG } = serverEnv();

  const ownerMatch = ADMIN_PASSWORD ? safeEqual(password, ADMIN_PASSWORD) : false;
  const captainMatch = CAPTAIN_PASSWORD
    ? safeEqual(password, CAPTAIN_PASSWORD)
    : false;

  if (ownerMatch) {
    return { sub: "owner", role: "owner" };
  }
  if (captainMatch) {
    return {
      sub: CAPTAIN_SLUG ?? "captain",
      role: "captain",
      ...(CAPTAIN_SLUG ? { captainSlug: CAPTAIN_SLUG } : {}),
    };
  }
  return null;
}
