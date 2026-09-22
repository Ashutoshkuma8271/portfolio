import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Official BrandMark for H.E. Zeenat Kureshi.
 * Faithfully reproduces the official brand identity:
 * - High-contrast Roman Serif "ZK" monogram in deep sovereign emerald (#07221A)
 * - Dynamic 3D metallic golden ribbon flourish uniting Z and K with authentic depth
 * - Available in 'light' (deep emerald letterforms + gold ribbon)
 *   and 'dark' (sculpted metallic gold letterforms + gold ribbon)
 * - Typography pairs classical luxury Roman serif (Cinzel) with dignified diplomatic tracking
 */
export interface BrandMarkProps {
  theme?: 'dark' | 'light';
  variant?: 'monogram' | 'horizontal' | 'crest' | 'navbar';
  size?: number;
  className?: string;
  subtitle?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  theme = 'light',
  variant = 'monogram',
  size = 44,
  className = '',
  subtitle,
}) => {
  const isDark = theme === 'dark';
  const idSuffix = React.useId().replace(/:/g, '');

  const goldRibbonId = `goldRibbon-${idSuffix}`;
  const ribbonHighlightId = `ribbonHighlight-${idSuffix}`;
  const letterGradId = `letterGrad-${idSuffix}`;
  const ribbonDepthId = `ribbonDepth-${idSuffix}`;

  const MonogramSvg = (
    <svg
      viewBox="0 0 250 175"
      width={size}
      height={(size * 175) / 250}
      preserveAspectRatio="xMidYMid meet"
      className="shrink-0 transition-transform duration-300"
      role="img"
      aria-label="H.E. Zeenat Kureshi Official ZK Monogram"
    >
      <defs>
        {/* Luminous Multi-stop Metallic Gold Gradient for 3D Ribbon */}
        <linearGradient id={goldRibbonId} x1="5%" y1="15%" x2="95%" y2="85%">
          <stop offset="0%" stopColor="#FFF6DC" />
          <stop offset="14%" stopColor="#F3D88F" />
          <stop offset="30%" stopColor="#DFB657" />
          <stop offset="52%" stopColor="#B88828" />
          <stop offset="74%" stopColor="#DCB354" />
          <stop offset="88%" stopColor="#9C701B" />
          <stop offset="100%" stopColor="#6E4A0C" />
        </linearGradient>

        {/* Ribbon Highlight Ridge Gradient */}
        <linearGradient id={ribbonHighlightId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="32%" stopColor="#FFF8E4" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#E5C270" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#B88828" stopOpacity="0" />
        </linearGradient>

        {/* Letterform Gradient: Sculpted Gold for Dark, Sovereign Emerald for Light */}
        {isDark ? (
          <linearGradient id={letterGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3D4" />
            <stop offset="22%" stopColor="#E5C270" />
            <stop offset="55%" stopColor="#B8892D" />
            <stop offset="82%" stopColor="#DEB75D" />
            <stop offset="100%" stopColor="#7A520E" />
          </linearGradient>
        ) : (
          <linearGradient id={letterGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E3328" />
            <stop offset="40%" stopColor="#09251D" />
            <stop offset="100%" stopColor="#051712" />
          </linearGradient>
        )}

        {/* 3D Ribbon Drop Shadow */}
        <filter id={ribbonDepthId} x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow
            dx="1.8"
            dy="3.6"
            stdDeviation="2.4"
            floodColor="#020C08"
            floodOpacity={isDark ? 0.6 : 0.42}
          />
        </filter>
      </defs>

      <g transform="translate(10, 10)">
        {/* ==================== LETTER Z (Classical Roman Serif) ==================== */}
        {/* Top Horizontal Bar + Left Bracket Head Serif */}
        <path
          d="M 12 40 
             C 10 32, 14 24, 24 22 
             L 98 22 
             C 104 22, 107 25, 107 30 
             L 107 36 
             L 54 36 
             C 46 36, 42 34, 38 31 
             C 32 37, 25 41, 16 41 
             L 12 40 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* Main Diagonal Stem of Z */}
        <path
          d="M 98 22 
             L 105 22 
             L 105 32 
             L 44 126 
             L 98 126 
             L 98 136 
             L 8 136 
             L 8 128 
             L 72 32 
             L 54 32 
             L 98 22 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* Bottom Horizontal Bar + Upright Tail Serif */}
        <path
          d="M 8 128 
             L 8 138 
             L 104 138 
             C 106 138, 108 136, 108 132 
             L 108 116 
             L 101 116 
             L 101 128 
             L 44 128 
             L 8 128 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* ==================== LETTER K ==================== */}
        {/* Vertical Column of K */}
        <path
          d="M 116 22 L 132 22 L 132 138 L 116 138 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* Top Bilateral Serif of K Column */}
        <path
          d="M 108 22 L 140 22 L 140 28 C 136 28, 132 30, 132 34 L 116 34 C 116 30, 112 28, 108 28 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* Bottom Bilateral Serif of K Column */}
        <path
          d="M 108 138 L 140 138 L 140 132 C 136 132, 132 130, 132 126 L 116 126 C 116 130, 112 132, 108 132 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* Upper Diagonal Arm of K */}
        <path
          d="M 128 78 L 178 22 L 196 22 L 142 84 Z"
          fill={`url(#${letterGradId})`}
        />
        {/* Upper Arm Top Serif */}
        <path
          d="M 174 22 L 202 22 L 202 28 C 196 28, 192 31, 189 36 L 178 22 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* Lower Leg of K (Base geometry supporting the golden flourish) */}
        <path
          d="M 134 76 
             C 142 76, 152 86, 162 100 
             L 186 136 
             L 204 136 
             L 174 94 
             C 164 82, 152 72, 140 72 Z"
          fill={`url(#${letterGradId})`}
        />

        {/* ==================== SIGNATURE 3D GOLDEN RIBBON ==================== */}
        {/* Dynamic sweeping arc crossing over Z, passing through K,
             and terminating in a sharp calligraphic flourish on the right */}
        <path
          d="M -2 108
             C 12 76, 42 50, 84 52
             C 118 54, 150 74, 172 102
             C 190 124, 212 136, 232 134
             C 210 138, 188 126, 166 102
             C 140 74, 112 60, 80 58
             C 46 56, 18 78, -2 108 Z"
          fill={`url(#${goldRibbonId})`}
          filter={`url(#${ribbonDepthId})`}
        />

        {/* Upper luminous highlight rim along the crest of the ribbon */}
        <path
          d="M 4 102
             C 16 74, 44 52, 84 54
             C 116 56, 148 76, 170 102
             C 184 120, 202 130, 224 133
             C 206 131, 188 122, 172 104
             C 150 78, 118 59, 84 57
             C 46 55, 20 74, 4 102 Z"
          fill={`url(#${ribbonHighlightId})`}
        />
      </g>
    </svg>
  );

  if (variant === 'monogram') {
    return <div className={`inline-flex shrink-0 items-center justify-center ${className}`}>{MonogramSvg}</div>;
  }

  if (variant === 'crest') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {MonogramSvg}
        <div className="mt-3">
          <h2
            className={`font-cinzel text-xl sm:text-2xl font-bold tracking-[0.24em] uppercase ${
              isDark ? 'text-ivory-500' : 'text-emerald-950'
            }`}
          >
            Zeenat Kureshi
          </h2>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 sm:w-12 bg-gold-600/70" />
            <span
              className={`font-label text-2xs sm:text-xs font-semibold uppercase tracking-[0.24em] ${
                isDark ? 'text-gold-400' : 'text-gold-700'
              }`}
            >
              {subtitle || 'People | Partnerships | Progress'}
            </span>
            <span className="h-px w-8 sm:w-12 bg-gold-600/70" />
          </div>
        </div>
      </div>
    );
  }

  // Horizontal lockup (ideal for headers and cards)
  return (
    <div className={`flex items-center gap-3 min-w-0 ${className}`}>
      {MonogramSvg}
      <div className="flex flex-col min-w-0">
        <span
          className={`font-cinzel text-base sm:text-lg lg:text-xl font-bold uppercase tracking-[0.16em] leading-tight transition-colors truncate ${
            isDark ? 'text-ivory-500 group-hover:text-gold-400' : 'text-emerald-950 group-hover:text-gold-700'
          }`}
        >
          H.E. Zeenat Kureshi
        </span>
        <span
          className={`font-label text-2xs sm:text-xs font-semibold uppercase tracking-[0.18em] transition-colors truncate ${
            isDark ? 'text-gold-400/90' : 'text-gold-700'
          }`}
        >
          {subtitle || 'Trade Commissioner • GCC'}
        </span>
      </div>
    </div>
  );
};

