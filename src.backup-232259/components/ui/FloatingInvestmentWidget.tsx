import React, { useState, useEffect } from 'react';
import { InvestmentModal } from './InvestmentModal';

export const FloatingInvestmentWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Listen for global custom trigger event from buttons on any page
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-investment-modal', handleOpenEvent);

    // Auto-trigger investment prospectus popup after 3.5s for first-time session visitors
    const hasSeenModal = sessionStorage.getItem('hasSeenInvestmentPopup');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenInvestmentPopup', 'true');
      }, 3500);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('open-investment-modal', handleOpenEvent);
      };
    }

    return () => {
      window.removeEventListener('open-investment-modal', handleOpenEvent);
    };
  }, []);

  return (
    <>
      {/* Floating Action Button (Clean, luxury diplomatic styling - visible across all pages) */}
      <div className="fixed bottom-4 left-3 xs:bottom-5 xs:left-4 sm:bottom-6 sm:left-6 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 xs:gap-2.5 rounded-full border-2 border-gold-400/90 bg-gradient-to-r from-emerald-950 via-[#0C221C] to-emerald-950 py-2 px-3.5 xs:py-2.5 xs:px-4 sm:px-5 font-label text-[0.62rem] xs:text-2xs sm:text-xs font-bold uppercase tracking-[0.12em] xs:tracking-[0.14em] text-ivory-500 shadow-[0_8px_24px_rgba(7,21,17,0.6),0_0_18px_rgba(199,154,61,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold-300 hover:shadow-[0_12px_32px_rgba(7,21,17,0.8),0_0_26px_rgba(212,175,55,0.6)] active:scale-95 cursor-pointer"
          aria-label="Open Investment & Trade Discussion"
        >
          {/* Animated Blinking Live Beacon */}
          <span className="relative flex h-2 xs:h-2.5 w-2 xs:w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex h-2 xs:h-2.5 w-2 xs:w-2.5 rounded-full bg-gold-500" />
          </span>

          <span className="font-bold text-white group-hover:text-gold-300 transition-colors whitespace-nowrap">
            Investment &amp; Trade Discussion
          </span>
        </button>
      </div>

      {/* Sovereign Investment Modal */}
      <InvestmentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
