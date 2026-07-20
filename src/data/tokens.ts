/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DESIGN TOKENS — Summit Studio's own brand identity.
 *
 *  Shaped exactly like the client engine's THEME object (same key names:
 *  colors, radius, buttonStyle, fonts) because this site is deliberately
 *  built in the same design language as every Summit Studio client site —
 *  same typography pairing, same pill-button/soft-shadow/large-radius
 *  system, same fade-up motion. What's intentionally different is the
 *  palette: this is the agency's own identity, not a client's, so it uses
 *  its own colors rather than literally reusing a client's hex values.
 *
 *  What's intentionally NOT here: the multi-tenant registry/env-var switch
 *  that martinez-landscaping's src/data/theme.ts plugs into. That machinery
 *  exists to swap between many client brands at build time; this site has
 *  exactly one, permanent identity, so tailwind.config.ts imports this file
 *  directly instead of going through a registry.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const TOKENS = {
  colors: {
    // Palette match, 2026-07-19: adopted directly from the Summit Studio
    // Landscaping demo (src/data/businesses/summit-studio-landscaping/theme.ts
    // in the engine repo) at the user's explicit request — a teal/blue
    // identity in place of the original forest-green. `danger` is the one
    // color NOT carried over (the client theme has no equivalent); every
    // other value below is that theme's own hex, verified against this
    // site's actual background/surface tones before landing (see contrast
    // notes below) — not just eyeballed.
    //
    // Primary brand color — buttons, links, key accents.
    primary: '#1E4E5F',
    // Deepest brand color — dark sections, footer, scrolled navbar.
    secondary: '#0F2A33',
    // Bold accent — the single boldest call-to-action color.
    accent: {
      DEFAULT: '#D97D3D',
      soft: '#EFC094',
    },
    // Supporting accent — icons, small highlights, secondary detail color.
    // Darkened ~2% from the source theme's #2E7B8C: at that exact value,
    // text set in this color (eyebrow labels, the "Best for" tag) contrast-
    // checked at 4.42:1 against `surface.50` — just under the 4.5:1 WCAG AA
    // minimum for small text on that particular background. This value
    // clears 4.5:1 there (and 4.7:1+ against `background`) while reading as
    // visually identical to the source.
    highlight: '#2D7989',
    // Additional supporting tone, reserved for future use.
    tertiary: '#4A6670',
    // Form validation state only (required-field marks, error text/borders).
    // No equivalent in the source theme, and the new `accent` (#D97D3D)
    // contrast-checks at just 2.89:1 against `background` — not readable
    // for error copy — so this stays its own dedicated color, unchanged
    // from before.
    danger: '#B23B3B',

    background: '#FAFAF7', // page background
    surface: {
      DEFAULT: '#E6EDEE',
      50: '#F1F5F5',
      100: '#E6EDEE',
    },
    foreground: '#132226', // body text on light surfaces
    muted: '#57696D', // secondary / de-emphasized text
  },

  radius: {
    large: '2rem', // tailwind `4xl`
    xlarge: '2.75rem', // tailwind `5xl`
  },

  buttonStyle: {
    radius: 'rounded-full',
  },

  // Same pairing as the client engine — a soft optical serif for display,
  // a clean grotesque for body. Reusing the exact fonts is what makes this
  // read as "the same design language" rather than just a similar layout.
  fonts: {
    display: {
      family: 'Fraunces',
      cssVariable: '--font-display',
      fallback: ['Georgia', 'serif'],
    },
    body: {
      family: 'Hanken Grotesk',
      cssVariable: '--font-sans',
      fallback: ['system-ui', 'sans-serif'],
    },
  },
} as const;
