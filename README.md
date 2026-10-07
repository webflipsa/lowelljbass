# lowelljeffery.co.za

Website for **Lowell Jeffery** — bassist, educator and worship musician.
Next.js (App Router) + TypeScript, deployed on Vercel, forms sent through Resend.

Pages: **Home** (`/`, the "bass guitar" one-pager), **Gallery** (`/gallery`), **Courses** (`/courses`).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in as needed — the site runs without any keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

Without `RESEND_API_KEY` the contact / "notify me" forms still work in development (they log the message to the
terminal instead of emailing it); in production they return a friendly error until Resend is configured.

## Going live (Vercel + Resend + domain)

1. **Vercel** — import the repo (framework auto-detects as Next.js). Add the environment variables below to the project.
2. **Domain** — Project → Settings → Domains → add `lowelljeffery.co.za` (and `www`, redirecting to the apex). Point DNS at Vercel as it instructs.
3. **Resend** — add and verify `lowelljeffery.co.za` in Resend (DNS records: SPF/DKIM). Create an API key.
4. Set these in Vercel (Production + Preview):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries and course sign-ups |
| `CONTACT_FROM_EMAIL` | Sender on the verified domain, e.g. `Lowell Jeffery <website@lowelljeffery.co.za>` |
| `NEXT_PUBLIC_SITE_URL` | `https://lowelljeffery.co.za` (canonical URLs, sitemap, Open Graph) |
| `NEXT_PUBLIC_BOOKING_URL` | *(optional)* Cal.com / Calendly link — fills the booking panel and the "Open booking calendar" button |

### Supabase (later)
Not wired up yet. The natural seams are `app/api/subscribe/route.ts` (store course sign-ups as well as emailing them) and
`GALLERY` in `lib/content.ts` (serve photos from Supabase Storage). Env placeholders are in `.env.example`.

## Where things live

```
app/
  page.tsx            Home — assembles the sections + the bass neck
  gallery/ courses/   The two sub-pages
  api/contact|subscribe/route.ts   Resend-backed form endpoints (validation, honeypot, rate limit)
  layout.tsx          Fonts, metadata, JSON-LD
  globals.css  nav.css  home.css  subpage.css   All styling (tokens at the top of globals.css)
  fonts/              Self-hosted Hanken Grotesk, Instrument Serif, JetBrains Mono
components/
  home/*.tsx          One file per home section (Hero, Story, Media, …)
  NeckEngine.tsx      Neck interactions: pluck on click, string wobble, scroll vibration, fret-dot glow
  RevealObserver.tsx  Scroll-reveal
  SiteNav.tsx  ContactForm.tsx  NotifyForm.tsx  ui.tsx
lib/
  content.ts          ← edit copy-like data here: involvements, lessons, dates, testimonials, gallery
  site.ts             Site URL, social links, feature flags
  photos.ts           Photo catalogue (sizes needed by next/image)
public/assets/img/    Photos + bass artwork from the design, carried over as-is
```

### Common edits
- **Upcoming dates / testimonials** — `DATES` and `TESTIMONIALS` in `lib/content.ts`. They currently hold the design's bracketed placeholders (`[Gig / service / workshop]`, `[Student quote …]`).
- **Gallery** — drop the file in `public/assets/img/`, add it to `PHOTOS` (`lib/photos.ts`) and to a year in `GALLERY` (`lib/content.ts`); lower that year's `emptySlots` to retire a placeholder tile (set to `0` to hide them).
- **Social links, booking link, flags** — `lib/site.ts`.
- **Courses** — the featured course lives in `components/home/Courses.tsx` (teaser) and `app/courses/page.tsx` (full page). Price is "TBC" and the buttons are `#` until a checkout exists.

## Design notes

The site is built from the Claude Design handoff (`Lowell Jeffery v3` desktop home, `Mobile`, `Gallery`, `Courses`) and was checked against those
files for layout parity — section positions and heights match the originals at 1920 / 1440 / 1280 / 1100 / 1000 / 920 px (desktop) and 800 / 600 / 390 / 360 px (mobile).

- **Layouts.** ≥ 900px is the bass-neck layout; below 900px is the single-column mobile design (centred 560px column). One set of markup serves both; the `@media (max-width: 899px)` blocks in `home.css` carry the mobile design's values.
- **Neck behaviour** (Karplus-Strong pluck, string wobble, fret-dot glow, scroll vibration) is a direct port of the prototype. Mobile has no neck; the design's optional E-A-D-G "tap a string" row is built but off — set `FLAGS.mobilePluckButtons` in `lib/site.ts` to enable it.
- **Reveal-on-scroll** respects `prefers-reduced-motion`.
- **No global `box-sizing` reset** — the design is authored against the browser default (`content-box`), so adding one would shift sizes.
- **Fonts** are self-hosted from `app/fonts/` with no metric-adjusted fallback, so glyphs outside the fonts (→ ↗ ←) fall back to `system-ui` exactly as in the design.

### Deliberate differences from the design files
- Footer link reads "Back to lowelljeffery.co.za" (the design said `.com`).
- "Open booking calendar" falls back to `#contact` while no `NEXT_PUBLIC_BOOKING_URL` is set (the design links to `#`).
- Forms are real (Resend) with a honeypot, validation and an error line; the success label is the design's "Thanks — sent".
- Gallery/Courses use the compact "Book" pill below 640px so the nav fits a phone (the design only specified their desktop nav).
- Added keyboard focus styles, `aria-expanded` on the menu button, and Escape-to-close; the design removed field outlines.
- The design's `<image-slot>` (a design-tool drag-and-drop placeholder) is replaced by data-driven tiles plus static dashed "reserved" tiles.

## Notes
- `AGENTS.md` is generated by Next.js (it points coding agents at the docs bundled in `node_modules/next/dist/docs/`); keep it.
- `New Design/` and `images/` are untouched local material (`New Design/` is git-ignored).
