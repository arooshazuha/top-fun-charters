/**
 * GET /api/dashboard — the dashboard data endpoint.
 *
 * Security: protected by Proxy (optimistic) AND by `guard()` here (authoritative
 * session + role + rate-limit). Query params are Zod-validated. The GHL API key
 * never leaves the server — data is fetched server-side via the GHL client. The
 * payload is role-scoped in the service: captains receive no financial data and
 * only their own assignments.
 */
import type { NextRequest } from "next/server";

import { getDashboardData } from "@/lib/dashboard/service";
import { DashboardQuerySchema } from "@/lib/dashboard/types";
import { guard } from "@/lib/dashboard/guard";

export const runtime = "nodejs"; // GHL client + crypto rely on Node APIs
export const dynamic = "force-dynamic"; // per-request, never cached

export async function GET(request: NextRequest) {
  const gate = await guard(request);
  if (!gate.ok) return gate.response;

  const params = new URL(request.url).searchParams;
  const parsed = DashboardQuerySchema.safeParse({
    view: params.get("view") ?? undefined,
    date: params.get("date") ?? undefined,
  });
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const data = await getDashboardData({
    role: gate.session.role,
    captainSlug: gate.session.captainSlug,
    date: parsed.data.date,
  });

  return Response.json({ ok: true, data }, { headers: { "Cache-Control": "no-store" } });
}
