/**
 * Stateless session token — a minimal signed token: a base64url JSON payload
 * plus an HMAC-SHA256 signature, verified with the Web Crypto API so the exact
 * same code runs in Proxy, Route Handlers and Server Components.
 *
 * Deliberately free of `next/headers` and `node:*` imports so `src/proxy.ts`
 * can import it directly (Proxy runs on the Node.js runtime in Next 16, but
 * keeping this portable avoids surprises). Cookie read/write lives in
 * `./session.ts`; this file only signs and verifies the opaque token string.
 */
import type { Role } from "./roles";
import { isRole } from "./roles";

/** Session cookie name. */
export const SESSION_COOKIE = "tfc_session";

export type SessionPayload = {
  /** Subject — the principal's stable id (e.g. "owner" or a captain slug). */
  sub: string;
  /** Authorization role. */
  role: Role;
  /** Captain roster slug when role === "captain" (scopes their data). */
  captainSlug?: string;
  /** Issued-at, epoch seconds. */
  iat: number;
  /** Expiry, epoch seconds. */
  exp: number;
};

const encoder = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(input: string): Uint8Array<ArrayBuffer> {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const bin = atob(input.replace(/-/g, "+").replace(/_/g, "/") + pad);
  // Back it with a concrete ArrayBuffer so the result is typed
  // `Uint8Array<ArrayBuffer>` (a valid BufferSource for Web Crypto).
  const bytes = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function getSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET is missing or too short — set a 32+ character secret " +
        "(generate one with `openssl rand -base64 32`).",
    );
  }
  return secret;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Sign a payload into an `{body}.{sig}` token. */
export async function signSessionToken(payload: SessionPayload): Promise<string> {
  const body = b64urlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await hmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `${body}.${b64urlEncode(new Uint8Array(sig))}`;
}

/**
 * Verify a token and return its payload, or `null` if the signature is invalid,
 * the token is malformed, or it has expired. Signature comparison is done by
 * `crypto.subtle.verify`, which is constant-time.
 */
export async function verifySessionToken(
  token: string | undefined | null,
): Promise<SessionPayload | null> {
  if (!token) return null;
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return null;

  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  let sigBytes: Uint8Array<ArrayBuffer>;
  try {
    sigBytes = b64urlDecode(sig);
  } catch {
    return null;
  }

  let ok = false;
  try {
    const key = await hmacKey();
    ok = await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(body));
  } catch {
    return null;
  }
  if (!ok) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)));
  } catch {
    return null;
  }

  // Structural + expiry validation.
  if (
    !payload ||
    typeof payload.sub !== "string" ||
    !isRole(payload.role) ||
    typeof payload.exp !== "number" ||
    payload.exp * 1000 <= Date.now()
  ) {
    return null;
  }
  return payload;
}
