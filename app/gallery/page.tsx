import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import RevealObserver from '@/components/RevealObserver';
import SiteNav from '@/components/SiteNav';
import { Tag } from '@/components/ui';
import { GALLERY } from '@/lib/content';
import { SITE } from '@/lib/site';

const description = 'Photo gallery of Lowell Jeffery — bassist, educator and worship musician — on stage and behind the scenes, updated year by year.';

export const metadata: Metadata = {
  title: { absolute: 'Lowell Jeffery — Gallery' },
  description,
  alternates: { canonical: '/gallery' },
  openGraph: { url: '/gallery', title: 'Lowell Jeffery — Gallery', description },
};

/** Empty "reserved" tile — dashed outline + picture glyph + caption. */
function Slot({ caption, ratio }: { caption: string; ratio?: boolean }) {
  return (
    <div data-reveal="" className={ratio ? 'slot slot--43' : 'slot'} aria-hidden="true">
      <div className="slot-in">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <div className="slot-cap">{caption}</div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="page page-gallery">
      <div className="grain" aria-hidden="true" />
      <SiteNav variant="page" active="gallery" />

      <main className="pg-main">
        <header data-reveal="" className="pg-head">
          <Link href="/#media" className="pg-back">
            ← Back to Media
          </Link>
          <Tag lead="Archive" label="Gallery" tone="amber" />
          <h1 className="pg-h1">
            Every show. <em>Every session.</em>
          </h1>
          <p className="pg-lead">Stage, studio and everything between — sorted by year. New photos land here as time goes on.</p>
        </header>

        {GALLERY.map((y) => (
          <section key={y.year} data-reveal="" className="year">
            <div className="year-head">
              <h2 className={y.muted ? 'year-n year-n--muted' : 'year-n'}>{y.year}</h2>
              <span className="year-cap">{y.caption}</span>
            </div>
            <div className={y.tiles.length ? 'gal-grid' : 'gal-grid gal-grid--empty'}>
              {y.tiles.map((t) => (
                <Image
                  key={t.src}
                  data-reveal=""
                  className={t.span2 ? 'gal-img gal-img--tall' : 'gal-img'}
                  src={t.src}
                  width={t.width}
                  height={t.height}
                  alt={t.alt}
                  sizes="(max-width: 700px) 100vw, (max-width: 1400px) 33vw, 460px"
                  quality={90}
                  style={t.focus ? { objectPosition: t.focus } : undefined}
                />
              ))}
              {Array.from({ length: y.emptySlots }, (_, i) => (
                <Slot key={`slot-${i}`} caption={y.slotCaption} ratio={y.tiles.length === 0} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="pg-foot">
        <span>© {new Date().getFullYear()} Lowell Jeffery</span>
        <Link href="/#top">Back to {SITE.domain}</Link>
      </footer>

      <RevealObserver />
    </div>
  );
}
