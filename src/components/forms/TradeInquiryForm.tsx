import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendForm } from '../../lib/enquiry';
import { CheckCircle2, Send, Loader2, ChevronDown, ShieldCheck } from 'lucide-react';

const tradeInquirySchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Valid corporate email required' }),
  phone: z.string().min(8, { message: 'Valid contact number required' }),
  company: z.string().min(2, { message: 'Company / Organization name required' }),
  region: z.enum(['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'India', 'Other GCC / International'], {
    errorMap: () => ({ message: 'Please select a primary region' }),
  }),
  ticketSize: z.enum(['Under ₹40 Cr ($5M)', '₹40 Cr – ₹200 Cr ($5M–$25M)', '₹200 Cr – ₹800 Cr ($25M–$100M)', '₹800 Cr+ ($100M+)', 'Policy / Sovereign Institutional Advisory'], {
    errorMap: () => ({ message: 'Please select an estimated investment / deal size' }),
  }),
  objective: z.string().min(15, { message: 'Please provide at least 15 characters describing your objective' }),
});

type TradeInquiryFormData = z.infer<typeof tradeInquirySchema>;

export const TradeInquiryForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refId, setRefId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TradeInquiryFormData>({
    resolver: zodResolver(tradeInquirySchema),
    defaultValues: {
      region: 'UAE',
      ticketSize: '₹40 Cr – ₹200 Cr ($5M–$25M)',
    }
  });

  const onSubmit = async (data: TradeInquiryFormData) => {
    setIsLoading(true);
    const sentRef = await sendForm('investment', data as Record<string, unknown>, 'Trade & investment inquiry (Trade page)');
    setRefId(sentRef);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface-raised border border-gold-500/50 p-6 sm:p-10 rounded-3xl text-center text-ink shadow-luxury-lg animate-fade-in space-y-5">
        <div className="w-16 h-16 bg-gold-500/15 text-gold-700 dark:text-gold-400 rounded-full flex items-center justify-center mx-auto border-2 border-gold-500/40 shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-sunken border border-gold-500/40 text-gold-800 dark:text-gold-300 font-label text-2xs font-bold uppercase tracking-wider mb-2">
            <span>Filing Reference: {refId}</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink-heading mb-1.5">
            Trade &amp; Investment Dossier Dispatched
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
            Your strategic trade brief has been securely logged with the Office of the GCC–India Trade Commissioner. Our senior bilateral commercial desk will contact you within 24–48 business hours.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello Secretariat, I have submitted Trade Inquiry Brief [${refId}].`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 text-emerald-950 font-label font-bold text-xs uppercase tracking-wider rounded-xl shadow-md border border-gold-500/40 transition-all hover:from-gold-400 hover:to-gold-500"
          >
            Direct WhatsApp Desk
          </a>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-2.5 border border-gold-500/50 bg-surface-raised text-ink-heading hover:bg-surface-sunken rounded-xl font-label text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-hairline bg-surface-sunken/40 px-3.5 py-3 text-[0.92rem] text-ink-heading placeholder:text-ink-faint/70 outline-none transition-all duration-200 hover:border-gold-500/40 focus:border-gold-500 focus:bg-surface focus:ring-4 focus:ring-gold-500/15';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface-raised p-6 sm:p-9 lg:p-10 rounded-3xl border border-gold-600/30 shadow-luxury-lg text-ink space-y-6"
    >
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-600/30 bg-surface-sunken px-3 py-1 text-2xs font-label font-bold uppercase tracking-[0.16em] text-gold-800 dark:text-gold-300 mb-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
          <span>Institutional Trade &amp; Investment Desk</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink-heading">
          Initiate Bilateral Trade &amp; Investment Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed max-w-xl">
          Confidential briefing submission for sovereign wealth funds, institutional investors, and enterprise stakeholders.
        </p>
      </div>

      {/* ── Section 01: Stakeholder Credentials ───────────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            01 · Stakeholder Credentials
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Tariq Al-Mansoor / Dr. Rajesh Verma"
              {...register('fullName')}
              className={`${inputClass} ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.fullName.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Enterprise / Sovereign Entity *
            </label>
            <input
              type="text"
              placeholder="e.g. Gulf Sovereign Capital LLC"
              {...register('company')}
              className={`${inputClass} ${errors.company ? 'border-red-500' : ''}`}
            />
            {errors.company && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.company.message}</p>
            )}
          </div>

          {/* Corporate Email */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Corporate / Institutional Email *
            </label>
            <input
              type="email"
              placeholder="investor@organization.com"
              {...register('email')}
              className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Direct Phone / WhatsApp *
            </label>
            <input
              type="tel"
              placeholder="+971 50 123 4567 or +91 98200 00000"
              {...register('phone')}
              className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 02: Mandate & Capital Allocation ──────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            02 · Mandate &amp; Capital Allocation
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Region */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Primary Target Corridor *
            </label>
            <div className="relative">
              <select
                {...register('region')}
                className={`${inputClass} appearance-none pr-9`}
              >
                <option value="UAE">United Arab Emirates (UAE)</option>
                <option value="Saudi Arabia">Kingdom of Saudi Arabia (KSA)</option>
                <option value="Qatar">Qatar</option>
                <option value="Oman">Sultanate of Oman</option>
                <option value="India">India (Inbound Investment / Expansion)</option>
                <option value="Other GCC / International">Other GCC / International</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
            </div>
            {errors.region && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.region.message}</p>
            )}
          </div>

          {/* Ticket Size */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Estimated Deal / Ticket Size *
            </label>
            <div className="relative">
              <select
                {...register('ticketSize')}
                className={`${inputClass} appearance-none pr-9`}
              >
                <option value="Under ₹40 Cr ($5M)">Under ₹40 Crores (Under $5M USD)</option>
                <option value="₹40 Cr – ₹200 Cr ($5M–$25M)">₹40 Crores – ₹200 Crores ($5M–$25M USD)</option>
                <option value="₹200 Cr – ₹800 Cr ($25M–$100M)">₹200 Crores – ₹800 Crores ($25M–$100M USD)</option>
                <option value="₹800 Cr+ ($100M+)">₹800 Crores+ ($100M+ USD Sovereign / Giga)</option>
                <option value="Policy / Sovereign Institutional Advisory">Government / Sovereign Policy Advisory</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
            </div>
            {errors.ticketSize && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.ticketSize.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 03: Strategic Objective ────────────────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            03 · Strategic Objective
          </span>
        </div>
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
            Brief Overview &amp; Intervention Scope *
          </label>
          <textarea
            rows={4}
            placeholder="Outline the nature of engagement, sector focus (Energy, Infra, Commodities, Tech), current stage, and required diplomatic/trade facilitation..."
            {...register('objective')}
            className={`${inputClass} resize-y min-h-[100px] leading-relaxed ${errors.objective ? 'border-red-500' : ''}`}
          />
          {errors.objective && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.objective.message}</p>
          )}
        </div>
      </div>

      {/* ── Action & Assurance ─────────────────────────────────────────── */}
      <div className="pt-2 border-t border-hairline space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className="group inline-flex min-h-[48px] h-12 w-full items-center justify-center gap-2.5 rounded-full border border-gold-300/60 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.16em] text-emerald-950 shadow-[0_10px_25px_-8px_rgba(199,154,61,0.65)] transition-all duration-300 hover:from-gold-300 hover:to-gold-500 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
          ) : (
            <>
              <Send className="w-4 h-4 text-emerald-950" />
              <span>Submit Bilateral Inquiry</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[0.7rem] text-ink-faint">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400" />
          <span>Direct institutional channel · Sovereign Non-Disclosure protocols apply</span>
        </div>
      </div>
    </form>
  );
};

