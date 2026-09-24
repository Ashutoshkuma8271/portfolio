import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Mail,
  ArrowRight,
  ArrowRightLeft,
  Landmark,
  Handshake,
  HandCoins,
  Gavel,
  FileSearch,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { BannerButton } from '../components/banner/BannerButton';
import { SectionNav } from '../components/layout/SectionNav';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TradeInquiryForm } from '../components/forms/TradeInquiryForm';
import { LiveGoldMarketGraph } from '../components/trade/LiveGoldMarketGraph';
import { SEO } from '../components/ui/SEO';
import { Flag, type FlagCountry } from '../components/ui/Flag';
import { tradeData } from '../data/trade';
import { siteConfig } from '../data/siteConfig';
import { eventPhotos } from '../data/eventPhotos';
import gulfPanelPhoto from '../assets/images/focus/global-trade-hd.png';

const NAV = [
  { id: 'corridors', label: 'Corridors' },
  { id: 'markets', label: 'Live Markets' },
  { id: 'advisory', label: 'Advisory' },
  { id: 'process', label: 'Process' },
  { id: 'inquiry', label: 'Inquiry' },
];

/** Keyed by each service's iconName; glyphs chosen to show the service itself. */
const ADVISORY_ICONS: Record<string, React.ReactNode> = {
  Building2: <Landmark className="h-8 w-8" strokeWidth={1.75} />,
  Scale: <Handshake className="h-8 w-8" strokeWidth={1.75} />,
  TrendingUp: <HandCoins className="h-8 w-8" strokeWidth={1.75} />,
  FileCheck: <Gavel className="h-8 w-8" strokeWidth={1.75} />,
};

/** The two ends of each corridor, shown as their national flags. */
const CORRIDOR_FLAGS: Record<string, { from: FlagCountry[]; to: FlagCountry[] }> = {
  'cepa-acceleration': { from: ['india'], to: ['uae'] },
  'saudi-vision-2030': { from: ['india'], to: ['saudi'] },
  'qatar-oman-logistics': { from: ['india'], to: ['qatar', 'oman'] },
  'fintech-crossborder': { from: ['india'], to: ['uae'] },
};

/** One photograph per advisory service, each showing that kind of work. None is used elsewhere on this page. */
const ADVISORY_PHOTOS: { src: string; alt: string; focal: string }[] = [
  { src: eventPhotos.aaccArabDelegation.src, alt: eventPhotos.aaccArabDelegation.alt, focal: '40% 30%' },
  { src: eventPhotos.bilateralAccord.src, alt: eventPhotos.bilateralAccord.alt, focal: '45% 35%' },
  { src: eventPhotos.unitedEconomicA.src, alt: eventPhotos.unitedEconomicA.alt, focal: '50% 30%' },
  {
    src: gulfPanelPhoto,
    alt: 'H.E. Zeenat Kureshi seated on a chamber of commerce panel with Gulf delegates',
    focal: '50% 40%',
  },
];

const FlagGroup: React.FC<{ countries: FlagCountry[]; className?: string }> = ({ countries, className = 'h-5' }) => (
  <span className="inline-flex shrink-0 items-center -space-x-1.5">
    {countries.map((c) => (
      <Flag key={c} country={c} className={className} />
    ))}
  </span>
);

/** Phase marks, in phase order: diagnostic, government alignment, vetting, setup, scale-up. */
const PROCESS_ICONS: React.ReactNode[] = [
  <FileSearch key="diagnostic" className="h-7 w-7" strokeWidth={1.75} />,
  <Landmark key="government" className="h-7 w-7" strokeWidth={1.75} />,
  <ShieldCheck key="vetting" className="h-7 w-7" strokeWidth={1.75} />,
  <Building2 key="setup" className="h-7 w-7" strokeWidth={1.75} />,
  <TrendingUp key="scale" className="h-7 w-7" strokeWidth={1.75} />,
];

