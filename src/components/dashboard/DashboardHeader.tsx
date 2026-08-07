/**
 * Dashboard chrome: brand mark, role-aware nav, role badge and sign-out.
 * Server component — the sign-out button posts the `logout` Server Action.
 */
import { Anchor, LogOut } from "lucide-react";

import { logout } from "@/app/login/actions";
import { SITE } from "@/config/site";
import { canViewFinancials, roleLabel, type Role } from "@/lib/auth/roles";

import { DashboardNav } from "./DashboardNav";

export function DashboardHeader({ role }: { role: Role }) {
  const canFinancials = canViewFinancials(role);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-brass-300">
            <Anchor className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">{SITE.name}</p>
            <p className="text-xs text-muted">Operations Console</p>
          </div>
        </div>

        <div className="hidden md:block">
          <DashboardNav canViewFinancials={canFinancials} />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-sand-100 px-3 py-1 text-xs font-medium text-muted sm:inline-flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {roleLabel(role)}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-sand-200 hover:text-ink"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </div>

      {/* Nav drops below the bar on small screens. */}
      <div className="container-x pb-3 md:hidden">
        <DashboardNav canViewFinancials={canFinancials} />
      </div>
    </header>
  );
}
