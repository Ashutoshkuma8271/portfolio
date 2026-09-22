import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { MediaKitDownloadCard } from '../components/cards/MediaKitDownloadCard';
import { MediaInquiryForm } from '../components/forms/MediaInquiryForm';
import { Lightbox } from '../components/ui/Lightbox';
import { SEO } from '../components/ui/SEO';
import { mediaData } from '../data/media';
import { galleryImages } from '../data/gallery';
import { youtubeThumb, handleThumbError } from '../utils/youtube';
import focusCultural from '../assets/images/focus/cultural.webp';
import { 
  Play, 
  MapPin, 
  ArrowUpRight, 
  ArrowRight,
  X, 
  Expand
} from 'lucide-react';

export const MediaPressPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  // De-duplicated publication names for press ticker
  const publications = Array.from(
    new Set(mediaData.articles.map((a) => a.publication)),
  );

  return (
    <div className="overflow-hidden bg-[#FAF6F0]">
      <SEO
        title="Media & Press | Coverage, Keynotes & Broadcasts"
        description="Public intellect, international press coverage, broadcast interviews, and downloadable media kit of Zeenat Kureshi."
      />

      {/* Standardized Dual-Tone Luxury Header */}
      <PageHeader
        eyebrow="PUBLIC INTELLECT & GLOBAL PRESS"
        title="Media Coverage, Keynotes & Global Press Appearances"
        description="Archive of international broadcast interviews, leading print features, policy keynotes, and verified sovereign press releases."
        bgImage={focusCultural}
        mediaImage={youtubeThumb(mediaData.videos[0].youtubeId)}
        mediaAlt="H.E. Zeenat Kureshi — Keynote Address & GCC Bilateral Dialogue"
        mediaBadge="Featured Broadcast Keynote"
        videoYoutubeId={mediaData.videos[0].youtubeId}
        onPlayVideo={(id) => setActiveVideo(id)}
        stats={[
          { value: `${mediaData.articles.length}+`, label: 'Press Features' },
          { value: `${mediaData.videos.length}+`, label: 'Broadcast Keynotes' },
          { value: `${mediaData.speakingEngagements.length}+`, label: 'Global Summits' },
        ]}
        actionButton={
          <a
            href="#inquiry"
            className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950 via-[#0C221C] to-emerald-950 px-5 sm:px-6 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.12em] text-ivory-500 border border-gold-500/50 shadow-[0_4px_18px_-4px_rgba(7,21,17,0.4)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(7,21,17,0.55),0_0_12px_rgba(199,154,61,0.35)] hover:border-gold-400 active:translate-y-0 active:scale-[0.98]"
          >
            <span className="relative z-10">Submit Media Inquiry</span>
            <span className="relative z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
          </a>
        }
      />

      {/* Verified Press Coverage Ticker */}
      <div className="relative z-10 border-b border-gold-600/20 bg-white/90 py-4.5 backdrop-blur-sm shadow-xs">
        <div className="flex items-center gap-5">
          <span className="shrink-0 pl-4 font-label text-2xs font-bold uppercase tracking-[0.22em] text-[#8A6920] sm:pl-6 lg:pl-8">
            Verified Press Coverage
          </span>

          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, #000 5%, #000 85%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 5%, #000 85%, transparent)',
            }}
          >
            <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
              {[0, 1].map((run) => (
                <div key={run} className="flex items-center" aria-hidden={run === 1}>
                  {publications.map((pub) => (
                    <span key={pub} className="flex items-center whitespace-nowrap">
                      <span className="font-serif text-sm sm:text-base font-bold text-emerald-950">
                        {pub}
                      </span>
                      <span className="mx-5 sm:mx-7 h-1.5 w-1.5 rotate-45 bg-gold-600" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 
        ======================================================================
        1. PRESS COVERAGE & EDITORIAL FEATURES
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-ivory-500">
        <Container>
          <SectionHeading
            eyebrow="PRESS ARCHIVE"
            title="Featured Articles & International Press Coverage"
            subtitle="Leading publications covering Zeenat Kureshi's initiatives across trade diplomacy, cinema production, and civic leadership."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {mediaData.articles.map((art) => (
              <a
                key={art.id}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-2xl border border-ivory-800 shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1.5 hover:scale-[1.015] hover:border-gold-600/40 transition-all duration-300 ease-out group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans font-semibold text-sm text-gold-700">
                      {art.publication}
                    </span>
                    <Badge variant="gold" size="sm">
                      {art.tag}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-emerald-950 mb-3 group-hover:text-gold-700 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-ivory-700 flex items-center justify-between text-xs text-charcoal-500">
                  <span>{art.date}</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-900 group-hover:text-gold-600 transition-colors">
                    Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        2. VIDEO INTERVIEWS & BROADCAST APPEARANCES
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-emerald-950 text-ivory-500">
        <Container>
          <SectionHeading
            eyebrow="BROADCAST & INTERVIEWS"
            title="Broadcast Dialogues & Keynote Recordings"
            subtitle="Watch in-depth discussions on bilateral trade, cultural cinema, and institutional reform."
            isDark
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {mediaData.videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-emerald-900/60 border border-gold-500/30 rounded-2xl overflow-hidden shadow-luxury-lg hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.012] hover:border-gold-500/60 transition-all duration-300 ease-out group"
              >
                {/* Video Thumbnail */}
                <div
                  onClick={() => setActiveVideo(vid.youtubeId)}
                  className="relative aspect-video bg-emerald-950 cursor-pointer overflow-hidden"
                >
                  <img
                    src={vid.thumbnailUrl ?? youtubeThumb(vid.youtubeId)}
                    onError={(e) => handleThumbError(e, vid.youtubeId)}
                    alt={vid.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold-600 text-emerald-950 flex items-center justify-center shadow-gold-glow group-hover:scale-110 group-hover:bg-gold-500 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-emerald-950/90 text-ivory-500 text-2xs font-label rounded">
                    {vid.duration}
                  </div>
                </div>

                {/* Video Meta */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-gold-400 mb-2">
                    <span className="font-semibold">{vid.channel}</span>
                    <span className="text-ivory-800">{vid.date}</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory-500 mb-2 group-hover:text-gold-300 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-ivory-700">
                    Topic: {vid.topic}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-emerald-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-emerald-950/80 hover:bg-gold-600 text-ivory-500 hover:text-emerald-950 transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1`}
                title="Broadcast Interview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* 
        ======================================================================
        3. SPEAKING ENGAGEMENTS CALENDAR
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-ivory-500">
        <Container>
          <SectionHeading
            eyebrow="GLOBAL STAGES"
            title="Speaking Engagements & Keynote Addresses"
            subtitle="Selected addresses at sovereign trade summits, cultural conclaves, and policy conventions."
          />

          <div className="space-y-4 mt-12">
            {mediaData.speakingEngagements.map((spk, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-800 shadow-luxury hover:shadow-luxury-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-label font-bold text-gold-700 bg-gold-500/10 px-2.5 py-0.5 rounded-full">
                      {spk.date}
                    </span>
                    <Badge variant="emerald" size="sm">
                      {spk.role}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-emerald-950 mb-1">
                    {spk.title}
                  </h3>

                  <p className="text-xs font-semibold text-charcoal-600 mb-1">
                    {spk.event}
                  </p>
                  
                  <p className="text-xs text-charcoal-500">
                    Topic: {spk.topic}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-emerald-900 shrink-0 bg-ivory-600 px-4 py-2.5 rounded-xl">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>{spk.location}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        4. EVENT GALLERY WITH LIGHTBOX
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-ivory-600 border-t border-ivory-800">
        <Container>
          <SectionHeading
            eyebrow="PRESS PHOTOGRAPHY"
            title="High-Resolution Press & Event Gallery"
            subtitle="Approved photography for publication and editorial circulation."
            center
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setSelectedGalleryIndex(index)}
                className="group relative rounded-2xl overflow-hidden border border-gold-500/30 bg-emerald-950 shadow-luxury cursor-pointer aspect-[4/3]"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-ivory-500">
                  <span className="text-2xs uppercase tracking-widest font-label text-gold-400 font-bold mb-1">
                    {img.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-ivory-500 mb-1">
                    {img.title}
                  </h4>
                  <p className="text-xs text-ivory-700 line-clamp-2">
                    {img.caption}
                  </p>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-950/80 text-gold-400 border border-gold-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        5. DOWNLOADABLE OFFICIAL MEDIA KIT SECTION
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-ivory-500">
        <Container size="lg">
          <SectionHeading
            eyebrow="MEDIA ASSETS"
            title="Download Official Media Kit & Speaker Rider"
            subtitle="For event curators, journalists, and institutional publishers."
            center
          />

          <div className="mt-12">
            <MediaKitDownloadCard />
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        6. STRUCTURED MEDIA & PRESS INQUIRY FORM
        ======================================================================
      */}
      <section id="inquiry" className="py-20 lg:py-28 bg-ivory-600 border-t border-ivory-800 scroll-mt-20">
        <Container size="lg">
          <SectionHeading
            eyebrow="PRESS COMMUNICATIONS"
            title="Submit an Official Press or Interview Inquiry"
            subtitle="Connect directly with the media & public relations secretariat for rapid editorial routing."
            center
          />

          <div className="mt-12">
            <MediaInquiryForm />
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedGalleryIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={selectedGalleryIndex}
          isOpen={selectedGalleryIndex !== null}
          onClose={() => setSelectedGalleryIndex(null)}
          onNavigate={(newIndex) => setSelectedGalleryIndex(newIndex)}
        />
      )}
    </div>
  );
};
