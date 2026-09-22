import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'gold' | 'tertiary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  /** Shows a spinner and blocks interaction without collapsing the layout. */
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  showArrow?: boolean;
  isPlayButton?: boolean;
  /** Set on dark panels so the focus ring keeps its contrast. */
  onDark?: boolean;
  /** Buttons are uppercase label-styled by default; opt out for sentence case. */
  uppercase?: boolean;
  ariaLabel?: string;
}

/**
 * The single button primitive for the site. Every interactive affordance runs
 * through here so press, hover, focus and disabled behave identically
 * everywhere -- inconsistent states across variants is the main thing that
 * makes a site feel amateur, even when the colours are right.
 *
 * Focus uses `outline` rather than `ring`: outline paints outside the element
 * on any background, so one declaration is legible on both the ivory sections
 * and the dark emerald panels.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  icon,
  showArrow = false,
  isPlayButton = false,
  onDark = false,
  uppercase = true,
  ariaLabel,
}) => {
  const isInert = disabled || loading;

  // tertiary is a text link, so it opts out of the padded sizes entirely --
  // previously it set p-0 alongside px-6/py-3 and the padding won.
  const sizeClasses =
    variant === 'tertiary'
      ? { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[size]
      : {
          sm: 'px-4 py-2 text-xs',
          md: 'px-6 py-3 text-sm',
          lg: 'px-8 py-4 text-base',
        }[size];

  // Every variant carries a 1px border -- including the transparent ones -- so
  // variants placed side by side line up to the same height.
  const variantClasses = {
    primary:
      'border border-emerald-700/50 bg-emerald-800 text-ivory-500 shadow-md hover:border-gold-500 hover:bg-gold-600 hover:text-emerald-950 hover:shadow-gold-glow',
    secondary:
      'border border-emerald-800/40 bg-transparent text-ink-heading hover:border-emerald-800 hover:bg-emerald-800 hover:text-ivory-500',
    gold:
      'border border-gold-500 bg-gold-600 font-bold text-emerald-950 shadow-gold-glow hover:bg-gold-500 hover:shadow-lg',
    tertiary:
      'border border-transparent bg-transparent text-ink-heading underline-offset-4 hover:text-gold-700 hover:underline',
    ghost:
      'border border-transparent bg-transparent text-ink-heading hover:bg-emerald-800/10',
  }[variant];

  const focusRing = onDark
    ? 'focus-visible:outline-gold-400'
    : 'focus-visible:outline-gold-600';

  const baseStyles = [
    'inline-flex items-center justify-center text-center gap-2.5 rounded-full font-sans font-semibold tracking-wider',
    'transition-all duration-300 ease-out select-none cursor-pointer',
    // Press feedback, suppressed for anyone who prefers reduced motion.
    'motion-safe:active:scale-[0.97]',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    focusRing,
    isInert ? 'pointer-events-none opacity-55' : '',
  ].join(' ');

  const classes = `${baseStyles} ${sizeClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
      ) : (
        isPlayButton && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-700 transition-colors group-hover:bg-gold-600 group-hover:text-emerald-950">
            <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
          </span>
        )
      )}
      {!loading && icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span className={`text-center ${uppercase ? 'uppercase' : ''}`}>{children}</span>
      {showArrow && !loading && (
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );

  // `group` only belongs on elements that actually render hover-reactive
  // children, so the arrow and play glyph animate without every button
  // opting into group semantics it never uses.
  const groupClass = showArrow || isPlayButton ? 'group' : '';

  if (to && !isInert) {
    return (
      <Link to={to} aria-label={ariaLabel} className={`${groupClass} ${classes}`}>
        {content}
      </Link>
    );
  }

  if (href && !isInert) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`${groupClass} ${classes}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isInert}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={`${groupClass} ${classes}`}
    >
      {content}
    </button>
  );
};
