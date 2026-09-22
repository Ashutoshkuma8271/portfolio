import React, { useState } from 'react';
import { youtubeThumb, youtubeThumbFallback } from '../../utils/youtube';

interface YoutubeThumbProps {
  videoId: string;
  /** Explicit still (from media.ts) that wins over the derived one. */
  override?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * A video still that degrades cleanly: maxres -> hq -> nothing.
 * If both stills fail (offline, blocked, removed video) the <img> is dropped
 * so the parent's emerald backdrop shows instead of a broken-image glyph.
 */
export const YoutubeThumb: React.FC<YoutubeThumbProps> = ({
  videoId,
  override,
  className = '',
  loading = 'lazy',
}) => {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  if (stage === 2) return null;
  const src = stage === 0 ? override ?? youtubeThumb(videoId) : youtubeThumbFallback(videoId);
  return (
    <img
      src={src}
      alt=""
      loading={loading}
      decoding="async"
      onError={() => setStage((s) => (s === 0 ? 1 : 2))}
      className={className}
    />
  );
};
