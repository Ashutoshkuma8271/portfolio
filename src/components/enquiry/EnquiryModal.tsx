import { Diamond } from '../ui/Diamond';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  X,
  Send,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Loader2,
  Mail,
  Lock,
  ChevronDown,
} from 'lucide-react';
import {
  submitEnquiry,
  whatsappLink,
  deskEmail,
  enquiryEndpointConfigured,
  type EnquiryKind as AnyEnquiryKind,
  type SubmitResult,
} from '../../lib/enquiry';
import { eventPhotos } from '../../data/eventPhotos';

/** The three pop-up enquiry types (the footer newsletter posts through the same lib, not this modal). */
type EnquiryKind = Exclude<AnyEnquiryKind, 'newsletter'>;
import { INVEST_SECTORS, type InvestSectorId } from '../../data/investSectors';

/* ─────────────────────────── field model ─────────────────────────── */

type FieldType = 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'chips';

interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  half?: boolean;
  help?: string;
  section?: string; // Grouping label for clean sequential sections
}

interface KindConfig {
  eyebrow: string;
  title: string;
  accent: string;
  blurb: string;
  photo: (typeof eventPhotos)[keyof typeof eventPhotos];
  assurances: string[];
  submit: string;
  fields: FieldDef[];
  fine?: string;
}

