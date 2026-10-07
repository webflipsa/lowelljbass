'use client';

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { HOME_NAV, PAGE_NAV } from '@/lib/content';
import { SOCIALS } from '@/lib/site';

type Props = {
  /** `home` = floating pill beside the bass neck; `page` = full-width pill on Gallery / Courses. */
  variant: 'home' | 'page';
  /** Key of the current page link (PAGE_NAV) — rendered highlighted. */
  active?: string;
};

/** Breakpoints at which the nav switches layout — kept in sync with nav.css. */
const BREAKPOINTS = {
  home: ['(min-width: 1180px)', '(min-width: 900px)'],
  page: ['(min-width: 900px)', '(min-width: 640px)'],
} as const;

type LinkProps = {
  href: string;
  className?: string;
  onClick?: () => void;
  current?: boolean;
  children: ReactNode;
};

/** In-page anchors stay plain <a>; cross-page links use next/link for client-side navigation. */
function NavLink({ href, className, onClick, current, children }: LinkProps) {
  const props = { className, onClick, 'aria-current': current ? ('page' as const) : undefined };
  return href.startsWith('#') ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export default function SiteNav({ variant, active }: Props) {
  const [open, setOpen] = useState(false);
  const home = variant === 'home';
  const items = home ? HOME_NAV : PAGE_NAV;
  const logoHref = home ? '#top' : '/#top';
  const bookHref = home ? '#book' : '/#book';
  const close = () => setOpen(false);

  // Close the menu when the viewport crosses a nav breakpoint, and on Escape.
  useEffect(() => {
    const shut = () => setOpen(false);
    const mqs = BREAKPOINTS[variant].map((q) => window.matchMedia(q));
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && shut();
    mqs.forEach((m) => m.addEventListener('change', shut));
    window.addEventListener('keydown', onKey);
    return () => {
      mqs.forEach((m) => m.removeEventListener('change', shut));
      window.removeEventListener('keydown', onKey);
    };
  }, [variant]);

  return (
    <>
      <nav className={`nav nav--${variant}`} aria-label="Primary">
        <NavLink href={logoHref} className="nav-logo">
          Lowell Jeffery
        </NavLink>
        <div className="nav-links">
          {items.map((it) => (
            <NavLink key={it.label} href={it.href} current={!!active && it.key === active}>
              {it.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-right">
          <NavLink href={bookHref} className="nav-book">
            <span className="lbl-long">Book a lesson</span>
            <span className="lbl-short">Book</span>
          </NavLink>
          <button
            type="button"
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {open && (
        <div id="site-menu" className={`menu menu--${variant}`}>
          {home && (
            <div className="menu-head">
              <span className="menu-logo">Lowell Jeffery</span>
              <button type="button" className="menu-close" aria-label="Close menu" onClick={close}>
                ✕
              </button>
            </div>
          )}
          <div className="menu-list">
            {home && (
              <a href={bookHref} className="menu-link menu-link--book" onClick={close}>
                Book a lesson
              </a>
            )}
            {items.map((it) => (
              <NavLink key={it.label} href={it.href} className="menu-link" onClick={close} current={!!active && it.key === active}>
                {it.label}
              </NavLink>
            ))}
          </div>
          {home && (
            <div className="menu-social">
              <a href={SOCIALS.instagram} target="_blank" rel="noopener">
                Instagram
              </a>
              <a href={SOCIALS.facebook} target="_blank" rel="noopener">
                Facebook
              </a>
              <a href={SOCIALS.youtube} target="_blank" rel="noopener">
                YouTube
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
