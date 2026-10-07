/** Normalises "lowelljeffery", "lowelljeffery/bass-lesson" or a full cal.com URL to just the path part. */
const calPath = (raw: string) =>
  raw
    .trim()
    .replace(/^https?:\/\/(?:app\.)?cal\.com\//i, '')
    .replace(/^\/+|\/+$/g, '');

const calLink = calPath(process.env.NEXT_PUBLIC_CAL_LINK || '');
// The "Bass Bookings" event on Lowell's Cal.com profile (note the username really is spelled with three f's).
// Used by /book-a-bassist. Override with NEXT_PUBLIC_CAL_LINK_BOOKINGS.
const bookingsCalLink = calPath(process.env.NEXT_PUBLIC_CAL_LINK_BOOKINGS || 'lowelljefffery/bass-bookings');

export const SITE = {
  name: 'Lowell Jeffery',
  domain: 'lowelljeffery.co.za',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://lowelljeffery.co.za').replace(/\/$/, ''),

  /* ---- search / social copy ------------------------------------------------
     Home title ≈ 61 chars and description ≈ 150 chars so neither is truncated in Google results.
     Target phrases: bass lessons (online / in person) · bass courses · experienced bass teacher ·
     bass player bookings · CRC bassist · Lowell Jeffery. */
  title: 'Lowell Jeffery | Bass Lessons, Courses & Bass Player Bookings',
  description:
    'Experienced bass teacher and CRC bassist Lowell Jeffery. Bass lessons in Pretoria, Johannesburg and online, bass courses and bass player bookings.',
  shareTitle: 'Lowell Jeffery — Bass Teacher, Bassist & CRC Worship Bassist',
  shareDescription:
    'Bass lessons in Pretoria, Johannesburg and online, online bass courses and bass player bookings with experienced bassist and bass teacher Lowell Jeffery. 25+ years across jazz, rock, blues, pop and gospel.',
  /** Bump when page content changes materially (feeds the sitemap's <lastmod>). */
  updated: '2026-10-08',

  /** Cal.com booking page for the home page's lesson panel, e.g. "lowelljeffery/bass-lesson". Empty until configured. */
  booking: { calLink, url: calLink ? `https://cal.com/${calLink}` : '' },
  /** Cal.com event for /book-a-bassist (sessions, live and worship-team bookings). */
  bookings: { calLink: bookingsCalLink, url: bookingsCalLink ? `https://cal.com/${bookingsCalLink}` : '' },
} as const;

/**
 * Search titles / descriptions for the dedicated landing pages (each is also used in that page's structured data).
 * Aim: titles ≲ 62 chars, descriptions ≲ 155 chars, so Google shows them untruncated.
 */
export const PAGE_SEO = {
  lessons: {
    path: '/bass-lessons',
    title: 'Bass Lessons: Pretoria, Johannesburg & Online | Lowell Jeffery',
    description:
      'Experienced bass teacher Lowell Jeffery gives bass lessons in Pretoria, Johannesburg and online. About an hour at R380, from beginners to working players.',
  },
  bookings: {
    path: '/book-a-bassist',
    title: 'Bass Player Bookings — Lowell Jeffery, CRC Bassist',
    description:
      'Bass player bookings: hire CRC worship bassist Lowell Jeffery for session work, live gigs, events and worship teams. Jazz, rock, blues, pop and gospel.',
  },
} as const;

export const SOCIALS = {
  youtube: 'https://www.youtube.com/@lowelljeffery3652',
  instagram: 'https://www.instagram.com/lowell.jeffery/',
  facebook: 'https://www.facebook.com/lowell.jeffery',
} as const;

export const FLAGS = {
  /**
   * The mobile design ships a row of E-A-D-G "tap a string" buttons under the hero photo,
   * switched off by default in the design file (`showPluck: false`). Flip to true to enable.
   */
  mobilePluckButtons: false,
  /** Home page neck: 1 = design default. Scales how hard the strings wobble. */
  stringVibration: 1,
  /** Home page neck: pluck sounds on/off (Web Audio, no audio files). */
  stringSound: true,
} as const;

export const INTEREST_OPTIONS = [
  'Bass lessons',
  'Guitar lessons',
  'Courses',
  'Booking / session work',
  'Ministry & worship teams',
] as const;
