import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendForm } from '../../lib/enquiry';
import { CheckCircle2, Send, Loader2, Newspaper, Mail, Phone, User, Calendar, MessageSquare, Video } from 'lucide-react';

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
    console.log('Media inquiry submitted:', data);
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
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-emerald-950 mb-1.5">
            Media Request Transmitted
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed mb-4">
            Your editorial brief has been delivered to the Press &amp; Communications Secretariat. Our media desk prioritizes broadcast deadlines and will respond promptly.
          </p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 hover:bg-emerald-900 text-ink-heading font-label font-bold text-xs uppercase tracking-wider rounded-xl shadow-md border border-gold-500/40 transition-all cursor-pointer"
        >
          Submit Another Request
        </button>
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
          Official Media & Interview Inquiry Form
        </h3>
        <p className="text-sm text-ink-soft mt-1">
          For accredited journalists, television networks, festival programmers, and summit organizers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block font-label text-2xs uppercase tracking-wider font-bold text-ink-heading mb-2">
            Journalist / Curator Name <span className="text-gold-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-faint">
              <User className="w-4 h-4" />
            </div>
            <input
              {...register('fullName')}
              type="text"
              placeholder="e.g. Sarah Jenkins"
              className={`w-full pl-4 pr-4 py-3 bg-surface-sunken/50 border rounded-xl font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all ${
                errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-hairline focus:border-gold-500'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* Media Outlet */}
        <div>
          <label className="block font-label text-2xs uppercase tracking-wider font-bold text-ink-heading mb-2">
            Media Outlet / Publication <span className="text-gold-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-faint">
              <Newspaper className="w-4 h-4" />
            </div>
            <input
              {...register('organization')}
              type="text"
              placeholder="e.g. Bloomberg / ANI / Gulf News"
              className={`w-full pl-4 pr-4 py-3 bg-surface-sunken/50 border rounded-xl font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all ${
                errors.organization ? 'border-red-500 bg-red-50/20' : 'border-hairline focus:border-gold-500'
              }`}
            />
          </div>
          {errors.organization && (
            <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.organization.message}</p>
          )}
        </div>

        {/* Press Email */}
        <div>
          <label className="block font-label text-2xs uppercase tracking-wider font-bold text-ink-heading mb-2">
            Press / Corporate Email <span className="text-gold-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-faint">
              <Mail className="w-4 h-4" />
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="editor@mediahouse.com"
              className={`w-full pl-4 pr-4 py-3 bg-surface-sunken/50 border rounded-xl font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all ${
                errors.email ? 'border-red-500 bg-red-50/20' : 'border-hairline focus:border-gold-500'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-label text-2xs uppercase tracking-wider font-bold text-ink-heading mb-2">
            Contact Number <span className="text-gold-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-faint">
              <Phone className="w-4 h-4" />
            </div>
            <input
              {...register('phone')}
              type="tel"
              placeholder="+971 50 000 0000 / +91 ..."
              className={`w-full pl-4 pr-4 py-3 bg-surface-sunken/50 border rounded-xl font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all ${
                errors.phone ? 'border-red-500 bg-red-50/20' : 'border-hairline focus:border-gold-500'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* Inquiry Type */}
        <div>
          <label className="block font-label text-2xs uppercase tracking-wider font-bold text-ink-heading mb-2">
            Inquiry Classification <span className="text-gold-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-faint">
              <Video className="w-4 h-4" />
            </div>
            <select
              {...register('inquiryType')}
              className="w-full pl-4 pr-4 py-3 bg-surface-sunken/50 border border-hairline rounded-xl font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all appearance-none cursor-pointer"
            >
              <option value="Broadcast Interview Request">Broadcast Interview Request</option>
              <option value="Keynote / Conclave Speaking">Keynote / Conclave Speaking</option>
              <option value="Editorial Feature / Profile Story">Editorial Feature / Profile Story</option>
              <option value="Film Co-Production & Distribution">Film Co-Production & Distribution</option>
              <option value="Press Accreditation / Access">Press Accreditation / Access</option>
              <option value="Official Statement / Comment">Official Statement / Comment</option>
            </select>
          </div>
        </div>

        {/* Target Deadline */}
        <div>
          <label className="block font-label text-2xs uppercase tracking-wider font-bold text-ink-heading mb-2">
            Target Broadcast / Deadline Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-faint">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              {...register('deadline')}
              type="text"
              placeholder="e.g. Urgent / By End of Month"
              className="w-full pl-4 pr-4 py-3 bg-surface-sunken/50 border border-hairline rounded-xl font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
            />
          </div>
        </div>

        {/* Scope / Message */}
        <div className="md:col-span-2">
          <label className="block font-label text-2xs uppercase tracking-wider font-bold text-ink-heading mb-2">
            Inquiry Details & Interview Scope <span className="text-gold-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3.5 left-3.5 pointer-events-none text-ink-faint">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              {...register('message')}
              rows={4}
              placeholder="Please summarize the talking points, interview format, distribution reach, or event parameters..."
              className={`w-full pl-4 pr-4 py-3 bg-surface-sunken/50 border rounded-xl font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all resize-y ${
                errors.message ? 'border-red-500 bg-red-50/20' : 'border-hairline focus:border-gold-500'
              }`}
            />
          </div>
          {errors.message && (
            <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.message.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_6px_14px_-6px_rgba(199,154,61,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-8px_rgba(199,154,61,0.6)] disabled:cursor-wait disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-gold-700 dark:text-gold-400" />
              <span>Transmitting Brief...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-gold-700 dark:text-gold-400" />
              <span>Dispatch Media Brief</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
