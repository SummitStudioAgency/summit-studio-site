import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  /** Use light colors over the dark forest background. */
  invert?: boolean;
  className?: string;
  wide?: boolean;
  /**
   * Fully replaces the default/`wide` max-width instead of being merged
   * with it -- `cn()` here is a plain class-join (no tailwind-merge), so
   * appending a second conflicting `max-w-*` via `className` would leave
   * both classes in the DOM with an unpredictable winner. Use this prop
   * instead whenever a heading needs more room than `wide` provides.
   */
  maxWidthClassName?: string;
}

/**
 * The page's recurring heading block. The eyebrow carries a small peak
 * mark — Summit Studio's own signature motif (a stand-in for the client
 * engine's sprig mark) — so structure matches every client site while the
 * mark itself reads as this agency's own identity.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  invert = false,
  className,
  wide = false,
  maxWidthClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        maxWidthClassName ?? (wide ? 'max-w-2xl lg:max-w-4xl' : 'max-w-2xl'),
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            'inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]',
            invert ? 'text-accent-soft' : 'text-highlight',
          )}
        >
          <Peak className="h-4 w-4" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={cn(
            'mt-4 font-display text-heading font-semibold',
            invert ? 'text-surface-50' : 'text-secondary',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'mt-5 text-lg leading-relaxed',
              invert ? 'text-surface/80' : 'text-muted',
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Minimal mountain-peak mark used as the eyebrow accent. */
function Peak({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 19h18L14.5 7l-3 4.5L9 9 3 19Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
