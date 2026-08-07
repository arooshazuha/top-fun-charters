/**
 * Dashboard data service. SERVER-ONLY.
 *
 * Fetches operational + financial data through the secure GHL client, maps it
 * into the dashboard domain model, aggregates the financial/tax summary, and
 * redacts everything a captain must not see. It NEVER fabricates charters: when
 * GHL isn't configured — or a live fetch fails — it returns a well-formed EMPTY
 * result with `configured` / `degraded` flags so the UI shows the right state.
 *
 * ── GHL mapping seam ──────────────────────────────────────────────────────
 * `mapOpportunity` reads GHL opportunities + custom fields defensively because
 * the charter custom-object schema is still placeholder-configured (see the
 * `{{PLACEHOLDER}}` ids in src/config/ghl.ts and PHASE_3_CHARTER_DATA_MODEL.md).
 * Once those ids/field keys are finalized, tighten the field lookups below to
 * the exact keys. Until then it extracts what it reliably can and defaults
 * operational flags to false rather than inventing them.
 * ──────────────────────────────────────────────────────────────────────────
 */
import { CAPTAINS } from "@/data/captains";
import { serverEnv, isGhlConfigured } from "@/env";
import type { Role } from "@/lib/auth/roles";
import { ghlFetch, GhlNotConfiguredError } from "@/lib/ghl/client";
import type { CharterType } from "@/lib/ghl/types";

import { computeTax, isTaxable, round2, taxCategoryLabel } from "./tax";
import {
  REVENUE_CHANNELS,
  type CaptainOnDuty,
  type Charter,
  type CharterStatus,
  type ChannelTotal,
  type DashboardData,
  type FinancialSummary,
  type RevenueChannel,
} from "./types";

const BUSINESS_TZ = "America/New_York";

/** YYYY-MM-DD for a Date in the business timezone (en-CA formats this way). */
function ymdInTz(date: Date, tz: string = BUSINESS_TZ): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

const CAPTAIN_BY_SLUG = new Map(CAPTAINS.map((c) => [c.slug, c.name] as const));
function captainName(slug: string | null): string | null {
  if (!slug) return null;
  return CAPTAIN_BY_SLUG.get(slug) ?? slug;
}

// ---------------------------------------------------------------------------
// GHL fetch + mapping (the seam)
// ---------------------------------------------------------------------------

type GhlOpportunity = {
  id?: string;
  name?: string;
  monetaryValue?: number;
  status?: string;
  contact?: { name?: string; firstName?: string; lastName?: string };
  customFields?: Array<{ id?: string; key?: string; fieldKey?: string; value?: unknown }>;
};

type GhlOpportunitySearch = { opportunities?: GhlOpportunity[] };

async function fetchChartersFromGhl(): Promise<Charter[]> {
  const env = serverEnv();
  const data = await ghlFetch<GhlOpportunitySearch>("/opportunities/search", {
    query: { location_id: env.GHL_LOCATION_ID, limit: 100 },
  });
  return (data.opportunities ?? [])
    .map(mapOpportunity)
    .filter((c): c is Charter => c !== null);
}

function asNum(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
    return Number(v);
  }
  return null;
}
function asStr(v: unknown): string | null {
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
}
function asBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v === 1;
  if (typeof v === "string") {
    return ["true", "yes", "1", "signed", "complete", "completed", "on"].includes(
      v.toLowerCase(),
    );
  }
  return false;
}

function customFieldMap(op: GhlOpportunity): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of op.customFields ?? []) {
    const key = String(f.fieldKey ?? f.key ?? f.id ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "");
    if (key) out[key] = f.value;
  }
  return out;
}

function contactName(op: GhlOpportunity): string | null {
  const c = op.contact;
  if (!c) return asStr(op.name);
  const full =
    asStr(c.name) ?? [c.firstName, c.lastName].filter(Boolean).join(" ").trim();
  return full || asStr(op.name);
}

function normalizeTime(v: string | null): string | null {
  if (!v) return null;
  const m = v.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return `${m[1].padStart(2, "0")}:${m[2]}`;
}

function parseChannel(v: unknown): RevenueChannel {
  const s = asStr(v)?.toLowerCase() ?? "";
  if (s.includes("square")) return "square";
  if (s.includes("zelle")) return "zelle";
  if (s.includes("venmo")) return "venmo";
  if (s.includes("cashapp") || s.includes("cash app")) return "cashapp";
  if (s.includes("credit") || s.includes("card") || s.includes("stripe")) {
    return "credit_card";
  }
  if (s === "cash") return "cash";
  if (s.includes("invoice") || s.includes("ghl")) return "ghl_invoice";
  return "other";
}

function parseStatus(v: unknown): CharterStatus {
  const s = asStr(v)?.toLowerCase() ?? "";
  if (s === "won" || s.includes("confirm")) return "confirmed";
  if (s === "lost" || s === "abandoned" || s.includes("cancel")) return "cancelled";
  if (s.includes("complete")) return "completed";
  if (s.includes("quote")) return "quoted";
  return "inquiry";
}

