/**
 * CSV builder for the "Download CSV for Taxes" export. Pure module.
 *
 * One line item per charter with its tax classification and computed tax, plus
 * a totals row, so the file drops into a bookkeeping / sales-tax filing flow.
 */
import { computeTax, taxCategory, taxCategoryLabel } from "./tax";
import { channelLabel, type Charter } from "./types";

const HEADERS = [
  "Charter Ref",
  "Date",
  "Customer",
  "Guests",
  "Charter Type",
  "Tax Category",
  "Payment Channel",
  "Currency",
  "Gross (pre-tax)",
  "Tax Rate",
  "Tax Due",
  "Total (with tax)",
] as const;

/** RFC-4180 style escaping: quote fields containing quotes, commas or newlines. */
function cell(value: string | number): string {
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function charterTypeLabel(t: Charter["charterType"]): string {
  return t === "bareboat_7_13" ? "Bareboat 7–13" : "Captained 1–6";
}

export function chartersToTaxCsv(charters: Charter[], rate: number): string {
  const rows: string[] = [HEADERS.map(cell).join(",")];

  let totalGross = 0;
  let totalTax = 0;

  for (const c of charters) {
    const gross = c.revenue?.total ?? 0;
    const currency = c.revenue?.currency ?? "USD";
    const t = computeTax(gross, c.charterType, rate);
    totalGross += t.gross;
    totalTax += t.taxDue;

    rows.push(
      [
        cell(c.ref),
        cell(c.charterDate),
        cell(c.customerName),
        cell(c.guestCount ?? ""),
        cell(charterTypeLabel(c.charterType)),
        cell(taxCategoryLabel(taxCategory(c.charterType))),
        cell(c.revenue ? channelLabel(c.revenue.channel) : ""),
        cell(currency),
        cell(t.gross.toFixed(2)),
        cell(t.taxable ? `${(rate * 100).toFixed(2)}%` : "0%"),
        cell(t.taxDue.toFixed(2)),
        cell(t.totalWithTax.toFixed(2)),
      ].join(","),
    );
  }

  // Totals row (12 columns).
  rows.push(
    [
      cell("TOTAL"),
      "",
      "",
      "",
      "",
      "",
      "",
      cell("USD"),
      cell(totalGross.toFixed(2)),
      "",
      cell(totalTax.toFixed(2)),
      cell((totalGross + totalTax).toFixed(2)),
    ].join(","),
  );

  // Leading UTF-8 BOM so Excel detects the encoding; CRLF line endings.
  return `﻿${rows.join("\r\n")}\r\n`;
}
