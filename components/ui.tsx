import type { ReactNode } from 'react';

/**
 * Scroll-reveal mode for `data-reveal`:
 *  ''  – reveal at every width
 *  'd' – desktop (neck layout) only    'm' – mobile layout only
 * The desktop and mobile designs group elements differently (one reveal on a wrapper vs one per
 * child), so wrappers/children are tagged with the layout they belong to.
 */
export type Reveal = '' | 'd' | 'm' | undefined;

/** "Fret 03 — Story" label (the mono eyebrow above every section title). */
export function Tag({ lead, label, tone, reveal }: { lead: string; label: string; tone?: 'amber'; reveal?: Reveal }) {
  return (
    <div className={tone ? `tag tag--${tone}` : 'tag'} data-reveal={reveal}>
      <span>{lead}</span>
      <span className="rule" />
      <span>{label}</span>
    </div>
  );
}

/** Text that differs between the desktop and mobile designs. */
export function Both({ d, m }: { d: ReactNode; m: ReactNode }) {
  return (
    <>
      <span className="only-d">{d}</span>
      <span className="only-m">{m}</span>
    </>
  );
}

/** A "fret" row's left two columns: empty gutter + the clickable neck cell with optional inlay dots. */
export function NeckCells({ fret, inlays = 'center' }: { fret: number; inlays?: 'center' | 'double' | 'none' }) {
  return (
    <>
      <div className="gutter" />
      <div className="neck-cell" data-neck={fret}>
        {inlays === 'center' && <div className="inlay" data-inlay="" />}
        {inlays === 'double' && (
          <>
            <div className="inlay inlay--l" data-inlay="" />
            <div className="inlay inlay--r" data-inlay="" />
          </>
        )}
      </div>
    </>
  );
}

export function SocialPills({ items, className }: { items: { label: string; href: string }[]; className: string }) {
  return (
    <>
      {items.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener" className={className}>
          {s.label}
        </a>
      ))}
    </>
  );
}
