import React from 'react';
import { SEO } from '../components/ui/SEO';
import { HeroSection } from '../components/home/HeroSection';
import { CollaborationStrip } from '../components/home/CollaborationStrip';
import { AboutSection } from '../components/home/AboutSection';
import { StatsSection } from '../components/home/StatsSection';
import { FocusAreasSection } from '../components/home/FocusAreasSection';
import { VisionSection } from '../components/home/VisionSection';

export const HomePage: React.FC = () => {
  const handleOpenInvestmentModal = () => {
    window.dispatchEvent(new CustomEvent('open-investment-modal'));
  };

  return (
    <div className="overflow-hidden bg-[#FAF6F0] text-charcoal-900 font-sans relative">
      <SEO />

      {/*
        ======================================================================
        1. EDITORIAL HERO -- full-bleed portrait panel, nameplate & credentials
        ======================================================================
      */}
      <HeroSection onOpenInvestmentModal={handleOpenInvestmentModal} />

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

      {/*
        ======================================================================
        4. STATS BAND -- count-up numbers, substantiated with real context
        ======================================================================
      */}
      <StatsSection />

      {/*
        ======================================================================
        5. KEY FOCUS AREAS -- graded photography, numbered cards
        ======================================================================
      */}
      <FocusAreasSection />

      {/*
        ======================================================================
        6. A SHARED VISION -- closing panel, mirrors the hero's globe motif
        ======================================================================
      */}
      <VisionSection />
    </div>
  );
};
