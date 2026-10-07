/** Intrinsic sizes of the files in /public/assets/img (needed by next/image to reserve space). */
export type Photo = { src: string; width: number; height: number; alt: string };

const p = (file: string, width: number, height: number, alt: string): Photo => ({
  src: `/assets/img/${file}`,
  width,
  height,
  alt,
});

export const PHOTOS = {
  hero: p('lowell-hero.jpg', 720, 960, 'Lowell Jeffery holding his sunburst bass'),
  sunburst: p('lowell-sunburst.jpg', 853, 853, 'Lowell playing his sunburst bass outdoors'),
  smile: p('portrait-smile.jpg', 533, 533, 'Lowell smiling'),
  stageLights: p('stage-lights.jpg', 453, 604, 'Lowell on stage under lights'),
  band: p('band.jpg', 960, 575, 'Band portrait'),
  dreamweek: p('dreamweek.jpg', 960, 960, 'Lowell performing at Dreamweek'),
  churchStage: p('church-stage.jpg', 960, 720, 'Lowell leading worship on bass'),
  worshipStage: p('worship-stage.jpg', 1280, 622, 'Worship stage'),
  crc: p('crc.jpg', 720, 960, 'Lowell at Christian Revival Church'),
  teaching: p('teaching.jpg', 960, 960, 'Lowell teaching'),
  courseArt: p('course-art-of-the-feel.jpg', 828, 1792, 'The Art of the Feel course cover'),
} as const;
