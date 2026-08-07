import type { Metadata } from "next";

import { FinancialsView } from "@/components/dashboard/FinancialsView";
import { requireOwner } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard/service";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Financials & Tax" };

export default async function FinancialsPage() {
  // Owner-only: captains are redirected back to the overview.
  await requireOwner();
  const data = await getDashboardData({ role: "owner" });

  return <FinancialsView data={data} />;
}
