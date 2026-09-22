import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades + lifts its child into view once. No-ops for reduced-motion visitors. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 22, className }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
