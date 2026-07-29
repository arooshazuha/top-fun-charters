# Top Fun Charters

A premium, conversion-focused website for **Top Fun Charters** — private luxury
yacht charters on Anna Maria Island & Bradenton, Florida. Rebuilt from scratch
in Next.js while preserving the existing GoHighLevel (GHL) booking, calendar and
form infrastructure.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokens in `globals.css`)
- **Framer Motion** — scroll reveals, staggers, parallax, mobile menu
- **React Three Fiber + drei** — subtle, pointer-interactive 3D hero layer
- **lucide-react** — icons · **zod** — runtime validation

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

Copy `.env.example` → `.env.local` for optional live reviews (see below).

## Architecture

```
src/
  app/                 App Router routes (home + inner pages, api/reviews, sitemap, robots)
  components/
    hero/              Cinematic hero + R3F sea-sparkle canvas
    layout/            Header, Footer, MobileNav, Logo, PageHeader
    sections/          Homepage funnel sections
    reviews/ pricing/ captains/ gallery/ faq/ forms/ legal/  Feature components
    motion/            Reveal, Stagger, Parallax (all reduced-motion aware)
    ui/                Button, Section, SectionHeading, StarRating
    seo/               JsonLd
  config/
    site.ts            Business identity / NAP (single source of truth)
    ghl.ts             ALL GoHighLevel URLs — centralized, never inline
  data/                captains, pricing, faq, experiences, pickup, gallery, navigation, yacht, legal
  lib/
    reviews/           Provider-agnostic reviews (google + seed) + zod schemas
    seo.ts             Metadata builder + JSON-LD (LocalBusiness, WebSite, Service, FAQ, Breadcrumb)
    analytics.ts       Provider-agnostic event tracking
    icons.tsx          Icon-name → component registry
```

`PROJECT_AUDIT.md` documents every verified business fact used to build the site
(pricing, captains, FAQs, policies, GHL URLs). **Nothing on the site is fabricated.**

## GoHighLevel integration

All booking, calendar and form flows remain in GHL. Every GHL/LeadConnector URL
lives in **`src/config/ghl.ts`** and nowhere else:

- Booking calendar → the site-wide "Check pricing and availability" CTA
- Waiver, 6-person, 13-person, 13-person + captain forms → Forms page & nav

## Live reviews

- `GET /api/reviews` resolves reviews from the best available source:
  1. **Google Places** when `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` are set
     (server-side only — the key is never sent to the browser).
  2. Otherwise the **seeded real testimonials** (`src/lib/reviews/seed.ts`).
- The homepage reviews section fetches this dynamically with loading / error /
  empty states. Aggregate rating + reviews are also emitted as JSON-LD for SEO.

## Assets

Authentic Top Fun Charters photography (drone aerials, onboard shots, captain
headshots, marina) is optimized into `public/` — resized, EXIF-rotated and
re-encoded. Source files remain in `assets/`. The `assets/` folder also holds the
exported contacts spreadsheet and policy PDFs; the spreadsheet is **business data
only and is never displayed** (customer PII).

## Accessibility & SEO

- Semantic landmarks, keyboard-navigable menu/lightbox/accordions, visible focus,
  `prefers-reduced-motion` respected throughout, meaningful alt text.
- Unique metadata + canonical + Open Graph/Twitter per page, `sitemap.xml`,
  `robots.txt`, and structured data (LocalBusiness, WebSite, Service, FAQPage,
  BreadcrumbList, AggregateRating/Review).
