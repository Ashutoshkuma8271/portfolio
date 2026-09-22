import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { SectionMedia } from '../../data/sectionMedia';

export type BackdropMode = 'video' | 'photo';

interface BackdropMediaProps {
  media: SectionMedia;
  /** Externally paused (the visitor pressed the pause control). */
  paused?: boolean;
  /** Reports whether footage is actually playing, so the banner knows whether to show a pause control. */
  onModeChange?: (mode: BackdropMode) => void;
  /** Above-the-fold banners load eagerly; everything else can wait. */
  priority?: boolean;
}

/** Phones get the light 720p cut when one exists. */
const isSmallScreen = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

/** Respect Data Saver / very slow connections: never spend their data on autoplay video. */
const isDataConstrained = () => {
  if (typeof navigator === 'undefined') return false;
  const c = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return Boolean(c?.saveData) || c?.effectiveType === 'slow-2g' || c?.effectiveType === '2g';
};

/**
 * The moving picture behind a banner.
 *
 * Order of preference: looping video -> slowly drifting photograph -> still
 * photograph. The photograph is ALWAYS rendered underneath, so:
 *   - the page never shows a black box while video buffers,
 *   - a missing / unsupported video file degrades to the photo silently,
 *   - `prefers-reduced-motion` visitors get a still frame, not autoplay.
 *
 * Video is also paused whenever the banner scrolls out of view, so an
 * off-screen loop never keeps decoding in the background.
 */
export const BackdropMedia: React.FC<BackdropMediaProps> = ({
  media,
  paused = false,
  onModeChange,
  priority = false,
}) => {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [inView, setInView] = useState(true);

  const wantsVideo = Boolean(media.video) && !reduceMotion && !isDataConstrained();

  // Track visibility so off-screen banners stop decoding.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pick a playable source and walk down the list if one fails to load.
  useEffect(() => {
    const video = videoRef.current;
    const spec = media.video;
    if (!wantsVideo || !video || !spec) {
      setVideoReady(false);
      onModeChange?.('photo');
      return;
    }

    const candidates: string[] = [];
    if (isSmallScreen() && spec.mobile) candidates.push(spec.mobile);
    if (spec.webm && video.canPlayType('video/webm; codecs="vp9"')) candidates.push(spec.webm);
    candidates.push(spec.mp4);

    let index = 0;
    let cancelled = false;

    const tryNext = () => {
      if (cancelled) return;
      if (index >= candidates.length) {
        setVideoReady(false);
        onModeChange?.('photo');
        return;
      }
      video.src = candidates[index++];
      video.load();
    };

    const handlePlaying = () => {
      if (cancelled) return;
      setVideoReady(true);
      onModeChange?.('video');
    };

    // A 404 that the host answers with index.html (common on SPA hosting) is
    // still a decode failure here, so this walks on to the next candidate.
    video.addEventListener('error', tryNext);
    video.addEventListener('playing', handlePlaying);
    video.muted = true;
    tryNext();

    return () => {
      cancelled = true;
      video.removeEventListener('error', tryNext);
      video.removeEventListener('playing', handlePlaying);
      video.removeAttribute('src');
      video.load();
    };
    // onModeChange is intentionally excluded: callers pass an unstable setter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantsVideo, media.video?.mp4]);

  // Play / pause from visibility and the visitor's own control.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !wantsVideo) return;
    if (paused || !inView) {
      video.pause();
    } else {
      const p = video.play();
      if (p) p.catch(() => undefined);
    }
  }, [paused, inView, wantsVideo, videoReady]);

  return (
    <div ref={wrapRef} aria-hidden className="absolute inset-0 overflow-hidden bg-emerald-950">
      <img
        src={media.poster}
        alt=""
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        style={{ objectPosition: media.focal }}
        className="h-full w-full object-cover will-change-transform"
      />

      {wantsVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          style={{ objectPosition: media.focal }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
