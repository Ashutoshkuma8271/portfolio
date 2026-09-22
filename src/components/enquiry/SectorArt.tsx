import React from 'react';

/**
 * Original isometric illustrations for the five investment sectors (and the
 * cinema pillar). Drawn in SVG so they are crisp at any size, weigh almost
 * nothing, and work in light and dark mode -- no stock photography needed for
 * ideas a photograph can't show (a gold bar, an oil barrel, a ship).
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

import importExportHd from '../../assets/images/focus/import-export-hd.png';
import goldBullionHd from '../../assets/images/focus/gold-bullion-hd.png';
import fleetHd from '../../assets/images/focus/fleet-hd.png';
import oilGasHd from '../../assets/images/focus/oilgas-hd.png';
import realEstateHd from '../../assets/images/focus/realestate-hd.png';

export const SectorArt: React.FC<{ kind: SectorArtKind; className?: string }> = ({ kind, className }) => {
  if (kind === 'trade') {
    return (
      <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0c281e] via-[#051510] to-[#020b08] p-4 ${className || ''}`}>
        <img
          src={importExportHd}
          alt="Import & Export — Global Trade & Logistics"
          loading="lazy"
          className="h-full w-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  if (kind === 'gold') {
    return (
      <div className={`relative flex h-full w-full items-center justify-center bg-black overflow-hidden ${className || ''}`}>
        <img
          src={goldBullionHd}
          alt="Gold — Value Beyond Time"
          loading="lazy"
          className="h-full w-full object-contain p-1.5 transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  if (kind === 'fleet') {
    return (
      <div className={`relative flex h-full w-full items-center justify-center bg-white overflow-hidden p-2 ${className || ''}`}>
        <img
          src={fleetHd}
          alt="Fleet — Driving a Smarter Tomorrow"
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  if (kind === 'oilgas') {
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className || ''}`}>
        <img
          src={oilGasHd}
          alt="Oil & Gas — Energy for a Brighter Tomorrow"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  if (kind === 'realestate') {
    return (
      <div className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className || ''}`}>
        <img
          src={realEstateHd}
          alt="Real Estate — Building Better Tomorrows"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
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
