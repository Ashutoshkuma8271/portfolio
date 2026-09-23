import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, Building } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { aboutData } from '../../data/about';

import { eventPhotos } from '../../data/eventPhotos';

import gccCouncilSeal from '../../assets/images/roles/india-gcc-trade-council-seal.png';
import executiveShield from '../../assets/images/roles/executive-board-shield.jpg';
import cultureDiplomacyLogo from '../../assets/images/roles/culture-diplomacy-logo.png';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const ROLE_EMBLEMS = [
  gccCouncilSeal,
  executiveShield,
  cultureDiplomacyLogo,
];

export const InternationalRolesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-surface-sunken py-20 text-ink-heading lg:py-28">
      {/* Background Diplomatic Summit Delegation Photo with Luxury Scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={eventPhotos.aaccArabDelegation.src}
          alt={eventPhotos.aaccArabDelegation.alt}
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {aboutData.internationalRoles.map((role, idx) => {
            const emblemSrc = ROLE_EMBLEMS[idx % ROLE_EMBLEMS.length];
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE_OUT }}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-gold-600/30 bg-surface-raised p-6 sm:p-7 shadow-luxury transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-luxury-lg"
              >
                {/* Top Corner Filigree */}
                <div aria-hidden className="absolute top-4 right-4 h-5 w-5 border-t border-r border-gold-400/50 pointer-events-none transition-transform duration-300 group-hover:scale-110" />

                <div>
                  {/* Top Row: Icon Medallion & Status Badge */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-gold-500/40 bg-white p-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:scale-105 group-hover:border-gold-400 group-hover:shadow-[0_6px_20px_rgba(199,154,61,0.3)]">
                      <img
                        src={emblemSrc}
                        alt={role.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/35 bg-gold-500/10 px-3 py-1 text-2xs font-semibold text-gold-800 dark:text-gold-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{role.period}</span>
                    </div>
                  </div>

                  <h3 className="mb-3 font-heading text-lg sm:text-xl font-bold text-ink-heading transition-colors group-hover:text-gold-800 leading-snug">
                    {role.title}
                  </h3>

                  {/* Metadata: Organization & Geographic Region */}
                  <div className="mb-5 space-y-2">
                    <div className="flex items-start gap-2 font-label text-xs font-semibold text-gold-800 dark:text-gold-300">
                      <Building className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400 mt-0.5" />
                      <span>{role.organization}</span>
                    </div>
                    <div className="flex items-start gap-2 font-sans text-xs text-ink-soft">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400 mt-0.5" />
                      <span>{role.region}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px w-full bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-transparent" />

                  {/* Responsibilities */}
                  <div className="space-y-2.5">
                    <span className="block font-label text-2xs font-bold uppercase tracking-[0.2em] text-[#8A6920] dark:text-gold-400">
                      Core Mandate Responsibilities
                    </span>
                    <ul className="space-y-2 font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {role.responsibilities.map((resp) => (
                        <li key={resp} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
