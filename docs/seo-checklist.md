# SEO checklist — what's built in, and what only you can do

Target search phrases: **bass lessons (online / in person; Pretoria & Johannesburg)**, **bass courses**, **experienced bass teacher**,
**bass player bookings**, **CRC bassist**, **Lowell Jeffery**.

## Already built into the site
| Area | What was done |
| --- | --- |
| One page per intent | `/bass-lessons` (bass lessons in Pretoria, Johannesburg and online) and `/book-a-bassist` (session, live and worship-team bookings), each with its own keyword-led title and description, one `<h1>`, a visible FAQ and share card. The home page, nav and contact line link to them. |
| Titles & descriptions | Unique per page, written around the target phrases and kept within Google's display length (home title ≈ 61 chars, descriptions ≈ 150). See `lib/site.ts` and each `page.tsx`. |
| Structured data (JSON-LD / schema.org) | The "this is who/what the page is about" layer Google reads: `Person` (Lowell, with `knowsAbout`, `sameAs` social profiles, links to CRC and School of Rock), three `Service`s (bass lessons — with `areaServed` Pretoria and Johannesburg and a R380 `Offer` — plus guitar lessons and bass player bookings), `FAQPage` on both new pages (the answers are the visible FAQ text, word for word), `WebSite`/`WebPage`, `Course` (The Art of the Feel), `ImageGallery`, `BreadcrumbList`. Entities are cross-linked with `@id` so Google sees one "Lowell Jeffery". See `lib/structured-data.ts`. |
| Images | Everything is WebP, served directly from descriptive, keyword-bearing file names (e.g. `lowell-jeffery-crc-bassist-christian-revival-church.webp`), with real alt text, explicit width/height, lazy loading below the fold. Images are also listed in the sitemap. |
| Social previews | Generated 1200×630 share cards for home, bass lessons, book a bassist, courses and gallery (WhatsApp / Facebook / LinkedIn / X). |
| Indexing | `sitemap.xml` (honest `lastmod`), `robots.txt`, canonical URLs, `index, follow` with large image previews, one `<h1>` per page, `lang="en-ZA"`. |
| Speed (a ranking factor) | Self-hosted fonts, hero image prioritised, third-party Cal.com script loaded only on demand, static pages on Vercel's CDN. |
| On-page wording | Light edits so the phrases appear in real sentences: the CRC bassist line in the story, "bass lessons … experienced teacher" in the booking panel, "bass player bookings" in the contact section, "online bass courses" on the courses page. |

## To do on your side (these matter as much as the code)
1. **Google Search Console** — add `lowelljeffery.co.za` (Domain property via DNS is easiest). Submit `https://lowelljeffery.co.za/sitemap.xml`, then use *URL Inspection → Request indexing* for `/`, `/bass-lessons`, `/book-a-bassist`, `/courses`, `/gallery`.
   If you prefer the HTML-tag method, put the `content` value in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel and redeploy.
2. **Bing Webmaster Tools** — import the site from Search Console (one click). Bing also powers DuckDuckGo and several AI assistants.
3. **Google Business Profile** — create it as a *service-area business* (you can hide a home address), category **Music instructor**, add services (bass lessons online / in person, guitar lessons, session bass player), your photos, and the website link. Ask students and worship teams for **Google reviews** — reviews are the strongest local signal there is.
4. **Replace the placeholders** — the *Upcoming dates*, *Students* (testimonials) and *School of Rock* card still hold bracketed filler. Real testimonials and real dates both help ranking and trust. Once you have genuine reviews, tell me and I'll add review markup (never add it for invented ones).
5. **Backlinks** (links *to* the site from places Google already trusts) — ask for a link from: the CRC website/team page, the School of Rock location page, your YouTube "About" and video descriptions, Instagram/Facebook bios, your Cal.com profile bio, band/venue pages, and any local music-teacher directories. Use the name "Lowell Jeffery" consistently everywhere.
6. **Real video** — swap the "YouTube embed — featured video" placeholder for an actual embedded lesson/performance video. Video is a strong signal and I can add `VideoObject` markup.
7. **Share-preview cache** — after launch, paste the URL into Facebook's Sharing Debugger / LinkedIn Post Inspector once, so old previews refresh.
8. **Measure** — run `pagespeed.web.dev` on the live URL and check Search Console → *Performance* monthly to see which phrases people actually find you with.

## Honest expectations
- Technical SEO gets the site *eligible and understood*; ranking comes from relevance, reviews and links over weeks and months.
- "Lowell Jeffery" and "CRC bassist" are low-competition and should come first once indexed. Generic phrases like "bass lessons" are very competitive nationally; *"bass lessons in Pretoria"* and *"bass lessons in Johannesburg"* are far more winnable — Pretoria and Johannesburg are now in the page titles, copy and structured data. **Send me the suburbs/areas where you teach in person (and whether it is a studio or the student's home) and I'll add them, plus a `LocalBusiness` entry** — and a Google Business Profile service area is what ties it together.

## Dedicated pages — done, and what would strengthen them
Search engines rank *pages*, so one page per intent beats one page for everything:
- ✅ `/bass-lessons` — online & in person (Pretoria, Johannesburg), who it's for, what's covered, how it works, FAQs
- ✅ `/book-a-bassist` — session work, live, worship teams, what he plays, how to book, FAQs
- ❌ No About page, by decision (the story already lives on the home page and on the lessons page).

What would make them rank better, in order of impact (all need information or content from you):
1. **Real student reviews** (Google reviews + a quote or two) — then I add review markup and a testimonials block (never for invented ones).
2. **Suburbs / areas** for in-person lessons → `LocalBusiness` markup and location wording ("bass lessons in Pretoria East", etc.).
3. **The real lesson structure** (what happens in a lesson) — replaces the generic "how it works".
4. **Rates or "from" prices** for bookings, and where you're happy to travel — these are the most common questions and are not on the page yet.
5. **A short video** of a lesson or a performance (`VideoObject` markup).

