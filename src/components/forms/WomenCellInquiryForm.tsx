import React, { useState } from 'react';
import { sendForm } from '../../lib/enquiry';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HeartHandshake, Loader2, CheckCircle2, ChevronDown, ShieldCheck } from 'lucide-react';

const womenCellSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Valid email address required' }),
  phone: z.string().min(8, { message: 'Valid contact number required' }),
  cityState: z.string().min(2, { message: 'City and State required' }),
  areaOfInterest: z.enum([
    'Volunteer / Grassroots Educator',
    'Legal Aid / Pro-Bono Counsel',
    'Vocational & Skills Trainer',
    'Healthcare & Nutrition Volunteer',
    'Corporate CSR / Donor Partner',
    'Membership & General Support',
  ], {
    errorMap: () => ({ message: 'Please select an area of interest' }),
  }),
  message: z.string().min(10, { message: 'Please provide at least 10 characters' }),
});

type WomenCellFormData = z.infer<typeof womenCellSchema>;

export const WomenCellInquiryForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WomenCellFormData>({
    resolver: zodResolver(womenCellSchema),
    defaultValues: {
      areaOfInterest: 'Volunteer / Grassroots Educator',
    }
  });

  const onSubmit = async (data: WomenCellFormData) => {
    setIsLoading(true);
    await sendForm('collaborate', data as Record<string, unknown>, 'Women Cell registration (Leadership page)');
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
            Registration Received
          </h3>
          <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed mb-4">
            Thank you for stepping forward to support the All India Jamiatul Quresh Women Cell. Our state coordination committee will connect with you regarding upcoming orientation sessions and local initiatives.
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
          <span>Women Cell Empowerment Initiative</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink-heading">
          Volunteer &amp; Member Registration
        </h3>
        <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed max-w-xl">
          Lend your expertise, time, or organizational resources to empower women across national and grassroots chapters.
        </p>
      </div>

      {/* ── Section 01: Volunteer Credentials ─────────────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            01 · Applicant Credentials
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Fatima Sheikh"
              {...register('fullName')}
              className={`${inputClass} ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="name@organization.com"
              {...register('email')}
              className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              placeholder="+91 98200 00000"
              {...register('phone')}
              className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
              City &amp; State *
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Maharashtra"
              {...register('cityState')}
              className={`${inputClass} ${errors.cityState ? 'border-red-500' : ''}`}
            />
            {errors.cityState && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.cityState.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 02: Initiative & Interest ──────────────────────────── */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-hairline pb-1">
          <span className="font-label text-[0.66rem] font-bold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-400">
            02 · Focus Area &amp; Proposal
          </span>
        </div>
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
            Area of Interest / Contribution *
          </label>
          <div className="relative">
            <select
              {...register('areaOfInterest')}
              className={`${inputClass} appearance-none pr-9`}
            >
              <option value="Volunteer / Grassroots Educator">Volunteer / Grassroots Educator</option>
              <option value="Legal Aid / Pro-Bono Counsel">Legal Aid / Pro-Bono Counsel</option>
              <option value="Vocational & Skills Trainer">Vocational &amp; Skills Trainer</option>
              <option value="Healthcare & Nutrition Volunteer">Healthcare &amp; Nutrition Volunteer</option>
              <option value="Corporate CSR / Donor Partner">Corporate CSR / Donor Partner</option>
              <option value="Membership & General Support">Membership &amp; General Support</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
          </div>
        </div>

        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-[0.14em] font-bold text-ink-heading/85 mb-1.5">
            Background &amp; Proposal Summary *
          </label>
          <textarea
            rows={3}
            placeholder="Briefly state your background, professional skills, or how you wish to collaborate with the Women Cell..."
            {...register('message')}
            className={`${inputClass} resize-y min-h-[90px] leading-relaxed ${errors.message ? 'border-red-500' : ''}`}
          />
          {errors.message && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">{errors.message.message}</p>
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
              <HeartHandshake className="w-4 h-4 text-emerald-950" />
              <span>Submit Registration</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[0.7rem] text-ink-faint">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400" />
          <span>Women Cell Secretariat review · Coordination committee connects directly</span>
        </div>
      </div>
    </form>
  );
};

