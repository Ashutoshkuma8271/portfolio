import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { CountUp } from '../ui/CountUp';
import { mediaData } from '../../data/media';
import { youtubeThumb, handleThumbError } from '../../utils/youtube';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface MediaPressHeroProps {
  /** Hands the featured video up to the page, which owns the player modal. */
  onPlay: (youtubeId: string) => void;
}

/**
 * The Media & Press masthead. Where the shared PageHeader is a calm, uniform
 * chapter-opener, this page earns a bespoke one: a press room should look like
 * a press room the moment it loads. So the top of the page *is* the evidence --
 * a live broadcast still, the real publication names, and counts read straight
 * off the data rather than typed in.
 *
 * Every number and logo here is derived, never hardcoded: add an article to
 * media.ts and the counter and the marquee both move on their own.
 */
export const MediaPressHero: React.FC<MediaPressHeroProps> = ({ onPlay }) => {
  const featured = mediaData.videos[0];

  const metrics = [
    { value: mediaData.articles.length, label: 'Press Features' },
    { value: mediaData.videos.length, label: 'Broadcast Dialogues' },
    { value: mediaData.speakingEngagements.length, label: 'Global Stages' },
  ];

  // De-duplicated so a publication that ran two stories still appears once.
  const publications = Array.from(
    new Set(mediaData.articles.map((a) => a.publication)),
  );

  return (
    <header className="relative isolate overflow-hidden bg-[#FAF6F0] border-b border-gold-600/20 pt-24 sm:pt-28 md:pt-32 lg:pt-36">
      {/* Hairline architectural grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(199,154,61,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(199,154,61,0.04) 1px, transparent 1px)',
          backgroundSize: 'clamp(60px, 7vw, 100px) clamp(60px, 7vw, 100px)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 80%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-gold-600/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-emerald-700/10 blur-3xl"
      />

      <Container className="relative z-10 pb-12 sm:pb-14 lg:pb-16">
        <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-14">

          {/* ---------- Left: editorial masthead ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="lg:col-span-7"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-600/35 bg-white/95 py-1.5 px-3.5 shadow-[0_2px_12px_-4px_rgba(18,51,43,0.12)] backdrop-blur-md">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-600" />
              </span>
              <span className="font-label text-[0.65rem] sm:text-2xs font-bold uppercase tracking-[0.18em] text-[#8A6920]">
                {mediaData.hero.eyebrow}
              </span>
            </div>

            <h1 className="mb-4 font-serif text-[clamp(2rem,4vw+0.5rem,3.25rem)] font-bold leading-[1.12] tracking-tight text-emerald-950">
              Media Coverage, Keynotes &{' '}
              <span className="font-cormorant italic font-semibold bg-gradient-to-r from-[#9C701B] via-[#C79A3D] to-[#8A6920] bg-clip-text text-transparent">
                Global Press
              </span>
            </h1>

            <div className="mb-5 h-[2.5px] w-16 bg-gradient-to-r from-gold-500 via-gold-600 to-transparent rounded-full" />

            <p className="max-w-2xl font-sans text-[clamp(0.92rem,0.9vw+0.6rem,1.1rem)] leading-relaxed text-charcoal-700">
              {mediaData.hero.description}
            </p>

            {/* Counters -- styled in luxury card frames */}
            <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 border-t border-gold-600/20 pt-6">
              {metrics.map((m, idx) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + idx * 0.1, ease: EASE_OUT }}
                  className="rounded-2xl border border-gold-600/30 bg-white/90 p-3.5 sm:p-4 shadow-xs backdrop-blur-xs"
                >
                  <dd className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-none text-emerald-950 tabular-nums">
                    <CountUp
                      value={m.value}
                      delay={0.35 + idx * 0.1}
                      suffix="+"
                      suffixClassName="text-gold-600"
                    />
                  </dd>
                  <dt className="mt-1.5 font-label text-[0.62rem] sm:text-2xs font-semibold uppercase tracking-[0.14em] text-gold-800">
                    {m.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          {/* ---------- Right: live featured broadcast ---------- */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE_OUT }}
              className="lg:col-span-5"
            >
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold-500/45 bg-[#081D17] p-2 sm:p-2.5 shadow-[0_16px_40px_-10px_rgba(7,24,19,0.35),0_0_20px_rgba(199,154,61,0.15)] transition-all duration-300 hover:border-gold-400">
                {/* Gold corner filigree */}
                <div
                  aria-hidden
                  className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-gold-400/60 pointer-events-none z-20"
                />
                <div
                  aria-hidden
                  className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-gold-400/60 pointer-events-none z-20"
                />

                <button
                  type="button"
                  onClick={() => onPlay(featured.youtubeId)}
                  aria-label={`Play: ${featured.title}`}
                  className="group/btn relative block w-full overflow-hidden rounded-[12px] sm:rounded-[20px] bg-emerald-950 text-left cursor-pointer"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={youtubeThumb(featured.youtubeId)}
                      onError={(e) => handleThumbError(e, featured.youtubeId)}
                      alt=""
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover/btn:scale-105 group-hover/btn:opacity-100"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#081D17] via-[#081D17]/40 to-transparent" />

                  {/* Play affordance */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-15 w-15 sm:h-17 sm:w-17 items-center justify-center rounded-full border-2 border-gold-400 bg-gradient-to-br from-gold-500 to-gold-700 text-emerald-950 shadow-[0_8px_24px_rgba(199,154,61,0.5)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_32px_rgba(212,175,55,0.8)]">
                      <Play className="ml-1 h-6 w-6 fill-current" />
                    </span>
                  </div>

                  {/* Top Live Badge */}
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-emerald-950/85 px-3 py-1 text-ivory-500 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-600" />
                    </span>
                    <span className="font-label text-[0.62rem] sm:text-2xs font-bold uppercase tracking-[0.14em] text-gold-300">
                      Featured Keynote Broadcast
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="mb-1 font-label text-[0.65rem] sm:text-2xs font-semibold uppercase tracking-[0.16em] text-gold-400">
                      {featured.channel}
                    </p>
                    <h2 className="line-clamp-2 font-serif text-sm sm:text-base lg:text-lg font-bold leading-snug text-white">
                      {featured.title}
                    </h2>
                  </div>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between px-1 font-label text-xs text-charcoal-600">
                <span className="uppercase tracking-[0.14em] font-semibold">{featured.topic}</span>
                <span className="inline-flex items-center gap-1 font-bold text-gold-700">
                  {featured.duration} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </Container>

      {/* ---------- "As featured in" ticker ---------- */}
      <div className="relative z-10 border-t border-gold-600/20 bg-white/80 py-4.5 backdrop-blur-sm shadow-xs">
        <div className="flex items-center gap-5">
          <span className="shrink-0 pl-4 font-label text-2xs font-bold uppercase tracking-[0.22em] text-[#8A6920] sm:pl-6 lg:pl-8">
            Verified Press Coverage
          </span>

          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 85%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 5%, #000 85%, transparent)',
            }}
          >
            {/* Two identical runs; the -50% shift makes the loop seamless. */}
            <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
              {[0, 1].map((run) => (
                <div key={run} className="flex items-center" aria-hidden={run === 1}>
                  {publications.map((pub) => (
                    <span key={pub} className="flex items-center whitespace-nowrap">
                      <span className="font-serif text-sm sm:text-base font-bold text-emerald-950">
                        {pub}
                      </span>
                      <span className="mx-5 sm:mx-7 h-1.5 w-1.5 rotate-45 bg-gold-600" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
