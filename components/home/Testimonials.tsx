import { TESTIMONIALS } from '@/lib/content';
import { NeckCells, Tag } from '../ui';

export default function Testimonials() {
  return (
    <section id="testimonials" data-fret="17" data-screen-label="Testimonials" className="fret-row">
      <NeckCells fret={17} />
      <div className="sec-body sec-body--testimonials">
        <Tag lead="Fret 17" label="Students" reveal="" />
        <div className="quote-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} data-reveal="" className="quote">
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>{t.name}</strong> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
