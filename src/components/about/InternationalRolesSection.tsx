import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Film, Award, MapPin, CheckCircle2, Building } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { aboutData } from '../../data/about';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const ROLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  ShieldCheck,
  Film,
};

export const InternationalRolesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-surface-sunken py-20 text-ink-heading lg:py-28">
      {/* Background hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(230,189,101,0.05) 1px, transparent 1px)',
          backgroundSize: 'clamp(60px, 6vw, 100px) 100%',
        }}
      />

      {/* Ambient gold glow blooms */}
      <div aria-hidden className="pointer-events-none absolute -top-32 right-10 h-96 w-96 rounded-full bg-gold-600/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-emerald-700/15 blur-3xl" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Global Mandates & Sovereign Portfolios"
          title="International Roles & Diplomatic Appointments"
          subtitle="Representing sovereign and regional trade corridors across the Middle East, North Africa, and South Asia."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-12">
          {aboutData.internationalRoles.map((role, idx) => {
            const Icon = ROLE_ICONS[role.iconName] ?? Award;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE_OUT }}
                className="group relative flex flex-col justify-between rounded-2xl border border-gold-600/35 bg-surface-sunken/90 p-7 shadow-luxury transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400 hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.6),0_0_24px_rgba(199,154,61,0.25)] sm:p-8 backdrop-blur-xs"
              >
                {/* Top Corner Filigree */}
                <div aria-hidden className="absolute top-4 right-4 h-5 w-5 border-t border-r border-gold-400/50 pointer-events-none transition-transform duration-300 group-hover:scale-110" />

                <div>
                  {/* Top Row: Icon Medallion & Status Badge */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/50 bg-surface-sunken shadow-md text-gold-400 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-emerald-950 group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-surface-raised px-3 py-1 text-2xs font-semibold text-gold-700 dark:text-gold-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{role.period}</span>
                    </div>
                  </div>

                  <h3 className="mb-2 font-heading text-xl font-bold text-ink-heading transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-300 leading-snug">
                    {role.title}
                  </h3>

                  <p className="mb-4 font-label text-xs font-semibold text-gold-700 dark:text-gold-400 flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-gold-500" />
                    {role.organization}
                  </p>

                  <div className="mb-6 flex items-start gap-2 rounded-xl border border-gold-500/20 bg-surface-raised p-3 font-sans text-xs text-ink">
                    <MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                    <span className="leading-relaxed">{role.region}</span>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-3">
                    <span className="block font-label text-xs font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
                      Core Mandate Responsibilities
                    </span>
                    <ul className="space-y-2.5 font-sans text-sm text-ink-soft leading-relaxed">
                      {role.responsibilities.map((resp) => (
                        <li key={resp} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold-500" />
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
