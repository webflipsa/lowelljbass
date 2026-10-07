import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import RevealObserver from '@/components/RevealObserver';
import SiteNav from '@/components/SiteNav';
import { Both, Tag } from '@/components/ui';
import { LESSONS, LESSON_FAQ, LESSON_PLACES, LESSON_STEPS, LESSON_TERMS, LESSON_WHO } from '@/lib/content';
import { PHOTOS } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { PAGE_SEO, SITE } from '@/lib/site';
import { lessonsJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({ ...PAGE_SEO.lessons });

export default function BassLessonsPage() {
  const teacher = PHOTOS.sunburst;
  return (
    <div className="page page-lessons">
      <div className="grain" aria-hidden="true" />
      <SiteNav variant="page" active="lessons" book={{ href: '#book', long: 'Book a lesson', short: 'Book' }} />

      <main className="pg-main">
        <header data-reveal="" className="pg-head">
          <Link href="/#lessons" className="pg-back">
            ← Back to home
          </Link>
          <Tag lead="Fret 09" label="Lessons" />
          <h1 className="pg-h1">
            Bass lessons in Pretoria, Johannesburg &amp; <em>online.</em>
          </h1>
          <p className="pg-lead">
            One-on-one lessons with an experienced bass teacher — 15 years of teaching and 25+ on the instrument. In person in Pretoria and
            Johannesburg, or online.
          </p>
          <div className="hero-cta">
            <a href="#book" className="btn-dark">
              Book a lesson
            </a>
            <a href="#learn" className="btn-outline-dark">
              What you&apos;ll learn
            </a>
          </div>
          <div className="lp-stats">
            <div className="lp-stat">
              <span className="lp-stat-n">{LESSON_TERMS.price}</span>
              <span className="lp-stat-l">per lesson</span>
            </div>
            <div className="lp-stat">
              <span className="lp-stat-n">~1 hr</span>
              <span className="lp-stat-l">lesson length</span>
            </div>
            <div className="lp-stat">
              <span className="lp-stat-n">15</span>
              <span className="lp-stat-l">years teaching</span>
            </div>
            <div className="lp-stat">
              <span className="lp-stat-n">25+</span>
              <span className="lp-stat-l">years on bass</span>
            </div>
          </div>
        </header>

        <section className="lp-section" aria-labelledby="where">
          <div data-reveal="" className="lp-head">
            <Tag lead="01" label="Where" />
            <h2 id="where" className="lp-h2">
              In the room, <em>or online.</em>
            </h2>
          </div>
          <div data-reveal="" className="lp-places">
            {LESSON_PLACES.map((p) => (
              <div key={p.name} className="lp-place">
                <span className="lp-place-mode">{p.mode}</span>
                <span className="lp-place-name">{p.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="learn" className="lp-section" aria-labelledby="work-on">
          <div data-reveal="" className="lp-head">
            <Tag lead="02" label="What you'll learn" />
            <h2 id="work-on" className="lp-h2">
              What you&apos;ll <em>work on.</em>
            </h2>
            <p className="lp-sub">Bass is the main focus. Guitar lessons are available too.</p>
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
        </section>

        <section className="lp-section" aria-labelledby="who">
          <div data-reveal="" className="lp-head">
            <Tag lead="03" label="Who it's for" />
            <h2 id="who" className="lp-h2">
              Wherever you&apos;re <em>starting from.</em>
            </h2>
          </div>
          <div className="lp-cards">
            {LESSON_WHO.map((c) => (
              <article key={c.title} data-reveal="" className="lp-card">
                <span className="lp-card-kind">{c.kind}</span>
                <h3 className="lp-card-title">{c.title}</h3>
                <p className="lp-card-body">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-section" aria-labelledby="how">
          <div data-reveal="" className="lp-head">
            <Tag lead="04" label="How it works" />
            <h2 id="how" className="lp-h2">
              Three simple <em>steps.</em>
            </h2>
          </div>
          <ol className="lp-steps">
            {LESSON_STEPS.map((s, i) => (
              <li key={s.title} data-reveal="" className="lp-step">
                <span className="lp-step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="lp-step-title">{s.title}</h3>
                <p className="lp-step-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <article data-reveal="" className="cp-card">
          <Image
            className="cp-img"
            src={teacher.src}
            width={teacher.width}
            height={teacher.height}
            alt={teacher.alt}
            style={{ objectPosition: '50% 30%' }}
          />
          <div className="cp-text">
            <span className="badge-amber">Your teacher</span>
            <h2 className="cp-title">
              Meet <em>Lowell.</em>
            </h2>
            <p className="cp-blurb">
              Lowell cut his teeth on jazz — walking lines, standards and the discipline of listening. Over time the rooms got bigger:
              contemporary rock, blues, pop, and two decades as bassist on the worship team at Christian Revival Church (CRC) across
              Bloemfontein, Johannesburg and Pretoria.
            </p>
            <p className="cp-blurb">
              Today he teaches what the stage taught him: great bass playing is less about more notes, and more about feel, pocket and tone.
            </p>
            <div className="chips chips-course">
              <span>25+ years on bass</span>
              <span>15 years teaching</span>
              <span>20 years at CRC</span>
              <span>School of Rock instructor</span>
            </div>
          </div>
        </article>

        <section id="book" className="lp-section lp-book" aria-labelledby="book-title">
          <div className="book-panel">
            <div data-reveal="" className="book-copy">
              <h2 id="book-title" className="book-title">
                Book a bass lesson
              </h2>
              <p>
                Send a quick note and Lowell will get back to you. Say whether you would like lessons in Pretoria, in Johannesburg or online,
                and what you would like to work on. Lessons run about an hour and cost {LESSON_TERMS.price} each.
              </p>
              <p className="lp-fine">
                Prefer to learn at your own pace? Try the online course,{' '}
                <Link href="/courses" className="lp-inline">
                  The Art of the Feel
                </Link>
                .
              </p>
            </div>
            <ContactForm defaultInterest="Bass lessons" />
          </div>
        </section>

        <section className="lp-section" aria-labelledby="faq">
          <div data-reveal="" className="lp-head">
            <Tag lead="05" label="FAQ" />
            <h2 id="faq" className="lp-h2">
              Questions, <em>answered.</em>
            </h2>
          </div>
          <Faq items={LESSON_FAQ} />
        </section>

        <nav className="lp-links" aria-label="More from Lowell">
          <Link data-reveal="" href="/book-a-bassist" className="lp-link">
            <span className="lp-link-kind">Bass player bookings</span>
            <span className="lp-link-title">Need a bassist for a session, gig or worship team?</span>
            <span className="lp-link-go">Book a bassist →</span>
          </Link>
          <Link data-reveal="" href="/courses" className="lp-link">
            <span className="lp-link-kind">Online course</span>
            <span className="lp-link-title">Learn bass transcription at your own tempo.</span>
            <span className="lp-link-go">The Art of the Feel →</span>
          </Link>
        </nav>
      </main>

      <footer className="pg-foot">
        <span>© {new Date().getFullYear()} Lowell Jeffery</span>
        <Link href="/#top">Back to {SITE.domain}</Link>
      </footer>

      <JsonLd data={lessonsJsonLd()} />
      <RevealObserver />
    </div>
  );
}
