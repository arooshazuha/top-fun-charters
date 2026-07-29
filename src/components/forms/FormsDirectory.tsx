"use client";

import Link from "next/link";
import { ShieldCheck, Users, Anchor, Sailboat, ArrowUpRight, Lock } from "lucide-react";
import { GHL } from "@/config/ghl";
import { track } from "@/lib/analytics";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const FORMS = [
  {
    icon: ShieldCheck,
    title: "Participant Waiver",
    desc: "Required for every guest before departure. Guests under 18 need a parent or guardian to sign consent.",
    href: GHL.forms.waiver,
    required: true,
  },
  {
    icon: Users,
    title: "6-Person Charter",
    desc: "Booking and details form for private charters of 1–6 guests.",
    href: GHL.forms.sixPersonCharter,
  },
  {
    icon: Users,
    title: "13-Person Charter",
    desc: "Booking and details form for larger groups of 7–13 guests.",
    href: GHL.forms.thirteenPersonCharter,
  },
  {
    icon: Anchor,
    title: "13-Person + Captain",
    desc: "Captained charter form for groups of up to 13 guests.",
    href: GHL.forms.thirteenPersonWithCaptain,
  },
];

export function FormsDirectory() {
  return (
    <div>
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {FORMS.map((form) => (
          <StaggerItem key={form.title}>
            <a
              href={form.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("form_opened", { form: form.title })}
              className="lift group flex h-full flex-col rounded-xl border border-line bg-sand-100 p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-full border border-brass/30 bg-brass/10">
                  <form.icon className="size-5 text-brass-600" />
                </div>
                {form.required && (
                  <span className="rounded-full bg-brass/15 px-2.5 py-1 text-xs font-semibold text-brass-600">
                    Required
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-xl text-ink">{form.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{form.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brass-600">
                Open form
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Bareboat + help */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col rounded-xl border border-line bg-sand-100 p-6">
          <div className="flex size-11 items-center justify-center rounded-full border border-line">
            <Sailboat className="size-5 text-ink/70" />
          </div>
          <h3 className="mt-4 font-display text-xl text-ink">Bareboat Charter Agreement</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            The bareboat charter agreement is provided during the booking
            process. Reach out and we&apos;ll walk you through it.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-brass-600"
          >
            Contact us <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-brass/25 bg-brass/[0.06] p-6">
          <Lock className="mt-0.5 size-5 shrink-0 text-brass-600" />
          <p className="text-sm leading-relaxed text-muted">
            Forms open securely in our booking system in a new tab. Your
            information goes directly to Top Fun Charters — no third-party
            sharing.
          </p>
        </div>
      </div>
    </div>
  );
}
