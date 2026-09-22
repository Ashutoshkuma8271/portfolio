import { useEffect, useState } from 'react';

/**
 * Live sector intelligence for the 6 desks:
 * 1. Import / Export
 * 2. Gold
 * 3. Fleet
 * 4. Oil & Gas
 * 5. Real Estate
 * 6. H.E. Zeenat Kureshi (Official Diplomatic & Media Coverage)
 */

export const SECTORS = [
  {
    id: 'trade',
    label: 'Import / Export',
    blurb: 'India–GCC bilateral commerce, tariff arbitrage, gems & jewelry, and CEPA expansion protocols',
    query: 'India UAE CEPA trade',
    badge: 'Bilateral Trade Desk',
    categoryTag: '0% Tariff & CEPA Arbitrage',
    iconType: 'arrows',
    liveTag: 'LIVE',
  },
  {
    id: 'metals',
    label: 'Gold',
    blurb: 'Bullion liquidity, Dubai Gold Souk tariffs, Mumbai Zaveri Bazaar flows, and sovereign reserves',
    query: 'gold price Dubai India bullion',
    badge: 'Bullion & Metals Desk',
    categoryTag: 'Physical Bullion & IIBX GIFT City',
    iconType: 'coins',
    liveTag: 'LIVE',
  },
  {
    id: 'fleet',
    label: 'Fleet',
    blurb: 'Container freight rates, Red Sea routing, DP World Jebel Ali to JNPT Mumbai maritime corridors',
    query: 'shipping ports Red Sea Gulf India',
    badge: 'Maritime Fleet Desk',
    categoryTag: 'Multimodal Port Corridors',
    iconType: 'ship',
    liveTag: 'LIVE',
  },
  {
    id: 'energy',
    label: 'Oil & Gas',
    blurb: 'Brent crude pricing, ADNOC-India strategic petroleum reserves, LNG contracts, and Green Hydrogen',
    query: 'India Gulf oil gas energy',
    badge: 'Energy & Transition Desk',
    categoryTag: 'Hydrocarbon Security & Green Grid',
    iconType: 'flame',
    liveTag: 'LIVE',
  },
  {
    id: 'realty',
    label: 'Real Estate',
    blurb: 'Cross-border luxury real estate, DIFC capital allocations, BKC Mumbai hubs, and GIFT City FDI',
    query: 'Dubai real estate India property',
    badge: 'Sovereign Realty Desk',
    categoryTag: 'DIFC & BKC Institutional Assets',
    iconType: 'building',
    liveTag: 'LIVE',
  },
  {
    id: 'zeenat',
    label: 'H.E. Zeenat Kureshi',
    blurb: 'Direct diplomatic missions, bilateral trade summits, speeches, interviews, and official commentary by H.E. Zeenat Kureshi.',
    query: 'Zeenat Kureshi',
    badge: 'Executive Envoy Desk',
    categoryTag: 'Official Envoy Coverage',
    iconType: 'award',
    liveTag: 'VERIFIED',
  },
] as const;

export type SectorId = (typeof SECTORS)[number]['id'];

export interface IntelItem {
  title: string;
  publication: string;
  link: string;
  pubDate: string;
  categoryTag?: string;
  excerpt?: string;
}

export type IntelStatus = 'idle' | 'loading' | 'live' | 'error';

interface SectorCache {
  items: IntelItem[];
  status: IntelStatus;
  fetchedAt: number;
}

const CACHE_MS = 30 * 60 * 1000; // 30 minutes cache
/** The desk on screen re-fetches this often (only while the tab is visible). */
export const AUTO_REFRESH_MS = 5 * 60 * 1000;

// Curated live-fallback dispatches across the 6 sovereign sectors with authentic news excerpts
const cache = new Map<SectorId, SectorCache>();
const listeners = new Set<() => void>();
const inFlight = new Set<SectorId>();

const notify = () => listeners.forEach((l) => l());

const feedUrl = (query: string) =>
  'https://api.rss2json.com/v1/api.json?rss_url=' +
  encodeURIComponent(
    `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`,
  );

