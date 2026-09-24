import React from 'react';
import india from '../../assets/images/flags/in.svg';
import uae from '../../assets/images/flags/ae.svg';
import saudi from '../../assets/images/flags/sa.svg';
import qatar from '../../assets/images/flags/qa.svg';
import oman from '../../assets/images/flags/om.png';

export type FlagCountry = 'india' | 'uae' | 'saudi' | 'qatar' | 'oman';

const FLAGS: Record<FlagCountry, { src: string; name: string }> = {
  india: { src: india, name: 'India' },
  uae: { src: uae, name: 'United Arab Emirates' },
  saudi: { src: saudi, name: 'Saudi Arabia' },
  qatar: { src: qatar, name: 'Qatar' },
  oman: { src: oman, name: 'Oman' },
};

/** National flag in a uniform 3:2 tile, so flags of different native proportions line up. */
export const Flag: React.FC<{ country: FlagCountry; className?: string; decorative?: boolean }> = ({
  country,
  className = 'h-5',
  decorative = false,
}) => {
  const f = FLAGS[country];
  return (
    <img
      src={f.src}
      alt={decorative ? '' : `Flag of ${f.name}`}
      aria-hidden={decorative || undefined}
      loading="lazy"
      decoding="async"
      className={`aspect-[3/2] w-auto shrink-0 rounded-[3px] object-cover shadow-[0_1px_2px_rgba(0,0,0,0.18)] ring-1 ring-black/10 ${className}`}
    />
  );
};
