import React from 'react';
import { GoldDivider } from './GoldDivider';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Trailing phrase set in gold italic, e.g. "Impact" in "Four Pillars of Impact". */
  accent?: string;
  subtitle?: string;
  center?: boolean;
  /** Set on deep-emerald bands so the type flips to ivory / light gold. */
  isDark?: boolean;
  className?: string;
}

/**
 * The one heading treatment used by every content section.
 *
 * Eyebrow: tracked small caps flanked by a gold rule (an editorial "kicker",
 * not a pill -- pills on every section turn into visual noise).
 * Title: Playfair Display 600 with an optional Cormorant-italic gold accent.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  accent,
  subtitle,
  center = false,
  isDark = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 ${center ? 'justify-center' : ''}`}
        >
          <span
            aria-hidden
            className={`h-px w-8 ${isDark ? 'bg-gold-400/70' : 'bg-gold-600/70'} ${
              center ? '' : 'hidden'
            }`}
          />
          <span
            className={`font-label text-xs font-bold uppercase tracking-[0.26em] ${
              isDark ? 'text-gold-400' : 'text-gold-800 dark:text-gold-400'
            }`}
          >
            {eyebrow}
          </span>
          <span
            aria-hidden
            className={`h-px ${center ? 'w-8' : 'w-12'} ${
              isDark ? 'bg-gold-400/70' : 'bg-gold-600/70'
            }`}
          />
        </div>
      )}

      <h2
        className={`font-display text-[clamp(1.55rem,2vw+1rem,2.6rem)] font-semibold tracking-[0.012em] leading-[1.1] mb-5 text-balance ${
          isDark ? 'text-ivory-500' : 'text-ink-heading'
        }`}
      >
        {title}
        {accent && (
          <>
            {' '}
            <span
              className={`font-cormorant text-[1.08em] italic font-semibold ${
                isDark ? 'gold-text' : 'gold-text-deep dark:gold-text'
              }`}
            >
              {accent}
            </span>
          </>
        )}
      </h2>

      <div className="mb-5">
        <GoldDivider center={center} />
      </div>

      {subtitle && (
        <p
          className={`max-w-3xl text-[clamp(1rem,0.4vw+0.9rem,1.175rem)] leading-relaxed ${
            center ? 'mx-auto' : ''
          } ${isDark ? 'text-ivory-700' : 'text-ink-soft'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
