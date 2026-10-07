import type { Metadata } from 'next';
import { SITE } from './site';

/** Open Graph basics shared by every page (a page's own `openGraph` replaces the layout's, so re-apply these). */
export const OG_BASE = { type: 'website', siteName: SITE.name, locale: 'en_ZA' } as const;

/** Index everything, and allow large image previews / full snippets (better presentation in Google results & Discover). */
export const ROBOTS: NonNullable<Metadata['robots']> = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
};

/** Per-page metadata with canonical URL, Open Graph and Twitter card in one place. */
export function pageMetadata(opts: { path: string; title: string; description: string; shareTitle?: string; shareDescription?: string }): Metadata {
  const shareTitle = opts.shareTitle ?? opts.title;
  const shareDescription = opts.shareDescription ?? opts.description;
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: { ...OG_BASE, url: opts.path, title: shareTitle, description: shareDescription },
    twitter: { card: 'summary_large_image', title: shareTitle, description: shareDescription },
  };
}
