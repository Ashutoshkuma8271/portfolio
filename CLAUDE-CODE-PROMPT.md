# Prompt to give Claude Code — Live news, "My View", live gold

> Copy everything below the line into Claude Code, opened at the project root.

---

You are working in an existing React + TypeScript + Vite + Tailwind project (`folio-main`). **Audit first.** A large part of what I
describe already exists. Only add what is missing or unreliable. **Do not change the visual design, colours, layout or any existing
feature.** Do not rename files. Run `npm run build` after each step and keep it passing.

## ALREADY DONE in the code — verify, do not redo
- Headline / excerpt / publication de-duplication (`cleanExcerpt` in `useSectorIntel.ts`).
- The desk on screen re-fetches every 5 minutes while the tab is visible, and when the tab regains focus; the UI shows "Updated hh:mm".
- Published Views show **Share** links (LinkedIn, X, Facebook, WhatsApp — plain share URLs, no keys) pointing at the site's `#live-desk`.
- Gold: polling pauses in a hidden tab and catches up on return; the header shows "Spot price updated hh:mm:ss" and a **Delayed** state after 2 minutes without a tick.
So skip Step 1 item 5, Step 2 item 2 and Step 3 item 1. **Still to do:** the own news route (Step 1.1–1.4, 1.6), the per-View public page `/views/<id>` with Open Graph tags (Step 2.3), the optional social auto-post (Step 2.4), the Supabase setup document (Step 2.1) and the gold server fallback (Step 3.2).

## What already exists (verify by reading the code — do not rebuild)
- `src/hooks/useSectorIntel.ts` — 6 desks (Import/Export, Gold, Fleet, Oil & Gas, Real Estate, H.E. Zeenat Kureshi) fetching Google News RSS
  through the public `api.rss2json.com` bridge. 30-minute cache per desk, retries, honest error state (never invents headlines).
- `src/components/trade/SectorIntelligence.tsx` — the desk UI (used on the Home page, `#live-desk`), with a **My View** button on every headline.
- `src/lib/commentaryStore.ts` + `src/lib/supabase.ts` + `src/contexts/OfficeAuthContext.tsx` + `supabase/migrations/001_views.sql` —
  "My View" is stored in a Supabase table `views`. **Anyone can read; only a signed-in office account can write** (Row Level Security).
- `src/hooks/useLiveMetals.ts` + `src/components/trade/LiveGoldMarketGraph.tsx` — live gold/silver spot from `https://api.gold-api.com/price/XAU`
  (polled every 20 s) plus a TradingView chart embed.

## Step 1 — Make the live news dependable (the weak point)
The free `rss2json` bridge is rate-limited and can fail under traffic. Replace it **behind the same hook interface**:
1. Add a serverless function `api/news.ts` (Vercel) — or `netlify/functions/news.ts` if the project deploys on Netlify (check `vercel.json` / `netlify.toml`; ask me if neither exists).
   `GET /api/news?sector=<id>` where `<id>` is one of `trade | metals | fleet | energy | realty | zeenat` (see `SECTORS` in `useSectorIntel.ts` for the exact search query per desk).
2. Server-side, fetch **in parallel** and merge:
   - Google News RSS: `https://news.google.com/rss/search?q=<query>&hl=en-IN&gl=IN&ceid=IN:en`
   - GDELT DOC 2.0 (free, no key): `https://api.gdeltproject.org/api/v2/doc/doc?query=<query>&mode=artlist&format=json&maxrecords=15&sort=datedesc`
   Parse RSS with a small XML parser, normalise to `{ title, publication, link, pubDate }`, **de-duplicate by normalised title + domain**, sort newest first, return max 8.
