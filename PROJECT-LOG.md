# Project Log — H.E. Zeenat Kureshi Official Portal

Running record of what was built, why, and what is still outstanding.
Newest entries at the top.

**Live project folder:** `C:\Users\91933\Downloads\finalfolio-updated\finalfolio`
**Dev server:** `npm run dev` → http://localhost:3000

> ⚠️ There are five copies of this project in `Downloads` (`finalfolio`,
> `finalfolio-final`, `finalfolio-updated`, `finalfolio-v3`, `finalfolio-v4`).
> **`finalfolio-updated/finalfolio` is the only one being worked on.** Earlier
> work accidentally went into `finalfolio`, which is now abandoned. Don't edit
> the others — they will silently diverge again.

---

## 2026-09-21 (later) — De-duplication pass + live-feature front end

- Scanned all 7 pages for repeated text (Playwright) and checked repeated figures by hand. Fixed: Home pillars card + slogan line, About banner figures and gallery
  (gallery now only on Media, with the category filter moved there), Trade gold-panel tile, Leadership 50,000 repeat, Contact banner rail. Remaining repeats are deliberate Home teasers.
- Desk: auto-refresh every 5 min (visible tab) + on tab return, "Updated hh:mm", retry budget resets after a good fetch. Gold: hidden-tab pause, "Delayed" state after 2 min, "Spot price updated hh:mm:ss".
- Published Views: Share links (no keys). Contact: quick tier (Send a Message + Schedule a meeting). Floating pill hides over the Invest section.
- Verified with mocked news / gold / Supabase responses and a fast-forwarded clock: refresh fires at +5 min, share links render, Delayed appears after 3 silent minutes.
- Not built (needs hosting + accounts): own `/api/news` route, per-View page with Open Graph tags, social auto-post. See `CLAUDE-CODE-PROMPT.md`.

---

## 2026-09-21 — Type system, one-button rule, content map (built on the client's edited copy)

Base: the client's edited `folioupdate.zip` (simplified hero, reel titles filled in). Their edits were kept.

- **Fonts:** Cinzel (H1/H2) + Plus Jakarta Sans (all else) + Cormorant italic accents, **self-hosted** via `@fontsource`; Google Fonts link removed.
  `font-serif` → `font-heading` (71 uses); H1/H2 → `font-display` (12). Body 1.55, display 1.1, tablet h3/h4 capped.
- **Buttons:** hero and every banner now use one gold pill + one text link. Framer Motion 2 px lift + gold drop-shadow. Media enquiry pop-up moved to the closing CTA band.
- **Icons:** Terminal / Radio / Sparkles / Tag replaced by a gold diamond (`ui/Diamond`); monospace labels removed; field icons removed from the four page forms.
- **News:** headline / excerpt / publication de-duplication in `useSectorIntel.ts` (tested on realistic feed items). Cards show the excerpt only when it adds something.
- **Forms:** Contact, Trade, Media and Women Cell forms use the pop-ups' field style, one gold submit pill, themed success panels.
- **Snippets:** About shows the lead paragraph + "Read the full biography"; new Home "Latest Essays" teaser; Insights cards lift with Framer Motion.
- **Photos:** film-grain overlay (`.grain`), faded/blended background photos removed, banner headline kept off the faces.
- **Config:** `tsconfig` no longer uses the deprecated `baseUrl` (TypeScript 6 rejected it).
- **Docs:** `CONTENT-MAP.md` (what goes where) and `CLAUDE-CODE-PROMPT.md` (live news / My View / gold).
- **Correction:** earlier notes here said "My View" was browser-only. The code publishes to Supabase (public read, office-only write); it needs the env vars + migration.

---

## 2026-09-20 — Real photos, light/dark consistency, enquiry system, Invest With Us

**Asked for:** every section follows the theme; real photos of the client; a four-photo sliding hero;
better Collaborate / Investment / Media forms; an investor entry point for five sectors; live GCC news
with "My View"; the client's own videos; no duplicated sections; the client's title direction.

- **Theme:** all banners, bands, cards, footer, gold chart and newsletter read the light/dark tokens.
  Checked programmatically: no off-theme band over 200 px tall on any of the 7 pages in either mode.
