import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { CountUp } from '../ui/CountUp';
import { siteConfig } from '../../data/siteConfig';
import handshakeIcon from '../../assets/icons/handshake-partnership.webp';
import { IndiaMajesticFlag } from '../ui/IndiaMajesticFlag';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE_OUT },
  }),
};

/** Images for narrative tiles in siteConfig.stats */
const narrativeImages: (string | null)[] = [null, null, handshakeIcon, null];

/** Parses a leading integer + suffix out of values like "50+" so they can
    count up; narrative values ("Strategic Partnerships") pass through as-is. */
const parseNumeric = (value: string): { number: number; suffix: string } | null => {
  const match = value.match(/^(\d+)(\D*)$/);
  if (!match) return null;
  return { number: parseInt(match[1], 10), suffix: match[2] };
};

export const StatsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-gold-600/30 bg-[#0C221C] py-12 text-ivory-500 sm:py-16">
      {/* Editorial paper grain texture */}
      <div aria-hidden className="hero-grain-dark pointer-events-none absolute inset-0 z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-emerald-900/80">
          {siteConfig.stats.map((stat, idx) => {
            const numeric = parseNumeric(stat.value);
            const narrativeSrc = narrativeImages[idx];
            const isCorridorTile = idx === 3;

            return (
              <motion.div
                key={stat.label}
                custom={idx}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="group flex flex-col items-center px-4 text-center lg:px-6"
              >
                {numeric ? (
                  <CountUp
                    value={numeric.number}
                    suffix={numeric.suffix}
                    delay={0.15 + idx * 0.1}
                    className="mb-1.5 font-serif text-[clamp(1.75rem,3.2vw+1rem,3rem)] font-bold leading-none text-gold-400 tabular-nums"
                  />
                ) : isCorridorTile ? (
                  <div className="mb-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                    <IndiaMajesticFlag className="h-8 sm:h-9 w-auto max-w-[150px]" />
                  </div>
                ) : (
                  narrativeSrc && (
                    <img
                      src={narrativeSrc}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="mb-2 h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-8"
                    />
                  )
                )}

                <p className="font-sans text-base font-semibold leading-snug text-ivory-500 sm:text-lg">
                  {numeric ? stat.label : stat.value}
                </p>
                {!numeric && (
                  <p className="mt-0.5 font-label text-2xs font-semibold uppercase tracking-[0.14em] text-gold-400 sm:text-xs">
                    {stat.label}
                  </p>
                )}
                {stat.subtext && (
                  <p className="mt-2 max-w-[13rem] font-sans text-sm leading-relaxed text-ivory-700/80 sm:text-xs">
                    {stat.subtext}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
