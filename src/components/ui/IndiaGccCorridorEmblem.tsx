import React from 'react';

interface IndiaGccCorridorEmblemProps {
  className?: string;
  size?: number | string;
}

export const IndiaGccCorridorEmblem: React.FC<IndiaGccCorridorEmblemProps> = ({
  className = 'h-10 w-auto sm:h-12',
}) => {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="India-GCC Economic Growth Corridor"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D77F" />
          <stop offset="50%" stopColor="#D4A359" />
          <stop offset="100%" stopColor="#8A6920" />
        </linearGradient>

        <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5CE1E6" />
          <stop offset="100%" stopColor="#0097B2" />
        </linearGradient>

        <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#A9812A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#E6BD65" stopOpacity="0.85" />
        </linearGradient>

        <radialGradient id="centerAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#D4A359" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central Soft Ambient Glow */}
      <circle cx="80" cy="60" r="45" fill="url(#centerAura)" />

      {/* ══ INDIA MAP SILHOUETTE (Precision Stylized Coordinates) ══ */}
      <path
        d="M80 16 
           C84 20, 87 23, 86 26
           C88 28, 93 30, 96 33
           C100 35, 105 38, 103 42
           C100 45, 96 46, 94 48
           C93 51, 95 55, 96 59
           C97 64, 95 68, 91 73
           C88 77, 85 82, 82 88
           C81 92, 80 95, 79 98
           C78 95, 77 92, 75 87
           C72 82, 69 77, 68 72
           C66 67, 65 62, 67 58
           C65 54, 63 50, 64 46
           C63 41, 67 36, 71 33
           C73 29, 76 24, 78 18
           Z"
        fill="#071913"
        stroke="#D4A359"
        strokeWidth="1.2"
        strokeOpacity="0.65"
        strokeLinejoin="round"
      />

      {/* Circuit Network Traces across the Subcontinent */}
      <g stroke="#C79A3D" strokeWidth="0.75" strokeOpacity="0.55">
        <line x1="80" y1="22" x2="80" y2="40" />
        <line x1="80" y1="40" x2="72" y2="48" />
        <line x1="80" y1="40" x2="88" y2="48" />
        <line x1="72" y1="48" x2="72" y2="65" />
        <line x1="88" y1="48" x2="88" y2="65" />
        <line x1="72" y1="65" x2="80" y2="78" />
        <line x1="88" y1="65" x2="80" y2="78" />
        <line x1="80" y1="78" x2="79" y2="94" />

        {/* Diagonal Cross Corridors */}
        <line x1="72" y1="48" x2="88" y2="65" strokeDasharray="1.5,1.5" />
        <line x1="88" y1="48" x2="72" y2="65" strokeDasharray="1.5,1.5" />
      </g>

      {/* ══ ECONOMIC GROWTH CHARTS (Left & Right Ascending Pillars) ══ */}
      {/* Left Pillars */}
      <rect x="42" y="74" width="5" height="14" rx="1" fill="url(#barGradient)" stroke="#C79A3D" strokeWidth="0.5" />
      <rect x="49" y="66" width="5" height="22" rx="1" fill="url(#barGradient)" stroke="#C79A3D" strokeWidth="0.5" />
      <rect x="56" y="58" width="5" height="30" rx="1" fill="url(#barGradient)" stroke="#C79A3D" strokeWidth="0.5" />

      {/* Right Pillars */}
      <rect x="99" y="52" width="5" height="36" rx="1" fill="url(#barGradient)" stroke="#C79A3D" strokeWidth="0.5" />
      <rect x="106" y="44" width="5" height="44" rx="1" fill="url(#barGradient)" stroke="#C79A3D" strokeWidth="0.5" />
      <rect x="113" y="34" width="5" height="54" rx="1" fill="url(#barGradient)" stroke="#C79A3D" strokeWidth="0.5" />

      {/* Ascending Trendline with Growth Arrow */}
      <path
        d="M38 78 L58 56 L94 48 L118 26"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#goldGlow)"
      />
      {/* Arrowhead */}
      <polygon
        points="118,20 123,28 114,27"
        fill="#F5D77F"
        filter="url(#goldGlow)"
      />

      {/* ══ SATELLITE CURRENCY & GLOBAL TRADE NODES ══ */}
      {/* Node 1: $ (USD / Sovereign Fund) */}
      <g transform="translate(80, 102)">
        <circle cx="0" cy="0" r="6" fill="#0C221C" stroke="#D4A359" strokeWidth="1" />
        <text x="0" y="2.5" fill="#F5D77F" fontSize="6.5" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold" textAnchor="middle">$</text>
      </g>
      <line x1="80" y1="96" x2="80" y2="98" stroke="#D4A359" strokeWidth="0.75" />

      {/* Node 2: € (Euro / Global Commerce) */}
      <g transform="translate(112, 80)">
        <circle cx="0" cy="0" r="6" fill="#0C221C" stroke="#D4A359" strokeWidth="1" />
        <text x="0" y="2.5" fill="#F5D77F" fontSize="6.5" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold" textAnchor="middle">€</text>
      </g>
      <line x1="94" y1="72" x2="106" y2="78" stroke="#D4A359" strokeWidth="0.75" strokeDasharray="1.5,1.5" />

      {/* Node 3: Trade / Finance Hub */}
      <g transform="translate(48, 80)">
        <circle cx="0" cy="0" r="6" fill="#0C221C" stroke="#D4A359" strokeWidth="1" />
        <text x="0" y="2.5" fill="#F5D77F" fontSize="5.5" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="bold" textAnchor="middle">₹</text>
      </g>
      <line x1="66" y1="72" x2="54" y2="78" stroke="#D4A359" strokeWidth="0.75" strokeDasharray="1.5,1.5" />

      {/* Node 4: Global Network Top-Left */}
      <g transform="translate(48, 38)">
        <circle cx="0" cy="0" r="5" fill="#0C221C" stroke="#5CE1E6" strokeWidth="0.9" />
        <circle cx="0" cy="0" r="2" fill="#5CE1E6" />
      </g>
      <line x1="53" y1="40" x2="68" y2="44" stroke="#5CE1E6" strokeWidth="0.75" strokeOpacity="0.6" strokeDasharray="1.5,1.5" />

      {/* Node 5: Sovereign Capital Top-Right */}
      <g transform="translate(112, 38)">
        <circle cx="0" cy="0" r="5" fill="#0C221C" stroke="#5CE1E6" strokeWidth="0.9" />
        <circle cx="0" cy="0" r="2" fill="#5CE1E6" />
      </g>
      <line x1="107" y1="40" x2="94" y2="44" stroke="#5CE1E6" strokeWidth="0.75" strokeOpacity="0.6" strokeDasharray="1.5,1.5" />

      {/* ══ CENTRAL HIGH-TECH GCC CORRIDOR EMBLEM ══ */}
      <g transform="translate(80, 56)">
        {/* Outer Rotating Gear Ring Pattern */}
        <circle cx="0" cy="0" r="17" stroke="#0097B2" strokeWidth="1" strokeDasharray="3,2" />
        <circle cx="0" cy="0" r="14.5" stroke="url(#cyanGradient)" strokeWidth="1.6" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="13" fill="#071511" stroke="#D4A359" strokeWidth="0.75" />

        {/* Upward Chevron Arrow inside top of circle */}
        <path d="M-4 -6 L0 -10 L4 -6" stroke="#5CE1E6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* "GCC" Main Emblem Text */}
        <text
          x="0"
          y="0.5"
          fill="#FFFFFF"
          fontSize="7"
          fontFamily="Cinzel, Playfair Display, serif"
          fontWeight="800"
          letterSpacing="0.08em"
          textAnchor="middle"
          filter="url(#cyanGlow)"
        >
          GCC
        </text>

        {/* Small Bottom Mechanical / Economic Cogs */}
        <g stroke="#D4A359" strokeWidth="0.75" fill="none">
          <circle cx="0" cy="6.5" r="2" />
          <line x1="-3" y1="6.5" x2="3" y2="6.5" />
          <line x1="0" y1="3.5" x2="0" y2="9.5" />
        </g>
      </g>
    </svg>
  );
};
