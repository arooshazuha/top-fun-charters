/**
 * Route-handler guard. SERVER-ONLY. The authoritative access check for the
 * dashboard API — verifies the session, enforces the role, and applies the
 * per-identity rate limit, returning a ready-made error `Response` when any
 * check fails. (Proxy is only an optimistic first pass; this runs close to the
 * data as the Next.js security guide recommends.)
 */
import { serverEnv } from "@/env";
import { getSession, type SessionPayload } from "@/lib/auth";

import { rateLimit } from "./rate-limit";

/** First hop of X-Forwarded-For, or a sensible fallback. */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export type GuardResult =
  | { ok: true; session: SessionPayload }
  | { ok: false; response: Response };

export async function guard(
  request: Request,
  opts: { owner?: boolean } = {},
): Promise<GuardResult> {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      response: Response.json({ ok: false, error: "unauthorized" }, { status: 401 }),
    };
  }

  // Financial endpoints are owner-only; a captain is forbidden, not redirected.
  if (opts.owner && session.role !== "owner") {
    return {
      ok: false,
      response: Response.json({ ok: false, error: "forbidden" }, { status: 403 }),
    };
  }

  const limit = serverEnv().DASHBOARD_RATE_LIMIT_PER_MIN;
  const identifier = `${session.role}:${session.sub}:${clientIp(request)}`;
  const rl = rateLimit(identifier, limit);
  if (!rl.allowed) {
    return {
      ok: false,
      response: Response.json(
        { ok: false, error: "rate_limited" },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))),
            "X-RateLimit-Limit": String(rl.limit),
            "X-RateLimit-Remaining": String(rl.remaining),
          },
        },
      ),
    };
  }

  return { ok: true, session };
}
