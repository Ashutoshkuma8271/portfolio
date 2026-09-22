import React, { useState, useEffect } from 'react';
import { sendForm } from '../../lib/enquiry';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  CheckCircle2, 
  Loader2, 
  
  
  
  
  
  
  
  Download, 
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Valid corporate email address required' }),
  phone: z.string().min(8, { message: 'Contact number with country code required' }),
  organization: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredSlot: z.string().optional(),
  regionalDesk: z.string().optional(),
  subject: z.enum([
    'Trade & Sovereign Advisory',
    'Media / Press / Interview Request',
    'Cinema Production & Distribution',
    'Speaking & Keynote Invitation',
    'Women Cell / Socio-Civic Initiative',
    'Strategic Partnership & Collaboration',
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
  const [referenceId, setReferenceId] = useState('');
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const getInitialSubject = (): ContactFormData['subject'] => {
    const raw = searchParams.get('subject')?.toLowerCase();
    if (raw?.includes('media') || raw?.includes('press')) return 'Media / Press / Interview Request';
    if (raw?.includes('cinema') || raw?.includes('film') || raw?.includes('production')) return 'Cinema Production & Distribution';
    if (raw?.includes('speak') || raw?.includes('keynote')) return 'Speaking & Keynote Invitation';
    if (raw?.includes('women')) return 'Women Cell / Socio-Civic Initiative';
    if (raw?.includes('collab') || raw?.includes('partner')) return 'Strategic Partnership & Collaboration';
    if (raw?.includes('general')) return 'General Inquiry';
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
      preferredSlot: 'Morning (10:30 AM – 12:00 PM IST / GST)',
      regionalDesk: 'Mumbai Secretariat (BKC Desk)',
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    const initialSub = getInitialSubject();
    setValue('subject', initialSub);
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    const sentRef = await sendForm('collaborate', data as Record<string, unknown>, 'Contact form (Contact page)');
    const ref = sentRef;
    setReferenceId(ref);
    setSubmittedData(data);
    setIsLoading(false);
    setIsSubmitted(true);
    reset();
  };

  const handleDownloadReceipt = () => {
    if (!submittedData) return;
    const content = `================================================================================
OFFICE OF H.E. ZEENAT KURESHI
Executive Secretariat & Bilateral Trade Commission
================================================================================
EXECUTIVE CONSULTATION & COLLABORATION DISPATCH RECEIPT
Reference ID: ${referenceId}
Date of Dispatch: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

ENGAGEMENT DETAILS:
- Delegate / Applicant: ${submittedData.name}
- Email: ${submittedData.email}
- Contact Phone: ${submittedData.phone}
- Organization / Entity: ${submittedData.organization || 'Strategic Entity'}
- Engagement Scope: ${submittedData.subject}
- Designated Desk: ${submittedData.regionalDesk || 'Mumbai BKC Desk'}
- Preferred Meeting Window: ${submittedData.preferredDate || 'Upcoming Window'} (${submittedData.preferredSlot || 'Standard Desk Slot'})

MEMORANDUM SUMMARY:
${submittedData.message}

SECRETARIAT SLA & RESPONSE TIME:
- Senior commercial desk will review and confirm alignment within 24–48 business hours.
- Direct Desk Email: ${siteConfig.contact.email}
- Official WhatsApp Priority: +${siteConfig.contact.whatsappNumber}
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ZK-Consultation-Receipt-${referenceId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const whatsappUrl = submittedData
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        `Hello Secretariat of Zeenat Kureshi, I have submitted a collaboration dispatch [Ref: ${referenceId}] regarding ${submittedData.subject}. Preferred Slot: ${submittedData.preferredDate} (${submittedData.preferredSlot}).`
      )}`
    : `https://wa.me/${siteConfig.contact.whatsappNumber}`;

  if (isSubmitted && submittedData) {
    return (
      <div className="bg-surface-raised border-2 border-gold-500/50 p-7 sm:p-10 rounded-3xl text-center text-ink-heading shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),0_0_24px_rgba(199,154,61,0.2)] animate-fade-in space-y-5">
        <div className="w-16 h-16 bg-gold-500/20 text-gold-700 dark:text-gold-400 rounded-full flex items-center justify-center mx-auto border-2 border-gold-500 shadow-[0_0_20px_rgba(199,154,61,0.4)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-surface-raised px-3 py-0.5 text-2xs font-label font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Consultation Logged with Executive Office</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink-heading">
            Diplomatic Dispatch Transmitted
          </h3>
          <p className="text-xs sm:text-sm text-ink max-w-md mx-auto leading-relaxed mt-1">
            Thank you, <strong>{submittedData.name}</strong>. Your consultation request has been routed to the relevant secretariat team.
          </p>
        </div>

        {/* Filing Summary Card */}
        <div className="mx-auto max-w-lg rounded-2xl border border-gold-500/30 bg-surface-sunken p-4.5 text-left text-xs space-y-2.5 shadow-inner">
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-2">
            <span className="font-label text-2xs font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">
              Filing Reference ID:
            </span>
            <span className="font-label text-xs font-bold text-ink-heading bg-gold-500/20 px-2.5 py-0.5 rounded border border-gold-500/40">
              {referenceId}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-2xs sm:text-xs text-ink pt-1">
            <div>
              <span className="block text-[0.62rem] uppercase text-ink-soft font-label">Nature of Engagement</span>
              <span className="text-ink-heading font-semibold block truncate">{submittedData.subject}</span>
            </div>
            <div>
              <span className="block text-[0.62rem] uppercase text-ink-soft font-label">Designated Regional Desk</span>
              <span className="text-gold-800 dark:text-gold-300 font-semibold block truncate">{submittedData.regionalDesk}</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-gold-500/15">
              <span className="block text-[0.62rem] uppercase text-ink-soft font-label">Scheduled Time Slot</span>
              <span className="text-ink-heading font-semibold">{submittedData.preferredDate} &bull; {submittedData.preferredSlot}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 px-6 py-2.5 font-label text-xs font-bold uppercase tracking-wider text-emerald-950 shadow-gold-glow transition-all hover:bg-gold-400 hover:scale-[1.02] cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Dispatch Receipt</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-surface-sunken px-5 py-2.5 font-label text-xs font-bold uppercase tracking-wider text-gold-800 dark:text-gold-300 hover:text-ink-heading hover:border-gold-400 transition-all cursor-pointer"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>WhatsApp Priority Desk</span>
          </a>
        </div>

        <div className="pt-1">
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-2xs text-ink-soft hover:text-ink-heading underline underline-offset-4 cursor-pointer"
          >
            Submit Another Proposal
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 sm:p-10 rounded-3xl border border-gold-600/30 shadow-luxury-lg text-charcoal-900 relative"
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold-600/30 bg-[#FAF6F0] px-3 py-1 text-2xs font-label font-bold uppercase tracking-[0.16em] text-[#8A6920] mb-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
          <span>Executive Consultation &amp; Collaboration Desk</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-emerald-950">
          Initiate Official Engagement
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">
          For bilateral trade facilitation, speaking invitations, media interviews, film production, and strategic collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4">
        {/* Name */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Tariq Al-Mansoor / Dr. Rajesh Verma"
              {...register('name')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
          {errors.name && (
            <p className="text-red-600 text-2xs mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Organization */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Organization / Institutional Entity
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Sovereign Fund / Media Group / Embassy"
              {...register('organization')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Corporate Email *
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="name@organization.com"
              {...register('email')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-2xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Phone / WhatsApp with Country Code *
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="+971 50... / +91 98..."
              {...register('phone')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
          {errors.phone && (
            <p className="text-red-600 text-2xs mt-1 font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Nature of Communication *
          </label>
          <div className="relative">
            <select
              {...register('subject')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            >
              <option value="Trade & Sovereign Advisory">Trade &amp; Sovereign Advisory</option>
              <option value="Strategic Partnership & Collaboration">Strategic Partnership &amp; Collaboration</option>
              <option value="Media / Press / Interview Request">Media / Press / Interview Request</option>
              <option value="Cinema Production & Distribution">Cinema Production &amp; Distribution</option>
              <option value="Speaking & Keynote Invitation">Speaking &amp; Keynote Invitation</option>
              <option value="Women Cell / Socio-Civic Initiative">Women Cell / Socio-Civic Initiative</option>
              <option value="General Inquiry">General Executive Inquiry</option>
            </select>
          </div>
        </div>

        {/* Regional Desk */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Designated Regional Desk
          </label>
          <div className="relative">
            <select
              {...register('regionalDesk')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            >
              <option value="Mumbai Secretariat (BKC Desk)">Mumbai Secretariat (BKC Desk, India)</option>
              <option value="Dubai Executive Desk (DIFC / GCC)">Dubai Executive Desk (DIFC, UAE)</option>
              <option value="Virtual Video Delegation">Virtual Bilateral Video Delegation</option>
            </select>
          </div>
        </div>

        {/* Preferred Date Slot */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Preferred Consultation Date
          </label>
          <div className="relative">
            <input
              type="date"
              {...register('preferredDate')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            />
          </div>
        </div>

        {/* Preferred Time Window */}
        <div>
          <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
            Preferred Meeting Time Slot
          </label>
          <div className="relative">
            <select
              {...register('preferredSlot')}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
            >
              <option value="Morning (10:30 AM – 12:00 PM IST / GST)">Morning Slot (10:30 AM – 12:00 PM)</option>
              <option value="Afternoon (02:00 PM – 03:30 PM IST / GST)">Afternoon Slot (02:00 PM – 03:30 PM)</option>
              <option value="Evening (04:30 PM – 06:00 PM IST / GST)">Evening Slot (04:30 PM – 06:00 PM)</option>
              <option value="Diplomatic Priority Dispatch (Urgent)">Diplomatic Priority (Earliest Available)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-[0.68rem] uppercase font-label tracking-wider font-bold text-emerald-950 mb-1.5">
          Executive Summary / Purpose of Consultation *
        </label>
        <textarea
          rows={4}
          placeholder="Please describe your proposal, bilateral trade scope, speaking forum details, or cinema co-production agenda..."
          {...register('message')}
          className="w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-[0.95rem] text-ink-heading placeholder:text-ink-faint/80 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15"
        />
        {errors.message && (
          <p className="text-red-600 text-2xs mt-1 font-medium">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 px-6 py-3 font-label text-xs font-bold uppercase tracking-[0.12em] text-emerald-950 shadow-[0_6px_14px_-6px_rgba(199,154,61,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-8px_rgba(199,154,61,0.6)] disabled:cursor-wait disabled:opacity-60 w-full"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-gold-700 dark:text-gold-400" />
        ) : (
          <>
            <span>Submit Consultation Dispatch</span>
            <ArrowRight className="w-4 h-4 text-gold-700 dark:text-gold-400" />
          </>
        )}
      </button>
    </form>
  );
};
