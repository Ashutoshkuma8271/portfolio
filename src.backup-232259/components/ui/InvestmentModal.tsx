import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  User, 
  Clock,
  ShieldCheck,
  MessageCircle,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvestmentModal: React.FC<InvestmentModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    ticketSize: '₹40 Cr – ₹200 Cr ($5M–$25M)',
    corridor: 'UAE (Dubai / Abu Dhabi ⟷ India)'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.emailOrPhone) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const ref = `ZK-DIPL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(ref);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleDownloadDossier = () => {
    const dossierContent = `================================================================================
OFFICE OF H.E. ZEENAT KURESHI
GCC–India Trade Commissioner | Executive Secretariat
================================================================================
CONFIDENTIAL SOVEREIGN BRIEFING DOSSIER RECEIPT
Reference ID: ${referenceId || 'ZK-DIPL-2026-8821'}
Date of Dispatch: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

APPLICANT DETAILS:
- Name: ${formData.fullName || 'Strategic Investor'}
- Contact: ${formData.emailOrPhone || 'Registered Entity'}
- Target Bilateral Corridor: ${formData.corridor}
- Allocation / Ticket Size: ${formData.ticketSize}

KEY CORRIDOR HIGHLIGHTS:
1. Bilateral Non-Oil Trade Pipeline: ₹3,750+ Cr ($450M+ USD)
2. CEPA Tariff Schedule: 0% Duty Arbitrage on key gems, tech & green commodities
3. Designated Regional Desks:
   - Mumbai: Bandra Kurla Complex (BKC), India
   - Dubai: Dubai International Financial Centre (DIFC), UAE
4. SLA: Formal response within 24–48 business hours via senior commercial desk.

