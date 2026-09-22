import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'emerald' | 'ivory' | 'outline';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-2xs tracking-[0.2em]',
    md: 'px-3.5 py-1 text-xs tracking-[0.22em]',
    lg: 'px-4 py-1.5 text-xs tracking-[0.25em]',
  };

  const variantClasses = {
    gold: 'bg-gold-500/10 text-gold-700 border border-gold-600/30',
    emerald: 'bg-emerald-800 text-ivory-500 border border-emerald-700',
    ivory: 'bg-surface-raised/80 text-ink-heading border border-hairline shadow-sm',
    outline: 'bg-transparent text-ink-soft border border-charcoal-300',
  };

  return (
    <span
      className={`inline-flex items-center uppercase font-semibold rounded-full font-label transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
