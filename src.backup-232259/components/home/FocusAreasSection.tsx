import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { siteConfig } from '../../data/siteConfig';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE_OUT },
  }),
};

export const FocusAreasSection: React.FC = () => {
  return (
    <section className="bg-[#FAF6F0] py-14 sm:py-20 lg:py-24">
      <Container>
        {/* Section header */}
        <div className="mb-8 sm:mb-12">
          <span className="mb-1.5 block font-label text-xs font-semibold uppercase tracking-[0.25em] text-[#A9812A] sm:mb-2">
            Key Focus Areas
          </span>
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-[clamp(1.5rem,2.2vw+1rem,2.25rem)] font-bold text-emerald-950">
              Four Pillars of{' '}
              <span className="italic bg-gradient-to-r from-[#9C701B] via-[#D4A359] to-[#8A6920] bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <div className="hidden h-[2px] w-20 bg-gold-600 sm:block" />
          </div>
        </div>

        {/* 4-card grid with high-definition visibility and refined luxury theme integration */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.focusAreas.map((area, idx) => (
            <motion.div
              key={area.id}
              custom={idx}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ivory-800/90 bg-white shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-[0_12px_28px_-6px_rgba(18,51,43,0.12)]"
            >
              {/* Image with clear photography */}
              <div className="relative aspect-[16/11] overflow-hidden bg-emerald-950">
                <img
                  src={area.image}
                  alt={area.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Clean luxury gradient wash */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-black/20"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-5.5 lg:p-5 xl:p-6">
                <h3 className="mb-2 font-serif text-[clamp(0.95rem,0.6vw+0.75rem,1.18rem)] font-bold text-emerald-950 transition-colors group-hover:text-gold-700 leading-snug whitespace-nowrap">
                  {area.title}
                </h3>
                <p className="mb-5 flex-1 font-sans text-sm leading-relaxed text-charcoal-700">
                  {area.description}
                </p>

                {/* Action Link Footer */}
                <div className="pt-3.5 mt-auto border-t border-ivory-800/80">
                  <Link
                    to={area.link}
                    className="flex items-center justify-between font-label text-xs font-bold uppercase tracking-[0.14em] text-[#8A6920] transition-colors group-hover:text-emerald-950"
                  >
                    <span>Explore Initiative</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-600/35 bg-gold-500/10 text-gold-700 transition-all duration-300 group-hover:border-gold-600 group-hover:bg-gold-600 group-hover:text-emerald-950 group-hover:translate-x-1">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
