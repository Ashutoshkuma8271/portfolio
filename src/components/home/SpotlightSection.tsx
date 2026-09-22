import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Card } from '../ui/Card';
import { VideoModal } from '../ui/VideoModal';
import { mediaData } from '../../data/media';
import { YoutubeThumb } from '../ui/YoutubeThumb';

/**
 * Home-page "In the Spotlight": the featured keynote and the most recent
 * press, straight from media.ts -- add an article there and this updates.
 */
export const SpotlightSection: React.FC = () => {
  const [playing, setPlaying] = useState<string | null>(null);
  const video = mediaData.videos[0];
  const articles = mediaData.articles.slice(0, 2);

  return (
    <section className="bg-surface-sunken border-y border-hairline py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          center
          eyebrow="In the Spotlight"
          title="Watch, Read &"
          accent="Stay Informed"
          subtitle="The latest keynote and press coverage from the Office of H.E. Zeenat Kureshi."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 max-w-xl lg:max-w-none mx-auto w-full">
          <Reveal className="lg:col-span-7">
            <button
              type="button"
              onClick={() => setPlaying(video.youtubeId)}
              aria-label={`Play: ${video.title}`}
              className="grain group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gold-500/40 bg-gradient-to-br from-emerald-800 to-emerald-950 text-left sm:aspect-video shadow-luxury-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
            >
              <YoutubeThumb
                videoId={video.youtubeId}
                override={video.thumbnailUrl}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/30 to-transparent" />
              <span className="absolute left-1/2 top-[36%] flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 items-center justify-center rounded-full border-2 border-gold-300 bg-gradient-to-br from-gold-400 to-gold-600 text-emerald-950 shadow-[0_0_36px_rgba(230,189,101,0.55)] transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 fill-current" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-label text-2xs font-bold uppercase tracking-[0.18em] text-gold-300">
                  Featured keynote
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-white sm:text-2xl">
                  {video.title}
                </h3>
              </div>
            </button>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {articles.map((art, i) => (
              <Reveal key={art.id} delay={0.08 * (i + 1)}>
                <a href={art.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <Card interactive className="flex flex-col items-center justify-center p-6 sm:p-7 text-center h-full">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-gold-800 dark:text-gold-300 border border-gold-600/20">
                      {art.publication}
                    </span>
                    <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-ink-heading transition-colors group-hover:text-gold-800 sm:text-xl">
                      {art.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-gold-700 dark:text-gold-400 group-hover:text-gold-900 dark:group-hover:text-gold-200">
                      <span>Read article</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Card>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Visit the Press Room Button: Centered in the middle across all screens */}
        <div className="mt-8 sm:mt-10 flex justify-center items-center w-full">
          <Link
            to="/media-press"
            className="group inline-flex h-12 sm:h-13 items-center justify-center gap-3 rounded-full border-2 border-gold-600/40 bg-surface-raised px-8 sm:px-9 font-label text-xs font-bold uppercase tracking-[0.16em] text-ink-heading shadow-[0_4px_16px_-4px_rgba(18,51,43,0.12),0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-600 hover:bg-surface hover:text-gold-900 hover:shadow-[0_10px_24px_-6px_rgba(18,51,43,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
          >
            <span>Visit the Press Room</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </Container>

      <VideoModal
        isOpen={playing !== null}
        onClose={() => setPlaying(null)}
        videoUrl={
          playing ? `https://www.youtube-nocookie.com/embed/${playing}?autoplay=1&rel=0` : undefined
        }
        title={video.title}
      />
    </section>
  );
};
