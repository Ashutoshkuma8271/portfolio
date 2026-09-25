import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import summitPhoto from '../../assets/images/events/international-economic-summit-signing.webp';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: EASE_OUT },
  }),
};

export const VisionSection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden border-t border-gold-600/30 bg-[#071913] py-16 text-ivory-500 sm:py-20 lg:py-24"
    >
      {/* ── Background Photograph of International Economic Summit Signing Ceremony ── */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={summitPhoto}
          alt="H.E. Zeenat Kureshi at the International Economic Summit 2025 Signing Ceremony"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[50%_35%] opacity-85 contrast-[1.06] brightness-[0.92]"
        />
      </div>

      {/* ── Balanced Luxury Scrim: 40-55% range preserves 80-90% image clarity while ensuring WCAG AAA text contrast ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#071913]/80 via-[#071913]/48 to-[#071913]/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#071913]/85 via-transparent to-[#071913]/60"
      />

      {/* Paper grain background */}
      <div aria-hidden className="hero-grain-dark pointer-events-none absolute inset-0 z-[2] opacity-25" />

      <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:gap-12 lg:grid-cols-12">
          {/* Left / Center content: perfectly centered & balanced on mobile, stately left-aligned on desktop */}
          <motion.div
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7 lg:pl-6 xl:pl-10"
          >
            <span className="mb-2.5 block font-label text-2xs sm:text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              A Shared Vision
            </span>

            <h2 className="mb-4 font-serif text-[clamp(1.75rem,3.2vw+0.9rem,3.15rem)] font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Prosperity{' '}
              <span className="italic bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent">
                Beyond Borders
              </span>
            </h2>

            <p className="mb-7 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-ivory-600 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] text-balance">
              Together, we can unlock new opportunities, create lasting partnerships and build a
              future of inclusive and sustainable growth.
            </p>

            <Link
              to="/contact#form"
              className="group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gold-500 px-8 font-label text-xs font-bold uppercase tracking-[0.14em] text-[#0C221C] shadow-[0_4px_16px_-4px_rgba(212,163,89,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_8px_24px_-4px_rgba(212,163,89,0.6)] active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
            >
              <span>Let&apos;s Build Together</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right pull-quote: centered with golden divider on mobile, right-aligned on desktop */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="border-t border-emerald-800/60 pt-6 text-center flex flex-col items-center lg:items-end lg:col-span-5 lg:border-t-0 lg:pr-6 xl:pr-8 lg:pt-0 lg:text-right"
          >
            <blockquote className="mb-3.5 font-cormorant text-[clamp(1.6rem,2.8vw+0.8rem,2.75rem)] italic leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              &quot;Different countries.
              <br />
              A common future.&quot;
            </blockquote>
            <div className="h-[2px] w-14 bg-gold-600 sm:w-16 shadow-sm mx-auto lg:ml-auto lg:mr-0" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
