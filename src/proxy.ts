/**
 * Proxy — Next.js 16's renamed Middleware. (Middleware → Proxy in v16; the file
 * MUST be `proxy.ts`, not `middleware.ts`. See node_modules/next/dist/docs/
 * 01-app/01-getting-started/16-proxy.md.) Runs on the Node.js runtime before a
 * request is completed.
 *
 * This is an OPTIMISTIC gate only — it reads the signed session cookie and turns
 * away obviously-unauthenticated traffic. The AUTHORITATIVE check lives in the
 * DAL (src/lib/auth/dal.ts), which every dashboard page and API route invokes.
 * Two protected surfaces, two behaviours:
 *   • /dashboard/*     → redirect to /login (remembering the intended path)
 *   • /api/dashboard/* → 401 JSON (an API client shouldn't get an HTML redirect)
 * A signed-in user landing on /login is forwarded to /dashboard.
 *
 * Note: `runtime` config is not allowed in Proxy and would throw, so it's
 * intentionally absent. The token verifier is self-contained (no next/headers,
 * no node:* imports) and treats a missing AUTH_SECRET as "unauthenticated"
 * rather than throwing, so /login stays reachable even when misconfigured.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  const isDashboardApi =
    pathname === "/api/dashboard" || pathname.startsWith("/api/dashboard/");
  const isDashboardPage =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isLogin = pathname === "/login";

  // Protect the dashboard API — JSON 401, never an HTML redirect.
  if (isDashboardApi && !session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  // Protect dashboard pages — redirect to login, remembering the destination.
  if (isDashboardPage && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already authenticated and visiting /login → straight to the dashboard.
  if (isLogin && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/api/dashboard",
    "/api/dashboard/:path*",
    "/login",
  ],
};
