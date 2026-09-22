import React from 'react';

interface GoldDividerProps {
  className?: string;
  center?: boolean;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', center = false }) => {
  return (
    <div className={`flex items-center gap-2 ${center ? 'justify-center' : 'justify-start'} ${className}`}>
      <div className="h-[2px] w-12 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 rounded-full" />
      <div className="w-1.5 h-1.5 rotate-45 bg-gold-500 rounded-[1px]" />
      <div className="h-[2px] w-6 bg-gradient-to-r from-gold-500 to-transparent rounded-full" />
    </div>
  );
};
