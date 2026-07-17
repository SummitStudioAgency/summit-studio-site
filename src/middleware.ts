import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Transparently reverse-proxies a handful of /demo/<slug> paths to the
 * real multi-tenant engine (engine.summitstudioagency.com) — so a
 * prospect visiting summitstudioagency.com/demo/martinez-landscaping-growth
 * never sees the engine subdomain at all, in the address bar or anywhere
 * else. The engine's own next.config.mjs sets `assetPrefix` in production
 * specifically so this works: its _next/static chunk URLs are absolute
 * (always pointing back at the real engine domain), so they keep loading
 * correctly even though the HTML itself is now served from this domain.
 *
 * Deliberately a small explicit map, not a blind passthrough of whatever
 * slug shows up in the URL — the public-facing name intentionally differs
 * from the engine's own internal slug (this domain always spells out
 * -starter/-growth; the engine drops the suffix for its default/Growth
 * tier — see registry.ts's own DEFAULT_BUSINESS_SLUG convention), and this
 * also means a client only ever gets a working /demo/<slug> URL once
 * they're deliberately added here — never automatically, matching "I
 * don't need this built out for all of them at the moment."
 *
 * Any slug not in this map (including the curated /demo/martinez-landscaping
 * landing page itself — see src/app/demo/[slug]/page.tsx — which has no
 * -starter/-growth suffix) falls through untouched to this site's own
 * normal routing.
 *
 * next/image is a second, separate proxy target here, for a gap
 * assetPrefix alone doesn't cover. next/image's *default* loader builds a
 * root-relative `/_next/image?url=...` URL regardless of assetPrefix —
 * fronted by this proxy, that request would otherwise land on THIS site's
 * own server (no /demo/ prefix for the rule above to match), which has no
 * idea what e.g. /images/hero.jpg is (a tried-and-reverted fix on the
 * engine side, forcing next/image's URLs absolute via a custom loader,
 * turned out to disable that app's own /_next/image route entirely —
 * breaking image optimization for direct visits too, not just proxied
 * ones). Distinguishing "this /_next/image request belongs to a proxied
 * demo page" from "this is this site's own image request" — both are
 * same-path, same-origin — is done via the Referer header the browser
 * sends: only proxy when it was actually requested from a page this
 * middleware itself proxies.
 */
const ENGINE_ORIGIN = 'https://engine.summitstudioagency.com';

const PUBLIC_TO_ENGINE_SLUG: Record<string, string> = {
  'martinez-landscaping-growth': 'martinez-landscaping',
  'martinez-landscaping-starter': 'martinez-landscaping-starter',
};

function refererIsProxiedDemo(request: NextRequest): boolean {
  const referer = request.headers.get('referer');
  if (!referer) return false;
  try {
    const refPath = new URL(referer).pathname;
    const refMatch = /^\/demo\/([^/]+)/.exec(refPath);
    return Boolean(refMatch && refMatch[1] in PUBLIC_TO_ENGINE_SLUG);
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/_next/image') {
    if (!refererIsProxiedDemo(request)) return NextResponse.next();
    const url = new URL(`${pathname}${request.nextUrl.search}`, ENGINE_ORIGIN);
    return NextResponse.rewrite(url);
  }

  const match = /^\/demo\/([^/]+)(\/.*)?$/.exec(pathname);
  if (!match) return NextResponse.next();

  const [, publicSlug, rest] = match;
  const engineSlug = PUBLIC_TO_ENGINE_SLUG[publicSlug];
  if (!engineSlug) return NextResponse.next();

  const url = new URL(`/demo/${engineSlug}${rest ?? ''}`, ENGINE_ORIGIN);
  url.search = request.nextUrl.search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/demo/:path*', '/_next/image'],
};
