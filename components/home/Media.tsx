import Image from 'next/image';
import Link from 'next/link';
import { PHOTOS } from '@/lib/photos';
import { SOCIALS } from '@/lib/site';
import { Both, NeckCells, Tag } from '../ui';

const SOCIAL_LINKS = [
  { label: 'YouTube ↗', href: SOCIALS.youtube },
  { label: 'Instagram ↗', href: SOCIALS.instagram },
  { label: 'Facebook ↗', href: SOCIALS.facebook },
];

const GRID = [
  { photo: PHOTOS.stageLights, tall: true },
  { photo: PHOTOS.band },
  { photo: PHOTOS.dreamweek, tall: true },
  { photo: PHOTOS.churchStage },
];

export default function Media() {
  const stage = PHOTOS.worshipStage;
  return (
    <section id="media" data-fret="5" data-screen-label="Media" className="fret-row media">
      <NeckCells fret={5} />
      <div className="media-wrap">
        <div className="media-card">
          <div data-reveal="d" className="media-head">
            <div className="media-head-l">
              <Tag lead="Fret 05" label="Media" tone="amber" reveal="m" />
              <h2 data-reveal="m" className="h2 h2--dark h2--plain">
                Watch &amp; <em>listen.</em>
              </h2>
            </div>
            <div data-reveal="m" className="media-socials">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" className="pill-light">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <a data-reveal="" href={SOCIALS.youtube} target="_blank" rel="noopener" className="video">
            <Image src={stage.src} alt="" fill className="video-bg" />
            <div className="video-inner">
              <span className="video-play">
                <span className="video-tri" />
              </span>
              <span className="video-label">
                <Both d="YouTube embed — featured video" m="Featured video" />
              </span>
            </div>
          </a>

          <div className="media-grid">
            {GRID.map(({ photo, tall }) => (
              <Image
                key={photo.src}
                data-reveal=""
                className={tall ? 'mg-img mg-img--tall' : 'mg-img'}
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
              />
            ))}
          </div>

          <Link data-reveal="" href="/gallery" className="pill-light pill-light--lg">
            View full gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
