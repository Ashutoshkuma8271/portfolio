import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Scale,
  HeartPulse,
  HeartHandshake,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Quote,
  Users,
  ArrowRight,
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
import { womenLeadershipData } from '../data/womenLeadership';
import focusWomen from '../assets/images/focus/women.webp';

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
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="National Presidency"
              title="A Quiet Revolution:"
              accent="Empowering Women Nationwide"
              subtitle={hero.description}
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
                <figcaption className="mt-7 border-t border-gold-500/30 pt-5">
                  <span className="block font-heading text-lg font-semibold text-gold-800 dark:text-gold-300">
                    {missionStatement.author}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    {missionStatement.designation}
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
                <Card tone="dark" interactive className="flex h-full flex-col p-7">
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
                  <h3 className="mt-6 border-t border-gold-500/25 pt-5 font-heading text-lg font-semibold leading-snug text-ink-heading">
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
            <div className="p-7 sm:p-10 lg:col-span-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-surface-sunken text-gold-700 dark:text-gold-400">
                {ICONS[featuredProgram.iconName] ?? <HeartHandshake className="h-6 w-6" />}
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold leading-snug text-ink-heading sm:text-3xl">
                {featuredProgram.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
                {featuredProgram.description}
              </p>
              <div className="mt-6 grid gap-3 border-t border-hairline pt-5 sm:grid-cols-2">
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
              <Card interactive className="flex h-full flex-col p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-surface-sunken text-gold-700 dark:text-gold-400">
                  {ICONS[init.iconName] ?? <HeartHandshake className="h-6 w-6" />}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-ink-heading">
                  {init.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {init.description}
                </p>
                <div className="mt-6 space-y-2.5 border-t border-hairline pt-4 text-sm">
                  <p className="flex items-start gap-2 font-medium text-ink-heading">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    {init.impact}
                  </p>
                  <p className="flex items-start gap-2 text-ink-soft">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    {init.beneficiaries}
                  </p>
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
            <div className="mb-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-gold-600/35 bg-surface-raised p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="flex items-start gap-4">
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
                  className={`flex h-full flex-col p-7 ${isPast ? 'opacity-90' : ''}`}
                >
                  <div className="flex items-center justify-between gap-3">
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

                  <ul className="mt-6 space-y-2 border-t border-hairline pt-4 text-sm text-ink-soft">
                    <li className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 shrink-0 text-gold-600" />
                      {evt.date}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 shrink-0 text-gold-600" />
                      {evt.time}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                      {evt.location}
                    </li>
                  </ul>

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
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Join the Mission"
              title="Lend Your Voice,"
              accent="Skills or Resources"
              subtitle="Whether an advocate, educator, donor partner or volunteer, connect with the national secretariat."
            />
          </div>
          <div className="lg:col-span-7">
            <WomenCellInquiryForm />
          </div>
        </div>
      </Section>
    </div>
  );
};
