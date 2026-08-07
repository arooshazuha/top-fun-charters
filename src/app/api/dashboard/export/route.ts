/**
 * GET /api/dashboard/export — "Download CSV for Taxes".
 *
 * OWNER-ONLY (financial data): `guard(..., { owner: true })` returns 403 for
 * captains. Optional `?from=YYYY-MM-DD&to=YYYY-MM-DD` range, Zod-validated.
 * Streams a CSV attachment with the 1–6 non-taxable vs 7–13 taxable split and
 * the 7% tax computed per line.
 */
import type { NextRequest } from "next/server";

import { chartersToTaxCsv } from "@/lib/dashboard/csv";
import { getChartersForExport } from "@/lib/dashboard/service";
import { ExportQuerySchema } from "@/lib/dashboard/types";
import { guard } from "@/lib/dashboard/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const gate = await guard(request, { owner: true });
  if (!gate.ok) return gate.response;

  const params = new URL(request.url).searchParams;
  const parsed = ExportQuerySchema.safeParse({
    from: params.get("from") ?? undefined,
    to: params.get("to") ?? undefined,
  });
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { charters, rate } = await getChartersForExport(parsed.data);
  const csv = chartersToTaxCsv(charters, rate);
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="top-fun-charters-tax-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
