"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X, Phone, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { SITE } from "@/config/site";
import { track } from "@/lib/analytics";
import { Logo } from "@/components/layout/Logo";
import { BookingButton } from "@/components/booking/BookingButton";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll lock + ESC + initial focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            id="mobile-nav"
            tabIndex={-1}
            className="grain absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink text-sand outline-none"
            variants={{
              hidden: { x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 },
              show: { x: 0, opacity: 1 },
            }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10 flex items-center justify-between border-b border-foam/10 px-5 py-4">
              <Logo variant="cream" height={34} linked={false} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full text-sand transition-colors hover:bg-foam/10"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="relative z-10 flex-1 overflow-y-auto px-5 py-6"
            >
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: reduce ? 0 : 20 },
                      show: { opacity: 1, x: 0 },
                    }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                    className="border-b border-foam/10"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-4 font-display text-2xl text-sand transition-colors hover:text-brass-300"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="-mt-1 mb-3 flex flex-col gap-1 pl-1">
                        {item.children
                          .filter((c) => c.external)
                          .map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                  track("form_opened", { form: child.label });
                                  onClose();
                                }}
                                className="flex items-center gap-1.5 py-1.5 text-sm text-sand/70 transition-colors hover:text-brass-300"
                              >
                                {child.label}
                                <ArrowUpRight className="size-3.5" />
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="relative z-10 space-y-3 border-t border-foam/10 px-5 py-5">
              <BookingButton size="md" variant="primary" className="w-full" />
              <a
                href={SITE.phone.href}
                onClick={() => track("phone_click")}
                className="flex items-center justify-center gap-2 py-2 text-sand/80 transition-colors hover:text-brass-300"
              >
                <Phone className="size-4" />
                {SITE.phone.display}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
