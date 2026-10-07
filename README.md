# lowelljeffery.co.za

Website for **Lowell Jeffery** — bassist, bass teacher and worship musician.
Next.js (App Router) + TypeScript, deployed on Vercel, forms sent through Resend, bookings through Cal.com.

Pages: **Home** (`/`, the "bass guitar" one-pager), **Bass lessons** (`/bass-lessons`), **Book a bassist** (`/book-a-bassist`),
**Courses** (`/courses`), **Gallery** (`/gallery`).

## Run it

```bash
npm install
cp .env.example .env.local   # fill in as needed — the site runs without any keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
npm run img -- <photo> <descriptive-name>   # convert a photo to SEO-friendly WebP (see "Images")
```

Without `RESEND_API_KEY` the contact / "notify me" forms still work in development (they log the message to the
terminal instead of emailing it); in production they return a friendly error until Resend is configured.

## Going live (Vercel + Resend + Cal.com + domain)

1. **Vercel** — import the repo (framework auto-detects as Next.js). Add the environment variables below.
2. **Domain** — Project → Settings → Domains → add `lowelljeffery.co.za` (and `www`, redirecting to the apex). Point DNS at Vercel as it instructs.
3. **Resend** — add and verify `lowelljeffery.co.za` in Resend (DNS records: SPF/DKIM). Create an API key.
4. **Cal.com** — follow **[docs/booking-cal-com.md](docs/booking-cal-com.md)**, then set `NEXT_PUBLIC_CAL_LINK`.
5. **Search engines** — follow **[docs/seo-checklist.md](docs/seo-checklist.md)** (Search Console, Google Business Profile, backlinks).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries and course sign-ups |
| `CONTACT_FROM_EMAIL` | Sender on the verified domain, e.g. `Lowell Jeffery <website@lowelljeffery.co.za>` |
| `NEXT_PUBLIC_SITE_URL` | `https://lowelljeffery.co.za` (canonical URLs, sitemap, Open Graph, structured data) |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com path for the **home page** lesson panel, e.g. `lowelljefffery/bass-lesson` — switches on its live calendar. Empty = button goes to the contact form |
| `NEXT_PUBLIC_CAL_LINK_BOOKINGS` | *(optional)* Cal.com path for `/book-a-bassist`. Defaults to `lowelljefffery/bass-bookings` (note the three f's — that is the real username) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | *(optional)* Search Console HTML-tag value |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | *(optional)* Bing Webmaster Tools value |

`NEXT_PUBLIC_*` values are baked in at build time — redeploy after changing them.

### Supabase (later)
Not wired up yet. The natural seams are `app/api/subscribe/route.ts` (store course sign-ups as well as emailing them) and
`GALLERY` in `lib/content.ts` (serve photos from Supabase Storage). Env placeholders are in `.env.example`.

## Where things live

```
app/
  page.tsx            Home — assembles the sections + the bass neck
  bass-lessons/ book-a-bassist/   Landing pages for "bass lessons" and "bass player bookings" (SEO pages, each with a share card)
  gallery/ courses/   The other sub-pages (each with its own opengraph-image.tsx share card)
  api/contact|subscribe/route.ts   Resend-backed form endpoints (validation, honeypot, rate limit)
  layout.tsx          Fonts + site-wide metadata
  opengraph-image.tsx Social share card for the home page
  sitemap.ts robots.ts icon.svg
  globals.css  nav.css  home.css  subpage.css   All styling (tokens at the top of globals.css)
  fonts/              Self-hosted Hanken Grotesk, Instrument Serif, JetBrains Mono (+ og/ TTFs for share cards)
components/
  home/*.tsx          One file per home section (Hero, Story, Media, …)
  NeckEngine.tsx      Neck interactions: pluck on click, string wobble, scroll vibration, fret-dot glow
  CalEmbed.tsx CalInline.tsx   Lazy-loaded Cal.com booking widget
  JsonLd.tsx          Renders structured data
  RevealObserver.tsx  Scroll-reveal
  SiteNav.tsx  ContactForm.tsx  NotifyForm.tsx  Faq.tsx  ui.tsx
lib/
  content.ts          ← edit data here: involvements, lessons, dates, testimonials, gallery — and the landing-page copy
                        (lesson price/cities, "who it's for", steps, FAQs, booking services)
  site.ts             Site URL, SEO title/description, social links, feature flags, Cal links, PAGE_SEO (the two landing pages' titles/descriptions)
  photos.ts           Photo catalogue: file names, sizes and alt text
  structured-data.ts  schema.org JSON-LD (Person, Services with cities + price, FAQPage, Course, ImageGallery, breadcrumbs)
  seo.ts og.tsx       Shared metadata helpers, share-card renderer
public/assets/img/    All images — WebP, descriptively named
scripts/convert-image.mjs   Converts a photo to WebP with a keyword file name
docs/                 booking-cal-com.md, seo-checklist.md
```

### Common edits
- **Upcoming dates / testimonials** — `DATES` and `TESTIMONIALS` in `lib/content.ts`. They currently hold the design's bracketed placeholders (`[Gig / service / workshop]`, `[Student quote …]`) — replace before launch.
- **Gallery** — convert the photo (see *Images*), add it to `PHOTOS` (`lib/photos.ts`) and to a year in `GALLERY` (`lib/content.ts`); lower that year's `emptySlots` to retire a placeholder tile (`0` hides them).
- **Search titles / descriptions** — `lib/site.ts` (home, and `PAGE_SEO` for `/bass-lessons` and `/book-a-bassist`) and the `pageMetadata({...})` call at the top of `app/gallery/page.tsx` and `app/courses/page.tsx`.
- **Lesson price, cities, FAQs, "how it works"** — `LESSON_TERMS`, `LESSON_PLACES`, `LESSON_STEPS`, `LESSON_FAQ` (and the `BOOKING_*` equivalents) in `lib/content.ts`. The FAQ text feeds both the visible page and the FAQPage structured data, and the price feeds the structured-data Offer, so editing it in one place keeps everything consistent. Only put confirmed facts there.
- **Social links, feature flags** — `lib/site.ts`.
- **Courses** — the featured course lives in `components/home/Courses.tsx` (teaser) and `app/courses/page.tsx` (full page). Price is "TBC" and the buttons are `#` until a checkout exists.

### Images
All site images are WebP and keep **descriptive, keyword-bearing file names**, because Google Images reads them.

```bash
npm run img -- ~/Downloads/IMG_4021.jpg lowell-jeffery-online-bass-lesson
# → public/assets/img/lowell-jeffery-online-bass-lesson.webp  (quality 88, max 2000px, EXIF rotated, metadata stripped)
npm run img -- art/logo.png my-logo --dir=bass --quality=96      # graphics with transparency
npm run img -- art/texture.png my-texture --lossless             # textures that must stay pixel-exact
```
The script prints the width/height and a ready-made `photos.ts` line. Then write an honest **alt text**: say what's in the picture,
naturally (who, where, what instrument) — no keyword lists. Images are served straight from `/assets/img/…` (`images.unoptimized`
in `next.config.ts`) so the URLs stay clean; `next/image` still reserves space (no layout shift) and lazy-loads.

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
- **SEO wording** (light edits to the design's sentences): the story says "two decades as bassist … at Christian Revival Church (CRC)"; the booking panel says "Book bass lessons with an experienced teacher — …"; the contact line says "Bass lessons, session work, worship-team coaching or bass player bookings"; the courses page lead says "Self-paced online bass courses …". Page `<title>`s and descriptions are keyword-led rather than the design's.
- **New pages.** `/bass-lessons` and `/book-a-bassist` are additions built in the Courses (coffee) and Gallery (dark) styles; they were not in the design files. The nav on the sub-pages gained two short links, "Lessons" and "Bookings" (the pill still fits at 900px). The home page's nav is unchanged.
- **Home page cross-links** are inline text links only (the "bass lessons" in the booking panel, and "Bass lessons" / "bass player bookings" in the contact line), underlined; no element was added, so no section moved. The home meta description and share description now mention Pretoria and Johannesburg.
- "Open booking calendar" opens your Cal.com page, or scrolls to the contact form until `NEXT_PUBLIC_CAL_LINK` is set (the design links to `#`); the grey scheduler placeholder becomes the live calendar.
- Forms are real (Resend) with a honeypot, validation and an error line; the success label is the design's "Thanks — sent".
- Gallery/Courses use the compact "Book" pill below 640px so the nav fits a phone (the design only specified their desktop nav).
- Added keyboard focus styles, `aria-expanded` on the menu button, and Escape-to-close; the design removed field outlines.
- The design's `<image-slot>` (a design-tool drag-and-drop placeholder) is replaced by data-driven tiles plus static dashed "reserved" tiles.
- Images are WebP (smaller, same look): photos at quality 88, the bass artwork at quality 96, the neck texture lossless.

## Notes
- `AGENTS.md` is generated by Next.js (it points coding agents at the docs bundled in `node_modules/next/dist/docs/`); keep it.
- `New Design/` and `images/` are untouched local material (`New Design/` is git-ignored).
