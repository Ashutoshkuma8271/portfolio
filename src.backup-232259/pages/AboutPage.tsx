import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Lightbox } from '../components/ui/Lightbox';
import { SEO } from '../components/ui/SEO';
import { aboutData } from '../data/about';
import { galleryImages } from '../data/gallery';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Expand,
  Scale,
  Film,
  HeartHandshake,
  Building2,
  ShieldCheck,
  TrendingUp,
  Users,
  MapPin,
  X,
  ArrowRight
} from 'lucide-react';
import heroPortrait from '../assets/images/hero-zeenat.jpg';
import heroPortraitWebp from '../assets/images/hero-zeenat.webp';
import heroPortraitAvif from '../assets/images/hero-zeenat.avif';
import focusPartnerships from '../assets/images/focus/partnerships.webp';
import { TimelineSection } from '../components/about/TimelineSection';
import { InternationalRolesSection } from '../components/about/InternationalRolesSection';
import { AwardsSection } from '../components/about/AwardsSection';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const TENET_ICONS = [
  Scale,
  Film,
  HeartHandshake,
  Building2
];

const GALLERY_CATEGORIES = ['All Archive', 'Trade', 'Leadership', 'Cinema', 'Global Events'];

export const AboutPage: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>('All Archive');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filteredGallery = activeGalleryCategory === 'All Archive'
    ? galleryImages
    : galleryImages.filter(img => img.category.toLowerCase() === activeGalleryCategory.toLowerCase() || (activeGalleryCategory === 'Trade' && img.category === 'Trade') || (activeGalleryCategory === 'Leadership' && img.category === 'Leadership') || (activeGalleryCategory === 'Cinema' && img.category === 'Cinema'));

  return (
    <div className="overflow-hidden bg-[#FAF6F0]">
      <SEO
        title="About Zeenat Kureshi | Biography & Leadership Journey"
        description="Learn about Zeenat Kureshi's leadership journey across GCC-India trade diplomacy, international cinema production, and national women empowerment."
      />

      {/* Page Header Banner with Video & Portrait */}
      <PageHeader
        eyebrow="BIOGRAPHY & DIPLOMATIC MANDATE"
        title="Architect of Bilateral Commerce, Cinema Visionary & Transformational Leader"
        description={aboutData.shortIntro}
        bgImage={focusPartnerships}
        mediaImage={heroPortrait}
        mediaAlt="H.E. Zeenat Kureshi — GCC-India Trade Commissioner & Film Producer"
        mediaBadge="Official Monogram: HZK"
        videoYoutubeId="ndXivLGTZ6w"
        onPlayVideo={(id) => setActiveVideo(id)}
        stats={[
          { value: '₹3,750+ Cr', label: 'Bilateral Pipeline' },
          { value: '50,000+', label: 'Women Mobilized' },
          { value: '6 Sovereign', label: 'GCC Markets' },
        ]}
        actionButton={
          <a
            href="#dossier"
            className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950 via-[#0C221C] to-emerald-950 px-5 sm:px-6 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.12em] text-ivory-500 border border-gold-500/50 shadow-[0_4px_18px_-4px_rgba(7,21,17,0.4)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(7,21,17,0.55),0_0_12px_rgba(199,154,61,0.35)] hover:border-gold-400 active:translate-y-0 active:scale-[0.98]"
          >
            <span className="relative z-10">Explore Diplomatic Dossier</span>
            <span className="relative z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
          </a>
        }
      />

      {/* 
        ======================================================================
        1. DETAILED BIOGRAPHY & EXECUTIVE DOSSIER
        ======================================================================
      */}
      <section id="dossier" className="relative bg-[#FAF6F0] py-20 lg:py-28">
        {/* Subtle background ambient texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(199,154,61,0.07),transparent)]"
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">

            {/* Left: Editorial Content (7 cols) */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Executive Biography"
                title="A Multifaceted Journey of Purpose & Statecraft"
                subtitle="Uniting sovereign trade corridors, celebrated arts, and nationwide grassroots leadership."
              />

              {/* Bio Paragraphs with Luxury Editorial Formatting */}
              <div className="space-y-6 font-sans text-base leading-relaxed text-charcoal-800 sm:text-lg">
                {aboutData.bioParagraphs.map((para, idx) => (
                  <p key={idx} className={idx === 0 ? "text-lg sm:text-xl font-medium text-emerald-950 leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-gold-600 first-letter:leading-none" : ""}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Leadership Pillars / Core Tenets */}
              <div className="mt-14 border-t border-ivory-800/90 pt-10">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <span className="mb-1 block font-label text-xs font-semibold uppercase tracking-[0.22em] text-[#A9812A]">
                      Strategic Pillars
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-emerald-950">
                      Core Leadership Tenets
                    </h3>
                  </div>
                  <div className="hidden h-[2px] w-16 bg-gradient-to-r from-gold-500 to-transparent sm:block" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {aboutData.leadershipPillars.map((pillar, idx) => {
                    const IconComponent = TENET_ICONS[idx % TENET_ICONS.length];
                    return (
                      <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT }}
                        className="group relative rounded-2xl border border-gold-600/20 bg-white p-6 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_12px_28px_-6px_rgba(18,51,43,0.12)]"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-700 transition-all duration-300 group-hover:bg-gold-600 group-hover:text-emerald-950">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h4 className="font-serif text-base font-bold text-emerald-950 transition-colors group-hover:text-gold-800">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="font-sans text-sm leading-relaxed text-charcoal-700">
                          {pillar.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Portrait & Diplomatic Credentials (5 cols) */}
            <div className="top-28 lg:sticky lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-b from-[#081D17] to-[#04100D] p-3.5 border border-gold-600/40 shadow-[0_24px_56px_-12px_rgba(7,24,19,0.5),0_0_24px_rgba(199,154,61,0.15)]"
              >
                {/* Corner filigree accents */}
                <div aria-hidden className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
                <div aria-hidden className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />

                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-emerald-950">
                  <picture>
                    <source srcSet={heroPortraitAvif} type="image/avif" />
                    <source srcSet={heroPortraitWebp} type="image/webp" />
                    <img
                      src={heroPortrait}
                      alt="H.E. Zeenat Kureshi, Trade Commissioner for the GCC"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[center_18%] [filter:contrast(1.04)_saturate(0.98)] transition-transform duration-700 hover:scale-105"
                    />
                  </picture>

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04100D]/95 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Top Accreditation Pill */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-emerald-950/85 px-3 py-1 backdrop-blur-md">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                    <span className="font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-300">
                      Diplomatic Mandate
                    </span>
                  </div>

                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="font-serif text-2xl font-bold leading-tight text-white mb-1">
                      H.E. Zeenat Kureshi
                    </p>
                    <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
                      GCC–India Trade Commissioner &middot; Producer &middot; National Leader
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Executive Credentials & Track Record */}
              <div className="rounded-2xl border border-gold-600/30 bg-[#081D17] p-6 shadow-luxury">
                <div className="mb-5 flex items-center justify-between border-b border-gold-500/20 pb-4">
                  <h4 className="flex items-center gap-2.5 font-serif text-lg font-bold text-white">
                    <Award className="h-4.5 w-4.5 text-gold-400" />
                    Sovereign & Civic Track Record
                  </h4>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <ul className="space-y-4 font-sans text-sm leading-relaxed text-ivory-700">
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 mt-0.5">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="font-semibold text-white">₹3,750+ Cr ($450M+) Pipeline:</strong>
                      <p className="text-xs text-ivory-800 mt-0.5">Direct facilitation of bilateral non-oil investments, energy, and logistics corridors.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 mt-0.5">
                      <Users className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="font-semibold text-white">50,000+ Women Mobilized:</strong>
                      <p className="text-xs text-ivory-800 mt-0.5">Presidential oversight across 14 state chapters in enterprise, literacy, and legal advocacy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 mt-0.5">
                      <Film className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="font-semibold text-white">Global Cinema Envoy:</strong>
                      <p className="text-xs text-ivory-800 mt-0.5">Feature productions and documentaries screened at Cannes, IFFI Goa, and Dubai Film Festival.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/*
        ======================================================================
        2. LEADERSHIP JOURNEY — CHRONOLOGY OF SERVICE
        ======================================================================
      */}
      <TimelineSection />

      {/*
        ======================================================================
        3. INTERNATIONAL ROLES & DIPLOMATIC MANDATES
        ======================================================================
      */}
      <InternationalRolesSection />

      {/*
        ======================================================================
        4. DISTINGUISHED HONORS & RECOGNITIONS
        ======================================================================
      */}
      <AwardsSection />

      {/* 
        ======================================================================
        5. PROFESSIONAL PHOTO GALLERY WITH FILTERING & LIGHTBOX
        ======================================================================
      */}
      <section className="relative py-20 lg:py-28 bg-[#FAF6F0] border-t border-ivory-800">
        <Container>
          <SectionHeading
            eyebrow="EDITORIAL ARCHIVE"
            title="Moments of Statecraft, Cinema & Community"
            subtitle="Explore official photography from bilateral trade summits, state conventions, and international film delegations."
            center
          />

          {/* Category Filter Pills */}
          <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-2.5">
            {GALLERY_CATEGORIES.map((category) => {
              const isActive = activeGalleryCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveGalleryCategory(category)}
                  className={`rounded-full px-5 py-2 font-label text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                    isActive
                      ? 'border border-gold-500 bg-emerald-950 text-gold-400 shadow-md scale-105'
                      : 'border border-ivory-800 bg-white text-charcoal-700 hover:border-gold-500/50 hover:text-emerald-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredGallery.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedImageIndex(galleryImages.findIndex(g => g.id === img.id))}
                  className="group relative rounded-2xl overflow-hidden border border-gold-500/30 bg-emerald-950 shadow-luxury cursor-pointer aspect-[4/3]"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-ivory-500">
                    <span className="text-2xs uppercase tracking-widest font-label text-gold-400 font-bold mb-1">
                      {img.category} &bull; {img.date}
                    </span>
                    <h4 className="font-serif text-base font-bold text-white mb-1 leading-snug">
                      {img.title}
                    </h4>
                    <p className="text-xs text-ivory-700 line-clamp-2 mb-2">
                      {img.caption}
                    </p>
                    <div className="flex items-center gap-1.5 text-2xs text-gold-400 font-sans">
                      <MapPin className="h-3 w-3" />
                      <span>{img.location}</span>
                    </div>
                  </div>

                  {/* Expand icon pill */}
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-emerald-950/80 text-gold-400 border border-gold-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-md">
                    <Expand className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={selectedImageIndex}
          isOpen={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={(newIndex) => setSelectedImageIndex(newIndex)}
        />
      )}

      {/* Video Keynote Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-gold-500/40 bg-emerald-950 shadow-2xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="absolute top-3.5 right-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/80 text-gold-400 border border-gold-500/30 hover:bg-gold-500 hover:text-emerald-950 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                  title="Official Diplomatic Keynote Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
