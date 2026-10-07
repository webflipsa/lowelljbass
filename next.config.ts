import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Every image is pre-converted to WebP (see scripts/convert-image.mjs) and served straight from
    // /assets/img/<descriptive-name>.webp — clean, keyword-bearing URLs for Google Images, no runtime
    // re-encoding. next/image is still used for width/height (no layout shift) and lazy loading.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        // Design photos/graphics: cache for a day, then revalidate in the background — long enough to be
        // fast, short enough that replacing a photo under the same filename shows up quickly.
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

export default nextConfig;
