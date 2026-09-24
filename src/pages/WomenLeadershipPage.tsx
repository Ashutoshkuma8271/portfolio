import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Scale,
  HeartPulse,
  HeartHandshake,
  Calendar,
  Clock,
  CheckCircle2,
  Quote,
  Users,
  ArrowRight,
  MonitorPlay,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { BannerButton } from '../components/banner/BannerButton';
import { SectionNav } from '../components/layout/SectionNav';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { CountUp } from '../components/ui/CountUp';
import { WomenCellInquiryForm } from '../components/forms/WomenCellInquiryForm';
import { SEO } from '../components/ui/SEO';
import { MapPinLogo } from '../components/ui/MapPinLogo';
import { womenLeadershipData } from '../data/womenLeadership';
import { eventPhotos } from '../data/eventPhotos';
import focusWomen from '../assets/images/focus/women.webp';
import zeenatAvatar from '../assets/images/avatar/zeenat-avatar.png';
import programEducation from '../assets/images/program-photos/education.webp';
import programLegal from '../assets/images/program-photos/legal.webp';
import programHealth from '../assets/images/program-photos/health.webp';

const NAV = [
  { id: 'vision', label: 'Vision' },
  { id: 'impact', label: 'Impact' },
  { id: 'programs', label: 'Programs' },
  { id: 'events', label: 'Events' },
  { id: 'join', label: 'Join' },
];

const ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Scale: <Scale className="h-6 w-6" />,
  HeartPulse: <HeartPulse className="h-6 w-6" />,
};

/** One mark per impact pillar, in pillar order: enterprise, education, legal aid, health. */
const PILLAR_ICONS: React.ReactNode[] = [
  <Briefcase key="enterprise" className="h-5 w-5" />,
  <GraduationCap key="education" className="h-5 w-5" />,
  <Scale key="legal" className="h-5 w-5" />,
  <HeartPulse key="health" className="h-5 w-5" />,
];

/**
 * Photographs for the three smaller program cards (Unsplash License, free commercial
 * use; source IDs M92wusZZ_qg, HJckKnwCXxQ, NDOYHZ_98Rw). Illustrative, not of the
 * Women Cell's own centres -- replace the files with programme photos when available.
 */
const PROGRAM_PHOTOS: Record<string, { src: string; alt: string; focal: string } | undefined> = {
  'taleem-e-niswan': { src: programEducation, alt: 'Schoolgirls attentive in a classroom', focal: '50% 40%' },
  'adalat-e-nisa': { src: programLegal, alt: 'Two women reviewing and signing documents together', focal: '50% 45%' },
  'swasthya-chetna': { src: programHealth, alt: 'A young woman having her blood pressure checked by a doctor', focal: '45% 50%' },
};

/** Hairline gold rule that draws across the top of a card on hover. */
const HoverRule = () => (
  <span
    aria-hidden
    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 transition-transform duration-500 ease-out group-hover:scale-x-100"
  />
);

/** "18,500+ Micro-Enterprises Funded" -> { number: 18500, suffix: '+', label: 'Micro-Enterprises Funded' } */
const parseStat = (stat: string) => {
  const m = stat.match(/^([\d,]+)(\+?)\s+(.*)$/);
  if (!m) return null;
  return { number: parseInt(m[1].replace(/,/g, ''), 10), suffix: m[2], label: m[3] };
};

/** Starts counting only once the figure scrolls into view. */
const InViewCount: React.FC<{ value: number; suffix?: string; className?: string }> = ({
  value,
  suffix,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp value={value} suffix={suffix} duration={1.8} group suffixClassName="text-gold-700 dark:text-gold-400" />
      ) : (
        <>0{suffix}</>
      )}
    </span>
  );
};

