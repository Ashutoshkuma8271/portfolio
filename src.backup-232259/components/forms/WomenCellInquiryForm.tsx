import React, { useState } from 'react';
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
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log('Women Cell volunteer registration:', data);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-900/90 border border-gold-500/50 p-8 rounded-2xl text-center text-ivory-500 shadow-luxury-lg animate-fade-in">
        <div className="w-14 h-14 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/40">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-ivory-500 mb-2">
          Registration Received
        </h3>
        <p className="text-base sm:text-lg text-ivory-700 max-w-md mx-auto leading-relaxed mb-6">
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
      className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-800 shadow-luxury text-charcoal-900"
    >
      <div className="mb-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950">
          Join the Movement: Volunteer & Member Registration
        </h3>
        <p className="text-xs text-charcoal-600 mt-1">
          Lend your expertise, time, or organizational resources to empower women across 14 states.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Your Name"
            {...register('fullName')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-800 text-base sm:text-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
          />
          {errors.fullName && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="name@email.com"
            {...register('email')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-800 text-base sm:text-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
          />
          {errors.email && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            placeholder="+91..."
            {...register('phone')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-800 text-base sm:text-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
          />
          {errors.phone && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
            City & State *
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai, Maharashtra"
            {...register('cityState')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-800 text-base sm:text-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
          />
          {errors.cityState && (
            <p className="text-red-500 text-2xs mt-1 font-medium">{errors.cityState.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
          Area of Interest / Contribution *
        </label>
        <select
          {...register('areaOfInterest')}
          className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-800 text-base sm:text-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50 appearance-none"
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
        <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-1.5">
          Tell Us About Yourself / Your Proposal *
        </label>
        <textarea
          rows={3}
          placeholder="Briefly state your background, professional skills, or how you wish to collaborate with the Women Cell..."
          {...register('message')}
          className="w-full p-3 rounded-xl border border-ivory-800 text-base sm:text-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
        />
        {errors.message && (
          <p className="text-red-500 text-2xs mt-1 font-medium">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 rounded-full bg-emerald-800 hover:bg-gold-600 hover:text-emerald-950 text-ivory-500 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
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
