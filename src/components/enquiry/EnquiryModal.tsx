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
} from 'lucide-react';
import {
  submitEnquiry,
  whatsappLink,
  deskEmail,
  enquiryEndpointConfigured,
  type EnquiryKind,
  type SubmitResult,
} from '../../lib/enquiry';
import { eventPhotos } from '../../data/eventPhotos';
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
    ],
    submit: 'Submit Investment Brief',
    fine: 'This is an institutional enquiry, not a public solicitation. All engagements are subject to regulatory clearance and legal due diligence.',
    fields: [
      {
        name: 'sector',
        label: 'Priority Sector of Interest',
        type: 'chips',
        required: true,
        options: [
          ...INVEST_SECTORS.map((s) => s.label),
          'Multi-Sector / Family Office Allocation',
        ],
      },
      { name: 'name', label: 'Principal / Mandate Holder Name', type: 'text', required: true, placeholder: 'e.g. H.E. / Dr. / Mr. Full Name', half: true },
      { name: 'company', label: 'Enterprise / Sovereign Fund / Family Office', type: 'text', required: true, placeholder: 'Entity name', half: true },
      { name: 'email', label: 'Corporate / Institutional Email', type: 'email', required: true, placeholder: 'principal@organization.com', half: true },
      { name: 'phone', label: 'Direct Phone / WhatsApp', type: 'tel', required: true, placeholder: '+971 … or +91 …', half: true },
      {
        name: 'investorType',
        label: 'Investor Profile',
        type: 'select',
        options: ['Family Office', 'Sovereign Wealth / Institutional Fund', 'Corporate Enterprise', 'High-Net-Worth Investor', 'Private Equity / Venture Fund'],
        half: true,
      },
      {
        name: 'ticket',
        label: 'Indicative Capital Allocation',
        type: 'select',
        options: ['Prefer to discuss in confidence', '₹5 Cr – ₹25 Cr ($600K – $3M)', '₹25 Cr – ₹100 Cr ($3M – $12M)', '₹100 Cr – ₹500 Cr ($12M – $60M)', '₹500 Cr+ ($60M+)'],
        half: true,
      },
      {
        name: 'timeline',
        label: 'Deployment Horizon',
        type: 'select',
        options: ['Active Allocation / Ready Now', 'Within 3 Months', '3 – 6 Months', 'Strategic / Exploratory'],
        half: true,
      },
      { name: 'message', label: 'Strategic Objectives & Investment Criteria', type: 'textarea', placeholder: 'Target market corridor, asset class preferences, co-investment requirements…' },
    ],
  },
  collaborate: {
    eyebrow: 'Institutional Collaboration',
    title: 'Strategic Partnership &',
    accent: 'Bilateral Initiatives',
    blurb: 'Initiate cross-border trade delegations, sovereign joint ventures, cinema co-productions, or leadership mandates with the Secretariat.',
    photo: eventPhotos.udcStage,
    assurances: [
      'Read directly by the Executive Secretariat',
      'Diplomatic protocol & institutional confidentiality',
      'Cross-sector alignment across GCC & Indian jurisdictions',
    ],
    submit: 'Submit Collaboration Brief',
    fine: 'All proposals undergo initial secretariat review before high-level bilateral coordination.',
    fields: [
      {
        name: 'type',
        label: 'Collaboration Scope',
        type: 'chips',
        required: true,
        options: [
          'Bilateral Trade Mission',
          'Sovereign / FDI Project',
          'Film & Media Co-Production',
          'Women Leadership Initiative',
          'Cultural & Diplomatic Exchange',
          'Strategic Advisory Mandate',
        ],
      },
      { name: 'name', label: 'Full Name & Title', type: 'text', required: true, placeholder: 'Your official name and title', half: true },
      { name: 'organisation', label: 'Organization / Ministry / Entity', type: 'text', required: true, placeholder: 'Entity name', half: true },
      { name: 'email', label: 'Official Work Email', type: 'email', required: true, placeholder: 'delegate@organization.com', half: true },
      { name: 'phone', label: 'Direct Phone / WhatsApp', type: 'tel', required: true, placeholder: '+971 … or +91 …', half: true },
      {
        name: 'jurisdiction',
        label: 'Primary Jurisdiction',
        type: 'select',
        options: ['India', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain', 'Other International'],
        half: true,
      },
      {
        name: 'timeline',
        label: 'Target Timeline',
        type: 'select',
        options: ['Immediate / Q1-Q2 Priority', 'Within 3–6 Months', 'Long-term Strategic Mandate'],
        half: true,
      },
      { name: 'message', label: 'Strategic Proposal & Desired Outcomes', type: 'textarea', required: true, placeholder: 'Summarize the mandate, proposed partner synergy, and key milestones…' },
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
    ],
    submit: 'Transmit Media Request',
    fine: 'Approved press assets and statements are released under official secretariat copyright protocol.',
    fields: [
      {
        name: 'type',
        label: 'Media Engagement Format',
        type: 'chips',
        required: true,
        options: [
          'Broadcast / TV Interview',
          'Keynote & Conclave Invitation',
          'Official Press Statement',
          'Editorial Feature / Profile',
          'Press Accreditation & Access',
          'Media Clearance & Assets',
        ],
      },
      { name: 'name', label: 'Journalist / Producer / Curator Name', type: 'text', required: true, placeholder: 'Your full name', half: true },
      { name: 'outlet', label: 'Media Outlet / Publication / Network', type: 'text', required: true, placeholder: 'e.g. CNBC, Bloomberg, Conclave Name', half: true },
      { name: 'email', label: 'Press / Official Email', type: 'email', required: true, placeholder: 'press@network.com', half: true },
      { name: 'phone', label: 'Direct Phone / WhatsApp', type: 'tel', required: true, placeholder: '+971 … or +91 …', half: true },
      {
        name: 'format',
        label: 'Interview Format',
        type: 'select',
        options: ['Live Broadcast / TV Studio', 'In-Person Summit / Conclave Keynote', 'Remote Video / Satellite Link', 'Written Q&A / Press Statement'],
        half: true,
      },
      { name: 'deadline', label: 'Broadcast / Editorial Deadline', type: 'date', half: true, help: 'If time-sensitive broadcast' },
      { name: 'message', label: 'Editorial Scope & Discussion Topics', type: 'textarea', required: true, placeholder: 'Topics to be covered, audience scale, broadcast date and location…' },
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
    if (f.required && !val) e[f.name] = f.type === 'chips' ? 'Please choose one' : 'Required';
    else if (f.type === 'email' && val && !EMAIL_RE.test(val)) e[f.name] = 'Enter a valid email';
    else if (f.type === 'tel' && val && val.replace(/\D/g, '').length < 7) e[f.name] = 'Enter a valid number';
  });
  if (!consent) e.consent = 'Please tick to continue';
  return e;
};

