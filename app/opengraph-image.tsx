import { OG_SIZE, OG_TYPE, renderOg } from '@/lib/og';

export const alt = 'Lowell Jeffery — experienced bass teacher and CRC worship bassist. Bass lessons online or in person, bass courses and bass player bookings.';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: 'Bassist · Educator · Worship musician',
    title: 'Lowell Jeffery',
    tagline: 'Discover your tone.',
    footer: 'Bass lessons · Bass courses · Bookings — lowelljeffery.co.za',
    photo: '/assets/img/lowell-jeffery-bass-teacher-with-sunburst-bass.webp',
  });
}
