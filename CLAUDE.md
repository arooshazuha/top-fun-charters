@AGENTS.md

# Top Fun Charters — project notes

Premium Next.js 16 (App Router, React 19, Tailwind v4) rebuild of the Top Fun
Charters yacht-charter site. GoHighLevel stays the booking/forms backend.

## Ground rules
- **Never fabricate business facts.** All verified data lives in `PROJECT_AUDIT.md`
  and the `src/data/*` files. If something isn't verified, mark it, don't invent it.
- **All GHL / LeadConnector URLs go in `src/config/ghl.ts`.** Never inline them.
- Business NAP is in `src/config/site.ts` (phone 941-241-2000, info@topfuncharters.com,
  Safe Harbor Pier 77 Marina, Bradenton FL 34209).
- The primary CTA everywhere is "Check pricing and availability" → GHL booking calendar.
- Reviews must stay dynamic (`/api/reviews`, `src/lib/reviews/*`) — no hard-coded
  production review arrays. Seed = the real published testimonials, fallback only.
- Hero is a local drone video (`public/videos/topfun-hero*.mp4`) with an optimized poster
  fallback; respect `prefers-reduced-motion` and Save-Data (poster only, no autoplay).
- The exported contacts spreadsheet in `assets/` is customer PII — never display it.

## Commands
`npm run dev` · `npm run build` · `npm run lint` (all currently pass clean).
