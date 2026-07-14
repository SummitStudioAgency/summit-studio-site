/**
 * Minimal in-memory, fixed-window rate limiter — one Map, no external
 * service. Ported verbatim from martinez-landscaping's src/lib/rate-limit.ts.
 *
 * ⚠ Ephemeral-state caveat: on a serverless deployment each cold-started
 *   instance has its own separate in-memory Map, so a determined caller
 *   spread across enough invocations could exceed the intended global
 *   rate. Acceptable, explicit tradeoff for zero infra on a low-volume
 *   marketing-site contact form — swap for a shared store (Redis/Upstash)
 *   if traffic ever justifies it.
 */

interface Bucket {
  count: number;
  windowStart: number;
}

export interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterMs: number;
}

const buckets = new Map<string, Bucket>();

let callsSinceSweep = 0;
const SWEEP_EVERY_N_CALLS = 500;

function sweepExpired(maxWindowMs: number): void {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart >= maxWindowMs) buckets.delete(key);
  }
}

/** Checks and records one request against `key`'s fixed window. */
export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  callsSinceSweep++;
  if (callsSinceSweep >= SWEEP_EVERY_N_CALLS) {
    callsSinceSweep = 0;
    sweepExpired(options.windowMs);
  }

  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart >= options.windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= options.maxRequests) {
    return { allowed: false, retryAfterMs: options.windowMs - (now - bucket.windowStart) };
  }

  bucket.count++;
  return { allowed: true, retryAfterMs: 0 };
}

/** Test-only: clears all buckets so tests don't leak state into each other. */
export function _resetRateLimitsForTests(): void {
  buckets.clear();
  callsSinceSweep = 0;
}
