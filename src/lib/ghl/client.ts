/**
 * SERVER-ONLY GoHighLevel / LeadConnector REST client — the "secure GHL API
 * proxy layer" from the brief. The API key is read from the server environment
 * and sent as a Bearer token; it is NEVER exposed to the browser. Every
 * dashboard read flows through here so the credential stays server-side.
 *
 * Never import this into a client component (it reads `GHL_API_KEY`).
 */
import { serverEnv, isGhlConfigured } from "@/env";

/** Thrown when GHL isn't configured (no API key / location id). */
export class GhlNotConfiguredError extends Error {
  constructor() {
    super("GoHighLevel is not configured — set GHL_API_KEY and GHL_LOCATION_ID.");
    this.name = "GhlNotConfiguredError";
  }
}

/** Thrown when GHL returns a non-2xx response. */
export class GhlApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: string,
  ) {
    super(`GHL API returned ${status}`);
    this.name = "GhlApiError";
  }
}

type GhlFetchInit = Omit<RequestInit, "body"> & {
  query?: Record<string, string | number | undefined>;
  body?: unknown;
  timeoutMs?: number;
};

/** Authenticated JSON fetch against the LeadConnector API. */
export async function ghlFetch<T = unknown>(
  path: string,
  init: GhlFetchInit = {},
): Promise<T> {
  if (!isGhlConfigured()) throw new GhlNotConfiguredError();
  const env = serverEnv();

  const base = env.GHL_API_BASE.replace(/\/$/, "");
  const url = new URL(base + (path.startsWith("/") ? path : `/${path}`));
  if (init.query) {
    for (const [key, value] of Object.entries(init.query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  const { query, body, timeoutMs = 10_000, headers, signal, ...rest } = init;
  void query;

  const res = await fetch(url, {
    ...rest,
    headers: {
      Authorization: `Bearer ${env.GHL_API_KEY}`,
      Version: env.GHL_API_VERSION,
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(headers ?? {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    // Private data — never cache.
    cache: "no-store",
    signal: signal ?? AbortSignal.timeout(timeoutMs),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new GhlApiError(res.status, text);
  }
  return (await res.json()) as T;
}
