import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TradeInquiryForm } from '../components/forms/TradeInquiryForm';
import { LiveGoldMarketGraph } from '../components/trade/LiveGoldMarketGraph';
import { SEO } from '../components/ui/SEO';
import { tradeData } from '../data/trade';
import { motion } from 'framer-motion';
import focusTrade from '../assets/images/focus/trade.webp';
import { 
  Building2, 
  Scale, 
  TrendingUp, 
  FileCheck, 
  CheckCircle2, 
  ShieldCheck,
  Briefcase,
  ArrowRight
} from 'lucide-react';

export const TradeInvestmentPage: React.FC = () => {
  const [selectedCorridorIndex, setSelectedCorridorIndex] = useState(0);

  const getAdvisoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-gold-500" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-gold-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-gold-500" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-gold-500" />;
      default:
        return <Briefcase className="w-6 h-6 text-gold-500" />;
    }
  };

  return (
    <div className="overflow-hidden bg-[#FAF6F0]">
      <SEO
        title="Trade & Sovereign Investment Advisory | GCC–India Trade Commissioner"
        description="Strategic trade facilitation, CEPA optimization, foreign direct investment syndication, and market entry advisory between India and GCC sovereign markets."
      />

      {/* Page Banner with Sovereign Atmospheric Imagery & Real-Time Data */}
      <PageHeader
        eyebrow="TRADE & SOVEREIGN ADVISORY"
        title="Unlocking High-Yield Bilateral Trade & Sovereign Investment Corridors"
        description="Providing strategic counsel, governmental alignment, and bespoke market-entry roadmaps for enterprises, sovereign funds, and high-net-worth investors across the GCC and India."
        mediaImage={focusTrade}
        mediaAlt="Trade & Sovereign Investment Corridors"
        mediaBadge="Sovereign Trade Corridor"
        stats={[
          { value: '₹3,750+ Cr', label: 'Bilateral Pipeline' },
          { value: '0% Tariff', label: 'CEPA Optimization' },
          { value: '6 Markets', label: 'GCC Sovereign Footprint' },
        ]}
        actionButton={
          <a
            href="#inquiry"
            className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950 via-[#0C221C] to-emerald-950 px-5 sm:px-6 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.12em] text-ivory-500 border border-gold-500/50 shadow-[0_4px_18px_-4px_rgba(7,21,17,0.4)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(7,21,17,0.55),0_0_12px_rgba(199,154,61,0.35)] hover:border-gold-400 active:translate-y-0 active:scale-[0.98]"
          >
            <span className="relative z-10">Initiate Trade Inquiry</span>
            <span className="relative z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
          </a>
        }
      />

      {/* 
        ======================================================================
        1. REAL-TIME GOLD & GCC SOVEREIGN CAPITAL MARKET INTELLIGENCE TERMINAL
        ======================================================================
      */}
      <LiveGoldMarketGraph />
      {/* 
        ======================================================================
        2. INTERACTIVE BILATERAL CORRIDOR EXPLORER
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-[#FAF6F0] relative">
        <Container>
          <SectionHeading
            eyebrow="STRATEGIC CORRIDORS"
            title="Flagship Bilateral Initiatives & Economic Bridges"
            subtitle="Targeted interventions enabling market expansion, tariff arbitrage under CEPA, and direct access to sovereign capital."
            center
          />

          {/* Corridor Selection Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-10 mb-10">
            {tradeData.initiatives.map((init, idx) => (
              <button
                key={init.id}
                onClick={() => setSelectedCorridorIndex(idx)}
                className={`px-5 py-2.5 rounded-full font-label text-2xs sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCorridorIndex === idx
                    ? 'bg-emerald-950 text-gold-300 border border-gold-500/60 shadow-luxury'
                    : 'bg-white text-charcoal-700 hover:text-emerald-950 border border-ivory-800 hover:border-gold-600/40'
                }`}
              >
                <span>{init.corridor}</span>
              </button>
            ))}
          </div>

          {/* Active Corridor Featured Showcase */}
          {(() => {
            const active = tradeData.initiatives[selectedCorridorIndex] || tradeData.initiatives[0];
            return (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-gold-600/30 shadow-luxury-lg p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xs uppercase font-label font-bold tracking-widest text-gold-700 bg-gold-500/10 px-3.5 py-1.5 rounded-full border border-gold-500/25">
                      {active.corridor}
                    </span>
                    <span className="text-xs font-label uppercase tracking-wider text-charcoal-400">
                      Sovereign Priority
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950 leading-snug">
                    {active.title}
                  </h3>

                  <p className="font-sans text-base sm:text-lg text-charcoal-700 leading-relaxed">
                    {active.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-emerald-950 text-ivory-500 text-xs sm:text-sm flex items-center gap-3 border border-gold-500/30">
                    <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
                    <span><strong>Strategic Impact:</strong> {active.impactMetrics}</span>
                  </div>

                  <div>
                    <span className="text-2xs uppercase tracking-wider font-label font-bold text-gold-700 block mb-2">
                      Priority Focus Sectors:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {active.sectors.map((sec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs uppercase tracking-wider font-semibold text-emerald-950 bg-ivory-600 px-3 py-1.5 rounded-lg border border-ivory-800"
                        >
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-[#071913] text-ivory-500 p-8 rounded-2xl border border-gold-500/40 space-y-6">
                  <div>
                    <span className="text-2xs font-label font-bold uppercase tracking-widest text-gold-400 block">
                      Bilateral Engagement Protocol
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white">
                    Direct Sovereign Desk Access
                  </h4>
                  <p className="text-xs sm:text-sm text-ivory-700 leading-relaxed">
                    Enterprises seeking ministerial introductions, regulatory sandboxes, or joint venture syndication in this corridor are invited to submit a preliminary brief.
                  </p>
                  <a
                    href="#inquiry"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gold-600 hover:bg-gold-500 text-emerald-950 font-label text-xs font-bold uppercase tracking-wider rounded-full shadow-gold-glow transition-all"
                  >
                    <span>Request Corridor Briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })()}
        </Container>
      </section>

      {/* 
        ======================================================================
        3. MARKET ENTRY METHODOLOGY (CONNECTED ROADMAP)
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-white border-y border-ivory-800">
        <Container>
          <SectionHeading
            eyebrow="EXECUTION ROADMAP"
            title="Cross-Border Market Entry Framework"
            subtitle="A de-risked, institutional blueprint for enterprises entering GCC or Indian jurisdictions."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mt-16">
            {tradeData.marketEntryProcess.map((stepItem, sIdx) => (
              <div
                key={stepItem.title}
                className="bg-[#FAF6F0] p-6 rounded-2xl border border-ivory-800 shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
              >
                {/* Connecting bar indicator */}
                {sIdx < 4 && (
                  <div className="hidden md:block absolute top-10 -right-3 w-6 h-[2px] bg-gold-600/40 z-10" />
                )}

                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-gold-400 flex items-center justify-center mb-4 border border-gold-500/40 group-hover:bg-gold-600 group-hover:text-emerald-950 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>

                  <h4 className="font-serif text-base font-bold text-emerald-950 mb-2 leading-snug">
                    {stepItem.title}
                  </h4>

                  <p className="text-xs text-charcoal-600 leading-relaxed mb-4">
                    {stepItem.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-ivory-700">
                  <span className="text-[0.65rem] uppercase tracking-wider font-label font-bold text-gold-700 block mb-1.5">
                    Deliverables:
                  </span>
                  <ul className="space-y-1 text-2xs text-charcoal-700">
                    {stepItem.deliverables.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        4. STRATEGIC ADVISORY SERVICES GRID
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-[#071913] text-ivory-500">
        <Container>
          <SectionHeading
            eyebrow="ADVISORY SUITE"
            title="Comprehensive Institutional Advisory Services"
            subtitle="Engage the Trade Commissioner's office for bespoke bilateral strategy, regulatory alignment, and deal syndication."
            isDark
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {tradeData.advisoryServices.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#0A261F]/90 border border-gold-500/35 p-8 rounded-2xl shadow-luxury-lg flex flex-col justify-between hover:border-gold-400 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-gold-500/50 flex items-center justify-center mb-6 text-gold-400">
                    {getAdvisoryIcon(service.iconName)}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-base sm:text-lg text-ivory-700 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-800">
                  <span className="text-2xs uppercase tracking-wider font-label font-bold text-gold-400 block mb-2">
                    Executive Benefits:
                  </span>
                  <ul className="space-y-1.5 text-xs text-ivory-600">
                    {service.benefits.map((ben, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        5. STRUCTURED TRADE & INVESTMENT INQUIRY FORM
        ======================================================================
      */}
      <section id="inquiry" className="py-20 lg:py-28 bg-[#FAF6F0] relative scroll-mt-20">
        <Container size="lg">
          <SectionHeading
            eyebrow="INITIATE ADVISORY"
            title="Submit a Bilateral Trade or Investment Brief"
            subtitle="All submissions are treated with strict sovereign and commercial non-disclosure protocol."
            center
          />

          <div className="mt-12">
            <TradeInquiryForm />
          </div>
        </Container>
      </section>
    </div>
  );
};
