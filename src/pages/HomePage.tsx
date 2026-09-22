import React from 'react';
import { SEO } from '../components/ui/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { CollaborationStrip } from '../components/home/CollaborationStrip';
import { AboutSection } from '../components/home/AboutSection';
import { InvestSection } from '../components/home/InvestSection';
import { SectorIntelligence } from '../components/trade/SectorIntelligence';
import { FocusAreasSection } from '../components/home/FocusAreasSection';
import { SpotlightSection } from '../components/home/SpotlightSection';
import { InsightsTeaser } from '../components/home/InsightsTeaser';
import { VisionSection } from '../components/home/VisionSection';

export const HomePage: React.FC = () => {
  const handleOpenCollaborateModal = () => {
    window.dispatchEvent(new CustomEvent('open-collaborate-modal'));
  };

  const handleOpenInvestmentModal = () => {
    window.dispatchEvent(new CustomEvent('open-investment-modal'));
  };

  return (
    <div className="overflow-hidden bg-surface text-ink font-sans relative">
      <SEO />

      {/*
        ======================================================================
        1. EDITORIAL HERO -- full-bleed portrait panel, nameplate & credentials
        ======================================================================
      */}
      <HeroSection 
        onOpenCollaborateModal={handleOpenCollaborateModal}
        onOpenInvestmentModal={handleOpenInvestmentModal}
      />

      {/*
        ======================================================================
        2. IN COLLABORATION WITH GCC & GOVERNMENT OF INDIA STRIP
        ======================================================================
      */}
      <CollaborationStrip />

      {/*
        ======================================================================
        3. ABOUT SECTION -- editorial 3-column layout, numbered focus pillars
        ======================================================================
      */}
      <AboutSection />

      {/* 4. FOUR PILLARS -- what she does, in pictures */}
      <FocusAreasSection />

      {/* 5. INVEST WITH US -- five sectors, click straight into the enquiry */}
      <InvestSection />

      {/* 6. LIVE GCC DESK -- real headlines for each sector + "My View" (moved here from the Trade page) */}
      <div id="live-desk" className="scroll-mt-20">
        <SectorIntelligence />
      </div>

      {/* 7. IN THE SPOTLIGHT -- featured keynote + latest press */}
      <SpotlightSection />

      {/* 8. LATEST INSIGHTS -- a door into the Insights section */}
      <InsightsTeaser />

      {/*
        ======================================================================
        6. A SHARED VISION -- closing panel, mirrors the hero's globe motif
        ======================================================================
      */}
      <VisionSection />
    </div>
  );
};
