import React from 'react';

interface IndiaGccLandscapeReportProps {
  className?: string;
}

export const IndiaGccLandscapeReportEmblem: React.FC<IndiaGccLandscapeReportProps> = ({
  className = 'h-16 w-auto sm:h-20',
}) => {
  return (
    <div className={`relative flex flex-col items-center group cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_20px_rgba(212,163,89,0.25)] rounded-xl overflow-hidden"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="globeAtmosphere" cx="70%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFE8A3" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#E5A83B" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#418D78" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#0B2720" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#05130F" stopOpacity="1" />
          </radialGradient>

          <radialGradient id="spaceAura" cx="65%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#3FA28A" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#12332B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#071511" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="60%" stopColor="#E6BD65" />
            <stop offset="100%" stopColor="#C79A3D" />
          </linearGradient>

          <linearGradient id="coralAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7666" />
            <stop offset="100%" stopColor="#E55342" />
          </linearGradient>

          <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDE8A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0C221C" stopOpacity="0" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ══ DEEP SPACE / COSMIC BACKGROUND ══ */}
        <rect width="320" height="200" fill="url(#spaceAura)" rx="12" />
        <rect width="320" height="200" stroke="#C79A3D" strokeWidth="1.2" strokeOpacity="0.35" rx="12" fill="none" />

        {/* Distant Stars */}
        <g fill="#FFF" opacity="0.6">
          <circle cx="25" cy="30" r="0.8" />
          <circle cx="65" cy="18" r="1.2" opacity="0.8" />
          <circle cx="110" cy="45" r="0.6" />
          <circle cx="40" cy="85" r="0.7" />
          <circle cx="85" cy="95" r="1" />
          <circle cx="150" cy="20" r="0.9" />
          <circle cx="280" cy="15" r="1.1" />
        </g>

        {/* ══ THE ILLUMINATED EARTH GLOBE (India & GCC Horizon) ══ */}
        <g transform="translate(140, -10)">
          {/* Atmospheric Glow Ring */}
          <circle cx="95" cy="85" r="92" fill="none" stroke="#FFE394" strokeWidth="2.5" opacity="0.7" filter="url(#softGlow)" />
          <circle cx="95" cy="85" r="90" fill="url(#globeAtmosphere)" />

          {/* Continents: India, Arabian Peninsula, Middle East & Africa Silhouette */}
          {/* Arabian Peninsula & Gulf */}
          <path
            d="M50 70 Q60 65 72 75 Q78 88 74 98 Q66 102 56 94 Q50 82 50 70 Z"
            fill="#D4A359"
            opacity="0.85"
          />
          {/* Indian Subcontinent */}
          <path
            d="M92 72 Q102 68 114 74 Q120 86 112 104 Q104 118 98 126 Q94 118 90 102 Q86 86 92 72 Z"
            fill="#FFE8A3"
            opacity="0.95"
            filter="url(#softGlow)"
          />
          {/* East Asia / Sri Lanka / Coastal Archipelago */}
          <circle cx="102" cy="132" r="2.5" fill="#FFE8A3" opacity="0.9" />
          <path d="M125 78 Q140 82 148 98 Q142 112 130 108 Z" fill="#D4A359" opacity="0.75" />

          {/* Golden Radiant Sunrise Arch */}
          <path
            d="M10 85 A88 88 0 0 1 180 85"
            stroke="#FFF4CC"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
            filter="url(#softGlow)"
          />
        </g>

        {/* ══ AUDIENCE SILHOUETTE (Base of the Report) ══ */}
        <g fill="#061612">
          <ellipse cx="160" cy="205" rx="160" ry="40" />
          {/* Human Profiles looking up at the Global Horizon */}
          <circle cx="35" cy="162" r="7" />
          <path d="M22 195 C22 178, 48 178, 48 195 Z" />

          <circle cx="65" cy="158" r="8" />
          <path d="M50 195 C50 174, 80 174, 80 195 Z" />

          <circle cx="100" cy="154" r="9" />
          <path d="M82 195 C82 170, 118 170, 118 195 Z" />

          <circle cx="135" cy="152" r="8.5" />
          <path d="M118 195 C118 168, 152 168, 152 195 Z" />

          <circle cx="170" cy="150" r="9" />
          <path d="M152 195 C152 166, 188 166, 188 195 Z" />

          <circle cx="205" cy="153" r="8" />
          <path d="M188 195 C188 169, 222 169, 222 195 Z" />

          <circle cx="240" cy="156" r="8.5" />
          <path d="M222 195 C222 172, 258 172, 258 195 Z" />

          <circle cx="275" cy="160" r="7.5" />
          <path d="M260 195 C260 176, 290 176, 290 195 Z" />

          <circle cx="305" cy="164" r="7" />
          <path d="M292 195 C292 180, 318 180, 318 195 Z" />
        </g>

        {/* ══ REPORT TITLE & CITATION OVERLAY (Editorial Layout) ══ */}
        {/* Partner Branding Badges */}
        <g transform="translate(18, 22)">
          {/* nasscom pill */}
          <text x="0" y="8" fill="#FFFFFF" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" letterSpacing="0.05em">
            nasscom
          </text>
          {/* zinnov badge */}
          <g transform="translate(62, -2)">
            <rect width="46" height="13" rx="3" fill="#0084B4" opacity="0.9" />
            <text x="23" y="9.5" fill="#FFFFFF" fontSize="7.5" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold" textAnchor="middle">
              zinnov
            </text>
          </g>
        </g>

        {/* Main Headline */}
        <g transform="translate(18, 56)">
          <text
            x="0"
            y="0"
            fill="#FFFFFF"
            fontSize="14"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="900"
            letterSpacing="-0.01em"
          >
            INDIA GCC
          </text>
          <text
            x="0"
            y="17"
            fill="#FFFFFF"
            fontSize="14"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="900"
            letterSpacing="-0.01em"
          >
            LANDSCAPE REPORT
          </text>
          {/* Subtitle Badge */}
          <text
            x="0"
            y="33"
            fill="url(#coralAccent)"
            fontSize="8.5"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="800"
            letterSpacing="0.08em"
          >
            THE 5-YEAR JOURNEY
          </text>
        </g>

        {/* Date & Partner Tag */}
        <g transform="translate(18, 118)" opacity="0.85">
          <text x="0" y="0" fill="#E6BD65" fontSize="6.5" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold" letterSpacing="0.1em">
            SEPTEMBER 2024 &bull; SUMMARY REPORT
          </text>
        </g>
      </svg>
    </div>
  );
};
