/**
 * SEO helpers: breadcrumbs + JSON-LD generators. Deliberately smaller than
 * the client engine's src/lib/seo.ts — that file exists mostly to generate
 * metadata across dozens of near-identical, dynamically-routed pages
 * (services × towns). This site has a handful of fixed, hand-written pages,
 * so each page sets its own `metadata` export directly rather than calling
 * a generator function built for a pattern that doesn't apply here.
 */

import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import type { FAQItem } from '@/data/site';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

/**
 * Every subpage needs its own OpenGraph/Twitter title+description — without
 * this, Next.js falls back to the root layout's `openGraph` block, which is
 * hard-coded to the homepage. That meant sharing e.g. /pricing on social
 * media surfaced the homepage's title and description instead of Pricing's.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function breadcrumbsFor(label: string, href: string): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label, href },
  ];
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE.url}${item.href}`,
    })),
  };
}

export function generateOrganizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#organization`,
    name: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    areaServed: 'US',
  };
}

export function generateFaqJsonLd(faqs: ReadonlyArray<FAQItem>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...faqs].map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
