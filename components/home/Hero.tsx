import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';
import { FLAGS } from '@/lib/site';
import PluckStrings from '../PluckStrings';
import { Both } from '../ui';

export default function Hero() {
  const hero = PHOTOS.hero;
  return (
    <section id="top" data-fret="0" data-screen-label="Hero" className="fret-row hero">
      <div className="gutter" />
      <div className="neck-cell" data-neck="0" />
      <div className="hero-body">
        <div data-reveal="" className="hero-eyebrow">
          Bassist · Educator · Worship musician
        </div>

        <div data-reveal="d" className="hero-title">
          <h1 data-reveal="m" className="hero-h1">
            Lowell
            <br className="br-d" /> Jeffery
          </h1>
          <p data-reveal="m" className="hero-tag">
            Discover your tone.
          </p>
        </div>

        <div data-reveal="" className="hero-photo">
          <div className="hero-glow" />
          <Image
            className="hero-img"
            src={hero.src}
            width={hero.width}
            height={hero.height}
            alt={hero.alt}
            sizes="(max-width: 899px) 100vw, 420px"
            quality={90}
            priority
          />
          <div className="hero-badge">
            <i />
            <span>Tap the neck to play</span>
          </div>
        </div>

        {FLAGS.mobilePluckButtons && <PluckStrings sound={FLAGS.stringSound} />}

        <div data-reveal="d" className="hero-lower">
          <p data-reveal="m" className="hero-copy">
            Twenty-five years of low end — from jazz standards to worship stages, contemporary rock, blues and pop. Private bass and guitar
            lessons, in person and online.
          </p>
          <div data-reveal="m" className="hero-cta">
            <a href="#book" className="btn-dark">
              Book a lesson
            </a>
            <a href="#courses" className="btn-outline-dark">
              Explore courses
            </a>
          </div>
          <div data-reveal="m" className="hero-stats">
            <div className="stat">
              <span className="stat-n">25+</span>
              <span className="stat-l">years on bass</span>
            </div>
            <div className="stat">
              <span className="stat-n">20</span>
              <span className="stat-l">
                <Both d="years serving at CRC" m="years at CRC" />
              </span>
            </div>
            <div className="stat">
              <span className="stat-n">15</span>
              <span className="stat-l">years teaching</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
