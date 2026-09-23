import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendForm } from '../../lib/enquiry';
import { CheckCircle2, Send, Loader2, ChevronDown, ShieldCheck } from 'lucide-react';

const mediaInquirySchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters' }),
  organization: z.string().min(2, { message: 'Media outlet or organization name required' }),
  email: z.string().email({ message: 'Valid press/corporate email required' }),
  phone: z.string().min(8, { message: 'Phone number required' }),
  inquiryType: z.enum([
    'Broadcast Interview Request',
    'Keynote / Conclave Speaking',
    'Editorial Feature / Profile Story',
    'Film Co-Production & Distribution',
    'Press Accreditation / Access',
    'Official Statement / Comment',
  ], {
    errorMap: () => ({ message: 'Please select an inquiry type' }),
  }),
  deadline: z.string().optional(),
  message: z.string().min(15, { message: 'Please provide at least 15 characters describing the scope' }),
});

type MediaInquiryFormData = z.infer<typeof mediaInquirySchema>;

export const MediaInquiryForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MediaInquiryFormData>({
    resolver: zodResolver(mediaInquirySchema),
    defaultValues: {
      inquiryType: 'Broadcast Interview Request',
    },
  });

  const onSubmit = async (data: MediaInquiryFormData) => {
    setIsLoading(true);
    await sendForm('media', data as Record<string, unknown>, 'Media inquiry (Media page)');
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
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink-heading mb-1.5">
            Media Request Transmitted
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed mb-4">
            Your editorial brief has been delivered to the Press &amp; Communications Secretariat. Our media desk prioritizes broadcast deadlines and will respond promptly.
          </p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2.5 bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-label font-bold text-xs uppercase tracking-wider rounded-xl shadow-md border border-gold-500/40 transition-all cursor-pointer"
        >
          Submit Another Request
        </button>
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
          <span>Press &amp; Broadcast Bureau</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink-heading">
          Official Media &amp; Interview Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed max-w-xl">
          For accredited journalists, television networks, global festival curators, and summit organizers.
        </p>
      </div>

      {/* ── Section 01: Media Credentials ─────────────────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            01 · Media Credentials
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Journalist / Curator Name *
            </label>
            <input
              {...register('fullName')}
              type="text"
              placeholder="e.g. Sarah Jenkins"
              className={`${inputClass} ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.fullName.message}</p>
            )}
          </div>

          {/* Media Outlet */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Media Outlet / Publication *
            </label>
            <input
              {...register('organization')}
              type="text"
              placeholder="e.g. CNBC, Bloomberg, Gulf News"
              className={`${inputClass} ${errors.organization ? 'border-red-500' : ''}`}
            />
            {errors.organization && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.organization.message}</p>
            )}
          </div>

          {/* Press Email */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Press / Official Email *
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="producer@network.com"
              className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Direct Contact Number *
            </label>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+971 50 123 4567 or +91 98200 00000"
              className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 02: Inquiry Format & Timeline ──────────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            02 · Engagement Format &amp; Deadline
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Inquiry Type */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Inquiry Classification *
            </label>
            <div className="relative">
              <select
                {...register('inquiryType')}
                className={`${inputClass} appearance-none pr-9`}
              >
                <option value="Broadcast Interview Request">Broadcast Interview Request</option>
                <option value="Keynote / Conclave Speaking">Keynote / Conclave Speaking</option>
                <option value="Editorial Feature / Profile Story">Editorial Feature / Profile Story</option>
                <option value="Film Co-Production & Distribution">Film Co-Production &amp; Distribution</option>
                <option value="Press Accreditation / Access">Press Accreditation / Access</option>
                <option value="Official Statement / Comment">Official Statement / Comment</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
            </div>
          </div>

          {/* Target Deadline */}
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Broadcast Date / Editorial Deadline
            </label>
            <input
              {...register('deadline')}
              type="text"
              placeholder="e.g. Urgent / By Friday 5 PM GST"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* ── Section 03: Editorial Scope ────────────────────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            03 · Editorial Scope
          </span>
        </div>
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
            Scope &amp; Interview Topics *
          </label>
          <textarea
            {...register('message')}
            rows={4}
            placeholder="Please summarize the talking points, interview format, distribution reach, expected broadcast dates, or specific questions..."
            className={`${inputClass} resize-y min-h-[100px] leading-relaxed ${errors.message ? 'border-red-500' : ''}`}
          />
          {errors.message && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.message.message}</p>
          )}
        </div>
      </div>

      {/* ── Action & Reassurance ───────────────────────────────────────── */}
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
              <span>Dispatch Media Brief</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[0.7rem] text-ink-faint">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400" />
          <span>Priority editorial routing · Broadcast deadlines accommodated</span>
        </div>
      </div>
    </form>
  );
};