const CONFIG: Record<EnquiryKind, KindConfig> = {
  investment: {
    eyebrow: 'Sovereign & Direct Investment',
    title: 'Initiate an Investment',
    accent: 'Mandate',
    blurb: 'Direct institutional consultation with the Trade Commissioner’s office for CEPA-optimized bilateral investments across GCC and India.',
    photo: eventPhotos.agrivoltaics,
    assurances: [
      'Strict confidentiality & non-disclosure protocol',
      'Five priority growth sectors with sovereign clearance',
      'Direct access to the Trade Commissioner’s desk',
      'Turnaround within 24–48 business hours',
    ],
    submit: 'Submit Investment Brief',
    fine: 'Institutional investment enquiry. All engagements undergo regulatory clearance and bilateral protocol.',
    fields: [
      {
        name: 'sector',
        label: 'Priority Sector of Interest',
        type: 'chips',
        required: true,
        section: '01 · Priority Sector',
        options: [
          ...INVEST_SECTORS.map((s) => s.label),
          'Multi-Sector / Family Office Allocation',
        ],
      },
      {
        name: 'name',
        label: 'Principal / Full Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Tariq Al-Mansoor / Dr. Rajesh Verma',
        half: true,
        section: '02 · Stakeholder Credentials',
      },
      {
        name: 'company',
        label: 'Entity / Sovereign Fund / Family Office',
        type: 'text',
        required: true,
        placeholder: 'e.g. Gulf Sovereign Capital LLC',
        half: true,
      },
      {
        name: 'email',
        label: 'Corporate / Institutional Email',
        type: 'email',
        required: true,
        placeholder: 'principal@organization.com',
        half: true,
      },
      {
        name: 'phone',
        label: 'Direct Phone / WhatsApp',
        type: 'tel',
        required: true,
        placeholder: '+91 99997 45023',
        half: true,
      },
      {
        name: 'investorType',
        label: 'Investor Profile',
        type: 'select',
        section: '03 · Mandate Specifications',
        options: [
          'Family Office',
          'Sovereign Wealth / Institutional Fund',
          'Corporate Enterprise',
          'High-Net-Worth Investor',
          'Private Equity / Venture Fund',
        ],
        half: true,
      },
      {
        name: 'ticket',
        label: 'Indicative Capital Allocation',
        type: 'select',
        options: [
          '₹5 Cr – ₹25 Cr ($600K – $3M)',
          '₹25 Cr – ₹100 Cr ($3M – $12M)',
          '₹100 Cr – ₹500 Cr ($12M – $60M)',
          '₹500 Cr+ ($60M+ Sovereign / Giga)',
          'Prefer to discuss in confidence',
        ],
        half: true,
      },
      {
        name: 'timeline',
        label: 'Deployment Horizon',
        type: 'select',
        options: [
          'Active Allocation / Ready Now',
          'Within 1–3 Months',
          '3–6 Months',
          'Strategic / Exploratory',
        ],
        half: true,
      },
      {
        name: 'message',
        label: 'Strategic Objectives & Investment Scope',
        type: 'textarea',
        section: '04 · Strategic Overview',
        placeholder: 'Outline target asset classes, cross-border corridors, co-investment criteria, or mandate specifics...',
      },
    ],
  },
  collaborate: {
    eyebrow: 'Institutional Collaboration',
    title: 'Strategic Partnership &',
    accent: 'Bilateral Initiatives',
    blurb: 'Direct channel for cross-border trade delegations, sovereign joint ventures, cinema co-productions, and bilateral summits with the Secretariat.',
    photo: eventPhotos.udcStage,
    assurances: [
      'Read directly by the Executive Secretariat',
      'Diplomatic protocol & institutional confidentiality',
      'Cross-sector alignment across GCC & Indian jurisdictions',
      'Turnaround within 24–48 business hours',
    ],
    submit: 'Submit Collaboration Brief',
    fine: 'All proposals undergo secretariat evaluation prior to high-level bilateral coordination.',
    fields: [
      {
        name: 'type',
        label: 'Collaboration Scope',
        type: 'chips',
        required: true,
        section: '01 · Mandate Scope',
        options: [
          'Bilateral Trade Mission',
          'Sovereign / FDI Project',
          'Film & Media Co-Production',
          'Women Leadership Initiative',
          'Cultural & Diplomatic Exchange',
          'Strategic Advisory Mandate',
        ],
      },
      {
        name: 'name',
        label: 'Full Name & Designation',
        type: 'text',
        required: true,
        placeholder: 'e.g. Tariq Al-Mansoor / Dr. Rajesh Verma',
        half: true,
        section: '02 · Delegate & Organization Details',
      },
      {
        name: 'organisation',
        label: 'Organization / Ministry / Entity',
        type: 'text',
        required: true,
        placeholder: 'e.g. Ministry of Economy / Enterprise Name',
        half: true,
      },
      {
        name: 'email',
        label: 'Official Work Email',
        type: 'email',
        required: true,
        placeholder: 'delegate@organization.com',
        half: true,
      },
      {
        name: 'phone',
        label: 'Direct Phone / WhatsApp',
        type: 'tel',
        required: true,
        placeholder: '+91 99997 45023',
        half: true,
      },
      {
        name: 'jurisdiction',
        label: 'Primary Jurisdiction',
        type: 'select',
        section: '03 · Jurisdiction & Schedule',
        options: [
          'United Arab Emirates',
          'India',
          'Kingdom of Saudi Arabia',
          'Qatar',
          'Oman',
          'Kuwait',
          'Bahrain',
          'Other International',
        ],
        half: true,
      },
      {
        name: 'timeline',
        label: 'Target Timeline',
        type: 'select',
        options: [
          'Immediate / Priority Q1-Q2',
          'Within 30–90 Days',
          '3–6 Months Horizon',
          'Long-term Strategic Mandate',
        ],
        half: true,
      },
      {
        name: 'message',
        label: 'Strategic Proposal & Desired Outcomes',
        type: 'textarea',
        required: true,
        section: '04 · Proposal Summary',
        placeholder: 'Summarize key objectives, institutional synergy, required secretariat facilitation, and anticipated milestones...',
      },
    ],
  },
  media: {
    eyebrow: 'Press & Media Bureau',
    title: 'Press, Broadcast &',
    accent: 'Keynote Requests',
    blurb: 'Direct channel for accredited television networks, global publications, summit curators, and official media licensing requests.',
    photo: eventPhotos.felicitation,
    assurances: [
      'Direct routing to the Media & Communications Desk',
      'Priority handling for live broadcast & editorial deadlines',
      'High-resolution approved photography & press kits provided',
      'Turnaround within 24–48 business hours',
    ],
    submit: 'Transmit Media Request',
    fine: 'Approved press assets and statements are released under official secretariat copyright protocol.',
    fields: [
      {
        name: 'type',
        label: 'Media Engagement Format',
        type: 'chips',
        required: true,
        section: '01 · Engagement Format',
        options: [
          'Broadcast / TV Interview',
          'Keynote & Conclave Invitation',
          'Official Press Statement',
          'Editorial Feature / Profile',
          'Press Accreditation & Access',
          'Media Clearance & Assets',
        ],
      },
      {
        name: 'name',
        label: 'Journalist / Producer / Curator Name',
        type: 'text',
        required: true,
        placeholder: 'e.g. Sarah Jenkins / Rajesh Sharma',
        half: true,
        section: '02 · Media Credentials',
      },
      {
        name: 'outlet',
        label: 'Media Outlet / Network / Summit',
        type: 'text',
        required: true,
        placeholder: 'e.g. CNBC, Bloomberg, Global Summit',
        half: true,
      },
      {
        name: 'email',
        label: 'Press / Official Email',
        type: 'email',
        required: true,
        placeholder: 'producer@network.com',
        half: true,
      },
      {
        name: 'phone',
        label: 'Direct Phone / WhatsApp',
        type: 'tel',
        required: true,
        placeholder: '+91 99997 45023',
        half: true,
      },
      {
        name: 'format',
        label: 'Interview / Coverage Setting',
        type: 'select',
        section: '03 · Technical Details',
        options: [
          'Live Broadcast / TV Studio',
          'In-Person Summit / Conclave Keynote',
          'Remote Video / Satellite Link',
          'Written Q&A / Press Statement',
        ],
        half: true,
      },
      {
        name: 'deadline',
        label: 'Broadcast / Editorial Deadline',
        type: 'date',
        half: true,
        help: 'If time-sensitive broadcast',
      },
      {
        name: 'message',
        label: 'Editorial Scope & Discussion Topics',
        type: 'textarea',
        required: true,
        section: '04 · Editorial Scope',
        placeholder: 'Topics to be covered, audience scale, broadcast date, distribution network, and specific questions...',
      },
    ],
  },
};

