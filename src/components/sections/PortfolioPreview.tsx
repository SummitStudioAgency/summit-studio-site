import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PortfolioCard } from './PortfolioCard';
import { SITE } from '@/data/site';

export function PortfolioPreview() {
  const featured = SITE.portfolio.slice(0, 3);

  return (
    <Section id="work" tone="paper">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="See it live"
            title="Real builds, not mockups"
            intro="Every example below is a real, deployed website on the Summit Studio engine — click through and look around."
            className="mb-0"
          />
          <Reveal delay={0.1}>
            <Button href="/portfolio" variant="outline">
              View full portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {featured.map((entry, i) => (
            <Reveal key={entry.slug} delay={i * 0.06}>
              <PortfolioCard entry={entry} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
