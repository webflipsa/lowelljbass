import { OG_SIZE, OG_TYPE, renderOg } from '@/lib/og';

export const alt = 'Photo gallery of Lowell Jeffery — bassist and bass teacher — live on stage and leading worship.';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: 'Photo gallery',
    title: 'Every show.',
    titleSize: 128,
    tagline: 'Every session.',
    footer: 'Lowell Jeffery, bassist — lowelljeffery.co.za',
    photo: '/assets/img/lowell-jeffery-five-string-bass-stage-lights.webp',
    photoPosition: '50% 40%',
  });
}
