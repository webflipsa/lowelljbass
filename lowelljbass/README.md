# [Bassist Name] — Website

A static, multi-page website: home, about, lessons, courses, media,
involvements, booking and contact. No build step — plain HTML, CSS
and a little vanilla JS, so any web host or static site service will
run it as-is.

## Structure

```
bass-player-website/
├── index.html          Home
├── about.html           Bio, philosophy, career timeline
├── lessons.html         Lesson formats, pricing, what's covered
├── courses.html         Self-paced courses for sale
├── media.html            Video, photos, press
├── involvements.html    Current roles + career highlights
├── booking.html          Lesson booking form
├── contact.html          General contact form
├── css/style.css         All styling (design tokens at the top)
├── js/main.js            Mobile nav toggle + demo form handling
├── images/                Drop real photos here
└── README.md              This file
```

## Preview it locally

No install needed — open `index.html` directly in a browser, or run
a tiny local server from this folder so relative paths behave
exactly like they will on a real host:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## First things to personalize

Search each HTML file for the following and replace them everywhere
they appear (they're bracketed on purpose so they're easy to find):

- `[Bassist Name]` — appears in the header, footer and page titles
- `[Your City]` — bio, footer, contact page
- `hello@yourdomain.com` and `+27 00 000 0000` — footer and contact page

Then, page by page:

- **Photos** — every dashed box (`<div class="placeholder">`) is a
  labeled stand-in. Drop your image in `images/`, then replace the
  `<div>` with `<img src="images/your-file.jpg" alt="...">`.
- **about.html** — the bio, teaching philosophy and four-chapter
  timeline are written as realistic placeholder copy, not your real
  story. Rewrite with your actual history, dates and specifics.
- **lessons.html** — the pricing table (R350 / R450 / R1,300 / R1,100)
  is an example. Set your real rates and formats.
- **courses.html** — the four courses (titles, module counts, prices)
  are placeholders for the kind of thing you might sell — replace
  with your actual course names and content once they exist.
- **involvements.html** — deliberately generic ("a Sunday worship
  team", "regional artists") since I don't know the real churches,
  bands, schools or studios you work with. Name them once you're
  ready to.
- **media.html** — swap each video placeholder for a real embed (see
  below) and drop photos into the gallery grid.

## Connecting the booking & contact forms

Both forms currently run in **demo mode** — `js/main.js` intercepts
the submit event and shows a confirmation message instead of
sending anything anywhere (there's no backend in a static site).
Two easy ways to make them real, without writing a server:

**Option A — Formspree or similar form backend**
1. Create a free form endpoint at formspree.io (or Netlify Forms if
   you host on Netlify — see below).
2. In `booking.html` and `contact.html`, change the `<form>` tag's
   `data-demo-form` attribute to a real `action="https://formspree.io/f/your-id"`
   and `method="POST"`, and remove `data-demo-form` so `main.js` stops
   intercepting it.

**Option B — Netlify Forms (if hosting on Netlify)**
1. Add `data-netlify="true"` and a `name="booking"` (or `"contact"`)
   attribute to the `<form>` tag, remove `data-demo-form`.
2. Netlify detects the form at deploy time and gives you a dashboard
   of submissions automatically — no extra service needed.

**Option C — a calendar tool instead of a form**
For the booking page specifically, you can embed a scheduler like
Calendly directly in the "Prefer to book directly on a calendar?"
panel in `booking.html`:

```html
<div class="calendly-inline-widget" data-url="https://calendly.com/your-handle" style="min-width:280px;height:630px;"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

## Selling courses

The "Enroll" buttons on `courses.html` link to a `#enroll` anchor
with an explanatory note — there's no payment processing in a static
site. The simplest paths:

- **Course platform** (Teachable, Podia, Thinkific) — host the
  videos and handle payment there, and point each "Enroll" button at
  that course's checkout URL.
- **Stripe Payment Links or Gumroad** — if you're hosting the video
  content yourself, generate a payment link for each course and use
  it as the button's `href`.

## Adding real video

Replace a video placeholder block with a responsive embed, e.g.:

```html
<div style="aspect-ratio:16/9;">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title" frameborder="0" allowfullscreen></iframe>
</div>
```

## Deploying

Any static host works. Two of the simplest, both free to start:

- **Netlify** — drag the whole `bass-player-website` folder onto
  app.netlify.com/drop, or connect a GitHub repo for automatic
  redeploys.
- **GitHub Pages** — push this folder to a GitHub repo and enable
  Pages in the repo settings.

Once deployed, point your domain's DNS at the host following their
instructions, and update the meta description tags in each `<head>`
if your final page titles or URLs change.

## Notes on what's already handled

- **Responsive** down to small phones; the nav collapses to a menu
  button under 900px wide.
- **Accessible**: visible keyboard focus states, semantic headings,
  labeled form fields, alt text on placeholder images so screen
  readers announce what's missing.
- **Reduced motion**: respects `prefers-reduced-motion` — transitions
  and scroll behavior turn off for anyone who's set that preference.
- **SEO basics**: each page has its own `<title>` and meta
  description — update them once real copy is in place.
- **Favicon**: none is set yet — add a `favicon.ico` or
  `favicon.svg` to the root and link it from each `<head>`.
