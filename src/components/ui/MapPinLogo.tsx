import React from 'react';
import pin from '../../assets/images/icons/google-maps-pin.png';

/** Full-colour map pin for address and location lines. Decorative: the text beside it carries the meaning. */
export const MapPinLogo: React.FC<{ className?: string }> = ({ className = 'h-[18px]' }) => (
  <img
    src={pin}
    alt=""
    aria-hidden
    width={100}
    height={144}
    decoding="async"
    className={`w-auto shrink-0 object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] ${className}`}
  />
);
