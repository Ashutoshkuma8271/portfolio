import React from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/ui/SEO';
import { Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ivory-500 py-24">
      <SEO title="Page Not Found | Zeenat Kureshi" />
      <Container size="sm" className="text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-950 text-gold-400 flex items-center justify-center mx-auto mb-6 border-2 border-gold-500/40 shadow-luxury">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-emerald-950 mb-3">
          404 — Page Not Found
        </h1>

        <p className="text-base sm:text-lg text-charcoal-700 max-w-md mx-auto leading-relaxed mb-8">
          The diplomatic dispatch or page you requested cannot be located. Please verify the URL or return to the main platform.
        </p>

        <div className="flex justify-center gap-4">
          <Button to="/" variant="gold" size="md">
            Return to Homepage
          </Button>
          <Button to="/contact" variant="secondary" size="md">
            Contact Secretariat
          </Button>
        </div>
      </Container>
    </div>
  );
};
