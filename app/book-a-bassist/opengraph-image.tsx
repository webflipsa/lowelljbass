import { OG_SIZE, OG_TYPE, renderOg } from '@/lib/og';

export const alt = 'Book a bassist — session, live and worship-team bass player Lowell Jeffery, CRC bassist.';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: 'Session · Live · Worship',
    title: 'Book a bassist',
    titleSize: 124,
    tagline: 'Lowell Jeffery — CRC worship bassist',
    footer: 'Lowell Jeffery — lowelljeffery.co.za',
    photo: '/assets/img/lowell-jeffery-five-string-bass-stage-lights.webp',
    photoPosition: '50% 30%',
  });
}
