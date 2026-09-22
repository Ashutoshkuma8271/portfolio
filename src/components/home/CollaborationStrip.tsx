import React from 'react';
import { Container } from '../layout/Container';
import { CountryEmblem } from '../ui/CountryEmblem';
import { siteConfig } from '../../data/siteConfig';

export const CollaborationStrip: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-hairline/80 bg-surface py-6 sm:py-7 lg:py-8">
      {/* Top delicate gold hairline transition */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-600/30 to-transparent"
      />

      <Container>
        {/* Section title */}
        <p className="text-center font-label text-2xs sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#8A6920] mb-5 sm:mb-6">
          In Collaboration With
        </p>

        {/* Emblems & Country Labels Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14">
          {siteConfig.collaborations.map((item) => (
            <div
              key={item.code}
              className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5 cursor-default select-none"
            >
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center">
                <CountryEmblem
                  country={item.country}
                  className="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="font-heading text-xs sm:text-sm font-medium text-ink-heading transition-colors group-hover:text-gold-800 text-center leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
