/**
 * Authorization roles. Pure module (no server imports) so it is safe to import
 * from both server and client components for typing and UI gating.
 *
 * - `owner`   — the operator. Full access, including all financial/tax data.
 * - `captain` — a captain. Role-restricted: assigned charters only, never
 *               financial data.
 */
export const ROLES = ["owner", "captain"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return value === "owner" || value === "captain";
}

export function isOwner(role: Role | undefined | null): boolean {
  return role === "owner";
}

/** Only the owner may see revenue, tax and other financial figures. */
export function canViewFinancials(role: Role | undefined | null): boolean {
  return role === "owner";
}

/** Human label for a role. */
export function roleLabel(role: Role): string {
  return role === "owner" ? "Owner" : "Captain";
}
