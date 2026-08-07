/**
 * Tax classification + computation for charter revenue. Pure module.
 *
 * Per the operator's directive and the bareboat compliance framing (see
 * PROJECT_AUDIT.md, src/data/pricing.ts, and the charter-type memory):
 *   • 1–6 guest CAPTAINED charters are a service → treated as NON-taxable.
 *   • 7–13 guest BAREBOAT rentals are a rental of tangible personal property →
 *     TAXABLE at the Florida rate (default 7% = 6% state + 1% Manatee surtax).
 * Quoted charter fees are tax-EXCLUSIVE ("Taxes are not included" — pricing.ts),
 * so tax is added on top of the fee.
 *
 * This encodes the operator's stated reporting rule for convenience; it is NOT
 * tax advice. Confirm the rate and classification with a qualified accountant.
 */
import type { CharterType } from "@/lib/ghl/types";

export const DEFAULT_TAX_RATE = 0.07;

export type TaxCategory = "non_taxable_service" | "taxable_bareboat";

export function taxCategory(charterType: CharterType): TaxCategory {
  return charterType === "bareboat_7_13"
    ? "taxable_bareboat"
    : "non_taxable_service";
}

export function isTaxable(charterType: CharterType): boolean {
  return charterType === "bareboat_7_13";
}

export function taxCategoryLabel(category: TaxCategory): string {
  return category === "taxable_bareboat"
    ? "Taxable bareboat rental (7–13 guests)"
    : "Non-taxable service charter (1–6 guests)";
}

/** Round to cents, avoiding binary-float drift. */
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export type TaxBreakdown = {
  gross: number;
  taxable: boolean;
  taxableBase: number;
  nonTaxableBase: number;
  taxRate: number;
  taxDue: number;
  totalWithTax: number;
};

/** Compute the tax breakdown for a single gross charter fee. */
export function computeTax(
  gross: number,
  charterType: CharterType,
  rate: number = DEFAULT_TAX_RATE,
): TaxBreakdown {
  const taxable = isTaxable(charterType);
  const taxableBase = taxable ? round2(gross) : 0;
  const nonTaxableBase = taxable ? 0 : round2(gross);
  const taxDue = round2(taxableBase * rate);
  return {
    gross: round2(gross),
    taxable,
    taxableBase,
    nonTaxableBase,
    taxRate: rate,
    taxDue,
    totalWithTax: round2(round2(gross) + taxDue),
  };
}
