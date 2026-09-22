import { Diamond } from '../ui/Diamond';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  PenLine,
  Check,
  X,
  ShieldCheck,
  Globe,
  Coins,
  Flame,
  Ship,
  ArrowLeftRight,
  Award,
  LogOut,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Container } from '../layout/Container';
import { SECTORS, useSectorIntel, type SectorId, type IntelItem } from '../../hooks/useSectorIntel';
import {
  loadNotes,
  saveNote,
  deleteNote,
  subscribeToViews,
  type ViewNote,
  type BackendState,
} from '../../lib/commentaryStore';
import { useOfficeAuth } from '../../contexts/OfficeAuthContext';
import { OfficeSignInModal } from '../ui/OfficeSignInModal';

import tradeIcon from '../../assets/images/focus/trade-icon.png';
import goldIcon from '../../assets/images/focus/gold-icon.png';
import fleetIcon from '../../assets/images/focus/fleet-icon.png';
import oilGasIcon from '../../assets/images/focus/oilgas-icon.png';
import zeenatAvatar from '../../assets/images/focus/zeenat-avatar.png';
import ddNewsLogo from '../../assets/images/focus/ddnews-logo.png';
import investIndiaLogo from '../../assets/images/focus/invest-india-logo.png';
import nagalandPostLogo from '../../assets/images/focus/nagaland-post-logo.png';
import theNationalNewsLogo from '../../assets/images/focus/thenationalnews-logo.png';
import economicTimesLogo from '../../assets/images/focus/economictimes-logo.png';
import indianExpressLogo from '../../assets/images/focus/indianexpress-logo.png';
import moneycontrolLogo from '../../assets/images/focus/moneycontrol-logo.png';
import timesOfIndiaLogo from '../../assets/images/focus/timesofindia-logo.png';
import gulfNewsLogo from '../../assets/images/focus/gulfnews-logo.png';
import indiaComLogo from '../../assets/images/focus/indiacom-logo.png';
import indiaShippingNewsLogo from '../../assets/images/focus/indiashippingnews-logo.png';
import livemintLogo from '../../assets/images/focus/livemint-logo.png';
import reutersLogo from '../../assets/images/focus/reuters-logo.png';
import sarkaritelLogo from '../../assets/images/focus/sarkaritel-logo.png';
import ndtvLogo from '../../assets/images/focus/ndtv-logo.png';
import indiaTodayLogo from '../../assets/images/focus/indiatoday-logo.png';
import forbesIndiaLogo from '../../assets/images/focus/forbesindia-logo.png';
import jllLogo from '../../assets/images/focus/jll-logo.png';
import thePrintLogo from '../../assets/images/focus/theprint-logo.png';
import magzterLogo from '../../assets/images/focus/magzter-logo.png';
import aniNewsLogo from '../../assets/images/focus/aninews-logo.png';
import awazTheVoiceLogo from '../../assets/images/focus/awazthevoice-logo.png';
import ahmedabadMirrorLogo from '../../assets/images/focus/ahmedabadmirror-logo.png';
import cepaBadge from '../../assets/images/focus/cepa-tariff-badge.png';
import bullionBadge from '../../assets/images/focus/bullion-gift-city-badge.png';
import fleetBadge from '../../assets/images/focus/multimodal-port-badge.png';
import oilGasBadge from '../../assets/images/focus/hydrocarbon-badge.png';
import difcBadge from '../../assets/images/focus/difc-bkc-badge.png';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const AUTHOR = 'H.E. Zeenat Kureshi';

/** High-definition vector clock icon matching the modern clean circle clock design */
const ClockIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9.5"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <path
      d="M12 6.5V12L15.5 15.5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const dateLabel = (raw: string) => {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return 'Live Wire';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const renderSectorIcon = (iconType: string, className = "h-5 w-5") => {
  switch (iconType) {
    case 'globe':
      return <Globe className={className} />;
    case 'coins':
      return <Coins className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'ship':
      return <Ship className={className} />;
    case 'arrows':
      return <ArrowLeftRight className={className} />;
    case 'building':
      return <Diamond />;
    case 'award':
      return <Award className={className} />;
    default:
      return <Globe className={className} />;
  }
};

