import React from 'react';

interface GoldDividerProps {
  className?: string;
  /** 'mobile' centres below `sm`; 'tablet' centres below `lg`. */
  center?: boolean | 'mobile' | 'tablet';
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', center = false }) => {
  const justify =
    center === 'mobile'
      ? 'justify-center sm:justify-start'
      : center === 'tablet'
        ? 'justify-center lg:justify-start'
        : center
          ? 'justify-center'
          : 'justify-start';
  return (
    <div className={`flex items-center gap-1.5 ${justify} ${className}`}>
      <div className="h-[1.5px] w-9 bg-gradient-to-r from-transparent via-gold-500/70 to-gold-500 rounded-full" />
      <div className="w-1.5 h-1.5 rotate-45 bg-gold-500 rounded-[1px] shrink-0" />
      <div className="h-[1.5px] w-9 bg-gradient-to-r from-gold-500 via-gold-500/70 to-transparent rounded-full" />
    </div>
  );
};
