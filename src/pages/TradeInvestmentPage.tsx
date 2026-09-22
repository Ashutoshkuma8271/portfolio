import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Scale,
  TrendingUp,
  FileCheck,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Mail,
  ArrowRight,
  Globe,
  Compass,
  Award,
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
import { tradeData } from '../data/trade';
import { siteConfig } from '../data/siteConfig';

const NAV = [
  { id: 'corridors', label: 'Corridors' },
  { id: 'markets', label: 'Live Markets' },
  { id: 'advisory', label: 'Advisory' },
  { id: 'process', label: 'Process' },
  { id: 'inquiry', label: 'Inquiry' },
];

const ADVISORY_ICONS: Record<string, React.ReactNode> = {
  Building2: <Building2 className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  FileCheck: <FileCheck className="h-6 w-6" />,
};

const CORRIDOR_ICONS: React.ReactNode[] = [
  <Globe key="globe" className="h-5 w-5" />,
  <TrendingUp key="trend" className="h-5 w-5" />,
  <Building2 key="build" className="h-5 w-5" />,
  <ShieldCheck key="shield" className="h-5 w-5" />,
];

const PROCESS_ICONS: React.ReactNode[] = [
  <Compass key="compass" className="h-5 w-5" />,
  <FileCheck key="file" className="h-5 w-5" />,
  <Building2 key="bld" className="h-5 w-5" />,
  <ShieldCheck key="shd" className="h-5 w-5" />,
  <Award key="award" className="h-5 w-5" />,
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
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isActive
                          ? 'border-gold-400/80 bg-gradient-to-br from-gold-400 to-gold-600 text-emerald-950 shadow-md'
                          : 'border-gold-500/30 bg-gold-500/10 text-gold-700 dark:text-gold-400 group-hover:border-gold-400'
                      }`}
                    >
                      {CORRIDOR_ICONS[idx % CORRIDOR_ICONS.length]}
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
                  {/* Route */}
                  <div className="flex items-center gap-4" aria-label={`Route: ${corridor.corridor}`}>
                    <span className="max-w-[40%] font-label text-2xs font-bold uppercase leading-snug tracking-[0.14em] text-gold-800 dark:text-gold-300 sm:text-xs">
                      {from}
                    </span>
                    <span className="relative h-px flex-1 border-t border-dashed border-gold-400/60">
                      <span className="absolute -top-[5px] h-2.5 w-2.5 animate-route-dot rounded-full bg-gold-300 shadow-[0_0_12px_3px_rgba(246,223,160,0.7)] motion-reduce:hidden" />
                    </span>
                    <span className="max-w-[40%] text-right font-label text-2xs font-bold uppercase leading-snug tracking-[0.14em] text-gold-800 dark:text-gold-300 sm:text-xs">
                      {to}
                    </span>
                  </div>

                  <h3 className="mt-7 font-heading text-2xl font-semibold leading-snug text-ink-heading sm:text-3xl">
                    {corridor.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">
                    {corridor.description}
                  </p>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-500/35 bg-surface-raised p-4 backdrop-blur-sm">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-700 dark:text-gold-400" />
                    <p className="text-sm leading-relaxed sm:text-base">
                      <span className="font-semibold text-gold-800 dark:text-gold-300">Strategic impact: </span>
                      {corridor.impactMetrics}
                    </p>
                  </div>

                  <div className="mt-6">
                    <span className="font-label text-2xs font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
                      Priority sectors
                    </span>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {corridor.sectors.map((sector) => (
                        <li
                          key={sector}
                          className="rounded-full border border-gold-500/30 bg-white/[0.05] px-3.5 py-1.5 text-sm font-medium text-ink-heading"
                        >
                          {sector}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex justify-center sm:justify-start">
                    <BannerButton
                      href="#inquiry"
                      className="w-full sm:w-auto min-w-[240px] justify-center"
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tradeData.advisoryServices.map((service, idx) => (
            <Reveal key={service.title} delay={idx * 0.07} className="h-full">
              <Card tone="dark" interactive className="flex h-full flex-col p-7 sm:p-9">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/45 bg-surface-sunken text-gold-700 dark:text-gold-400">
                    {ADVISORY_ICONS[service.iconName] ?? <Briefcase className="h-6 w-6" />}
                  </span>
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold leading-snug text-ink-heading sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{service.description}</p>

                <ul className="mt-6 space-y-2.5 border-t border-gold-500/20 pt-5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-[0.95rem] text-ink">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold-700 dark:text-gold-400" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
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

        <ol className="relative grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-5">
          <span
            aria-hidden
            className="pointer-events-none absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-gold-600/60 via-gold-500/30 to-gold-600/60 md:block"
          />
          {tradeData.marketEntryProcess.map((step, idx) => (
            <li
              key={step.step}
              className={`relative pl-16 md:pl-0 ${
                idx < tradeData.marketEntryProcess.length - 1
                  ? 'before:absolute before:bottom-[-2rem] before:left-6 before:top-12 before:w-px before:bg-gold-600/30 md:before:hidden'
                  : ''
              }`}
            >
              <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/60 bg-surface-sunken text-gold-700 dark:text-gold-300 shadow-luxury transition-transform duration-300 group-hover:scale-105 md:static">
                {PROCESS_ICONS[idx % PROCESS_ICONS.length]}
              </span>

              <Reveal delay={idx * 0.06} className="flex h-full flex-col md:mt-6">
                <h3 className="font-heading text-lg font-semibold leading-snug text-ink-heading">
                  {step.title}
                </h3>
                <p className="mb-4 mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
                <div className="mt-auto rounded-xl border border-hairline bg-surface-raised p-4 pt-4">
                  <span className="font-label text-2xs font-bold uppercase tracking-[0.18em] text-gold-800 dark:text-gold-400">
                    Deliverables
                  </span>
                  <ul className="mt-2.5 space-y-2">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm leading-snug text-ink-soft">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── 5. Inquiry ───────────────────────────────────────────────── */}
      <Section id="inquiry" tone="sunken">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Initiate Advisory"
              title="Submit a Bilateral Trade or"
              accent="Investment Brief"
              subtitle="All submissions are treated with strict sovereign and commercial non-disclosure protocol."
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