Secretariat Desk: ${siteConfig.contact.email}
WhatsApp Direct: +${siteConfig.contact.whatsappNumber}
================================================================================`;
    const blob = new Blob([dossierContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ZK-Sovereign-Briefing-${referenceId || 'Dossier'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello Executive Secretariat of Zeenat Kureshi, I have submitted a sovereign briefing request [${referenceId || 'Investment Inquiry'}] regarding ${formData.corridor} with allocation size ${formData.ticketSize}.`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#04100D]/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-gold-500/50 bg-gradient-to-b from-[#081D17] via-[#0C221C] to-[#051410] text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(199,154,61,0.2)] p-6 sm:p-8 my-auto"
          >
            {/* Top gold filigree corners */}
            <div aria-hidden className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-gold-400/60 pointer-events-none" />
            <div aria-hidden className="absolute top-4 right-14 h-6 w-6 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 bg-emerald-950/80 text-gold-400 transition-all hover:bg-gold-500 hover:text-emerald-950 hover:scale-105 cursor-pointer shadow-md z-20"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Content Area */}
            {isSubmitted ? (
              <div className="py-6 sm:py-8 text-center animate-fade-in space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-500/20 text-gold-400 shadow-[0_0_24px_rgba(199,154,61,0.4)]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1.5">
                    Strategic Briefing Dispatched
                  </h3>
                  <p className="mx-auto max-w-md font-sans text-xs sm:text-sm text-ivory-600 leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. The Office of H.E. Zeenat Kureshi has logged your bilateral interest for <strong>{formData.corridor}</strong>.
                  </p>
                </div>

                {/* Filing Summary Card */}
                <div className="mx-auto max-w-lg rounded-2xl border border-gold-500/30 bg-emerald-950/80 p-4 text-left text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-gold-500/20 pb-2">
                    <span className="font-label text-2xs font-bold uppercase tracking-wider text-gold-400">
                      Tracking Reference ID:
                    </span>
                    <span className="font-mono text-xs font-bold text-white bg-gold-500/20 px-2.5 py-0.5 rounded border border-gold-500/40">
                      {referenceId}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-ivory-600 text-2xs sm:text-xs">
                    <div>
                      <span className="block text-[0.62rem] uppercase text-ivory-700">Corridor</span>
                      <span className="text-white font-semibold">{formData.corridor}</span>
                    </div>
                    <div>
                      <span className="block text-[0.62rem] uppercase text-ivory-700">Allocation</span>
                      <span className="text-gold-400 font-semibold">{formData.ticketSize}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gold-500/20 flex items-center gap-1.5 text-2xs text-emerald-300">
                    <Clock className="h-3 w-3 shrink-0" />
                    <span>Secretariat Review: Direct response within 24–48 business hours (BKC / DIFC).</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/trade-investment"
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 px-6 py-2.5 font-label text-xs font-bold uppercase tracking-wider text-emerald-950 shadow-gold-glow transition-all hover:bg-gold-400 hover:scale-[1.02]"
                  >
                    <span>Explore Live Sovereign Terminal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleDownloadDossier}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-emerald-950/90 px-5 py-2.5 font-label text-xs font-bold uppercase tracking-wider text-gold-300 hover:text-white hover:border-gold-400 transition-all cursor-pointer"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Download Dossier Receipt</span>
                  </button>
                </div>

                {/* WhatsApp Priority Dispatch */}
                <div className="pt-2 flex items-center justify-center gap-4 text-2xs text-ivory-700">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 underline underline-offset-2"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp Priority Desk</span>
                  </a>
                  <span>&bull;</span>
                  <button
                    onClick={onClose}
                    className="text-ivory-600 hover:text-white underline underline-offset-2 cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Header Banner Strip */}
                <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-gold-500/25 pb-3 sm:pb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/15 px-3 py-1 text-2xs font-label font-bold uppercase tracking-[0.16em] text-gold-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Exclusive Sovereign Opportunity</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-2xs font-label text-gold-400 font-semibold uppercase tracking-wider">
                    <Clock className="h-3 w-3" />
                    <span>Active Q4 Allocation Round</span>
                  </div>
                </div>

                {/* Title & Value Proposition */}
                <div className="mb-4 sm:mb-5">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white mb-2">
                    GCC–India Bilateral Trade &amp; Investment Corridor
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-ivory-600 leading-relaxed">
                    Direct advisory and sovereign facilitation across energy, commodities, renewable tech, and cross-border M&amp;A under CEPA treaty benefits.
                  </p>
                </div>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-3 gap-2.5 mb-5 sm:mb-6">
                  <div className="rounded-xl border border-gold-500/30 bg-emerald-950/70 p-2.5 text-center">
                    <span className="block font-serif text-sm sm:text-base font-bold text-gold-400">
                      ₹3,750+ Cr
                    </span>
                    <span className="font-label text-[0.62rem] uppercase tracking-wider text-ivory-700 leading-none block mt-0.5">
                      Deal Pipeline ($450M+)
                    </span>
                  </div>
                  <div className="rounded-xl border border-gold-500/30 bg-emerald-950/70 p-2.5 text-center">
                    <span className="block font-serif text-sm sm:text-base font-bold text-emerald-400">
                      0% Tariff
                    </span>
                    <span className="font-label text-[0.62rem] uppercase tracking-wider text-ivory-700 leading-none block mt-0.5">
                      CEPA Arbitrage
                    </span>
                  </div>
                  <div className="rounded-xl border border-gold-500/30 bg-emerald-950/70 p-2.5 text-center">
                    <span className="block font-serif text-sm sm:text-base font-bold text-gold-400">
                      6 GCC States
                    </span>
                    <span className="font-label text-[0.62rem] uppercase tracking-wider text-ivory-700 leading-none block mt-0.5">
                      Direct Desk Access
                    </span>
                  </div>
                </div>

                {/* Quick Consultation Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[0.65rem] font-label uppercase tracking-wider font-bold text-gold-400 mb-1">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="h-3.5 w-3.5 text-gold-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tariq Al-Mansoor / Rajesh Sharma"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full rounded-xl border border-gold-500/30 bg-emerald-950/80 pl-9 pr-3 py-2 text-xs text-white placeholder:text-ivory-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-label uppercase tracking-wider font-bold text-gold-400 mb-1">
                        Corporate Email / WhatsApp *
                      </label>
                      <div className="relative">
                        <Mail className="h-3.5 w-3.5 text-gold-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. contact@investments.com"
                          value={formData.emailOrPhone}
                          onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                          className="w-full rounded-xl border border-gold-500/30 bg-emerald-950/80 pl-9 pr-3 py-2 text-xs text-white placeholder:text-ivory-800 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[0.65rem] font-label uppercase tracking-wider font-bold text-gold-400 mb-1">
                        Allocation / Ticket Size *
                      </label>
                      <select
                        value={formData.ticketSize}
                        onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
                        className="w-full rounded-xl border border-gold-500/30 bg-emerald-950/80 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      >
                        <option value="Under ₹40 Cr ($5M)">Under ₹40 Crores (Under $5M USD)</option>
                        <option value="₹40 Cr – ₹200 Cr ($5M–$25M)">₹40 Crores – ₹200 Crores ($5M–$25M USD)</option>
                        <option value="₹200 Cr – ₹800 Cr ($25M–$100M)">₹200 Crores – ₹800 Crores ($25M–$100M USD)</option>
                        <option value="₹800 Cr+ ($100M+)">₹800 Crores+ ($100M+ Sovereign / Giga)</option>
                        <option value="Policy / Sovereign Institutional Advisory">Sovereign / Policy Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[0.65rem] font-label uppercase tracking-wider font-bold text-gold-400 mb-1">
                        Priority Target Corridor *
                      </label>
                      <select
                        value={formData.corridor}
                        onChange={(e) => setFormData({ ...formData, corridor: e.target.value })}
                        className="w-full rounded-xl border border-gold-500/30 bg-emerald-950/80 px-3 py-2 text-xs text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                      >
                        <option value="UAE (Dubai / Abu Dhabi ⟷ India)">UAE (Dubai / Abu Dhabi ⟷ India)</option>
                        <option value="Saudi Arabia (Vision 2030 Inbound)">Saudi Arabia (Vision 2030 Inbound)</option>
                        <option value="Qatar &amp; Oman Maritime">Qatar &amp; Oman (Food &amp; Logistics)</option>
                        <option value="India Inbound (GIFT City / FDI)">India Inbound (GIFT City / Tech / Energy)</option>
                        <option value="Multi-GCC Sovereign">Multi-GCC Sovereign Consortium</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 py-3 font-label text-xs font-bold uppercase tracking-wider text-emerald-950 shadow-gold-glow transition-all duration-300 hover:scale-[1.01] hover:brightness-105 active:scale-[0.99] cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Routing to Trade Desk...' : 'Request Sovereign Briefing Dossier'}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>

                {/* Footer Links */}
                <div className="mt-4 pt-3 border-t border-gold-500/15 flex items-center justify-between text-2xs font-sans text-ivory-700">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-gold-400" />
                    <span>Confidential ministerial transmission</span>
                  </span>
                  <Link
                    to="/trade-investment"
                    onClick={onClose}
                    className="text-gold-400 hover:text-white font-semibold underline underline-offset-2 flex items-center gap-1"
                  >
                    <span>View Live Market Terminal</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
