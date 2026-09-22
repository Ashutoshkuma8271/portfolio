import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { CountUp } from '../ui/CountUp';
import { siteConfig } from '../../data/siteConfig';

import heroLgAvif from '../../assets/images/hero/hero-commissioner-lg.avif';
import heroLgWebp from '../../assets/images/hero/hero-commissioner-lg.webp';
import heroLgJpg from '../../assets/images/hero/hero-commissioner-lg.jpg';
import heroSmAvif from '../../assets/images/hero/hero-commissioner-sm.avif';
import heroSmWebp from '../../assets/images/hero/hero-commissioner-sm.webp';
import heroSmJpg from '../../assets/images/hero/hero-commissioner-sm.jpg';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const HERO_ALT =
  'H.E. Zeenat Kureshi at her desk in Dubai, the Burj Khalifa skyline behind her and the Indian and UAE flags alongside';

interface CredentialProps {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

const Credential: React.FC<CredentialProps> = ({ value, suffix = '', label, delay }) => (
  <div className="flex-1 text-left">
    <CountUp
      value={value}
      suffix={suffix}
      delay={delay}
      className="font-serif text-[clamp(1.15rem,2.4vw+0.5rem,1.875rem)] font-bold leading-none text-emerald-950 tabular-nums"
      suffixClassName="text-gold-600"
    />
    <div className="mt-1 font-label text-[0.58rem] xs:text-[0.62rem] sm:text-2xs font-semibold uppercase leading-snug tracking-[0.1em] xs:tracking-[0.12em] text-charcoal-600">
      {label}
    </div>
  </div>
);

interface HeroSectionProps {
  onOpenInvestmentModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInvestmentModal }) => {
  const reduceMotion = useReducedMotion();

  /* Entrance animations */
  const subtleFade = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 12,
    },
    show: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: custom * 0.05,
        ease: EASE_OUT,
      },
    }),
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FAF6F0] pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-10 xs:pb-14 sm:pb-16 md:pb-20 min-h-[90svh] flex flex-col justify-start lg:justify-center">
      {/* ══ PHOTOGRAPH BANNER: Full-Bleed Hero Banner for Large Laptops & Desktops ══════ */}
      <div
        aria-hidden={false}
        className="hidden lg:block absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden"
      >
        <picture className="h-full w-full">
          <source srcSet={heroLgAvif} type="image/avif" />
          <source srcSet={heroLgWebp} type="image/webp" />
          <source srcSet={heroLgJpg} type="image/jpeg" />
          <img
            src={heroLgJpg}
            alt={HERO_ALT}
            loading="eager"
            {...{ fetchpriority: 'high' }}
            decoding="async"
            className="h-full w-full object-cover object-[62%_center]"
          />
        </picture>
      </div>

      {/* ══ DIRECTIONAL READABILITY GRADIENT (DESKTOP) ═══════════════ */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 hidden lg:block pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(250,246,240,0.98) 0%, rgba(250,246,240,0.92) 32%, rgba(250,246,240,0.30) 52%, transparent 66%)',
        }}
      />

      {/* ══ BOTTOM VERTICAL GRADIENT FADE ═════════════════════════════ */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 sm:h-36 lg:h-44 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to top, #FAF6F0 0%, rgba(250,246,240,0.85) 40%, rgba(250,246,240,0.2) 75%, transparent 100%)',
        }}
      />

      {/* ══ MAIN HERO CONTENT ══════════════════════════════════════ */}
      <div className="relative z-20 w-full">
        <Container>
          <div className="max-w-2xl flex flex-col justify-center">
            {/* 1. EYEBROW BADGE */}
            <motion.div custom={0} variants={subtleFade} initial="hidden" animate="show">
              <div className="inline-flex items-center gap-1.5 xs:gap-2 rounded-full border border-gold-600/35 bg-white/95 py-1.5 px-3 xs:px-3.5 shadow-[0_2px_12px_-4px_rgba(18,51,43,0.12)] backdrop-blur-md">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-600" />
                </span>
                <span className="font-label text-[0.62rem] xs:text-2xs font-bold uppercase tracking-[0.14em] xs:tracking-[0.2em] text-[#8A6920]">
                  Bridging Nations &middot; Building Opportunities
                </span>
              </div>
            </motion.div>

            {/* 2. PRIMARY HEADING (NAMEPLATE) */}
            <motion.h1
              custom={1}
              variants={subtleFade}
              initial="hidden"
              animate="show"
              className="mt-3 sm:mt-4 mb-2 sm:mb-2.5"
            >
              <span className="block font-serif text-[clamp(2.1rem,5.2vw+0.5rem,3.75rem)] font-bold leading-[1.05] tracking-tight text-emerald-950">
                H.E. Zeenat
              </span>
              <span className="block font-cormorant italic text-[clamp(2rem,4.8vw+0.4rem,3.45rem)] font-semibold tracking-normal leading-[1.08] mt-0.5 bg-gradient-to-r from-[#9C701B] via-[#C79A3D] to-[#8A6920] bg-clip-text text-transparent">
                Kureshi
              </span>
            </motion.h1>

            {/* 3. DIPLOMATIC ROLE & POSITIONING LINE */}
            <motion.div
              custom={2}
              variants={subtleFade}
              initial="hidden"
              animate="show"
              className="mt-1.5 flex items-start gap-3 sm:gap-3.5"
            >
              <span className="mt-1 h-8 sm:h-10 w-[2.5px] shrink-0 bg-gradient-to-b from-gold-500 to-gold-700 rounded-full" />
              <div>
                <p className="font-serif text-[clamp(0.95rem,1.3vw+0.5rem,1.24rem)] font-bold tracking-tight text-emerald-950 leading-snug">
                  Film Producer <span className="text-gold-600 font-normal">|</span> GCC–India Trade Commissioner <span className="text-gold-600 font-normal">|</span> National President
                </p>
                <p className="mt-1 font-label text-[0.62rem] xs:text-2xs font-bold uppercase tracking-[0.16em] text-gold-800">
                  Investor &middot; Entrepreneur &middot; Global Connector
                </p>
              </div>
            </motion.div>

            {/* ══ MOBILE & TABLET EXECUTIVE HERO BANNER ══
                Displays the complete, original panoramic image (Burj Khalifa, Zeenat, bilateral flags & desk)
                in its natural 3:2 proportion, dynamically adjusting size to fit all screen sizes with pristine clarity */}
            <motion.div
              custom={2.5}
              variants={subtleFade}
              initial="hidden"
              animate="show"
              className="lg:hidden my-3.5 xs:my-4 sm:my-5.5 w-full"
            >
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold-500/45 bg-white/90 p-1.5 sm:p-2 shadow-[0_14px_36px_-8px_rgba(18,51,43,0.14)] backdrop-blur-xs">
                <div className="relative overflow-hidden rounded-[12px] sm:rounded-[20px] bg-slate-100">
                  <picture className="w-full h-auto block">
                    <source media="(max-width: 640px)" srcSet={heroSmAvif} type="image/avif" />
                    <source media="(max-width: 640px)" srcSet={heroSmWebp} type="image/webp" />
                    <source media="(max-width: 640px)" srcSet={heroSmJpg} type="image/jpeg" />
                    <source srcSet={heroLgAvif} type="image/avif" />
                    <source srcSet={heroLgWebp} type="image/webp" />
                    <source srcSet={heroLgJpg} type="image/jpeg" />
                    <img
                      src={heroLgJpg}
                      alt={HERO_ALT}
                      loading="eager"
                      {...{ fetchpriority: 'high' }}
                      decoding="async"
                      className="w-full h-auto aspect-[1538/1023] object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                    />
                  </picture>
                </div>
              </div>
            </motion.div>

            {/* 4. SUPPORTING INTRO PARAGRAPH */}
            <motion.p
              custom={3}
              variants={subtleFade}
              initial="hidden"
              animate="show"
              className="mt-2.5 sm:mt-3.5 max-w-[34rem] font-sans text-[clamp(0.875rem,0.95vw+0.55rem,1.05rem)] leading-relaxed tracking-[0.005em] text-charcoal-700/95"
            >
              Advancing India&ndash;GCC trade, bilateral investment and strategic economic
              partnerships &mdash; engineered for sustainable, inclusive growth. Championing cultural storytelling, cinematic co-productions, and nationwide women empowerment across global corridors.
            </motion.p>

            {/* 5. ACTION BUTTONS: Collaborate, Investment Discussion, Media Inquiry */}
            <motion.div
              custom={4}
              variants={subtleFade}
              initial="hidden"
              animate="show"
              className="mt-5 sm:mt-6 pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3 w-full"
            >
              {/* Button 1: Collaborate */}
              <Link
                to="/contact#form"
                className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950 via-[#0C221C] to-emerald-950 px-5 sm:px-6 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.12em] text-ivory-500 border border-gold-500/50 shadow-[0_4px_18px_-4px_rgba(7,21,17,0.4)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(7,21,17,0.55),0_0_12px_rgba(199,154,61,0.35)] hover:border-gold-400 active:translate-y-0 active:scale-[0.98]"
              >
                <span className="relative z-10">Collaborate</span>
                <span className="relative z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </span>
              </Link>

              {/* Button 2: Investment Discussion */}
              {onOpenInvestmentModal ? (
                <button
                  type="button"
                  onClick={onOpenInvestmentModal}
                  className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full border border-gold-600/40 bg-white px-4.5 sm:px-5 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.11em] text-emerald-950 shadow-[0_4px_16px_-4px_rgba(18,51,43,0.1)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold-600 hover:bg-[#FAF6F0] hover:text-gold-900 hover:shadow-[0_8px_22px_-4px_rgba(18,51,43,0.18)] active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-600 transition-transform duration-300 group-hover:scale-125" />
                  <span>Investment Discussion</span>
                </button>
              ) : (
                <Link
                  to="/trade-investment#inquiry"
                  className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full border border-gold-600/40 bg-white px-4.5 sm:px-5 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.11em] text-emerald-950 shadow-[0_4px_16px_-4px_rgba(18,51,43,0.1)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold-600 hover:bg-[#FAF6F0] hover:text-gold-900 hover:shadow-[0_8px_22px_-4px_rgba(18,51,43,0.18)] active:translate-y-0 active:scale-[0.98]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-600 transition-transform duration-300 group-hover:scale-125" />
                  <span>Investment Discussion</span>
                </Link>
              )}

              {/* Button 3: Media Inquiry */}
              <Link
                to="/media-press#inquiry"
                className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full border border-gold-600/40 bg-white px-4.5 sm:px-5 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.11em] text-emerald-950 shadow-[0_4px_16px_-4px_rgba(18,51,43,0.1)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold-600 hover:bg-[#FAF6F0] hover:text-gold-900 hover:shadow-[0_8px_22px_-4px_rgba(18,51,43,0.18)] active:translate-y-0 active:scale-[0.98]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-600 transition-transform duration-300 group-hover:scale-125" />
                <span>Media Inquiry</span>
              </Link>
            </motion.div>

            {/* 6. CREDENTIAL COUNTERS: Responsive 3-column stats */}
            <motion.div
              custom={5}
              variants={subtleFade}
              initial="hidden"
              animate="show"
              className="mt-5 xs:mt-6 sm:mt-7 grid grid-cols-3 gap-2.5 xs:gap-3 sm:gap-6 border-t border-gold-600/20 pt-3.5 xs:pt-4 sm:pt-5 max-w-[32rem]"
            >
              <Credential value={50} suffix="+" label="International Engagements" delay={0.1} />
              <div className="border-l border-gold-600/20 pl-3 sm:pl-6">
                <Credential value={100} suffix="+" label="Business Delegations" delay={0.15} />
              </div>
              <div className="border-l border-gold-600/20 pl-3 sm:pl-6">
                <Credential
                  value={siteConfig.collaborations.length}
                  label="Sovereign Markets"
                  delay={0.2}
                />
              </div>
            </motion.div>

            {/* 7. STRATEGIC VALUES RAIL */}
            <motion.div
              custom={6}
              variants={subtleFade}
              initial="hidden"
              animate="show"
              className="mt-4 sm:mt-5 max-w-[32rem] border-t border-gold-600/15 pt-3"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-label text-2xs font-bold uppercase tracking-[0.16em] text-charcoal-600">
                {siteConfig.heroValues.map((value, index) => (
                  <React.Fragment key={value}>
                    {index > 0 && <span className="text-gold-600/70 text-xs">&middot;</span>}
                    <span className="transition-colors hover:text-emerald-950">{value}</span>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* ══ HERO → NEXT SECTION CONTOURED ARCHITECTURAL TRANSITION ══ */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 z-20 pointer-events-none overflow-hidden leading-none select-none"
      >
        <svg
          viewBox="0 0 1440 28"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-3 sm:h-5 lg:h-7 text-[#FAF6F0]"
        >
          <path
            d="M0,0 C480,18 960,18 1440,0 L1440,28 L0,28 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
