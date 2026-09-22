import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, Send, Loader2, Mail, Phone, User, MessageSquare } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Valid email address required' }),
  phone: z.string().min(8, { message: 'Phone number required' }),
  subject: z.enum([
    'Trade & Sovereign Advisory',
    'Media / Press / Interview Request',
    'Cinema Production & Distribution',
    'Speaking & Keynote Invitation',
    'Women Cell / Socio-Civic Initiative',
    'General Inquiry',
  ], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message: z.string().min(15, { message: 'Message must be at least 15 characters' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getInitialSubject = (): ContactFormData['subject'] => {
    const raw = searchParams.get('subject')?.toLowerCase();
    if (raw?.includes('media') || raw?.includes('press')) return 'Media / Press / Interview Request';
    if (raw?.includes('cinema') || raw?.includes('film') || raw?.includes('production')) return 'Cinema Production & Distribution';
    if (raw?.includes('speak') || raw?.includes('keynote')) return 'Speaking & Keynote Invitation';
    if (raw?.includes('women')) return 'Women Cell / Socio-Civic Initiative';
    if (raw?.includes('general') || raw?.includes('collab')) return 'General Inquiry';
    return 'Trade & Sovereign Advisory';
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: getInitialSubject(),
    },
  });

  useEffect(() => {
    const initialSub = getInitialSubject();
    setValue('subject', initialSub);
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', data);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-900/90 border border-gold-500/50 p-8 sm:p-10 rounded-2xl text-center text-ivory-500 shadow-luxury-lg animate-fade-in">
        <div className="w-16 h-16 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-gold-500/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-500 mb-3">
          Message Transmitted
        </h3>
        <p className="text-sm text-ivory-700 max-w-md mx-auto leading-relaxed mb-6">
          Thank you for reaching out to the Executive Office of Zeenat Kureshi. Your communication has been routed to the relevant secretariat team.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-emerald-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 sm:p-10 rounded-2xl border border-ivory-800 shadow-luxury text-charcoal-900"
    >
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold text-emerald-950">
          Send a Formal Message
        </h3>
        <p className="text-base sm:text-lg text-charcoal-600 mt-1">
          For official inquiries, speaking engagements, and diplomatic communication.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-2">
            Your Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gold-600 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Full Name"
              {...register('name')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-800 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gold-600 absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="name@organization.com"
              {...register('email')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-800 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-2">
            Phone / Contact Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gold-600 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              placeholder="+91 / +971..."
              {...register('phone')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-800 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-2">
            Nature of Communication *
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-gold-600 absolute left-3.5 top-3.5" />
            <select
              {...register('subject')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-800 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50 appearance-none"
            >
              <option value="Trade & Sovereign Advisory">Trade & Sovereign Advisory</option>
              <option value="Media / Press / Interview Request">Media / Press / Interview Request</option>
              <option value="Cinema Production & Distribution">Cinema Production & Distribution</option>
              <option value="Speaking & Keynote Invitation">Speaking & Keynote Invitation</option>
              <option value="Women Cell / Socio-Civic Initiative">Women Cell / Socio-Civic Initiative</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal-700 mb-2">
          Your Message *
        </label>
        <textarea
          rows={5}
          placeholder="Please describe your inquiry, event details, or proposal..."
          {...register('message')}
          className="w-full p-4 rounded-xl border border-ivory-800 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-ivory-500/50"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 rounded-full bg-emerald-800 hover:bg-gold-600 hover:text-emerald-950 text-ivory-500 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};
