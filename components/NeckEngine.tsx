'use client';

import { useEffect } from 'react';
import { OPEN_STRINGS, playPluck } from '@/lib/pluck-audio';

/** String x-positions across the neck (fraction of neck width) and their widths. */
const X = [0.117, 0.376, 0.641, 0.876];
const SW = [0.034, 0.028, 0.021, 0.017];

/** Matches the CSS breakpoint where the bass-neck layout turns on (see home.css). */
const NECK_MQ = '(min-width: 900px)';

type Props = { vibration?: number; sound?: boolean };

/**
 * Drives the bass-neck interactions on the home page. Renders nothing — it attaches to the
 * `#lj-neck` / `#lj-strings` / `[data-neck]` / `[data-inlay]` markup rendered by the page.
 *
 *  - click a neck cell  -> plucks the nearest string (sound + SVG wobble)
 *  - scrolling          -> gently vibrates the strings
 *  - entering a section -> lights that fret's inlay dots and nudges the strings
 *
 * Logic is a straight port of the design prototype (`Lowell Jeffery v3.dc.html`).
 */
export default function NeckEngine({ vibration = 1, sound = true }: Props) {
  useEffect(() => {
    const svg = document.getElementById('lj-strings') as unknown as SVGSVGElement | null;
    const neck = document.getElementById('lj-neck');
    if (!svg || !neck) return;

    const vib = () => vibration;
    const amp = [0, 0, 0, 0];
    let t = 0;
    let raf = 0;
    let lastY = window.scrollY;

    const strings = [0, 1, 2, 3].map((i) => ({
      path: document.getElementById('lj-str-' + i),
      shadow: document.getElementById('lj-sh-' + i),
    }));

    /* ---- pluck -------------------------------------------------------- */
    const onClick = (e: MouseEvent) => {
      const cell = (e.target as Element | null)?.closest?.('[data-neck]');
      if (!cell) return;
      const r = neck.getBoundingClientRect();
      if (r.width === 0) return;
      const x = (e.clientX - r.left) / r.width;
      let i = 0;
      X.forEach((q, j) => {
        if (Math.abs(q - x) < Math.abs(X[i] - x)) i = j;
      });
      const fret = Number(cell.getAttribute('data-neck')) || 0;
      amp[i] = 11 * Math.max(vib(), 0.4);
      if (sound) playPluck(OPEN_STRINGS[i] * 2 * Math.pow(2, Math.min(fret, 20) / 12));
    };
    document.addEventListener('click', onClick);

    /* ---- scroll vibration -------------------------------------------- */
    const onScroll = () => {
      const v = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      const k = vib();
      for (let i = 0; i < 4; i++) amp[i] = Math.min(amp[i] + v * 0.03 * k * (1 + i * 0.15), 6 * k);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- string animation -------------------------------------------- */
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const nk = neck.getBoundingClientRect();
      const top = Math.max(0, nk.top);
      const bot = Math.min(window.innerHeight, nk.bottom);
      const H = bot - top;
      if (H <= 2) {
        svg.style.display = 'none';
        return;
      }
      svg.style.display = 'block';
      svg.style.top = top + 'px';
      svg.style.left = nk.left + 'px';
      svg.setAttribute('width', String(nk.width));
      svg.setAttribute('height', String(H));
      t += 0.016;

      for (let i = 0; i < 4; i++) {
        const { path: p, shadow: sh } = strings[i];
        if (!p || !sh) continue;
        const a = (amp[i] *= 0.95);
        const x0 = nk.width * X[i];
        const w = Math.max(1.2, nk.width * SW[i]);
        let d: string;
        let ds: string;
        if (a < 0.05) {
          d = 'M' + x0 + ' 0L' + x0 + ' ' + H;
          ds = 'M' + (x0 + w * 0.9) + ' 0L' + (x0 + w * 0.9) + ' ' + H;
        } else {
          const c = Math.cos(t * (46 - i * 5) + i);
          d = 'M' + x0 + ' 0';
          ds = 'M' + (x0 + w * 0.9) + ' 0';
          for (let y = 10; y <= H; y += 10) {
            const off = a * c * Math.sin((y / (170 - i * 18)) * Math.PI * 2) * Math.sin((Math.PI * y) / H);
            d += 'L' + (x0 + off).toFixed(2) + ' ' + y;
            ds += 'L' + (x0 + w * 0.9 + off * 0.6).toFixed(2) + ' ' + y;
          }
        }
        p.setAttribute('d', d);
        p.setAttribute('stroke-width', String(w));
        sh.setAttribute('d', ds);
        sh.setAttribute('stroke-width', String(w * 0.9));
      }
    };

    // Only run the animation loop while the neck layout is actually on screen (>= 900px).
    const mq = window.matchMedia(NECK_MQ);
    const sync = () => {
      cancelAnimationFrame(raf);
      if (mq.matches) frame();
      else svg.style.display = 'none';
    };
    sync();
    mq.addEventListener('change', sync);

    /* ---- inlay glow + nudge when a fret section crosses the viewport middle ---- */
    const inlays = Array.from(document.querySelectorAll<HTMLElement>('[data-inlay]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          inlays.forEach((d) => d.classList.toggle('is-lit', en.target.contains(d)));
          for (let i = 0; i < 4; i++) amp[i] = Math.max(amp[i], 4 * vib());
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    document.querySelectorAll('[data-fret]').forEach((s) => io.observe(s));

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', sync);
      io.disconnect();
    };
  }, [vibration, sound]);

  return null;
}
