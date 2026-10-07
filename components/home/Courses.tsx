import Image from 'next/image';
import Link from 'next/link';
import { PHOTOS } from '@/lib/photos';
import NotifyForm from '../NotifyForm';
import { NeckCells, Tag } from '../ui';

export default function Courses() {
  const art = PHOTOS.courseArt;
  return (
    <section id="courses" data-fret="12" data-screen-label="Courses" className="fret-row">
      <NeckCells fret={12} inlays="double" />
      <div className="sec-body">
        <div data-reveal="d" className="sec-head">
          <Tag lead="Fret 12" label="Courses" reveal="m" />
          <h2 data-reveal="m" className="h2">
            Learn at your own <em>tempo.</em>
          </h2>
        </div>
        <div className="courses-stack">
          <article data-reveal="" className="course-card">
            <Image className="course-img" src={art.src} width={art.width} height={art.height} alt={art.alt} />
            <div className="course-text">
              <span className="badge-amber">Featured course</span>
              <h3 className="course-title">
                The Art of <em>the Feel</em>
              </h3>
              <p className="course-blurb">
                A study on bass transcription for new and intermediate bassists — train your ear, lift lines from records, and make them your own.
              </p>
              <div className="chips chips-course">
                <span>New → Intermediate</span>
                <span>Transcription</span>
                <span>Ear training</span>
              </div>
              <div className="course-actions">
                <a href="#" className="btn-cream">
                  View course
                </a>
                <span className="price">PRICE — TBC</span>
              </div>
              <Link href="/courses" className="link-amber">
                View all courses →
              </Link>
            </div>
          </article>

          <article data-reveal="" className="notify-card">
            <div className="notify-copy">
              <h3>More courses in production</h3>
              <p>Get a note when the next one drops.</p>
            </div>
            <NotifyForm />
          </article>
        </div>
      </div>
    </section>
  );
}
