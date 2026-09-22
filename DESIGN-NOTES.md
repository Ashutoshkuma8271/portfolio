# Design notes — how the site is put together

## Type
| Role | Font | Where |
|---|---|---|
| Display | **Cinzel** 600/700 (`font-display`) | H1 and H2 only: page titles, section titles |
| Headings & body | **Plus Jakarta Sans** 400–700 (`font-heading`, `font-sans`, `font-label`) | Card titles, figures, buttons, labels, paragraphs |
| Accent | **Cormorant Garamond** *italic* 600 (`font-cormorant`) | The gold italic phrase inside a display heading, pull-quotes |

All fonts are **bundled** (`@fontsource/*`, imported in `src/main.tsx`) — no request to Google at load time, so they also work offline
and cannot fail to load. Line-height: **1.1** for display headings, **1.55** for running text (`leading-relaxed` is remapped to 1.55).
On tablets `h3`/`h4` are capped so they never out-shout the section title. Not used, and why: *Tangerine* (thin script — unreadable at
heading sizes on phones; fine for a signature only), *Smooch Sans* (condensed sans — clashes with the engraved look).

## Buttons
One gold pill per screen (`BannerButton variant="primary"`), plus at most one text link (`variant="link"`). Primary pills lift 2 px with a
soft gold drop-shadow (Framer Motion; off for reduced motion). `variant="ghost"` renders as a link, so no screen shows two competing pills.

## Colour (unchanged)
Emerald `#12332B` family · Gold `#C79A3D` family · Ivory `#FBF7F1` family.
Pages use **semantic tokens** (`surface`, `surface-raised`, `surface-sunken`, `surface-deep`,
`ink`, `ink-soft`, `hairline`) so light/dark mode is one switch. Banners are the exception:
they are fixed dark emerald in both modes, on purpose.

## Building blocks (`src/components`)
| Component | What it is |
|---|---|
| `banner/CinematicBanner` | Full-width photo/video banner: breadcrumb, eyebrow, headline, CTA buttons, glass figures rail |
| `banner/BackdropMedia` | The moving picture: video → drifting photo → still, with fallbacks |
| `banner/BannerButton` | Buttons that sit on photography (primary gold / glass ghost) |
| `layout/PageHeader` | Thin wrapper so pages keep one import |
| `layout/SectionNav` | Sticky in-page menu with scroll-spy |
| `ui/Section` | Section wrapper: rhythm, anchor offset, 4 background tones |
| `ui/SectionHeading` | Eyebrow (gold rule) + Playfair title + optional gold italic accent |
| `ui/Card` | The one card: `light` / `dark`, optional hover lift |
| `ui/Reveal` | Fade-and-lift on scroll (no-op for reduced motion) |
| `ui/YoutubeThumb` | Video still that never shows a broken-image icon |
| `enquiry/EnquiryModal` | Shared Invest / Collaborate / Media pop-up |
| `enquiry/SectorArt` | Original isometric illustrations (five sectors + cinema) |
| `home/InvestSection` | "Invest With Us": 3D-tilt sector cards that open the enquiry |
| `media/ReelsWall` | Tap-to-play shelf of the client's videos |

## Light / dark
Every section follows the visitor's theme: in light mode the whole page is light, in dark mode the
whole page is dark. Banners, bands, cards, the footer, the gold chart and the newsletter all read the
tokens. `Section tone="deep"` is a warm gold-tinted band, not a dark one. Only small accents stay
dark on purpose: video tiles, reel cards, photo captions and the video modal.

## Enquiry forms
- `components/enquiry/EnquiryModal.tsx` — one pop-up for Invest / Collaborate / Media (fields are
  defined at the top of the file). `InvestmentModal`, `CollaborateModal`, `MediaInquiryModal` are thin wrappers.
- `lib/enquiry.ts` — what "submit" does. **With `VITE_ENQUIRY_ENDPOINT` set** it POSTs there; **without it**
  it opens a pre-filled email. Never shows a fake "sent".
- Any button can open the investor form with a sector pre-selected:
  `window.dispatchEvent(new CustomEvent('open-investment-modal', { detail: { sector: 'gold' } }))`.

## Investment sectors
`data/investSectors.ts` holds the five sectors (Import & Export, Gold, Fleet, Oil & Gas, Real Estate).
Copy is descriptive only — **no returns, yields or guarantees**. Keep it that way; an investment page
that implies them is a legal risk for the client. Illustrations are original SVG (`enquiry/SectorArt.tsx`).

## Videos
`data/reels.ts` holds the client's own videos (YouTube Shorts + Facebook reels). They play through the
platforms' official embed players, tap-to-play, and only while the original posts stay public.

## Page rhythm
Banner → sticky nav → **surface** → **deep** → **sunken** → … alternating, so each page reads
light / dark / tint in a set pattern.

## Things to know
- `tailwind.config.cjs` must stay `.cjs` (see PROJECT-LOG.md).
- Banner stats on the Trade page are read from `tradeData.tradeStats` — edit `src/data/trade.ts`.
- Women-Cell events carry `startsOn` / `endsOn` dates; the page shows past events as "Completed"
  by itself. Add new events to `src/data/womenLeadership.ts` with ISO dates.

## Open content issues (need the client)
- **Contact details look like placeholders** (`data/siteConfig.ts`: WhatsApp `919820000000`, phone numbers of zeros).
  The enquiry fallback email and every WhatsApp button use them. Replace before launch.
- `VITE_ENQUIRY_ENDPOINT` is not set, so forms open the visitor's email app instead of sending.
- The six event photographs are 1024 px wide — request the originals.
- `data/reels.ts` titles are "Video 01…"; the site cannot watch the videos. Add real titles / topics.
- "My View" commentary saves in the author's browser only until `VITE_COMMENTARY_API` is set.
- The Women Leadership flagship program still shows a stock image; no real photo of it was supplied.
- `useSectorIntel` fetches headlines through the free rss2json bridge — confirm it loads on the live site.
