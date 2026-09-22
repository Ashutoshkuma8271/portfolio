import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { siteConfig } from '../../data/siteConfig';
import { eventPhotos, type EventPhoto } from '../../data/eventPhotos';
import { SectorArt } from '../enquiry/SectorArt';

/**
 * Four Pillars of Impact -- each mapped to an authentic, high-definition
 * summit and cultural photograph.
 */
const PHOTO: Record<string, EventPhoto | undefined> = {
  trade: eventPhotos.aaccArabDelegation,
  media: eventPhotos.mediaCinema,
  'cultural-cinema': eventPhotos.mediaCinema,
  'women-leadership': eventPhotos.womenPanel,
  'investment-advisory': eventPhotos.bilateralAccord,
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE_OUT },
  }),
};

/**
 * Four full-photograph cards. The photograph is the card: title sits on it at
 * all times, and on hover the description and arrow rise into view. Touch
 * devices (no hover) always show the description.
 */
export const FocusAreasSection: React.FC = () => (
  <section className="bg-surface pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24">
    <Container>
      <SectionHeading
        center
        eyebrow="Key Focus Areas"
        title="Four Pillars of"
        accent="Impact"
        subtitle="Where trade, culture, leadership and capital meet."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.focusAreas.map((area, idx) => (
          <motion.div
            key={area.id}
            custom={idx}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            <Link
              to={area.link}
              className="grain group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-gold-600/25 bg-emerald-950 shadow-luxury transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/60 hover:shadow-luxury-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
            >
              {PHOTO[area.id] ? (
                <img
                  src={PHOTO[area.id]!.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: PHOTO[area.id]!.focal }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-900 to-emerald-950">
                  <SectorArt
                    kind="cinema"
                    className="absolute left-1/2 top-[6%] w-[125%] -translate-x-1/2 transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                </div>
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"
              />

              <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/50 bg-emerald-950/60 text-gold-300 backdrop-blur-md transition-all duration-300 group-hover:border-gold-300 group-hover:bg-gold-500 group-hover:text-emerald-950">
                <ArrowUpRight className="h-4 w-4" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-heading text-xl font-semibold leading-snug text-white">
                  {area.title}
                </h3>
                <p className="mt-2 max-h-40 overflow-hidden text-[0.95rem] leading-relaxed text-ivory-600 transition-all duration-500 [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:max-h-40 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:max-h-40 [@media(hover:hover)]:group-focus-visible:opacity-100">
                  {area.description}
                </p>
                <span className="mt-3 block h-[2px] w-10 rounded-full bg-gold-400 transition-all duration-500 group-hover:w-20" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);
