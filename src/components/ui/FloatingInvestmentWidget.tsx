import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvestmentModal } from './InvestmentModal';
import { CollaborateModal } from './CollaborateModal';
import { MediaInquiryModal } from './MediaInquiryModal';
import type { InvestSectorId } from '../../data/investSectors';

export const FloatingInvestmentWidget: React.FC = () => {
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isCollaborateOpen, setIsCollaborateOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [investSector, setInvestSector] = useState<InvestSectorId | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after slight scroll (100px) or after 1.5 seconds so it is readily available
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      }
    };

    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Manual event triggers across the entire application
  useEffect(() => {
    const openInvest = (e: Event) => {
      setInvestSector(((e as CustomEvent).detail?.sector as InvestSectorId | null) ?? null);
      setIsInvestmentOpen(true);
    };
    const openCollab = () => setIsCollaborateOpen(true);
    const openMedia = () => setIsMediaOpen(true);

    window.addEventListener('open-investment-modal', openInvest);
    window.addEventListener('open-collaborate-modal', openCollab);
    window.addEventListener('open-media-modal', openMedia);

    return () => {
      window.removeEventListener('open-investment-modal', openInvest);
      window.removeEventListener('open-collaborate-modal', openCollab);
      window.removeEventListener('open-media-modal', openMedia);
    };
  }, []);

  const handleCloseInvestment = () => {
    setIsInvestmentOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 select-none pointer-events-auto"
          >
            <button
              type="button"
              onClick={() => {
                setInvestSector(null);
                setIsInvestmentOpen(true);
              }}
              className="group relative flex items-center gap-2.5 rounded-full border border-gold-500/70 bg-[#071E18]/95 px-4 py-2.5 sm:px-5 sm:py-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(199,154,61,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold-400 hover:shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_28px_rgba(212,175,55,0.45)] active:scale-95 cursor-pointer"
              aria-label="Invest with us — open investor enquiry"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E5C270]" />
              </span>

              <span className="font-bold text-white group-hover:text-gold-300 transition-colors whitespace-nowrap text-[0.72rem] sm:text-xs">
                INVEST WITH US
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Modals */}
      <InvestmentModal isOpen={isInvestmentOpen} onClose={handleCloseInvestment} initialSector={investSector} />
      <CollaborateModal isOpen={isCollaborateOpen} onClose={() => setIsCollaborateOpen(false)} />
      <MediaInquiryModal isOpen={isMediaOpen} onClose={() => setIsMediaOpen(false)} />
    </>
  );
};
