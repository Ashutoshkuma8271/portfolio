import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { siteConfig } from '../../data/siteConfig';
import { GoldDivider } from '../ui/GoldDivider';
import { BrandMark } from '../ui/BrandMark';
import { NewsletterForm } from '../forms/NewsletterForm';
import { MapPinLogo } from '../ui/MapPinLogo';
import gmailIcon from '../../assets/images/icons/gmail-icon.png';
import clockIcon from '../../assets/images/icons/clock-icon.png';
import socialLinkedin from '../../assets/images/icons/social-linkedin.png';
import socialInstagram from '../../assets/images/icons/social-instagram.png';
import socialFacebook from '../../assets/images/icons/social-facebook.png';
import socialYoutube from '../../assets/images/icons/social-youtube.png';
import socialTwitter from '../../assets/images/icons/social-twitter.png';
import socialMessage from '../../assets/images/icons/social-message.png';
import {
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

/** Each network's own colour, shown on hover so the row stays quiet until touched. */
const SOCIAL_HOVER: Record<string, string> = {
  linkedin: 'hover:border-[#0A66C2] hover:shadow-[0_0_12px_rgba(10,102,194,0.35)]',
  instagram: 'hover:border-[#DD2A7B] hover:shadow-[0_0_12px_rgba(221,42,123,0.35)]',
  facebook: 'hover:border-[#1877F2] hover:shadow-[0_0_12px_rgba(24,119,242,0.35)]',
  x: 'hover:border-[#1DA1F2] hover:shadow-[0_0_12px_rgba(29,161,242,0.35)]',
  youtube: 'hover:border-[#FF0000] hover:shadow-[0_0_12px_rgba(255,0,0,0.35)]',
  whatsapp: 'hover:border-[#0066FF] hover:shadow-[0_0_12px_rgba(0,102,255,0.35)]',
};

const CONTACT_TILE =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-raised ring-1 ring-gold-500/25 shadow-[0_1px_2px_rgba(0,0,0,0.06)]';

export const Footer: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <img src={socialLinkedin} alt="LinkedIn" className="w-full h-full object-contain" />;
      case 'instagram':
        return <img src={socialInstagram} alt="Instagram" className="w-full h-full object-contain" />;
      case 'facebook':
        return <img src={socialFacebook} alt="Facebook" className="w-full h-full object-contain" />;
      case 'x':
      case 'twitter':
        return <img src={socialTwitter} alt="X" className="w-full h-full object-contain" />;
      case 'youtube':
        return <img src={socialYoutube} alt="YouTube" className="w-full h-full object-contain" />;
      case 'whatsapp':
      case 'message':
        return <img src={socialMessage} alt="Message" className="w-full h-full object-contain" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-gold-600 dark:text-gold-400" />;
    }
  };

  return (
    <footer className="bg-surface-sunken text-ink-heading border-t border-gold-600/30 pt-16 pb-28 sm:pb-24 lg:pb-16 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 lg:gap-10 xl:gap-12 mb-12 sm:mb-16 text-center sm:text-left">
          {/* Column 1: Monogram & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center justify-center gap-3.5 sm:justify-start">
              <BrandMark theme="dark" size={52} className="drop-shadow-[0_4px_12px_rgba(199,154,61,0.35)]" />
              <div>
                <h3 className="font-cinzel text-xl font-bold uppercase tracking-[0.18em] text-ink-heading">
                  Zeenat Kureshi
                </h3>
                <p className="font-label text-2xs uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400 font-semibold">
                  Trade Commissioner • Producer • Leader
                </p>
              </div>
            </div>

            {/* Ethos line from the client's brand lockup */}
            <p className="mb-4 flex items-center justify-center gap-2.5 font-label text-2xs font-semibold uppercase tracking-[0.18em] text-ink-faint sm:justify-start">
              <span>People</span>
              <span className="text-gold-600/70 text-xs">&middot;</span>
              <span>Partnerships</span>
              <span className="text-gold-600/70 text-xs">&middot;</span>
              <span>Progress</span>
            </p>

            <p className="text-sm sm:text-base text-ink-soft leading-relaxed mb-6 max-w-sm mx-auto sm:mx-0">
              Advancing India–GCC trade, investment and strategic partnerships, cultural cinema, and nationwide women empowerment.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-full bg-surface-raised border border-gold-500/30 p-2 flex items-center justify-center transition-all duration-300 shadow-xs hover:-translate-y-0.5 hover:shadow-md ${SOCIAL_HOVER[social.platform] ?? 'hover:border-gold-400'}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation & Verticals (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-700 dark:text-gold-400 mb-3">
              Explore
            </h4>

            <GoldDivider className="mb-4" center="mobile" />
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <Link to="/" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-2 sm:justify-start">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-2 sm:justify-start">
                  <span>About Zeenat</span>
                </Link>
              </li>
              <li>
                <Link to="/trade-investment" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-2 sm:justify-start">
                  <span>Trade &amp; Investment</span>
                </Link>
              </li>
              <li>
                <Link to="/media-press" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-2 sm:justify-start">
                  <span>Media &amp; Press</span>
                </Link>
              </li>
              <li>
                <Link to="/women-leadership" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-2 sm:justify-start">
                  <span>Women Leadership</span>
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-2 sm:justify-start">
                  <span>Insights &amp; Articles</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center justify-center gap-2 sm:justify-start">
                  <span>Contact Office</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Diplomatic Desks (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-700 dark:text-gold-400 mb-3">
              Offices
            </h4>
            <GoldDivider className="mb-4" center="mobile" />
            <div className="space-y-3 text-sm text-ink-soft leading-relaxed">
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <span className={CONTACT_TILE}>
                  <MapPinLogo className="h-[18px]" />
                </span>
                <span>BKC, Mumbai • DIFC, Dubai</span>
              </div>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <span className={CONTACT_TILE}>
                  <img src={gmailIcon} alt="Email" className="h-4 w-4 object-contain" />
                </span>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold-700 dark:hover:text-gold-400 transition-colors break-all">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <span className={CONTACT_TILE}>
                  <img src={clockIcon} alt="Hours" className="h-4 w-4 object-contain" />
                </span>
                <span>Mon–Fri (IST / GST)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Dispatch (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-700 dark:text-gold-400 mb-3">
              Executive Dispatch
            </h4>
            <GoldDivider className="mb-4" center="mobile" />
            <p className="text-sm text-ink-soft leading-relaxed mb-4">
              Subscribe for periodic strategic notes on GCC–India trade corridors, policy developments, and cinematic releases.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hairline/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-faint">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
            <span>© {new Date().getFullYear()} Zeenat Kureshi. All Rights Reserved.</span>
          </div>
          <span className="text-ink-faint">Diplomatic Portal — India &amp; GCC</span>
        </div>
      </Container>
    </footer>
  );
};
