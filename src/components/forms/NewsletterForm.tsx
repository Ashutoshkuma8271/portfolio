import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, ArrowRight, Loader2, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
    // Simulate API dispatch (e.g. Mailchimp / ConvertKit / Brevo webhook)
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Newsletter subscription recorded:', data.email);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className={`p-4 rounded-xl bg-emerald-900/60 border border-gold-500/40 text-ivory-500 flex items-center gap-3 ${className}`}>
        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
        <p className="text-base sm:text-lg">
          Thank you for subscribing to Zeenat Kureshi's private dispatch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`relative space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gold-600 dark:text-gold-400">
          <Mail className="w-4 h-4" />
        </div>
        <input
          type="email"
          placeholder="Enter your email address..."
          {...register('email')}
          disabled={isLoading}
          className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all duration-200 border shadow-2xs ${
            isDark
              ? 'bg-emerald-950/80 border-gold-500/40 text-ivory-100 placeholder:text-stone-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 focus:bg-emerald-950'
              : 'bg-surface-raised border-gold-600/30 text-ink-heading placeholder:text-ink-soft/70 focus:border-gold-600 focus:ring-2 focus:ring-gold-500/20'
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-gold-glow active:scale-[0.98] disabled:opacity-60"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span>Subscribe</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
