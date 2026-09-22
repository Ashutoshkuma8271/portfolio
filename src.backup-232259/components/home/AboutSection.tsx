import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/Container';
import iconTrade from '../../assets/icons/trade.webp';
import iconPartnerships from '../../assets/icons/partnerships.webp';
import iconWomen from '../../assets/icons/women-empowerment.webp';
import iconCulture from '../../assets/icons/cultural-exchange.webp';
import iconSustainable from '../../assets/icons/sustainable-growth.webp';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: EASE_OUT },
  }),
};

interface FocusItem {
  title: string;
  icon: string;
}

const keyFocusItems: FocusItem[] = [
  { title: 'Trade & Investment Facilitation', icon: iconTrade },
  { title: 'Strategic Partnerships', icon: iconPartnerships },
  { title: 'Women Empowerment', icon: iconWomen },
  { title: 'Cultural & People Exchange', icon: iconCulture },
  { title: 'Sustainable Growth', icon: iconSustainable },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] py-16 sm:py-20 lg:py-24">
      {/* Subtle background ambient warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(212,163,89,0.08),transparent)]"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Column 1: Intro */}
          <motion.div
            custom={0}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col items-start lg:col-span-4"
          >
            <h2 className="mb-4 sm:mb-5 font-serif text-[clamp(1.5rem,2.6vw+1rem,2.35rem)] font-bold leading-[1.18] tracking-tight text-emerald-950">
              A Global Advocate for{' '}
              <span className="italic bg-gradient-to-r from-[#9C701B] via-[#D4A359] to-[#8A6920] bg-clip-text text-transparent">
                Inclusive Growth
              </span>
            </h2>
            <p className="font-sans text-[clamp(0.875rem,0.6vw+0.7rem,1.125rem)] leading-relaxed text-charcoal-700">
              H.E. Zeenat Kureshi is a Trade Commissioner, investor, entrepreneur and global
              connector, committed to strengthening India-GCC relations through trade, investment,
              innovation and people-to-people partnerships.
            </p>
          </motion.div>

          {/* Column 2: Watermark pull-quote (Original Design) */}
          <motion.div
            custom={1}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="relative px-2 py-4 text-center lg:col-span-4 lg:px-6 lg:py-6 flex flex-col items-center justify-center"
          >
            {/* Elegant golden quotation mark icon */}
            <div
              aria-hidden
              className="mb-2 select-none font-serif text-4xl sm:text-5xl text-[#C59B4E] leading-none opacity-85"
            >
              &#8221;
            </div>

            <blockquote className="relative z-10 mb-4 font-cormorant text-[clamp(1.45rem,2.2vw+0.9rem,2.15rem)] italic font-medium leading-[1.32] text-emerald-950 max-w-md">
              &ldquo;Economic diplomacy is about people, possibilities and a shared future.&rdquo;
            </blockquote>

            <p className="mb-3 font-label text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#9B7728]">
              H.E. Zeenat Kureshi
            </p>
            <div className="h-[2px] w-12 bg-[#C59B4E] rounded-full" />
          </motion.div>

          {/* Column 3: Focus pillars card -- Dark luxury UI matching user reference */}
          <motion.div
            custom={2}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="w-full lg:col-span-4"
          >
            <div className="relative overflow-hidden rounded-[22px] sm:rounded-3xl bg-[#081D17] border border-gold-600/30 p-6 sm:p-7 lg:p-8 shadow-[0_20px_48px_-8px_rgba(7,24,19,0.35),0_4px_16px_-4px_rgba(199,154,61,0.15)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_24px_56px_-8px_rgba(7,24,19,0.45),0_0_20px_rgba(199,154,61,0.2)]">
              {/* Top-Right Gold Corner Bracket (matching reference design) */}
              <div
                aria-hidden
                className="absolute top-6 right-6 h-7 w-7 border-t border-r border-gold-500/50 pointer-events-none"
              />

              {/* Header: Title */}
              <div className="mb-6">
                <span className="font-label text-xs sm:text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-400">
                  Focus Pillars
                </span>
              </div>

              {/* Rows List */}
              <ul className="space-y-4 sm:space-y-4.5">
                {keyFocusItems.map((item) => (
                  <li key={item.title}>
                    <div className="group flex items-center gap-3.5 sm:gap-4 transition-transform duration-200 hover:translate-x-1 cursor-default">
                      {/* Circular icon medallion: Dark circle with gold rim */}
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-500/35 bg-emerald-950/80 p-2 shadow-xs transition-all duration-200 group-hover:border-gold-400 group-hover:scale-105 group-hover:bg-gold-500/15">
                        <img
                          src={item.icon}
                          alt=""
                          className="h-5 w-5 object-contain transition-transform duration-200 group-hover:scale-110"
                        />
                      </span>

                      {/* Pillar Title: High contrast pure white/ivory text */}
                      <span className="font-sans text-sm sm:text-[0.95rem] font-semibold leading-snug text-white transition-colors group-hover:text-gold-300 whitespace-nowrap">
                        {item.title}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Read More Button: Centered in the middle across all screens */}
        <motion.div
          custom={3}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 sm:mt-12 lg:mt-14 flex justify-center items-center w-full"
        >
          <Link
            to="/about"
            className="group inline-flex h-12 sm:h-13 items-center justify-center gap-3 rounded-full border-2 border-gold-600/40 bg-white px-8 sm:px-9 font-label text-xs font-bold uppercase tracking-[0.16em] text-emerald-950 shadow-[0_4px_16px_-4px_rgba(18,51,43,0.12),0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-600 hover:bg-[#FAF6F0] hover:text-gold-900 hover:shadow-[0_10px_24px_-6px_rgba(18,51,43,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
          >
            <span>Read More</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-gold-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};
