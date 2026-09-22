import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
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
    <form onSubmit={handleSubmit(onSubmit)} className={`relative ${className}`}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="email"
            placeholder="Enter your executive email..."
            {...register('email')}
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-full text-base sm:text-lg outline-none transition-all ${
              isDark
                ? 'bg-emerald-900/70 border border-gold-500/30 text-ivory-500 placeholder:text-ivory-700/60 focus:border-gold-400 focus:bg-emerald-900'
                : 'bg-surface-raised border border-hairline text-ink-heading placeholder:text-ink-faint focus:border-gold-500'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="min-h-[48px] px-6 py-3 rounded-full bg-gold-600 hover:bg-gold-500 text-emerald-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm hover:shadow-gold-glow active:scale-[0.98] disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
      {errors.email && (
        <p className="text-red-400 text-xs mt-1.5 ml-3 font-medium">
          {errors.email.message}
        </p>
      )}
    </form>
  );
};
