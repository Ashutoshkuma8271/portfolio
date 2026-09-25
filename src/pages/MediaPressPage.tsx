import React, { useState } from 'react';
import { ArrowUpRight, Expand, Mail } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { BannerButton } from '../components/banner/BannerButton';
import { SectionNav } from '../components/layout/SectionNav';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { VideoModal } from '../components/ui/VideoModal';
import { Lightbox } from '../components/ui/Lightbox';
import { ReelsWall } from '../components/media/ReelsWall';
import { MediaInquiryForm } from '../components/forms/MediaInquiryForm';
import { SEO } from '../components/ui/SEO';
import { PublicationLogo } from '../components/ui/PublicationLogo';
import { MapPinLogo } from '../components/ui/MapPinLogo';
import { Flag, type FlagCountry } from '../components/ui/Flag';
import { mediaData } from '../data/media';
import { galleryImages } from '../data/gallery';
import { eventPhotos } from '../data/eventPhotos';
import { siteConfig } from '../data/siteConfig';
import { reels } from '../data/reels';
import type { MediaArticle } from '../types';

const NAV = [
  { id: 'press', label: 'Press' },
  { id: 'watch', label: 'Watch' },
  { id: 'stages', label: 'Stages' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'inquiry', label: 'Inquiry' },
];

/** Bento spans for the six gallery frames: one hero tile, then a tidy mosaic. */
const GALLERY_SPANS = [
  'col-span-2 row-span-2',
  '',
  '',
  '',
  '',
  'col-span-2 lg:col-span-4',
];

/** "ANI News (Asian News International)" -> "ANI News" -- the bracketed expansion is noise in a card header. */
const shortName = (name: string) => name.replace(/\s*\(.*?\)\s*/g, ' ').trim();

/** Host country of each speaking venue, for its flag. */
const venueFlag = (location: string): FlagCountry | null => {
  const l = location.toLowerCase();
  if (/uae|dubai|abu dhabi/.test(l)) return 'uae';
  if (/qatar|doha/.test(l)) return 'qatar';
  if (/oman|muscat/.test(l)) return 'oman';
  if (/saudi|riyadh|jeddah/.test(l)) return 'saudi';
  if (/india|delhi|mumbai/.test(l)) return 'india';
  return null;
};

/** Lead-story photograph: the trade accord signing, not used elsewhere on this page. */
const LEAD_PHOTO = eventPhotos.tradeSummitAccord;

const ArticleCard: React.FC<{ art: MediaArticle; tone?: 'light' | 'dark'; large?: boolean }> = ({
  art,
  tone = 'light',
  large = false,
}) => {
  const dark = tone === 'dark';
  return (
    <a href={art.url} target="_blank" rel="noopener noreferrer" className={`group flex h-full flex-col ${large ? 'rounded-2xl shadow-luxury transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-luxury-lg' : ''}`}>
      {large && (
        <div className="grain relative aspect-[16/8] overflow-hidden rounded-t-2xl border border-b-0 border-gold-600/30 bg-emerald-950">
          <img
            src={LEAD_PHOTO.src}
            alt={LEAD_PHOTO.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: '15% 30%' }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-emerald-950/55 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 z-[3] rounded-full border border-gold-400/50 bg-emerald-950/70 px-3.5 py-1.5 font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-200 backdrop-blur-md">
            Lead story
          </span>
        </div>
      )}
      <Card
        tone={tone}
        interactive={!large}
        className={`flex flex-1 flex-col justify-between overflow-hidden ${large ? 'rounded-t-none p-8 sm:p-10' : 'p-6 sm:p-7'} ${
          dark ? 'bg-surface-raised' : ''
        }`}
      >
        {large && (
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-10 right-6 select-none font-cormorant text-[15rem] font-semibold italic leading-none text-gold-500/[0.12]"
          >
            &rdquo;
          </span>
        )}
        <div className="text-center sm:text-left">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-between">
            <div className="flex items-center gap-3">
              <PublicationLogo publication={art.publication} size="md" />
              <span
                className={`text-sm font-semibold ${
                  'text-gold-800 dark:text-gold-300'
                }`}
              >
                {shortName(art.publication)}
              </span>
            </div>
            <Badge variant="gold" size="sm" className="whitespace-nowrap">
              {art.tag}
            </Badge>
          </div>

          <h3
            className={`font-heading font-semibold leading-snug transition-colors ${
              large ? 'text-2xl sm:text-[1.75rem]' : 'text-lg sm:text-xl'
            } ${'text-ink-heading group-hover:text-gold-800 dark:group-hover:text-gold-300'}`}
          >
            {art.title}
          </h3>
          <p
            className={`mt-3 leading-relaxed ${
              large ? 'text-base sm:text-lg' : 'line-clamp-3 text-[0.95rem]'
            } ${'text-ink-soft'}`}
          >
            {art.excerpt}
          </p>
        </div>

        <div
          className={`relative mt-6 flex items-center justify-between border-t pt-4 text-sm ${
            'border-hairline text-ink-faint'
          }`}
        >
          <span>{art.date}</span>
          <span
            className={`inline-flex items-center gap-1.5 font-semibold ${
              'text-ink-heading group-hover:text-gold-800 dark:group-hover:text-gold-300'
            }`}
          >
            Read article
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Card>
    </a>
  );
};

