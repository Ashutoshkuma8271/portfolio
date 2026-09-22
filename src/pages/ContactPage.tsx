import React from 'react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { BannerButton } from '../components/banner/BannerButton';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { GoldDivider } from '../components/ui/GoldDivider';
import { ContactForm } from '../components/forms/ContactForm';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../data/siteConfig';
import whatsapp3dIcon from '../assets/images/focus/whatsapp-3d-icon.png';
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Youtube, 
  Building2, 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'x':
        return <Twitter className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  const whatsappDirectUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello Zeenat Kureshi's Office, I am contacting you regarding a strategic engagement."
  )}`;

  return (
    <div className="overflow-hidden bg-surface">
      <SEO
        title="Contact Office of Zeenat Kureshi | Bilateral Desks & Executive Secretariat"
        description="Connect directly with the Executive Office of Zeenat Kureshi for trade advisory, speaking invitations, film co-productions, and media inquiries."
      />

      {/* Page Header Banner with Bilateral Background */}
      <PageHeader
        section="contact"
        breadcrumb="Contact"
        eyebrow="Executive Secretariat & Diplomacy"
        title="Connect with the Office of"
        accent="H.E. Zeenat Kureshi"
        description="Facilitating bilateral trade missions, diplomatic correspondence, cinema co-productions, and institutional invitations across Mumbai, New Delhi, and Dubai."
        scrollTargetId="form"
        actionButton={<BannerButton href="#form">Send a Message</BannerButton>}
      >
        <BannerButton variant="secondary" to="/contact?subject=general#form">
          Schedule a meeting
        </BannerButton>
      </PageHeader>

      {/* 
        ======================================================================
        1. MAIN CONTACT GRID (FORM + CONTACT DETAILS)
        ======================================================================
      */}
      <section id="form" className="py-20 lg:py-28 bg-surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Information & WhatsApp Action (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <Badge variant="gold" className="mb-3">
                  DIRECT CHANNELS
                </Badge>
                <h2 className="font-display text-3xl font-bold text-ink-heading mb-3">
                  Diplomatic & Commercial Secretariat
                </h2>
                <GoldDivider className="mb-4" />
                <p className="text-base sm:text-lg text-ink-soft leading-relaxed font-light">
                  For sovereign trade briefings, ministerial invitations, and high-impact media syndication, please direct correspondence through our designated office desks.
                </p>
              </div>

              {/* Direct Desks Cards */}
              <div className="space-y-4">
                {/* General & Secretariat */}
                <div className="p-5 rounded-2xl bg-surface-raised border border-hairline shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1 hover:scale-[1.012] hover:border-gold-600/40 transition-all duration-300 ease-out flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-ink-heading">
                      Executive & General Desk
                    </h4>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-xs text-gold-700 hover:text-gold-600 font-semibold transition-colors break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Trade Commissioner Desk */}
                <div className="p-5 rounded-2xl bg-surface-raised border border-hairline shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1 hover:scale-[1.012] hover:border-gold-600/40 transition-all duration-300 ease-out flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-ink-heading">
                      GCC–India Trade Commission
                    </h4>
                    <a
                      href={`mailto:${siteConfig.contact.tradeDeskEmail}`}
                      className="text-xs text-gold-700 hover:text-gold-600 font-semibold transition-colors break-all"
                    >
                      {siteConfig.contact.tradeDeskEmail}
                    </a>
                  </div>
                </div>

                {/* Media & Press Desk */}
                <div className="p-5 rounded-2xl bg-surface-raised border border-hairline shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1 hover:scale-[1.012] hover:border-gold-600/40 transition-all duration-300 ease-out flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-ink-heading">
                      Press & Broadcast Desk
                    </h4>
                    <a
                      href={`mailto:${siteConfig.contact.mediaEmail}`}
                      className="text-xs text-gold-700 hover:text-gold-600 font-semibold transition-colors break-all"
                    >
                      {siteConfig.contact.mediaEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Card */}
              <div className="p-6 rounded-3xl bg-surface-raised border border-gold-600/40 text-ink shadow-luxury-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-emerald-950/80 p-1.5 border border-gold-500/40 flex items-center justify-center shrink-0 shadow-sm">
                    <img src={whatsapp3dIcon} alt="" className="w-full h-full object-contain filter drop-shadow-xs" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-ink-heading text-base">
                      Official WhatsApp Business
                    </h4>
                    <p className="text-xs text-gold-400">
                      Typically replies within one business day
                    </p>
                  </div>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed mb-4">
                  Connect on WhatsApp for immediate delegation logistics, urgent speaking inquiries, or private scheduling.
                </p>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-emerald-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-gold-glow cursor-pointer"
                >
                  <img src={whatsapp3dIcon} alt="" className="w-4 h-4 object-contain filter drop-shadow-xs shrink-0" />
                  <span>Open WhatsApp Chat</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-hairline">
                <h4 className="text-xs uppercase font-label font-bold tracking-wider text-ink-soft mb-3">
                  Follow & Connect Online
                </h4>
                <div className="flex items-center gap-3">
                  {siteConfig.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-surface-raised border border-hairline hover:border-gold-500 text-ink-soft hover:text-gold-700 flex items-center justify-center transition-all shadow-sm"
                      aria-label={social.label}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form (7 cols) */}
            <div id="form" className="lg:col-span-7 scroll-mt-24">
              <ContactForm />
            </div>

          </div>
        </Container>
      </section>

      {/* 
        ======================================================================
        2. PHYSICAL LOCATIONS & OFFICE HUBS
        ======================================================================
      */}
      <section className="py-20 lg:py-28 bg-surface-raised border-t border-hairline">
        <Container>
          <SectionHeading
            eyebrow="GLOBAL PRESENCE"
            title="Strategic Office Locations & Representation"
            subtitle="Anchored in premier diplomatic and commercial hubs across India and the United Arab Emirates."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            {/* Mumbai Office */}
            <div className="bg-surface p-8 rounded-3xl border border-hairline shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1.5 hover:scale-[1.012] hover:border-gold-600/40 transition-all duration-300 ease-out flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="emerald" size="sm">
                    India Headquarters
                  </Badge>
                  <Building2 className="w-5 h-5 text-gold-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-ink-heading mb-2 group-hover:text-gold-700 transition-colors">
                  Mumbai Secretariat
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed mb-4">
                  {siteConfig.contact.primaryOffice}
                </p>
                <div className="space-y-1.5 text-xs text-ink-soft mb-6">
                  <p><strong>Primary Function:</strong> National Presidency & Cinema Production</p>
                  <p><strong>Hours:</strong> Mon–Fri, 09:30 AM – 06:30 PM IST</p>
                </div>
              </div>
              <div className="p-3 bg-surface-raised rounded-xl text-center text-xs text-gold-800 font-semibold border border-hairline">
                In-person meetings by prior diplomatic appointment only
              </div>
            </div>

            {/* Dubai Office */}
            <div className="bg-surface p-8 rounded-3xl border border-hairline shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1.5 hover:scale-[1.012] hover:border-gold-600/40 transition-all duration-300 ease-out flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="gold" size="sm">
                    GCC Regional Desk
                  </Badge>
                  <Building2 className="w-5 h-5 text-gold-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-ink-heading mb-2 group-hover:text-gold-700 transition-colors">
                  Dubai Trade Desk
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed mb-4">
                  {siteConfig.contact.uaeOffice}
                </p>
                <div className="space-y-1.5 text-xs text-ink-soft mb-6">
                  <p><strong>Primary Function:</strong> Bilateral Trade & Sovereign Corridors</p>
                  <p><strong>Hours:</strong> Mon–Fri, 09:30 AM – 06:30 PM GST</p>
                </div>
              </div>
              <div className="p-3 bg-surface-raised rounded-xl text-center text-xs text-gold-800 font-semibold border border-hairline">
                In-person meetings by prior diplomatic appointment only
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
