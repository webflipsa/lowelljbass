import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';

/**
 * Social-share ("link preview") image: 1200×630 JPEG, rendered at build time in the site's own look.
 * JPEG on purpose — WhatsApp / Facebook / LinkedIn crawlers are less reliable with WebP, and small files preview reliably.
 * Fonts are TTF copies of the self-hosted Instrument Serif (the renderer can't read WOFF2, nor variable fonts,
 * which is why Hanken Grotesk isn't used here); see app/fonts/README.md.
 */
export const OG_SIZE = { width: 1200, height: 630 };
// JPEG, not PNG: WhatsApp (huge in South Africa) can skip link-preview images much over ~300 KB, and a photo card as
// PNG is 400–800 KB. The card is drawn as PNG by the renderer, then compressed to JPEG below (~100–150 KB).
export const OG_TYPE = 'image/jpeg';

const root = process.cwd();
const font = (file: string) => readFile(path.join(root, 'app', 'fonts', 'og', file));

/** The renderer can't decode WebP (it silently draws nothing), so hand it a JPEG made from the site's WebP. */
async function dataUri(publicPath: string) {
  const jpeg = await sharp(path.join(root, 'public', publicPath)).resize({ width: 720, withoutEnlargement: true }).jpeg({ quality: 88 }).toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
}

type OgProps = {
  eyebrow: string;
  title: string;
  /** Title font size — long titles need less. */
  titleSize?: number;
  tagline: string;
  footer: string;
  /** Path under /public, e.g. "/assets/img/….webp" */
  photo: string;
  photoPosition?: string;
};

export async function renderOg({ eyebrow, title, titleSize = 150, tagline, footer, photo, photoPosition = '50% 30%' }: OgProps) {
  const [serif, serifItalic, img] = await Promise.all([font('InstrumentSerif-Regular.ttf'), font('InstrumentSerif-Italic.ttf'), dataUri(photo)]);

  const card = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          color: '#140c08',
          backgroundColor: '#9E7148',
          backgroundImage:
            'radial-gradient(ellipse 65% 70% at 8% -5%, rgba(64,34,16,0.55), rgba(64,34,16,0) 60%), radial-gradient(ellipse 70% 80% at 105% 110%, rgba(32,17,9,0.65), rgba(32,17,9,0) 60%), radial-gradient(ellipse 130% 90% at 50% 30%, rgba(196,140,88,0.25), rgba(196,140,88,0) 70%)',
        }}
      >
        {/* left: copy */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 0 56px 72px', width: 700 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'Instrument Serif', fontSize: 27, letterSpacing: 5, textTransform: 'uppercase' }}>{eyebrow}</div>
            <div
              style={{
                display: 'flex',
                marginTop: 28,
                fontFamily: 'Instrument Serif',
                fontSize: titleSize,
                lineHeight: 0.92,
                letterSpacing: -3,
                textShadow: '0 2px 0 rgba(255,244,230,0.35)',
              }}
            >
              {title}
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 52, lineHeight: 1.05, color: '#f6eee2' }}>
              {tagline}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', width: 120, height: 2, backgroundColor: 'rgba(20,12,8,0.45)', marginBottom: 18 }} />
            <div style={{ display: 'flex', fontFamily: 'Instrument Serif', fontSize: 32 }}>{footer}</div>
          </div>
        </div>

        {/* right: photo with amber glow */}
        <div style={{ display: 'flex', position: 'absolute', right: 76, top: 52, width: 420, height: 526 }}>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              left: 36,
              top: 40,
              width: 440,
              height: 520,
              borderRadius: 44,
              backgroundImage:
                'radial-gradient(ellipse 65% 65% at 55% 50%, rgba(224,160,74,0.7), rgba(185,84,30,0.45) 45%, rgba(90,36,16,0) 100%)',
            }}
          />
          <img
            src={img}
            width={420}
            height={526}
            style={{ width: 420, height: 526, objectFit: 'cover', objectPosition: photoPosition, borderRadius: 36, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7)' }}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' },
        { name: 'Instrument Serif', data: serifItalic, weight: 400, style: 'italic' },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await card.arrayBuffer()))
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': OG_TYPE, 'Cache-Control': 'public, max-age=31536000, immutable' } });
}
