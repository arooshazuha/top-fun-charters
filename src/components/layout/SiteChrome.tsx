"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps the marketing Header/Footer so they render on the public site but NOT
 * on internal routes (the authenticated dashboard and the login screen), which
 * supply their own full-screen chrome. Header/Footer are passed as elements so
 * the marketing pages stay server-rendered/static; only this thin wrapper is a
 * client component (it reads the current path).
 */
const INTERNAL_PREFIXES = ["/dashboard", "/login"];

export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isInternal = INTERNAL_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (isInternal) return <>{children}</>;

  return (
    <>
      {header}
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