const inputBase =
  'w-full rounded-xl border bg-surface px-3.5 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15';

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
 * friendly, validated inline, and honest about what happens on submit.
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
    // Honeypot: real people never fill this hidden field.
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

  const summaryForWhatsApp = `Hello, I just filled the ${cfg.eyebrow} form on your website${
    result ? ` (ref ${result.ref})` : ''
  }${values.sector ? ` about ${values.sector}` : ''}.`;

  const Err: React.FC<{ name: string }> = ({ name }) =>
    errors[name] ? (
      <p role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
        {errors[name]}
      </p>
    ) : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-surface-deepest/75 backdrop-blur-md"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-gold-600/40 bg-surface-raised text-ink shadow-[0_30px_90px_-20px_rgba(0,0,0,0.55)] sm:rounded-3xl md:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/40 bg-surface/90 text-ink-heading backdrop-blur transition-all hover:scale-105 hover:border-gold-500 hover:bg-gold-500 hover:text-emerald-950"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ── Left: real photograph + promise ─────────────────── */}
            <aside className="relative hidden w-[38%] shrink-0 overflow-hidden md:block">
              <img
                src={cfg.photo.src}
                alt=""
                aria-hidden
                style={{ objectPosition: cfg.photo.focal }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/25" />
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/25 blur-3xl"
              />
              <div className="relative flex h-full flex-col justify-end p-7 text-ivory-500">
                <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/40 bg-emerald-950/60 px-3 py-1 font-label text-2xs font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur">
                  <Diamond /> {cfg.eyebrow}
                </span>
                <ul className="space-y-3">
                  {cfg.assurances.map((a) => (
                    <li key={a} className="flex items-start gap-2.5 text-sm leading-snug text-ivory-600">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-gold-500/25 pt-3 font-label text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ivory-700">
                  {cfg.photo.event} · {cfg.photo.location}
                </p>
              </div>
            </aside>

            {/* ── Right: form / success ───────────────────────────── */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-9">
              {result ? (
                <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-500/10 text-gold-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 id="enquiry-title" className="mt-5 font-heading text-2xl font-semibold text-ink-heading sm:text-3xl">
                    {result.mode === 'sent' ? 'Thank you — enquiry sent' : 'One last step'}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
                    {result.mode === 'sent'
                      ? 'Your enquiry has reached the office. Keep your reference handy if you follow up.'
                      : `Your email app should now open with everything filled in — press send to complete your enquiry. If nothing opened, write to ${deskEmail(kind)}.`}
                  </p>
                  <p className="mt-4 rounded-full border border-gold-600/35 bg-surface px-4 py-1.5 font-label text-xs font-bold uppercase tracking-[0.16em] text-gold-800 dark:text-gold-300">
                    Ref {result.ref}
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a
                      href={whatsappLink(summaryForWhatsApp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-b from-gold-400 to-gold-600 px-5 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp the office
                    </a>
                    {result.mode === 'email' && (
                      <a
                        href={result.href}
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-gold-600/40 px-5 font-label text-xs font-bold uppercase tracking-[0.12em] text-ink-heading transition-colors hover:border-gold-500"
                      >
                        <Mail className="h-4 w-4" /> Open email again
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex h-11 items-center rounded-full px-5 font-label text-xs font-bold uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink-heading"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <span className="font-label text-2xs font-bold uppercase tracking-[0.24em] text-gold-800 dark:text-gold-400">
                    {cfg.eyebrow}
                  </span>
                  <h2
                    id="enquiry-title"
                    className="mt-2 font-display text-[clamp(1.35rem,1.5vw+0.9rem,2rem)] font-semibold leading-[1.1] text-ink-heading"
                  >
                    {cfg.title}{' '}
                    <span className="gold-text-deep dark:gold-text font-cormorant text-[1.08em] italic">{cfg.accent}</span>
                  </h2>
                  <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">{cfg.blurb}</p>

                  <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                    {cfg.fields.map((f) => {
                      const full = !f.half;
                      const id = `enq-${f.name}`;
                      const invalid = Boolean(errors[f.name]);
                      return (
                        <div key={f.name} className={full ? 'sm:col-span-2' : ''}>
                          <label
                            htmlFor={f.type === 'chips' ? undefined : id}
                            id={`${id}-label`}
                            className="mb-2 block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft"
                          >
                            {f.label}
                            {f.required && <span className="ml-1 text-gold-600">*</span>}
                          </label>

                          {f.type === 'chips' && (
                            <div role="radiogroup" aria-labelledby={`${id}-label`} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
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
                                    className={`w-full flex items-center justify-center text-center rounded-xl sm:rounded-2xl border px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 cursor-pointer ${
                                      isLastOdd ? 'sm:col-span-2' : ''
                                    } ${
                                      on
                                        ? 'border-gold-500 bg-gradient-to-b from-gold-400 to-gold-600 font-bold text-emerald-950 shadow-md scale-[1.01]'
                                        : 'border-hairline bg-surface-sunken/60 font-medium text-ink-heading hover:border-gold-500/60 hover:bg-gold-500/10'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {f.type === 'select' && (
                            <select
                              id={id}
                              value={values[f.name] ?? ''}
                              onChange={(e) => set(f.name, e.target.value)}
                              className={`${inputBase} appearance-none border-hairline`}
                            >
                              <option value="">Select…</option>
                              {f.options!.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          )}

                          {f.type === 'textarea' && (
                            <textarea
                              id={id}
                              rows={4}
                              value={values[f.name] ?? ''}
                              onChange={(e) => set(f.name, e.target.value)}
                              placeholder={f.placeholder}
                              aria-invalid={invalid}
                              className={`${inputBase} resize-y ${invalid ? 'border-red-500' : 'border-hairline'}`}
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
                              className={`${inputBase} ${invalid ? 'border-red-500' : 'border-hairline'}`}
                            />
                          )}
                          {f.help && !invalid && <p className="mt-1.5 text-xs text-ink-faint">{f.help}</p>}
                          <Err name={f.name} />
                        </div>
                      );
                    })}

                    {/* honeypot */}
                    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label>
                        Website
                        <input tabIndex={-1} autoComplete="off" value={values.website ?? ''} onChange={(e) => set('website', e.target.value)} />
                      </label>
                    </div>
                  </div>

                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-snug text-ink-soft">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (touchedSubmit) setErrors(validate(cfg.fields, values, e.target.checked));
                      }}
                      aria-invalid={Boolean(errors.consent)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#C79A3D]"
                    />
                    <span>I agree to be contacted about this enquiry.</span>
                  </label>
                  <Err name="consent" />

                  {failed && (
                    <p role="alert" className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-ink-heading">
                      That didn’t go through. Please try again, or write to {deskEmail(kind)}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="group mt-6 flex h-13 w-full items-center justify-center gap-2.5 rounded-full border border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3.5 font-label text-xs font-bold uppercase tracking-[0.16em] text-emerald-950 shadow-[0_12px_30px_-10px_rgba(199,154,61,0.7)] transition-all hover:-translate-y-0.5 hover:from-gold-300 hover:to-gold-500 disabled:cursor-wait disabled:opacity-70"
                  >
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {busy ? 'Sending…' : cfg.submit}
                  </button>

                  <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-faint">
                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      {cfg.fine ? `${cfg.fine} ` : ''}
                      {enquiryEndpointConfigured
                        ? 'Your enquiry is sent securely to the office.'
                        : 'Pressing send opens your email app with these details filled in.'}
                    </span>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
