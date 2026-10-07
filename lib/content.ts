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

/** Gallery + Courses pages. */
export const PAGE_NAV: NavItem[] = [
  { label: 'Home', href: '/#top', key: 'home' },
  { label: 'Media', href: '/#media', key: 'media' },
  { label: 'Gallery', href: '/gallery', key: 'gallery' },
  { label: 'Courses', href: '/courses', key: 'courses' },
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
