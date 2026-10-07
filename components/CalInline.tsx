'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

const NAMESPACE = 'lj-booking';

/** The site's dark/amber palette mapped onto Cal.com's theme variables (booking page inside the panel). */
const DARK_THEME = {
  'cal-brand': '#e0a04a',
  'cal-brand-emphasis': '#eeb865',
  'cal-brand-text': '#140c08',
  'cal-bg': '#18110c',
  'cal-bg-emphasis': '#241a13',
  'cal-bg-subtle': '#1b130e',
  'cal-bg-muted': '#241a13',
  'cal-text': '#f3eadc',
  'cal-text-emphasis': '#f3eadc',
  'cal-text-subtle': '#cdbfae',
  'cal-text-muted': '#a8988a',
  'cal-border': '#3a2d22',
  'cal-border-emphasis': '#4a3a2d',
  'cal-border-subtle': '#2b2018',
  'cal-border-booker': '#3a2d22',
  radius: '0.9rem',
};

/** Cal.com inline booking widget. Loaded on demand by CalEmbed (never during the initial page load). */
export default function CalInline({ calLink }: { calLink: string }) {
  useEffect(() => {
    let live = true;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (!live) return;
      cal('ui', { theme: 'dark', layout: 'month_view', hideEventTypeDetails: false, cssVarsPerTheme: { light: DARK_THEME, dark: DARK_THEME } });
    })();
    return () => {
      live = false;
    };
  }, []);

  // Fixed-height container (see .book-embed__frame) + internal scroll, so a long list of time slots can never
  // stretch the "Book a lesson" panel.
  return <Cal namespace={NAMESPACE} calLink={calLink} style={{ width: '100%', height: '100%', overflow: 'auto' }} config={{ layout: 'month_view', theme: 'dark' }} />;
}
