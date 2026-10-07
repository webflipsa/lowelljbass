# SEO checklist — what's built in, and what only you can do

Target search phrases: **bass lessons (online / in person)**, **bass courses**, **experienced bass teacher**,
**bass player bookings**, **CRC bassist**, **Lowell Jeffery**.

## Already built into the site
| Area | What was done |
| --- | --- |
| Titles & descriptions | Unique per page, written around the target phrases and kept within Google's display length (home title ≈ 61 chars, descriptions ≈ 150). See `lib/site.ts` and each `page.tsx`. |
| Structured data (JSON-LD / schema.org) | The "this is who/what the page is about" layer Google reads: `Person` (Lowell, with `knowsAbout`, `sameAs` social profiles, links to CRC and School of Rock), three `Service`s (bass lessons online/in person, guitar lessons, bass player bookings), `WebSite`/`WebPage`, `Course` (The Art of the Feel), `ImageGallery`, `BreadcrumbList`. Entities are cross-linked with `@id` so Google sees one "Lowell Jeffery". See `lib/structured-data.ts`. |
| Images | Everything is WebP, served directly from descriptive, keyword-bearing file names (e.g. `lowell-jeffery-crc-bassist-christian-revival-church.webp`), with real alt text, explicit width/height, lazy loading below the fold. Images are also listed in the sitemap. |
| Social previews | Generated 1200×630 share cards for home, courses and gallery (WhatsApp / Facebook / LinkedIn / X). |
| Indexing | `sitemap.xml` (honest `lastmod`), `robots.txt`, canonical URLs, `index, follow` with large image previews, one `<h1>` per page, `lang="en-ZA"`. |
| Speed (a ranking factor) | Self-hosted fonts, hero image prioritised, third-party Cal.com script loaded only on demand, static pages on Vercel's CDN. |
| On-page wording | Light edits so the phrases appear in real sentences: the CRC bassist line in the story, "bass lessons … experienced teacher" in the booking panel, "bass player bookings" in the contact section, "online bass courses" on the courses page. |

## To do on your side (these matter as much as the code)
1. **Google Search Console** — add `lowelljeffery.co.za` (Domain property via DNS is easiest). Submit `https://lowelljeffery.co.za/sitemap.xml`, then use *URL Inspection → Request indexing* for `/`, `/courses`, `/gallery`.
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
- "Lowell Jeffery" and "CRC bassist" are low-competition and should come first once indexed. Generic phrases like "bass lessons" are very competitive nationally; *"bass lessons in [your city]"* and *"bass player for hire in [your city]"* are far more winnable. **Tell me the city/area where you teach in person and I'll build it into the copy, titles and structured data** (and add a `LocalBusiness` entry).

## Recommended next step: dedicated pages
Search engines rank *pages*, so one page per intent beats one page for everything. Suggested additions (I'll write them once you confirm the facts — locations, lesson length, rates, availability, which cities you play in):
- `/bass-lessons` — online & in person, who it's for, what's covered, how the first lesson works, FAQs
- `/book-a-bassist` — session work, live, worship teams, what you play, how to book
- `/about` — Lowell's story, 20 years as a CRC bassist, 15 years teaching, School of Rock
