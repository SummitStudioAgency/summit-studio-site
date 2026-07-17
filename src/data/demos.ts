/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DEMOS — real prospect/reference demo sites reachable only via a direct
 *  URL (/demo/[slug]), never linked from anywhere on this site and excluded
 *  from the sitemap and from search indexing (robots.ts disallows /demo/,
 *  and each page also sets its own `robots: { index: false }`).
 *
 *  Built for the actual outreach workflow: build a real demo for a
 *  prospect, add one entry here, then send them this page's URL — they see
 *  a Summit-Studio-branded landing page first, with a clear link into the
 *  actual live demo(s) built for their business. Reusable for any future
 *  prospect, not just the reference entries below.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface DemoPackageOption {
  tier: 'Growth' | 'Starter';
  url: string;
  highlights: string[];
  /** Screenshot shown on this package's card. Omit if none exists yet. */
  image?: string;
}

export interface DemoEntry {
  slug: string;
  business: string;
  tagline: string;
  /** One or more live package demos built for this business. */
  packages: DemoPackageOption[];
}

export const DEMOS: DemoEntry[] = [
  {
    slug: 'martinez-landscaping',
    business: 'Martinez Landscaping & Tree Services',
    tagline: 'Landscapes worth coming home to.',
    packages: [
      {
        tier: 'Growth',
        url: 'https://engine.summitstudioagency.com/demo/martinez-landscaping',
        highlights: ['Before/after gallery slider', 'Services × town SEO matrix', 'Emergency-service banner'],
        image: '/images/portfolio/martinez-growth.jpg',
      },
      {
        tier: 'Starter',
        url: 'https://engine.summitstudioagency.com/demo/martinez-landscaping-starter',
        highlights: ['Simplified gallery', 'Core service pages', 'Same premium design system'],
        image: '/images/portfolio/martinez-starter.jpg',
      },
    ],
  },
];

export function getDemoBySlug(slug: string): DemoEntry | undefined {
  return DEMOS.find((d) => d.slug === slug);
}
