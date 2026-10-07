'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Cal.com's embed script is third-party JavaScript: load it only when the booking panel is about to be
// seen, so it can't slow down the first paint / Core Web Vitals of the home page.
const CalInline = dynamic(() => import('./CalInline'), { ssr: false });

export default function CalEmbed({ calLink }: { calLink: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="book-embed__frame">
      {near ? <CalInline calLink={calLink} /> : <span className="book-embed__loading">Loading calendar…</span>}
    </div>
  );
}
