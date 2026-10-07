import { PHOTOS, type Photo } from './photos';

/* ------------------------------------------------------------------ nav */

export type NavItem = { label: string; href: string; key?: string };

/** Home page: anchors within the one-page neck layout. */
export const HOME_NAV: NavItem[] = [
  { label: 'Story', href: '#story' },
  { label: 'Media', href: '#media' },
  { label: 'Involvements', href: '#involvements' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'Courses', href: '#courses' },
  { label: 'Dates', href: '#dates' },
  { label: 'Contact', href: '#contact' },
];

/** Gallery, Courses, Lessons and Bookings pages. Labels are kept short so the pill fits at 900px. */
export const PAGE_NAV: NavItem[] = [
  { label: 'Home', href: '/#top', key: 'home' },
  { label: 'Media', href: '/#media', key: 'media' },
  { label: 'Gallery', href: '/gallery', key: 'gallery' },
  { label: 'Lessons', href: '/bass-lessons', key: 'lessons' },
  { label: 'Courses', href: '/courses', key: 'courses' },
  { label: 'Bookings', href: '/book-a-bassist', key: 'bookings' },
  { label: 'Contact', href: '/#contact', key: 'contact' },
];

/* ---------------------------------------------------------- involvements */

export type Involvement = {
  kind: string;
  figure: string;
  title: string;
  body: string;
  photo?: Photo;
  /** Object-position for the photo crop. */
  focus?: string;
  /** Text shown in the striped placeholder tile when there's no photo yet. */
  placeholder?: string;
};

export const INVOLVEMENTS: Involvement[] = [
  {
    kind: 'Ministry',
    figure: '20 yrs',
    title: 'Christian Revival Church',
    body: 'Bass on the worship team across Bloemfontein, Johannesburg and Pretoria.',
    photo: PHOTOS.crc,
    focus: '50% 30%',
  },
  {
    kind: 'Teaching',
    figure: '15 yrs',
    title: 'Private bass lessons',
    body: 'One-on-one coaching for beginners through to working players.',
    photo: PHOTOS.teaching,
  },
  {
    kind: 'Institution',
    figure: '2026 —',
    title: 'School of Rock',
    body: 'Bass and guitar instructor, building young bands from first groove to first gig.',
    placeholder: 'School of Rock photo / logo',
  },
];

/* --------------------------------------------------------------- lessons */

export type LessonCard = {
  title: string;
  badge: { long: string; short: string };
  blurb: string;
  dot: string;
  primary: boolean;
  /** `d` shows on desktop, `m` on mobile (the mobile design shortens one bullet). */
  points: { d: string; m?: string }[];
};

export const LESSONS: LessonCard[] = [
  {
    title: 'Bass',
    badge: { long: 'Primary focus', short: 'Primary' },
    blurb: 'Electric bass from first notes to session-ready — technique, time and taste.',
    dot: '#e0a04a',
    primary: true,
    points: [
      { d: 'Groove, time-feel & the pocket' },
      { d: 'Walking lines & jazz vocabulary' },
      { d: 'Worship-team playing & song arrangement', m: 'Worship-team playing & arrangement' },
      { d: 'Reading, theory & transcription' },
    ],
  },
  {
    title: 'Guitar',
    badge: { long: 'Secondary', short: 'Secondary' },
    blurb: 'Rhythm-first guitar for players who want to serve the song.',
    dot: '#d9823a',
    primary: false,
    points: [
      { d: 'Chords, strumming & rhythm' },
      { d: 'Blues & rock foundations' },
      { d: 'Playing in a band setting' },
    ],
  },
];

/* ----------------------------------------------------------------- dates */

export type DateRow = { date: string; title: string; venue: string; href: string };

/** Placeholder rows straight from the design — replace with real dates as they're confirmed. */
export const DATES: DateRow[] = [
  { date: 'DD MMM 2026', title: '[Gig / service / workshop]', venue: '[Venue, City]', href: '#' },
  { date: 'DD MMM 2026', title: '[Gig / service / workshop]', venue: '[Venue, City]', href: '#' },
  { date: 'DD MMM 2026', title: '[Gig / service / workshop]', venue: '[Venue, City]', href: '#' },
];

