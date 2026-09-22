import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendForm } from '../../lib/enquiry';
import { CheckCircle2, Send, Loader2, Building } from 'lucide-react';

const tradeInquirySchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.string().email({ message: 'Valid corporate email required' }),
  phone: z.string().min(8, { message: 'Valid phone number required' }),
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
    // Simulate trade desk routing
    const sentRef = await sendForm('investment', data as Record<string, unknown>, 'Trade & investment inquiry (Trade page)');
    setRefId(sentRef);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border-2 border-gold-500/50 p-8 sm:p-10 rounded-3xl text-center text-charcoal-900 shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_25px_rgba(199,154,61,0.2)] animate-fade-in space-y-4">
        <div className="w-16 h-16 bg-gold-50 text-gold-600 rounded-full flex items-center justify-center mx-auto border-2 border-gold-500 shadow-[0_0_20px_rgba(199,154,61,0.25)]">
          <CheckCircle2 className="w-8 h-8 text-emerald-700" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-gold-500/40 text-[#8A6920] font-label text-2xs font-bold uppercase tracking-wider mb-2">
            <span>Filing Reference: {refId}</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-emerald-950 mb-1.5">
            Trade &amp; Investment Dossier Dispatched
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
            Your strategic trade brief has been securely logged with the Office of the GCC–India Trade Commissioner. Our senior bilateral commercial desk will contact you within 24–48 business hours.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello Secretariat, I have submitted Trade Inquiry Brief [${refId}].`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 hover:bg-emerald-900 text-ink-heading font-label font-bold text-xs uppercase tracking-wider rounded-xl shadow-md border border-gold-500/40 transition-all"
          >
            Direct WhatsApp Desk
          </a>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-5 py-2.5 border border-gold-500/50 bg-white text-emerald-950 hover:bg-gold-50 rounded-xl font-label text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface-raised/95 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-hairline shadow-luxury-lg text-ink"
    >
      <div className="mb-8 border-b border-hairline pb-4">
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink-heading">
          Initiate Bilateral Trade & Investment Inquiry
        </h3>
        <p className="text-base sm:text-lg text-ink-soft mt-1">
          Confidential briefing submission for sovereign, institutional, and enterprise stakeholders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Full Name */}
        <div>
          <label className="block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft mb-2">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Tariq Al-Mansoor / Rajesh Sharma"
              {...register('fullName')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* Corporate Email */}
        <div>
          <label className="block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft mb-2">
            Corporate Email *
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="e.g. name@enterprise.com"
              {...register('email')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft mb-2">
            Direct Phone / WhatsApp *
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="e.g. +971 50 000 0000"
              {...register('phone')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft mb-2">
            Company / Organization *
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-gold-600 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="e.g. Gulf Sovereign Capital LLC"
              {...register('company')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
          {errors.company && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.company.message}</p>
          )}
        </div>

        {/* Region */}
        <div>
          <label className="block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft mb-2">
            Primary Target Region *
          </label>
          <div className="relative">
            <select
              {...register('region')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 appearance-none"
            >
              <option value="UAE">United Arab Emirates (UAE)</option>
              <option value="Saudi Arabia">Kingdom of Saudi Arabia (KSA)</option>
              <option value="Qatar">Qatar</option>
              <option value="Oman">Sultanate of Oman</option>
              <option value="India">India (Inbound Investment / Expansion)</option>
              <option value="Other GCC / International">Other GCC / International</option>
            </select>
          </div>
          {errors.region && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.region.message}</p>
          )}
        </div>

        {/* Ticket Size */}
        <div>
          <label className="block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft mb-2">
            Estimated Deal / Ticket Size *
          </label>
          <div className="relative">
            <select
              {...register('ticketSize')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 appearance-none"
            >
              <option value="Under ₹40 Cr ($5M)">Under ₹40 Crores (Under $5M USD)</option>
              <option value="₹40 Cr – ₹200 Cr ($5M–$25M)">₹40 Crores – ₹200 Crores ($5M–$25M USD)</option>
              <option value="₹200 Cr – ₹800 Cr ($25M–$100M)">₹200 Crores – ₹800 Crores ($25M–$100M USD)</option>
              <option value="₹800 Cr+ ($100M+)">₹800 Crores+ ($100M+ USD Sovereign / Giga)</option>
              <option value="Policy / Sovereign Institutional Advisory">Government / Sovereign Policy Advisory</option>
            </select>
          </div>
          {errors.ticketSize && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.ticketSize.message}</p>
          )}
        </div>
      </div>

      {/* Strategic Objective */}
      <div className="mb-6">
        <label className="block font-label text-2xs font-bold uppercase tracking-[0.16em] text-ink-soft mb-2">
          Strategic Objective & Brief Overview *
        </label>
        <textarea
          rows={4}
          placeholder="Please outline the nature of the engagement, sector (e.g. Energy, Infra, Agro, Tech), current status, and desired diplomatic/trade intervention..."
          {...register('objective')}
          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
        />
        {errors.objective && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.objective.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_6px_14px_-6px_rgba(199,154,61,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-8px_rgba(199,154,61,0.6)] disabled:cursor-wait disabled:opacity-60 w-full"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
};
