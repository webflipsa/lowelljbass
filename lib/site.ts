export const SITE = {
  name: 'Lowell Jeffery',
  domain: 'lowelljeffery.co.za',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://lowelljeffery.co.za').replace(/\/$/, ''),
  title: 'Lowell Jeffery — Bassist & Educator · Discover your tone',
  description:
    'Lowell Jeffery — bassist, educator and worship musician with 25+ years across jazz, rock, blues, pop and gospel. Bass & guitar lessons in person and online.',
  /** Cal.com / Calendly link. When set, the booking panel embeds it and the CTA opens it. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || '',
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
