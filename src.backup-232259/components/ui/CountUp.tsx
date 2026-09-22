import React, { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
  className?: string;
  /** Styles the suffix independently (e.g. a gold "+") -- the number itself
      stays plain text so screen readers announce it as one value. */
  suffixClassName?: string;
}

/**
 * Animated integer count-up, shared by every stat/credential tile on the
 * site so the "numbers arriving" motion reads as one consistent language
 * instead of each section reinventing it. Snaps straight to the final
 * value when the viewer prefers reduced motion.
 */
export const CountUp: React.FC<CountUpProps> = ({
  value,
  suffix = '',
  prefix = '',
  delay = 0,
  duration = 1.5,
  className,
  suffixClassName,
}) => {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, delay, duration, reduceMotion]);

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
};
