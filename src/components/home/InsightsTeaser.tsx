import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { BannerButton } from '../banner/BannerButton';
import { blogPosts } from '../../data/posts';

/**
 * Home: the three most recent essays, as editorial snippets (image, category,
 * headline). Gives the home page a door into the Insights section.
 */
export const InsightsTeaser: React.FC = () => (
  <section className="border-t border-hairline bg-surface py-16 sm:py-20 lg:py-24">
    <Container>
      <div className="flex flex-wrap items-end justify-between gap-x-8 mb-8 sm:mb-12">
        <SectionHeading eyebrow="Insights" title="Latest" accent="Essays" className="mb-0" />
        <div className="hidden sm:block">
          <BannerButton variant="secondary" to="/insights">
            All insights
          </BannerButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
        {blogPosts.slice(0, 3).map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.07} className="h-full">
            <Link to={`/insights/${post.slug}`} className="group flex flex-col h-full rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="grain relative aspect-[16/10] overflow-hidden rounded-2xl border border-gold-600/30 bg-surface-sunken shadow-2xs">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 sm:mt-5 font-label text-3xs sm:text-2xs font-bold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-400">
                {post.category}
              </p>
              <h3 className="mt-2 line-clamp-3 font-heading text-base sm:text-lg font-bold leading-snug text-ink-heading transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-400">
                {post.title}
              </h3>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <BannerButton variant="secondary" to="/insights" className="w-full justify-center">
          All insights
        </BannerButton>
      </div>
    </Container>
  </section>
);
