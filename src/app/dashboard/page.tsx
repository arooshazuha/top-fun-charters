import { OverviewView } from "@/components/dashboard/OverviewView";
import { verifySession } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard/service";

// Reads the session cookie + live data — always per-request, never cached.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await verifySession();
  const data = await getDashboardData({
    role: session.role,
    captainSlug: session.captainSlug,
  });

  return <OverviewView data={data} />;
}
