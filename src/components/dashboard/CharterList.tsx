/**
 * Charter list / row. Server component. Shows the operational essentials a
 * captain or owner needs at a glance: who, when, guests, assigned captain, and
 * compliance chips (waiver, bareboat agreement, weather hold). No revenue here —
 * that lives only in the owner's Financials view.
 */
import { Anchor, CalendarClock, TriangleAlert, Users } from "lucide-react";

import { formatDateLong, formatTime } from "@/lib/dashboard/format";
import type { Charter } from "@/lib/dashboard/types";

import { Chip, Panel } from "./ui";

export function CharterList({
  charters,
  showDate = false,
  emptyText = "Nothing scheduled.",
}: {
  charters: Charter[];
  showDate?: boolean;
  emptyText?: string;
}) {
  if (charters.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line bg-sand-100 px-4 py-8 text-center text-sm text-muted">
        {emptyText}
      </p>
    );
  }

  return (
    <ul className="space-y-2.5">
      {charters.map((c) => (
        <li key={c.id}>
          <Panel className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-ink">{c.customerName}</span>
                  <span className="text-xs text-muted">{c.ref}</span>
                  {c.weatherHold ? (
                    <Chip tone="bad">
                      <TriangleAlert className="size-3" /> Weather hold
                    </Chip>
                  ) : null}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="size-3.5 shrink-0" />
                    {showDate ? `${formatDateLong(c.charterDate)} · ` : ""}
                    {formatTime(c.startTime)}
                    {c.durationHours ? ` · ${c.durationHours}h` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5 shrink-0" />
                    {c.guestCount ?? "—"} guests
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Anchor className="size-3.5 shrink-0" />
                    {c.assignedCaptainName ?? "Unassigned"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <Chip tone={c.charterType === "bareboat_7_13" ? "gold" : "default"}>
                  {c.charterType === "bareboat_7_13" ? "Bareboat 7–13" : "Captained 1–6"}
                </Chip>
                <Chip tone={c.waiverSigned ? "good" : "warn"}>
                  {c.waiverSigned ? "Waiver ✓" : "Waiver due"}
                </Chip>
                {c.charterType === "bareboat_7_13" ? (
                  <Chip tone={c.bareboatAgreementSigned ? "good" : "warn"}>
                    {c.bareboatAgreementSigned ? "Bareboat ✓" : "Bareboat due"}
                  </Chip>
                ) : null}
              </div>
            </div>
          </Panel>
        </li>
      ))}
    </ul>
  );
}
