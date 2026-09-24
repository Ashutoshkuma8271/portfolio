import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from 'lucide-react';
import { reels, embedUrl, reelThumb, type Reel } from '../../data/reels';
import { BrandMark } from '../ui/BrandMark';
import facebookLogo from '../../assets/images/platform-logos/facebook.png';
import youtubeLogo from '../../assets/images/platform-logos/youtube.png';

const PLATFORM_LABEL = { youtube: 'YouTube', facebook: 'Facebook' } as const;
const PLATFORM_LOGO = { youtube: youtubeLogo, facebook: facebookLogo } as const;

/** Poster for posts with no public still (Facebook): the office monogram on the brand ground. */
const BrandPoster: React.FC = () => (
  <div aria-hidden className="grain absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_22%,rgba(212,163,89,0.28),transparent_70%)]" />
    <div className="absolute inset-x-6 top-[14%] flex flex-col items-center gap-3 transition-transform duration-700 group-hover:scale-105">
      <BrandMark theme="dark" size={84} className="drop-shadow-[0_6px_18px_rgba(199,154,61,0.35)]" />
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      <span className="font-label text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold-300/90">Official channel</span>
    </div>
  </div>
);

/** Vertical 9:16 player in a modal. Loads the embed only once opened. */
const ReelPlayer: React.FC<{ reel: Reel | null; onClose: () => void; onStep: (d: 1 | -1) => void }> = ({
  reel,
  onClose,
  onStep,
}) => {
  useEffect(() => {
    if (!reel) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [reel, onClose, onStep]);

  return (
    <AnimatePresence>
      {reel && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={reel.title}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-surface-deepest/85 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-full flex-col items-center"
          >
            <div className="mb-3 flex w-full items-center justify-between gap-3 text-ivory-500">
              <span className="font-label text-2xs font-bold uppercase tracking-[0.18em] text-gold-300">
                {reel.title} · {PLATFORM_LABEL[reel.platform]}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gold-400/40 px-3.5 font-label text-2xs font-bold uppercase tracking-[0.12em] text-ivory-500 transition-colors hover:border-gold-300 hover:text-gold-300"
                >
                  Open <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button type="button" onClick={onClose} aria-label="Close video" className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 text-ivory-500 transition-colors hover:bg-gold-500 hover:text-emerald-950">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative aspect-[9/16] h-[78svh] max-h-[860px] overflow-hidden rounded-3xl border border-gold-500/40 bg-black shadow-2xl">
              <iframe
                key={reel.id}
                src={embedUrl(reel)}
                title={reel.title}
                className="h-full w-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-center text-xs text-ivory-700">
              If the video doesn’t load, the original post may be private — use “Open”.
            </p>
          </motion.div>
          <button type="button" onClick={() => onStep(-1)} aria-label="Previous video" className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400/40 bg-emerald-950/70 text-ivory-500 transition-colors hover:bg-gold-500 hover:text-emerald-950 sm:flex">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => onStep(1)} aria-label="Next video" className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400/40 bg-emerald-950/70 text-ivory-500 transition-colors hover:bg-gold-500 hover:text-emerald-950 sm:flex">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};

/**
 * A scroll-snapping shelf of the client's videos. Cards are click-to-play so
 * the page stays fast; the real player only loads when one is opened.
 */
export const ReelsWall: React.FC = () => {
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * Math.max(280, rail.current.clientWidth * 0.8), behavior: 'smooth' });

  const step = (d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + reels.length) % reels.length));

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-ink-soft">{reels.length} videos · tap to play</p>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll videos left" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/40 bg-surface-raised text-ink-heading transition-colors hover:border-gold-500 hover:bg-gold-500/15">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll videos right" className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/40 bg-surface-raised text-ink-heading transition-colors hover:border-gold-500 hover:bg-gold-500/15">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={rail}
        className="scrollbar-hidden -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {reels.map((r, i) => {
          const thumb = reelThumb(r);
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Play ${r.title} from ${PLATFORM_LABEL[r.platform]}`}
              className="group relative aspect-[9/16] w-[62vw] max-w-[15rem] shrink-0 snap-start overflow-hidden rounded-3xl border border-gold-600/35 bg-gradient-to-b from-emerald-800 via-emerald-900 to-emerald-950 text-left shadow-luxury transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400 hover:shadow-luxury-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 sm:w-56"
            >
              {thumb && !failed[r.id] ? (
                <img
                  src={thumb}
                  alt=""
                  loading="lazy"
                  onError={() => setFailed((f) => ({ ...f, [r.id]: true }))}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <BrandPoster />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/30 to-transparent" />
              <span className="absolute left-3 top-3 z-[3] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-emerald-950/75 py-1 pl-1 pr-2.5 font-label text-3xs font-bold uppercase tracking-[0.14em] text-ivory-500 backdrop-blur">
                <img src={PLATFORM_LOGO[r.platform]} alt="" className="h-4 w-4 rounded-full bg-white object-contain p-[1.5px]" />
                {PLATFORM_LABEL[r.platform]}
              </span>
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold-300 bg-gradient-to-br from-gold-400 to-gold-600 text-emerald-950 shadow-[0_0_30px_rgba(230,189,101,0.5)] transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4 font-heading text-lg font-semibold text-ivory-500">{r.title}</span>
            </button>
          );
        })}
      </div>

      <ReelPlayer reel={open === null ? null : reels[open]} onClose={() => setOpen(null)} onStep={step} />
    </div>
  );
};
