import { Diamond } from '../ui/Diamond';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronRight,
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
  Radio
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
import { PublicationLogo } from '../ui/PublicationLogo';

import tradeIcon from '../../assets/images/sectors/trade-icon.png';
import goldIcon from '../../assets/images/sectors/gold-icon.png';
import fleetIcon from '../../assets/images/sectors/fleet-icon.png';
import oilGasIcon from '../../assets/images/sectors/oilgas-icon.png';
import zeenatAvatar from '../../assets/images/avatar/zeenat-avatar.png';
import cepaBadge from '../../assets/images/sectors/cepa-tariff-badge.png';
import bullionBadge from '../../assets/images/sectors/bullion-gift-city-badge.png';
import fleetBadge from '../../assets/images/sectors/multimodal-port-badge.png';
import oilGasBadge from '../../assets/images/sectors/hydrocarbon-badge.png';
import difcBadge from '../../assets/images/sectors/difc-bkc-badge.png';

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

        {/* 6 Luxury Horizontal Sector Switcher Cards */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {SECTORS.map((s) => {
            const isSelected = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={isSelected}
                className={`group relative flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer select-none min-w-0 ${isSelected
                    ? 'bg-gradient-to-r from-emerald-950 via-[#0a231b] to-emerald-950 text-white border-2 border-gold-400 shadow-[0_12px_28px_rgba(18,51,43,0.35),0_0_16px_rgba(199,154,61,0.25)] scale-[1.015]'
                    : 'bg-surface-raised hover:bg-surface-sunken text-ink-heading border border-gold-600/25 shadow-luxury hover:border-gold-500/60 hover:-translate-y-0.5'
                  }`}
              >
                <div className="flex items-center min-w-0 flex-1">
                  {/* Circular Emblem with Gold Rim */}
                  <span
                    className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border-2 p-0.5 shadow-2xs overflow-hidden transition-transform duration-300 group-hover:scale-105 ${isSelected
                        ? 'border-gold-400 bg-gold-500/20'
                        : 'border-gold-500/40 bg-surface-sunken group-hover:border-gold-400'
                      }`}
                  >
                    {renderSectorBrand(s.id, s.iconType)}
                  </span>

                  {/* Elegant Vertical Gold Divider */}
                  <span
                    aria-hidden
                    className={`h-7 w-[1.5px] shrink-0 mx-2 sm:mx-2.5 rounded-full ${isSelected ? 'bg-gold-400/50' : 'bg-gold-600/25'
                      }`}
                  />

                  {/* Sector Title in Classical Display Style */}
                  <span
                    className={`font-cormorant sm:font-display text-[0.88rem] sm:text-[0.98rem] font-bold leading-tight truncate transition-colors ${isSelected
                        ? 'text-white'
                        : 'text-ink-heading group-hover:text-gold-800 dark:group-hover:text-gold-300'
                      }`}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Trailing Gold Chevron */}
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ml-1 ${isSelected ? 'text-gold-400' : 'text-gold-700 dark:text-gold-400'
                    }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        {/* Sector Metadata & Live Refresh Banner - Luxury Editorial Desk Layout */}
        <div className="relative mb-8 w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gold-500/40 bg-surface-raised p-4 sm:p-5 lg:px-7 lg:py-4.5 shadow-luxury backdrop-blur-xs">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gold-400/10 blur-3xl"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            {/* Left: Prominent Sector Logo, Divider & Description */}
            <div className="flex items-center min-w-0 flex-1">
              {/* Prominent Square Logo Card */}
              <div className="flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl border border-gold-500/50 bg-[#FAF7F0] dark:bg-[#151C18] p-1.5 sm:p-2 shadow-xs">
                {renderSectorBrand(activeSector.id, activeSector.iconType)}
              </div>

              {/* Vertical Gold Divider */}
              <span
                aria-hidden
                className="hidden sm:block h-12 w-[1.5px] bg-gold-600/35 shrink-0 mx-4 sm:mx-5 rounded-full"
              />

              {/* Title & Live Feed Status */}
              <div className="ml-3 sm:ml-0 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <h3 className="font-cinzel text-base sm:text-lg md:text-[1.22rem] font-bold uppercase tracking-[0.08em] text-gold-800 dark:text-gold-300 leading-tight">
                    {activeSector.badge}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-[#E2EFE8] dark:bg-emerald-950/70 px-2.5 py-0.5 text-[0.65rem] sm:text-[0.68rem] font-bold uppercase tracking-wider text-[#185D3B] dark:text-emerald-300 shadow-2xs whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>Live Web Feed</span>
                  </span>
                </div>
                <p className="mt-1 font-sans text-xs sm:text-[0.84rem] text-ink-soft leading-relaxed max-w-2xl">
                  {activeSector.blurb}
                </p>
              </div>
            </div>

            {/* Right: Timestamp & Action Controls */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-center justify-center lg:justify-end gap-3 sm:gap-4 shrink-0 pt-3.5 lg:pt-0 border-t border-hairline lg:border-t-0 w-full lg:w-auto">
              {/* Divider & Timestamp */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
                <span aria-hidden className="hidden xl:block h-7 w-[1px] bg-gold-600/30 mr-1" />
                <div className="flex items-center justify-center gap-1.5 text-2xs sm:text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-faint text-center">
                  <ClockIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-600 dark:text-gold-400 shrink-0" />
                  <span>
                    {fetchedAt
                      ? `UPDATED ${new Date(fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                      : 'CONNECTING…'}
                  </span>
                  <span className="text-gold-600">&bull;</span>
                  <span>5 MIN SYNC</span>
                </div>
              </div>

              {/* Action Buttons with Identical Proportion and Mobile Centering */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                {/* Sync Live Feed Button */}
                <button
                  type="button"
                  onClick={refresh}
                  className="group inline-flex h-10 sm:h-11 flex-1 sm:flex-initial min-w-[140px] sm:min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-400/80 bg-gradient-to-r from-[#0C241B] via-[#081E16] to-[#04100C] px-4.5 sm:px-5 py-2 font-label text-xs font-bold uppercase tracking-[0.14em] text-gold-300 shadow-luxury transition-all duration-300 hover:border-gold-300 hover:text-white hover:shadow-luxury-lg hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap text-center"
                >
                  <Radio className={`h-4 w-4 text-gold-400 shrink-0 ${status === 'loading' ? 'animate-spin' : ''}`} />
                  <span>SYNC FEED</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gold-400 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

                {/* Office Access Button */}
                <button
                  type="button"
                  onClick={() => (isOffice ? signOut() : setSignInOpen(true))}
                  className="group inline-flex h-10 sm:h-11 flex-1 sm:flex-initial min-w-[140px] sm:min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-full border border-gold-600/40 bg-[#FAF7F0] dark:bg-surface-raised hover:bg-surface-sunken px-4.5 sm:px-5 py-2 font-label text-xs font-bold uppercase tracking-[0.14em] text-ink-heading transition-all duration-300 hover:border-gold-500 hover:shadow-luxury hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap text-center"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-700 dark:text-gold-400">
                    {isOffice ? <LogOut className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                  </span>
                  <span>{isOffice ? 'SIGN OUT' : 'OFFICE ACCESS'}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
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
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-surface-raised p-5 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-16px_rgba(18,51,43,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_22px_44px_-18px_rgba(18,51,43,0.28),0_0_0_1px_rgba(199,154,61,0.12)]"
              >
                {/* Gold rule that draws in on hover */}
                <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div>
                  {/* Source row: outlet logo, outlet name, date */}
                  <div className="mb-4 flex items-center gap-3">
                    <PublicationLogo publication={item.publication || 'Sovereign Wire'} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-label text-2xs font-bold uppercase tracking-[0.12em] text-ink-heading">
                        {item.publication || 'Sovereign Wire'}
                      </p>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 font-label text-3xs sm:text-2xs text-ink-faint">
                        <ClockIcon className="h-3 w-3 text-gold-600 dark:text-gold-400 shrink-0" />
                        <span>{dateLabel(item.pubDate)}</span>
                      </p>
                    </div>
                  </div>

                  {/* Category Kicker */}
                  <div className="mb-2.5 flex items-center gap-1.5 font-label text-2xs font-bold uppercase tracking-[0.16em] text-[#8A6920] dark:text-gold-400">
                    <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center">
                      {renderCategoryLogo(item.categoryTag || activeSector.categoryTag)}
                    </span>
                    <span className="truncate">{item.categoryTag || activeSector.categoryTag}</span>
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
                        <span className="inline-flex items-center gap-1 font-label text-3xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase bg-emerald-500/15 px-2 py-0.5 rounded">
                          <ShieldCheck className="h-3 w-3 shrink-0" />
                          Published
                        </span>
                      </div>

                      <p className="font-cormorant text-[1.05rem] font-medium italic leading-snug text-ink-heading">
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
                {/* Side by side only where the card is wide enough for both labels */}
                <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-hairline pt-4 xs:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <motion.button
                    type="button"
                    onClick={() => openEditor(item)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                    className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-gold-400/70 bg-gradient-to-r from-[#0C241B] via-[#081E16] to-[#04100C] px-3 py-2 font-label text-2xs font-bold uppercase tracking-[0.1em] text-gold-300 shadow-luxury transition-all duration-300 hover:border-gold-300 hover:text-white hover:shadow-luxury-lg"
                  >
                    <PenLine className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                    <span>{hasCustomTake ? (isOffice ? 'Edit My View' : 'Read My View') : 'My View'}</span>
                  </motion.button>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read the original article on ${item.publication || 'the source site'}`}
                    className="group/link inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-gold-600/40 bg-surface-raised px-3 py-2 font-label text-2xs font-bold uppercase tracking-[0.1em] text-ink-heading transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-600 hover:bg-gold-500/10 hover:text-gold-900 dark:hover:text-gold-200"
                  >
                    <span>Read Original</span>
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

  {/* Interactive "My View" Executive Commentary Composer Modal */ }
  <AnimatePresence>
{
  editing && (
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
            maxLength={4000}
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
  )
}
      </AnimatePresence >
  <OfficeSignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </section >
  );
};
