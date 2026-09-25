import { eventPhotos } from './eventPhotos';

/**
 * Banner media for every section of the site, in one place.
 *
 * Each section has a bundled photograph (`poster`) that always works, and an
 * optional looping video. Drop a file at the listed path under
 * `public/media/videos/` and that banner starts playing it on the next
 * reload -- no code change. If the file is missing, or the visitor prefers
 * reduced motion / has Data Saver on, the banner falls back to the photograph
 * (which itself drifts slowly so it never sits dead on screen).
 */

export type SectionKey =
  | 'home'
  | 'about'
  | 'trade'
  | 'media'
  | 'women'
  | 'insights'
  | 'contact';

export interface VideoSource {
  /** H.264 MP4 -- plays everywhere. Required. */
  mp4: string;
  /** Optional lighter VP9/AV1 WebM for browsers that prefer it. */
  webm?: string;
  /** Optional 720p cut served to phones so mobile data isn't burned on 1080p. */
  mobile?: string;
}

export interface SectionMedia {
  /** Bundled still -- the fallback, the poster frame and the reduced-motion view. */
  poster: string;
  posterAlt: string;
  /** CSS object-position for the still, so the crop keeps the subject. */
  focal: string;
  /** Looping background footage. Omit to run photograph-only. */
  video?: VideoSource;
  /** Small credit line shown on the banner ("Event · Place"). */
  caption?: string;
}

const v = (name: string): VideoSource => ({
  mp4: `/media/videos/${name}.mp4`,
  webm: `/media/videos/${name}.webm`,
  mobile: `/media/videos/${name}-mobile.mp4`,
});

const banner = (photo: (typeof eventPhotos)[keyof typeof eventPhotos], video?: VideoSource): SectionMedia => ({
  poster: photo.src,
  posterAlt: photo.alt,
  focal: photo.focal,
  video,
  caption: `${photo.event} · ${photo.location}`,
});

export const sectionMedia: Record<SectionKey, SectionMedia> = {
  home: banner(eventPhotos.udcStage),
  about: { ...banner(eventPhotos.aboutHeroBanner, v('about')), focal: '64% 35%' },
  // She stands at the photo's far left; pin the crop to that edge so the banner's edge blend never reaches her.
  trade: { ...banner(eventPhotos.tradeSummitAccord, v('trade')), focal: '0% 25%' },
  media: banner(eventPhotos.gccNationsMedia, v('media')),
  women: banner(eventPhotos.commonwealthLeadership, v('women')),
  insights: banner(eventPhotos.insightsSummitDialogue, v('insights')),
  contact: banner(eventPhotos.bricsSummitContact, v('contact')),
};
