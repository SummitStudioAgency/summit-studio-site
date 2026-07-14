# Summit Studio Agency — Marketing Site

Summit Studio Agency's own public marketing website — the site that sells the
Summit Studio website engine, not one of the businesses built on it. Built
with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000` with zero required configuration —
see [Environment variables](#environment-variables) below for what each one
unlocks.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint (`next lint`) |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
src/
  app/            # Next.js App Router pages
    about/
    contact/
    demo/[slug]/  # Unlisted demo-tenant landing pages (see src/data/demos.ts)
    faq/
    portfolio/
    pricing/
    privacy/
    terms/
    api/
      contact/    # Contact form submission handler (Resend + rate limiting)
      health/     # Health check endpoint
  components/
    layout/       # Navbar, Footer
    sections/     # Page sections (Hero, Pricing, Portfolio, FAQ, etc.)
    seo/           # Breadcrumbs, per-page CTA
    ui/            # Shared primitives (Button, Container, Section, Reveal…)
  data/
    site.ts        # Site-wide copy, pricing, FAQ, portfolio entries
    demos.ts        # Unlisted demo-tenant links (see below)
    tokens.ts        # Design tokens
  lib/
    seo.ts           # Per-page metadata + JSON-LD helpers
    rate-limit.ts     # Contact-form rate limiting
    ip-hash.ts         # IP hashing for rate-limit keys
```

## Portfolio & demo links

The public `/portfolio` page only links to demo sites Summit Studio has clear
rights to show publicly. A separate set of demo sites is used for direct
prospect outreach only, reachable through the unlisted `/demo/[slug]` route
(`src/data/demos.ts`) and intentionally never linked from this site. See
`src/data/site.ts` for the linking policy this page follows.

## Environment variables

See `.env.example` for the full list. Nothing is required for local dev —
without `RESEND_API_KEY`/`CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` set, contact
form submissions are only logged server-side instead of emailed.

## Deployment

Deployed on Vercel (project `summit-studio-site`). Pushing to `main` deploys
automatically.
