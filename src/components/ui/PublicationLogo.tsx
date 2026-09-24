import React, { useState } from 'react';
import { findNewsLogo, faviconFor } from '../../data/newsLogos';

interface PublicationLogoProps {
  publication?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const HEIGHT = { sm: 'h-6', md: 'h-8', lg: 'h-10' } as const;
const SQUARE = { sm: 'w-6', md: 'w-8', lg: 'w-10' } as const;
const WIDE_MAX = { sm: 'max-w-[64px]', md: 'max-w-[84px]', lg: 'max-w-[104px]' } as const;
const INITIAL_TEXT = { sm: 'text-[0.6rem]', md: 'text-2xs', lg: 'text-xs' } as const;

const initials = (name: string) =>
  name
    .replace(/^the\s+/i, '')
    .split(/[\s./-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

/**
 * The outlet's own mark on a white tile (logos are drawn for white grounds, so
 * the tile stays white in dark mode too). Falls back to the outlet's favicon
 * when the name is a domain, then to an engraved monogram.
 */
export const PublicationLogo: React.FC<PublicationLogoProps> = ({ publication, size = 'md', className = '' }) => {
  const logo = findNewsLogo(publication);
  const favicon = logo ? null : faviconFor(publication);
  const [faviconFailed, setFaviconFailed] = useState(false);

  const tile = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${HEIGHT[size]}`;

  if (logo) {
    return logo.wide ? (
      <span className={`${tile} w-auto ${WIDE_MAX[size]} px-1.5 ${className}`}>
        <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="h-[70%] w-auto max-w-full object-contain" />
      </span>
    ) : (
      <span className={`${tile} ${SQUARE[size]} p-[3px] ${className}`}>
        <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
      </span>
    );
  }

  if (favicon && !faviconFailed) {
    return (
      <span className={`${tile} ${SQUARE[size]} p-1 ${className}`}>
        <img
          src={favicon}
          alt={publication}
          loading="lazy"
          decoding="async"
          onError={() => setFaviconFailed(true)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-950 font-cinzel font-bold tracking-wide text-gold-300 ring-1 ring-gold-500/40 ${HEIGHT[size]} ${SQUARE[size]} ${INITIAL_TEXT[size]} ${className}`}
    >
      {initials(publication || 'News') || 'N'}
    </span>
  );
};
