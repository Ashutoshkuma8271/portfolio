import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';

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
      className="relative overflow-hidden border-t border-gold-600/30 bg-[#071913] py-16 text-ivory-500 sm:py-24"
    >
      {/* Paper grain background */}
      <div aria-hidden className="hero-grain-dark pointer-events-none absolute inset-0 z-0" />

      {/* Globe wireframe motif - elegant static backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 opacity-30 sm:-left-12 lg:opacity-40"
      >
        <svg
          viewBox="0 0 200 200"
          className="h-[380px] w-[380px] text-gold-400/70 sm:h-[540px] sm:w-[540px]"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="100" cy="100" r="90" strokeWidth="0.6" strokeDasharray="1.5 3.5" />
          <circle cx="100" cy="100" r="75" strokeWidth="0.6" />
          <ellipse cx="100" cy="100" rx="90" ry="35" strokeWidth="0.6" transform="rotate(-20 100 100)" />
          <ellipse cx="100" cy="100" rx="90" ry="60" strokeWidth="0.6" transform="rotate(25 100 100)" />
          <ellipse cx="100" cy="100" rx="35" ry="90" strokeWidth="0.6" transform="rotate(15 100 100)" />
          <circle cx="100" cy="100" r="40" fill="url(#visionGlobeGlow)" stroke="none" opacity="0.55" />
          <defs>
            <radialGradient id="visionGlobeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4A359" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#071913" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12">
          {/* Left / center content */}
          <motion.div
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 lg:pl-10"
          >
            <span className="mb-2 block font-label text-2xs font-semibold uppercase tracking-[0.25em] text-gold-400 sm:text-xs">
              A Shared Vision
            </span>
            <h2 className="mb-4 font-serif text-[clamp(1.65rem,3.2vw+0.9rem,3rem)] font-bold leading-tight text-white sm:mb-5">
              Prosperity{' '}
              <span className="italic bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent">
                Beyond Borders
              </span>
            </h2>
            <p className="mb-6 max-w-xl font-sans text-[clamp(0.9rem,0.6vw+0.75rem,1.125rem)] leading-relaxed text-ivory-600 sm:mb-8">
              Together, we can unlock new opportunities, create lasting partnerships and build a
              future of inclusive and sustainable growth.
            </p>
            <Link
              to="/contact#form"
              className="group relative inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gold-500 px-7 font-label text-xs font-semibold uppercase tracking-[0.14em] text-[#0C221C] shadow-[0_4px_16px_-4px_rgba(212,163,89,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-[0_8px_24px_-4px_rgba(212,163,89,0.6)] active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
            >
              <span>Let&apos;s Build Together</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right pull-quote */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="border-t border-emerald-900/80 pt-4 text-left lg:col-span-5 lg:border-t-0 lg:pr-8 lg:pt-0 lg:text-right"
          >
            <blockquote className="mb-3 font-cormorant text-[clamp(1.5rem,2.8vw+0.8rem,2.6rem)] italic leading-tight text-white">
              &quot;Different countries.
              <br />
              A common future.&quot;
            </blockquote>
            <div className="h-[2px] w-14 bg-gold-600 sm:w-16 lg:ml-auto" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
