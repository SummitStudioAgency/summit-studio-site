/**
 * Client IP extraction + hashing — never store a raw IP address; use a
 * one-way hash instead, just enough to key a rate limiter without keeping
 * PII around. Ported from martinez-landscaping's src/lib/monitoring/ip-hash.ts
 * (identical logic — this file has no monitoring/submission-log dependents
 * here, so it lives at src/lib/ rather than src/lib/monitoring/).
 *
 * `IP_HASH_SALT` (optional) is mixed into the hash so the stored value
 * can't be reversed via a rainbow table of common IPs without knowing the
 * salt. Unset is still safe (falls back to an unsalted hash).
 */

import { createHash } from 'crypto';

/** Reads the client IP from the headers a Vercel/reverse-proxy deployment
 *  actually sets (Next.js's App Router request handlers have no built-in
 *  `request.ip`). Returns null if neither header is present. */
export function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return null;
}

/** SHA-256 of `salt + ip`. Deterministic, but the raw address is never persisted. */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? '';
  return createHash('sha256').update(salt + ip).digest('hex');
}
