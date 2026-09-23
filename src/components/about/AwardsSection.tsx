import React from 'react';
import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { aboutData } from '../../data/about';
import { eventPhotos } from '../../data/eventPhotos';

import awardDiplomacyTrade from '../../assets/images/awards/award-diplomacy-trade.jpg';
import awardLeadership from '../../assets/images/awards/award-leadership.jpg';
import awardCinema from '../../assets/images/awards/award-cinema.jpg';
import awardTrade from '../../assets/images/awards/award-trade.jpg';
import awardPhilanthropy from '../../assets/images/awards/award-philanthropy.jpg';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const AWARD_EMBLEMS: Record<string, string> = {
  'Diplomacy & Trade': awardDiplomacyTrade,
  'Leadership': awardLeadership,
  'Cinema': awardCinema,
  'Trade': awardTrade,
  'Philanthropy': awardPhilanthropy,
};

export const AwardsSection: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-20 lg:py-28">
      {/* Background ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(199,154,61,0.08),transparent)]"
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Honors & Recognitions"
          title="Distinguished Honors and National Citations"
          subtitle="Conferred by sovereign trade conclaves, ministerial forums, and international cultural institutions."
          center
        />

        {/* Featured Citation Spotlight: Cultural Cinema & Film Producer Honor with Dia Mirza */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mt-12 overflow-hidden rounded-3xl border-2 border-gold-500/40 bg-gradient-to-br from-[#0B251F] via-[#071914] to-[#040E0C] text-white shadow-luxury-lg"
        >
          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            {/* Photo Column */}
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] lg:col-span-5 overflow-hidden bg-emerald-950">
              <img
                src={eventPhotos.cinemaAwards.src}
                alt={eventPhotos.cinemaAwards.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: eventPhotos.cinemaAwards.focal }}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B251F] via-transparent to-transparent lg:hidden" />
            </div>

            {/* Content Column */}
            <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-center items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/15 px-3.5 py-1 text-2xs font-label font-bold uppercase tracking-[0.2em] text-gold-300 mb-4 w-fit">
                <Medal className="h-3.5 w-3.5 text-gold-400" />
                <span>Featured Cultural Honor</span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3">
                Cultural Cinema &amp; Film Producer Conclave Citation
              </h3>

              <p className="font-sans text-sm sm:text-base leading-relaxed text-ivory-600 mb-6 max-w-xl mx-auto">
                Conferred alongside Bollywood luminary Dia Mirza, honoring distinguished leadership in cultural cinema, international film syndication, and global storytelling.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-gold-500/20 text-xs font-label w-full max-w-md">
                <div className="flex items-center gap-1.5 text-gold-300">
                  <Medal className="h-4 w-4 text-gold-400" />
                  <span className="font-semibold uppercase tracking-wider">Honorary Citation</span>
                </div>
                <span className="text-white/40">·</span>
                <span className="text-white/70">National Arts &amp; Cinema Assembly</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {aboutData.awards.map((award, idx) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_OUT }}
              className="group relative flex flex-col justify-between rounded-2xl border border-gold-600/25 bg-surface-raised p-6 sm:p-7 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-[0_16px_36px_-8px_rgba(18,51,43,0.15)]"
            >
              <div>
                {/* Top Row: Logo + Category Eyebrow & Year Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold-500/40 bg-white p-2 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:scale-105 group-hover:border-gold-400 group-hover:shadow-[0_6px_20px_rgba(199,154,61,0.3)]">
                      <img
                        src={AWARD_EMBLEMS[award.category] ?? awardDiplomacyTrade}
                        alt={award.category}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="font-label text-xs font-bold uppercase tracking-[0.18em] text-[#8A6920] dark:text-gold-400">
                      {award.category}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full border border-gold-600/30 bg-gold-500/10 px-3 py-1 font-label text-xs font-bold text-gold-800 tracking-wider">
                    {award.year}
                  </span>
                </div>

                {/* Main Heading / Title Below */}
                <h3 className="mb-2.5 font-heading text-lg sm:text-xl font-bold text-ink-heading transition-colors duration-200 group-hover:text-gold-800 leading-snug">
                  {award.title}
                </h3>

                {/* Issuer Badge */}
                <p className="mb-3.5 font-label text-xs font-semibold text-ink-soft flex items-center gap-1.5">
                  <Medal className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                  <span>{award.issuer}</span>
                </p>

                {/* Content Description */}
                <p className="font-sans text-sm leading-relaxed text-ink-soft">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
