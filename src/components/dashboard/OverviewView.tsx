/**
 * Operations overview. Server component, role-aware. Owners see the whole
 * operation; captains see the same layout scoped to their own assignments (the
 * scoping + revenue redaction already happened in the service). No financial
 * data appears here for anyone — revenue lives only in the Financials view.
 */
import {
  CalendarClock,
  CalendarDays,
  CloudRain,
  FileWarning,
  Users,
} from "lucide-react";

import { formatDateLong } from "@/lib/dashboard/format";
import type { DashboardData } from "@/lib/dashboard/types";

import { AttentionPanel } from "./AttentionPanel";
import { CharterList } from "./CharterList";
import { Chip, Panel, SectionTitle, StatCard, StatusBanner } from "./ui";

export function OverviewView({ data }: { data: DashboardData }) {
  const isCaptain = data.role === "captain";
  const waiverCount = data.attention.missingWaivers.length;
  const weatherCount = data.attention.weatherHolds.length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl text-ink">Operations overview</h1>
        <p className="mt-1 text-sm text-muted">
          {formatDateLong(data.today)}
          {isCaptain ? " · Your assigned charters only" : ""}
        </p>
      </header>

      {!data.configured ? (
        <StatusBanner title="GoHighLevel isn't connected yet">
          {data.message}
        </StatusBanner>
      ) : null}
      {data.configured && data.degraded ? (
        <StatusBanner tone="warn" title="Live sync issue">
          {data.message}
        </StatusBanner>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's charters"
          value={data.todaysCharters.length}
          icon={<CalendarClock className="size-4" />}
        />
        <StatCard
          label="Upcoming"
          value={data.upcomingCharters.length}
          icon={<CalendarDays className="size-4" />}
        />
        <StatCard
          label="Waivers due"
          value={waiverCount}
          tone={waiverCount ? "warn" : "good"}
          icon={<FileWarning className="size-4" />}
        />
        <StatCard
          label="Weather holds"
          value={weatherCount}
          tone={weatherCount ? "bad" : "default"}
          icon={<CloudRain className="size-4" />}
        />
      </div>

      {!isCaptain && data.captainsOnToday.length > 0 ? (
        <Panel>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
              <Users className="size-4 text-muted" /> Captains on today
            </span>
            {data.captainsOnToday.map((cap) => (
              <Chip key={cap.slug ?? cap.name} tone="default">
                {cap.name}
                {cap.charterCount > 1 ? ` ×${cap.charterCount}` : ""}
              </Chip>
            ))}
          </div>
        </Panel>
      ) : null}

      <AttentionPanel attention={data.attention} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle>Today&rsquo;s charters</SectionTitle>
          <CharterList
            charters={data.todaysCharters}
            emptyText={
              data.configured
                ? "No charters scheduled for today."
                : "Connect GoHighLevel to see today's charters."
            }
          />
        </section>
        <section>
          <SectionTitle>Upcoming</SectionTitle>
          <CharterList
            charters={data.upcomingCharters}
            showDate
            emptyText={data.configured ? "Nothing upcoming." : "—"}
          />
        </section>
      </div>
    </div>
  );
}