/* ─────────────────────────── helpers ─────────────────────────── */

type Values = Record<string, string>;
type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validate = (fields: FieldDef[], v: Values, consent: boolean): Errors => {
  const e: Errors = {};
  fields.forEach((f) => {
    const val = (v[f.name] ?? '').trim();
    if (f.required && !val) e[f.name] = f.type === 'chips' ? 'Please select an option' : 'This field is required';
    else if (f.type === 'email' && val && !EMAIL_RE.test(val)) e[f.name] = 'Enter a valid email address';
    else if (f.type === 'tel' && val && val.replace(/\D/g, '').length < 7) e[f.name] = 'Enter a valid phone number';
  });
  if (!consent) e.consent = 'Please confirm agreement to proceed';
  return e;
};

const inputBase =
  'w-full rounded-xl border border-hairline bg-surface-sunken/40 px-3.5 py-3 text-[0.92rem] text-ink-heading placeholder:text-ink-faint/70 outline-none transition-all duration-200 hover:border-gold-500/40 focus:border-gold-500 focus:bg-surface focus:ring-4 focus:ring-gold-500/15';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  kind: EnquiryKind;
  /** Pre-selects the sector chip (investment only). */
  initialSector?: InvestSectorId | null;
}

/**
 * One modal for all three enquiry types (invest / collaborate / media).
 * Theme-aware (tokens, not hard-coded white), keyboard and screen-reader
 * friendly, validated inline, structured sequentially with clear visual groupings.
 */
