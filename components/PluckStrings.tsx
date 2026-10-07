'use client';

import { useEffect, useRef, useState } from 'react';
import { OPEN_STRINGS, playPluck } from '@/lib/pluck-audio';

const NAMES = ['E', 'A', 'D', 'G'] as const;

/**
 * Mobile-only "tap a string" row (E A D G) from the mobile design. Hidden unless
 * FLAGS.mobilePluckButtons is on — the design ships it switched off.
 */
export default function PluckStrings({ sound = true }: { sound?: boolean }) {
  const [active, setActive] = useState(-1);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pluck = (i: number) => {
    setActive(i);
    if (sound) playPluck(OPEN_STRINGS[i] * 2);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(-1), 220);
  };

  return (
    <div data-reveal="m" className="pluck">
      <span className="pluck-label">Tap a string</span>
      <div className="pluck-row">
        {NAMES.map((n, i) => (
          <button
            key={n}
            type="button"
            className={active === i ? 'pluck-btn is-on' : 'pluck-btn'}
            aria-label={`Pluck the ${n} string`}
            onClick={() => pluck(i)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