/* ---------------------------------------------------------- testimonials */

export type Testimonial = { quote: string; name: string; role: string };

/** Placeholder quotes straight from the design — replace with real ones. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '[Student quote — what changed in their playing after lessons with Lowell.]',
    name: '[Student name]',
    role: 'Bass student',
  },
  {
    quote: '[Quote from a worship leader, bandmate or parent.]',
    name: '[Name]',
    role: '[Role]',
  },
];

/* --------------------------------------------------------------- gallery */

export type GalleryTile = Photo & { span2?: boolean; focus?: string };

export type GalleryYear = {
  year: number;
  caption: string;
  muted?: boolean;
  tiles: GalleryTile[];
  /** Empty "reserved" tiles after the photos. Set to 0 to hide the placeholders. */
  emptySlots: number;
  slotCaption: string;
};

/**
 * Add photos here (drop the file in /public/assets/img first) and lower `emptySlots`
 * to retire a placeholder. Years render in the order listed.
 */
export const GALLERY: GalleryYear[] = [
  {
    year: 2026,
    caption: 'Stage · studio · behind the scenes',
    tiles: [
      { ...PHOTOS.hero, span2: true, focus: '50% 25%' },
      PHOTOS.stageLights,
      PHOTOS.band,
      { ...PHOTOS.dreamweek, span2: true },
      PHOTOS.churchStage,
      PHOTOS.worshipStage,
      { ...PHOTOS.crc, focus: '50% 30%' },
      PHOTOS.teaching,
    ],
    emptySlots: 2,
    slotCaption: 'Add a 2026 photo',
  },
  {
    year: 2027,
    caption: "Reserved for what's next",
    muted: true,
    tiles: [],
    emptySlots: 3,
    slotCaption: 'Drop a 2027 photo',
  },
];

/* --------------------------------------------------- landing pages (SEO) */
/* Copy for /bass-lessons and /book-a-bassist. Only facts the owner has confirmed (or that are already on the site)
   belong here — no invented prices, venues, availability or testimonials. FAQ answers are plain text on purpose:
   the same strings feed the visible FAQ and the FAQPage structured data, so the two can never disagree. */

export type FaqItem = { q: string; a: string; link?: { href: string; label: string } };

/** Confirmed by the owner: lessons are about an hour each at R380, taught in Pretoria and Johannesburg (and online). */
export const LESSON_TERMS = {
  price: 'R380',
  priceAmount: '380',
  currency: 'ZAR',
  length: 'about an hour',
  cities: ['Pretoria', 'Johannesburg'],
} as const;

/** "In the room, or online" strip on /bass-lessons. */
export const LESSON_PLACES = [
  { name: 'Pretoria', mode: 'In person' },
  { name: 'Johannesburg', mode: 'In person' },
  { name: 'Online', mode: 'Remote' },
] as const;

export type InfoCard = { kind: string; title: string; body: string };
export type Step = { title: string; body: string };

export const LESSON_WHO: InfoCard[] = [
  {
    kind: 'Beginners',
    title: 'Just starting out',
    body: 'Never played bass, or only just picked one up? Build a solid foundation in time, tone and technique from the first lesson.',
  },
  {
    kind: 'Returning players',
    title: 'Back after a break, or self-taught',
    body: 'Fill in the gaps — groove, reading, theory and the vocabulary that turns notes into lines.',
  },
  {
    kind: 'Worship bassists',
    title: 'Serving on a worship team',
    body: 'Learn to arrange parts, lock in with the band and play for the song, drawing on 20 years on the worship team at CRC.',
  },
  {
    kind: 'Working players',
    title: 'Gigging or session-bound',
    body: 'Walking lines, jazz vocabulary and transcription to sharpen what you already do on stage and in the studio.',
  },
];

