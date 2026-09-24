import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../layout/Container';
import { CountUp } from '../ui/CountUp';
import { BannerButton } from '../banner/BannerButton';
import { siteConfig } from '../../data/siteConfig';
import { heroSlides } from '../../data/eventPhotos';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** How long each photograph stays on screen. */
const SLIDE_MS = 5200;

interface CredentialProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

const Credential: React.FC<CredentialProps> = ({ value, suffix = '', label, delay }) => (
  <div className="min-w-0 text-center lg:text-left">
    <CountUp
      value={value}
      suffix={suffix}
      delay={delay}
      className="block font-heading text-[clamp(1.35rem,2.2vw+0.7rem,2.5rem)] font-semibold leading-none text-ink-heading tabular-nums"
      suffixClassName="text-gold-600"
    />
    <div className="mt-1.5 font-label text-3xs sm:text-2xs font-bold uppercase leading-tight sm:leading-snug tracking-[0.08em] sm:tracking-[0.12em] text-gold-800 dark:text-gold-300 break-words sm:break-normal">
      {label}
    </div>
  </div>
);

interface HeroSectionProps {
  onOpenCollaborateModal?: () => void;
  onOpenInvestmentModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCollaborateModal,
  onOpenInvestmentModal,
}) => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const playing = !reduceMotion && !hovering && inView && tabVisible;

  // Only advance while the hero is actually on screen and the tab is in front.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // `active` is in the deps so every slide gets a full, fresh interval --
  // including after a visitor clicks a dot.
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [playing, active]);

  const fire = useCallback(
    (cb: (() => void) | undefined, evt: string) => () => {
      if (cb) cb();
      else window.dispatchEvent(new CustomEvent(evt));
    },
    [],
  );

  // Parallax: the photographs drift slightly slower than the page. Transform-only, off for reduced motion.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '8%']);

  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay: 0.15 + i * 0.09, ease: EASE_OUT },
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-surface text-ink"
      aria-label="Introduction"
    >
      {/* ── Photographs: full-bleed cross-fading slideshow ── */}
      <div
        className="banner-photo-blend absolute left-0 right-0 top-0 -z-10 h-[40svh] sm:h-[44svh] overflow-hidden lg:inset-y-0 lg:left-[44%] xl:left-[46%] lg:h-auto"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <motion.div style={{ y: imageY, scale: 1.08 }} className="grain absolute inset-0 will-change-transform">
          {heroSlides.map((s, i) => {
            const isActive = i === active;
            return (
              <img
                key={s.id}
                src={s.src}
                alt={isActive ? s.alt : ''}
                aria-hidden={!isActive}
                decoding="async"
                loading="eager"
                style={{ objectPosition: s.focal, filter: 'contrast(1.05) saturate(1.08)' }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1000ms] ease-in-out ${
                  isActive ? 'z-[1] opacity-100' : 'opacity-0'
                }`}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Keeps the navigation legible where it crosses the photograph */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-surface/90 via-surface/45 to-transparent"
      />

      {/* ── Copy -- held to the left half on desktop so it never sits on the photographs ── */}
      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-8 pt-[36svh] sm:justify-center sm:pb-10 sm:pt-[42svh] lg:justify-center lg:pb-12 lg:pt-32">
        <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start mx-auto lg:mx-0 w-full lg:w-1/2 lg:max-w-none lg:pr-16">
          {/* Eyebrow: Factual Tenure & Mission */}
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-600/40 bg-surface-raised/85 px-3.5 py-1.5 backdrop-blur-md shadow-2xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
              </span>
              <span className="font-label text-3xs font-bold uppercase tracking-[0.18em] text-gold-800 dark:text-gold-300 sm:text-2xs sm:tracking-[0.22em]">
                Trade Commissioner since 2025
              </span>
            </span>
          </motion.div>

          {/* 1. Main Heading: Immediate, concise, authoritative */}
          <motion.h1 {...rise(1)} className="mt-4 sm:mt-5 text-center lg:text-left w-full">
            <span className="block font-display text-[clamp(2.2rem,4.4vw+0.8rem,4.2rem)] font-bold leading-[1.08] tracking-[-0.01em] text-ink-heading">
              H.E. Zeenat Kureshi
            </span>
          </motion.h1>

          {/* 2. Professional Role & Portfolio Line */}
          <motion.div {...rise(2)} className="mt-3.5 sm:mt-4 flex flex-col lg:flex-row items-center lg:items-start gap-2.5 lg:gap-3.5 w-full">
            <span
              aria-hidden
              className="hidden lg:block mt-1 h-9 w-[3px] shrink-0 rounded-full bg-gradient-to-b from-gold-400 to-gold-700"
            />
            <div className="text-center lg:text-left">
              <p className="font-heading text-[clamp(1.12rem,1.3vw+0.65rem,1.5rem)] font-semibold leading-snug text-gold-700 dark:text-gold-300">
                Trade Commissioner | India–GCC Relations
              </p>
              <p className="mt-1 font-label text-3xs font-bold uppercase tracking-[0.16em] text-ink-soft text-balance sm:text-2xs">
                Institutional Trade &bull; Cross-Border Investment &bull; Sovereign Diplomacy
              </p>
            </div>
          </motion.div>

          {/* 3. Supporting Description: Highly readable with generous spacing */}
          <motion.p
            {...rise(3)}
            className="mt-5 max-w-xl font-sans text-[clamp(0.95rem,0.3vw+0.88rem,1.12rem)] leading-relaxed text-ink-soft text-center lg:text-left mx-auto lg:mx-0 sm:mt-5.5"
          >
            Advancing strategic bilateral commerce, institutional investment corridors, and high-level economic diplomacy between India and the GCC nations.
          </motion.p>

          {/* 4. Action CTAs */}
          <motion.div
            {...rise(4)}
            className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto sm:mt-7"
          >
            <BannerButton
              className="w-full sm:w-[200px] justify-center"
              onClick={fire(onOpenInvestmentModal, 'open-investment-modal')}
            >
              Invest With Us
            </BannerButton>
            <BannerButton
              variant="secondary"
              className="w-full sm:w-[200px] justify-center"
              onClick={fire(onOpenCollaborateModal, 'open-collaborate-modal')}
            >
              Collaborate
            </BannerButton>
          </motion.div>
        </div>
      </Container>

      {/* ── Slide indicators (4 lines centered in middle) ────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3" role="group" aria-label="Hero photographs">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photograph ${i + 1} of ${heroSlides.length}`}
              aria-current={i === active}
              className="group flex h-9 w-12 items-center sm:w-16 cursor-pointer py-2.5 px-0.5 focus-visible:outline-none"
            >
              <span className="relative block h-[3.5px] w-full overflow-hidden rounded-full bg-ink-heading/20 transition-colors group-hover:bg-gold-500/40">
                <span
                  key={i === active ? `on-${active}` : `off-${i}`}
                  className={`absolute inset-0 origin-left rounded-full bg-gold-500 ${
                    i === active && playing ? 'animate-progress-fill' : ''
                  }`}
                  style={{
                    transform: i === active ? (playing ? undefined : 'scaleX(1)') : i < active ? 'scaleX(1)' : 'scaleX(0)',
                    ['--slide-ms' as string]: `${SLIDE_MS}ms`,
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lower third ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.8, ease: EASE_OUT }}
        className="relative z-10 border-t border-gold-600/30 bg-surface/80 backdrop-blur-xl"
      >
        <Container>
          <div className="grid grid-cols-3 items-center gap-3 py-4 sm:gap-8 sm:py-5 lg:grid-cols-[1fr_1fr_1fr_1.6fr]">
            <Credential value={50} suffix="+" label="International Engagements" delay={0.4} />
            <div className="border-l border-gold-600/25 pl-3 sm:pl-8">
              <Credential value={100} suffix="+" label="Business Delegations" delay={0.5} />
            </div>
            <div className="border-l border-gold-600/25 pl-3 sm:pl-8">
              <Credential value={siteConfig.collaborations.length} label="Sovereign Markets" delay={0.6} />
            </div>
            <div className="hidden border-l border-gold-600/25 pl-8 lg:block">
              <ul className="space-y-1.5 font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft">
                {siteConfig.heroValues.map((value) => (
                  <li key={value} className="flex items-center gap-2.5">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compact echo of the value list for phones/tablets, where the 4th
              column above is hidden for space -- keeps the message visible
              at every screen size instead of dropping it. */}
          <ul className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 border-t border-gold-600/20 pb-3.5 pt-3 font-label text-3xs font-bold uppercase tracking-[0.1em] text-ink-soft lg:hidden">
            {siteConfig.heroValues.map((value, i) => (
              <React.Fragment key={value}>
                {i > 0 && (
                  <li aria-hidden className="text-gold-600">
                    &middot;
                  </li>
                )}
                <li>{value}</li>
              </React.Fragment>
            ))}
          </ul>
        </Container>
      </motion.div>
    </section>
  );
};
