/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 'xs' fills the gap between the default 0px and 640px (sm) steps so
      // type and spacing can settle gracefully on small phones (360-400px)
      // instead of jumping straight from mobile-base sizing to tablet sizing.
      screens: {
        xs: '400px',
      },
      colors: {
        /* Semantic surfaces + ink. These read from CSS variables defined in
           index.css, so light/dark mode is a single re-point rather than a
           dark: variant on every element. */
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          raised: 'rgb(var(--surface-raised) / <alpha-value>)',
          sunken: 'rgb(var(--surface-sunken) / <alpha-value>)',
          deep: 'rgb(var(--surface-deep) / <alpha-value>)',
          deepest: 'rgb(var(--surface-deepest) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)',
          heading: 'rgb(var(--ink-heading) / <alpha-value>)',
        },
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        emerald: {
          950: '#071511',
          900: '#0C221C',
          850: '#0E2922',
          800: '#12332B', // Primary Dark Emerald
          700: '#1A4A3E',
          600: '#236353',
          500: '#2D7F6B',
          400: '#42A890',
          300: '#75CBB7',
          100: '#D5F1EA',
          50: '#F0F9F6',
        },
        ivory: {
          900: '#D6CBBA',
          800: '#E5DCCE',
          700: '#EDE5D8',
          600: '#F4EFE6',
          500: '#FBF7F1', // Primary Warm Off-White
          400: '#FDFCFA',
          50: '#FFFFFF',
        },
        gold: {
          900: '#684F17',
          800: '#8A6920',
          700: '#A9812A',
          600: '#C79A3D', // Primary Mustard/Royal Gold
          550: '#C59B4B',
          500: '#D4A359',
          450: '#DBB06A',
          400: '#E6BD65',
          300: '#F1D28B',
          200: '#F8E6B8',
          100: '#FCF4DF',
          50: '#FEFAEF',
        },
        charcoal: {
          950: '#111312',
          900: '#1C1E1D',
          800: '#2B302E',
          700: '#3D4441',
          600: '#545C58',
          500: '#717A75',
          400: '#949E99',
          300: '#BDC4C0',
          200: '#DFE3E1',
          100: '#F0F2F1',
        }
      },
      /* Three families -- see index.html for the load comment. The tokens
         stay distinct even where two resolve to the same family, because
         they express intent: `serif` is display type, `cormorant` is the
         pull-quote voice, `label` is tracked uppercase. Keeping them named
         separately means any one of them can be re-pointed later without
         hunting through markup. */
      fontFamily: {
        // Display: H1 / H2 only. Engraved, tracked capitals.
        display: ['"Cinzel"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        // Everything below a page/section title: card titles, figures, buttons.
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        label: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cinzel: ['"Cinzel"', 'Georgia', 'serif'],
      },
      lineHeight: {
        relaxed: '1.55',
      },
      fontSize: {
        // Smallest step on the scale. Exists so eyebrows and micro-labels have
        // a token to use -- they were hardcoded as text-[10px]/text-[10.5px],
        // which silently opted them out of every future scale change.
        '3xs': ['0.68rem', { lineHeight: '0.95rem' }],    // ~11px – smallest micro-label
        '2xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        xs: ['0.8125rem', { lineHeight: '1.125rem' }],   // 13px (was 12)
        sm: ['0.9375rem', { lineHeight: '1.4rem' }],     // 15px (was 14)
        base: ['1.0625rem', { lineHeight: '1.75rem' }],  // 17px (was 16) -- editorial body
        lg: ['1.1875rem', { lineHeight: '1.85rem' }],    // 19px (was 18)
        xl: ['1.3125rem', { lineHeight: '1.9rem' }],     // 21px (was 20)
        /* Display sizes run a little larger than the step-up alone would
           suggest, to offset Cormorant's small x-height -- it reads
           visually smaller than most faces at the same pixel size. */
        '2xl': ['1.75rem', { lineHeight: '2.25rem' }],   // 28px (was 24)
        '3xl': ['2.125rem', { lineHeight: '2.5rem' }],   // 34px (was 30)
        '4xl': ['2.625rem', { lineHeight: '3rem' }],     // 42px (was 36)
        '5xl': ['3.5rem', { lineHeight: '1.05' }],       // 56px (was 48)
        '6xl': ['4.25rem', { lineHeight: '1.05' }],      // 68px (was 60)
        '7xl': ['5rem', { lineHeight: '1.05' }],         // 80px (was 72)
        '8xl': ['6.25rem', { lineHeight: '1.02' }],      // 100px (was 96)
      },
      boxShadow: {
        '2xs': '0 1px 2px rgba(0,0,0,0.07)',              // hairline lift
        'xs':  '0 1px 4px rgba(0,0,0,0.08), 0 0.5px 1px rgba(0,0,0,0.04)', // subtle
        'sm':  '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
        'luxury': '0 20px 40px -15px rgba(18, 51, 43, 0.08)',
        'luxury-lg': '0 30px 60px -20px rgba(18, 51, 43, 0.15)',
        'gold-glow': '0 0 25px rgba(199, 154, 61, 0.25)',
        'emerald-glow': '0 10px 30px rgba(18, 51, 43, 0.3)',
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C79A3D 0%, #E6BD65 50%, #C79A3D 100%)',
        'emerald-gradient': 'linear-gradient(145deg, #12332B 0%, #0C221C 100%)',
        'emerald-dark-gradient': 'linear-gradient(180deg, #0C221C 0%, #071511 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FBF7F1 0%, #F4EFE6 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'drift-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Track holds two identical copies of the list; shifting exactly -50%
        // lands copy 2 where copy 1 began, so the loop has no visible seam.
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Slow push-in used on still photography inside banners so a photo
        // never sits dead on the screen. `alternate` in the animation
        // shorthand makes it breathe in and out with no visible loop point.
        'ken-burns': {
          '0%': { transform: 'scale(1.04) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.15) translate3d(-1.6%, -1.1%, 0)' },
        },
        // A soft band of light that drifts across the hero photograph.
        'light-sweep': {
          '0%': { transform: 'translateX(-140%) skewX(-18deg)' },
          '55%, 100%': { transform: 'translateX(260%) skewX(-18deg)' },
        },
        // Gold motes rising through the hero. Horizontal drift comes from the
        // --dx custom property so each mote can take its own path.
        dust: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(0.6)', opacity: '0' },
          '15%': { opacity: '0.9' },
          '100%': { transform: 'translate3d(var(--dx, 24px), -190px, 0) scale(1)', opacity: '0' },
        },
        'ray-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.95' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        // Fills a slideshow progress bar over the slide's on-screen time.
        'progress-fill': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        // A gold dot travelling along a corridor route line.
        'route-dot': {
          '0%': { left: '0%', opacity: '0' },
          '12%, 88%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'drift-slow': 'drift-slow 90s linear infinite',
        marquee: 'marquee 38s linear infinite',
        'ken-burns': 'ken-burns 28s ease-in-out infinite alternate',
        'light-sweep': 'light-sweep 12s ease-in-out infinite',
        dust: 'dust 9s linear infinite',
        'ray-spin': 'ray-spin 140s linear infinite',
        'glow-pulse': 'glow-pulse 7s ease-in-out infinite',
        'scroll-cue': 'scroll-cue 2.2s ease-in-out infinite',
        'route-dot': 'route-dot 3.4s ease-in-out infinite',
        'progress-fill': 'progress-fill var(--slide-ms, 5200ms) linear forwards',
      },
    },
  },
  plugins: [],
}
