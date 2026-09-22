import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface BannerButtonProps {
  children: React.ReactNode;
  /**
   * primary   : filled gold gradient pill.
   * secondary : luxury frosted glass pill with gold border.
   * outline   : alias for secondary.
   * ghost     : subtle translucent pill with gold border.
   * link      : inline text with underline and angled arrow.
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'ghost';
  to?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  /** Trailing arrow -- on by default. */
  arrow?: boolean;
  className?: string;
}

/**
 * Calls to action for photographic banners, hero sections, and footers.
 *
 * Provides harmonious luxury button variants matching the website's royal GCC-India theme,
 * with identical heights, balanced touch targets, and smooth hover/tap physics.
 */
export const BannerButton: React.FC<BannerButtonProps> = ({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  icon,
  arrow = true,
  className = '',
}) => {
  const reduce = useReducedMotion();
  const isLink = variant === 'link';
  const isSecondary = variant === 'secondary' || variant === 'outline';
  const isGhost = variant === 'ghost';
  const isPill = !isLink;

  const shared =
    'group inline-flex items-center justify-center gap-2.5 cursor-pointer select-none font-label font-bold uppercase transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500';

  const pillBase =
    'min-h-[46px] h-[46px] sm:h-12 whitespace-nowrap rounded-full px-6 sm:px-7 text-xs sm:text-[0.78rem] tracking-[0.13em]';

  const primaryStyle =
    `${pillBase} border border-gold-300/60 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 text-emerald-950 hover:from-gold-300 hover:to-gold-500 shadow-[0_4px_14px_rgba(199,154,61,0.28)]`;

  const secondaryStyle =
    `${pillBase} border border-gold-500/70 bg-surface-raised/85 dark:bg-emerald-950/75 text-ink-heading dark:text-gold-200 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:bg-gold-500 hover:text-emerald-950 hover:border-gold-400 hover:shadow-[0_6px_18px_rgba(199,154,61,0.3)]`;

  const ghostStyle =
    `${pillBase} border border-gold-600/40 bg-surface-raised/50 dark:bg-emerald-900/30 text-ink-heading dark:text-gold-200 backdrop-blur-md hover:border-gold-500 hover:bg-gold-500/20 hover:text-gold-800 dark:hover:text-gold-300`;

  const linkStyle =
    'min-h-[44px] px-1 text-xs sm:text-[0.78rem] tracking-[0.14em] text-gold-800 underline decoration-gold-500/0 decoration-2 underline-offset-[6px] transition-[text-decoration-color,color] duration-300 hover:decoration-gold-500 dark:text-gold-300';

  let variantStyle = primaryStyle;
  if (isSecondary) variantStyle = secondaryStyle;
  else if (isGhost) variantStyle = ghostStyle;
  else if (isLink) variantStyle = linkStyle;

  const Arrow = isLink ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      {arrow && (
        <Arrow
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
            isLink
              ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
              : 'group-hover:translate-x-1'
          }`}
        />
      )}
    </>
  );

  // If it's a pill, the inner element spans 100% of the wrapper container
  const buttonClasses = isPill
    ? `${shared} ${variantStyle} w-full justify-center`
    : `${shared} ${variantStyle} ${className}`.trim();

  let node: React.ReactNode;
  if (to) {
    node = (
      <Link to={to} className={buttonClasses}>
        {inner}
      </Link>
    );
  } else if (href) {
    const external = /^https?:/.test(href);
    const isAnchor = href.startsWith('#');
    node = (
      <a
        href={href}
        className={buttonClasses}
        onClick={
          isAnchor
            ? (e) => {
                const target = document.getElementById(href.slice(1));
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }
            : undefined
        }
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  } else {
    node = (
      <button type="button" onClick={onClick} className={buttonClasses}>
        {inner}
      </button>
    );
  }

  if (!isPill) return <>{node}</>;

  const hasFullWidth = className.includes('w-full');
  const wrapperClass = `inline-flex rounded-full ${className} ${hasFullWidth ? 'w-full sm:w-auto' : ''}`.trim();

  return (
    <motion.span
      className={wrapperClass}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
    >
      {node}
    </motion.span>
  );
};
