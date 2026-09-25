import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, ArrowRight, Loader2, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { sendForm, enquiryEndpointConfigured } from '../../lib/enquiry';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  className?: string;
  isDark?: boolean;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  className = '',
  isDark: isDarkProp,
}) => {
  const { theme } = useTheme();
  const isDark = isDarkProp ?? theme === 'dark';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsLoading(true);
    // Same delivery path as every other form: posts to the configured endpoint, or
    // opens the visitor's email app pre-filled when no endpoint is set.
    await sendForm('newsletter', { email: data.email }, 'Executive Dispatch sign-up (footer)');
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className={`p-4 rounded-xl bg-emerald-900/60 border border-gold-500/40 text-ivory-500 flex items-center gap-3 ${className}`}>
        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
        <p className="text-xs sm:text-sm">
          {enquiryEndpointConfigured
            ? "Thank you for subscribing to Zeenat Kureshi's private dispatch."
            : 'Your email app has opened with the request filled in — press send to complete your subscription.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`relative space-y-3 w-full ${className}`}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold-600/70 dark:text-gold-400">
          <Mail className="w-4 h-4" />
        </div>
        <input
          type="email"
          placeholder="Enter your email address..."
          {...register('email')}
          disabled={isLoading}
          className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-normal outline-none transition-all duration-200 border shadow-2xs ${
            isDark
              ? 'bg-emerald-950/90 border-gold-500/40 text-ivory-100 placeholder:text-stone-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20'
              : 'bg-white border-stone-200/90 text-ink-heading placeholder:text-ink-soft/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20'
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full min-h-[42px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A647] via-[#DFB85C] to-[#C99632] hover:brightness-105 text-[#241B0E] font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:shadow-sm active:scale-[0.98] disabled:opacity-60"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span>Subscribe</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {errors.email && (
        <p className="text-red-500 dark:text-red-400 text-xs font-semibold mt-1 pl-1">
          {errors.email.message}
        </p>
      )}
    </form>
  );
};
