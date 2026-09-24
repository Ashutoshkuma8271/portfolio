import React from 'react';
import { orgLogo } from '../../data/orgLogos';

const STOP = new Set(['of', 'the', 'and', 'for', 'in', 'on', '&']);

const monogram = (name: string) =>
  name
    .split(',')[0]
    .split(/[\s-]+/)
    .filter((w) => w && !STOP.has(w.toLowerCase()))
    .slice(0, 3)
    .map((w) => w[0]!.toUpperCase())
    .join('');

interface OrgSealProps {
  /** Organisation name; its logo is looked up in src/assets/images/org-logos. */
  name: string;
  /** Used when no drop-in logo exists for this organisation. */
  fallbackLogo?: string;
  size?: 'md' | 'lg';
  className?: string;
}

const BOX = { md: 'h-11 w-11', lg: 'h-14 w-14' } as const;
const LETTERS = { md: 'text-[0.7rem]', lg: 'text-sm' } as const;

/**
 * The organisation's own logo on a white tile, or -- until one is supplied --
 * an engraved monogram seal. A seal reads as "this organisation" without
 * inventing a logo it does not have.
 */
export const OrgSeal: React.FC<OrgSealProps> = ({ name, fallbackLogo, size = 'md', className = '' }) => {
  const src = orgLogo(name) ?? fallbackLogo;

  if (src) {
    return (
      <span
        className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-sunken/80 ring-1 ring-gold-500/50 shadow-[0_2px_10px_-2px_rgba(7,21,17,0.45)] ${BOX[size]} ${className}`}
      >
        <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-full object-cover" />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950 ring-1 ring-gold-500/70 shadow-[0_2px_10px_-2px_rgba(7,21,17,0.45)] ${BOX[size]} ${className}`}
    >
      <span className="absolute inset-[3px] rounded-full border border-gold-400/45" />
      <span className={`font-cinzel font-bold tracking-[0.06em] text-gold-300 ${LETTERS[size]}`}>{monogram(name)}</span>
    </span>
  );
};
