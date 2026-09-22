import React from 'react';

interface CardProps {
  children: React.ReactNode;
  tone?: 'light' | 'dark';
  /** Lifts and warms the border on hover. Leave off for static panels. */
  interactive?: boolean;
  className?: string;
  as?: 'div' | 'article' | 'li';
}

/**
 * One card. Every card on the site shares this radius, border, shadow and
 * hover -- previously there were eight slightly different recipes (2xl vs 3xl
 * corners, scale vs translate hovers, hard-coded ivory borders that ignored
 * dark mode).
 */
export const Card: React.FC<CardProps> = ({
  children,
  tone = 'light',
  interactive = false,
  className = '',
  as: Tag = 'div',
}) => {
  const base = 'relative rounded-2xl border transition-all duration-300 ease-out';
  const look =
    tone === 'light'
      ? 'border-hairline bg-surface-raised shadow-luxury'
      : 'border-gold-600/30 bg-surface-raised shadow-luxury';
  const hover = interactive
    ? tone === 'light'
      ? 'hover:-translate-y-1 hover:border-gold-500/55 hover:shadow-luxury-lg'
      : 'hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-luxury-lg'
    : '';
  return <Tag className={`${base} ${look} ${hover} ${className}`}>{children}</Tag>;
};
