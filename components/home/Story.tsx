import Image from 'next/image';
import { PHOTOS } from '@/lib/photos';
import { NeckCells, Tag } from '../ui';

const CHIPS = ['Jazz · roots', 'Contemporary rock', 'Blues', 'Pop', 'Worship & gospel'];

export default function Story() {
  const a = PHOTOS.sunburst;
  const b = PHOTOS.smile;
  return (
    <section id="story" data-fret="3" data-screen-label="Story" className="fret-row">
      <NeckCells fret={3} />
      <div className="sec-body story-body">
        <div data-reveal="d" className="story-text">
          <Tag lead="Fret 03" label="Story" reveal="m" />
          <h2 data-reveal="m" className="h2 h2--tight">
            Rooted in jazz. <em>Grown on stage.</em>
          </h2>
          <p data-reveal="m" className="story-p">
            Lowell cut his teeth on jazz — walking lines, standards and the discipline of listening. Over time the rooms got bigger:
            contemporary rock, blues, pop, and two decades as bassist on the worship team at Christian Revival Church (CRC) across
            Bloemfontein, Johannesburg and Pretoria.
          </p>
          <p data-reveal="m" className="story-p">
            Today he teaches what the stage taught him: great bass playing is less about more notes, and more about feel, pocket and tone.
          </p>
          <div data-reveal="m" className="chips story-chips">
            {CHIPS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div data-reveal="" className="story-photos">
          <Image className="story-img" src={a.src} width={a.width} height={a.height} alt={a.alt} />
          <Image className="story-img story-img--sq" src={b.src} width={b.width} height={b.height} alt={b.alt} />
        </div>
      </div>
    </section>
  );
}