- **Hero:** four real event photos cross-fade every 5.2 s (`data/eventPhotos.ts`), pause + dots, caption
  from the event banner. Title/one-liner per the client's direction, plus a four-step path
  (GCC–India Trade → Investment & Business → Entrepreneurship → Media & Film). On phones the photo is a band
  across the top and the copy sits below on plain surface.
- **Photos:** real photographs on every inner banner, three of four "Four Pillars" cards, the About portrait
  and the Media gallery (captions rewritten from text visible on the banners — the old gallery paired stock
  images with captions naming events they didn't show).
- **Forms:** one shared, theme-aware pop-up (`components/enquiry/EnquiryModal.tsx`) replaces the three
  hard-coded-white modals that showed an invented reference number and sent nothing. The four page forms use
  the same submit path (`lib/enquiry.ts`). **Nothing is delivered until `VITE_ENQUIRY_ENDPOINT` is set;
  until then submit opens the visitor's email app.**
- **Invest With Us (home):** five sector cards → click opens the investor form with that sector selected.
  Descriptive copy only, plus a not-an-offer disclaimer. Floating pill now reads "Invest With Us".
- **Live GCC desk:** already existed (`SectorIntelligence`, five sectors + Zeenat Kureshi, "My View").
  Moved from the Trade page to Home (`#live-desk`); Trade links to it. Removes the duplication.
- **Videos:** the client's 2 YouTube Shorts + 18 Facebook reels are on the Media page as a tap-to-play shelf
  (`data/reels.ts`). Replaced the "Broadcast Dialogues" block, which reused one YouTube ID three times.
- **Removed (duplication / not on-brief):** Media Kit section + card, Home stats band (repeated the hero
  figures), About "track record" card (repeated the banner), dead `MediaPressHero`.

**Known gaps:** contact details in `siteConfig` look like placeholders; photos are only 1024 px wide; no
looping section videos supplied; "My View" is browser-local until `VITE_COMMENTARY_API` is set; reels and
the news feed could not be loaded from the build sandbox.

---

## 2026-09-19 — Cinematic banners, radiant hero, Trade / Media / Leadership redesign

**Why:** every inner page opened with the same cream masthead and a small framed card, so
About, Trade, Media and Leadership all felt identical. Asked for: full-width photo/video banner
per section, a radiant home hero using the original photograph, same theme colours.

- **Banners:** `CinematicBanner` on all 7 pages. Looping video when `public/media/videos/<section>.mp4`
  exists, otherwise a drifting photograph. Pause button, reduced-motion / Data Saver aware,
  pauses off-screen. Wiring in `src/data/sectionMedia.ts`. See `MEDIA-GUIDE.md`.
- **Home hero:** rebuilt as a full-bleed radiant hero (sunburst, halo, light sweep, gold motes).
  Uses `public/media/hero/zeenat-original.jpg` if present, else the bundled image.
  Navbar is transparent over banners and turns solid on scroll (`on-dark` token override).
- **Trade & Investment:** sticky section nav, interactive corridor explorer with route line,
  advisory grid, 5-stage process timeline. Banner figures now come from `tradeData.tradeStats`
  (the old "0% Tariff" tile is gone).
- **Media & Press:** lead-article layout, featured video with playlist, speaking timeline,
  photo mosaic + lightbox.
- **Leadership:** count-up impact figures, featured flagship program. Events now carry ISO dates;
  past events show "Completed", and the fake "Seat Reserved" RSVP was replaced by a link to the join form.
- **Home:** focus areas are photo cards; new "In the Spotlight" (keynote + latest press).
- **System:** unified `Section` / `Card` / `SectionHeading`; hard-coded `border-ivory-*` replaced by
  the dark-mode-aware `border-hairline` token; unused font weights removed from the Google Fonts request.
- **Fixes:** floating investment pill now appears only after the banner (it sat on the banner figures);
  `BackToTopButton` used an invalid `right-23` class, so on phones it landed under the pill.
- **Tooling:** `npm run optimize-videos` (needs ffmpeg) converts raw clips into web-ready loops.

**Not done / needs client:** no video files are bundled; original hero photograph still to be supplied
(Instagram images are typically only ~1080 px wide — ask for the original file). See `DESIGN-NOTES.md` for open content issues.

---

## 2026-09-19 — Section cleanup, sector intelligence, "My View"

### Live Desk Intelligence (new section, Trade & Investment page)
Five sector tabs — **Trade & Export · Gold & Metals · Shipping & Fleet ·
Oil & Gas · Real Estate** — each showing real, current headlines.

- Source: Google News public RSS → `rss2json` bridge (free, keyless, CORS-open).
  Browsers can't read raw RSS cross-origin, hence the bridge.
- Fetches **only the tab being viewed**, caches each sector 30 minutes, and
  retries with backoff. The free bridge throttles bursts; without this the
  section would intermittently look broken.
- Files: `src/hooks/useSectorIntel.ts`, `src/components/trade/SectorIntelligence.tsx`

### "My View" commentary
Every headline has a **My View** button. Commentary renders inline on the card.

- Files: `src/lib/commentaryStore.ts`
- **Current state: saves to the author's own browser only.** This site is a
  static front end with no server; a browser cannot publish to other people
  without a backend. The UI says this plainly ("Saved on this device · not yet
  public") rather than implying the view is live.
- **To publish for real:** set `VITE_COMMENTARY_API` (see `.env.example`).
  Labels flip to "Published" automatically — no code change needed.

### Duplication removed
- Gold spot price appeared **twice** on the Trade page (terminal + sector strip).
  Removed from the sector section; prices now belong solely to the terminal.
- "Institutional Deal Syndicate" card sat inside the gold market widget while
  duplicating *FDI Syndication* in Advisory Services. Removed — a service pitch
  doesn't belong in a market-data panel.
- Audited every section heading across all 7 pages: **no cross-page duplicates.**

---

## 2026-09-19 — Hero dark mode fix

The hero was the one section dark mode couldn't reach. Its readability scrim
over the photo was a hardcoded cream `rgba(250,246,240,…)` in an **inline
style** — inline styles can't take a `dark:` variant, so in dark mode the hero
stayed light and the ivory headline/stats washed out to near-invisible.

Fixed by pointing the scrim at the surface token: `rgb(var(--surface) / 0.97)`.

**Lesson recorded:** the contrast auditor had been skipping text sitting on
gradients — exactly where this bug lived — and gave a false "all clear".
It now approximates a gradient by its most opaque colour stop.

---

## 2026-09-19 — Theme system + design tokens

### Light/dark mode
- Defaults to **light** (OS preference deliberately ignored — visitors should
  land on the brand's intended first impression). Remembered per visitor.
- Toggle: sun/moon in the navbar. No-flash script in `index.html`.
- Files: `src/contexts/ThemeContext.tsx`, `src/components/layout/ThemeToggle.tsx`

> **Gotcha that cost real time:** `tailwind.config.js` + `"type": "module"` in
> `package.json` made Tailwind silently ignore `darkMode: 'class'` and emit
> `@media (prefers-color-scheme)` rules instead — the toggle did nothing.
> Fixed by renaming to **`tailwind.config.cjs`** with `module.exports`.
> **Do not rename it back to `.js`.**

### "Theme looks different in every section" — root cause found
The site was using **4 different dark greens** (`#0C221C`, `#071913`, `#071511`,
`#081D17`) and **4 different creams** (`#FAF6F0`, `#FBF7F1`, `#F4EFE6`, `#FFFFFF`),
plus more in gradient stops.

Replaced with semantic tokens (CSS variables in `src/index.css`, wired through
`tailwind.config.cjs`) across 32 files:

| Token | Use |
|---|---|
| `surface` | page background |
| `surface-raised` | cards |
| `surface-sunken` | quieter alternating band |
| `surface-deep` / `surface-deepest` | editorial dark bands, footer |
| `ink` / `ink-soft` / `ink-faint` / `ink-heading` | text |
| `hairline` | borders |

Light/dark is now a single re-point of these variables.

---

## 2026-09-18 — Gold widget: fabricated data replaced

The original widget was 687 lines of **hardcoded fake market data** — prices
around **$2,654** with invented bid/ask spreads under a "LIVE SPOT GOLD PRICE"
badge, and a comment reading *"Micro-tick simulation every 3.5s like live
financial terminals"*. Real gold was ~$4,385 at the time.

Later replaced again (by the client side) with a **TradingView embed**, which is
genuinely live. Two problems fixed in that version:

1. Its four metric cards still showed hand-typed prices (`$3,042.80/oz`) sitting
   directly above a live chart reading `4,378` — a visible self-contradiction.
   Now derived from the live spot feed + real FX. Verified to the decimal.
2. TradingView's embed **script** threw `Cannot read properties of null` when a
   visitor navigated away before it initialised (it resolves its mount point via
   `document.currentScript.parentNode`). Switched to the **iframe embed** — same
   live chart, no global script, no race.

Cards are labelled "spot-derived", not "UAE Gold Souk"/"MCX", because those are
physical/exchange quotes carrying premiums this site has no feed for.

---

## 2026-09-18 — Investment popup made professional

Was auto-firing **3.5s after load on every page**, covering the hero before
anyone read a word.

Now: fires only on genuine engagement (35% scroll depth, or desktop exit-intent),
minimum 6s dwell, never on `/contact` or `/trade-investment` (visitor is already
mid-conversion), and a dismissal is remembered **7 days** instead of one session.
The floating button still opens it anytime.

---

## 2026-09-18 — Hero CTAs + routing

Buttons are **Collaborate · Investment Discussion · Media Inquiry**:

| Button | Destination |
|---|---|
| Collaborate | `/contact?subject=General Inquiry` |
| Investment Discussion | `/trade-investment#inquiry` |
| Media Inquiry | `/contact?subject=Media / Press / Interview Request` |

Required two supporting fixes:
- Contact form now reads `?subject=` and preselects the dropdown.
- `ScrollToTop` was forcing every route change to `(0,0)`, breaking hash
  deep-links. It now honours a hash and polls briefly for the target (pages are
  lazy-loaded, so the element may not exist yet at navigation time).

---

## APIs in use — all free, no purchase required

| Data | Endpoint | Key? | Notes |
|---|---|---|---|
| Gold / Silver / Copper spot | `api.gold-api.com` | **No** | CORS-open, ~6–16s cache |
| USD → AED / INR | `open.er-api.com` | **No** | CORS-open, daily |
| Sector news (all 5) | `api.rss2json.com` + Google News RSS | **No** | Rate-limits bursts → we fetch one tab at a time + backoff |
| Live price chart | TradingView iframe embed | **No** | Free embed |

**Nothing needs to be bought for the current feature set.**

### What still needs a paid service (only if you want it)
- **Live oil/gas, freight & property *prices*.** There is no free keyless feed —
  stooq blocks CORS, and the metals API carries only metals. Those sectors show
  real *news* instead of invented tickers. A paid feed would also need a small
  server proxy so the key isn't exposed in the browser bundle.
- **Publishing "My View" to the public.** Needs any backend with storage.
  A Supabase free tier is enough.

---

## Outstanding — needs something from the client

1. **Supabase project URL + anon key** (free tier) → makes "My View" genuinely
   publish, with auth so only the office can post.
2. **Production domain** — `zeenatkureshi.com` or `zeennatkuresshi.com`? (from
   the asset checklist PDF)
3. **Form routing** — which inbox should trade/media inquiries deliver to?
   Forms currently validate and show success but do not send.
4. **Photography** still listed as REQUIRED in the checklist PDF: About sidebar
   portrait, 3 GCC summit photos, 2 Women Leadership photos.

---

## Verification standard

Every change is checked with automated passes, not eyeballing:
- **Contrast:** every text node vs its true painted background (gradient-aware),
  7 pages × both modes.
- **Responsive:** 7 widths × 7 pages × both modes = 98 combinations, zero
  horizontal overflow.
- `tsc --noEmit` clean + production build clean + zero console errors.

Scripts live in the session scratchpad (`audit2.mjs`, `responsive.mjs`).
