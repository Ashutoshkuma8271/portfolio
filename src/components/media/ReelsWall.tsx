import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { reels, embedUrl, reelThumb, type Reel } from '../../data/reels';
import { BrandMark } from '../ui/BrandMark';

/** Poster for posts with no public still: the office monogram on the luxury brand ground. */
const BrandPoster: React.FC = () => (
  <div aria-hidden className="grain absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_40%,rgba(212,163,89,0.3),transparent_70%)]" />
    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
      <BrandMark theme="dark" size={88} className="drop-shadow-[0_6px_20px_rgba(199,154,61,0.35)]" />
    </div>
  </div>
);

/** Single Card with Continuous Actual Video Playback */
const ReelCard = React.memo<{
  reel: Reel;
  index: number;
  onOpen: () => void;
}>(({ reel, onOpen }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const thumb = reelThumb(reel);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay gracefully handled if restricted
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      aria-label={`Play ${reel.title}`}
      className="group relative aspect-[9/16] w-[72vw] xs:w-[62vw] sm:w-[215px] md:w-[230px] lg:w-[240px] xl:w-[250px] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-3xl border border-gold-600/35 bg-gradient-to-b from-emerald-800 via-emerald-900 to-emerald-950 text-left shadow-luxury transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400 hover:shadow-luxury-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 cursor-pointer"
    >
      {/* ── ACTUAL CONTINUOUSLY PLAYING BACKGROUND VIDEO ── */}
      <video
        ref={videoRef}
        src={reel.videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
      />

      {/* Fallback Poster while video is loading */}
      {!videoLoaded && (
        thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
          />
        ) : (
          <BrandPoster />
        )
      )}

      {/* Card Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/25 to-transparent pointer-events-none" />

      {/* Card Title at Bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 pointer-events-none">
        <span className="block font-heading text-sm sm:text-base font-semibold leading-snug text-ivory-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:translate-y-[-2px] line-clamp-2">
          {reel.title}
        </span>
      </div>
    </button>
  );
});

ReelCard.displayName = 'ReelCard';

/** Vertical 9:16 player in a modal with continuous repeating playback. Loads the embed once opened. */
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
              <span className="font-heading text-base font-semibold text-white tracking-normal">
                {reel.title}
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
                <button type="button" onClick={onClose} aria-label="Close video" className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 text-ivory-500 transition-colors hover:bg-gold-500 hover:text-emerald-950 cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative aspect-[9/16] h-[78svh] max-h-[860px] overflow-hidden rounded-3xl border border-gold-500/40 bg-black shadow-2xl">
              <iframe
                key={reel.id}
                src={embedUrl(reel, true, false, true)}
                title={reel.title}
                className="h-full w-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Modal Middle Left Button */}
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous video"
            className="absolute left-2 sm:left-4 top-1/2 z-20 flex h-12 w-12 sm:h-14 sm:w-14 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-[#C79A3D]/80 bg-white text-emerald-950 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 hover:border-gold-400 hover:bg-gold-50 active:scale-95 cursor-pointer dark:bg-white dark:text-emerald-950"
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.4]" />
          </button>

          {/* Modal Middle Right Button */}
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next video"
            className="absolute right-2 sm:right-4 top-1/2 z-20 flex h-12 w-12 sm:h-14 sm:w-14 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-[#C79A3D]/80 bg-white text-emerald-950 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 hover:border-gold-400 hover:bg-gold-50 active:scale-95 cursor-pointer dark:bg-white dark:text-emerald-950"
          >
            <ChevronRight className="h-6 w-6 stroke-[2.4]" />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};

/**
 * A scroll-snapping shelf of videos with circular middle navigation scroll buttons
 * and continuous repeating video playback directly inside the cards.
 */
export const ReelsWall: React.FC = () => {
  const rail = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!rail.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rail.current;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    window.addEventListener('orientationchange', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      window.removeEventListener('orientationchange', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: 1 | -1) => {
    if (!rail.current) return;
    const firstCard = rail.current.querySelector<HTMLElement>('button');
    if (!firstCard) return;

    // Determine exact single card step distance (card width + current responsive gap)
    const cardWidth = firstCard.offsetWidth;
    const computedStyle = window.getComputedStyle(rail.current);
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || '16') || 16;
    const stepDistance = cardWidth + gap;

    const currentScroll = rail.current.scrollLeft;
    const maxScroll = rail.current.scrollWidth - rail.current.clientWidth;

    // Calculate next/prev single card target scroll position
    let targetScroll: number;
    if (dir > 0) {
      targetScroll = (Math.floor(currentScroll / stepDistance) + 1) * stepDistance;
    } else {
      targetScroll = (Math.ceil(currentScroll / stepDistance) - 1) * stepDistance;
    }

    const clampedScroll = Math.max(0, Math.min(maxScroll, targetScroll));
    rail.current.scrollTo({ left: clampedScroll, behavior: 'smooth' });
  };

  const step = (d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + reels.length) % reels.length));

  return (
    <div className="relative w-full">
      <div className="relative group/rail w-full">
        {/* Middle Left Scroll Button */}
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll videos left"
          className="absolute left-1 sm:left-2 lg:left-3 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-13 lg:w-13 items-center justify-center rounded-full border-[1.5px] border-[#C79A3D]/90 bg-white/95 text-emerald-950 shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold-400 hover:bg-gold-50 active:scale-95 cursor-pointer disabled:opacity-0 disabled:pointer-events-none dark:bg-white/95 dark:text-emerald-950"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.4]" />
        </button>

        {/* Middle Right Scroll Button */}
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={!canScrollRight}
          aria-label="Scroll videos right"
          className="absolute right-1 sm:right-2 lg:right-3 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-13 lg:w-13 items-center justify-center rounded-full border-[1.5px] border-[#C79A3D]/90 bg-white/95 text-emerald-950 shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-gold-400 hover:bg-gold-50 active:scale-95 cursor-pointer disabled:opacity-0 disabled:pointer-events-none dark:bg-white/95 dark:text-emerald-950"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.4]" />
        </button>

        {/* Reel Cards Shelf */}
        <div
          ref={rail}
          className="scrollbar-hidden no-scrollbar flex snap-x snap-mandatory gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto px-4 sm:px-6 lg:px-2 pb-4 pt-1 scroll-smooth -mx-4 sm:-mx-6 lg:mx-0"
        >
          {reels.map((r, i) => (
            <ReelCard
              key={r.id}
              reel={r}
              index={i}
              onOpen={() => setOpen(i)}
            />
          ))}
        </div>
      </div>

      <ReelPlayer reel={open === null ? null : reels[open]} onClose={() => setOpen(null)} onStep={step} />
    </div>
  );
};


