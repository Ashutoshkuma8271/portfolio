import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { Container } from './Container';
import { NavbarBrandLogo } from '../ui/BrandMark';
import { ThemeToggle } from './ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Returns a contextual subtitle for the brand lockup that reflects
 * the current section of the website.
 */
const getSectionSubtitle = (pathname: string): string => {
  if (pathname.startsWith('/trade-investment')) return 'Trade & Bilateral Investment';
  if (pathname.startsWith('/about')) return 'Statesperson • Producer • Leader';
  if (pathname.startsWith('/media-press')) return 'Press Office & Media';
  if (pathname.startsWith('/women-leadership')) return 'National President • Women Cell';
  if (pathname.startsWith('/insights')) return 'Strategic Briefings & Analysis';
  if (pathname.startsWith('/contact')) return 'Diplomatic & Commercial Office';
  return 'Trade Commissioner • GCC & India';
};

/** Routes that open with a full-bleed banner. The navbar goes transparent
    over these until the visitor scrolls. Article pages have their own header. */
const hasBanner = (pathname: string): boolean =>
  pathname === '/' ||
  pathname === '/about' ||
  pathname === '/trade-investment' ||
  pathname === '/media-press' ||
  pathname === '/women-leadership' ||
  pathname === '/insights' ||
  pathname === '/contact';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Transparent-over-photo only while a banner is actually behind the bar.
  // The mobile drawer lives inside <header>, so the light-on-dark token
  // override must be off whenever it is open.
  const overBanner = hasBanner(location.pathname) && !isScrolled && !mobileMenuOpen;
  const onDark = false; // banners follow the theme now; no light-on-dark override needed

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile navigation is active to deliver native-app smoothness
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const onResize = () => {
        if (window.innerWidth >= 1024) {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('resize', onResize);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('resize', onResize);
      };
    }
  }, [mobileMenuOpen]);

  const currentSubtitle = getSectionSubtitle(location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        mobileMenuOpen
          ? 'bg-surface border-b border-transparent'
          : overBanner
          ? 'bg-transparent border-b border-transparent'
          : isScrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(12,43,34,0.12)] border-b border-gold-600/25'
          : 'bg-surface border-b border-gold-600/15'
      }`}
    >
      <Container size="full" className="px-3 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4">
          {/* =========================================================================
              OFFICIAL HIGH-RESOLUTION BRAND LOGO LOCKUP
              Clickable to scroll to top / home, proportional scaling with clamp(),
              adheres to ivory/emerald system, possesses professional website properties.
              ========================================================================= */}
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group block min-w-0 shrink rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
            aria-label="H.E. Zeenat Kureshi - Back to top"
          >
            <NavbarBrandLogo subtitle={currentSubtitle} onDark={onDark} />
          </Link>

          {/* =========================================================================
              DESKTOP NAVIGATION
              Clean, professional executive styling with instant tactile feedback
              ========================================================================= */}
          <nav
            className="hidden items-center gap-1 lg:flex xl:gap-1.5"
            aria-label="Main Navigation"
          >
            {siteConfig.navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => {
                  if (item.path === '/' && location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={({ isActive }) =>
                  `relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 font-label text-xs xl:px-3.5 xl:text-[0.82rem] font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500/15 text-ink-heading font-bold border border-gold-500/25 shadow-xs'
                      : 'text-ink-soft hover:text-ink-heading hover:bg-gold-500/10 border border-transparent'
                  }`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* =========================================================================
              ACTION CTA & MOBILE TOGGLE
              ========================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            {/* Desktop Connect Button */}
            <div className="hidden items-center lg:flex">
              <Link
                to="/contact#form"
                onClick={() => {
                  const formEl = document.getElementById('form');
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`group relative inline-flex h-9 sm:h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-4 xl:px-5 font-label text-2xs xl:text-xs font-bold uppercase tracking-[0.14em] shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-600 active:scale-[0.98] ${
                  onDark
                    ? 'border-gold-300/60 bg-gradient-to-b from-gold-400 to-gold-600 text-emerald-950 hover:from-gold-300 hover:to-gold-500'
                    : 'border-gold-500/40 bg-emerald-950 text-ivory-500 hover:bg-emerald-900 hover:border-gold-400'
                }`}
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${onDark ? 'text-emerald-950' : 'text-gold-400'}`} />
              </Link>
            </div>

            {/* Mobile hamburger button with smooth state feedback */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-gold-600/30 bg-surface-raised/70 p-2 text-ink-heading backdrop-blur-sm transition-all duration-200 hover:bg-gold-500/15 hover:border-gold-600 active:scale-95 focus:outline-none lg:hidden cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <motion.div
                key={mobileMenuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: mobileMenuOpen ? -45 : 45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="h-4.5 w-4.5 text-gold-700" />
                ) : (
                  <Menu className="h-4.5 w-4.5 text-ink-heading" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </Container>

      {/* =========================================================================
          MODERN LUXURY MOBILE NAVIGATION DRAWER
          Smooth, GPU-accelerated slide-in transition from right with full-height sheet,
          ambient backdrop blur, animated active link states, generous 52px+ touch targets,
          and zero list markers or numbering.
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden pointer-events-auto">
            {/* Ambient Backdrop Overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in Side Drawer from Right */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
              className="fixed top-0 right-0 bottom-0 z-50 h-[100dvh] w-[88vw] max-w-sm bg-surface shadow-[-16px_0_48px_rgba(7,21,17,0.3)] border-l border-gold-600/35 flex flex-col overscroll-contain"
            >
              {/* Drawer Top Bar with Official Brand Logo & Close Button */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-gold-600/20 bg-surface-raised/80 backdrop-blur-sm shrink-0 min-w-0">
                <Link
                  to="/"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group block min-w-0 pr-2"
                >
                  <NavbarBrandLogo subtitle="Trade Commissioner • GCC" />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-600/30 bg-surface-raised p-2 text-ink-heading transition-all duration-200 hover:bg-gold-500/15 hover:border-gold-600 active:scale-95 cursor-pointer shadow-2xs"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5 text-ink-heading" />
                </button>
              </div>

              {/* Status Ribbon */}
              <div className="px-5 py-2.5 bg-gold-500/[0.08] border-b border-gold-600/15 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-600" />
                  </span>
                  <span className="font-label text-2xs font-bold uppercase tracking-[0.2em] text-[#8A6920]">
                    Diplomatic Portal
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-600/25 bg-surface-raised/90 px-2.5 py-0.5 shadow-2xs">
                  <Globe className="h-3 w-3 text-gold-700" />
                  <span className="font-label text-[0.62rem] font-bold uppercase tracking-wider text-ink-heading">
                    GCC &bull; India
                  </span>
                </div>
              </div>

              {/* Scrollable Navigation Links (Zero numbering or bullet markers, generous 52px+ touch targets) */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 min-h-0 overscroll-contain">
                {siteConfig.navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, delay: 0.04 * index, ease: EASE_OUT }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (item.path === '/' && location.pathname === '/') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={({ isActive }) =>
                        `group relative flex min-h-[50px] items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 select-none ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-ivory-500 shadow-md border border-gold-500/45'
                            : 'text-ink hover:bg-gold-500/10 hover:text-ink-heading border border-transparent active:bg-gold-500/15 active:scale-[0.99]'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active left indicator accent */}
                          {isActive && (
                            <span
                              aria-hidden
                              className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_8px_rgba(199,154,61,0.8)]"
                            />
                          )}

                          <span
                            className={`font-heading text-[1.02rem] tracking-wide transition-colors ${
                              isActive ? 'font-bold text-white pl-1.5' : 'font-medium text-ink-heading group-hover:text-gold-800'
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Active state indicator */}
                          {isActive ? (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/25 text-gold-300 border border-gold-400/40">
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/10 text-ink-faint transition-all duration-200 group-hover:bg-gold-600 group-hover:text-emerald-950 group-hover:translate-x-0.5">
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Drawer Footer CTA & Sovereign Desk Information */}
              <div className="p-4 border-t border-gold-600/20 bg-surface-raised/80 backdrop-blur-sm shrink-0">
                <Link
                  to="/contact#form"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      const formEl = document.getElementById('form');
                      if (formEl) {
                        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 200);
                  }}
                  className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-gold-500/50 py-3 font-label text-xs font-bold uppercase tracking-[0.14em] text-ivory-500 shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="h-3.5 w-3.5 text-gold-400" />
                </Link>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-600" />
                  <p className="font-sans text-[0.72rem] text-ink-soft">
                    Diplomatic Desks: <span className="font-bold text-ink-heading">Dubai &bull; New Delhi</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
