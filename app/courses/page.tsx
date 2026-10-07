import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import NotifyForm from '@/components/NotifyForm';
import RevealObserver from '@/components/RevealObserver';
import SiteNav from '@/components/SiteNav';
import { Tag } from '@/components/ui';
import { PHOTOS } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { coursesJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({
  path: '/courses',
  title: 'Online Bass Courses — The Art of the Feel | Lowell Jeffery',
  description:
    'Self-paced online bass courses by Lowell Jeffery. The Art of the Feel is a bass transcription and ear-training course for new and intermediate bassists.',
});

const POINTS = [
  'Ear training from real recordings',
  'Transcribing lines by hand, at your own pace',
  'Turning transcriptions into your own vocabulary',
];

export default function CoursesPage() {
  const art = PHOTOS.courseArt;
  return (
    <div className="page page-courses">
      <div className="grain" aria-hidden="true" />
      <SiteNav variant="page" active="courses" />

      <main className="pg-main">
        <header data-reveal="" className="pg-head">
          <Link href="/#courses" className="pg-back">
            ← Back to home
          </Link>
          <Tag lead="Fret 12" label="All courses" />
          <h1 className="pg-h1">
            Learn at your own <em>tempo.</em>
          </h1>
          <p className="pg-lead">Self-paced online bass courses to build real playing habits — one course live now, more in production.</p>
        </header>

        <article data-reveal="" className="cp-card">
          <Image className="cp-img" src={art.src} width={art.width} height={art.height} alt={art.alt} priority />
          <div className="cp-text">
            <span className="badge-amber">Featured course</span>
            <h2 className="cp-title">
              The Art of <em>the Feel</em>
            </h2>
            <p className="cp-blurb">
              A study on bass transcription for new and intermediate bassists — train your ear, lift lines from records, and make them your own.
            </p>
            <div className="cp-points">
              {POINTS.map((p) => (
                <div key={p}>
                  <span className="dot" />
                  {p}
                </div>
              ))}
            </div>
            <div className="chips chips-course">
              <span>New → Intermediate</span>
              <span>Transcription</span>
              <span>Ear training</span>
              <span>[Self-paced · online]</span>
            </div>
            <div className="course-actions">
              <a href="#" className="btn-cream">
                Enroll now
              </a>
              <span className="price">PRICE — TBC</span>
            </div>
          </div>
        </article>

        <article data-reveal="" className="notify-card">
          <div className="notify-copy">
            <h3>More courses in production</h3>
            <p>Get a note when the next one drops.</p>
          </div>
          <NotifyForm />
        </article>
      </main>

      <footer className="pg-foot">
        <span>© {new Date().getFullYear()} Lowell Jeffery</span>
        <Link href="/#top">Back to {SITE.domain}</Link>
      </footer>

      <JsonLd data={coursesJsonLd()} />
      <RevealObserver />
    </div>
  );
}