export const TradeInvestmentPage: React.FC = () => {
  const [active, setActive] = useState(0);
  const corridor = tradeData.initiatives[active];
  const [from, to] = corridor.corridor.split('⟷').map((part) => part.trim());

  return (
    <div className="overflow-hidden bg-surface">
      <SEO
        title="Trade & Sovereign Investment Advisory | GCC–India Trade Commissioner"
        description="Strategic trade facilitation, CEPA optimization, foreign direct investment syndication, and market entry advisory between India and GCC sovereign markets."
      />

      <PageHeader
        section="trade"
        breadcrumb="Trade & Investment"
        eyebrow="Trade & Sovereign Advisory"
        title="Unlocking High-Yield Bilateral Trade &"
        accent="Sovereign Investment Corridors"
        description="Strategic counsel, governmental alignment and bespoke market-entry roadmaps for enterprises, sovereign funds and high-net-worth investors across the GCC and India."
        scrollTargetId="corridors"
        stats={tradeData.tradeStats.map((s) => ({ value: s.value, label: s.label }))}
        actionButton={<BannerButton href="#inquiry">Initiate Trade Inquiry</BannerButton>}
      >
        <BannerButton variant="ghost" href="#markets">
          Live Gold &amp; Desk
        </BannerButton>
      </PageHeader>

      <SectionNav items={NAV} />

      {/* ── 1. Corridors ─────────────────────────────────────────────── */}
      <Section id="corridors" tone="surface">
        <SectionHeading
          eyebrow="Strategic Corridors"
          title="Flagship Bilateral Initiatives &"
          accent="Economic Bridges"
          subtitle="Targeted interventions enabling market expansion, tariff advantage under CEPA, and direct access to sovereign capital."
          center="tablet"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Selector */}
          <ul className="grid gap-3 lg:col-span-5 lg:grid-rows-4">
            {tradeData.initiatives.map((init, idx) => {
              const isActive = idx === active;
              return (
                <li key={init.id} className="h-full">
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-pressed={isActive}
                    className={`group flex h-full w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 ${
                      isActive
                        ? 'border-gold-500/60 bg-surface-sunken text-ink-heading shadow-luxury-lg'
                        : 'border-hairline bg-surface-raised hover:-translate-y-0.5 hover:border-gold-500/45 hover:shadow-luxury'
                    }`}
                  >
                    {/* Destination flag(s) */}
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-white transition-all duration-300 ${
                        isActive
                          ? 'border-gold-500 shadow-md ring-2 ring-gold-500/35'
                          : 'border-gold-500/30 group-hover:border-gold-400'
                      }`}
                    >
                      <FlagGroup
                        countries={CORRIDOR_FLAGS[init.id]?.to ?? []}
                        className={(CORRIDOR_FLAGS[init.id]?.to.length ?? 1) > 1 ? 'h-4' : 'h-6'}
                      />
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-heading text-base font-semibold leading-snug sm:text-lg ${
                          isActive ? 'text-ink-heading' : 'text-ink-heading'
                        }`}
                      >
                        {init.title}
                      </span>
                      <span
                        className={`mt-1.5 block font-label text-2xs font-semibold uppercase tracking-[0.12em] ${
                          isActive ? 'text-gold-800 dark:text-gold-300' : 'text-ink-faint'
                        }`}
                      >
                        {init.corridor}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Showcase */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={corridor.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="relative h-full overflow-hidden rounded-3xl border border-gold-500/40 bg-surface-raised p-7 text-ink-heading shadow-luxury-lg sm:p-10"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl"
                />

                <div className="relative">
                  {/* Luxury Bilateral Route Transit Header */}
                  <div
                    className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-gold-500/25 bg-surface-sunken/80 p-3 sm:p-4 shadow-2xs backdrop-blur-sm"
                    aria-label={`Route: ${corridor.corridor}`}
                  >
                    <div className="inline-flex items-center justify-center gap-2.5 sm:justify-start">
                      <FlagGroup countries={CORRIDOR_FLAGS[corridor.id]?.from ?? []} className="h-6" />
                      <span className="font-label text-2xs sm:text-xs font-bold uppercase tracking-[0.14em] text-ink-heading">
                        {from}
                      </span>
                    </div>

                    <div className="relative flex items-center justify-center flex-1 min-w-[80px] px-2 py-1">
                      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-emerald-500/30 via-gold-500/50 to-gold-400/30 relative overflow-hidden">
                        <motion.div
                          animate={{ x: ['-100%', '250%'] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-gold-300 to-transparent shadow-[0_0_10px_rgba(246,223,160,0.9)]"
                        />
                      </div>
                      <span className="absolute flex h-6 w-6 items-center justify-center rounded-full border border-gold-400/50 bg-surface-raised shadow-xs">
                        <ArrowRightLeft className="h-3 w-3 text-gold-600 dark:text-gold-400" />
                      </span>
                    </div>

                    <div className="inline-flex items-center justify-center gap-2.5 sm:justify-end">
                      <span className="font-label text-2xs sm:text-xs font-bold uppercase tracking-[0.14em] text-gold-800 dark:text-gold-300 text-center sm:text-right">
                        {to}
                      </span>
                      <FlagGroup countries={CORRIDOR_FLAGS[corridor.id]?.to ?? []} className="h-6" />
                    </div>
                  </div>

                  <h3 className="mt-7 text-center font-heading text-2xl font-bold leading-snug text-ink-heading sm:text-3xl lg:text-left">
                    {corridor.title}
                  </h3>
                  <p className="mt-3.5 text-center font-sans text-sm sm:text-base leading-relaxed text-ink-soft lg:text-left">
                    {corridor.description}
                  </p>

                  <div className="mt-6 flex items-start sm:items-center gap-3.5 rounded-2xl border border-gold-500/35 bg-gradient-to-r from-gold-500/15 via-gold-500/5 to-surface-sunken p-4 sm:p-5 backdrop-blur-sm shadow-2xs">
                    <ShieldCheck className="mt-0.5 sm:mt-0 h-5 w-5 shrink-0 text-gold-600 dark:text-gold-400" />
                    <p className="font-sans text-xs sm:text-sm leading-relaxed text-ink-heading">
                      <strong className="font-bold text-gold-800 dark:text-gold-300">Strategic Impact: </strong>
                      {corridor.impactMetrics}
                    </p>
                  </div>

                  <div className="mt-7">
                    <span className="mb-3 block text-center font-label text-2xs font-bold uppercase tracking-[0.2em] text-[#8A6920] dark:text-gold-300 lg:text-left">
                      Priority Sectors
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {corridor.sectors.map((sector) => (
                        <div
                          key={sector}
                          className="flex items-center justify-center rounded-xl border border-gold-500/25 bg-surface-sunken/90 px-3 py-2.5 text-center font-sans text-xs sm:text-sm font-semibold text-ink-heading shadow-2xs transition-all duration-200 hover:border-gold-500/60 hover:bg-gold-500/10"
                        >
                          {sector}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center w-full">
                    {/* Tighter tracking on phones so the full label fits instead of being cut off */}
                    <BannerButton
                      href="#inquiry"
                      className="w-full sm:w-auto sm:min-w-[260px] justify-center [&>*]:!px-5 [&>*]:!tracking-[0.08em] sm:[&>*]:!px-7 sm:[&>*]:!tracking-[0.13em]"
                    >
                      Request Corridor Briefing
                    </BannerButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* ── 2. Live markets (terminal + sector desk render their own bands) ── */}
      <div id="markets" className="scroll-mt-28">
        <LiveGoldMarketGraph />
        <div className="border-b border-hairline bg-surface-sunken py-6">
          <Container>
            <Link
              to="/#live-desk"
              className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold-600/35 bg-surface-raised px-5 py-4 shadow-luxury transition-all hover:-translate-y-0.5 hover:border-gold-500"
            >
              <span className="text-[0.95rem] text-ink">
                <strong className="font-semibold text-ink-heading">Live GCC desk:</strong> real headlines on import/export, gold, fleet, oil &amp; gas and real estate.
              </span>
              <span className="inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.16em] text-gold-800 dark:text-gold-300">
                Open the desk <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Container>
        </div>
      </div>

      {/* ── 3. Advisory suite ────────────────────────────────────────── */}
      <Section id="advisory" tone="deep">
        <SectionHeading
          center
          eyebrow="Advisory Suite"
          title="Institutional Advisory,"
          accent="Built Around Your Deal"
          subtitle="Engage the Trade Commissioner's office for bespoke bilateral strategy, regulatory alignment and deal syndication."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {tradeData.advisoryServices.map((service, idx) => {
            const photo = ADVISORY_PHOTOS[idx % ADVISORY_PHOTOS.length];
            return (
              <Reveal key={service.title} delay={idx * 0.07} className="h-full">
                <Card tone="dark" interactive className="group flex h-full flex-col overflow-hidden">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />

                  {/* Photograph of this kind of engagement */}
                  <div className="grain relative aspect-[16/8] overflow-hidden bg-emerald-950">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: photo.focal }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/5 to-transparent" />
                    <span className="absolute right-4 top-4 z-[3] rounded-full border border-white/20 bg-emerald-950/60 px-3 py-1 font-cinzel text-xs font-bold tracking-[0.12em] text-gold-200 backdrop-blur-md">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="relative flex flex-1 flex-col items-center px-7 pb-7 text-center sm:px-9 sm:pb-9 md:items-start md:text-left">
                    {/* Service mark: gold medallion cut into the photograph's edge */}
                    <span className="relative z-10 -mt-9 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-emerald-950 shadow-[0_12px_28px_-10px_rgba(199,154,61,0.75)] ring-4 ring-surface-raised transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                      {ADVISORY_ICONS[service.iconName] ?? <Briefcase className="h-8 w-8" strokeWidth={1.75} />}
                    </span>

                    <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-ink-heading sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-soft">{service.description}</p>

                    {/* Benefits panel, pinned to the bottom so the panels line up across a row */}
                    <div className="mt-auto w-full pt-6">
                      <div className="rounded-xl border border-gold-500/20 bg-gradient-to-br from-gold-500/[0.07] via-surface-sunken/60 to-surface-sunken/30 p-4 sm:p-5">
                        <p className="mb-3 font-label text-2xs font-bold uppercase tracking-[0.2em] text-gold-800 dark:text-gold-400">
                          What you receive
                        </p>
                        <ul className="mx-auto inline-flex flex-col space-y-2.5 text-left md:mx-0 md:flex">
                          {service.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-700 dark:text-gold-400" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── 4. Process ───────────────────────────────────────────────── */}
      <Section id="process" tone="surface">
        <SectionHeading
          center
          eyebrow="Execution Roadmap"
          title="Cross-Border Market Entry"
          accent="Framework"
          subtitle="A de-risked, institutional blueprint for enterprises entering GCC or Indian jurisdictions."
        />

        {/* One full-width row per phase (mark | brief | deliverables) instead of five
            thin columns, joined by a gold connector down the phase marks. */}
        <ol className="mx-auto max-w-5xl space-y-6">
          {tradeData.marketEntryProcess.map((step, idx) => {
            const last = idx === tradeData.marketEntryProcess.length - 1;
            const num = String(step.step).padStart(2, '0');
            return (
              <li key={step.step} className="relative">
                {!last && (
                  <span
                    aria-hidden
                    className="absolute -bottom-6 left-1/2 z-0 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-gold-500/70 to-gold-500/20 lg:left-[6.5rem] lg:translate-x-0"
                  />
                )}
                <Reveal delay={idx * 0.06}>
                  <article className="group relative grid items-center gap-6 overflow-hidden rounded-2xl border border-gold-600/25 bg-surface-raised p-6 text-center shadow-luxury transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-luxury-lg sm:p-8 lg:grid-cols-[9rem_1fr_19rem] lg:gap-8 lg:text-left">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    {/* Phase mark */}
                    <div className="relative flex flex-col items-center gap-3">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-emerald-950 shadow-[0_12px_26px_-10px_rgba(199,154,61,0.7)] ring-4 ring-gold-500/15 transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-105">
                        {PROCESS_ICONS[idx % PROCESS_ICONS.length]}
                      </span>
                      <span className="font-label text-2xs font-bold uppercase tracking-[0.24em] text-gold-800 dark:text-gold-400">
                        Phase {num}
                      </span>
                    </div>

                    {/* Brief */}
                    <div className="relative">
                      <h3 className="font-heading text-xl font-semibold leading-snug text-ink-heading transition-colors group-hover:text-gold-800 dark:group-hover:text-gold-300 sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mx-auto mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft lg:mx-0">
                        {step.description}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div className="relative mx-auto w-full max-w-sm rounded-xl border border-gold-500/20 bg-gradient-to-br from-gold-500/[0.07] via-surface-sunken/60 to-surface-sunken/30 p-5 text-left lg:max-w-none">
                      <span className="font-label text-2xs font-bold uppercase tracking-[0.2em] text-gold-800 dark:text-gold-400">
                        Deliverables
                      </span>
                      <ul className="mt-3 space-y-2.5">
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm leading-snug text-ink">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* ── 5. Inquiry ───────────────────────────────────────────────── */}
      <Section id="inquiry" tone="sunken">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
            <SectionHeading
              eyebrow="Initiate Advisory"
              title="Submit a Bilateral Trade or"
              accent="Investment Brief"
              subtitle="All submissions are treated with strict sovereign and commercial non-disclosure protocol."
              center="tablet"
            />

            <a
              href={`mailto:${siteConfig.contact.tradeDeskEmail}`}
              className="inline-flex items-center gap-3 rounded-full border border-gold-600/40 bg-surface-raised px-5 py-3 text-sm font-semibold text-ink-heading transition-colors hover:border-gold-600 hover:text-gold-800"
            >
              <Mail className="h-4 w-4 text-gold-600" />
              {siteConfig.contact.tradeDeskEmail}
            </a>
          </div>

          <div className="lg:col-span-7">
            <TradeInquiryForm />
          </div>
        </div>
      </Section>
    </div>
  );
};
