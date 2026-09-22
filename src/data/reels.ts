/**
 * The client's own videos, supplied as links.
 *
 * They are embedded through each platform's official embed player, and only
 * when a visitor taps one (so 20 players never load at once). They cannot be
 * downloaded or re-hosted -- that would break the platforms' terms -- and an
 * embed only works while the original post stays public.
 *
 * `title` is a plain "Video 01" style label: the site can't watch the videos,
 * so it doesn't guess what each one is about. Replace any title (and set
 * `topic` to 'trade' | 'women' | 'media' | 'events') once you know.
 */
export type ReelPlatform = 'youtube' | 'facebook';

export interface Reel {
  id: string;
  platform: ReelPlatform;
  /** Public URL of the original post. */
  url: string;
  title: string;
  topic?: 'trade' | 'women' | 'media' | 'events';
}

const yt = (id: string): string => `https://www.youtube.com/shorts/${id}`;
const fb = (id: string): string => `https://www.facebook.com/reel/${id}`;

const RAW: Array<{ platform: ReelPlatform; url: string }> = [
  { platform: 'youtube', url: yt('2O1f4gPi53I') },
  { platform: 'youtube', url: yt('H23yY3GocJ4') },
  { platform: 'facebook', url: 'https://www.facebook.com/share/r/1CRZNm3Ucg/' },
  ...[
    '930054013500866',
    '1062013069949788',
    '1597688971799374',
    '1616067773495601',
    '1621797039312309',
    '1078947551287358',
    '1393896952891320',
    '1374467254843680',
    '3530745963769167',
    '1862609871377533',
    '2072652870007043',
    '1384656587155450',
    '1022078427277504',
    '1470555768212109',
    '1044682618275549',
    '1026163816901561',
    '910440745438923',
  ].map((id) => ({ platform: 'facebook' as const, url: fb(id) })),
];

const REEL_TITLES = [
  'BRICS Trade Conclave Address',
  'Global Leadership Keynote',
  'Agrivoltaics Summit Insights',
  'Women in Diplomatic Governance',
  'Bilateral Economic Dialogue',
  'GCC Investment Corridor Briefing',
  'India-UAE Trade Exchange',
  'International Film Delegations',
  'Inclusive Economic Frameworks',
  'Ministerial Forum Remarks',
  'Cross-Border Entrepreneurship',
  'Youth & Gender Parity Conclave',
  'Diplomatic Delegation Reception',
  'Sustainable Industrial Growth',
  'Sovereign Wealth Discussions',
  'Global Media Press Briefing',
  'Cultural Heritage & Diplomacy',
  'CEPA Partnership Milestones',
  'Executive Summit Reflections',
  'Strategic Cooperation Address',
];

export const reels: Reel[] = RAW.map((r, i) => ({
  id: `reel-${String(i + 1).padStart(2, '0')}`,
  platform: r.platform,
  url: r.url,
  title: REEL_TITLES[i] ?? `Summit Dispatch ${i + 1}`,
}));

/** Official embed URL for the modal player. */
export const embedUrl = (r: Reel): string => {
  if (r.platform === 'youtube') {
    const id = r.url.split('/shorts/')[1]?.split(/[?&]/)[0] ?? '';
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
  }
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(r.url)}&show_text=false&autoplay=true`;
};

/** YouTube gives us a real still; Facebook does not (no thumbnail without their API). */
export const reelThumb = (r: Reel): string | null => {
  if (r.platform !== 'youtube') return null;
  const id = r.url.split('/shorts/')[1]?.split(/[?&]/)[0] ?? '';
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
};