export const WomenLeadershipPage: React.FC = () => {
  const { pillars, initiatives, upcomingEvents, missionStatement, hero } = womenLeadershipData;

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = upcomingEvents.filter((e) => e.endsOn >= today);
  const past = upcomingEvents.filter((e) => e.endsOn < today);

  const [featuredProgram, ...otherPrograms] = initiatives;

  return (
    <div className="overflow-hidden bg-surface">
      <SEO
        title="Women Leadership | All India Jamiatul Quresh Women Cell"
        description="Transforming grassroots female empowerment across 14 states through education, vocational incubation, and legal advocacy under the National Presidency of Zeenat Kureshi."
      />

      <PageHeader
        section="women"
        breadcrumb="Leadership"
        eyebrow="Nationwide Socio-Civic Movement"
        title="All India Jamiatul Quresh Women Cell —"
        accent="Grassroots Advocacy & Economic Agency"
        description="Vocational incubation, micro-enterprise grants and pro-bono legal advocacy for women across India."
        scrollTargetId="vision"
        stats={[
          { value: '50,000+', label: 'Women Mobilized' },
          { value: '14 States', label: 'Active Chapters' },
          { value: '100 Years', label: 'Civic Heritage' },
        ]}
        actionButton={<BannerButton href="#programs">Explore National Programs</BannerButton>}
      >
        <BannerButton variant="ghost" href="#join">
          Join the Mission
        </BannerButton>
      </PageHeader>

      <SectionNav items={NAV} />

      {/* ── 1. Vision ────────────────────────────────────────────────── */}
      <Section id="vision" tone="surface">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-center lg:col-span-6 lg:items-start">
            <SectionHeading
              eyebrow="National Presidency"
              title="A Quiet Revolution:"
              accent="Empowering Women Nationwide"
              subtitle={hero.description}
              center="tablet"
            />
            <a
              href="#programs"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.16em] text-gold-800 transition-colors hover:text-ink-heading dark:text-gold-400"
            >
              See the programs <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <Reveal className="lg:col-span-6">
            <figure className="relative overflow-hidden rounded-3xl border-2 border-gold-500/40 bg-surface-raised p-8 text-ink-heading shadow-luxury-lg sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl"
              />
              <div className="relative">
                <Quote className="h-11 w-11 text-gold-700 dark:text-gold-400" aria-hidden />
                <blockquote className="mt-5 font-cormorant text-[clamp(1.35rem,1.5vw+0.9rem,2rem)] font-medium italic leading-snug text-ink-heading">
                  &ldquo;{missionStatement.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-gold-500/30 pt-5">
                  <img
                    src={zeenatAvatar}
                    alt={missionStatement.author}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 shrink-0 rounded-full object-cover object-top ring-2 ring-gold-500/60 ring-offset-2 ring-offset-surface-raised shadow-luxury sm:h-16 sm:w-16"
                  />
                  <span className="min-w-0">
                    <span className="block font-heading text-lg font-semibold text-gold-800 dark:text-gold-300">
                      {missionStatement.author}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-ink-soft">
                      {missionStatement.designation}
                    </span>
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* ── 2. Impact ────────────────────────────────────────────────── */}
      <Section id="impact" tone="deep">
        <SectionHeading
          center
          eyebrow="Impact by Numbers"
          title="Four Pillars of"
          accent="Structural Change"
          subtitle="Figures across the four pillars of the Women Cell's work."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, idx) => {
            const stat = parseStat(pillar.stat);
            return (
              <Reveal key={pillar.title} delay={idx * 0.07} className="h-full">
                <Card tone="dark" interactive className="group flex h-full flex-col items-center p-7 text-center sm:items-start sm:text-left">
                  <HoverRule />
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/40 bg-gradient-to-br from-gold-500/15 to-gold-500/5 text-gold-700 shadow-2xs transition-colors duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-emerald-950 dark:text-gold-400">
                    {PILLAR_ICONS[idx % PILLAR_ICONS.length]}
                  </span>
                  {stat ? (
                    <>
                      <InViewCount
                        value={stat.number}
                        suffix={stat.suffix}
                        className="font-heading text-[clamp(2.2rem,2.4vw+1rem,3.25rem)] font-semibold leading-none text-ink-heading tabular-nums"
                      />
                      <span className="mt-2 font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-800 dark:text-gold-300">
                        {stat.label}
                      </span>
                    </>
                  ) : (
                    <span className="font-heading text-xl font-semibold text-ink-heading">{pillar.stat}</span>
                  )}
                  <h3 className="mt-6 w-full border-t border-gold-500/25 pt-5 font-heading text-lg font-semibold leading-snug text-ink-heading">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">
                    {pillar.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── 3. Programs ──────────────────────────────────────────────── */}
      <Section id="programs" tone="surface">
        <SectionHeading
          center
          eyebrow="Flagship Programs"
          title="Institutional Programs Driving"
          accent="Generational Change"
          subtitle="Targeted interventions creating lasting economic self-reliance."
        />

        {/* Featured program */}
        <Reveal>
          <Card className="grid overflow-hidden lg:grid-cols-12">
            <div className="relative min-h-[260px] lg:col-span-5">
              <img
                src={focusWomen}
                alt="Women leaders rallying at sunrise"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-emerald-950/30" />
              <span className="absolute left-5 top-5 rounded-full border border-gold-400/50 bg-surface-raised px-3.5 py-1.5 font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-800 dark:text-gold-300 backdrop-blur-md">
                Flagship
              </span>
            </div>
            <div className="flex flex-col items-center p-7 text-center sm:p-10 lg:col-span-7 lg:items-start lg:text-left">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-emerald-950 shadow-[0_12px_26px_-10px_rgba(199,154,61,0.75)] ring-4 ring-gold-500/15">
                {ICONS[featuredProgram.iconName] ?? <HeartHandshake className="h-6 w-6" />}
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold leading-snug text-ink-heading sm:text-3xl">
                {featuredProgram.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
                {featuredProgram.description}
              </p>
              <div className="mt-6 grid w-full gap-3 border-t border-hairline pt-5 text-left sm:grid-cols-2">
                <p className="flex items-start gap-2.5 text-[0.95rem] font-medium text-ink-heading">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-600" />
                  {featuredProgram.impact}
                </p>
                <p className="flex items-start gap-2.5 text-[0.95rem] text-ink-soft">
                  <Users className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold-600" />
                  {featuredProgram.beneficiaries}
                </p>
              </div>
            </div>
          </Card>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {otherPrograms.map((init, idx) => (
            <Reveal key={init.id} delay={idx * 0.07} className="h-full">
              <Card interactive className="group flex h-full flex-col overflow-hidden">
                <HoverRule />
                {PROGRAM_PHOTOS[init.id] && (
                  <div className="grain relative aspect-[16/10] overflow-hidden bg-emerald-950">
                    <img
                      src={PROGRAM_PHOTOS[init.id]!.src}
                      alt={PROGRAM_PHOTOS[init.id]!.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: PROGRAM_PHOTOS[init.id]!.focal }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-emerald-950/55 via-transparent to-transparent" />
                  </div>
                )}
                <div className="relative flex flex-1 flex-col items-center px-7 pb-7 text-center md:items-start md:text-left">
                  <span className="relative z-10 -mt-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-emerald-950 shadow-[0_12px_26px_-10px_rgba(199,154,61,0.75)] ring-4 ring-surface-raised transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                    {ICONS[init.iconName] ?? <HeartHandshake className="h-6 w-6" />}
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-ink-heading">
                    {init.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                    {init.description}
                  </p>
                  <div className="mt-6 w-full space-y-2.5 rounded-xl border border-gold-500/20 bg-gradient-to-br from-gold-500/[0.07] via-surface-sunken/60 to-surface-sunken/30 p-4 text-left text-sm">
                    <p className="flex items-start gap-2 font-medium text-ink-heading">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {init.impact}
                    </p>
                    <p className="flex items-start gap-2 text-ink-soft">
                      <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {init.beneficiaries}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 4. Events ────────────────────────────────────────────────── */}
      <Section id="events" tone="sunken">
        <SectionHeading
          center
          eyebrow="Engagements & Conclaves"
          title="Assemblies, Exhibitions &"
          accent="Webinars"
          subtitle={
            upcoming.length
              ? 'Register to take part in nationwide conventions and community forums.'
              : "Past assemblies, exhibitions and webinars of the Women Cell."
          }
        />

        {upcoming.length === 0 && (
          <Reveal>
            <div className="mb-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-gold-600/35 bg-surface-raised p-6 text-center shadow-luxury sm:flex-row sm:p-8 sm:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-700 dark:text-gold-400">
                  <Calendar className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-ink-heading">
                    No upcoming dates are listed right now
                  </h3>
                  <p className="mt-1 text-[0.95rem] text-ink-soft">
                    Past editions are shown below. Use the form to register your interest in future events.
                  </p>
                </div>
              </div>
              <BannerButton href="#join" variant="primary">
                Notify me
              </BannerButton>
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[...upcoming, ...past].map((evt, idx) => {
            const isPast = evt.endsOn < today;
            return (
              <Reveal key={evt.id} delay={idx * 0.07} className="h-full">
                <Card
                  interactive={!isPast}
                  className={`group flex h-full flex-col items-center p-7 text-center md:items-start md:text-left ${isPast ? 'opacity-90' : ''}`}
                >
                  <HoverRule />
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="rounded-full border border-gold-600/30 bg-gold-500/10 px-3 py-1 font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-800 dark:text-gold-300">
                      {evt.type}
                    </span>
                    {isPast ? (
                      <Badge variant="outline" size="sm">
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="ivory" size="sm">
                        {evt.status}
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-ink-heading">
                    {evt.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                    {evt.description}
                  </p>

                  <div className="mt-6 flex w-full justify-center border-t border-hairline pt-4 md:justify-start">
                    <ul className="inline-flex flex-col space-y-2 text-left text-sm text-ink-soft">
                      <li className="flex items-center gap-2.5">
                        <Calendar className="h-4 w-4 shrink-0 text-gold-600" />
                        {evt.date}
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 shrink-0 text-gold-600" />
                        {evt.time}
                      </li>
                      <li className="flex items-center gap-2.5">
                        {evt.type === 'Virtual' ? (
                          <MonitorPlay className="h-4 w-4 shrink-0 text-gold-600" />
                        ) : (
                          <span className="flex w-4 shrink-0 justify-center">
                            <MapPinLogo className="h-4" />
                          </span>
                        )}
                        {evt.location}
                      </li>
                    </ul>
                  </div>

                  {!isPast && (
                    <a
                      href="#join"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-5 py-3 font-label text-xs font-bold uppercase tracking-[0.14em] text-emerald-950 transition-all hover:from-gold-300 hover:to-gold-500"
                    >
                      Register interest <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ── 5. Join ──────────────────────────────────────────────────── */}
      <Section id="join" tone="surface">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
            <SectionHeading
              eyebrow="Join the Mission"
              title="Lend Your Voice,"
              accent="Skills or Resources"
              subtitle="Whether an advocate, educator, donor partner or volunteer, connect with the national secretariat."
              center="tablet"
            />

            {/* Women leaders sharing one stage -- the company a new member joins */}
            <Reveal className="w-full max-w-md lg:max-w-none">
              <figure>
                <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-gold-500/50"
                />
                <div className="grain relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold-600/30 bg-emerald-950 shadow-luxury-lg">
                  <img
                    src={eventPhotos.womenPanel.src}
                    alt={eventPhotos.womenPanel.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: '58% 50%' }}
                    className="h-full w-full object-cover"
                  />
                </div>
                </div>
                <figcaption className="relative mt-6 flex items-start gap-3 text-left">
                  <span aria-hidden className="mt-2 h-[2px] w-8 shrink-0 rounded-full bg-gold-500" />
                  <span>
                    <span className="block font-label text-3xs font-bold uppercase tracking-[0.2em] text-gold-800 dark:text-gold-300 sm:text-2xs">
                      Women leaders&apos; panel
                    </span>
                    <span className="mt-1 block font-heading text-sm font-semibold leading-snug text-ink-heading sm:text-base">
                      {eventPhotos.womenPanel.event} · {eventPhotos.womenPanel.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <WomenCellInquiryForm />
          </div>
        </div>
      </Section>
    </div>
  );
};
