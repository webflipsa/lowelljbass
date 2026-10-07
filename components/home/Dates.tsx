import { DATES } from '@/lib/content';
import { NeckCells, Tag } from '../ui';

export default function Dates() {
  return (
    <section id="dates" data-fret="15" data-screen-label="Dates" className="fret-row">
      <NeckCells fret={15} />
      <div className="sec-body sec-body--dates">
        <div data-reveal="d" className="sec-head">
          <Tag lead="Fret 15" label="Upcoming dates" reveal="m" />
          <h2 data-reveal="m" className="h2 h2--plain">
            On the <em>calendar.</em>
          </h2>
        </div>
        <div data-reveal="d" className="dates-list">
          {DATES.map((d, i) => (
            <div key={i} data-reveal="m" className="date-row">
              <span className="date-d">{d.date}</span>
              <span className="date-t">{d.title}</span>
              <span className="date-v">{d.venue}</span>
              <a href={d.href} className="date-link">
                Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
