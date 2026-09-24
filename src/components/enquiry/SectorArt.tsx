import React from 'react';

/**
 * Sector imagery: a photograph for each of the five investment sectors, and an
 * SVG illustration for the cinema pillar.
 */
export type SectorArtKind = 'trade' | 'gold' | 'fleet' | 'oilgas' | 'realestate' | 'cinema';



/**
 * Tight frames, measured from each drawing's real bounding box (with padding)
 * so every illustration fills its card instead of floating small in a big
 * canvas. `ground` places the soft shadow directly under the artwork.
 */
const FRAME: Record<SectorArtKind, { vb: string; ground?: { cx: number; cy: number; rx: number } }> = {
  trade: { vb: '10 10 226 162', ground: { cx: 123, cy: 158, rx: 88 } },
  gold: { vb: '14 22 223 159', ground: { cx: 125, cy: 167, rx: 64 } },
  fleet: { vb: '12 66 181 121', ground: { cx: 102, cy: 173, rx: 88 } },
  oilgas: { vb: '10 12 213 152', ground: { cx: 117, cy: 150, rx: 66 } },
  realestate: { vb: '10 22 225 161', ground: { cx: 122, cy: 169, rx: 68 } },
  cinema: { vb: '12 4 220 160' },
};

const Ground: React.FC<{ g?: { cx: number; cy: number; rx: number } }> = ({ g }) =>
  g ? <ellipse cx={g.cx} cy={g.cy} rx={g.rx} ry="12" fill="rgba(0,0,0,0.14)" /> : null;

import tradePhoto from '../../assets/images/sector-photos/trade.webp';
import goldPhoto from '../../assets/images/sector-photos/gold.webp';
import fleetPhoto from '../../assets/images/sector-photos/fleet.webp';
import oilGasPhoto from '../../assets/images/sector-photos/oilgas.webp';
import realEstatePhoto from '../../assets/images/sector-photos/realestate.webp';

// Unsplash License (free commercial use). Source photo IDs: IVG8SDczupk, ktXmcyqYx54,
// Rhwj3CPwc6o, L-RSVfhluGw, O1ulT7On0WQ -- unsplash.com/photos/<id>.
const PHOTOS: Partial<Record<SectorArtKind, { src: string; alt: string; focal: string }>> = {
  trade: { src: tradePhoto, alt: 'Aerial view of a container port with a loaded cargo ship and cranes', focal: '50% 62%' },
  gold: { src: goldPhoto, alt: 'Gold bullion bars', focal: '45% 55%' },
  fleet: { src: fleetPhoto, alt: 'Freight truck on a desert highway', focal: '35% 62%' },
  oilgas: { src: oilGasPhoto, alt: 'Oil refinery illuminated at night', focal: '50% 50%' },
  realestate: { src: realEstatePhoto, alt: 'Dubai Marina towers at night', focal: '50% 55%' },
};

export const SectorArt: React.FC<{ kind: SectorArtKind; className?: string }> = ({ kind, className }) => {
  const photo = PHOTOS[kind];
  if (photo) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-emerald-950 ${className || ''}`}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photo.focal }}
          className="h-full w-full object-cover"
        />
        {/* Deepens the lower edge so every photo sits on the card in the same emerald key */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/55 via-emerald-950/5 to-transparent"
        />
      </div>
    );
  }

  let art: React.ReactNode = null;

  if (kind === 'cinema') {
    art = (
      <>
        <rect x="52" y="74" width="136" height="70" rx="6" fill="#1F5A49" />
        <rect x="52" y="74" width="136" height="16" fill="#12332B" />
        <path d="M60 60 L190 44 l6 20 L66 80z" fill="#F6DFA0" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${72 + i * 26} 78 l14 -18 l10 0 l-14 18z`} fill="#12332B" />
        ))}
        <rect x="64" y="104" width="112" height="6" rx="3" fill="#F6DFA0" opacity=".9" />
        <rect x="64" y="118" width="70" height="6" rx="3" fill="#F6DFA0" opacity=".6" />
        <circle cx="196" cy="128" r="26" fill="#D9A845" /><circle cx="196" cy="128" r="9" fill="#12332B" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={196 + 16 * Math.cos((a * Math.PI) / 180)} cy={128 + 16 * Math.sin((a * Math.PI) / 180)} r="3.4" fill="#12332B" />
        ))}
        <path d="M30 40 l-8 -10 M40 30 l-2 -12 M52 26 l6 -12" stroke="#F6DFA0" strokeWidth="3" strokeLinecap="round" />
      </>
    );
  }

  return (
    <svg viewBox={FRAME[kind].vb} role="img" aria-hidden className={className}>
      <Ground g={FRAME[kind].ground} />
      {art}
    </svg>
  );
};
