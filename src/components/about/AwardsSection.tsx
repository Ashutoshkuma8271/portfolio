import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { aboutData } from '../../data/about';
import { eventPhotos } from '../../data/eventPhotos';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

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
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:col-span-5 overflow-hidden bg-emerald-950">
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
            <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/15 px-3.5 py-1 text-2xs font-label font-bold uppercase tracking-[0.2em] text-gold-300 mb-4 w-fit">
                <Sparkles className="h-3 w-3 text-gold-400" />
                <span>Featured Cultural Honor</span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3">
                Cultural Cinema &amp; Film Producer Conclave Citation
              </h3>

              <p className="font-sans text-sm sm:text-base leading-relaxed text-ivory-600 mb-6">
                Conferred at the National Cultural Cinema and Creative Leadership Conclave alongside Bollywood luminary Dia Mirza, recognizing exemplary contributions to purposeful storytelling, international film syndication, and cultural diplomacy.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gold-500/20 text-xs font-label">
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
              className="group relative flex flex-col justify-between rounded-2xl border border-gold-600/25 bg-surface-raised p-7 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-[0_16px_36px_-8px_rgba(18,51,43,0.15)]"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-700 transition-all duration-300 group-hover:bg-gold-600 group-hover:text-emerald-950 group-hover:shadow-[0_0_20px_rgba(199,154,61,0.35)]">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-gold-600/30 bg-gold-500/10 px-3 py-1 font-label text-xs font-bold text-gold-800 tracking-wider">
                    {award.year}
                  </span>
                </div>

                <span className="mb-2 block font-label text-2xs font-bold uppercase tracking-[0.16em] text-[#8A6920]">
                  {award.category}
                </span>

                <h3 className="mb-2.5 font-heading text-lg sm:text-xl font-bold text-ink-heading transition-colors duration-200 group-hover:text-gold-800 leading-snug">
                  {award.title}
                </h3>

                <p className="mb-4 font-label text-xs font-semibold text-ink-soft flex items-center gap-1.5">
                  <Medal className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                  <span>{award.issuer}</span>
                </p>

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
