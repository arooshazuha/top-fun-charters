/**
 * "Needs attention" panel. Server component. Rolls up the operational gaps the
 * owner should clear before each charter: missing waivers, missing bareboat
 * agreements, unassigned captains, and open weather holds.
 */
import {
  Anchor,
  CheckCircle2,
  CloudRain,
  FileWarning,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

import { formatDateLong } from "@/lib/dashboard/format";
import type { Charter, DashboardData } from "@/lib/dashboard/types";

import { Chip, Panel, SectionTitle } from "./ui";
import type { Tone } from "./ui";

type Group = {
  key: string;
  label: string;
  Icon: LucideIcon;
  tone: Tone;
  items: Charter[];
};

function Row({ charter }: { charter: Charter }) {
  return (
    <li className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="min-w-0 truncate text-ink">{charter.customerName}</span>
      <span className="shrink-0 text-xs text-muted">
        {formatDateLong(charter.charterDate)}
      </span>
    </li>
  );
}

export function AttentionPanel({
  attention,
}: {
  attention: DashboardData["attention"];
}) {
  const groups: Group[] = [
    {
      key: "waivers",
      label: "Missing waivers",
      Icon: FileWarning,
      tone: "warn",
      items: attention.missingWaivers,
    },
    {
      key: "bareboat",
      label: "Missing bareboat agreements",
      Icon: ScrollText,
      tone: "warn",
      items: attention.missingBareboatAgreements,
    },
    {
      key: "captains",
      label: "Unassigned captains",
      Icon: Anchor,
      tone: "bad",
      items: attention.unassignedCaptains,
    },
    {
      key: "weather",
      label: "Open weather holds",
      Icon: CloudRain,
      tone: "bad",
      items: attention.weatherHolds,
    },
  ];

  const active = groups.filter((g) => g.items.length > 0);

  return (
    <section>
      <SectionTitle>Needs attention</SectionTitle>
      {active.length === 0 ? (
        <Panel className="flex items-center gap-3">
          <CheckCircle2 className="size-5 text-emerald-600" />
          <p className="text-sm text-muted">
            All clear — no waivers, agreements, captains or weather holds
            outstanding.
          </p>
        </Panel>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {active.map((g) => (
            <Panel key={g.key}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  <g.Icon className="size-4 text-muted" />
                  {g.label}
                </h3>
                <Chip tone={g.tone}>{g.items.length}</Chip>
              </div>
              <ul className="mt-2 divide-y divide-line">
                {g.items.slice(0, 5).map((c) => (
                  <Row key={c.id} charter={c} />
                ))}
              </ul>
              {g.items.length > 5 ? (
                <p className="mt-2 text-xs text-muted">
                  +{g.items.length - 5} more
                </p>
              ) : null}
            </Panel>
          ))}
        </div>
      )}
    </section>
  );
}