function inferCharterType(explicit: unknown, guestCount: number | null): CharterType {
  const s = asStr(explicit)?.toLowerCase() ?? "";
  if (s.includes("bareboat") || s.includes("7") || s.includes("13")) {
    return "bareboat_7_13";
  }
  if (s.includes("captain") || s.includes("1-6") || s.includes("1_6")) {
    return "captained_1_6";
  }
  if (guestCount != null) return guestCount >= 7 ? "bareboat_7_13" : "captained_1_6";
  return "captained_1_6";
}

function mapOpportunity(op: GhlOpportunity): Charter | null {
  if (!op.id) return null;
  const cf = customFieldMap(op);
  const pick = (...needles: string[]): unknown => {
    const key = Object.keys(cf).find((k) => needles.some((n) => k.includes(n)));
    return key ? cf[key] : undefined;
  };

  const charterDate = asStr(pick("charterdate", "charter_date", "date")) ?? "";
  // Without a valid date the row isn't schedulable — skip rather than guess.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(charterDate)) return null;

  const guestCount = asNum(pick("guest", "pax", "passenger"));
  const charterType = inferCharterType(
    pick("chartertype", "charter_type", "tier"),
    guestCount,
  );
  const captainSlug = asStr(pick("captain"));
  const revenueTotal =
    asNum(op.monetaryValue) ?? asNum(pick("total", "amount", "price"));

  return {
    id: op.id,
    ref: asStr(pick("charterref", "charter_ref", "ref")) ?? op.id,
    customerName: contactName(op) ?? "Guest",
    charterDate,
    startTime: normalizeTime(asStr(pick("starttime", "start_time", "time"))),
    durationHours: asNum(pick("duration", "hours")),
    guestCount,
    charterType,
    assignedCaptainSlug: captainSlug,
    assignedCaptainName: captainName(captainSlug),
    status: parseStatus(op.status),
    waiverSigned: asBool(pick("waiver")),
    bareboatAgreementSigned: asBool(pick("bareboat", "agreement")),
    weatherHold: asBool(pick("weatherhold", "weather_hold", "weather")),
    revenue:
      revenueTotal != null
        ? { currency: "USD", total: revenueTotal, channel: parseChannel(pick("channel", "payment", "source")) }
        : undefined,
  };
}

// ---------------------------------------------------------------------------
// Aggregation + redaction
// ---------------------------------------------------------------------------

function isActiveUpcoming(c: Charter, today: string): boolean {
  return c.charterDate >= today && c.status !== "completed" && c.status !== "cancelled";
}

/** Remove the revenue field entirely so it never reaches a captain's client. */
function stripRevenue(c: Charter): Charter {
  const clone = { ...c };
  delete clone.revenue;
  return clone;
}

