import React from 'react';
import { GoldDivider } from './GoldDivider';
import { Badge } from './Badge';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  isDark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  center = false,
  isDark = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div className={`mb-3 ${center ? 'flex justify-center' : ''}`}>
          <Badge variant={isDark ? 'gold' : 'gold'}>
            {eyebrow}
          </Badge>
        </div>
      )}
      
      <h2
        className={`font-serif text-[clamp(1.6rem,3vw+0.9rem,3rem)] font-bold tracking-tight leading-[1.1] mb-4 ${
          isDark ? 'text-ivory-500' : 'text-emerald-950'
        }`}
      >
        {title}
      </h2>

      <div className="mb-4">
        <GoldDivider center={center} />
      </div>

      {subtitle && (
        <p
          className={`max-w-3xl text-[clamp(0.9rem,0.6vw+0.75rem,1.125rem)] leading-relaxed ${
            center ? 'mx-auto' : ''
          } ${isDark ? 'text-ivory-700' : 'text-charcoal-700'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
