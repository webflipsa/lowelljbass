/** Normalises "lowelljeffery", "lowelljeffery/bass-lesson" or a full cal.com URL to just the path part. */
const calLink = (process.env.NEXT_PUBLIC_CAL_LINK || '')
  .trim()
  .replace(/^https?:\/\/(?:app\.)?cal\.com\//i, '')
  .replace(/^\/+|\/+$/g, '');

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
    'Experienced bass teacher and CRC worship bassist Lowell Jeffery. Bass lessons online or in person, bass courses and bass player bookings in South Africa.',
  shareTitle: 'Lowell Jeffery — Bass Teacher, Bassist & CRC Worship Bassist',
  shareDescription:
    'Bass lessons online or in person, online bass courses and bass player bookings with experienced bassist and bass teacher Lowell Jeffery. 25+ years across jazz, rock, blues, pop and gospel.',
  /** Bump when page content changes materially (feeds the sitemap's <lastmod>). */
  updated: '2026-10-07',

  /** Cal.com booking page, e.g. "lowelljeffery" or "lowelljeffery/bass-lesson". Empty until configured. */
  booking: { calLink, url: calLink ? `https://cal.com/${calLink}` : '' },
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
