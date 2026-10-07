/**
 * Catalogue of the site's photos (all WebP in /public/assets/img).
 *
 * SEO notes — keep these in mind when adding photos:
 *  - File names are descriptive, kebab-case and keyword-bearing (Google Images reads them).
 *    Use `npm run img -- <file> <descriptive-name>` to convert + name a new one.
 *  - `alt` describes what is actually in the picture, naturally, with the person/place/instrument
 *    where it helps. No keyword lists.
 *  - width/height are the intrinsic pixel size (stops layout shift and is used in structured data).
 */
export type Photo = { src: string; width: number; height: number; alt: string };

const p = (file: string, width: number, height: number, alt: string): Photo => ({
  src: `/assets/img/${file}`,
  width,
  height,
  alt,
});

export const PHOTOS = {
  hero: p(
    'lowell-jeffery-bass-teacher-with-sunburst-bass.webp',
    720,
    960,
    'Lowell Jeffery, bass teacher and worship bassist, holding his sunburst bass guitar',
  ),
  sunburst: p(
    'lowell-jeffery-bassist-playing-sunburst-precision-bass.webp',
    853,
    853,
    'Lowell Jeffery playing his sunburst Precision Bass outdoors',
  ),
  smile: p('lowell-jeffery-smiling-portrait.webp', 533, 533, 'Smiling portrait of bassist and bass teacher Lowell Jeffery'),
  stageLights: p(
    'lowell-jeffery-five-string-bass-stage-lights.webp',
    453,
    604,
    'Lowell Jeffery with his five-string bass on a church stage under pink and red stage lights',
  ),
  band: p(
    'lowell-jeffery-band-portrait-violin-guitar-bass.webp',
    960,
    575,
    'Lowell Jeffery band portrait with violin, acoustic guitar and bass guitar',
  ),
  dreamweek: p(
    'lowell-jeffery-bassist-dreamweek-live.webp',
    960,
    960,
    'Lowell Jeffery playing bass guitar in a black-and-white DreamWeek performance photo',
  ),
  churchStage: p(
    'lowell-jeffery-worship-bassist-church-stage.webp',
    960,
    720,
    'Lowell Jeffery playing bass with the worship band on a church stage',
  ),
  worshipStage: p(
    'worship-team-live-on-stage-with-lyrics.webp',
    1280,
    622,
    'Worship team and band performing live on a lit church stage with song lyrics on the screen',
  ),
  crc: p(
    'lowell-jeffery-crc-bassist-christian-revival-church.webp',
    720,
    960,
    'Lowell Jeffery, CRC bassist, standing beside the CRC logo at Christian Revival Church',
  ),
  teaching: p('lowell-jeffery-bass-teacher-on-stage.webp', 960, 960, 'Lowell Jeffery teaching with a microphone on a church stage'),
  courseArt: p(
    'the-art-of-the-feel-bass-transcription-course-cover.webp',
    828,
    1792,
    'The Art of the Feel — bass transcription course cover by Lowell Jeffery',
  ),
} as const;

/** Decorative bass artwork that builds the neck illustration (alt is intentionally empty on the page). */
export const BASS_ART = {
  headstock: { src: '/assets/img/bass/fender-precision-bass-headstock.webp', width: 421, height: 769 },
  body: { src: '/assets/img/bass/sunburst-precision-bass-body.webp', width: 760, height: 784 },
  neckTile: '/assets/img/bass/bass-fretboard-neck-tile.webp',
} as const;
