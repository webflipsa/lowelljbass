import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { OG_BASE, ROBOTS } from '@/lib/seo';
import { SITE } from '@/lib/site';
import './globals.css';
import './nav.css';
import './home.css';
import './subpage.css';

// The three families the design uses, self-hosted (see app/fonts/README.md).
// `adjustFontFallback: false` — next/font otherwise puts a metric-matched Arial in front of
// `system-ui`; glyphs missing from these fonts (→ ↗ ←) would then render in Arial instead of the
// system font the design falls back to, shifting line heights by a pixel or two.
const body = localFont({
  src: [{ path: './fonts/HankenGrotesk-latin.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: false,
});
const serif = localFont({
  src: [
    { path: './fonts/InstrumentSerif-Regular-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/InstrumentSerif-Italic-latin.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: false,
});
const mono = localFont({
  src: [{ path: './fonts/JetBrainsMono-latin.woff2', weight: '400 500', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'music',
  alternates: { canonical: '/' },
  robots: ROBOTS,
  // Open Graph / Twitter images come from the opengraph-image.tsx files (app/, app/courses, app/gallery).
  openGraph: { ...OG_BASE, url: '/', title: SITE.shareTitle, description: SITE.shareDescription },
  twitter: { card: 'summary_large_image', title: SITE.shareTitle, description: SITE.shareDescription },
  // Search-engine ownership checks (Google Search Console / Bing Webmaster Tools). Set in Vercel env; see README.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: '#9E7148',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" className={`${body.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so scroll-reveal starts hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
