import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { OrgSeal } from '../ui/OrgSeal';
import { aboutData } from '../../data/about';
import { eventPhotos } from '../../data/eventPhotos';

import awardDiplomacyTrade from '../../assets/images/awards/award-diplomacy-trade.jpg';
import awardLeadership from '../../assets/images/awards/award-leadership.jpg';
import awardCinema from '../../assets/images/awards/award-cinema.jpg';
import awardTrade from '../../assets/images/awards/award-trade.jpg';
import awardPhilanthropy from '../../assets/images/awards/award-philanthropy.jpg';
import cinemaAwardMedal from '../../assets/images/icons/cinema-award-medal.png';

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
                <img
                  src={cinemaAwardMedal}
                  alt=""
                  className="h-4 w-4 object-contain filter drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)] shrink-0"
                />
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
                  <img
                    src={cinemaAwardMedal}
                    alt=""
                    className="h-4 w-4 object-contain filter drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)] shrink-0"
                  />
                  <span className="font-semibold uppercase tracking-wider">Honorary Citation</span>
                </div>
                <span className="text-white/40">·</span>
                <span className="text-white/70">National Arts &amp; Cinema Assembly</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Awards Cards Grid */}
        {/* Flex-wrap rather than grid so a short last row sits centred, not left-aligned with a gap */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {aboutData.awards.map((award, idx) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_OUT }}
              className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gold-600/25 bg-surface-raised p-6 sm:p-7 text-center md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_30px_-18px_rgba(18,51,43,0.22)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-[0_22px_44px_-18px_rgba(18,51,43,0.3)] md:text-left"
            >
              {/* Gold rule that draws in on hover */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 transition-transform duration-500 ease-out group-hover:scale-x-100" />

              {/* Emblem, category and year (stacked and centred on phones) */}
              <div className="flex flex-col items-center gap-3.5 md:flex-row md:gap-4">
                <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl bg-white p-2 ring-1 ring-gold-500/40 shadow-[0_6px_18px_-6px_rgba(18,51,43,0.25)] transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={AWARD_EMBLEMS[award.category] ?? awardDiplomacyTrade}
                    alt={award.category}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p className="font-label text-2xs font-bold uppercase tracking-[0.2em] text-[#8A6920] dark:text-gold-400">
                    {award.category}
                  </p>
                  <p className="mt-1 font-cinzel text-2xl font-bold leading-none gold-text-deep dark:gold-text">
                    {award.year}
                  </p>
                </div>
              </div>

              <h3 className="mt-5 font-heading text-lg sm:text-xl font-bold text-ink-heading transition-colors duration-200 group-hover:text-gold-800 dark:group-hover:text-gold-300 leading-snug">
                {award.title}
              </h3>

              <p className="mt-2.5 font-sans text-sm leading-relaxed text-ink-soft">
                {award.description}
              </p>

              {/* Conferring body, pinned to the bottom so every card's footer lines up */}
              <div className="mt-auto pt-5">
                <div className="flex items-center gap-3 rounded-xl border border-gold-500/20 bg-surface-sunken/70 p-3 text-left">
                  <OrgSeal name={award.issuer} />
                  <div className="min-w-0">
                    <p className="font-label text-3xs font-bold uppercase tracking-[0.18em] text-ink-faint">Conferred by</p>
                    <p className="mt-0.5 text-xs font-semibold leading-snug text-ink-heading sm:text-[0.8rem]">{award.issuer}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
