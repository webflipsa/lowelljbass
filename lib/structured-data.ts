/**
 * schema.org structured data (JSON-LD) — the machine-readable layer search engines use to understand
 * *who* Lowell is, *what* he offers, and which pages/images belong together. Entities are connected with
 * @id references so Google sees one coherent "Lowell Jeffery" entity rather than loose snippets.
 *
 * Only facts that are on the site are used here. When real details exist, extend:
 *  - an in-person teaching location → add a `LocalBusiness` with `address` + `geo` (and a Google Business Profile)
 *  - confirmed gigs → add `Event` entries (name, startDate, location) next to DATES in lib/content.ts
 *  - a price for The Art of the Feel → add `offers` to the Course
 */
import { GALLERY } from './content';
import { PHOTOS } from './photos';
import { SITE, SOCIALS } from './site';

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE.url}${p}`);

export const ID = {
  website: `${SITE.url}/#website`,
  person: `${SITE.url}/#person`,
  homePage: `${SITE.url}/#webpage`,
  heroImage: `${SITE.url}/#primaryimage`,
  bassLessons: `${SITE.url}/#service-bass-lessons`,
  guitarLessons: `${SITE.url}/#service-guitar-lessons`,
  bookings: `${SITE.url}/#service-bass-player-bookings`,
  course: `${SITE.url}/courses#course-the-art-of-the-feel`,
  crc: `${SITE.url}/#org-crc`,
  schoolOfRock: `${SITE.url}/#org-school-of-rock`,
} as const;

const imageObject = (p: { src: string; width: number; height: number; alt: string }, id?: string) => ({
  '@type': 'ImageObject',
  ...(id ? { '@id': id } : {}),
  url: abs(p.src),
  contentUrl: abs(p.src),
  width: p.width,
  height: p.height,
  caption: p.alt,
  encodingFormat: 'image/webp',
});

const person = {
  '@type': 'Person',
  '@id': ID.person,
  name: SITE.name,
  url: SITE.url,
  image: { '@id': ID.heroImage },
  jobTitle: 'Bassist and bass teacher',
  description:
    'Experienced bass teacher, session bassist and worship bassist with 25+ years across jazz, rock, blues, pop and gospel. Twenty years on the worship team at Christian Revival Church (CRC) and 15 years teaching.',
  knowsAbout: [
    'Bass guitar',
    'Bass lessons',
    'Bass guitar teaching',
    'Worship bass',
    'Session bass playing',
    'Bass transcription',
    'Ear training',
    'Jazz bass',
    'Blues bass',
    'Rock bass',
    'Gospel bass',
    'Guitar lessons',
  ],
  worksFor: { '@id': ID.schoolOfRock },
  affiliation: { '@id': ID.crc },
  sameAs: Object.values(SOCIALS),
  makesOffer: [ID.bassLessons, ID.guitarLessons, ID.bookings].map((id) => ({ '@type': 'Offer', itemOffered: { '@id': id } })),
};

const country = { '@type': 'Country', name: 'South Africa' };

/** Whole-site graph for the home page. */
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': ID.website,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: 'en-ZA',
        publisher: { '@id': ID.person },
      },
      {
        '@type': 'WebPage',
        '@id': ID.homePage,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        inLanguage: 'en-ZA',
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.person },
        primaryImageOfPage: { '@id': ID.heroImage },
        dateModified: SITE.updated,
      },
      imageObject(PHOTOS.hero, ID.heroImage),
      person,
      { '@type': 'Organization', '@id': ID.crc, name: 'Christian Revival Church (CRC)', alternateName: 'CRC' },
      { '@type': 'Organization', '@id': ID.schoolOfRock, name: 'School of Rock' },
      {
        '@type': 'Service',
        '@id': ID.bassLessons,
        name: 'Bass lessons — online or in person',
        serviceType: 'Bass guitar lessons',
        description:
          'Private bass lessons from first notes to session-ready: groove and time-feel, walking lines and jazz vocabulary, worship-team playing, reading, theory and transcription. In person or online; the first lesson includes a tone and technique check-up.',
        provider: { '@id': ID.person },
        areaServed: country,
        audience: { '@type': 'Audience', audienceType: 'Beginner to working bass players' },
        availableChannel: [
          { '@type': 'ServiceChannel', name: 'Online bass lessons', serviceUrl: `${SITE.url}/#book` },
          { '@type': 'ServiceChannel', name: 'In-person bass lessons', serviceUrl: `${SITE.url}/#book` },
        ],
        url: `${SITE.url}/#lessons`,
      },
      {
        '@type': 'Service',
        '@id': ID.guitarLessons,
        name: 'Guitar lessons — rhythm-first',
        serviceType: 'Guitar lessons',
        description: 'Rhythm-first guitar lessons: chords, strumming and rhythm, blues and rock foundations, and playing in a band setting.',
        provider: { '@id': ID.person },
        areaServed: country,
        url: `${SITE.url}/#lessons`,
      },
      {
        '@type': 'Service',
        '@id': ID.bookings,
        name: 'Bass player bookings — session work, live and worship teams',
        serviceType: 'Session and live bass player; worship-team coaching',
        description:
          'Book an experienced bass player for session work, live performance and worship teams, plus coaching and arrangement help for ministry bands.',
        provider: { '@id': ID.person },
        areaServed: country,
        url: `${SITE.url}/#contact`,
      },
    ],
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

export function coursesJsonLd() {
  const art = PHOTOS.courseArt;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Courses', path: '/courses' },
      ]),
      {
        '@type': 'WebPage',
        url: abs('/courses'),
        name: 'Bass courses online — The Art of the Feel',
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.course },
        inLanguage: 'en-ZA',
      },
      {
        '@type': 'Course',
        '@id': ID.course,
        name: 'The Art of the Feel',
        description:
          'A study on bass transcription for new and intermediate bassists — train your ear, lift lines from records, and make them your own. Self-paced and online.',
        url: abs('/courses'),
        image: abs(art.src),
        provider: { '@id': ID.person },
        instructor: { '@id': ID.person },
        educationalLevel: ['Beginner', 'Intermediate'],
        teaches: ['Bass transcription', 'Ear training', 'Building your own bass vocabulary'],
        inLanguage: 'en',
        courseMode: 'online',
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'Self-paced' },
      },
    ],
  };
}

export function galleryJsonLd() {
  const photos = GALLERY.flatMap((y) => y.tiles);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
      ]),
      {
        '@type': 'ImageGallery',
        url: abs('/gallery'),
        name: 'Lowell Jeffery photo gallery',
        description: 'Photos of bassist and bass teacher Lowell Jeffery live on stage and leading worship, sorted by year.',
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.person },
        inLanguage: 'en-ZA',
        image: photos.map((p) => imageObject(p)),
      },
    ],
  };
}
