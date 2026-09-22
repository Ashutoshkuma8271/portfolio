import React from 'react';

// WebP -- the optimized primary source (~85-93% smaller than the original
// PNGs). PNG stays imported too, purely as the <picture> fallback for the
// very small remaining share of browsers without WebP support.
import indiaWebp from '../../assets/emblems/india.webp';
import indiaPng from '../../assets/emblems/india.png';
import uaeWebp from '../../assets/emblems/uae.webp';
import uaePng from '../../assets/emblems/uae.png';
import saudiWebp from '../../assets/emblems/saudi.webp';
import saudiPng from '../../assets/emblems/saudi.png';
import qatarWebp from '../../assets/emblems/qatar.webp';
import qatarPng from '../../assets/emblems/qatar.png';
import bahrainWebp from '../../assets/emblems/bahrain.webp';
import bahrainPng from '../../assets/emblems/bahrain.png';
import omanWebp from '../../assets/emblems/oman.webp';
import omanPng from '../../assets/emblems/oman.png';
import kuwaitWebp from '../../assets/emblems/kuwait.webp';
import kuwaitPng from '../../assets/emblems/kuwait.png';

interface EmblemSource {
  webp: string;
  png: string;
  alt: string;
}

const EMBLEMS: Record<string, EmblemSource> = {
  india: { webp: indiaWebp, png: indiaPng, alt: 'Emblem of India' },
  'government of india': { webp: indiaWebp, png: indiaPng, alt: 'Emblem of India' },
  uae: { webp: uaeWebp, png: uaePng, alt: 'Emblem of the United Arab Emirates' },
  'united arab emirates': { webp: uaeWebp, png: uaePng, alt: 'Emblem of the United Arab Emirates' },
  'saudi arabia': { webp: saudiWebp, png: saudiPng, alt: 'Emblem of Saudi Arabia' },
  ksa: { webp: saudiWebp, png: saudiPng, alt: 'Emblem of Saudi Arabia' },
  qatar: { webp: qatarWebp, png: qatarPng, alt: 'Emblem of Qatar' },
  bahrain: { webp: bahrainWebp, png: bahrainPng, alt: 'Emblem of Bahrain' },
  // Oman's WebP is generated at a higher resolution with a saturation
  // correction (see scripts/convert-images.mjs) -- its source art is thin
  // hairline strokes that washed out to pale pink once downsampled hard,
  // unlike the other crests' bolder solid-filled shapes. Fixed at the
  // asset level, not with a runtime CSS filter, so it's a real, inspectable
  // file rather than a hack layered on top at render time.
  oman: { webp: omanWebp, png: omanPng, alt: 'Emblem of Oman' },
  kuwait: { webp: kuwaitWebp, png: kuwaitPng, alt: 'Emblem of Kuwait' },
};

interface CountryEmblemProps {
  country: string;
  className?: string;
}

export const CountryEmblem: React.FC<CountryEmblemProps> = ({ country, className = 'w-10 h-10' }) => {
  const emblem = EMBLEMS[country.toLowerCase()];

  if (!emblem) {
    return (
      <div className={`flex items-center justify-center rounded-full border border-gold-500 bg-gold-500/20 text-2xs font-bold text-emerald-950 ${className}`}>
        {country.substring(0, 3).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <picture>
        <source srcSet={emblem.webp} type="image/webp" />
        <img
          src={emblem.png}
          alt={emblem.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain drop-shadow-sm"
        />
      </picture>
    </div>
  );
};
