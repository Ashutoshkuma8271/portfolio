import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { siteConfig } from '../../data/siteConfig';
import { GoldDivider } from '../ui/GoldDivider';
import { BrandMark } from '../ui/BrandMark';
import { NewsletterForm } from '../forms/NewsletterForm';
import { 
  Linkedin, 
  Instagram, 
  Twitter, 
  Youtube, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck,
  ArrowUpRight,
  Facebook
} from 'lucide-react';

export const Footer: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'x':
        return <Twitter className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-surface-sunken text-ink-heading border-t border-gold-600/30 pt-16 pb-12 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Column 1: Monogram & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-3.5">
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
            <p className="mb-6 flex items-center gap-2.5 font-label text-2xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
              <span>People</span>
              <span className="text-gold-600/70 text-xs">&middot;</span>
              <span>Partnerships</span>
              <span className="text-gold-600/70 text-xs">&middot;</span>
              <span>Progress</span>
            </p>

            <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-6">
              Advancing India–GCC trade, investment and strategic partnerships, cultural cinema, and nationwide women empowerment.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-surface-raised border border-gold-500/30 hover:border-gold-400 hover:bg-gold-600 hover:text-emerald-950 text-gold-700 dark:text-gold-400 flex items-center justify-center transition-all duration-300"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation & Verticals (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-700 dark:text-gold-400 mb-4">
              Explore
            </h4>

            <GoldDivider className="mb-5" />
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <Link to="/" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span>About Zeenat</span>
                </Link>
              </li>
              <li>
                <Link to="/trade-investment" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span>Trade & Investment</span>
                </Link>
              </li>
              <li>
                <Link to="/media-press" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span>Media & Press</span>
                </Link>
              </li>
              <li>
                <Link to="/women-leadership" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span>Women Leadership</span>
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span>Insights & Articles</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ink-soft hover:text-gold-700 dark:hover:text-gold-400 transition-colors flex items-center gap-2">
                  <span>Contact Office</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Diplomatic Desks (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-700 dark:text-gold-400 mb-4">
              Offices
            </h4>
            <GoldDivider className="mb-5" />
            <div className="space-y-4 text-sm text-ink-soft leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>BKC, Mumbai • DIFC, Dubai</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold-700 dark:hover:text-gold-400 transition-colors break-all">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Mon–Fri (IST / GST)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Dispatch (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-700 dark:text-gold-400 mb-4">
              Executive Dispatch
            </h4>
            <GoldDivider className="mb-5" />
            <p className="text-sm text-ink-soft leading-relaxed mb-4">
              Subscribe for periodic strategic notes on GCC–India trade corridors, policy developments, and cinematic releases.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-hairline flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-faint">
          <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
          <span>© {new Date().getFullYear()} Zeenat Kureshi. All Rights Reserved.</span>
          <span className="hidden sm:inline text-hairline">•</span>
          <span className="hidden sm:inline">Diplomatic Portal — India &amp; GCC</span>
        </div>
      </Container>
    </footer>
  );
};