const decode = (t: string) =>
  t
    .replace(/&nbsp;|\u00a0/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&#39;|&apos;|&#8217;|&#8216;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, '—')
    .replace(/&hellip;|&#8230;/g, '…');

/** Google News titles arrive as "Headline - Publication"; split them apart. */
const splitTitle = (raw: string) => {
  const decoded = decode(raw || '').trim();
  const idx = decoded.lastIndexOf(' - ');
  return idx > -1
    ? { title: decode(decoded.slice(0, idx).trim()), publication: decode(decoded.slice(idx + 3).trim()) }
    : { title: decoded, publication: 'Sovereign Wire' };
};

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Wire-service feeds usually send the headline again as the "description",
 * followed by the publication name ("India's FTA Guide ... India's FTA Guide ...
 * The Economic Times"). Strip the repeated headline and the trailing
 * publication tag, and return clean readable excerpt.
 */
const cleanExcerpt = (raw: string | undefined, title: string, publication: string) => {
  if (!raw) return '';
  let text = decode(raw.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

  // repeated headline at the start (exact or near-exact)
  const t = norm(title);
  if (t && norm(text).startsWith(t)) {
    // remove the leading words that make up the headline
    const words = text.split(' ');
    let acc = '';
    let i = 0;
    while (i < words.length && norm(acc).length < t.length) acc += ' ' + words[i++];
    const rest = words.slice(i).join(' ').replace(/^[\s\-–—:|·.]+/, '').trim();
    if (!/^[a-z]/.test(rest)) text = rest;
  }
  // trailing publication / agency tag
  const pub = norm(publication);
  if (pub && norm(text).endsWith(pub)) {
    const words = text.split(' ');
    while (words.length && norm(words.join(' ')).endsWith(pub) && norm(words.join(' ')) !== '') {
      words.pop();
      if (!norm(words.join(' ')).endsWith(pub)) break;
    }
    text = words.join(' ').replace(/[\s\-–—:|·]+$/, '').trim();
  }
  // strip dangling truncated publication fragments like "The Times of", "The Economic", etc.
  text = text.replace(/(The Times of|The Times|The Economic|India News|Reuters|Gulf News|Moneycontrol)[\s\-–—:|·.]*$/i, '').trim();

  if (norm(text) === pub || norm(text) === t || text.length < 24) return '';
  return text.length > 200 ? text.slice(0, 197).trimEnd() + '…' : text;
};

const retries = new Map<SectorId, number>();

const load = async (id: SectorId, isRetry = false) => {
  const existing = cache.get(id);
  if (!isRetry && existing && Date.now() - existing.fetchedAt < CACHE_MS) return;
  if (inFlight.has(id)) return;

  inFlight.add(id);
  if (!cache.has(id)) {
    cache.set(id, { items: [], status: 'loading', fetchedAt: 0 });
    notify();
  }

  const sector = SECTORS.find((s) => s.id === id);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(feedUrl(sector ? sector.query : ''), { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('status not ok');
    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.items) || data.items.length === 0) {
      throw new Error('feed empty');
    }

    const liveItems: IntelItem[] = data.items.slice(0, 6).map(
      (it: { title?: string; link?: string; pubDate?: string; description?: string }) => {
        const { title, publication } = splitTitle(it.title || 'Untitled Dispatch');
        const parsedExcerpt = cleanExcerpt(it.description, title, publication);

        return {
          title,
          publication,
          link: it.link || '#',
          pubDate: it.pubDate || new Date().toISOString(),
          categoryTag: sector?.categoryTag || 'Market Dispatch',
          excerpt: parsedExcerpt,
        };
      },
    );

    cache.set(id, { items: liveItems, status: 'live', fetchedAt: Date.now() });
    retries.delete(id); // a good fetch clears the retry budget, so later outages get retried too
  } catch {
    // Report the outage honestly. Inventing headlines to fill the grid would
    // put fabricated market claims under a diplomat's masthead.
    const prior = cache.get(id);
    cache.set(id, {
      items: prior?.items ?? [],
      status: 'error',
      fetchedAt: prior?.fetchedAt ?? 0,
    });
    const attempt = (retries.get(id) ?? 0) + 1;
    if (attempt <= 3) {
      retries.set(id, attempt);
      inFlight.delete(id);
      window.setTimeout(() => load(id, true), attempt * 3500);
    }
  } finally {
    inFlight.delete(id);
    notify();
  }
};

export const useSectorIntel = (id: SectorId) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setTick((t) => t + 1);
    listeners.add(onUpdate);
    load(id);

    // Keep the desk that is on screen fresh: every 5 minutes while the tab is
    // visible, and straight away when the visitor comes back to a stale tab.
    const timer = window.setInterval(() => {
      if (!document.hidden) load(id, true);
    }, AUTO_REFRESH_MS);
    const onVisible = () => {
      if (document.hidden) return;
      const e = cache.get(id);
      if (!e || Date.now() - e.fetchedAt > AUTO_REFRESH_MS) load(id, true);
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      listeners.delete(onUpdate);
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [id]);

  const entry = cache.get(id);

  return {
    items: entry?.items ?? [],
    status: entry?.status ?? 'loading',
    fetchedAt: entry?.fetchedAt ?? 0,
    refresh: () => {
      cache.delete(id);
      load(id, true);
    },
  };
};
