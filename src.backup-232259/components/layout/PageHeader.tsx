import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, ShieldCheck } from 'lucide-react';
import { Container } from './Container';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export interface PageHeaderStat {
  label: string;
  value: string;
}

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  bgImage?: string;
  mediaImage?: string;
  mediaAlt?: string;
  mediaBadge?: string;
  videoYoutubeId?: string;
  onPlayVideo?: (youtubeId: string) => void;
  stats?: PageHeaderStat[];
  children?: React.ReactNode;
  actionButton?: React.ReactNode;
}

/**
 * Editorial Section Masthead matching the Home Page Hero style:
 * Elegant warm ivory canvas (#FAF6F0), dark emerald Cinzel typography,
 * gold hairline accents, and luxury framed visual media cards.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  bgImage,
  mediaImage,
  mediaAlt,
  mediaBadge = 'Verified Portfolio Record',
  videoYoutubeId,
  onPlayVideo,
  stats,
  children,
  actionButton,
}) => {
  const reduceMotion = useReducedMotion();

  const subtleFade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.05,
        ease: EASE_OUT,
      },
    }),
  };

  const displayMedia = mediaImage || bgImage;

  return (
    <div className="relative overflow-hidden bg-[#FAF6F0] text-charcoal-900 border-b border-ivory-800/90">
      
      {/* ══ 1. AMBIENT WARM GOLD GLOW & SUBTLE ARCHITECTURAL GRID ══ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(199,154,61,0.1),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(199,154,61,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(199,154,61,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ══ 2. HERO CONTENT AREA (MATCHING HOME HERO PROPORTIONS) ══ */}
      <header className="relative z-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-14 sm:pb-18 lg:pb-22">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* Left Content (7 or 8 cols depending on media presence) */}
            <div className={displayMedia ? "lg:col-span-7 max-w-3xl" : "lg:col-span-12 max-w-4xl"}>
              {/* Eyebrow Pill */}
              <motion.div custom={0} variants={subtleFade} initial="hidden" animate="show">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-500/40 bg-emerald-950 py-1.5 px-3.5 sm:px-4 shadow-xs mb-3.5 sm:mb-4">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
                  </span>
                  <span className="font-label text-[0.6rem] xs:text-[0.65rem] sm:text-2xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-gold-400">
                    {eyebrow}
                  </span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.div custom={1} variants={subtleFade} initial="hidden" animate="show">
                <h1 className="font-serif text-[clamp(1.75rem,3.4vw+0.4rem,3.25rem)] font-bold leading-[1.12] sm:leading-[1.15] tracking-tight text-emerald-950 mb-3 sm:mb-4 break-words">
                  {title}
                </h1>
              </motion.div>

              {/* Gold hairline accent line */}
              <motion.div
                custom={2}
                variants={subtleFade}
                initial="hidden"
                animate="show"
                className="mb-4 sm:mb-5 h-[2.5px] w-12 sm:w-14 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
              />

              {/* Description */}
              {description && (
                <motion.p
                  custom={3}
                  variants={subtleFade}
                  initial="hidden"
                  animate="show"
                  className="font-sans text-[clamp(0.875rem,0.85vw+0.5rem,1.0625rem)] leading-relaxed tracking-[0.005em] text-charcoal-700 max-w-2xl"
                >
                  {description}
                </motion.p>
              )}

              {/* Action Buttons */}
              {(actionButton || children) && (
                <motion.div
                  custom={4}
                  variants={subtleFade}
                  initial="hidden"
                  animate="show"
                  className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3"
                >
                  {actionButton}
                  {children}
                </motion.div>
              )}

              {/* 3-Column Credential Counters (Matching Home Page Hero layout) */}
              {stats && stats.length > 0 && (
                <motion.div
                  custom={5}
                  variants={subtleFade}
                  initial="hidden"
                  animate="show"
                  className="mt-6 xs:mt-7 sm:mt-8 grid grid-cols-3 gap-2 xs:gap-3 sm:gap-6 border-t border-gold-600/20 pt-4 sm:pt-5 max-w-[32rem]"
                >
                  {stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className={
                        idx > 0
                          ? 'border-l border-gold-600/20 pl-2.5 xs:pl-3 sm:pl-6 flex-1 text-left min-w-0'
                          : 'flex-1 text-left min-w-0'
                      }
                    >
                      <span className="font-serif text-[clamp(1.05rem,2.1vw+0.45rem,1.65rem)] font-bold leading-none text-emerald-950 tabular-nums block truncate">
                        {stat.value}
                      </span>
                      <div className="mt-1 font-label text-[0.56rem] xs:text-[0.62rem] sm:text-2xs font-semibold uppercase leading-snug tracking-[0.06em] xs:tracking-[0.1em] text-charcoal-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Visual / Video Showcase Card (5 cols) */}
            {displayMedia && (
              <motion.div
                custom={3}
                variants={subtleFade}
                initial="hidden"
                animate="show"
                className="lg:col-span-5 w-full flex justify-center lg:justify-end"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#081D17] to-[#04100D] p-3 border border-gold-600/40 shadow-[0_24px_56px_-12px_rgba(7,24,19,0.35),0_0_24px_rgba(199,154,61,0.15)] max-w-md w-full">
                  {/* Filigree Corner Accents */}
                  <div aria-hidden className="absolute top-4 right-4 h-5 w-5 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
                  <div aria-hidden className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />

                  {videoYoutubeId && onPlayVideo ? (
                    <button
                      type="button"
                      onClick={() => onPlayVideo(videoYoutubeId)}
                      className="group relative block w-full aspect-[16/11] overflow-hidden rounded-2xl bg-black cursor-pointer text-left"
                    >
                      <img
                        src={displayMedia}
                        alt={mediaAlt || title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25" />
                      
                      {/* Glowing Gold Play Medallion */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-400 bg-gradient-to-br from-gold-500 to-gold-700 text-emerald-950 shadow-[0_0_24px_rgba(199,154,61,0.7)] transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-6 w-6 fill-current ml-0.5" />
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="font-label text-2xs font-bold uppercase tracking-wider text-gold-400 block mb-0.5">
                          {mediaBadge}
                        </span>
                        <span className="font-serif text-sm font-bold truncate block text-white">
                          Watch Keynote Address
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="relative block w-full aspect-[16/11] overflow-hidden rounded-2xl bg-emerald-950">
                      <img
                        src={displayMedia}
                        alt={mediaAlt || title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04100D]/90 via-transparent to-black/20 pointer-events-none" />

                      <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-emerald-950/85 px-3 py-1 backdrop-blur-md">
                        <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                        <span className="font-label text-2xs font-bold uppercase tracking-[0.14em] text-gold-300">
                          {mediaBadge}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="font-serif text-base font-bold leading-tight text-white mb-0.5">
                          H.E. Zeenat Kureshi
                        </p>
                        <p className="font-label text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
                          Official Portfolio Record
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </div>
        </Container>
      </header>
    </div>
  );
};
