import fs from 'fs';
import sharp from 'sharp';

/**
 * Generates the authentic Zeenat Kureshi Brand Monogram SVG.
 * Strictly matching the uploaded official brand assets:
 * - High-contrast Roman Serif 'Z' with bracketed head & foot serifs
 * - Stately 'K' with vertical stem, upper serif arm, and integrated lower swoosh
 * - Dynamic 3D metallic golden ribbon flourish crossing gracefully over Z and flourishing through K
 * - Light theme: Imperial Emerald (#0A271E) letterforms + 3D brushed metallic gold ribbon
 * - Dark theme: Sculpted brushed gold (#E8C576) letterforms with golden bevels + gold ribbon
 */
export function getMonogramSvg({ theme = 'light', width = 300, height = 220 }) {
  const isDark = theme === 'dark';
  const idPrefix = isDark ? 'dark' : 'light';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 190" width="${width}" height="${height}">
  <defs>
    <!-- Multi-stop Realistic Metallic Gold Gradient for 3D Ribbon -->
    <linearGradient id="${idPrefix}GoldRibbon" x1="5%" y1="15%" x2="95%" y2="85%">
      <stop offset="0%" stop-color="#FFF5DC" />
      <stop offset="12%" stop-color="#F2D68C" />
      <stop offset="28%" stop-color="#DFB556" />
      <stop offset="52%" stop-color="#B88726" />
      <stop offset="74%" stop-color="#DCB253" />
      <stop offset="88%" stop-color="#9C6F19" />
      <stop offset="100%" stop-color="#6E4A0C" />
    </linearGradient>

    <!-- Ribbon Highlight Edge Gradient -->
    <linearGradient id="${idPrefix}RibbonHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
      <stop offset="30%" stop-color="#FFF7E2" stop-opacity="0.6" />
      <stop offset="70%" stop-color="#E5C16C" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#B88726" stop-opacity="0.0" />
    </linearGradient>

    <!-- Letterform Gradient: Imperial Sovereign Emerald for Light, Sculpted Gold for Dark -->
    ${
      isDark
        ? `<linearGradient id="${idPrefix}LetterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stop-color="#FFF3D4" />
             <stop offset="22%" stop-color="#E5C270" />
             <stop offset="55%" stop-color="#B8892D" />
             <stop offset="82%" stop-color="#DEB75D" />
             <stop offset="100%" stop-color="#7A520E" />
           </linearGradient>`
        : `<linearGradient id="${idPrefix}LetterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stop-color="#0E3328" />
             <stop offset="40%" stop-color="#09251D" />
             <stop offset="100%" stop-color="#051712" />
           </linearGradient>`
    }

    <!-- 3D Ribbon Drop Shadow -->
    <filter id="${idPrefix}RibbonShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="2" dy="4" stdDeviation="2.5" flood-color="#020C08" flood-opacity="${isDark ? '0.6' : '0.42'}" />
    </filter>

    <!-- Bevel highlight filter for dark theme letterforms -->
    ${
      isDark
        ? `<filter id="${idPrefix}Glow" x="-10%" y="-10%" width="120%" height="120%">
             <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#FFF2CE" flood-opacity="0.25" />
           </filter>`
        : ''
    }
  </defs>

  <g transform="translate(16, 15)">
    <!-- ==================== LETTER Z (Classical Roman Serif) ==================== -->
    <!-- Top Horizontal Bar + Left Bracket Serif + Right Corner Point -->
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
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- Main Diagonal Stem of Z -->
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
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- Bottom Horizontal Bar + Bottom Right Upright Serif -->
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
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- ==================== LETTER K ==================== -->
    <!-- Vertical Column of K -->
    <path
      d="M 116 22 L 132 22 L 132 138 L 116 138 Z"
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- Top Bilateral Serif of K Column -->
    <path
      d="M 108 22 L 140 22 L 140 28 C 136 28, 132 30, 132 34 L 116 34 C 116 30, 112 28, 108 28 Z"
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- Bottom Bilateral Serif of K Column -->
    <path
      d="M 108 138 L 140 138 L 140 132 C 136 132, 132 130, 132 126 L 116 126 C 116 130, 112 132, 108 132 Z"
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- Upper Diagonal Arm of K -->
    <path
      d="M 128 78 L 178 22 L 196 22 L 142 84 Z"
      fill="url(#${idPrefix}LetterGrad)"
    />
    <!-- Upper Arm Top Serif -->
    <path
      d="M 174 22 L 202 22 L 202 28 C 196 28, 192 31, 189 36 L 178 22 Z"
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- Lower Leg of K (Base emerald geometry under golden swoosh) -->
    <path
      d="M 134 76 
         C 142 76, 152 86, 162 100 
         L 186 136 
         L 204 136 
         L 174 94 
         C 164 82, 152 72, 140 72 Z"
      fill="url(#${idPrefix}LetterGrad)"
    />

    <!-- ==================== SIGNATURE 3D GOLDEN RIBBON ==================== -->
    <!-- Sweeps from lower-left of Z, arches majestically over Z's diagonal,
         crosses through K, and forms the flourishing calligraphic lower leg of K -->
    <path
      d="M -2 108
         C 12 76, 42 50, 84 52
         C 118 54, 150 74, 172 102
         C 190 124, 212 136, 232 134
         C 210 138, 188 126, 166 102
         C 140 74, 112 60, 80 58
         C 46 56, 18 78, -2 108 Z"
      fill="url(#${idPrefix}GoldRibbon)"
      filter="url(#${idPrefix}RibbonShadow)"
    />

    <!-- Upper luminous highlight rim along the crest of the ribbon -->
    <path
      d="M 4 102
         C 16 74, 44 52, 84 54
         C 116 56, 148 76, 170 102
         C 184 120, 202 130, 224 133
         C 206 131, 188 122, 172 104
         C 150 78, 118 59, 84 57
         C 46 55, 20 74, 4 102 Z"
      fill="url(#${idPrefix}RibbonHighlight)"
    />
  </g>
</svg>`;
}

/**
 * Generates the full horizontal & vertical lockups for Zeenat Kureshi.
 */
export function getFullLogoSvg({ theme = 'light', width = 600, height = 320 }) {
  const isDark = theme === 'dark';
  const bgFill = isDark ? '#08231C' : '#FAF8F4';
  const textColor = isDark ? '#F4DFAC' : '#07261E';
  const mottoColor = isDark ? '#D9B45C' : '#8A6920';
  const ruleColor = '#C79A3D';

  const monogram = getMonogramSvg({ theme, width: 260, height: 190 });
  const innerMonogram = monogram.match(/<g transform="translate\(16, 15\)">([\s\S]*?)<\/g>/)?.[1] || '';
  const defsContent = monogram.match(/<defs>([\s\S]*?)<\/defs>/)?.[1] || '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" width="${width}" height="${height}">
  <defs>
    ${defsContent}
    <style>
      .brand-title {
        font-family: 'Cinzel', 'Fraunces', Georgia, serif;
        font-weight: 700;
        letter-spacing: 0.24em;
      }
      .brand-motto {
        font-family: 'Manrope', system-ui, sans-serif;
        font-weight: 600;
        letter-spacing: 0.28em;
        font-size: 11px;
      }
    </style>
  </defs>

  <rect width="600" height="320" fill="${bgFill}" rx="16" />

  <!-- Centered Monogram -->
  <g transform="translate(185, 22)">
    ${innerMonogram}
  </g>

  <!-- Title: ZEENAT KURESHI in Classical Luxury Roman Serif -->
  <text x="300" y="240" text-anchor="middle" class="brand-title" font-size="28" fill="${textColor}">
    ZEENAT KURESHI
  </text>

  <!-- Motto: —— PEOPLE | PARTNERSHIPS | PROGRESS —— -->
  <g transform="translate(0, 272)">
    <line x1="90" y1="-4" x2="160" y2="-4" stroke="${ruleColor}" stroke-width="1.2" stroke-opacity="0.8" />
    <text x="300" y="0" text-anchor="middle" class="brand-motto" fill="${mottoColor}">
      PEOPLE &#160;|&#160; PARTNERSHIPS &#160;|&#160; PROGRESS
    </text>
    <line x1="440" y1="-4" x2="510" y2="-4" stroke="${ruleColor}" stroke-width="1.2" stroke-opacity="0.8" />
  </g>
</svg>`;
}

