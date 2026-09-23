import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { BannerButton } from '../components/banner/BannerButton';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SEO } from '../components/ui/SEO';
import { aboutData } from '../data/about';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  X
} from 'lucide-react';
import { eventPhotos } from '../data/eventPhotos';
import { TimelineSection } from '../components/about/TimelineSection';
import { InternationalRolesSection } from '../components/about/InternationalRolesSection';
import { AwardsSection } from '../components/about/AwardsSection';

import tenetBg1 from '../assets/images/tenets/tenet-bg-1.jpg';
import tenetBg2 from '../assets/images/tenets/tenet-bg-2.jpg';
import tenetBg3 from '../assets/images/tenets/tenet-bg-3.jpg';
import tenetBg4 from '../assets/images/tenets/tenet-bg-4.jpg';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const TENET_BG_IMAGES = [
  tenetBg1,
  tenetBg2,
  tenetBg3,
  tenetBg4
];


export const AboutPage: React.FC = () => {
  const [bioOpen, setBioOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="overflow-hidden bg-surface">
      <SEO
        title="About Zeenat Kureshi | Biography & Leadership Journey"
        description="Learn about Zeenat Kureshi's leadership journey across GCC-India trade diplomacy, international cinema production, and national women empowerment."
      />

      {/* Page Header Banner with Video & Portrait */}
      <PageHeader
        section="about"
        breadcrumb="About"
        eyebrow="Biography & Diplomatic Mandate"
        title="Architect of Bilateral Commerce, Cinema Visionary &"
        accent="Transformational Leader"
        description={aboutData.shortIntro}
        videoYoutubeId="ndXivLGTZ6w"
        onPlayVideo={(id) => setActiveVideo(id)}
        scrollTargetId="dossier"
        stats={[
          { value: String(aboutData.internationalRoles.length), label: 'International Roles' },
          { value: String(aboutData.timeline.length), label: 'Career Milestones' },
          { value: String(aboutData.awards.length), label: 'Honours & Citations' },
        ]}
        actionButton={<BannerButton href="#dossier">Explore Diplomatic Dossier</BannerButton>}
      />

      {/* 
        ======================================================================
        1. DETAILED BIOGRAPHY & EXECUTIVE DOSSIER
        ======================================================================
      */}
      <section id="dossier" className="relative bg-surface py-14 sm:py-20 lg:py-28">
        {/* Subtle background ambient texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(199,154,61,0.07),transparent)]"
        />

        <Container className="relative z-10 px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">

            {/* Left: Editorial Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <SectionHeading
                eyebrow="Executive Biography"
                title="A Multifaceted Journey of Purpose & Statecraft"
                subtitle="Uniting sovereign trade corridors, celebrated arts, and nationwide grassroots leadership."
                className="mb-6 sm:mb-8"
              />

              {/* Bio Paragraphs with Luxury Editorial Formatting */}
              <div className="space-y-5 font-sans text-[0.95rem] sm:text-base lg:text-lg leading-relaxed text-ink">
                {aboutData.bioParagraphs.map((para, idx) => (idx < 2 || bioOpen) && (
                  <p 
                    key={idx} 
                    className={idx === 0 
                      ? "text-base sm:text-lg lg:text-xl font-medium text-ink-heading leading-relaxed first-letter:float-left first-letter:mr-2.5 sm:first-letter:mr-3 first-letter:font-heading first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:text-gold-600 first-letter:leading-none" 
                      : "text-ink-soft"}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {aboutData.bioParagraphs.length > 2 && (
                <div className="mt-8 flex items-center justify-start w-full">
                  <BannerButton
                    variant="secondary"
                    className="w-full sm:w-auto min-w-[200px] justify-center cursor-pointer shadow-xs hover:shadow-gold-glow"
                    onClick={() => setBioOpen((o) => !o)}
                  >
                    {bioOpen ? 'Show summary' : 'Read full biography'}
                  </BannerButton>
                </div>
              )}
            </div>

            {/* Right: Portrait & Diplomatic Credentials (5 cols) */}
            <div className="lg:col-span-5 w-full max-w-[380px] sm:max-w-[440px] mx-auto lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                className="relative overflow-hidden rounded-3xl bg-surface-raised p-3.5 border border-gold-600/40 shadow-[0_24px_56px_-12px_rgba(7,24,19,0.5),0_0_24px_rgba(199,154,61,0.15)]"
              >
                {/* Corner filigree accents */}
                <div aria-hidden className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
                <div aria-hidden className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />

                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-emerald-950">
                  <img
                    src={eventPhotos.aaccCredential.src}
                    alt={eventPhotos.aaccCredential.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: eventPhotos.aaccCredential.focal }}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Top Accreditation Pill */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-emerald-950/85 px-3 py-1 backdrop-blur-md">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                    <span className="font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-300">
                      Diplomatic Mandate
                    </span>
                  </div>

                  {/* Bottom Portrait Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="font-heading text-2xl font-bold leading-tight text-white mb-1">
                      H.E. Zeenat Kureshi
                    </p>
                    <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
                      GCC–India Trade Commissioner &middot; Producer &middot; National Leader
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* 
            ======================================================================
            Core Leadership Tenets -- Full-Width 4-Card Responsive Grid
            ======================================================================
          */}
          <div className="mt-16 sm:mt-20 border-t border-hairline/90 pt-12 sm:pt-16">
            <div className="mb-12 text-center max-w-2xl mx-auto px-4">
              <span className="mb-2 block font-label text-xs font-bold uppercase tracking-[0.22em] text-[#A9812A]">
                Strategic Pillars
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-ink-heading">
                Core Leadership Tenets
              </h3>
              <div className="my-3 flex items-center justify-center gap-2">
                <span className="h-[1.5px] w-12 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              </div>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                Foundational principles guiding bilateral commerce, high-impact cultural media, and nationwide civic empowerment.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutData.leadershipPillars.map((pillar, idx) => {
                const bgImage = TENET_BG_IMAGES[idx % TENET_BG_IMAGES.length];
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT }}
                    className="group relative flex flex-col rounded-2xl overflow-hidden border border-gold-500/30 bg-[#061B14] shadow-luxury transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold-400 hover:shadow-[0_16px_36px_rgba(10,30,22,0.35)]"
                  >
                    {/* Clear HD Image Frame */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-950">
                      <img
                        src={bgImage}
                        alt={pillar.title}
                        className="h-full w-full object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Subtle Bottom Vignette */}
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#061B14] to-transparent" />
                    </div>

                    {/* Centered Professional Content Area */}
                    <div className="relative p-5 sm:p-6 flex flex-col items-center text-center flex-1 justify-between bg-[#061B14]">
                      <div>
                        <h4 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide transition-colors group-hover:text-gold-300 mb-2">
                          {pillar.title}
                        </h4>
                        <div className="mb-2.5 mx-auto h-[1.5px] w-8 rounded-full bg-gold-500/60 transition-all duration-300 group-hover:w-14 group-hover:bg-gold-400" />
                        <p className="font-sans text-xs sm:text-sm leading-relaxed text-neutral-300/90">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
      <section className="border-t border-hairline bg-surface-sunken py-14">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="max-w-xl">
              <p className="font-label text-2xs font-bold uppercase tracking-[0.2em] text-gold-800 dark:text-gold-300">Press photography</p>
              <h3 className="mt-2 font-heading text-xl font-bold text-ink-heading">Summits, panels and conferences in pictures</h3>
            </div>
            <BannerButton variant="secondary" to="/media-press#gallery" className="w-full sm:w-auto min-w-[220px] justify-center">View the event gallery</BannerButton>
          </div>
        </Container>
      </section>

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
