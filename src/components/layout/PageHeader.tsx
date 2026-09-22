import React from 'react';
import { Play } from 'lucide-react';
import { CinematicBanner, BannerStat } from '../banner/CinematicBanner';
import { BannerButton } from '../banner/BannerButton';
import type { SectionKey } from '../../data/sectionMedia';

export type PageHeaderStat = BannerStat;

export interface PageHeaderProps {
  section: SectionKey;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  breadcrumb?: string;
  stats?: PageHeaderStat[];
  /** A primary action, usually a <BannerButton/>. */
  actionButton?: React.ReactNode;
  children?: React.ReactNode;
  /** Adds a "Watch Keynote" button that calls `onPlayVideo` with this id. */
  videoYoutubeId?: string;
  onPlayVideo?: (youtubeId: string) => void;
  scrollTargetId?: string;
}

/**
 * Page masthead. Kept as a thin wrapper so pages keep one import; the actual
 * design lives in <CinematicBanner/> (full-bleed video / photograph, headline,
 * glass figures rail).
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  section,
  eyebrow,
  title,
  accent,
  description,
  breadcrumb,
  stats,
  actionButton,
  children,
  videoYoutubeId,
  onPlayVideo,
  scrollTargetId,
}) => (
  <CinematicBanner
    section={section}
    eyebrow={eyebrow}
    title={title}
    accent={accent}
    description={description}
    breadcrumb={breadcrumb}
    stats={stats}
    scrollTargetId={scrollTargetId}
    actions={
      <>
        {actionButton}
        {videoYoutubeId && onPlayVideo && (
          <BannerButton
            variant="ghost"
            onClick={() => onPlayVideo(videoYoutubeId)}
            icon={<Play className="h-4 w-4 fill-current" />}
          >
            Watch Keynote
          </BannerButton>
        )}
        {children}
      </>
    }
  />
);
