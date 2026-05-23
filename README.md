# Naija Watch

Atelier horloger · Lagos · since 1973.

A cinematic landing site for the atelier — custom calibres, vintage restoration, and private collector services — built in Next.js 16 (App Router).

## Generation fingerprint

| Axis | Value |
|---|---|
| Archetype | **G** (Structured Hybrid, premium tier) |
| Style | **S12** Luxury Horology |
| Voice family | **V1** Heritage Understated |
| Hero | T1 8s Veo workshop loop · HO5 big-stack overlay · H6 multi-weight serif · E2 word-split entrance |
| Cards | **CV4** Liquid Glass |
| Header | center-logo-split |
| Footer | **FT2** Asymmetric Editorial |
| About | **AB3** Founder Portrait + Timeline |
| Benefits | **BN4** Numbered List Vertical |
| Contact | **CT3** Type-Only No-Map |
| Stats | **ST2** Big-Number-Per-Scroll |
| CTA | **CTA1** Centered Oversized Type |
| Narrative shape | craft-process |
| Industry tone | watchmaker-meditative |
| Asset mode | live-generate |
| Build mode | landing |

## Running

```bash
npm install
npm run gen:images   # legacy — direct Gemini SDK (requires GEMINI_API_KEY)
npx tsx scripts/gen-assets.ts   # Kodagen platform endpoint (no key needed)
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Pages

- `/` — full archetype-G home: cinematic hero → value prop → services → showcase mosaic → manifesto → stats → CTA
- `/about` — AB3 founder portrait + timeline + BN4 numbered disciplines
- `/services` — alternating editorial index of the three disciplines
- `/services/[slug]` — three detail pages: custom-movements, vintage-restoration, private-collector-services
- `/contact` — CT3 type-only audience request
- `/privacy`, `/terms` — house legal notices

## Theme

```
--bg-primary:   #0b0a08  (ink)
--bg-secondary: #13110e
--bg-tertiary:  #1c1916
--accent:       #c8a96a  (champagne)
--text:         #f6f1e7  (bone)
```

Fonts: **Cormorant Garamond** (display), **Inter** (body), **JetBrains Mono** (numerics).