async function buildAll() {
  console.log('Generating brand assets...');

  const lightMono = getMonogramSvg({ theme: 'light', width: 300, height: 220 });
  const darkMono = getMonogramSvg({ theme: 'dark', width: 300, height: 220 });
  const lightFull = getFullLogoSvg({ theme: 'light', width: 600, height: 320 });
  const darkFull = getFullLogoSvg({ theme: 'dark', width: 600, height: 320 });

  fs.writeFileSync('public/brand/monogram-light.svg', lightMono);
  fs.writeFileSync('public/brand/monogram-dark.svg', darkMono);
  fs.writeFileSync('public/brand/logo-light.svg', lightFull);
  fs.writeFileSync('public/brand/logo-dark.svg', darkFull);

  // Favicon (High contrast on emerald round-rect)
  const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="#07221A" />
  <rect x="4" y="4" width="120" height="120" rx="24" fill="none" stroke="#C79A3D" stroke-width="2" stroke-opacity="0.6" />
  <g transform="translate(-16, -10) scale(0.68)">
    ${lightMono.match(/<g transform="translate\(16, 15\)">([\s\S]*?)<\/g>/)?.[1]
      .replace(/fill="url\(#lightLetterGrad\)"/g, 'fill="url(#darkLetterGrad)"')
    }
  </g>
  <defs>
    <linearGradient id="darkLetterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3D4" />
      <stop offset="25%" stop-color="#E5C270" />
      <stop offset="60%" stop-color="#BA8B30" />
      <stop offset="100%" stop-color="#785310" />
    </linearGradient>
    <linearGradient id="lightGoldRibbon" x1="5%" y1="15%" x2="95%" y2="85%">
      <stop offset="0%" stop-color="#FFF5DC" />
      <stop offset="20%" stop-color="#F2D68C" />
      <stop offset="50%" stop-color="#DFB556" />
      <stop offset="75%" stop-color="#BA8B30" />
      <stop offset="100%" stop-color="#6E4A0C" />
    </linearGradient>
    <filter id="lightRibbonShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="1.5" dy="2.5" stdDeviation="2" flood-color="#020806" flood-opacity="0.7" />
    </filter>
  </defs>
</svg>`;
  fs.writeFileSync('public/favicon.svg', faviconSvg);

  // Render raster versions with sharp
  await sharp(Buffer.from(lightFull)).png().toFile('public/brand/logo-light.png');
  await sharp(Buffer.from(darkFull)).png().toFile('public/brand/logo-dark.png');
  await sharp(Buffer.from(lightFull)).webp({ quality: 95 }).toFile('public/brand/logo-light.webp');
  await sharp(Buffer.from(darkFull)).webp({ quality: 95 }).toFile('public/brand/logo-dark.webp');

  await sharp(Buffer.from(lightMono)).png().toFile('public/brand/monogram-light.png');
  await sharp(Buffer.from(darkMono)).png().toFile('public/brand/monogram-dark.png');
  await sharp(Buffer.from(lightMono)).webp({ quality: 95 }).toFile('public/brand/monogram-light.webp');
  await sharp(Buffer.from(darkMono)).webp({ quality: 95 }).toFile('public/brand/monogram-dark.webp');

  console.log('Successfully regenerated all brand vector and raster assets!');
}

buildAll().catch(console.error);
