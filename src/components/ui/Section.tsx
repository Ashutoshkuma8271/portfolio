import React from 'react';
import { Container } from '../layout/Container';

type Tone = 'surface' | 'sunken' | 'raised' | 'deep';

interface SectionProps {
  id?: string;
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Skip the built-in container (for full-bleed children). */
  bleed?: boolean;
}

const TONES: Record<Tone, string> = {
  surface: 'bg-surface',
  sunken: 'bg-surface-sunken border-y border-hairline',
  raised: 'bg-surface-raised border-y border-hairline',
  // 'deep' used to force a dark band even in light mode. It is now a warm
  // gold-tinted band that follows the theme, so light mode stays light.
  deep: 'bg-surface-sunken border-y border-gold-600/30',
};

/**
 * Standard page section: consistent vertical rhythm, an anchor offset that
 * clears the fixed navbar plus the sticky in-page nav, and one of four
 * background tones so pages alternate light / tint / dark in a set pattern
 * instead of each section inventing its own.
 */
export const Section: React.FC<SectionProps> = ({
  id,
  tone = 'surface',
  children,
  className = '',
  containerSize = 'xl',
  bleed = false,
}) => (
  <section
    id={id}
    className={`relative scroll-mt-28 py-20 lg:py-28 ${TONES[tone]} ${className}`}
  >
    {bleed ? children : <Container size={containerSize} className="relative">{children}</Container>}
  </section>
);
