import React from 'react';

/**
 * A small gold diamond -- the site's one geometric flourish. Used where a
 * card or badge previously carried a generic "app" icon (terminal, radio,
 * sparkles, tag), so the interface reads as engraved stationery rather than
 * a dashboard.
 */
export const Diamond: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span aria-hidden className={`inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500 ${className}`} />
);