export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, kind, initialSector }) => {
  const cfg = CONFIG[kind];
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [touchedSubmit, setTouchedSubmit] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const initialChip = useMemo(() => {
    if (kind !== 'investment' || !initialSector) return '';
    return INVEST_SECTORS.find((s) => s.id === initialSector)?.label ?? '';
  }, [kind, initialSector]);

  // Fresh form every time it opens (and pre-pick the sector the visitor clicked).
  useEffect(() => {
    if (!isOpen) return;
    setValues(initialChip ? { sector: initialChip } : {});
    setConsent(false);
    setErrors({});
    setTouchedSubmit(false);
    setBusy(false);
    setFailed(false);
    setResult(null);
  }, [isOpen, kind, initialChip]);

  // Scroll lock, Escape, and return focus to whatever opened the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('input,textarea,select,button[data-chip]')?.focus(), 250);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touchedSubmit) setErrors(validate(cfg.fields, { ...values, [name]: value }, consent));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedSubmit(true);
    const errs = validate(cfg.fields, values, consent);
    setErrors(errs);
    if (Object.keys(errs).length) {
      dialogRef.current?.querySelector<HTMLElement>('[aria-invalid="true"],[data-invalid="true"]')?.focus();
      return;
    }
    // Honeypot check
    if ((values.website ?? '').trim()) {
      setResult({ mode: 'sent', ref: 'ZK-OK' });
      return;
    }
    setBusy(true);
    setFailed(false);
    try {
      const res = await submitEnquiry({
        kind,
        fields: cfg.fields.map((f) => ({ label: f.label, value: (values[f.name] ?? '').trim() })),
      });
      setResult(res);
      if (res.mode === 'email') window.location.href = res.href;
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  const summaryForWhatsApp = `Hello, I have submitted an official enquiry on your website regarding ${cfg.eyebrow}${
    result ? ` (Ref: ${result.ref})` : ''
  }${values.sector ? ` [Sector: ${values.sector}]` : ''}${values.type ? ` [Scope: ${values.type}]` : ''}.`;

  const Err: React.FC<{ name: string }> = ({ name }) =>
    errors[name] ? (
      <p role="alert" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
        {errors[name]}
      </p>
    ) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-surface-deepest/80 backdrop-blur-md"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-gold-600/40 bg-surface-raised text-ink shadow-[0_30px_90px_-20px_rgba(0,0,0,0.6)] sm:rounded-3xl md:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-3.5 top-3.5 z-30 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gold-600/40 bg-surface/90 text-ink-heading backdrop-blur transition-all hover:scale-105 hover:border-gold-500 hover:bg-gold-500 hover:text-emerald-950 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ── Left: Executive photograph + credentials ─────────────────── */}
            <aside className="relative hidden w-[36%] shrink-0 overflow-hidden md:flex md:flex-col justify-between">
              <img
                src={cfg.photo.src}
                alt=""
                aria-hidden
                style={{ objectPosition: cfg.photo.focal }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/30" />
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl"
              />

              {/* Top watermark badge */}
              <div className="relative p-6 pb-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-emerald-950/80 px-3 py-1 font-label text-2xs font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur">
                  <Diamond /> {cfg.eyebrow}
                </span>
              </div>

              {/* Bottom guarantees */}
              <div className="relative p-6 pt-0 text-ivory-500 space-y-4">
                <div className="space-y-2.5">
                  <p className="font-label text-2xs font-bold uppercase tracking-[0.18em] text-gold-400/90">
                    Diplomatic Protocols
                  </p>
                  <ul className="space-y-2.5">
                    {cfg.assurances.map((a) => (
                      <li key={a} className="flex items-start gap-2.5 text-xs sm:text-[0.82rem] leading-snug text-ivory-600">
                        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-gold-500/20 pt-3">
                  <p className="font-label text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ivory-700">
                    {cfg.photo.event} · {cfg.photo.location}
                  </p>
                </div>
              </div>
            </aside>

            {/* ── Right: form / success view ───────────────────────────── */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 lg:p-9">
              {result ? (
                <div className="flex min-h-[22rem] flex-col items-center justify-center text-center py-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-500/15 text-gold-600 dark:text-gold-400 shadow-sm">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 id="enquiry-title" className="mt-4 font-heading text-2xl font-bold text-ink-heading sm:text-3xl">
                    {result.mode === 'sent' ? 'Official Brief Transmitted' : 'Dispatch Prepared'}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                    {result.mode === 'sent'
                      ? 'Your briefing has been logged directly with the Executive Office. Our senior desk will review and reach out within 24–48 business hours.'
                      : `Your default email client has been prepared. Please review and send your message, or direct correspondence to ${deskEmail(kind)}.`}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-600/35 bg-surface-sunken px-4 py-1 font-label text-xs font-bold uppercase tracking-[0.16em] text-gold-800 dark:text-gold-300">
                    <span>Reference ID:</span>
                    <span className="font-mono text-ink-heading">{result.ref}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-3 w-full max-w-md">
                    <a
                      href={whatsappLink(summaryForWhatsApp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 flex-1 min-w-[160px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-5 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-md transition-all hover:from-gold-300 hover:to-gold-500 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp Desk
                    </a>
                    {result.mode === 'email' && (
                      <a
                        href={result.href}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-gold-600/40 bg-surface px-5 font-label text-xs font-bold uppercase tracking-[0.12em] text-ink-heading transition-colors hover:border-gold-500 hover:bg-surface-sunken cursor-pointer"
                      >
                        <Mail className="h-4 w-4" /> Open Email Client
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-hairline bg-surface-sunken/60 px-5 font-label text-xs font-bold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink-heading cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-600/30 bg-surface-sunken px-3 py-0.5 text-2xs font-label font-bold uppercase tracking-[0.18em] text-gold-800 dark:text-gold-300 mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      <span>{cfg.eyebrow}</span>
                    </div>
                    <h2
                      id="enquiry-title"
                      className="font-display text-[clamp(1.4rem,2vw+0.8rem,2.15rem)] font-semibold leading-[1.15] text-ink-heading"
                    >
                      {cfg.title}{' '}
                      <span className="gold-text-deep dark:gold-text font-cormorant text-[1.12em] italic font-normal">{cfg.accent}</span>
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-soft max-w-xl">{cfg.blurb}</p>
                  </div>

                  {/* Form Fields Rendered with Structured Section Sequences */}
                  <div className="space-y-5">
                    {/* Render fields grouped by section where defined */}
                    {(() => {
                      // Collect fields and render them
                      const elements: React.ReactNode[] = [];
                      let currentSection: string | null = null;
                      let pendingGrid: FieldDef[] = [];

                      const flushGrid = () => {
                        if (pendingGrid.length === 0) return;
                        const items = [...pendingGrid];
                        pendingGrid = [];
                        elements.push(
                          <div key={`grid-${items.map((i) => i.name).join('-')}`} className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            {items.map((f) => renderFieldItem(f))}
                          </div>
                        );
                      };

                      const renderFieldItem = (f: FieldDef) => {
                        const full = !f.half;
                        const id = `enq-${f.name}`;
                        const invalid = Boolean(errors[f.name]);
                        return (
                          <div key={f.name} className={full ? 'sm:col-span-2' : ''}>
                            <label
                              htmlFor={f.type === 'chips' ? undefined : id}
                              id={`${id}-label`}
                              className="mb-1.5 block font-label text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-heading/85"
                            >
                              <span>{f.label}</span>
                              {f.required && <span className="ml-1 text-gold-600 dark:text-gold-400">*</span>}
                            </label>

                            {f.type === 'chips' && (
                              <div role="radiogroup" aria-labelledby={`${id}-label`} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                                {f.options!.map((opt, i) => {
                                  const on = values[f.name] === opt;
                                  const isLastOdd = f.options!.length % 2 !== 0 && i === f.options!.length - 1;
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      role="radio"
                                      aria-checked={on}
                                      data-chip
                                      data-invalid={invalid && i === 0 ? 'true' : undefined}
                                      onClick={() => set(f.name, opt)}
                                      className={`w-full flex items-center justify-between text-left rounded-xl border px-3.5 py-2.5 text-xs sm:text-[0.85rem] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 cursor-pointer ${
                                        isLastOdd ? 'sm:col-span-2' : ''
                                      } ${
                                        on
                                          ? 'border-gold-500 bg-gradient-to-r from-gold-500/15 to-gold-600/25 dark:from-gold-400/20 dark:to-gold-600/30 font-semibold text-gold-900 dark:text-gold-200 shadow-sm border-gold-500/80 ring-1 ring-gold-500/30'
                                          : 'border-hairline bg-surface-sunken/40 font-medium text-ink hover:border-gold-500/50 hover:bg-gold-500/5'
                                      }`}
                                    >
                                      <span className="truncate pr-2">{opt}</span>
                                      <span
                                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                                          on
                                            ? 'border-gold-500 bg-gold-500 text-emerald-950'
                                            : 'border-hairline bg-surface/50'
                                        }`}
                                      >
                                        {on && <span className="h-1.5 w-1.5 rounded-full bg-emerald-950" />}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {f.type === 'select' && (
                              <div className="relative">
                                <select
                                  id={id}
                                  value={values[f.name] ?? ''}
                                  onChange={(e) => set(f.name, e.target.value)}
                                  className={`${inputBase} appearance-none pr-9`}
                                >
                                  <option value="" disabled className="bg-surface text-ink-soft">
                                    Select an option…
                                  </option>
                                  {f.options!.map((o) => (
                                    <option key={o} value={o} className="bg-surface text-ink">
                                      {o}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
                              </div>
                            )}

                            {f.type === 'textarea' && (
                              <textarea
                                id={id}
                                rows={3}
                                value={values[f.name] ?? ''}
                                onChange={(e) => set(f.name, e.target.value)}
                                placeholder={f.placeholder}
                                aria-invalid={invalid}
                                className={`${inputBase} resize-y min-h-[84px] leading-relaxed ${invalid ? 'border-red-500' : ''}`}
                              />
                            )}

                            {(f.type === 'text' || f.type === 'email' || f.type === 'tel' || f.type === 'date') && (
                              <input
                                id={id}
                                type={f.type}
                                inputMode={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined}
                                autoComplete={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : f.name === 'name' ? 'name' : undefined}
                                value={values[f.name] ?? ''}
                                onChange={(e) => set(f.name, e.target.value)}
                                placeholder={f.placeholder}
                                aria-invalid={invalid}
                                className={`${inputBase} ${invalid ? 'border-red-500' : ''}`}
                              />
                            )}
                            {f.help && !invalid && <p className="mt-1 text-[0.72rem] text-ink-faint">{f.help}</p>}
                            <Err name={f.name} />
                          </div>
                        );
                      };

                      cfg.fields.forEach((f) => {
                        if (f.section && f.section !== currentSection) {
                          flushGrid();
                          currentSection = f.section;
                          elements.push(
                            <div key={`sec-${f.section}`} className="pt-2 pb-0.5 border-t border-hairline/60 first:border-t-0 first:pt-0">
                              <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
                                {f.section}
                              </span>
                            </div>
                          );
                        }

                        if (f.type === 'chips' || f.type === 'textarea' || !f.half) {
                          flushGrid();
                          elements.push(renderFieldItem(f));
                        } else {
                          pendingGrid.push(f);
                        }
                      });

                      flushGrid();
                      return elements;
                    })()}

                    {/* Honeypot */}
                    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label>
                        Website
                        <input tabIndex={-1} autoComplete="off" value={values.website ?? ''} onChange={(e) => set('website', e.target.value)} />
                      </label>
                    </div>
                  </div>

                  {/* Verification & Consent */}
                  <div className="pt-2 border-t border-hairline">
                    <label className="flex cursor-pointer items-start gap-3 text-xs leading-snug text-ink-soft select-none">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (touchedSubmit) setErrors(validate(cfg.fields, values, e.target.checked));
                        }}
                        aria-invalid={Boolean(errors.consent)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#C79A3D] cursor-pointer"
                      />
                      <span>
                        I confirm this official engagement brief is accurate and agree to bilateral correspondence by the Executive Secretariat.
                      </span>
                    </label>
                    <Err name="consent" />

                    {failed && (
                      <p role="alert" className="mt-3 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-ink-heading">
                        Dispatch could not be transmitted. Please try again or write directly to {deskEmail(kind)}.
                      </p>
                    )}

                    {/* CTA Submit Button */}
                    <button
                      type="submit"
                      disabled={busy}
                      className="group mt-4.5 flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-gold-300/60 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.16em] text-emerald-950 shadow-[0_10px_25px_-8px_rgba(199,154,61,0.65)] transition-all duration-300 hover:from-gold-300 hover:to-gold-500 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 cursor-pointer"
                    >
                      {busy ? <Loader2 className="h-4 w-4 animate-spin text-emerald-950" /> : <Send className="h-4 w-4 text-emerald-950" />}
                      <span>{busy ? 'Transmitting Briefing…' : cfg.submit}</span>
                    </button>

                    <div className="mt-3 flex items-center justify-center gap-2 text-[0.7rem] text-ink-faint">
                      <Lock className="h-3 w-3 shrink-0 text-gold-600/80" />
                      <span>
                        {cfg.fine ? `${cfg.fine} · ` : ''}
                        {enquiryEndpointConfigured
                          ? 'Encrypted institutional transmission'
                          : 'Prepares official correspondence in your designated email client'}
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

