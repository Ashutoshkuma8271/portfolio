import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { aboutData } from '../../data/about';
import { MapPin, Building } from 'lucide-react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const TimelineSection: React.FC = () => {
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

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Vertical spine with gold gradient */}
          <div className="absolute bottom-0 left-4 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-gold-500 via-gold-400/80 to-emerald-900 lg:left-1/2" />

          <div className="space-y-10 lg:space-y-12">
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
                  {/* Glowing Node */}
                  <div className="absolute left-4 top-1.5 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gold-500 bg-surface-deep shadow-[0_0_12px_rgba(199,154,61,0.4)] lg:left-1/2">
                    <span className="h-2.5 w-2.5 rounded-full bg-gold-400" />
                  </div>

                  {/* Content card */}
                  <div className="ml-12 w-full lg:ml-0 lg:w-1/2 lg:px-8">
                    <div className="group relative rounded-2xl border border-gold-600/25 bg-surface-raised p-6 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[0_16px_32px_-8px_rgba(18,51,43,0.15)] sm:p-7">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 font-label text-2xs font-bold uppercase tracking-[0.18em] text-[#8A6920]">
                          {item.year}
                        </span>
                        <span className="rounded-full border border-emerald-900/15 bg-emerald-950/5 px-2.5 py-0.5 font-label text-2xs font-semibold text-ink-heading">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="mb-1.5 font-heading text-lg font-bold text-ink-heading transition-colors group-hover:text-gold-800 sm:text-xl">
                        {item.title}
                      </h3>

                      <div className="mb-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-ink-soft">
                        <span className="flex items-center gap-1 font-medium text-ink-heading">
                          <Building className="h-3.5 w-3.5 text-gold-600" />
                          {item.organization}
                        </span>
                        {item.location && (
                          <span className="flex items-center gap-1 text-ink-faint">
                            <MapPin className="h-3.5 w-3.5 text-gold-600" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      <p className="font-sans text-sm leading-relaxed text-ink-soft">
                        {item.description}
                      </p>

                      {/* Bottom gold accent hairline */}
                      <div className="mt-4 h-[2px] w-0 bg-gradient-to-r from-gold-500 to-transparent transition-all duration-300 group-hover:w-full" />
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
