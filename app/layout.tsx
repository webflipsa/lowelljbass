import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SITE, SOCIALS } from '@/lib/site';
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
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_ZA',
    url: '/',
    title: SITE.title,
    description: SITE.description,
    images: [{ url: '/assets/img/lowell-hero.jpg', width: 720, height: 960, alt: 'Lowell Jeffery holding his sunburst bass' }],
  },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description, images: ['/assets/img/lowell-hero.jpg'] },
};

export const viewport: Viewport = {
  themeColor: '#9E7148',
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  jobTitle: 'Bassist & music educator',
  description: SITE.description,
  image: `${SITE.url}/assets/img/lowell-hero.jpg`,
  sameAs: Object.values(SOCIALS),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" data-scroll-behavior="smooth" className={`${body.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so scroll-reveal starts hidden without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