3. Cache at the edge: `Cache-Control: s-maxage=300, stale-while-revalidate=900`. Return `{ items, fetchedAt }`. On failure return HTTP 502 with `{ items: [] }` — never fabricate items.
4. In `useSectorIntel.ts` point `feedUrl` at `/api/news?sector=...`. Keep the cache, the retry/backoff, the status states and the existing `cleanExcerpt` de-duplication.
5. Refresh while the desk is on screen: re-fetch the **active** desk every 5 minutes and when the tab regains focus (`visibilitychange`). Show "Updated hh:mm" using `fetchedAt`.
6. Terms note: Google News RSS terms for commercial sites are unclear. Make the source list a config array so a licensed provider (NewsAPI, GNews) can be added by putting a key in a server-side env var — **never** in client code.

## Step 2 — "My View": finish the publishing path (mostly setup, little code)
1. Confirm the Supabase flow works end to end. Write a `SETUP-SUPABASE.md` with exact steps: create project → run `supabase/migrations/001_views.sql` in the SQL editor →
   set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the host's environment → **Authentication → disable "Allow new users to sign up"** → create **one** office user (email + strong password) → sign in through the site's "Office access" button and publish a test View.
2. Add **Share** buttons to a published View (no API keys needed — plain share links): LinkedIn `https://www.linkedin.com/sharing/share-offsite/?url=<url>`, X `https://twitter.com/intent/tweet?text=<text>&url=<url>`,
   Facebook `https://www.facebook.com/sharer/sharer.php?u=<url>`, WhatsApp `https://wa.me/?text=<text>`. Text = the View's first ~200 characters + the article title.
3. Give every View a public link `/views/<id>` (new route, same design system) showing the article headline, source link and her commentary, with `<title>` and Open Graph tags so shared links preview well.
   (This is a single-page app: for correct previews on LinkedIn/WhatsApp the OG tags must be rendered server-side. Implement via the same serverless platform's edge/route function, or state clearly that previews need pre-rendering.)
4. **Optional, off by default — auto-post to her own social accounts.** Add a "Also post to…" toggle in the composer that calls a **server-side** function (`api/publish-social.ts`) which
   verifies the caller is the signed-in office user (validate the Supabase JWT), then posts to whichever of these have credentials configured: LinkedIn Posts API (`https://api.linkedin.com/rest/posts`),
   X API v2 (`POST https://api.x.com/2/tweets`), Facebook Page (`POST https://graph.facebook.com/{page-id}/feed`). Tokens live only in server env vars.
   Check each platform's **current** developer docs and approval requirements first; report which are usable now. Ship LinkedIn/X/Facebook only if credentials exist; otherwise leave the toggle hidden.

**Important, and to be stated in the UI copy and the README:** a website **cannot post comments into another publisher's article page or comment section**. "My View" is published on this website (and, with Step 2.4, to her own social accounts). It does not appear under the original news article on the publisher's site.

## Step 3 — Live gold
1. Keep `api.gold-api.com` polling and the TradingView embed. Add: a visible **"Last updated hh:mm:ss"**, a **stale** state if no tick for 2 minutes, and pause polling while the tab is hidden.
2. Add a server-side fallback `api/gold.ts` (cached 15 s) that tries `https://api.gold-api.com/price/XAU` first, then a keyed provider whose key is in a server env var (e.g. GoldAPI.io or Metals-API) — only if I supply a key.
3. Keep FX from `https://open.er-api.com/v6/latest/USD` for the AED / INR figures. Label derived numbers as "spot-derived", as the UI does today.

## Acceptance checks (report each as pass / fail with evidence)
- `npm run build` passes; no new TypeScript errors; no visual change to any page (compare screenshots before/after in light **and** dark mode at 1440 px and 390 px).
- With the network throttled, the desk shows its honest error state, never made-up headlines.
- Only the signed-in office account can publish a View; an anonymous visitor cannot (test with the anon key directly against the REST endpoint).
- Two identical headlines from different feeds appear once.
- No API secret appears in the built JavaScript (`grep` the `dist` folder).

## Do NOT
Change the design, add libraries you don't need, expose secrets in client code, invent news or commentary, or remove any existing feature.
