import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { SectorArt, type SectorArtKind } from '../enquiry/SectorArt';
import { INVEST_SECTORS, type InvestSectorId } from '../../data/investSectors';
import { whatsappLink } from '../../lib/enquiry';
import whatsapp3dIcon from '../../assets/images/icons/whatsapp-3d-icon.png';
import investGoldIcon from '../../assets/images/icons/invest-gold-icon.png';
import investOilGasIcon from '../../assets/images/icons/invest-oilgas-icon.png';
import investTradeIcon from '../../assets/images/icons/invest-trade-icon.png';
import investFleetIcon from '../../assets/images/icons/invest-fleet-icon.png';
import investRealEstateIcon from '../../assets/images/icons/invest-realestate-icon.png';

const ART: Record<InvestSectorId, SectorArtKind> = {
  trade: 'trade',
  gold: 'gold',
  fleet: 'fleet',
  oilgas: 'oilgas',
  realestate: 'realestate',
};

const SECTOR_ICON: Record<InvestSectorId, React.ReactNode> = {
  trade: <img src={investTradeIcon} alt="Import & Export" className="h-7 w-7 object-contain" />,
  gold: <img src={investGoldIcon} alt="Gold" className="h-7 w-7 object-contain" />,
  fleet: <img src={investFleetIcon} alt="Fleet" className="h-7 w-7 object-contain" />,
  oilgas: <img src={investOilGasIcon} alt="Oil & Gas" className="h-7 w-7 object-contain" />,
  realestate: <img src={investRealEstateIcon} alt="Real Estate" className="h-7 w-7 object-contain" />,
};

/** Opens the investor enquiry with the chosen sector already selected. */
export const openInvestment = (sector?: InvestSectorId) =>
  window.dispatchEvent(new CustomEvent('open-investment-modal', { detail: { sector: sector ?? null } }));

/**
 * A card that leans toward the pointer. Pure transform work (no layout), so it
 * stays smooth; it switches itself off for reduced-motion visitors, and on
 * touch screens there is simply no pointer to follow.
 */
const TiltCard: React.FC<{ children: React.ReactNode; onClick: () => void; label: string; className?: string }> = ({
  children,
  onClick,
  label,
  className = '',
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const glow = useMotionValue(50);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
    glow.set(50 + px * 60);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      aria-label={label}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gold-600/25 bg-surface-raised text-center shadow-luxury transition-[box-shadow,border-color] duration-300 hover:border-gold-500/70 hover:shadow-luxury-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const InvestSection: React.FC = () => (
  <section id="invest" className="relative scroll-mt-20 overflow-hidden border-y border-gold-600/25 bg-surface-sunken py-20 lg:py-28">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(45% 40% at 85% 0%, rgba(212,163,89,0.18), transparent 70%), radial-gradient(40% 40% at 5% 100%, rgba(199,154,61,0.12), transparent 70%)',
      }}
    />
    <Container className="relative">
      <div className="mb-3 flex justify-center">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-gold-600/40 bg-surface-raised px-4 py-1.5 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-label text-2xs font-bold uppercase tracking-[0.2em] text-ink-heading">
            Open for investor enquiries
          </span>
        </span>
      </div>

      <SectionHeading
        center
        eyebrow="Invest With Us"
        title="Five Sectors,"
        accent="One Direct Line"
        subtitle="Pick a sector and tell us what you have in mind. Your enquiry goes straight to the office — no middlemen."
      />

      {/* One row of five equal cards from xl up (the same card family as "Four Pillars"
          above); two per row on tablets, three on small laptops, last row centred. */}
      <div className="flex flex-wrap justify-center gap-5">
        {INVEST_SECTORS.map((s, i) => (
          <Reveal
            key={s.id}
            delay={i * 0.07}
            className="flex w-full max-w-md sm:w-[calc(50%-0.625rem)] sm:max-w-none lg:w-[calc(33.333%-0.834rem)] xl:w-[calc(20%-1rem)]"
          >
            <TiltCard onClick={() => openInvestment(s.id)} label={`Invest in ${s.label}`} className="w-full">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              {/* Sector photograph */}
              <div className="grain relative aspect-[4/3] w-full overflow-hidden bg-emerald-950">
                <SectorArt
                  kind={ART[s.id]}
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 z-[3] rounded-full border border-white/20 bg-emerald-950/60 px-2.5 py-0.5 font-cinzel text-2xs font-bold tracking-[0.12em] text-gold-200 backdrop-blur-md">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="relative flex flex-1 flex-col items-center px-5 pb-6 text-center">
                {/* Sector mark, cut into the photograph's lower edge */}
                <span className="relative z-10 -mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-emerald-950 shadow-[0_12px_26px_-10px_rgba(199,154,61,0.75)] ring-4 ring-surface-raised transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                  {SECTOR_ICON[s.id]}
                </span>

                <h3 className="mt-4 font-heading text-xl font-semibold leading-snug text-ink-heading">{s.label}</h3>
                {/* Reserved height at xl keeps the five bullet lists starting on one line */}
                <p className="mt-1.5 max-w-[20rem] text-sm leading-relaxed text-ink-soft xl:min-h-[4.4rem]">{s.tagline}</p>

                <span aria-hidden className="my-4 h-px w-12 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

                <ul className="inline-flex flex-col items-start space-y-2 text-left">
                  {s.focus.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[0.82rem] leading-snug text-ink">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto w-full pt-5">
                  {/* Fixed height so every card's action matches, whether its label takes one line or two */}
                  <span className="flex h-12 w-full items-center justify-between gap-2 rounded-full border border-gold-600/35 bg-gold-500/[0.08] py-1.5 pl-5 pr-1.5 text-left font-label text-[0.68rem] font-bold uppercase leading-tight tracking-[0.1em] text-gold-800 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500/15 dark:text-gold-300">
                    <span>Invest in {s.label}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-gold-400 to-gold-600 text-emerald-950 shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-gold-600/35 bg-surface-raised p-6 shadow-luxury sm:flex-row sm:p-8">
          <div className="text-center sm:text-left">
            <h3 className="font-heading text-xl font-semibold text-ink-heading sm:text-2xl">Not sure where to start?</h3>
            <p className="mt-1 text-[0.95rem] text-ink-soft">Tell us your goals and we will point you to the right conversation.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openInvestment()}
              className="inline-flex min-h-[48px] h-12 w-full sm:w-auto items-center justify-center text-center gap-2.5 rounded-full border border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 px-7 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_10px_30px_-8px_rgba(199,154,61,0.65)] transition-all hover:-translate-y-0.5 hover:from-gold-300 hover:to-gold-500 cursor-pointer"
            >
              <span>Talk to us</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <a
              href={whatsappLink('Hello, I would like to discuss an investment opportunity.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] h-12 w-full sm:w-auto items-center justify-center text-center gap-2.5 rounded-full border border-gold-600/40 bg-surface-raised pl-5 pr-6 font-label text-xs font-bold uppercase tracking-[0.12em] text-ink-heading shadow-xs transition-all hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-luxury cursor-pointer"
            >
              <img src={whatsapp3dIcon} alt="" className="h-6 w-6 shrink-0 object-contain filter drop-shadow-sm" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </Reveal>
      <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-ink-faint">
        Enquiries only — nothing on this page is an offer or solicitation. Any opportunity is subject to due diligence and applicable law.
      </p>
    </Container>
  </section>
);
