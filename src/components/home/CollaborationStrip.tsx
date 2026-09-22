import React from 'react';
import { Container } from '../layout/Container';
import { CountryEmblem } from '../ui/CountryEmblem';
import { siteConfig } from '../../data/siteConfig';

export const CollaborationStrip: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-hairline/80 bg-surface py-6 sm:py-8 lg:py-9">
      {/* Top delicate gold hairline transition */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-600/30 to-transparent"
      />

      <Container>
        {/* Section title */}
        <p className="text-center font-label text-2xs sm:text-xs font-semibold uppercase tracking-[0.24em] text-gold-700 dark:text-gold-400 mb-6 sm:mb-7">
          In Collaboration With
        </p>

        {/* Desktop View (md & above): Evenly distributed 7-nation partnership strip */}
        <div className="hidden md:block mx-auto w-full max-w-5xl">
          <div className="grid grid-cols-7 items-start justify-items-center gap-x-3 lg:gap-x-6">
            {siteConfig.collaborations.map((item) => (
              <div
                key={item.code}
                className="group flex flex-col items-center justify-start gap-2 w-full transition-all duration-200 hover:-translate-y-0.5 cursor-default select-none text-center"
              >
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center">
                  <CountryEmblem
                    country={item.country}
                    className="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <span className="font-heading text-xs sm:text-[0.82rem] font-medium text-ink-heading transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-400 text-center leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (< md): Infinite continuous luxury marquee scroll */}
        <div
          className="md:hidden relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          }}
        >
          <div className="flex w-max animate-marquee items-center [animation-duration:20s] motion-reduce:animate-none hover:[animation-play-state:paused]">
            {[0, 1].map((run) => (
              <div key={run} className="flex items-center gap-7 pr-7" aria-hidden={run === 1}>
                {siteConfig.collaborations.map((item) => (
                  <div
                    key={`${item.code}-${run}`}
                    className="flex flex-col items-center justify-center gap-2 min-w-[92px] shrink-0 text-center select-none"
                  >
                    <div className="flex h-11 w-11 items-center justify-center">
                      <CountryEmblem
                        country={item.country}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <span className="font-heading text-xs font-semibold text-ink-heading whitespace-nowrap text-center">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
