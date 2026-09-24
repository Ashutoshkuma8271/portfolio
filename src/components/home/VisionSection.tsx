import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { BannerButton } from '../banner/BannerButton';
import { BackdropMedia } from '../banner/BackdropMedia';
import { sectionMedia } from '../../data/sectionMedia';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 16 },
  bottom: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: EASE_OUT },
  }),
};

export const VisionSection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden border-t border-gold-600/30 bg-surface py-16 text-ink sm:py-24"
    >
      {/* Photograph / looping footage, under a deep emerald wash */}
      <div aria-hidden className="absolute inset-0">
        <BackdropMedia media={sectionMedia.about} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden banner-scrim-x lg:block"
      />
      {/* Below lg the copy spans the full width, so the photo becomes an even texture behind it */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-surface/[0.86] lg:hidden" />

      {/* Paper grain background */}
      <div aria-hidden className="hero-grain-dark pointer-events-none absolute inset-0 z-0" />

      {/* Globe wireframe motif - elegant dynamic floating backdrop */}
      <motion.div
        aria-hidden
        animate={{
          y: [-8, 8, -8],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -left-16 sm:-left-12 top-1/2 -translate-y-1/2 opacity-20 sm:opacity-30 lg:opacity-40"
      >
        <svg
          viewBox="0 0 200 200"
          className="h-[300px] w-[300px] text-gold-400/70 sm:h-[540px] sm:w-[540px]"
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
      </motion.div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12">
          {/* Left / center content */}
          <motion.div
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center lg:col-span-7 lg:pl-10 lg:text-left"
          >
            <span className="mb-2 block font-label text-2xs font-semibold uppercase tracking-[0.25em] text-gold-800 dark:text-gold-400 sm:text-xs">
              A Shared Vision
            </span>
            <h2 className="mb-4 font-display text-[clamp(1.65rem,3.2vw+0.9rem,3rem)] font-bold leading-tight text-ink-heading sm:mb-5">
              Prosperity{' '}
              <span className="gold-text-deep dark:gold-text font-cormorant italic font-semibold">
                Beyond Borders
              </span>
            </h2>
            <p className="mx-auto mb-6 max-w-xl font-sans text-[clamp(0.9rem,0.6vw+0.75rem,1.125rem)] leading-relaxed text-ink sm:mb-8 lg:mx-0">
              Together, we can unlock new opportunities, create lasting partnerships and build a
              future of inclusive and sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto">
              <BannerButton
                to="/contact#form"
                className="w-full sm:w-auto min-w-[200px] justify-center"
              >
                Let&apos;s Build Together
              </BannerButton>
              <BannerButton
                variant="secondary"
                className="w-full sm:w-auto min-w-[180px] justify-center"
                onClick={() => window.dispatchEvent(new CustomEvent('open-media-modal'))}
              >
                Media Enquiry
              </BannerButton>
            </div>
          </motion.div>

          {/* Right pull-quote */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="border-t border-hairline pt-6 text-center lg:col-span-5 lg:border-t-0 lg:pr-8 lg:pt-0 lg:text-right"
          >
            <blockquote className="mb-3 font-cormorant text-[clamp(1.5rem,2.8vw+0.8rem,2.6rem)] italic leading-tight text-ink-heading">
              &quot;Different countries.
              <br />
              A common future.&quot;
            </blockquote>
            <div className="mx-auto h-[2px] w-14 bg-gold-600 sm:w-16 lg:mr-0" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
