/**
 * Data Access Layer — the real authorization gate for the dashboard.
 *
 * Every Server Component, Server Action and Route Handler that touches internal
 * data calls one of these. Proxy (src/proxy.ts) is only an optimistic first
 * pass; per the Next.js security guide the authoritative check must live close
 * to the data. Results are memoized per-request with React `cache`.
 */
import { cache } from "react";
import { redirect } from "next/navigation";

import { readSession } from "./session";
import type { SessionPayload } from "./token";

/** Verified session, or a redirect to /login. Use in pages/layouts/actions. */
export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await readSession();
  if (!session) redirect("/login");
  return session;
});

/** Verified session or `null`. Use in Route Handlers that return 401 as JSON. */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  return readSession();
});

/** Require the owner role; captains are bounced back to their dashboard. */
export const requireOwner = cache(async (): Promise<SessionPayload> => {
  const session = await verifySession();
  if (session.role !== "owner") redirect("/dashboard");
  return session;
});
