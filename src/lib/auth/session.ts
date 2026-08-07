/**
 * Session cookie management. SERVER-ONLY — imports `next/headers`, so never
 * pull this into a client component.
 *
 * Sets the signed session token with the hardened flags required by the brief:
 * HttpOnly (no JS access → XSS can't read it), Secure (HTTPS-only in
 * production), SameSite=Lax (CSRF mitigation), Path=/ and a bounded expiry.
 */
import { cookies } from "next/headers";

import { serverEnv } from "@/env";

import type { Role } from "./roles";
import {
  SESSION_COOKIE,
  signSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "./token";

export type Principal = {
  sub: string;
  role: Role;
  captainSlug?: string;
};

/** Issue a fresh session cookie for the given principal. */
export async function createSession(principal: Principal): Promise<void> {
  const ttlHours = serverEnv().DASHBOARD_SESSION_TTL_HOURS;
  const now = Math.floor(Date.now() / 1000);
  const exp = now + ttlHours * 3600;

  const token = await signSessionToken({
    sub: principal.sub,
    role: principal.role,
    ...(principal.captainSlug ? { captainSlug: principal.captainSlug } : {}),
    iat: now,
    exp,
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    // Secure only in production so login works over http://localhost in dev.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(exp * 1000),
  });
}

/** Read + verify the current session, or `null`. */
export async function readSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Clear the session cookie (logout). */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
