"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { Logo } from "@/components/layout/Logo";
import { BookingButton } from "@/components/booking/BookingButton";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]",
          solid
            ? "border-b border-line/70 bg-sand/85 shadow-[0_6px_30px_-18px_rgba(8,26,34,0.5)] backdrop-blur-xl"
            : "bg-transparent",
        )}
        style={{ height: "var(--header-h)" }}
      >
        {/* subtle scrim for legibility over the video hero */}
        {!solid && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 to-transparent"
          />
        )}

        <div className="container-x relative flex h-full items-center justify-between gap-4">
          {/* Logo — single source of truth by scroll state (color on the solid
              cream bar, cream over the dark hero). Deterministic → hydration-safe. */}
          <div className="flex items-center" style={{ height: 40 }}>
            <Logo variant={solid ? "color" : "cream"} height={40} priority linked={!open} />
          </div>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors",
                      solid
                        ? "text-ink/80 hover:text-ink"
                        : "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] hover:text-white",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown */}
                  <div className="invisible absolute left-0 top-full w-64 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-xl border border-line bg-sand-100 p-1.5 shadow-[var(--shadow-float)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          {...(child.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          onClick={() =>
                            child.external && track("form_opened", { form: child.label })
                          }
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-sand-200"
                        >
                          <span className="block text-sm font-medium text-ink">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 block text-xs text-muted">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors",
                    solid
                      ? "text-ink/80 hover:text-ink"
                      : "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href={SITE.phone.href}
              onClick={() => track("phone_click")}
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors xl:flex",
                solid
                  ? "text-ink/80 hover:text-brass-600"
                  : "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)] hover:text-brass-300",
              )}
            >
              <Phone className="size-4" />
              {SITE.phone.display}
            </a>

            <span className="hidden sm:inline-flex">
              <BookingButton
                size="sm"
                variant={solid ? "primary" : "outlineLight"}
                showArrow={false}
              />
            </span>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
                solid ? "text-ink hover:bg-sand-200" : "text-white hover:bg-white/10",
              )}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