function buildCaptainsOnToday(todays: Charter[]): CaptainOnDuty[] {
  const map = new Map<string, CaptainOnDuty>();
  for (const c of todays) {
    if (!c.assignedCaptainSlug) continue;
    const existing = map.get(c.assignedCaptainSlug);
    if (existing) {
      existing.charterCount += 1;
    } else {
      map.set(c.assignedCaptainSlug, {
        slug: c.assignedCaptainSlug,
        name: c.assignedCaptainName ?? c.assignedCaptainSlug,
        charterCount: 1,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function summarize(
  charters: Charter[],
  rate: number,
  fallbackDate: string,
): FinancialSummary {
  const withRevenue = charters.filter((c) => c.revenue && c.revenue.total > 0);
  const currency = withRevenue[0]?.revenue?.currency ?? "USD";

  const channels = new Map<RevenueChannel, ChannelTotal>(
    REVENUE_CHANNELS.map((ch) => [ch, { channel: ch, gross: 0, count: 0 }] as const),
  );

  let grossRevenue = 0;
  let nonTaxGross = 0;
  let nonTaxCount = 0;
  let taxGross = 0;
  let taxCount = 0;
  let taxDue = 0;
  let minDate = "";
  let maxDate = "";

  for (const c of withRevenue) {
    const gross = c.revenue!.total;
    grossRevenue += gross;

    const bucket = channels.get(c.revenue!.channel);
    if (bucket) {
      bucket.gross += gross;
      bucket.count += 1;
    }

    if (isTaxable(c.charterType)) {
      taxGross += gross;
      taxCount += 1;
      taxDue += computeTax(gross, c.charterType, rate).taxDue;
    } else {
      nonTaxGross += gross;
      nonTaxCount += 1;
    }

    if (!minDate || c.charterDate < minDate) minDate = c.charterDate;
    if (!maxDate || c.charterDate > maxDate) maxDate = c.charterDate;
  }

  const byChannel = REVENUE_CHANNELS.map((ch) => channels.get(ch)!)
    .filter((t) => t.count > 0)
    .map((t) => ({ ...t, gross: round2(t.gross) }));

  return {
    currency,
    taxRate: rate,
    grossRevenue: round2(grossRevenue),
    nonTaxable: {
      category: "non_taxable_service",
      label: taxCategoryLabel("non_taxable_service"),
      gross: round2(nonTaxGross),
      count: nonTaxCount,
      taxDue: 0,
    },
    taxable: {
      category: "taxable_bareboat",
      label: taxCategoryLabel("taxable_bareboat"),
      gross: round2(taxGross),
      count: taxCount,
      taxDue: round2(taxDue),
    },
    totalTaxDue: round2(taxDue),
    totalCollectedWithTax: round2(grossRevenue + taxDue),
    byChannel,
    periodStart: minDate || fallbackDate,
    periodEnd: maxDate || fallbackDate,
    charterCount: withRevenue.length,
  };
}

export type DashboardOptions = {
  role: Role;
  /** When set (captain role), scopes charters to this captain's assignments. */
  captainSlug?: string;
  /** Reference "today" (YYYY-MM-DD). Defaults to today in the business tz. */
  date?: string;
};

type BuildInput = {
  configured: boolean;
  degraded: boolean;
  message: string | null;
  generatedAt: string;
  today: string;
  charters: Charter[];
};

function buildData(
  input: BuildInput,
  opts: DashboardOptions,
  rate: number,
): DashboardData {
  const { charters, today } = input;
  const role = opts.role;

  // Role scoping + financial redaction happen HERE, server-side, so a captain's
  // payload never carries revenue and only shows their own assignments.
  const scoped =
    role === "captain"
      ? charters
          .filter((c) => !opts.captainSlug || c.assignedCaptainSlug === opts.captainSlug)
          .map(stripRevenue)
      : charters;

  const todaysCharters = scoped
    .filter((c) => c.charterDate === today && c.status !== "cancelled")
    .sort((a, b) => (a.startTime ?? "").localeCompare(b.startTime ?? ""));

  const upcomingCharters = scoped
    .filter((c) => c.charterDate > today && c.status !== "cancelled")
    .sort((a, b) => a.charterDate.localeCompare(b.charterDate));

  const attention = {
    missingWaivers: scoped.filter(
      (c) => isActiveUpcoming(c, today) && !c.waiverSigned,
    ),
    missingBareboatAgreements: scoped.filter(
      (c) =>
        isActiveUpcoming(c, today) &&
        c.charterType === "bareboat_7_13" &&
        !c.bareboatAgreementSigned,
    ),
    weatherHolds: scoped.filter((c) => c.weatherHold && c.status !== "cancelled"),
    unassignedCaptains: scoped.filter(
      (c) => isActiveUpcoming(c, today) && !c.assignedCaptainSlug,
    ),
  };

  return {
    configured: input.configured,
    degraded: input.degraded,
    message: input.message,
    generatedAt: input.generatedAt,
    today,
    role,
    todaysCharters,
    upcomingCharters,
    attention,
    captainsOnToday: buildCaptainsOnToday(todaysCharters),
    financials:
      role === "owner"
        ? summarize(
            charters.filter((c) => c.status !== "cancelled"),
            rate,
            today,
          )
        : undefined,
  };
}

/** Load the full dashboard payload for a principal. */
export async function getDashboardData(
  opts: DashboardOptions,
): Promise<DashboardData> {
  const env = serverEnv();
  const today = opts.date ?? ymdInTz(new Date());
  const generatedAt = new Date().toISOString();

  if (!isGhlConfigured()) {
    return buildData(
      {
        configured: false,
        degraded: false,
        message:
          "Connect GoHighLevel (set GHL_API_KEY and GHL_LOCATION_ID) to load live charters, captains and revenue.",
        generatedAt,
        today,
        charters: [],
      },
      opts,
      env.DASHBOARD_TAX_RATE,
    );
  }

  let charters: Charter[] = [];
  let degraded = false;
  let message: string | null = null;
  try {
    charters = await fetchChartersFromGhl();
  } catch (err) {
    degraded = true;
    message =
      err instanceof GhlNotConfiguredError
        ? "Connect GoHighLevel to load live data."
        : "GoHighLevel is connected, but the last sync failed. Check the API key and try again.";
    console.error("[dashboard] GHL fetch failed:", err);
  }

  return buildData(
    { configured: true, degraded, message, generatedAt, today, charters },
    opts,
    env.DASHBOARD_TAX_RATE,
  );
}

/** Charters (with revenue, non-cancelled) in a date range, for the tax CSV. */
export async function getChartersForExport(range?: {
  from?: string;
  to?: string;
}): Promise<{ charters: Charter[]; rate: number }> {
  const env = serverEnv();
  let charters: Charter[] = [];
  if (isGhlConfigured()) {
    try {
      charters = await fetchChartersFromGhl();
    } catch (err) {
      console.error("[dashboard export] GHL fetch failed:", err);
    }
  }

  const inRange = charters.filter((c) => {
    if (c.status === "cancelled" || !c.revenue) return false;
    if (range?.from && c.charterDate < range.from) return false;
    if (range?.to && c.charterDate > range.to) return false;
    return true;
  });

  return { charters: inRange, rate: env.DASHBOARD_TAX_RATE };
}
