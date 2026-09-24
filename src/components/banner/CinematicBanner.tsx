import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Pause, Play, Camera } from 'lucide-react';
import { Container } from '../layout/Container';
import { BackdropMedia, BackdropMode } from './BackdropMedia';
import { sectionMedia, SectionKey, SectionMedia } from '../../data/sectionMedia';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface BannerStat {
  value: string;
  label: string;
}

interface CinematicBannerProps {
  /** Which section's photograph / video to run behind the copy. */
  section: SectionKey;
  eyebrow: string;
  /** Main headline. `accent` (if given) follows it in gold italic. */
  title: string;
  accent?: string;
  description?: string;
  /** Label for the current page in the breadcrumb ("Home / <label>"). */
  breadcrumb?: string;
  stats?: BannerStat[];
  /** CTA buttons -- pass <BannerButton/> elements. */
  actions?: React.ReactNode;
  /** Override individual media fields (e.g. a page-specific focal point). */
  mediaOverride?: Partial<SectionMedia>;
  /** Id of the element below the banner, for the scroll cue. */
  scrollTargetId?: string;
}

/**
 * The opening of every inner page.
 *
 * Full-bleed photograph on the right (top frame on mobile), copy on the left.
 * The copy is held to the left half so it never sits on the picture, which
 * means the picture needs no wash over it -- only a short blend at its left
 * edge -- and stays fully clear. A gentle scroll parallax gives it depth.
 */
export const CinematicBanner: React.FC<CinematicBannerProps> = ({
  section,
  eyebrow,
  title,
  accent,
  description,
  stats,
  actions,
  mediaOverride,
  scrollTargetId,
}) => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<BackdropMode>('photo');
  const [paused, setPaused] = useState(false);
  const media: SectionMedia = { ...sectionMedia[section], ...mediaOverride };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '8%']);

  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.12 + i * 0.09, ease: EASE_OUT },
  });

  const hasRail = Boolean(stats && stats.length);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-surface text-ink lg:min-h-[88svh]"
      aria-label={`${eyebrow} banner`}
    >
      {/* 1. Photograph / looping video: full-bleed right-hand side on desktop, top frame on mobile */}
      {/* banner-photo-blend: eased fade into the page along the photo's inner edge (see index.css) */}
      <div className="banner-photo-blend absolute left-0 right-0 top-0 -z-10 h-[40svh] overflow-hidden sm:h-[44svh] lg:inset-y-0 lg:left-[44%] lg:h-auto xl:left-[46%]">
        <motion.div style={{ y: imageY, scale: 1.08 }} className="grain absolute inset-0 will-change-transform">
          <BackdropMedia media={media} paused={paused} onModeChange={setMode} priority />
        </motion.div>
      </div>

      {/* Keeps the navigation legible where it crosses the photograph */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-surface/90 via-surface/45 to-transparent"
      />

      {/* 2. Copy -- held to the left half on desktop so it never sits on the picture */}
      <Container
        className={`relative z-10 flex flex-1 flex-col justify-end pb-8 pt-[34svh] sm:pb-10 sm:pt-[38svh] lg:justify-center lg:pb-12 lg:pt-28 ${
          hasRail ? 'lg:pb-16' : ''
        }`}
      >
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center lg:mx-0 lg:w-1/2 lg:max-w-none lg:items-start lg:pr-16 lg:text-left">
          <motion.h1
            {...rise(0)}
            className="font-display text-[clamp(1.75rem,2.4vw+0.9rem,3.1rem)] font-bold leading-[1.1] tracking-[0.012em] text-ink-heading text-balance"
          >
            {title}
            {accent && (
              <>
                {' '}
                <span className="gold-text-deep dark:gold-text font-cormorant text-[1.08em] font-semibold italic">
                  {accent}
                </span>
              </>
            )}
          </motion.h1>

          <motion.div {...rise(2)} aria-hidden className="mt-5 flex items-center gap-2">
            <span className="h-[2px] w-14 rounded-full bg-gradient-to-r from-gold-500 to-gold-700" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
            <span className="h-[2px] w-7 rounded-full bg-gradient-to-r from-gold-600 to-transparent" />
          </motion.div>

          {description && (
            <motion.p
              {...rise(3)}
              className="mt-5 max-w-xl font-sans text-[clamp(0.95rem,0.3vw+0.88rem,1.15rem)] leading-relaxed text-ink-soft"
            >
              {description}
            </motion.p>
          )}

          {actions && (
            <motion.div
              {...rise(4)}
              className="mt-7 flex w-full flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-3.5 max-w-xl lg:max-w-none"
            >
              {actions}
            </motion.div>
          )}
        </div>
      </Container>

      {/* 3. Photo credit */}
      {media.caption && (
        <div
          className={`pointer-events-none absolute z-10 hidden max-w-[calc(56%-4rem)] ${mode === 'video' ? 'right-20' : 'right-8'} items-center gap-2 rounded-full border border-white/15 bg-emerald-950/65 px-3.5 py-1.5 font-label text-2xs font-semibold uppercase tracking-[0.14em] text-ivory-500 backdrop-blur-md lg:flex xl:max-w-[calc(54%-4rem)] ${
            hasRail ? 'bottom-32' : 'bottom-8'
          }`}
        >
          <Camera className="h-3.5 w-3.5 shrink-0 text-gold-300" aria-hidden />
          <span className="truncate">{media.caption}</span>
        </div>
      )}

      {/* 4. Key figures */}
      {hasRail && (
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
          className="relative z-10 border-t border-gold-600/30 bg-surface-raised/95 backdrop-blur-xl"
        >
          <Container>
            <dl
              className={`grid divide-x divide-gold-600/25 ${
                stats!.length >= 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'
              }`}
            >
              {stats!.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-3 py-4 text-center sm:px-6 sm:py-5 lg:text-left ${i === 0 ? 'lg:pl-0' : ''} ${
                    stats!.length >= 4 && i >= 2 ? 'border-t border-gold-600/25 sm:border-t-0' : ''
                  }`}
                >
                  <dd className="font-heading text-[clamp(1.15rem,1.6vw+0.65rem,2rem)] font-semibold leading-none text-ink-heading tabular-nums">
                    {s.value}
                  </dd>
                  <dt className="mt-1.5 font-label text-3xs font-semibold uppercase leading-snug tracking-[0.13em] text-gold-800 dark:text-gold-300 sm:text-2xs">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Container>
        </motion.div>
      )}

      {/* 5. Controls */}
      {scrollTargetId && (
        <a
          href={`#${scrollTargetId}`}
          onClick={(e) => {
            const t = document.getElementById(scrollTargetId);
            if (t) {
              e.preventDefault();
              t.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Scroll to content"
          className={`absolute right-8 z-20 hidden flex-col items-center gap-2 font-label text-[0.62rem] font-bold uppercase tracking-[0.3em] text-ink-faint transition-colors hover:text-gold-700 dark:hover:text-gold-300 xl:flex ${
            hasRail ? 'bottom-44' : 'bottom-16'
          }`}
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-ink-faint/30">
            <span className="absolute inset-x-0 top-0 block h-full animate-scroll-cue bg-gold-500 motion-reduce:animate-none" />
          </span>
        </a>
      )}

      {mode === 'video' && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          className={`absolute right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ink-heading/25 bg-surface-raised/80 text-ink-heading backdrop-blur-md transition-colors hover:border-gold-500 hover:text-gold-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 sm:right-8 ${
            hasRail ? 'bottom-[7.5rem] sm:bottom-32' : 'bottom-6'
          }`}
        >
          {paused ? <Play className="ml-0.5 h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
        </button>
      )}
    </section>
  );
};
