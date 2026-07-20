import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { PageCTA } from '@/components/seo/PageCTA';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { SITE } from '@/data/site';
import { breadcrumbsFor, generateBreadcrumbJsonLd, generateFaqJsonLd, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: `Frequently Asked Questions | ${SITE.name}`,
  description: 'Common questions about pricing, ownership, timeline, and how the Summit Studio process works.',
  path: '/faq',
});

export default function FaqPage() {
  const crumbs = breadcrumbsFor('FAQ', '/faq');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([generateFaqJsonLd(SITE.faq), generateBreadcrumbJsonLd(crumbs)]),
        }}
      />

      <Section tone="paper" className="pb-10 pt-12 sm:pb-14">
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 max-w-4xl">
            <h1 className="xl:whitespace-nowrap font-display text-[clamp(1.5rem,4.2vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-secondary">
              Frequently asked questions
            </h1>
            <p className="mt-5 xl:whitespace-nowrap text-[clamp(0.8rem,1.8vw,1.125rem)] leading-relaxed text-muted">
              Quick, plain answers about pricing, ownership, and how the process actually works. Still have a
              question?{' '}
              <Link href="/contact" className="text-primary underline-offset-2 hover:underline">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="sage" className="pt-0">
        <Container>
          <FAQAccordion items={SITE.faq} />
        </Container>
      </Section>

      <PageCTA
        heading="Still have a question? We're easy to reach."
        subhead="Send us a message and we'll get back to you within 24 hours."
      />
    </>
  );
}
