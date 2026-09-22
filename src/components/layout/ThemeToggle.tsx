import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-600/30 bg-surface-raised/70 text-ink-heading shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-gold-600 hover:bg-gold-500/15 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 cursor-pointer ${className}`}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="flex items-center justify-center"
      >
        {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
      </motion.span>
    </button>
  );
};
