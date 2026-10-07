# Fonts

Self-hosted copies of the three Google Fonts families the design uses (Latin subset, SIL Open Font License):

| File | Family | Notes |
| --- | --- | --- |
| `HankenGrotesk-latin.woff2` | Hanken Grotesk | variable, weights 400–700 |
| `InstrumentSerif-Regular-latin.woff2` / `-Italic-latin.woff2` | Instrument Serif | 400, upright + italic |
| `JetBrainsMono-latin.woff2` | JetBrains Mono | variable, weights 400–500 |

They are the exact binaries Google serves for the design's stylesheet
(`family=Hanken+Grotesk:wght@400;500;600;700 & Instrument+Serif:ital@0;1 & JetBrains+Mono:wght@400;500`).
Loaded with `next/font/local` in `app/layout.tsx` — no build-time or runtime request to Google, and no
metric-adjusted fallback face, so glyphs missing from these fonts (→ ↗ ←) fall back to `system-ui` exactly as in the design.
