/**
 * Best-effort in-memory rate limiter (fixed window), keyed by an arbitrary
 * identifier (here: role + client IP). Sufficient for a low-traffic internal
 * console on a single instance.
 *
 * LIMITATION: state is per server instance, so on horizontally-scaled or
 * serverless deployments the effective limit is per-instance. For a strict
 * global limit, back this with a durable store (e.g. Upstash Redis) — the call
 * sites don't change.
 */
export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  /** Epoch ms when the current window resets. */
  resetAt: number;
};

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

/** Amortized cleanup so the map can't grow unbounded. */
function sweep(now: number): void {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) buckets.delete(key);
  });
}

export function rateLimit(
  identifier: string,
  limit: number,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(identifier);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(identifier, { count: 1, resetAt });
    return { allowed: true, limit, remaining: limit - 1, resetAt };
  }

  existing.count += 1;
  return {
    allowed: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}
