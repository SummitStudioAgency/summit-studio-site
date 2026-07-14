import type { MetadataRoute } from 'next';
import { SITE } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /demo/ hosts hidden, unlisted per-prospect landing pages (never
      // linked from anywhere on this site) — disallowed here as a second,
      // independent guard alongside each page's own noindex metadata.
      disallow: ['/api/', '/demo/'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
