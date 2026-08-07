/**
 * Display formatters for the dashboard. Pure + client-safe. Dates are formatted
 * in UTC from their YYYY-MM-DD parts so a calendar date never shifts a day due
 * to the viewer's timezone.
 */
export function formatMoney(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDateLong(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatTime(hhmm: string | null): string {
  if (!hhmm) return "—";
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm;
  const date = new Date(Date.UTC(2000, 0, 1, h, m));
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function formatPercent(rate: number): string {
  const pct = rate * 100;
  return `${pct.toFixed(Number.isInteger(pct) ? 0 : 2)}%`;
}
