import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { OrgSeal } from '../ui/OrgSeal';
import { MapPinLogo } from '../ui/MapPinLogo';
import { aboutData } from '../../data/about';

import { eventPhotos } from '../../data/eventPhotos';

import gccCouncilSeal from '../../assets/images/roles/india-gcc-trade-council-seal.png';
import executiveShield from '../../assets/images/roles/executive-board-shield.png';
import cultureDiplomacyLogo from '../../assets/images/roles/culture-diplomacy-logo.png';
import gulfPanelPhoto from '../../assets/images/focus/global-trade-hd.png';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const ROLE_EMBLEMS = [
  gccCouncilSeal,
  executiveShield,
  cultureDiplomacyLogo,
];

/**
 * One photograph per role, each showing the kind of work that role covers.
 * None of these appear elsewhere on the About page (the bilateral-accord
 * frame is already a tenet card, so it is deliberately not reused here).
 */
const ROLE_PHOTOS: { src: string; alt: string; focal: string }[] = [
  {
    src: gulfPanelPhoto,
    alt: 'H.E. Zeenat Kureshi seated on a chamber of commerce panel with Gulf delegates',
    focal: '50% 35%',
  },
  { src: eventPhotos.womenPanel.src, alt: eventPhotos.womenPanel.alt, focal: '50% 55%' },
  { src: eventPhotos.mediaCinema.src, alt: eventPhotos.mediaCinema.alt, focal: '50% 22%' },
];

export const InternationalRolesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-surface-sunken py-20 text-ink-heading lg:py-28">
      {/* Background Diplomatic Summit Delegation Photo with Luxury Scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={eventPhotos.aaccArabDelegation.src}
          alt=""
          className="h-full w-full object-cover object-center opacity-10 filter saturate-50 blur-[0.5px] transform scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-sunken/95 via-surface-sunken/85 to-surface-sunken/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(199,154,61,0.08),transparent)]" />
      </div>

      {/* Ambient gold glow blooms */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-10 h-96 w-96 rounded-full bg-gold-600/10 blur-3xl z-0" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-emerald-700/15 blur-3xl z-0" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Global Mandates & Sovereign Portfolios"
          title="International Roles & Diplomatic Appointments"
          subtitle="Representing sovereign and regional trade corridors across the Middle East, North Africa, and South Asia."
          center
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {aboutData.internationalRoles.map((role, idx) => {
            const emblemSrc = ROLE_EMBLEMS[idx % ROLE_EMBLEMS.length];
            const photo = ROLE_PHOTOS[idx % ROLE_PHOTOS.length];
            return (
              <motion.article
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT }}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-gold-600/25 bg-surface-raised shadow-luxury transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-luxury-lg"
              >
                {/* Compact Photographic Masthead */}
                <div className="grain relative h-44 sm:h-48 overflow-hidden bg-emerald-950">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: photo.focal }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-gold-400/35 bg-emerald-950/80 px-2.5 py-1 text-2xs font-semibold text-gold-200 shadow-2xs backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{role.period}</span>
                  </span>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Title with uniform height across cards */}
                  <div className="min-h-[3.5rem] flex items-center mb-1">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-ink-heading transition-colors group-hover:text-gold-800 dark:group-hover:text-gold-300 leading-snug">
                      {role.title}
                    </h3>
                  </div>

                  {/* Sleek Organisation & Region Bar with uniform height */}
                  <div className="mt-3 mb-5 min-h-[70px] flex items-center gap-3.5 rounded-xl border border-gold-500/15 bg-gradient-to-br from-gold-500/[0.06] via-surface-sunken/60 to-surface-sunken/20 p-3">
                    <OrgSeal name={role.organization} fallbackLogo={emblemSrc} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-sm sm:text-[0.92rem] font-semibold text-ink-heading leading-snug truncate">
                        {role.organization}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-[0.82rem] text-ink-soft truncate">
                        <MapPinLogo className="h-3.5 shrink-0" />
                        <span className="truncate">{role.region}</span>
                      </p>
                    </div>
                  </div>

                  {/* Mandate Focus (Clean Bullets with Standard Readable Typography) */}
                  <div className="mt-auto pt-1">
                    <p className="mb-3 flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.14em] text-[#8A6920] dark:text-gold-400">
                      <span>Mandate &amp; Core Focus</span>
                      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
                    </p>
                    <ul className="space-y-3">
                      {role.responsibilities.map((resp) => (
                        <li key={resp} className="flex items-start gap-3 text-sm sm:text-[0.92rem] leading-relaxed text-ink-soft">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500 ring-2 ring-gold-500/20" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
