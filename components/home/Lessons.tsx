import { LESSONS } from '@/lib/content';
import { SITE } from '@/lib/site';
import { Both, NeckCells, Tag } from '../ui';

export default function Lessons() {
  const booking = SITE.bookingUrl;
  return (
    <section id="lessons" data-fret="9" data-screen-label="Lessons" className="fret-row">
      <NeckCells fret={9} />
      <div className="sec-body">
        <div data-reveal="d" className="lessons-head">
          <div className="lessons-head-l">
            <Tag lead="Fret 09" label="Lessons" reveal="m" />
            <h2 data-reveal="m" className="h2">
              Find your pocket. <em>Keep it.</em>
            </h2>
          </div>
          <div data-reveal="m" className="lessons-pills">
            <span>In person</span>
            <span>Online</span>
          </div>
        </div>

        <div className="lessons-grid">
          {LESSONS.map((l) => (
            <article key={l.title} data-reveal="" className={l.primary ? 'lesson-card lesson-card--primary' : 'lesson-card'}>
              <div className="lesson-top">
                <h3 className="lesson-title">{l.title}</h3>
                <span className="lesson-badge">
                  <Both d={l.badge.long} m={l.badge.short} />
                </span>
              </div>
              <p className="lesson-blurb">{l.blurb}</p>
              <div className="lesson-points">
                {l.points.map((pt) => (
                  <div key={pt.d}>
                    <span className="dot" style={{ background: l.dot }} />
                    <Both d={pt.d} m={pt.m ?? pt.d} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div id="book" data-reveal="" className="book-panel">
          <div className="book-copy">
            <h3 className="book-title">Book a lesson</h3>
            <p>Pick a time that suits you — in person or online. First lesson includes a quick tone and technique check-up.</p>
            {/* With no booking URL configured yet, send people to the contact form rather than a dead link. */}
            <a
              href={booking || '#contact'}
              className="btn-amber"
              {...(booking ? { target: '_blank', rel: 'noopener' } : {})}
            >
              Open booking calendar ↗
            </a>
          </div>
          <div className={booking ? 'book-embed book-embed--live' : 'book-embed'}>
            {booking ? (
              <iframe src={booking} title="Book a lesson" loading="lazy" />
            ) : (
              <span>
                Cal.com / Calendly
                <br />
                scheduler embed
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
