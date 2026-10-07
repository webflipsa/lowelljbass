import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CalEmbed from '@/components/CalEmbed';
import ContactForm from '@/components/ContactForm';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import RevealObserver from '@/components/RevealObserver';
import SiteNav from '@/components/SiteNav';
import { Tag } from '@/components/ui';
import { BOOKING_FAQ, BOOKING_SERVICES, BOOKING_STEPS, BOOKING_STYLES } from '@/lib/content';
import { PHOTOS } from '@/lib/photos';
import { pageMetadata } from '@/lib/seo';
import { PAGE_SEO, SITE } from '@/lib/site';
import { bookingsJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = pageMetadata({ ...PAGE_SEO.bookings });

/** Photo mosaic — placement lives in subpage.css (.bk-photos). */
const MOSAIC = [
  { photo: PHOTOS.stageLights, cls: 'bk-ph bk-ph--tall', focus: '50% 30%' },
  { photo: PHOTOS.churchStage, cls: 'bk-ph bk-ph--wide', focus: '50% 50%' },
  { photo: PHOTOS.dreamweek, cls: 'bk-ph', focus: '50% 55%' },
  { photo: PHOTOS.crc, cls: 'bk-ph', focus: '50% 30%' },
  { photo: PHOTOS.worshipStage, cls: 'bk-ph bk-ph--wide', focus: '50% 50%' },
];

export default function BookABassistPage() {
  const crc = PHOTOS.crc;
  const { calLink, url: calUrl } = SITE.bookings;
  return (
    <div className="page page-bookings">
      <div className="grain" aria-hidden="true" />
      <SiteNav variant="page" active="bookings" book={{ href: '#book', long: 'Book a bassist', short: 'Book' }} />

      <main className="pg-main">
        <header data-reveal="" className="pg-head">
          <Link href="/#involvements" className="pg-back">
            ← Back to home
          </Link>
          <Tag lead="Bookings" label="Bassist for hire" tone="amber" />
          <h1 className="pg-h1">
            Book a bassist for sessions, live &amp; <em>worship teams.</em>
          </h1>
          <p className="pg-lead">
            Lowell Jeffery has 25+ years on bass and two decades as a CRC bassist across Bloemfontein, Johannesburg and Pretoria — jazz
            roots, with a feel for contemporary rock, blues, pop and gospel.
          </p>
          <div className="hero-cta">
            <a href="#book" className="btn-amber">
              Book a time
            </a>
            <a href="#enquire" className="pill-light pill-light--lg">
              Send the details
            </a>
          </div>
          <div className="lp-stats">
            <div className="lp-stat">
              <span className="lp-stat-n">25+</span>
              <span className="lp-stat-l">years on bass</span>
            </div>
            <div className="lp-stat">
              <span className="lp-stat-n">20</span>
              <span className="lp-stat-l">years as a CRC bassist</span>
            </div>
            <div className="lp-stat">
              <span className="lp-stat-n">{BOOKING_STYLES.length}</span>
              <span className="lp-stat-l">styles, jazz to gospel</span>
            </div>
          </div>
        </header>

        <section className="lp-section" aria-labelledby="available">
          <div data-reveal="" className="lp-head">
            <Tag lead="01" label="What he plays" tone="amber" />
            <h2 id="available" className="lp-h2">
              Where he can <em>sit in.</em>
            </h2>
          </div>
          <div className="lp-cards">
            {BOOKING_SERVICES.map((c) => (
              <article key={c.title} data-reveal="" className="lp-card">
                <span className="lp-card-kind">{c.kind}</span>
                <h3 className="lp-card-title">{c.title}</h3>
                <p className="lp-card-body">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lp-section" aria-labelledby="sound">
          <div data-reveal="" className="lp-head">
            <Tag lead="02" label="The sound" tone="amber" />
            <h2 id="sound" className="lp-h2">
              Feel, pocket <em>&amp; tone.</em>
            </h2>
            <div className="chips chips-course">
              {BOOKING_STYLES.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="bk-photos">
            {MOSAIC.map(({ photo, cls, focus }) => (
              <Image
                key={photo.src}
                data-reveal=""
                className={cls}
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                style={{ objectPosition: focus }}
              />
            ))}
          </div>
        </section>

        <article data-reveal="" className="cp-card">
          <Image className="cp-img" src={crc.src} width={crc.width} height={crc.height} alt={crc.alt} style={{ objectPosition: '50% 30%' }} />
          <div className="cp-text">
            <span className="badge-amber">Ministry</span>
            <h2 className="cp-title">
              Twenty years as a <em>CRC bassist.</em>
            </h2>
            <p className="cp-blurb">
              Lowell has been bassist on the worship team at Christian Revival Church (CRC) for two decades, across Bloemfontein,
              Johannesburg and Pretoria. He also works with worship teams on arrangement, feel and playing together.
            </p>
            <div className="chips chips-course">
              <span>Bloemfontein</span>
              <span>Johannesburg</span>
              <span>Pretoria</span>
            </div>
            <Link href="/bass-lessons" className="link-amber">
              Bass lessons for worship-team players →
            </Link>
          </div>
        </article>

        <section className="lp-section" aria-labelledby="how">
          <div data-reveal="" className="lp-head">
            <Tag lead="03" label="How booking works" tone="amber" />
            <h2 id="how" className="lp-h2">
              Three simple <em>steps.</em>
            </h2>
          </div>
          <ol className="lp-steps">
            {BOOKING_STEPS.map((s, i) => (
              <li key={s.title} data-reveal="" className="lp-step">
                <span className="lp-step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="lp-step-title">{s.title}</h3>
                <p className="lp-step-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="book" className="lp-section lp-book" aria-labelledby="book-title">
          <div className="book-panel">
            <div data-reveal="" className="book-copy">
              <h2 id="book-title" className="book-title">
                Pick a time
              </h2>
              <p>
                Choose a slot in the calendar for your session, gig or worship team. Prefer to explain what you need first? Send the
                details instead.
              </p>
              <div className="lp-actions">
                {calUrl && (
                  <a href={calUrl} className="btn-amber" target="_blank" rel="noopener">
                    Open booking calendar ↗
                  </a>
                )}
                <a href="#enquire" className="pill-light pill-light--lg">
                  Send the details
                </a>
              </div>
            </div>
            <div className={calLink ? 'book-embed book-embed--live' : 'book-embed'}>
              {calLink ? (
                <CalEmbed calLink={calLink} />
              ) : (
                <span>
                  Booking calendar
                  <br />
                  coming soon
                </span>
              )}
            </div>
          </div>
        </section>

        <section id="enquire" className="lp-section lp-enquire" aria-labelledby="enquire-title">
          <div data-reveal="" className="lp-enquire-copy">
            <Tag lead="04" label="Enquire" tone="amber" />
            <h2 id="enquire-title" className="lp-h2">
              Send the <em>details.</em>
            </h2>
            <p className="lp-sub">Date, place and what you have in mind — Lowell will get back to you.</p>
          </div>
          <ContactForm defaultInterest="Booking / session work" />
        </section>

        <section className="lp-section" aria-labelledby="faq">
          <div data-reveal="" className="lp-head">
            <Tag lead="05" label="FAQ" tone="amber" />
            <h2 id="faq" className="lp-h2">
              Questions, <em>answered.</em>
            </h2>
          </div>
          <Faq items={BOOKING_FAQ} />
        </section>

        <nav className="lp-links" aria-label="More from Lowell">
          <Link data-reveal="" href="/bass-lessons" className="lp-link">
            <span className="lp-link-kind">Bass lessons</span>
            <span className="lp-link-title">Learn from an experienced bass teacher in Pretoria, Johannesburg or online.</span>
            <span className="lp-link-go">About bass lessons →</span>
          </Link>
          <Link data-reveal="" href="/gallery" className="lp-link">
            <span className="lp-link-kind">Gallery</span>
            <span className="lp-link-title">See Lowell on stage and leading worship.</span>
            <span className="lp-link-go">View the gallery →</span>
          </Link>
        </nav>
      </main>

      <footer className="pg-foot">
        <span>© {new Date().getFullYear()} Lowell Jeffery</span>
        <Link href="/#top">Back to {SITE.domain}</Link>
      </footer>

      <JsonLd data={bookingsJsonLd()} />
      <RevealObserver />
    </div>
  );
}
