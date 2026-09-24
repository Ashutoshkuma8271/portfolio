import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { BannerButton } from '../components/banner/BannerButton';
import { Badge } from '../components/ui/Badge';
import { SEO } from '../components/ui/SEO';
import { blogPosts } from '../data/posts';
import { Clock, ArrowUpRight } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Global Trade', 'Cinema & Culture', 'Women Empowerment', 'Policy & Governance'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  // The newest piece leads the page as a feature; the rest follow in a grid.
  const [lead, ...rest] = filteredPosts;

  return (
    <div className="overflow-hidden bg-surface">
      <SEO
        title="Insights & Thought Leadership | Zeenat Kureshi"
        description="Essays, policy analysis, and editorial insights on GCC-India trade, cultural cinema, and gender empowerment."
      />

      {/* Page Header Banner */}
      <PageHeader
        section="insights"
        breadcrumb="Insights"
        eyebrow="Public Intellect & Essays"
        title="Dispatches on Trade Corridors, Cultural Cinema &"
        accent="Policy"
        description="In-depth geopolitical analysis, economic roadmaps, and grassroots policy blueprints by H.E. Zeenat Kureshi."
        scrollTargetId="articles"
        stats={[
          { value: '15+ Essays', label: 'Policy Analyses' },
          { value: '4 Sectors', label: 'Bilateral Focus' },
          { value: '6 Markets', label: 'GCC Corridors' },
        ]}
        actionButton={<BannerButton href="#articles">Browse Dispatches</BannerButton>}
      />

      {/* 
        ======================================================================
        1. CATEGORY FILTER & ARTICLES GRID
        ======================================================================
      */}
      <section id="articles" className="py-20 lg:py-28 bg-surface">
        <Container>
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-950 text-gold-400 border border-gold-500 shadow-md'
                    : 'bg-surface-raised text-ink-soft hover:bg-surface-sunken border border-hairline'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lead essay */}
          {lead && (
            <Link
              to={`/insights/${lead.slug}`}
              className="group mb-8 grid overflow-hidden rounded-3xl border border-gold-500/40 bg-surface-raised shadow-luxury-lg transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/70 lg:mb-10 lg:grid-cols-12"
            >
              <div className="grain relative min-h-[260px] overflow-hidden lg:col-span-6">
                <img
                  src={lead.featuredImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-5 top-5 z-[3] rounded-full border border-gold-400/50 bg-emerald-950/70 px-3.5 py-1.5 font-label text-2xs font-bold uppercase tracking-[0.16em] text-gold-200 backdrop-blur-md">
                  Featured essay
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-8 text-center text-ink-heading sm:p-12 lg:col-span-6 lg:items-start lg:text-left">
                <span className="font-label text-2xs font-bold uppercase tracking-[0.22em] text-gold-800 dark:text-gold-300">
                  {lead.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink-heading transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-300 sm:text-3xl">
                  {lead.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">
                  {lead.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-ink-soft lg:justify-start">
                  <span>{lead.date}</span>
                  <span aria-hidden>&bull;</span>
                  <span className="flex items-center gap-1.5 text-gold-800 dark:text-gold-300">
                    <Clock className="h-4 w-4" />
                    {lead.readTime}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {rest.map((post) => (
              <motion.article
                whileHover={{ y: -4, boxShadow: '0 28px 50px -18px rgba(12,43,34,0.30)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                key={post.slug}
                className="relative bg-surface-raised rounded-3xl border border-hairline shadow-luxury hover:shadow-luxury-lg hover:border-gold-600/40 transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between group"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div>
                  {/* Featured Image Frame */}
                  <Link to={`/insights/${post.slug}`} className="grain block relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden bg-emerald-950">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      style={{ objectPosition: '50% 30%' }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 z-[3]">
                      <Badge variant="emerald" size="sm">
                        {post.category}
                      </Badge>
                    </div>
                  </Link>

                  {/* Article Content */}
                  <div className="p-7 text-center sm:p-8 sm:text-left">
                    <div className="flex items-center justify-center gap-3 text-xs text-ink-faint mb-3 sm:justify-start">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading text-xl sm:text-[1.4rem] font-semibold text-ink-heading group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors leading-snug mb-3">
                      <Link to={`/insights/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-[0.95rem] sm:text-base text-ink-soft leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-2xs uppercase font-label tracking-wider text-gold-800 bg-gold-500/10 px-2.5 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <div className="pt-4 border-t border-hairline flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-ink-soft font-semibold">
                      <span>By {post.author.name}</span>
                    </div>

                    <Link
                      to={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-heading group-hover:text-gold-600 transition-colors"
                    >
                      <span>Read Essay</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};
