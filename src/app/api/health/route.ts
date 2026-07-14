import { NextResponse } from 'next/server';

/**
 * GET /api/health
 *
 * Ported from martinez-landscaping's /api/health. `ok: true` always — this
 * route responding at all means the app is serving requests.
 * `emailDeliveryConfigured: false` means the app is up but every contact
 * submission is silently falling back to log-only mode (see
 * src/app/api/contact/route.ts) instead of actually reaching an inbox —
 * the exact "silent failure" this endpoint exists to make non-silent.
 * Wire an external uptime monitor to poll this and alert on
 * `emailDeliveryConfigured === false` in production.
 *
 * No env var values are ever returned — only whether each is set.
 *
 * `force-dynamic`: without it, a GET handler with no dynamic API calls
 * gets statically rendered at build time and would serve that same cached
 * response forever, silently defeating the point of a healthcheck.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    resendApiKey: Boolean(process.env.RESEND_API_KEY),
    contactToEmail: Boolean(process.env.CONTACT_TO_EMAIL),
    contactFromEmail: Boolean(process.env.CONTACT_FROM_EMAIL),
  };

  const emailDeliveryConfigured = Object.values(checks).every(Boolean);

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    emailDeliveryConfigured,
    checks,
  });
}
