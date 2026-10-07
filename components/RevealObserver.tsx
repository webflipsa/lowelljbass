'use client';

import { useEffect } from 'react';

/**
 * Scroll-reveal: any `[data-reveal]` element fades/slides in the first time it enters the
 * viewport. The hidden start state lives in CSS (`.js [data-reveal]`, see globals.css) so there is
 * no flash before hydration; this just flips `.is-in`. Users with reduced-motion see everything
 * immediately (the CSS never hides it in that case).
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