const renderSectorBrand = (sectorId: string, iconType: string) => {
  switch (sectorId) {
    case 'trade':
      return <img src={tradeIcon} alt="" className="h-full w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />;
    case 'metals':
      return <img src={goldIcon} alt="" className="h-full w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />;
    case 'fleet':
      return <img src={fleetIcon} alt="" className="h-full w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />;
    case 'energy':
      return <img src={oilGasIcon} alt="" className="h-full w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />;
    case 'realty':
      return <img src={difcBadge} alt="" className="h-full w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />;
    case 'zeenat':
      return <img src={zeenatAvatar} alt="H.E. Zeenat Kureshi" className="h-full w-full object-cover rounded-md filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />;
    default:
      return renderSectorIcon(iconType, 'h-5 w-5');
  }
};

const renderPublicationLogo = (publication?: string) => {
  const raw = (publication || '').toLowerCase();
  const clean = raw.replace(/[^a-z0-9]/g, '');

  if (clean.includes('dd') || clean.includes('doordarshan') || clean.includes('ddnews')) {
    return (
      <img
        src={ddNewsLogo}
        alt="DD News"
        className="h-3.5 w-3.5 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('national') || clean.includes('thenational') || clean.includes('thenationalnews')) {
    return (
      <img
        src={theNationalNewsLogo}
        alt="The National News"
        className="h-3.5 w-3.5 rounded-xs shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('economic') || clean.includes('economictimes') || clean.includes('theeconomictimes') || clean === 'et') {
    return (
      <img
        src={economicTimesLogo}
        alt="The Economic Times"
        className="h-3.5 w-auto max-w-[28px] rounded-xs shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('indianexpress') || clean.includes('express') || clean.includes('theindianexpress')) {
    return (
      <img
        src={indianExpressLogo}
        alt="The Indian Express"
        className="h-3.5 w-3.5 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('moneycontrol') || clean.includes('money control')) {
    return (
      <img
        src={moneycontrolLogo}
        alt="Moneycontrol"
        className="h-3.5 w-auto max-w-[42px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('timesofindia') || clean.includes('toi') || clean.includes('thetimesofindia')) {
    return (
      <img
        src={timesOfIndiaLogo}
        alt="The Times of India"
        className="h-3.5 w-auto max-w-[28px] rounded-xs shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('gulfnews') || clean.includes('gulf news') || clean.includes('gulf')) {
    return (
      <img
        src={gulfNewsLogo}
        alt="Gulf News"
        className="h-3.5 w-3.5 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('indiacom') || clean.includes('indianews') || clean === 'india' || clean === 'indiacom') {
    return (
      <img
        src={indiaComLogo}
        alt="India.com"
        className="h-3.5 w-auto max-w-[34px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('indiashipping') || clean.includes('shippingnews') || clean.includes('shipping')) {
    return (
      <img
        src={indiaShippingNewsLogo}
        alt="India Shipping News"
        className="h-3.5 w-3.5 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('livemint') || clean.includes('mint')) {
    return (
      <img
        src={livemintLogo}
        alt="Livemint"
        className="h-3.5 w-auto max-w-[36px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('reuters') || clean.includes('reuterscom') || clean.includes('thomsonreuters')) {
    return (
      <img
        src={reutersLogo}
        alt="Reuters"
        className="h-3.5 w-3.5 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('sarkaritel') || clean.includes('sarkari')) {
    return (
      <img
        src={sarkaritelLogo}
        alt="Sarkaritel.com"
        className="h-3.5 w-auto max-w-[44px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('ndtv') || clean.includes('newdelhitelevision')) {
    return (
      <img
        src={ndtvLogo}
        alt="NDTV"
        className="h-3.5 w-auto max-w-[32px] rounded-xs shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('indiatoday') || clean.includes('today')) {
    return (
      <img
        src={indiaTodayLogo}
        alt="India Today"
        className="h-3.5 w-auto max-w-[32px] rounded-xs shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('forbesindia') || clean.includes('forbes')) {
    return (
      <img
        src={forbesIndiaLogo}
        alt="Forbes India"
        className="h-3.5 w-auto max-w-[40px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('jll') || clean.includes('joneslanglasalle')) {
    return (
      <img
        src={jllLogo}
        alt="JLL"
        className="h-3.5 w-auto max-w-[36px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('theprint') || clean.includes('print')) {
    return (
      <img
        src={thePrintLogo}
        alt="ThePrint"
        className="h-3.5 w-auto max-w-[38px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('magzter')) {
    return (
      <img
        src={magzterLogo}
        alt="Magzter"
        className="h-3.5 w-auto max-w-[42px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('aninews') || clean === 'ani' || clean.includes('asiannewsinternational')) {
    return (
      <img
        src={aniNewsLogo}
        alt="ANI News"
        className="h-3.5 w-auto max-w-[28px] rounded-xs shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('awaz') || clean.includes('thevoice') || clean.includes('awazthevoice')) {
    return (
      <img
        src={awazTheVoiceLogo}
        alt="Awaz The Voice"
        className="h-3.5 w-auto max-w-[42px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('ahmedabad') || clean.includes('mirror') || clean.includes('ahmedabadmirror')) {
    return (
      <img
        src={ahmedabadMirrorLogo}
        alt="Ahmedabad Mirror"
        className="h-3.5 w-auto max-w-[44px] shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('investindia') || clean.includes('invest')) {
    return (
      <img
        src={investIndiaLogo}
        alt="Invest India"
        className="h-3.5 w-3.5 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (clean.includes('nagaland') || clean.includes('nagalandpost')) {
    return (
      <img
        src={nagalandPostLogo}
        alt="Nagaland Post"
        className="h-3.5 w-3.5 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  return <Diamond className="h-2 w-2 shrink-0" />;
};

const renderCategoryLogo = (categoryTag?: string) => {
  const tag = (categoryTag || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (tag.includes('cepa') || tag.includes('tariff') || tag.includes('0')) {
    return (
      <img
        src={cepaBadge}
        alt="0% Tariff & CEPA Arbitrage"
        className="h-4 w-4 shrink-0 object-contain filter drop-shadow-xs"
      />
    );
  }
  if (tag.includes('bullion') || tag.includes('iibx') || tag.includes('gift') || tag.includes('gold') || tag.includes('metal')) {
    return (
      <img
        src={bullionBadge}
        alt="Physical Bullion & IIBX GIFT City"
        className="h-4 w-4 shrink-0 object-contain filter drop-shadow-xs rounded-full"
      />
    );
  }
  if (tag.includes('multimodal') || tag.includes('port') || tag.includes('corridor') || tag.includes('fleet') || tag.includes('ship')) {
    return (
      <img
        src={fleetBadge}
        alt="Multimodal Port Corridors"
        className="h-4 w-4 shrink-0 object-contain filter drop-shadow-xs rounded-full"
      />
    );
  }
  if (tag.includes('hydrocarbon') || tag.includes('energy') || tag.includes('gas') || tag.includes('oil') || tag.includes('green') || tag.includes('grid')) {
    return (
      <img
        src={oilGasBadge}
        alt="Hydrocarbon Security & Green Grid"
        className="h-4 w-4 shrink-0 object-contain rounded-full filter drop-shadow-xs"
      />
    );
  }
  if (tag.includes('difc') || tag.includes('bkc') || tag.includes('realty') || tag.includes('estate') || tag.includes('property') || tag.includes('asset')) {
    return (
      <img
        src={difcBadge}
        alt="DIFC & BKC Institutional Assets"
        className="h-4 w-4 shrink-0 object-contain rounded-full filter drop-shadow-xs"
      />
    );
  }
  if (tag.includes('envoy') || tag.includes('official') || tag.includes('zeenat') || tag.includes('coverage')) {
    return (
      <img
        src={zeenatAvatar}
        alt="Official Envoy Coverage"
        className="h-4 w-4 shrink-0 object-cover rounded-full filter drop-shadow-xs"
      />
    );
  }
  return <Diamond className="h-2 w-2 shrink-0" />;
};

/** Plain share links (no API keys). Only ever offered for a View that has been published. */
const shareTargets = (articleTitle: string, view: string) => {
  const url = `${window.location.origin}/#live-desk`;
  const quote = view.length > 200 ? `${view.slice(0, 197).trimEnd()}…` : view;
  const text = `“${quote}” — H.E. Zeenat Kureshi on: ${articleTitle}`;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  return [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${t}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
  ];
};

export const SectorIntelligence: React.FC = () => {
  const [active, setActive] = useState<SectorId>('trade');
  const { items, status, refresh, fetchedAt } = useSectorIntel(active);

  const [notes, setNotes] = useState<ViewNote[]>([]);
  const [editing, setEditing] = useState<IntelItem | null>(null);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [backend, setBackend] = useState<BackendState>('unconfigured');
  const [signInOpen, setSignInOpen] = useState(false);

  // Only a signed-in office account may publish; the database enforces this
  // too, so the UI simply reflects the same rule instead of offering a control
  // that would fail.
  const { isOffice, signOut } = useOfficeAuth();

  useEffect(() => {
    let cancelled = false;
    loadNotes().then(({ notes: fetched, state }) => {
      if (cancelled) return;
      setNotes(fetched);
      setBackend(state);
    });
    const unsubscribe = subscribeToViews(() => {
      loadNotes().then(({ notes: fresh, state }) => {
        if (cancelled) return;
        setNotes(fresh);
        setBackend(state);
      });
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const openEditor = (item: IntelItem) => {
    if (!isOffice) {
      setSignInOpen(true);
      return;
    }
    setEditing(item);
    const existing = notes.find((n) => n.articleId === item.link)?.body ?? '';
    setDraft(existing);
    setFlash(null);
  };

  const commitView = async () => {
    if (!editing || !draft.trim()) return;
    setSaving(true);
    const note: ViewNote = {
      articleId: editing.link,
      articleTitle: editing.title,
      publication: editing.publication,
      body: draft.trim(),
      author: AUTHOR,
      updatedAt: Date.now(),
    };
    const result = await saveNote(note);
    if (result.published) {
      setNotes((prev) => [note, ...prev.filter((n) => n.articleId !== note.articleId)]);
    }
    setSaving(false);
    setEditing(null);
    setFlash(
      result.published
        ? 'View published — live for every visitor.'
        : result.error ?? 'Could not publish this view.',
    );
    setTimeout(() => setFlash(null), 5000);
  };

  const removeView = async (articleId: string) => {
    await deleteNote(articleId);
    setNotes((prev) => prev.filter((n) => n.articleId !== articleId));
  };

  const activeSector = SECTORS.find((s) => s.id === active) || SECTORS[0];

  return (
    <section id="sector-intelligence" className="relative overflow-hidden bg-surface-sunken py-16 sm:py-24 scroll-mt-20 border-b border-hairline">
      <Container>
        {/* Section Header with Diplomatic Badge */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-600/40 bg-surface-raised px-4 py-1.5 shadow-xs mb-3.5 backdrop-blur-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </span>
            <span className="font-label text-2xs font-bold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
              Live Sovereign Desk &middot; 6 Sectors
            </span>
          </div>

          <h2 className="font-display text-[clamp(1.75rem,3.2vw+0.8rem,3rem)] font-bold leading-tight text-ink-heading tracking-[0.012em]">
            Live Market Intelligence &amp; Ministerial Perspectives
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
            Real-time verified news, articles, and blogs across Import/Export, Gold, Fleet, Oil &amp; Gas, Real Estate, and H.E. Zeenat Kureshi &mdash; updated live with direct executive commentary.
          </p>
        </div>

        {/* 6 Luxury Sector Terminal Switcher Cards */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {SECTORS.map((s) => {
            const isSelected = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={isSelected}
                className={`relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer select-none group overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#0a231b] via-[#051610] to-[#020b08] text-white border-2 border-gold-400 shadow-[0_10px_24px_rgba(18,51,43,0.35),0_0_16px_rgba(199,154,61,0.25)] scale-[1.02]'
                    : 'bg-surface-raised hover:bg-surface-sunken text-ink-heading border border-gold-500/30 shadow-2xs hover:border-gold-500/70 hover:-translate-y-0.5'
                }`}
              >
                {/* Active Gold Indicator Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500" />
                )}

                {/* Top Row: Brand Graphic / Avatar + Live Pill */}
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden border p-0.5 transition-all ${
                      isSelected
                        ? 'border-gold-400/80 bg-gold-500/20 shadow-xs'
                        : 'border-gold-500/20 bg-gold-500/10 group-hover:border-gold-500/40 group-hover:bg-gold-500/20'
                    }`}
                  >
                    {renderSectorBrand(s.id, s.iconType)}
                  </span>

                  <span
                    className={`font-label text-[0.6rem] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                      isSelected
                        ? 'bg-gold-400 text-emerald-950 shadow-xs'
                        : 'bg-surface-sunken text-ink-soft border border-gold-600/15'
                    }`}
                  >
                    {s.liveTag}
                  </span>
                </div>

                {/* Card Title & Metric */}
                <div>
                  <h4
                    className={`font-heading text-xs sm:text-sm font-bold leading-snug mb-0.5 transition-colors ${
                      isSelected ? 'text-white' : 'text-ink-heading group-hover:text-gold-700 dark:group-hover:text-gold-400'
                    }`}
                  >
                    {s.label}
                  </h4>
                  <span
                    className={`font-label text-[0.68rem] block truncate font-medium ${
                      isSelected ? 'text-gold-300/90' : 'text-ink-faint'
                    }`}
                  >
                    {s.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sector Metadata & Live Refresh Banner - Luxury Editorial Desk Layout */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-gold-500/35 bg-surface-raised p-5 sm:p-6 shadow-luxury backdrop-blur-xs">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gold-400/10 blur-3xl"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            {/* Left: Sector Brand Mark & Description */}
            <div className="flex items-start sm:items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden border border-gold-400/50 bg-gradient-to-br from-gold-500/20 to-gold-600/10 p-1.5 shadow-xs shrink-0">
                {renderSectorBrand(activeSector.id, activeSector.iconType)}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400">
                    {activeSector.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-3xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 shadow-2xs whitespace-nowrap">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span>Live Web Feed</span>
                  </span>
                </div>
                <p className="mt-1 font-sans text-xs sm:text-sm text-ink-soft leading-relaxed max-w-xl">
                  {activeSector.blurb}
                </p>
              </div>
            </div>

            {/* Right: Timestamp & Action Controls */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 pt-3 lg:pt-0 border-t border-hairline lg:border-t-0">
              <span className="font-label text-2xs font-semibold uppercase tracking-[0.12em] text-ink-faint" aria-live="polite">
                {fetchedAt ? `Updated ${new Date(fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Connecting…'}
                <span className="mx-1.5 text-gold-600">&middot;</span>5 min sync
              </span>

              <div className="flex items-center gap-2.5">
                {/* Sync Live Feed Button */}
                <button
                  type="button"
                  onClick={refresh}
                  className="group inline-flex h-9 sm:h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-400/80 bg-gradient-to-r from-[#0d2a20] via-[#091f18] to-[#04120e] px-4 py-1.5 font-label text-xs font-bold uppercase tracking-[0.14em] text-gold-300 shadow-luxury transition-all duration-300 hover:border-gold-300 hover:text-white hover:shadow-luxury-lg hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 shrink-0 text-gold-400 transition-transform duration-500 ${
                      status === 'loading' ? 'animate-spin' : 'group-hover:rotate-180'
                    }`}
                  />
                  <span>Sync Feed</span>
                </button>

                {/* Office Access Button */}
                <button
                  type="button"
                  onClick={() => (isOffice ? signOut() : setSignInOpen(true))}
                  className="group inline-flex h-9 sm:h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-600/40 bg-surface-raised hover:bg-surface-sunken px-4 py-1.5 font-label text-xs font-bold uppercase tracking-[0.14em] text-ink-heading transition-all duration-300 hover:border-gold-500/80 hover:shadow-luxury hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
                >
                  {isOffice ? (
                    <LogOut className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                  ) : (
                    <ShieldCheck className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  )}
                  <span>{isOffice ? 'Sign out' : 'Office Access'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Publishing status -- shown only to the office, because it is an
            operational detail, not something a visitor needs to read. */}
        {isOffice && backend !== 'ready' && (
          <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 font-sans text-xs leading-relaxed text-ink-soft">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span>
              {backend === 'missing-table'
                ? 'The views table does not exist yet. Run supabase/migrations/001_views.sql in the Supabase SQL Editor before publishing.'
                : backend === 'unconfigured'
                  ? 'Publishing is not configured: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are missing from this build.'
                  : 'Cannot reach the publishing database right now. Published views will not load or save until the connection returns.'}
            </span>
          </div>
        )}

        {/* Flash Confirmation Toast */}
        {flash && (
          <div className="mb-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-xs font-semibold text-ink-heading animate-fade-in shadow-xs flex items-center justify-center gap-2">
            <Diamond />
            <span>{flash}</span>
          </div>
        )}

        {/* 3-Column Luxury Real-World Editorial News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {items.map((item, idx) => {
            const savedCustomNote = notes.find((n) => n.articleId === item.link);
            const hasCustomTake = !!savedCustomNote;

            return (
              <motion.article
                key={item.link + idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07, ease: EASE_OUT }}
                className="group flex flex-col justify-between rounded-3xl border border-gold-500/35 bg-surface-raised p-5 sm:p-6 lg:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/70 hover:shadow-[0_16px_36px_-8px_rgba(18,51,43,0.12),0_0_20px_rgba(199,154,61,0.15)] relative overflow-hidden"
              >
                {/* Subtle top gold highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

                <div>
                  {/* Card Header: Publication, Category Tag & Date */}
                  <div className="flex items-center justify-between border-b border-gold-500/15 pb-3 mb-3.5 gap-2">
                    <span className="inline-flex items-center gap-1.5 font-label text-[0.65rem] sm:text-3xs font-bold uppercase tracking-wider text-ink-heading bg-surface-sunken px-2.5 py-1 rounded-md border border-gold-500/30 shadow-2xs">
                      {renderPublicationLogo(item.publication)}
                      <span className="truncate max-w-[130px] sm:max-w-[160px]">{item.publication || 'Sovereign Wire'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-label text-3xs sm:text-2xs text-ink-faint shrink-0">
                      <ClockIcon className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400 shrink-0" />
                      <span>{dateLabel(item.pubDate)}</span>
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="mb-2.5 flex items-center">
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] sm:text-3xs font-semibold uppercase tracking-wider text-gold-700 dark:text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-md border border-gold-500/20">
                      {renderCategoryLogo(item.categoryTag || activeSector.categoryTag)}
                      <span>{item.categoryTag || activeSector.categoryTag}</span>
                    </span>
                  </div>

                  {/* Headline */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors mb-3"
                  >
                    <h3 className="font-heading text-[1.08rem] sm:text-[1.15rem] font-bold text-ink-heading leading-snug transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-400 min-h-[3rem] line-clamp-3">
                      {item.title}
                    </h3>
                  </a>

                  {/* Real-World News Summary / Article Excerpt */}
                  <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed mb-4 line-clamp-3 min-h-[3.2rem]">
                    {item.excerpt || `${item.publication || 'Sovereign Wire'} intelligence dispatch covering bilateral developments, strategic market movements, and policy.`}
                  </p>

                  {/* Attached "My View" Commentary (When Written / Published) */}
                  {hasCustomTake && (
                    <div className="rounded-2xl border-l-3 border-gold-500 bg-surface-sunken p-3.5 text-xs space-y-1.5 border border-gold-500/25 mb-4 shadow-2xs animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-950 text-gold-400 font-heading text-3xs font-bold shadow-xs">
                            ZK
                          </div>
                          <span className="font-label text-3xs font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">
                            H.E. Zeenat Kureshi&apos;s View
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-label text-[0.58rem] font-semibold text-emerald-800 dark:text-emerald-300 uppercase bg-emerald-500/15 px-2 py-0.5 rounded">
                          <ShieldCheck className="h-3 w-3 shrink-0" />
                          Published
                        </span>
                      </div>

                      <p className="font-sans text-xs text-ink leading-relaxed italic">
                        &ldquo;{savedCustomNote.body}&rdquo;
                      </p>
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 font-label text-3xs font-bold uppercase tracking-wider text-ink-faint">
                        <span>Share</span>
                        {shareTargets(item.title, savedCustomNote.body).map((l) => (
                          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-800 dark:hover:text-gold-300">
                            {l.label}
                          </a>
                        ))}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Actions: Prominent "My View" Action Button + Source Link */}
                <div className="mt-4 pt-4 border-t border-gold-500/20 space-y-2">
                  <motion.button
                    type="button"
                    onClick={() => openEditor(item)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                    className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 px-4 py-2.5 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_6px_14px_-6px_rgba(199,154,61,0.55)] hover:shadow-[0_12px_22px_-8px_rgba(199,154,61,0.6)]"
                  >
                    <PenLine className="h-4 w-4 text-emerald-950 shrink-0 stroke-[2.2]" />
                    <span className="text-center text-emerald-950 font-bold">{hasCustomTake ? (isOffice ? 'Edit My View' : 'Read My View') : 'My View'}</span>
                  </motion.button>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center text-center gap-1.5 py-1 text-2xs font-sans font-semibold uppercase tracking-wider text-ink-faint hover:text-ink-heading transition-colors group/link cursor-pointer"
                  >
                    <span className="text-center">Read article</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-gold-600 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Terminal Verification Footer Note */}
        <div className="mt-10 text-center">
          <p className="font-sans text-3xs text-ink-faint max-w-xl mx-auto leading-relaxed">
            Market dispatches and media articles syndicated in real time via live verified web feeds. Strategic policy interpretations and &quot;My View&quot; insights authored and authorized by H.E. Zeenat Kureshi.
          </p>
        </div>
      </Container>

      {/* Interactive "My View" Executive Commentary Composer Modal */}
      <AnimatePresence>
        {editing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/80 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="w-full max-w-xl overflow-hidden rounded-3xl border-2 border-gold-500/50 bg-surface-raised text-ink shadow-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-start justify-between border-b border-gold-500/20 pb-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-sunken border border-gold-500/30 text-3xs font-label uppercase font-bold text-gold-700 dark:text-gold-400 mb-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold-600" />
                    My View &middot; Executive Commentary Desk
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ink-heading">
                    Publish My View on Internet
                  </h3>
                </div>
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-full p-1.5 text-ink-faint hover:bg-gold-500/10 hover:text-ink-heading cursor-pointer transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Source Article Title Reference */}
              <div className="rounded-xl bg-surface-sunken p-3.5 border border-gold-500/30 text-xs text-ink-soft space-y-1">
                <span className="font-label text-3xs uppercase font-bold text-ink-faint block">Dispatch Topic:</span>
                <p className="font-heading font-bold text-ink-heading text-sm leading-snug">{editing.title}</p>
                <span className="font-label text-3xs text-ink-faint">{editing.publication}</span>
              </div>

              {/* Textarea */}
              <div className="space-y-1.5">
                <label className="block font-label text-2xs font-bold uppercase tracking-wider text-ink-soft">
                  H.E. Zeenat Kureshi&apos;s Commentary &amp; Policy Reading:
                </label>
                <textarea
                  rows={4}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write your view on this dispatch, economic implications, or diplomatic policy takeaway..."
                  className="w-full rounded-xl border border-gold-500/30 bg-surface-sunken p-3.5 text-xs sm:text-sm text-ink placeholder:text-ink-faint focus:border-gold-600 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-gold-500/40"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                {notes.some((n) => n.articleId === editing.link) && (
                  <button
                    type="button"
                    onClick={() => {
                      removeView(editing.link);
                      setEditing(null);
                    }}
                    className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium cursor-pointer underline"
                  >
                    Remove My View
                  </button>
                )}

                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="rounded-full border border-hairline bg-surface px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft hover:bg-gold-500/10 hover:border-gold-500/40 hover:text-ink-heading transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={commitView}
                    disabled={saving || !draft.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-700/50 bg-surface-deep px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-gold-200 shadow-md transition-all duration-300 hover:bg-gold-500 hover:text-emerald-950 hover:border-gold-600 hover:shadow-gold-glow cursor-pointer disabled:opacity-50 active:scale-[0.98]"
                  >
                    <Check className="h-4 w-4 text-gold-400" />
                    <span>{saving ? 'Publishing...' : 'Publish My View Live'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <OfficeSignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </section>
  );
};
