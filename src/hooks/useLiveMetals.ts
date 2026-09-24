import { useEffect, useState } from 'react';

const POLL_MS = 20_000; // the feed's own edge cache refreshes every ~6-16s
const MAX_POINTS = 48;

const ENDPOINTS = {
  XAU: 'https://api.gold-api.com/price/XAU',
  XAG: 'https://api.gold-api.com/price/XAG',
} as const;

/** Free, keyless, CORS-open FX so the AED/INR figures are derived from real
 *  rates rather than typed in by hand. */
const FX_URL = 'https://open.er-api.com/v6/latest/USD';

/** Daily gold reference (USD per oz, snapshot at the start of each UTC day) from
 *  the open fawazahmed0 currency dataset -- keyless and CORS-open, so the card can
 *  show a real day change. The second host is the dataset's documented mirror. */
const REFERENCE_URLS = [
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json',
  'https://latest.currency-api.pages.dev/v1/currencies/xau.json',
];
const REFERENCE_REFRESH_MS = 60 * 60 * 1000;

/** One troy ounce in grams -- the constant that turns a spot $/oz quote into
 *  the per-gram and per-10g figures the Gulf and Indian desks actually quote. */
export const GRAMS_PER_TROY_OUNCE = 31.1034768;

export type MetalSymbol = keyof typeof ENDPOINTS;

export interface MetalPoint {
  time: number;
  price: number;
}

export interface MetalState {
  points: MetalPoint[];
  price: number | null;
  updatedAt: number | null;
}

export type FeedStatus = 'loading' | 'live' | 'error';

export interface FxRates {
  AED: number | null;
  INR: number | null;
}

export interface GoldReference {
  /** USD per troy ounce at the start of `date` (UTC). */
  price: number;
  /** YYYY-MM-DD, as published by the dataset. */
  date: string;
}

interface Store {
  metals: Record<MetalSymbol, MetalState>;
  fx: FxRates;
  reference: GoldReference | null;
  status: FeedStatus;
}

/**
 * One shared polling loop for live precious-metal spot prices, so every
 * consumer on the page reads the same feed instead of each mounting its own
 * interval and multiplying requests against a free public API.
 *
 * The endpoint is keyless and CORS-open, which matters: this is a static site
 * with no backend, so an API requiring a secret key could not be called from
 * the browser without exposing that key in the bundle.
 *
 * Everything plotted is a real fetched tick from this browsing session. No
 * synthetic history is ever back-filled -- if the chart is short, it is short.
 */
let store: Store = {
  metals: {
    XAU: { points: [], price: null, updatedAt: null },
    XAG: { points: [], price: null, updatedAt: null },
  },
  fx: { AED: null, INR: null },
  reference: null,
  status: 'loading',
};

const listeners = new Set<() => void>();
let started = false;

const notify = () => listeners.forEach((l) => l());

const pollOne = async (symbol: MetalSymbol) => {
  const res = await fetch(ENDPOINTS[symbol]);
  if (!res.ok) throw new Error(`${symbol} feed unavailable`);
  const data = await res.json();
  const price = Number(data.price);
  if (!Number.isFinite(price)) throw new Error(`${symbol} returned a non-numeric price`);
  const prev = store.metals[symbol];
  return {
    points: [...prev.points, { time: Date.now(), price }].slice(-MAX_POINTS),
    price,
    updatedAt: Date.now(),
  } satisfies MetalState;
};

const pollFx = async (): Promise<FxRates> => {
  try {
    const res = await fetch(FX_URL);
    if (!res.ok) throw new Error('FX feed unavailable');
    const data = await res.json();
    const aed = Number(data?.rates?.AED);
    const inr = Number(data?.rates?.INR);
    return {
      AED: Number.isFinite(aed) ? aed : store.fx.AED,
      INR: Number.isFinite(inr) ? inr : store.fx.INR,
    };
  } catch {
    // Keep whatever we already had; a stale-but-real rate beats inventing one.
    return store.fx;
  }
};

/** Next time the daily reference may be (re)fetched: hourly after a success, 5 min after a failure. */
let referenceNextAt = 0;

const pollReference = async () => {
  for (const url of REFERENCE_URLS) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const price = Number(data?.xau?.usd);
      const date = typeof data?.date === 'string' ? data.date : '';
      if (Number.isFinite(price) && price > 0 && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        store = { ...store, reference: { price, date } };
        referenceNextAt = Date.now() + REFERENCE_REFRESH_MS;
        notify();
        return;
      }
    } catch {
      // try the mirror
    }
  }
  // No reference: the card simply shows no day change rather than a made-up one.
};

const poll = async () => {
  try {
    const [xau, xag, fx] = await Promise.all([pollOne('XAU'), pollOne('XAG'), pollFx()]);
    store = { ...store, metals: { XAU: xau, XAG: xag }, fx, status: 'live' };
  } catch {
    store = { ...store, status: store.status === 'loading' ? 'error' : store.status };
  }
  if (Date.now() >= referenceNextAt) {
    referenceNextAt = Date.now() + 5 * 60 * 1000;
    pollReference();
  }
  notify();
};

const ensurePolling = () => {
  if (started) return;
  started = true;
  poll();
  // Don't poll a free public API from a tab nobody is looking at; catch up when it comes back.
  window.setInterval(() => {
    if (!document.hidden) poll();
  }, POLL_MS);
  document.addEventListener('visibilitychange', () => {
    const last = store.metals.XAU.updatedAt ?? 0;
    if (!document.hidden && Date.now() - last > POLL_MS) poll();
  });
};

export function useLiveMetals() {
  const [, force] = useState(0);
  useEffect(() => {
    ensurePolling();
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return store;
}