/** Deliberately generic until the owner sends the real lesson structure. */
export const LESSON_STEPS: Step[] = [
  { title: 'Get in touch', body: 'Send a quick enquiry below and say whether you would like lessons in Pretoria, in Johannesburg or online.' },
  { title: 'First lesson', body: 'It includes a quick tone and technique check-up, so you and Lowell know where to start.' },
  {
    title: 'Keep building',
    body: 'Lessons run about an hour at R380 each. Work on groove, lines, worship-team playing, reading or theory — whatever moves your playing forward.',
  },
];

export const LESSON_FAQ: FaqItem[] = [
  {
    q: 'How much do bass lessons cost?',
    a: 'Lessons run about an hour and cost R380 each.',
  },
  {
    q: 'Where do you teach bass in person?',
    a: 'Lowell teaches bass in person in Pretoria and Johannesburg, and online as well.',
  },
  {
    q: 'Can I take bass lessons online?',
    a: 'Yes. Lessons are available both in person and online.',
  },
  {
    q: 'I have never played bass. Is that a problem?',
    a: 'Not at all. Lessons suit complete beginners right through to working players.',
  },
  {
    q: 'What happens in the first lesson?',
    a: 'The first lesson includes a quick tone and technique check-up.',
  },
  {
    q: 'What styles and skills can I learn?',
    a: 'Bass is Lowell’s main focus: groove, time-feel and the pocket; walking lines and jazz vocabulary; worship-team playing and song arrangement; and reading, theory and transcription. His background is jazz, with contemporary rock, blues, pop and worship and gospel alongside.',
  },
  {
    q: 'Do you teach guitar as well?',
    a: 'Yes. Guitar is a secondary focus, covering chords, strumming and rhythm, blues and rock foundations, and playing in a band.',
  },
  {
    q: 'Can I learn at my own pace instead?',
    a: 'The Art of the Feel is a self-paced online course on bass transcription for new and intermediate bassists.',
    link: { href: '/courses', label: 'See the course →' },
  },
];

export const BOOKING_SERVICES: InfoCard[] = [
  { kind: 'Studio', title: 'Session work', body: 'Bass for recordings — lines that sit in the pocket and serve the song.' },
  { kind: 'Stage', title: 'Live gigs & events', body: 'Feel, pocket and tone for your band, show or event.' },
  { kind: 'Church', title: 'Worship teams', body: 'Play with your church or worship team, drawing on two decades of serving as a CRC bassist.' },
  { kind: 'Ministry', title: 'Team coaching', body: 'Help for your bassist or your whole team — arrangement, feel and playing together.' },
];

/** Same styles as the home page's story chips. */
export const BOOKING_STYLES = ['Jazz · roots', 'Contemporary rock', 'Blues', 'Pop', 'Worship & gospel'];

export const BOOKING_STEPS: Step[] = [
  { title: 'Tell Lowell what you need', body: 'Share the date, the place and what you have in mind — a session, a gig, a service or team coaching.' },
  { title: 'He gets back to you', body: 'Lowell will get back to you to talk through the details.' },
  { title: 'Lock it in', body: 'Once you are both happy with the details, you are booked.' },
];

export const BOOKING_FAQ: FaqItem[] = [
  {
    q: 'What can I book Lowell for?',
    a: 'Session and studio work, live gigs and events, playing with church and worship teams, and coaching or arrangement help for worship teams.',
  },
  {
    q: 'What styles does he play?',
    a: 'Jazz is his root, alongside contemporary rock, blues, pop, and worship and gospel.',
  },
  {
    q: 'Can I book him for my church or worship team?',
    a: 'Yes. Lowell has served on the worship team at Christian Revival Church (CRC) for 20 years across Bloemfontein, Johannesburg and Pretoria, and he also coaches worship teams on arrangement and playing together.',
  },
  {
    q: 'How much does a booking cost?',
    a: 'There is no fixed price list. Send the details of what you have in mind and Lowell will get back to you.',
  },
  {
    q: 'How do I book?',
    a: 'Pick a time in the booking calendar on this page, or send an enquiry with the details using the form.',
  },
  {
    q: 'Does Lowell teach as well?',
    a: 'Yes. He teaches bass in Pretoria, Johannesburg and online, about an hour per lesson at R380.',
    link: { href: '/bass-lessons', label: 'About bass lessons →' },
  },
];
