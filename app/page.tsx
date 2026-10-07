import Image from 'next/image';
import Contact from '@/components/home/Contact';
import Courses from '@/components/home/Courses';
import Dates from '@/components/home/Dates';
import Hero from '@/components/home/Hero';
import Involvements from '@/components/home/Involvements';
import Lessons from '@/components/home/Lessons';
import Media from '@/components/home/Media';
import Story from '@/components/home/Story';
import Testimonials from '@/components/home/Testimonials';
import NeckEngine from '@/components/NeckEngine';
import RevealObserver from '@/components/RevealObserver';
import SiteNav from '@/components/SiteNav';
import { FLAGS } from '@/lib/site';

export default function HomePage() {
  return (
    <div className="home page-home">
      <div className="grain" aria-hidden="true" />

      {/* plucked-string overlay, positioned over the neck by NeckEngine */}
      <svg id="lj-strings" className="strings" width="100" height="100" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <path key={'sh' + i} id={`lj-sh-${i}`} fill="none" stroke="rgba(0,0,0,.45)" strokeLinecap="round" />
        ))}
        {['#cfc8ba', '#d6d0c3', '#e0dbd0', '#e8e4dc'].map((c, i) => (
          <path key={'st' + i} id={`lj-str-${i}`} fill="none" stroke={c} strokeLinecap="round" />
        ))}
      </svg>

      <div className="home-col">
        <SiteNav variant="home" />

        <main className="neck-layer">
          <Image
            className="headstock"
            src="/assets/img/bass/headstock-p4.png"
            width={421}
            height={769}
            alt=""
            aria-hidden="true"
            sizes="421px"
            quality={90}
            loading="eager"
          />
          <div id="lj-neck" className="neck" />

          <Hero />
          <Story />
          <Media />
          <Involvements />
          <Lessons />
          <Courses />
          <Dates />
          <Testimonials />
        </main>

        <Contact />
      </div>

      <NeckEngine vibration={FLAGS.stringVibration} sound={FLAGS.stringSound} />
      <RevealObserver />
    </div>
  );
}
