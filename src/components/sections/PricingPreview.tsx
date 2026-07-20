import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PricingCard } from './PricingCard';
import { SITE } from '@/data/site';

export function PricingPreview() {
  const packages = SITE.pricing.filter((p) => p.name !== 'Custom');

  return (
    <Section id="pricing" tone="sage">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title={
            <span className="block xl:whitespace-nowrap text-[clamp(1.15rem,2.6vw,2.1rem)]">
              Clear pricing, built around your investment
            </span>
          }
          intro={
            <span className="block xl:whitespace-nowrap text-[clamp(0.85rem,1.7vw,1.125rem)]">
              A setup fee plus a small monthly fee for most businesses — or no upfront cost at all on Website Care. Anything else is a quick custom quote.
            </span>
          }
          maxWidthClassName="max-w-2xl lg:max-w-6xl"
        />

        <div className="mx-auto mt-14 grid grid-cols-1 max-w-5xl gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <PricingCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="mt-10 text-center">
            <Button href="/pricing" variant="outline">
              See full pricing &amp; plan details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
