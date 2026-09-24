import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { eventPhotos } from '../../data/eventPhotos';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: EASE_OUT },
  }),
};

const portrait = eventPhotos.udcDiplomaticAward;

export const AboutSection: React.FC = () => {
  return (
    <section id="about-intro" className="relative scroll-mt-20 overflow-hidden bg-surface pt-14 sm:pt-16 lg:pt-24 pb-14 sm:pb-16 lg:pb-24">
      {/* Subtle background ambient warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,163,89,0.08),transparent)]"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Photograph: the diplomatic excellence recognition */}
          <motion.figure
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem] lg:col-span-5 lg:max-w-none"
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-gold-500/50 sm:translate-x-4 sm:translate-y-4"
            />
            <div className="grain group relative aspect-[4/5] overflow-hidden rounded-3xl border border-gold-600/30 bg-emerald-950 shadow-luxury-lg">
              <img
                src={portrait.src}
                alt={portrait.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: '70% 18%' }}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-950/90 via-emerald-950/35 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-6">
                <p className="font-label text-3xs font-bold uppercase tracking-[0.2em] text-gold-300 sm:text-2xs">
                  Diplomatic Excellence Honor
                </p>
                <p className="mt-1 font-heading text-sm font-semibold leading-snug text-white sm:text-base">
                  {portrait.event}
                </p>
              </figcaption>
            </div>
          </motion.figure>

          {/* Copy column */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <motion.div
              custom={1}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="max-w-xl lg:max-w-2xl"
            >
              <h2 className="mb-4 sm:mb-5 font-display text-[clamp(1.5rem,2.6vw+1rem,2.35rem)] font-bold leading-[1.18] tracking-[0.012em] text-ink-heading">
                A Global Advocate for{' '}
                <span className="gold-text-deep dark:gold-text italic font-cormorant">
                  Inclusive Growth
                </span>
              </h2>
              <p className="font-sans text-[clamp(0.95rem,0.5vw+0.8rem,1.125rem)] leading-relaxed text-ink-soft">
                H.E. Zeenat Kureshi is a Trade Commissioner, investor, entrepreneur and global
                connector, committed to strengthening India-GCC relations through trade, investment,
                innovation and people-to-people partnerships.
              </p>
            </motion.div>

            {/* Pull-quote */}
            <motion.div
              custom={2}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative mt-8 w-full max-w-xl border-t border-gold-600/20 pt-8 lg:mt-10 lg:max-w-2xl lg:border-l-2 lg:border-t-0 lg:border-gold-500/60 lg:pl-8 lg:pt-1"
            >
              <div
                aria-hidden
                className="mb-2 select-none font-cormorant text-5xl leading-none text-gold-600 opacity-85 dark:text-gold-400 lg:absolute lg:-left-4 lg:-top-7 lg:mb-0 lg:bg-surface lg:px-1 lg:text-6xl"
              >
                &#8220;
              </div>
              <blockquote className="relative z-10 mx-auto mb-4 max-w-md font-cormorant text-[clamp(1.45rem,2.2vw+0.9rem,2.15rem)] font-medium italic leading-[1.32] text-ink-heading lg:mx-0 lg:max-w-lg">
                &ldquo;Economic diplomacy is about people, possibilities and a shared future.&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-[2px] w-10 rounded-full bg-gold-500" />
                <p className="font-label text-3xs font-bold uppercase tracking-[0.22em] text-gold-800 dark:text-gold-400 sm:text-xs">
                  H.E. Zeenat Kureshi
                </p>
              </div>
            </motion.div>

            {/* Read More Button */}
            <motion.div
              custom={3}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-8 sm:mt-10 flex justify-center w-full"
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
          </div>
        </div>
      </Container>
    </section>
  );
};
