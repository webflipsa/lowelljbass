import { OG_SIZE, OG_TYPE, renderOg } from '@/lib/og';

export const alt = 'The Art of the Feel — an online bass transcription course by Lowell Jeffery for new and intermediate bassists.';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: 'Online bass courses',
    title: 'The Art of the Feel',
    titleSize: 108,
    tagline: 'Bass transcription for new & intermediate bassists',
    footer: 'Lowell Jeffery — lowelljeffery.co.za',
    photo: '/assets/img/the-art-of-the-feel-bass-transcription-course-cover.webp',
    photoPosition: '50% 38%',
  });
}
