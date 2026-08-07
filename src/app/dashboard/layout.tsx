import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { verifySession } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    default: "Operations Console",
    template: "%s · Ops Console",
  },
  // Internal console — never index.
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Authoritative gate for the chrome; every page re-checks at its data source.
  const session = await verifySession();

  return (
    <div className="min-h-dvh bg-sand-100 text-ink">
      <DashboardHeader role={session.role} />
      <main id="main" className="container-x py-8">
        {children}
      </main>
    </div>
  );
}
