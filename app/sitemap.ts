import type { MetadataRoute } from 'next';
import { GALLERY } from '@/lib/content';
import { PHOTOS } from '@/lib/photos';
import { SITE } from '@/lib/site';

const abs = (p: string) => `${SITE.url}${p}`;

/**
 * lastModified comes from SITE.updated (bump it when content changes) rather than "now", so the date only
 * changes when the site actually does — search engines trust (and re-crawl on) honest lastmod values.
 * Images are listed so Google Images can discover them with their descriptive file names.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.updated);
  const home = [PHOTOS.hero, PHOTOS.sunburst, PHOTOS.crc, PHOTOS.teaching, PHOTOS.stageLights, PHOTOS.churchStage, PHOTOS.band].map((p) => abs(p.src));
  const gallery = GALLERY.flatMap((y) => y.tiles).map((p) => abs(p.src));

  return [
    { url: SITE.url, lastModified, changeFrequency: 'monthly', priority: 1, images: home },
    { url: abs('/bass-lessons'), lastModified, changeFrequency: 'monthly', priority: 0.9, images: [abs(PHOTOS.sunburst.src)] },
    {
      url: abs('/book-a-bassist'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [PHOTOS.stageLights, PHOTOS.churchStage, PHOTOS.dreamweek, PHOTOS.crc, PHOTOS.worshipStage].map((p) => abs(p.src)),
    },
    { url: abs('/courses'), lastModified, changeFrequency: 'monthly', priority: 0.8, images: [abs(PHOTOS.courseArt.src)] },
    { url: abs('/gallery'), lastModified, changeFrequency: 'monthly', priority: 0.6, images: gallery },
  ];
}