/**
 * Official Premium Navbar Brand Logo Lockup
 * Seamlessly integrates the new authentic ZK brand identity:
 * - Natural unboxed monogram emblem that breathes harmoniously in the navbar
 * - Dignified Roman Serif typography (Cinzel) with generous royal letterspacing
 * - Refined golden diplomatic subtitle matching the official brand motto
 * - Proportional fluid scaling across all screens with zero layout shift
 */
export interface NavbarBrandLogoProps {
  subtitle?: string;
  isScrolled?: boolean;
  /** Sitting on a dark photograph: use the gold monogram and a light gold subtitle. */
  onDark?: boolean;
}

export const NavbarBrandLogo: React.FC<NavbarBrandLogoProps> = ({
  subtitle = 'Trade Commissioner • GCC & India',
  onDark = false,
}) => {
  const { theme: siteTheme } = useTheme();
  const theme = onDark ? 'dark' : siteTheme;
  return (
    <div
      role="banner"
      aria-label="H.E. Zeenat Kureshi Official Brand Logo"
      title="H.E. Zeenat Kureshi — Trade Commissioner GCC & India"
      itemScope
      itemType="https://schema.org/Person"
      className="relative flex items-center gap-2.5 sm:gap-3.5 select-none cursor-pointer py-1 min-w-0"
    >
      <meta itemProp="name" content="H.E. Zeenat Kureshi" />
      <meta itemProp="jobTitle" content="Trade Commissioner — GCC & India" />
      <meta itemProp="honorificPrefix" content="Her Excellency" />

      {/* High-Resolution Monogram Emblem: Unboxed, pure, seamless integration with rock-solid fixed dimensions to prevent layout jumps on scroll */}
      <div className="relative shrink-0 flex items-center justify-center h-9 w-11 xs:h-10 xs:w-12 sm:h-11 sm:w-13">
        <BrandMark
          theme={theme}
          size={44}
          className="h-full w-full drop-shadow-[0_2px_8px_rgba(12,43,34,0.1)] transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      {/* Official Typographic Brand Lockup in Classical Luxury Serif (Cinzel).
          Sized with clamp() so the nameplate itself never needs to be hidden --
          only the secondary tagline drops away on the very smallest screens --
          keeping the navbar identity intact without crowding the hero below it. */}
      <div className="flex flex-col justify-center min-w-0">
        {/* Primary Stately Nameplate */}
        <div className="flex items-baseline min-w-0">
          <span
            itemProp="alternateName"
            className="font-cinzel font-bold uppercase tracking-[0.1em] xs:tracking-[0.14em] sm:tracking-[0.18em] text-ink-heading leading-none truncate transition-colors duration-200 group-hover:text-gold-800 text-[clamp(0.78rem,2.4vw+0.35rem,1.16rem)]"
          >
            H.E. Zeenat Kureshi
          </span>
        </div>

        {/* Diplomatic Subtitle with Delicate Gold Styling -- hidden below the
            xs breakpoint (400px) so narrow phones show a clean single-line
            logo instead of two competing lines of text. */}
        <div className="mt-0.5 xs:mt-1 hidden xs:flex items-center gap-1.5 min-w-0">
          <span className="h-1 w-1 rounded-full bg-gold-600/90 shrink-0" />
          <span
            itemProp="description"
            className={`font-label font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] leading-none truncate text-[0.58rem] sm:text-[0.66rem] lg:text-[0.7rem] ${onDark ? 'text-gold-300' : 'text-[#8A6920]'}`}
          >
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};
