import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { FloatingInvestmentWidget } from './components/ui/FloatingInvestmentWidget';

// Lazy loaded page components for optimal performance
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const TradeInvestmentPage = lazy(() => import('./pages/TradeInvestmentPage').then(m => ({ default: m.TradeInvestmentPage })));
const MediaPressPage = lazy(() => import('./pages/MediaPressPage').then(m => ({ default: m.MediaPressPage })));
const WomenLeadershipPage = lazy(() => import('./pages/WomenLeadershipPage').then(m => ({ default: m.WomenLeadershipPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

import { PageSkeleton } from './components/ui/SkeletonLoader';
import { useLenis } from './hooks/useLenis';

export const App: React.FC = () => {
  useLenis();

  return (
    <HelmetProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-surface font-sans text-ink selection:bg-gold-500/30 selection:text-emerald-950">
        <Navbar />
        
        <main className="flex-1">
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/trade-investment" element={<TradeInvestmentPage />} />
              <Route path="/media-press" element={<MediaPressPage />} />
              <Route path="/women-leadership" element={<WomenLeadershipPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <WhatsAppFloatingButton />
        <FloatingInvestmentWidget />
      </div>
    </HelmetProvider>
  );
};
export default App;
