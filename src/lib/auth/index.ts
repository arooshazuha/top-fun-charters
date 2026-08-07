/**
 * Auth barrel — SERVER import surface. This pulls in modules that use
 * `next/headers` and `node:crypto`; import it only from server code. Client
 * components should import the pure `./roles` module directly for typing.
 */
export { SESSION_COOKIE } from "./token";
export type { SessionPayload } from "./token";
export { signSessionToken, verifySessionToken } from "./token";

export { ROLES, isRole, isOwner, canViewFinancials, roleLabel } from "./roles";
export type { Role } from "./roles";

export { createSession, readSession, destroySession } from "./session";
export type { Principal } from "./session";

export { authenticate } from "./credentials";

export { verifySession, getSession, requireOwner } from "./dal";
