# Setting up Cal.com for bass lessons & bookings

The website already has a booking panel ("Book a lesson") built to show your live Cal.com calendar. This guide sets up
the Cal.com side and then switches the website on. Cal.com's menus move around now and then, so if a label differs
slightly, look for the closest match.

> **Status when this was written:** `https://cal.com/lowelljeffery` returned a *404 – page not found*, so there was no public
> page at that address yet. Either the username is something else (check Step 1) or the account setup wasn't finished.
> Nothing on the website needs changing except one setting (Step 9).

---

## 1. Confirm your public address
1. Log in at cal.com → **Settings → My Account → Profile**.
2. Check **Username**. Your public page is `https://cal.com/<username>`. If you want `lowelljeffery`, set it here
   (it must be free and unused).
3. Open `https://cal.com/<username>` in a private/incognito window. It should show your name, photo and event types.
   If it still shows 404, finish the onboarding prompts first.

## 2. Make the profile look right
- **Photo** and **Bio**, e.g. *"Experienced bass teacher and CRC worship bassist. Bass lessons online or in person, plus bass player bookings. lowelljeffery.co.za"* — the website link is a free backlink.
- **Settings → My Account → Appearance**: pick **dark** theme and set the **brand colour to `#e0a04a`** so Cal matches the website.
- **Time zone**: `Africa/Johannesburg` (Settings → My Account → General).

## 3. Connect your calendar (prevents double-booking)
**Settings → Calendars** (or **Apps → Calendar**): connect Google Calendar (or Outlook/iCloud). Tick the calendar(s)
Cal should *check for conflicts*, and choose which calendar new bookings are *added to*.

## 4. Set your availability
**Availability →** open the default schedule and set your teaching days/hours.
Tip: if in-person lessons only happen on certain days, make a second schedule (e.g. "In-person days") and attach it to the
in-person event type only.

## 5. Create the event types
**Event Types → New.** Suggested set (the slug becomes the end of the link):

| Title | Slug | Length | Location |
| --- | --- | --- | --- |
| Bass Lesson — Online | `bass-lesson-online` | 60 min* | Cal Video, Google Meet or Zoom |
| Bass Lesson — In Person | `bass-lesson-in-person` | 60 min* | In person — your teaching address |
| First Lesson — Tone & Technique Check-up | `first-lesson` | 60 min* | Your choice (online or in person) |
| Bass Player Booking — Enquiry Call | `booking-enquiry` | 15–20 min | Phone or video |
| *(optional)* Guitar Lesson | `guitar-lesson` | 60 min* | Online / in person |

\*Use whatever lesson length you really teach (30/45/60).

For each: write a short, plain-English **description** that says what the person gets (e.g. *"One-on-one online bass lesson with experienced
bass teacher Lowell Jeffery — technique, groove, theory or worship-team playing."*). Natural wording helps, because Cal event pages can also appear in search.

> The website says the first lesson "includes a quick tone and technique check-up" — the **First Lesson** event is where that lives.

## 6. Tune each event type
Inside each event type:
- **Limits** — *Minimum notice* (e.g. 12–24 h), *Buffer before/after* (e.g. 15 min for travel or setup), *Limit bookings per day*, and *Slot interval*.
- **Advanced → Booking questions** — add: *Bass or guitar?*, *Experience level*, *What would you like to work on?*, *Mobile / WhatsApp number*.
  For the booking enquiry add: *Church / band / event name*, *Date and location*.
- **Requires confirmation** — switch on for **Bass Player Booking** so you can accept or decline each enquiry.
- **Redirect on booking** (optional) — send people to a thank-you page after booking (a page can be added to the site later).

## 7. Notifications & reminders
- **Settings → Notifications** (and event-type **Workflows**): send an email/SMS reminder 24 h before, and a follow-up after. Some automation options depend on your Cal.com plan — check before relying on them.
- Make sure the confirmation email includes the video link or address (it does automatically for Cal Video / Meet / Zoom and in-person locations).

## 8. Payments (optional)
Cal can collect payment at booking through its payment apps (**Apps → Payment**, e.g. Stripe or PayPal). Availability of
each provider depends on the country of the account, so check what's offered for South Africa. If you'd rather not take payment
in Cal, leave this off and invoice/EFT as you do today.

## 9. Switch the website on
1. In **Vercel → your project → Settings → Environment Variables**, add (Production + Preview):

   `NEXT_PUBLIC_CAL_LINK` = `lowelljeffery` *(or whatever your username/path is — no `https://`, no `cal.com/`)*

   - `lowelljeffery` → the panel shows your profile with all event types, so people choose **online** or **in person**.
   - `lowelljeffery/first-lesson` → the panel shows just that one event (best if you want every visitor to start with a first lesson).
2. **Redeploy** (Deployments → ⋯ → Redeploy). `NEXT_PUBLIC_` values are baked in at build time, so a redeploy is required.
3. For local testing put the same line in `.env.local` and run `npm run dev`.

What the site does with it:
- The **"Open booking calendar ↗"** button opens `https://cal.com/<your link>` in a new tab.
- The grey placeholder becomes the live calendar, **loaded only when the visitor scrolls near it** (keeps the page fast), themed dark with the amber accent.
- Until `NEXT_PUBLIC_CAL_LINK` is set, the button simply scrolls to the contact form.

## 10. Test it like a customer
1. Open the website in an incognito window → scroll to **Book a lesson** → the calendar should appear.
2. Make a real test booking with a different email address.
3. Check: the confirmation email, the entry in your calendar, the video link/address, and your booking-question answers.
4. Cancel the test booking.

## Troubleshooting
- **Panel stays on "Loading calendar…"** — the link is wrong or the page 404s. Open `https://cal.com/<your link>` directly.
- **Event type missing from the list** — it may be *hidden*; un-hide it under the event type's settings.
- **Calendar looks cramped** — embed a single event type (`username/slug`) instead of the profile, or tell me and I'll adjust the panel size.
- **Colours look off** — Settings → Appearance in Cal; the website also sends its own colour overrides (see `components/CalInline.tsx`).

## Privacy note
Bookings and the contact form collect personal details (names, emails, phone numbers). Under South Africa's POPIA it's good practice to
publish a short **privacy notice** and link it from the footer and Cal booking page. The site doesn't have one yet — worth adding before launch.
