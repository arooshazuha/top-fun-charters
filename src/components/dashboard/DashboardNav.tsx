"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt } from "lucide-react";

import { cn } from "@/lib/utils";

export function DashboardNav({ canViewFinancials }: { canViewFinancials: boolean }) {
  const pathname = usePathname();

  const items = [
    {
      href: "/dashboard",
      label: "Overview",
      Icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    ...(canViewFinancials
      ? [
          {
            href: "/dashboard/financials",
            label: "Financials & Tax",
            Icon: Receipt,
            active: pathname.startsWith("/dashboard/financials"),
          },
        ]
      : []),
  ];

  return (
    <nav aria-label="Dashboard" className="flex items-center gap-1">
      {items.map(({ href, label, Icon, active }) => (
        <Link
          key={href}
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
            active
              ? "bg-ink text-sand"
              : "text-muted hover:bg-sand-200 hover:text-ink",
          )}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
