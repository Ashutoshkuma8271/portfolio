import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { CountUp } from '../ui/CountUp';
import { BannerButton } from '../banner/BannerButton';
import { siteConfig } from '../../data/siteConfig';
import { heroSlides } from '../../data/eventPhotos';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** How long each photograph stays on screen. */
const SLIDE_MS = 5200;

/** The five-step read a first-time visitor should get in a few seconds. */
const PATH = [
  { label: 'GCC–India Trade', to: '/trade-investment' },
  { label: 'Investment & Business', to: '/#invest' },
  { label: 'Entrepreneurship', to: '/about' },
  { label: 'Media & Film', to: '/media-press' },
];

interface CredentialProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

const Credential: React.FC<CredentialProps> = ({ value, suffix = '', label, delay }) => (
  <div className="min-w-0 text-center sm:text-left">
    <CountUp
      value={value}
      suffix={suffix}
      delay={delay}
      className="block font-heading text-[clamp(1.35rem,2.2vw+0.7rem,2.5rem)] font-semibold leading-none text-ink-heading tabular-nums"
      suffixClassName="text-gold-600"
    />
    <div className="mt-1.5 font-label text-[0.64rem] font-semibold uppercase leading-snug tracking-[0.12em] text-gold-800 dark:text-gold-300 sm:text-2xs">
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
      {/* ── Photographs: cross-fading slideshow (HD clear presentation) ── */}
      <div
        className="grain banner-fade-left absolute left-0 right-0 top-0 -z-10 h-[52svh] overflow-hidden lg:inset-y-0 lg:left-[22%] lg:h-auto"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
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
              style={{ objectPosition: s.focal }}
              className={`absolute inset-0 h-full w-full object-cover will-change-transform transition-opacity duration-[1000ms] ease-in-out ${
                isActive ? 'z-[1] opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}
      </div>

      {/* ── Theme-following scrims: keeps text ultra-readable while keeping photos crisp & HD ── */}
      <div aria-hidden className="banner-scrim-x pointer-events-none absolute inset-0 -z-10 hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52svh] bg-gradient-to-b from-surface/20 via-transparent via-50% to-surface lg:hidden" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-surface/70 to-transparent"
      />

      {/* ── Copy ─────────────────────────────────────────────────── */}
      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-6 pt-[36svh] sm:pb-8 sm:pt-36 lg:justify-center lg:pb-10 lg:pt-32">
        <div className="max-w-2xl text-center sm:text-left flex flex-col items-center sm:items-start mx-auto sm:mx-0 w-full">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-gold-600/40 bg-surface-raised/75 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
              </span>
              <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-800 dark:text-gold-300 sm:text-2xs sm:tracking-[0.24em]">
                Bridging Nations &middot; Building Opportunities
              </span>
            </span>
          </motion.div>

          <motion.h1 {...rise(1)} className="mt-4 sm:mt-5 text-center sm:text-left w-full">
            <span className="block font-display text-[clamp(1.9rem,4.2vw+0.6rem,3.9rem)] font-bold leading-[1.1] tracking-[0.012em] text-ink-heading">
              H.E. Zeenat
            </span>
            <span className="gold-text-deep dark:gold-text mt-0.5 block font-cormorant text-[clamp(2.6rem,5.6vw+0.6rem,5.2rem)] font-semibold italic leading-[1.05]">
              Kureshi
            </span>
          </motion.h1>

          <motion.div {...rise(2)} className="mt-4 flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-3.5 sm:mt-5 w-full">
            <span
              aria-hidden
              className="hidden sm:block mt-1 h-full min-h-[3.2rem] w-[3px] shrink-0 rounded-full bg-gradient-to-b from-gold-400 to-gold-700"
            />
            <div className="text-center sm:text-left">
              <p className="font-heading text-[clamp(1.1rem,1.2vw+0.7rem,1.5rem)] font-semibold leading-snug text-ink-heading">
                GCC–India Trade Commissioner
              </p>
              <p className="mt-1.5 font-label text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-800 dark:text-gold-300 sm:text-2xs sm:tracking-[0.2em]">
                Investor &bull; Entrepreneur &bull; Film Producer
              </p>
            </div>
          </motion.div>

          <motion.p
            {...rise(3)}
            className="mt-5 max-w-xl font-sans text-[clamp(1rem,0.4vw+0.92rem,1.18rem)] leading-relaxed text-ink text-center sm:text-left mx-auto sm:mx-0 sm:mt-6"
          >
            Building commercial bridges between India and the GCC through trade, investment and
            strategic partnerships.
          </motion.p>

          <motion.div
            {...rise(4)}
            className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto sm:mt-7"
          >
            <BannerButton
              className="w-full sm:w-[195px] justify-center"
              onClick={fire(onOpenInvestmentModal, 'open-investment-modal')}
            >
              Invest With Us
            </BannerButton>
            <BannerButton
              variant="secondary"
              className="w-full sm:w-[195px] justify-center"
              onClick={fire(onOpenCollaborateModal, 'open-collaborate-modal')}
            >
              Collaborate
            </BannerButton>
          </motion.div>

          {/* The five-step read: person → trade → investment → entrepreneurship → media */}
          <motion.nav
            {...rise(5)}
            aria-label="What she does"
            className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-x-1.5 gap-y-2 w-full"
          >
            {PATH.map((step, i) => (
              <React.Fragment key={step.label}>
                {i > 0 && <ArrowRight className="h-3 w-3 text-gold-600 shrink-0" aria-hidden />}
                <Link
                  to={step.to}
                  className="whitespace-nowrap rounded-full border border-gold-600/30 bg-surface-raised/70 px-2.5 py-1.5 font-label text-[0.62rem] font-bold uppercase tracking-[0.1em] text-ink-heading backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-800 dark:hover:text-gold-300"
                >
                  {step.label}
                </Link>
              </React.Fragment>
            ))}
          </motion.nav>
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
              className="group flex h-7 w-11 items-center sm:w-16 cursor-pointer py-2 focus-visible:outline-none"
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
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft">
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
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
};