export const MediaPressPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [galleryIdx, setGalleryIdx] = useState<number | null>(null);
  const [galleryCat, setGalleryCat] = useState('All');
  const galleryCats = ['All', ...Array.from(new Set(galleryImages.map((g) => g.category)))];
  const visibleGallery = galleryCat === 'All' ? galleryImages : galleryImages.filter((g) => g.category === galleryCat);

  const { articles, videos, speakingEngagements } = mediaData;
  const publications = Array.from(new Set(articles.map((a) => a.publication)));
  const [leadArticle, ...otherArticles] = articles;
  const sideArticles = otherArticles.slice(0, 2);
  const restArticles = otherArticles.slice(2);

  return (
    <div className="overflow-hidden bg-surface">
      <SEO
        title="Media & Press | Coverage, Keynotes & Broadcasts"
        description="Public intellect, international press coverage, broadcast interviews and videos of Zeenat Kureshi."
      />

      <PageHeader
        section="media"
        breadcrumb="Media & Press"
        eyebrow="Public Intellect & Global Press"
        title="Coverage, Keynotes &"
        accent="Global Press Appearances"
        description="An archive of international broadcast interviews, leading print features, policy keynotes and verified press releases."
        scrollTargetId="press"
        videoYoutubeId={videos[0].youtubeId}
        onPlayVideo={setActiveVideo}
        stats={[
          { value: `${articles.length}+`, label: 'Press Features' },
          { value: `${reels.length}`, label: 'Videos & Reels' },
          { value: `${speakingEngagements.length}+`, label: 'Global Stages' },
        ]}
        actionButton={<BannerButton href="#inquiry">Submit Media Inquiry</BannerButton>}
      />

      {/* Verified press ticker */}
      <div className="border-b border-hairline bg-surface-raised py-4">
        <div className="flex items-center gap-5">
          <span className="shrink-0 pl-4 font-label text-2xs font-bold uppercase tracking-[0.22em] text-gold-800 dark:text-gold-400 sm:pl-6 lg:pl-8">
            Featured in
          </span>
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 5%, #000 92%, transparent)',
            }}
          >
            <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
              {[0, 1].map((run) => (
                <div key={run} className="flex items-center" aria-hidden={run === 1}>
                  {publications.map((pub) => (
                    <span key={pub} className="flex items-center whitespace-nowrap">
                      <PublicationLogo publication={pub} size="sm" className="mr-2.5" />
                      <span className="font-heading text-base font-semibold text-ink-heading">{shortName(pub)}</span>
                      <span className="mx-6 h-1.5 w-1.5 rotate-45 bg-gold-600" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionNav items={NAV} />

      {/* ── 1. Press ─────────────────────────────────────────────────── */}
      <Section id="press" tone="surface">
        <SectionHeading
          center
          eyebrow="Press Archive"
          title="In the"
          accent="Headlines"
          subtitle="Leading publications on trade diplomacy, cinema production and civic leadership."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ArticleCard art={leadArticle} tone="dark" large />
          </Reveal>
          <div className="grid gap-6 lg:col-span-5">
            {sideArticles.map((art, i) => (
              <Reveal key={art.id} delay={0.08 * (i + 1)} className="h-full">
                <ArticleCard art={art} />
              </Reveal>
            ))}
          </div>
        </div>

        {restArticles.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restArticles.map((art, i) => (
              <Reveal key={art.id} delay={0.06 * i} className="h-full">
                <ArticleCard art={art} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* ── 2. Watch: the client's own videos ─────────────────────────── */}
      <Section id="watch" tone="deep">
        <SectionHeading
          center
          eyebrow="Watch"
          title="Videos &"
          accent="Reels"
          subtitle="Speeches, events and moments, straight from the official channels."
        />
        <ReelsWall />
      </Section>

      {/* ── 3. Stages ────────────────────────────────────────────────── */}
      <Section id="stages" tone="surface">
        <SectionHeading
          center
          eyebrow="Global Stages"
          title="Speaking Engagements &"
          accent="Keynote Addresses"
          subtitle="Selected addresses at sovereign trade summits, cultural conclaves and policy conventions."
        />

        <ol className="relative space-y-6 border-l border-gold-600/35 pl-8 sm:pl-12">
          {speakingEngagements.map((spk, idx) => (
            <li key={spk.title} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.6rem] top-7 h-3.5 w-3.5 rounded-full border-2 border-gold-500 bg-surface sm:-left-[3.6rem]"
              />
              <Reveal delay={idx * 0.05}>
                <Card interactive className="grid justify-items-center gap-5 p-6 text-center sm:p-8 md:grid-cols-[11rem_1fr_auto] md:items-center md:justify-items-stretch md:text-left">
                  <div>
                    <span className="gold-text-deep dark:gold-text font-heading text-2xl font-semibold leading-none">
                      {spk.date}
                    </span>
                    <div className="mt-2">
                      <Badge variant="emerald" size="sm" className="whitespace-nowrap">
                        {spk.role}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold leading-snug text-ink-heading">
                      {spk.title}
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] font-semibold text-ink-soft">{spk.event}</p>
                    <p className="mt-1 text-[0.95rem] text-ink-faint">Topic: {spk.topic}</p>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl border border-gold-500/20 bg-surface-sunken px-4 py-2.5 text-left text-sm font-medium text-ink-heading">
                    <MapPinLogo className="h-[18px]" />
                    <span>{spk.location}</span>
                    {venueFlag(spk.location) && (
                      <Flag country={venueFlag(spk.location)!} className="h-4" />
                    )}
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 4. Gallery ───────────────────────────────────────────────── */}
      <Section id="gallery" tone="sunken">
        <SectionHeading
          center
          eyebrow="Press Photography"
          title="Approved Press &"
          accent="Event Gallery"
          subtitle="Photography cleared for publication and editorial circulation."
        />

        {/* Category Navigation: Desktop centered row, Mobile/Tablet contained horizontal scroll track */}
        <nav className="relative mb-8 w-full" aria-label="Filter photographs">
          <div className="w-full max-w-full overflow-x-auto overflow-y-hidden no-scrollbar scrollbar-hidden scroll-smooth snap-x snap-proximity py-1 px-4 sm:px-0 -mx-4 sm:mx-0">
            <div className="flex flex-nowrap items-center gap-2.5 sm:gap-3 w-max min-w-full justify-start lg:justify-center">
              {galleryCats.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={(e) => {
                    setGalleryCat(c);
                    setGalleryIdx(null);
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'nearest',
                    });
                  }}
                  aria-pressed={galleryCat === c}
                  className={`shrink-0 flex-none whitespace-nowrap snap-start rounded-full border px-5 py-2 font-label text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer ${
                    galleryCat === c
                      ? 'border-gold-500 bg-gradient-to-b from-gold-400 to-gold-600 text-emerald-950 shadow-md scale-[1.02]'
                      : 'border-hairline bg-surface-raised text-ink-soft hover:border-gold-500/60 hover:text-ink-heading'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile: Smooth horizontal swipe carousel with scroll snap. Tablet & Desktop: Bento Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:auto-rows-[220px] sm:grid-cols-2 lg:grid-cols-4 no-scrollbar">
          {visibleGallery.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setGalleryIdx(i)}
              aria-label={`Open photo: ${img.title}`}
              className={`grain group relative shrink-0 w-[80vw] max-w-[300px] h-[330px] snap-start overflow-hidden rounded-2xl border border-gold-500/30 bg-emerald-950 text-left shadow-luxury focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 sm:w-auto sm:max-w-none sm:h-auto sm:shrink ${
                GALLERY_SPANS[i] ?? ''
              }`}
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                loading="lazy"
                style={i === 5 ? { objectPosition: '50% 20%' } : undefined}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent p-4 sm:p-5 opacity-100 sm:opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <span className="font-label text-2xs font-bold uppercase tracking-[0.18em] text-gold-300">
                  {img.category}
                </span>
                <span className="mt-1 font-heading text-sm sm:text-base font-semibold leading-snug text-white">
                  {img.title}
                </span>
              </div>
              <span className="absolute right-3 top-3 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gold-500/40 bg-emerald-950/80 text-gold-300 opacity-90 sm:opacity-0 backdrop-blur-sm transition-opacity sm:group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* ── 5. Inquiry ───────────────────────────────────────────────── */}
      <Section id="inquiry" tone="sunken">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
            <SectionHeading
              eyebrow="Press Communications"
              title="Request an Interview or"
              accent="Press Briefing"
              subtitle="Connect directly with the media and public relations secretariat for rapid editorial routing."
              center="tablet"
            />
            <a
              href={`mailto:${siteConfig.contact.mediaEmail}`}
              className="inline-flex items-center gap-3 rounded-full border border-gold-600/40 bg-surface-raised px-5 py-3 text-sm font-semibold text-ink-heading transition-colors hover:border-gold-600 hover:text-gold-800"
            >
              <Mail className="h-4 w-4 text-gold-600" />
              {siteConfig.contact.mediaEmail}
            </a>
          </div>
          <div className="lg:col-span-7">
            <MediaInquiryForm />
          </div>
        </div>
      </Section>

      <VideoModal
        isOpen={activeVideo !== null}
        onClose={() => setActiveVideo(null)}
        videoUrl={
          activeVideo
            ? `https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0`
            : undefined
        }
        title="Broadcast Interview"
      />

      {galleryIdx !== null && (
        <Lightbox
          images={visibleGallery}
          currentIndex={galleryIdx}
          isOpen
          onClose={() => setGalleryIdx(null)}
          onNavigate={setGalleryIdx}
        />
      )}
    </div>
  );
};
