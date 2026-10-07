import { OG_SIZE, OG_TYPE, renderOg } from '@/lib/og';

export const alt = 'Bass lessons in Pretoria, Johannesburg and online with experienced bass teacher Lowell Jeffery.';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: 'Pretoria · Johannesburg · Online',
    title: 'Bass lessons',
    titleSize: 128,
    tagline: 'With experienced bass teacher Lowell Jeffery',
    footer: 'Lowell Jeffery — lowelljeffery.co.za',
    photo: '/assets/img/lowell-jeffery-bassist-playing-sunburst-precision-bass.webp',
    photoPosition: '50% 35%',
  });
}
