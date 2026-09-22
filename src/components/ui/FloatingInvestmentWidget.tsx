import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InvestmentModal } from './InvestmentModal';
import { CollaborateModal } from './CollaborateModal';
import { MediaInquiryModal } from './MediaInquiryModal';
import type { InvestSectorId } from '../../data/investSectors';


export const FloatingInvestmentWidget: React.FC = () => {
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isCollaborateOpen, setIsCollaborateOpen] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  // A sector tile on the page can open the enquiry with that sector pre-selected.
  const [investSector, setInvestSector] = useState<InvestSectorId | null>(null);
  const { pathname } = useLocation();

  // Every page opens with a full-bleed banner whose lower edge carries key
  // figures; a floating pill would sit right on top of them. It appears once
  // the visitor has scrolled past the banner.
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [investInView, setInvestInView] = useState(false);
  useEffect(() => {
    setInvestInView(false);
    let io: IntersectionObserver | undefined;
    // the page is lazy-loaded, so the section may appear a moment after the route changes
    const timers = [0, 500, 1500].map((ms) =>
      window.setTimeout(() => {
        const el = document.getElementById('invest');
        if (!el || io || typeof IntersectionObserver === 'undefined') return;
        io = new IntersectionObserver(([e]) => setInvestInView(e.isIntersecting), { threshold: 0.12 });
        io.observe(el);
      }, ms),
    );
    return () => {
      timers.forEach(window.clearTimeout);
      io?.disconnect();
    };
  }, [pathname]);

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

  const isSuppressedPage = pathname === '/contact' || pathname === '/trade-investment';
  const showFab = pastHero && !investInView && !isSuppressedPage;

  return (
    <>
      {/* Floating Action Button */}
      <div
        className={`fixed bottom-5 left-3.5 sm:bottom-8 sm:left-6 z-40 select-none transition-all duration-300 ${
          showFab ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            setInvestSector(null);
            setIsInvestmentOpen(true);
          }}
          className="group relative flex items-center gap-3 rounded-full border-2 border-gold-500/80 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 py-3 px-5 sm:py-3.5 sm:px-6 font-label text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-ivory-500 shadow-[0_10px_30px_rgba(7,21,17,0.7),0_0_24px_rgba(199,154,61,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold-400 hover:shadow-[0_14px_40px_rgba(7,21,17,0.9),0_0_32px_rgba(212,175,55,0.6)] active:scale-95 cursor-pointer"
          aria-label="Invest with us — open investor enquiry"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-500" />
          </span>

          <span className="font-bold text-white group-hover:text-gold-300 transition-colors whitespace-nowrap">
            Invest With Us
          </span>
        </button>
      </div>

      {/* Global Modals in Premium Luxury White Theme */}
      <InvestmentModal isOpen={isInvestmentOpen} onClose={handleCloseInvestment} initialSector={investSector} />
      <CollaborateModal isOpen={isCollaborateOpen} onClose={() => setIsCollaborateOpen(false)} />
      <MediaInquiryModal isOpen={isMediaOpen} onClose={() => setIsMediaOpen(false)} />
    </>
  );
};
