/**
 * Small shared presentational primitives for the dashboard. Server components.
 */
import type { ReactNode } from "react";
import { AlertTriangle, Info } from "lucide-react";

import { cn } from "@/lib/utils";

export type Tone = "default" | "good" | "warn" | "bad" | "gold";

const chipTone: Record<Tone, string> = {
  default: "border-line bg-sand-200 text-teal-600",
  good: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warn: "border-amber-200 bg-amber-50 text-amber-800",
  bad: "border-red-200 bg-red-50 text-red-700",
  gold: "border-brass/30 bg-brass/10 text-brass-600",
};

const statValueTone: Record<Tone, string> = {
  default: "text-ink",
  good: "text-emerald-700",
  warn: "text-amber-700",
  bad: "text-red-700",
  gold: "text-brass-600",
};

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="font-display text-lg text-ink">{children}</h2>
      {action}
    </div>
  );
}

export function Chip({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        chipTone[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  icon?: ReactNode;
  tone?: Tone;
}) {
  return (
    <Panel className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className={cn("mt-1 font-display text-2xl leading-tight", statValueTone[tone])}>
          {value}
        </p>
        {sub ? <p className="mt-0.5 text-xs text-muted">{sub}</p> : null}
      </div>
      {icon ? (
        <span
          className={cn(
            "inline-flex size-9 shrink-0 items-center justify-center rounded-full",
            chipTone[tone],
          )}
        >
          {icon}
        </span>
      ) : null}
    </Panel>
  );
}

/** Full-width status banner for empty ("connect GHL") or degraded states. */
export function StatusBanner({
  tone = "default",
  title,
  children,
}: {
  tone?: "default" | "warn";
  title: string;
  children?: ReactNode;
}) {
  const warn = tone === "warn";
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4",
        warn
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-line bg-sand-100 text-ink",
      )}
      role="status"
    >
      <span className={cn("mt-0.5 shrink-0", warn ? "text-amber-600" : "text-teal-600")}>
        {warn ? <AlertTriangle className="size-5" /> : <Info className="size-5" />}
      </span>
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        {children ? (
          <p className="mt-0.5 text-sm opacity-90">{children}</p>
        ) : null}
      </div>
    </div>
  );
}
