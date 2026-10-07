import Image from 'next/image';
import { INVOLVEMENTS } from '@/lib/content';
import { NeckCells, Tag } from '../ui';

export default function Involvements() {
  return (
    <section id="involvements" data-fret="7" data-screen-label="Involvements" className="fret-row">
      <NeckCells fret={7} />
      <div className="sec-body">
        <div data-reveal="d" className="sec-head">
          <Tag lead="Fret 07" label="Involvements" reveal="m" />
          <h2 data-reveal="m" className="h2">
            Where you&apos;ll <em>hear him.</em>
          </h2>
        </div>
        <div className="inv-grid">
          {INVOLVEMENTS.map((c) => (
            <article key={c.title} data-reveal="" className="inv-card">
              {c.photo ? (
                <Image
                  className="inv-img"
                  src={c.photo.src}
                  width={c.photo.width}
                  height={c.photo.height}
                  alt={c.photo.alt}
                  sizes="(max-width: 899px) 90vw, 30vw"
                  quality={90}
                  style={c.focus ? { objectPosition: c.focus } : undefined}
                />
              ) : (
                <div className="inv-ph">
                  <span>{c.placeholder}</span>
                </div>
              )}
              <div className="inv-text">
                <div className="inv-top">
                  <span className="inv-kind">{c.kind}</span>
                  <span className="inv-fig">{c.figure}</span>
                </div>
                <h3 className="inv-title">{c.title}</h3>
                <p className="inv-body">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
