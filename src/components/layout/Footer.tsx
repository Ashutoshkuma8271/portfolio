import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Container } from './Container';
import { siteConfig } from '../../data/siteConfig';
import { GoldDivider } from '../ui/GoldDivider';
import { BrandMark } from '../ui/BrandMark';
import { NewsletterForm } from '../forms/NewsletterForm';

import socialLinkedin from '../../assets/images/icons/social-linkedin.png';
import socialInstagram from '../../assets/images/icons/social-instagram.png';
import socialFacebook from '../../assets/images/icons/social-facebook.png';
import socialYoutube from '../../assets/images/icons/social-youtube.png';
import socialTwitter from '../../assets/images/icons/social-twitter.png';
import socialMessage from '../../assets/images/icons/social-message.png';

import googleMapsPin from '../../assets/images/icons/google-maps-pin.png';
import gmailIcon from '../../assets/images/icons/gmail-icon.png';
import clockIcon from '../../assets/images/icons/clock-icon.png';

export const Footer: React.FC = () => {
  const location = useLocation();

  const socialIconsMap: Record<string, string> = {
    linkedin: socialLinkedin,
    instagram: socialInstagram,
    facebook: socialFacebook,
    youtube: socialYoutube,
    x: socialTwitter,
    twitter: socialTwitter,
    whatsapp: socialMessage,
    message: socialMessage,
  };

  return (
    <footer className="bg-[#FAF7F2] dark:bg-surface-sunken text-ink-heading border-t border-gold-600/25 pt-14 sm:pt-16 lg:pt-20 pb-24 sm:pb-28 lg:pb-16 overflow-hidden relative">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/15 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Centered on mobile/tablet, balanced 12-column split on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 lg:gap-8 xl:gap-10 mb-12 sm:mb-16 items-start">
          
          {/* Column 1: Monogram & Bio (4 cols on lg/xl) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 md:col-span-2 lg:col-span-4">
            {/* Seamless Horizontal Brand Lockup with Monogram */}
            <div className="mb-4 flex items-center justify-center lg:justify-start gap-3 w-auto">
              <BrandMark theme="dark" size={42} className="drop-shadow-[0_4px_12px_rgba(199,154,61,0.3)] shrink-0" />
              <div className="text-left min-w-0">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-ink-heading leading-tight whitespace-nowrap">
                  Zeenat Kureshi
                </h3>
                <p className="font-label text-[0.62rem] sm:text-[0.7rem] uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#B88A2D] dark:text-gold-400 font-bold mt-1 whitespace-nowrap">
                  Trade Commissioner • Producer • Leader
                </p>
              </div>
            </div>

            {/* Ethos line */}
            <p className="mb-3.5 flex items-center justify-center lg:justify-start gap-2 font-label text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint whitespace-nowrap">
              <span>People</span>
              <span className="text-gold-600/70">&middot;</span>
              <span>Partnerships</span>
              <span className="text-gold-600/70">&middot;</span>
              <span>Progress</span>
            </p>

            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-5 max-w-sm mx-auto lg:mx-0">
              Advancing India–GCC trade, investment and strategic partnerships, cultural cinema, and nationwide women empowerment.
            </p>

            {/* Enhanced Social Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              {siteConfig.socialLinks.map((social) => {
                const iconSrc = socialIconsMap[social.platform] || socialLinkedin;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-emerald-950/90 border border-stone-200/90 dark:border-gold-500/35 flex items-center justify-center p-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_14px_rgba(184,138,45,0.28)] hover:border-[#B88A2D] dark:hover:border-gold-400 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 shrink-0 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 via-transparent to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <img
                      src={iconSrc}
                      alt={social.label}
                      className="w-full h-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation - Matching Navbar Text & Typography (2 cols on lg) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 md:col-span-1 lg:col-span-2 w-full">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#A67C24] dark:text-gold-400 mb-3">
              Explore
            </h4>
            <GoldDivider className="mb-4" center="tablet" />
            <ul className="flex flex-col items-center lg:items-start space-y-2.5 text-xs sm:text-sm tracking-wide font-label font-medium w-full">
              {siteConfig.navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      if (item.path === '/' && location.pathname === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-ink-soft hover:text-[#A67C24] dark:hover:text-gold-400 transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Offices & Contact Desks (3 cols on lg, spacious single-line layout) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 md:col-span-1 lg:col-span-3 w-full">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#A67C24] dark:text-gold-400 mb-3">
              Offices
            </h4>
            <GoldDivider className="mb-4" center="tablet" />
            <div className="space-y-3.5 text-xs sm:text-sm text-ink-soft leading-relaxed flex flex-col items-center lg:items-start w-full">
              <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-emerald-950/90 border border-stone-200/90 dark:border-gold-500/30 flex items-center justify-center shrink-0 p-1.5 shadow-2xs">
                  <img src={googleMapsPin} alt="Office Location" className="w-full h-full object-contain" />
                </div>
                <span className="text-ink-heading font-medium whitespace-nowrap text-xs xl:text-sm">
                  BKC, Mumbai • DIFC, Dubai
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-emerald-950/90 border border-stone-200/90 dark:border-gold-500/30 flex items-center justify-center shrink-0 p-1.5 shadow-2xs">
                  <img src={gmailIcon} alt="Email" className="w-full h-full object-contain" />
                </div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-ink-heading font-medium hover:text-[#A67C24] dark:hover:text-gold-400 transition-colors whitespace-nowrap text-xs xl:text-sm"
                  title={siteConfig.contact.email}
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-emerald-950/90 border border-stone-200/90 dark:border-gold-500/30 flex items-center justify-center shrink-0 p-1.5 shadow-2xs">
                  <img src={clockIcon} alt="Office Hours" className="w-full h-full object-contain" />
                </div>
                <span className="text-ink-heading font-medium whitespace-nowrap text-xs xl:text-sm">
                  Mon–Fri (IST / GST)
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Dispatch (3 cols on lg) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 md:col-span-2 lg:col-span-3 w-full">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#A67C24] dark:text-gold-400 mb-3">
              Executive Dispatch
            </h4>
            <GoldDivider className="mb-4" center="tablet" />
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-4 max-w-sm mx-auto lg:mx-0">
              Subscribe for periodic strategic notes on GCC–India trade corridors, policy developments, and cinematic releases.
            </p>
            <div className="w-full max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-stone-200/80 dark:border-hairline/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-ink-faint text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B88A2D] dark:text-gold-400 shrink-0" />
            <span className="font-medium">© {new Date().getFullYear()} Zeenat Kureshi. All Rights Reserved.</span>
          </div>
          <span className="text-ink-faint font-medium text-center sm:text-right">Diplomatic Portal — India &amp; GCC</span>
        </div>
      </Container>
    </footer>
  );
};
