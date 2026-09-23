import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const [mode, setMode] = useState<BackdropMode>('photo');
  const [paused, setPaused] = useState(false);
  const media: SectionMedia = { ...sectionMedia[section], ...mediaOverride };

  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.12 + i * 0.09, ease: EASE_OUT },
  });

  const hasRail = Boolean(stats && stats.length);

  return (
    <section
      className="relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-surface text-ink lg:max-h-[1000px] lg:min-h-[88svh]"
      aria-label={`${eyebrow} banner`}
    >
      {/* 1. Photograph / looping video: right-hand side on desktop, clean responsive top on mobile */}
      <div className="grain banner-fade-left absolute left-0 right-0 top-0 -z-10 h-[50svh] sm:h-[52svh] lg:inset-y-0 lg:left-[25%] lg:h-auto overflow-hidden">
        <BackdropMedia media={media} paused={paused} onModeChange={setMode} priority />
      </div>

      {/* 2. Theme-following scrims: keeps text ultra-readable while keeping photos crisp & HD */}
      <div aria-hidden className="banner-scrim-x pointer-events-none absolute inset-0 -z-10 hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52svh] bg-gradient-to-b from-surface/20 via-surface/40 via-55% to-surface lg:hidden" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-surface/70 to-transparent"
      />

      {/* 3. Copy */}
      <Container
        className={`relative z-10 flex flex-1 flex-col justify-end pb-6 pt-[32svh] sm:pb-8 sm:pt-36 lg:justify-center lg:pb-10 lg:pt-28 ${
          hasRail ? 'lg:pb-14' : ''
        }`}
      >
        <div className="max-w-2xl text-center sm:text-left flex flex-col items-center sm:items-start mx-auto sm:mx-0 w-full">
          <motion.h1
            {...rise(0)}
            className="font-display text-[clamp(1.75rem,3.6vw+0.7rem,3.4rem)] font-bold leading-[1.1] tracking-[0.012em] text-ink-heading text-balance text-center sm:text-left"
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

          <motion.div {...rise(2)} aria-hidden className="mt-5 flex items-center gap-2 justify-center sm:justify-start">
            <span className="h-[2px] w-14 rounded-full bg-gradient-to-r from-gold-500 to-gold-700" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
            <span className="h-[2px] w-7 rounded-full bg-gradient-to-r from-gold-600 to-transparent" />
          </motion.div>

          {description && (
            <motion.p
              {...rise(3)}
              className="mt-5 max-w-xl font-sans text-[clamp(0.95rem,0.3vw+0.88rem,1.15rem)] leading-relaxed text-ink-soft text-center sm:text-left mx-auto sm:mx-0"
            >
              {description}
            </motion.p>
          )}

          {actions && (
            <motion.div {...rise(4)} className="mt-7 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
              {actions}
            </motion.div>
          )}
        </div>
      </Container>

      {/* 5. Photo credit */}
      {media.caption && (
        <div
          className={`pointer-events-none absolute right-8 z-10 hidden items-center gap-2 rounded-full border border-gold-600/30 bg-surface/75 px-3.5 py-1.5 font-label text-2xs font-semibold uppercase tracking-[0.14em] text-ink-soft backdrop-blur-md lg:flex ${
            hasRail ? 'bottom-32' : 'bottom-8'
          }`}
        >
          <Camera className="h-3.5 w-3.5 text-gold-600" aria-hidden />
          {media.caption}
        </div>
      )}

      {/* 6. Lower third: key figures on glass */}
      {hasRail && (
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
          className="relative z-10 border-t border-gold-600/30 bg-surface/80 backdrop-blur-xl"
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
                  className={`px-3 py-4 text-center sm:text-left sm:px-6 sm:py-5 ${i === 0 ? 'pl-2 sm:pl-0' : ''} ${
                    stats!.length >= 4 && i >= 2 ? 'border-t border-gold-600/25 sm:border-t-0' : ''
                  }`}
                >
                  <dd className="font-heading text-[clamp(1.15rem,1.6vw+0.65rem,2rem)] font-semibold leading-none text-ink-heading tabular-nums">
                    {s.value}
                  </dd>
                  <dt className="mt-1.5 font-label text-[0.66rem] font-semibold uppercase leading-snug tracking-[0.13em] text-gold-800 dark:text-gold-300 sm:text-2xs">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Container>
        </motion.div>
      )}

      {/* 7. Controls */}
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
