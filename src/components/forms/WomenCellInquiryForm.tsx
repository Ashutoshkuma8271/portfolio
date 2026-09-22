import React, { useState } from 'react';
import { sendForm } from '../../lib/enquiry';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { HeartHandshake, Loader2, CheckCircle2 } from 'lucide-react';

const womenCellSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Valid email address required' }),
  phone: z.string().min(8, { message: 'Valid phone number required' }),
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
  message: z.string().min(10, { message: 'Please tell us briefly about yourself or how you would like to contribute' }),
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
    console.log('Women Cell volunteer registration:', data);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface-raised border border-gold-500/50 p-8 rounded-2xl text-center text-ink-heading shadow-luxury-lg animate-fade-in">
        <div className="w-14 h-14 bg-gold-500/20 text-gold-700 dark:text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/40">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-ink-heading mb-2">
          Registration Received
        </h3>
        <p className="text-base sm:text-lg text-ink-soft max-w-md mx-auto leading-relaxed mb-6">
          Thank you for stepping forward to support the All India Jamiatul Quresh Women Cell. Our state coordination committee will connect with you regarding upcoming orientation sessions and local initiatives.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-emerald-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface-raised p-6 sm:p-8 rounded-2xl border border-hairline shadow-luxury text-ink"
    >
      <div className="mb-6">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-ink-heading">
          Join the Movement: Volunteer & Member Registration
        </h3>
        <p className="text-xs text-ink-soft mt-1">
          Lend your expertise, time, or organizational resources to empower women across 14 states.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-ink-soft mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Your Name"
            {...register('fullName')}
            className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
          />
          {errors.fullName && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-ink-soft mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="name@email.com"
            {...register('email')}
            className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
          />
          {errors.email && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-ink-soft mb-1.5">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            placeholder="+91..."
            {...register('phone')}
            className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
          />
          {errors.phone && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-ink-soft mb-1.5">
            City & State *
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai, Maharashtra"
            {...register('cityState')}
            className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
          />
          {errors.cityState && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.cityState.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs uppercase tracking-wider font-semibold text-ink-soft mb-1.5">
          Area of Interest / Contribution *
        </label>
        <select
          {...register('areaOfInterest')}
          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 appearance-none"
        >
          <option value="Volunteer / Grassroots Educator">Volunteer / Grassroots Educator</option>
          <option value="Legal Aid / Pro-Bono Counsel">Legal Aid / Pro-Bono Counsel</option>
          <option value="Vocational & Skills Trainer">Vocational & Skills Trainer</option>
          <option value="Healthcare & Nutrition Volunteer">Healthcare & Nutrition Volunteer</option>
          <option value="Corporate CSR / Donor Partner">Corporate CSR / Donor Partner</option>
          <option value="Membership & General Support">Membership & General Support</option>
        </select>
        {errors.areaOfInterest && (
          <p className="text-red-500 text-2xs mt-1 font-medium">{errors.areaOfInterest.message}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-xs uppercase tracking-wider font-semibold text-ink-soft mb-1.5">
          Tell Us About Yourself / Your Proposal *
        </label>
        <textarea
          rows={3}
          placeholder="Briefly state your background, professional skills, or how you wish to collaborate with the Women Cell..."
          {...register('message')}
          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
        />
        {errors.message && (
          <p className="text-red-500 text-2xs mt-1 font-medium">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_6px_14px_-6px_rgba(199,154,61,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-8px_rgba(199,154,61,0.6)] disabled:cursor-wait disabled:opacity-60 w-full"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <HeartHandshake className="w-4 h-4" />
            <span>Submit Registration</span>
          </>
        )}
      </button>
    </form>
  );
};
