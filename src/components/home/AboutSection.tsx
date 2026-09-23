import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: EASE_OUT },
  }),
};



export const AboutSection: React.FC = () => {
  return (
    <section id="about-intro" className="relative scroll-mt-20 overflow-hidden bg-surface pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 lg:pb-16">
      {/* Subtle background ambient warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,163,89,0.08),transparent)]"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Column 1: Intro */}
          <motion.div
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7 max-w-xl mx-auto lg:max-w-none"
          >
            <h2 className="mb-4 sm:mb-5 font-display text-[clamp(1.5rem,2.6vw+1rem,2.35rem)] font-bold leading-[1.18] tracking-[0.012em] text-ink-heading">
              A Global Advocate for{' '}
              <span className="gold-text-deep dark:gold-text italic font-cormorant">
                Inclusive Growth
              </span>
            </h2>
            <p className="font-sans text-[clamp(0.875rem,0.6vw+0.7rem,1.125rem)] leading-relaxed text-ink-soft">
              H.E. Zeenat Kureshi is a Trade Commissioner, investor, entrepreneur and global
              connector, committed to strengthening India-GCC relations through trade, investment,
              innovation and people-to-people partnerships.
            </p>
          </motion.div>

          {/* Column 2: Watermark pull-quote (Original Design) */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="relative px-2 py-4 text-center lg:col-span-5 lg:px-6 lg:py-6 flex flex-col items-center justify-center max-w-xl mx-auto lg:max-w-none border-t border-gold-600/20 pt-8 mt-2 lg:border-t-0 lg:pt-6 lg:mt-0"
          >
            {/* Elegant golden quotation mark icon */}
            <div
              aria-hidden
              className="mb-2 select-none font-heading text-4xl sm:text-5xl text-gold-600 dark:text-gold-400 leading-none opacity-85"
            >
              &#8221;
            </div>

            <blockquote className="relative z-10 mb-4 font-cormorant text-[clamp(1.45rem,2.2vw+0.9rem,2.15rem)] italic font-medium leading-[1.32] text-ink-heading max-w-md">
              &ldquo;Economic diplomacy is about people, possibilities and a shared future.&rdquo;
            </blockquote>

            <p className="mb-3 font-label text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.22em] text-gold-800 dark:text-gold-400">
              H.E. Zeenat Kureshi
            </p>
            <div className="h-[2px] w-12 bg-gold-500 rounded-full" />
          </motion.div>
        </div>

        {/* Read More Button: Centered in the middle across all screens */}
        <motion.div
          custom={3}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-6 sm:mt-8 flex justify-center items-center w-full"
        >
          <Link
            to="/about"
            className="group inline-flex h-12 sm:h-13 items-center justify-center gap-3 rounded-full border-2 border-gold-600/40 bg-surface-raised px-8 sm:px-9 font-label text-xs font-bold uppercase tracking-[0.16em] text-ink-heading shadow-[0_4px_16px_-4px_rgba(18,51,43,0.12),0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-600 hover:bg-surface hover:text-gold-900 hover:shadow-[0_10px_24px_-6px_rgba(18,51,43,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
          >
            <span>Read More</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};
