import React from 'react';

interface IndiaMajesticFlagProps {
  className?: string;
}

export const IndiaMajesticFlag: React.FC<IndiaMajesticFlagProps> = ({
  className = 'h-8 sm:h-10 w-auto',
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 420 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-label="Majestic Flowing Indian National Flag"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="kesariGlow" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FF5722" stopOpacity="0" />
            <stop offset="15%" stopColor="#FF6D00" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF9933" stopOpacity="1" />
            <stop offset="85%" stopColor="#FFB74D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="kesariFlame" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E65100" stopOpacity="0" />
            <stop offset="20%" stopColor="#FF5722" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF9933" stopOpacity="1" />
            <stop offset="80%" stopColor="#FFB74D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFA726" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="whiteSilk" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="15%" stopColor="#ECEFF1" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="85%" stopColor="#F5F5F5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="greenSilk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B6623" stopOpacity="0" />
            <stop offset="15%" stopColor="#138808" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#2E7D32" stopOpacity="1" />
            <stop offset="85%" stopColor="#43A047" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#053B11" stopOpacity="0" />
          </linearGradient>

          {/* Filters for Smoke and Silk Softness */}
          <filter id="silkBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="chakraGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ══ 1. TOP SAFFRON / KESARI FLOWING SILK & SMOKE ══ */}
        {/* Ambient background saffron aura */}
        <path
          d="M20 62 
             C70 28, 140 18, 210 38 
             C280 58, 350 24, 400 52 
             C350 78, 280 54, 210 66 
             C140 78, 70 70, 20 62 Z"
          fill="url(#kesariGlow)"
          filter="url(#silkBlur)"
        />

        {/* Saffron Primary Wave Folds */}
        <path
          d="M30 68 
             C75 35, 125 22, 175 36 
             C225 50, 275 26, 325 38 
             C365 48, 385 36, 395 56 
             C360 74, 320 58, 280 68 
             C235 78, 190 62, 145 70 
             C100 78, 60 76, 30 68 Z"
          fill="url(#kesariFlame)"
        />

        {/* Upper Saffron Flame Wisps */}
        <path
          d="M60 45 C110 20, 160 28, 210 18 C260 8, 310 24, 360 35"
          stroke="#FFB74D"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.8"
          filter="url(#silkBlur)"
        />

        {/* ══ 2. MIDDLE BILLOWING WHITE SILK ══ */}
        <path
          d="M25 88 
             C65 72, 110 66, 155 78 
             C200 90, 245 74, 290 82 
             C335 90, 375 76, 395 86 
             C375 116, 335 104, 290 114 
             C240 126, 190 110, 140 120 
             C90 130, 50 114, 25 88 Z"
          fill="url(#whiteSilk)"
          filter="url(#silkBlur)"
        />

        {/* White silk highlight crests */}
        <path
          d="M55 92 C105 82, 155 96, 205 86 C255 76, 305 92, 365 84"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.9"
          filter="url(#silkBlur)"
        />

        {/* ══ 3. BOTTOM RICH EMERALD GREEN FLOW ══ */}
        <path
          d="M20 112 
             C65 120, 110 110, 155 122 
             C200 134, 245 118, 290 128 
             C335 138, 370 122, 400 132 
             C370 162, 330 150, 285 158 
             C235 168, 185 152, 135 162 
             C85 170, 45 152, 20 112 Z"
          fill="url(#greenSilk)"
          filter="url(#silkBlur)"
        />

        <path
          d="M40 122 
             C85 130, 130 120, 175 132 
             C220 144, 265 128, 310 136 
             C350 144, 375 134, 385 142 
             C355 166, 315 156, 275 162 
             C225 170, 180 156, 135 164 
             C90 170, 60 156, 40 122 Z"
          fill="#138808"
          opacity="0.9"
        />

        {/* Bottom Green Ambient Wisps */}
        <path
          d="M60 142 C120 155, 190 145, 250 160 C310 175, 360 150, 380 158"
          stroke="#4CAF50"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.75"
          filter="url(#silkBlur)"
        />

        {/* ══ 4. CENTRAL ASHOKA CHAKRA (NAVY BLUE 24 SPOKES) ══ */}
        <g transform="translate(210, 96)">
          {/* Subtle Outer Navy Glow */}
          <circle cx="0" cy="0" r="23" fill="#000080" opacity="0.12" filter="url(#chakraGlow)" />

          {/* Outer Wheel Rings */}
          <circle cx="0" cy="0" r="20" stroke="#000080" strokeWidth="2.4" fill="none" />
          <circle cx="0" cy="0" r="18" stroke="#061A66" strokeWidth="0.8" fill="none" />

          {/* Central Hub */}
          <circle cx="0" cy="0" r="4.2" fill="#000080" />
          <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />

          {/* 24 Precision Spokes */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <g key={i} transform={`rotate(${angle})`}>
                <line
                  x1="0"
                  y1="3.8"
                  x2="0"
                  y2="18"
                  stroke="#000080"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="17" r="0.75" fill="#000080" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
