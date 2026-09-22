/**
 * YouTube serves every video's current thumbnail from a predictable URL, so
 * deriving it from the video ID keeps the site in step with the channel for
 * free: re-thumbnail a video on YouTube and this page follows, with no
 * redeploy and no stored image to go stale.
 *
 * `maxres` (1280x720) is the only true 16:9 still, but YouTube generates it
 * lazily and it 404s on older or low-resolution uploads. `hq` (480x360) always
 * exists, so it is the fallback -- it is 4:3 with letterbox bars baked in,
 * which `object-cover` on a 16:9 frame crops back off.
 */

export const youtubeThumb = (videoId: string): string =>
  `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

export const youtubeThumbFallback = (videoId: string): string =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

/** Swaps in the always-present `hq` still the first time `maxres` 404s. */
export const handleThumbError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  videoId: string,
): void => {
  const img = e.currentTarget;
  const fallback = youtubeThumbFallback(videoId);
  if (img.src !== fallback) img.src = fallback;
};

export const youtubeWatchUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`;
