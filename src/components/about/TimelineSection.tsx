import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { aboutData } from '../../data/about';
import { OrgSeal } from '../ui/OrgSeal';
import { MapPinLogo } from '../ui/MapPinLogo';

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineProgressRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      if (spineProgressRef.current && containerRef.current) {
        gsap.fromTo(
          spineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 0.6,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section className="relative border-y border-hairline/90 bg-surface py-20 lg:py-28 overflow-hidden">
      {/* Background ambient gold gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(199,154,61,0.06),transparent)]"
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Chronology of Service"
          title="Milestones in Leadership & Trade Diplomacy"
          subtitle="A chronological record of high-level diplomatic appointments, cinema achievements, and civic reforms."
          center
        />

        <div ref={containerRef} className="relative mx-auto mt-16 max-w-4xl">
          {/* Vertical spine base track */}
          <div className="absolute bottom-0 left-3 sm:left-4 top-0 w-[2px] -translate-x-1/2 bg-gold-600/20 lg:left-1/2" />

          {/* GSAP ScrollTrigger Scrubbing Golden Spine */}
          <div
            ref={spineProgressRef}
            className="absolute bottom-0 left-3 sm:left-4 top-0 w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-gold-500 via-gold-400 to-emerald-700 shadow-[0_0_8px_rgba(212,175,55,0.6)] lg:left-1/2"
          />

          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {aboutData.timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.year + item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: idx * 0.08, ease: EASE_OUT }}
                  className={`relative flex flex-col items-start lg:flex-row ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Timeline Node */}
                  <div className="absolute left-3 sm:left-4 top-5 z-10 flex h-6 w-6 sm:h-7 sm:w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold-400 bg-emerald-950 shadow-[0_0_12px_rgba(199,154,61,0.45)] lg:left-1/2">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gold-300 shadow-sm" />
                  </div>

                  {/* Content card with responsive padding */}
                  <div className="w-full pl-7 sm:pl-11 lg:w-1/2 lg:pl-0 lg:px-8">
                    <div className="group relative rounded-2xl border border-gold-600/25 bg-surface-raised p-6 sm:p-7 text-center shadow-luxury transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-luxury-lg lg:text-left">
                      {/* Top Header Row: Period Badge & Category */}
                      <div className="mb-3.5 flex flex-wrap items-center justify-center gap-2 lg:justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/35 bg-gold-500/10 px-3 py-0.5 font-label text-3xs font-bold uppercase tracking-[0.16em] text-[#8A6920] dark:text-gold-300 shadow-2xs">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                          {item.year}
                        </span>
                        <span className="rounded-full border border-emerald-900/20 bg-emerald-950/80 px-2.5 py-0.5 font-label text-3xs font-bold uppercase tracking-wider text-gold-300 shadow-2xs">
                          {item.category}
                        </span>
                      </div>

                      {/* Role / Headline Title */}
                      <h3 className="mb-2.5 font-heading text-lg sm:text-xl font-bold text-ink-heading transition-colors group-hover:text-gold-700 leading-snug">
                        {item.title}
                      </h3>

                      {/* Organisation & location, one per line so neither wraps into the other */}
                      <div className="mb-4 flex justify-center lg:justify-start">
                        <div className="inline-flex items-center gap-3.5 text-left">
                          <OrgSeal name={item.organization} size="lg" />
                          <div className="min-w-0">
                            <p className="font-label text-xs font-semibold leading-snug text-ink-heading sm:text-[0.82rem]">
                              {item.organization}
                            </p>
                            {item.location && (
                              <p className="mt-1 flex items-center gap-1.5 text-xs leading-snug text-ink-soft">
                                <MapPinLogo className="h-3.5" />
                                <span>{item.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm leading-relaxed text-ink-soft/90">
                        {item.description}
                      </p>

                      {/* Bottom gold accent hairline */}
                      <div className="mx-auto mt-4 h-[1.5px] w-12 bg-gradient-to-r from-gold-500 to-transparent transition-all duration-500 group-hover:w-full lg:mx-0" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
