import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../layout/Container';
import { aboutData } from '../../data/about';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const AwardsSection: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#FAF6F0] py-20 lg:py-28">
      {/* Background ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(199,154,61,0.08),transparent)]"
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Honors & Recognitions"
          title="Distinguished Honors and National Citations"
          subtitle="Conferred by sovereign trade conclaves, ministerial forums, and international cultural institutions."
          center
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-14">
          {aboutData.awards.map((award, idx) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: EASE_OUT }}
              className="group relative flex flex-col justify-between rounded-2xl border border-gold-600/25 bg-white p-7 shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-[0_16px_36px_-8px_rgba(18,51,43,0.15)]"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-700 transition-all duration-300 group-hover:bg-gold-600 group-hover:text-emerald-950 group-hover:shadow-[0_0_20px_rgba(199,154,61,0.35)]">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-gold-600/30 bg-gold-500/10 px-3 py-1 font-label text-xs font-bold text-gold-800 tracking-wider">
                    {award.year}
                  </span>
                </div>

                <span className="mb-2 block font-label text-2xs font-bold uppercase tracking-[0.16em] text-[#8A6920]">
                  {award.category}
                </span>

                <h3 className="mb-2.5 font-serif text-lg sm:text-xl font-bold text-emerald-950 transition-colors duration-200 group-hover:text-gold-800 leading-snug">
                  {award.title}
                </h3>

                <p className="mb-4 font-label text-xs font-semibold text-charcoal-600 flex items-center gap-1.5">
                  <Medal className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                  <span>{award.issuer}</span>
                </p>

                <p className="font-sans text-sm leading-relaxed text-charcoal-700">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
