"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Anchor,
  Sailboat,
  ArrowUpRight,
  Lock,
  UserRoundCheck,
} from "lucide-react";
import { GHL } from "@/config/ghl";
import { CAPTAINS } from "@/data/captains";
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
    title: "1-6 Guest Charter",
    desc: "Booking and details form for private charters of 1 to 6 guests.",
    href: GHL.forms.sixPersonCharter,
  },
  {
    icon: Anchor,
    title: "7-13 Guest Charter",
    desc: "Booking form for larger groups of 7 to 13 guests. A bareboat charter: you select and hire your captain directly in the step below.",
    href: GHL.forms.thirteenPersonCharter,
  },
];

export function FormsDirectory() {
  return (
    <div>
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Captain Selection: a dedicated step in the 7-13 guest workflow. Larger
          charters always run with a captain, so choosing one is part of booking. */}
      <div
        id="captain-selection"
        className="mt-6 rounded-2xl border border-brass/30 bg-brass/[0.05] p-6 md:p-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-brass/10">
            <UserRoundCheck className="size-5 text-brass-600" />
          </div>
          <div>
            <span className="eyebrow text-brass-600">7-13 guests</span>
            <h3 className="font-display text-xl text-ink">Captain selection</h3>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Charters for 7 to 13 guests follow the U.S. Coast Guard bareboat
          model: you charter the boat and select a licensed captain, hired and
          paid directly. Review our captains below and choose yours when you
          complete the 7 to 13 guest charter form. The captain&apos;s fee is
          arranged directly with your captain, separate from the boat charter,
          with no broker markups or hidden fees.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPTAINS.map((c) => (
            <li
              key={c.slug}
              className="flex items-center gap-3 rounded-xl border border-line bg-sand-100 p-3"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-line">
                <Image
                  src={c.photo}
                  alt={`Captain ${c.name}`}
                  fill
                  quality={80}
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{c.name}</p>
                <p className="truncate text-xs text-muted">{c.tags[0] ?? c.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={GHL.forms.thirteenPersonCharter}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("form_opened", { form: "7-13 Guest Charter" })}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-sand transition-colors hover:bg-deep"
          >
            Book the 7 to 13 guest charter
            <ArrowUpRight className="size-4" />
          </a>
          <Link
            href="/captains"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brass-600 hover:text-brass"
          >
            Read full captain bios <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>

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
            information goes directly to Top Fun Charters, with no third-party
            sharing.
          </p>
        </div>
      </div>
    </div>
  );
}
