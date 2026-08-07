/**
 * Dashboard domain model + request-validation schemas. Pure module — safe to
 * `import type` from client components. Its runtime values import only `zod`
 * (client-safe); the server-only data fetching lives in ./service.ts.
 */
import { z } from "zod";

import type { CharterType } from "@/lib/ghl/types";
import type { Role } from "@/lib/auth/roles";
import type { TaxCategory } from "./tax";

export type { CharterType };

// ---- Revenue channels (multi-channel breakdown) ----
export const REVENUE_CHANNELS = [
  "square",
  "credit_card",
  "zelle",
  "venmo",
  "cashapp",
  "cash",
  "ghl_invoice",
  "other",
] as const;
export type RevenueChannel = (typeof REVENUE_CHANNELS)[number];

export const CHANNEL_LABELS: Record<RevenueChannel, string> = {
  square: "Square",
  credit_card: "Credit card",
  zelle: "Zelle",
  venmo: "Venmo",
  cashapp: "Cash App",
  cash: "Cash",
  ghl_invoice: "GHL invoice",
  other: "Other",
};

export function channelLabel(channel: RevenueChannel): string {
  return CHANNEL_LABELS[channel] ?? "Other";
}

// ---- Charter status ----
export const CHARTER_STATUSES = [
  "inquiry",
  "quoted",
  "confirmed",
  "completed",
  "cancelled",
] as const;
export type CharterStatus = (typeof CHARTER_STATUSES)[number];

// ---- Charter (domain object surfaced to the UI) ----
export type CharterRevenue = {
  currency: string;
  total: number;
  channel: RevenueChannel;
};

export type Charter = {
  id: string;
  ref: string;
  customerName: string;
  /** YYYY-MM-DD in the business timezone. */
  charterDate: string;
  /** HH:MM (24h) or null when unknown. */
  startTime: string | null;
  durationHours: number | null;
  guestCount: number | null;
  charterType: CharterType;
  assignedCaptainSlug: string | null;
  assignedCaptainName: string | null;
  status: CharterStatus;
  waiverSigned: boolean;
  bareboatAgreementSigned: boolean;
  weatherHold: boolean;
  /**
   * Owner-only. This field is stripped server-side for captains before the data
   * ever leaves the server, so a captain's payload never carries revenue.
   */
  revenue?: CharterRevenue;
};

// ---- Financial summary (owner only) ----
export type ChannelTotal = { channel: RevenueChannel; gross: number; count: number };

export type TaxBucket = {
  category: TaxCategory;
  label: string;
  gross: number;
  count: number;
  taxDue: number;
};

export type FinancialSummary = {
  currency: string;
  taxRate: number;
  grossRevenue: number;
  nonTaxable: TaxBucket;
  taxable: TaxBucket;
  totalTaxDue: number;
  totalCollectedWithTax: number;
  byChannel: ChannelTotal[];
  periodStart: string;
  periodEnd: string;
  charterCount: number;
};

// ---- Ops / attention ----
export type CaptainOnDuty = { slug: string | null; name: string; charterCount: number };

export type DashboardData = {
  /** True when the GHL read API (key + location) is configured. */
  configured: boolean;
  /** True when configured but the live fetch failed (shows a soft warning). */
  degraded: boolean;
  /** Human-readable status note for empty/degraded states. */
  message: string | null;
  generatedAt: string;
  today: string;
  role: Role;
  todaysCharters: Charter[];
  upcomingCharters: Charter[];
  attention: {
    missingWaivers: Charter[];
    missingBareboatAgreements: Charter[];
    weatherHolds: Charter[];
    unassignedCaptains: Charter[];
  };
  captainsOnToday: CaptainOnDuty[];
  /** Owner only; undefined in a captain's payload. */
  financials?: FinancialSummary;
};

// ---- API request validation ----
export const DASHBOARD_VIEWS = ["overview", "financials"] as const;
export type DashboardView = (typeof DASHBOARD_VIEWS)[number];

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be formatted YYYY-MM-DD");

export const DashboardQuerySchema = z.object({
  view: z.enum(DASHBOARD_VIEWS).optional(),
  date: dateString.optional(),
});
export type DashboardQuery = z.infer<typeof DashboardQuerySchema>;

export const ExportQuerySchema = z.object({
  from: dateString.optional(),
  to: dateString.optional(),
});
export type ExportQuery = z.infer<typeof ExportQuerySchema>;
