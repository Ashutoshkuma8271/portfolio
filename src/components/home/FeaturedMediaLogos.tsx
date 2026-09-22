import React from 'react';
import { Container } from '../layout/Container';

const MEDIA_OUTLETS = [
  { name: 'The Tribune India', tag: 'National Press' },
  { name: 'ANI News', tag: 'Asian News International' },
  { name: 'ThePrint', tag: 'Diplomatic Affairs' },
  { name: 'Ahmedabad Mirror', tag: 'Centenary Press' },
  { name: 'Hindustan Metro', tag: 'Trade Feature' },
  { name: 'IMDb', tag: 'Official Filmography' },
];

export const FeaturedMediaLogos: React.FC = () => {
  return (
    <div className="border-b border-hairline bg-surface py-6 sm:py-8">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-600 animate-pulse" />
            <span className="font-label text-[0.65rem] sm:text-2xs font-bold uppercase tracking-[0.2em] text-[#8A6920] whitespace-nowrap">
              Featured In International & National Media
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3">
            {MEDIA_OUTLETS.map((outlet) => (
              <div
                key={outlet.name}
                className="group flex items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity duration-200 cursor-default"
              >
                <span className="font-heading text-sm sm:text-base font-bold tracking-tight text-ink-heading group-hover:text-gold-700 transition-colors">
                  {outlet.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
