import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { Badge } from '../components/ui/Badge';
import { SEO } from '../components/ui/SEO';
import { blogPosts } from '../data/posts';
import { Clock, ArrowUpRight } from 'lucide-react';
import focusCultural from '../assets/images/focus/cultural.webp';

export const InsightsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Global Trade', 'Cinema & Culture', 'Women Empowerment', 'Policy & Governance'];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="overflow-hidden bg-[#FAF6F0]">
      <SEO
        title="Insights & Thought Leadership | Zeenat Kureshi"
        description="Essays, policy analysis, and editorial insights on GCC-India trade, cultural cinema, and gender empowerment."
      />

      {/* Page Header Banner */}
      <PageHeader
        eyebrow="PUBLIC INTELLECT & ESSAYS"
        title="Dispatches on Trade Corridors, Cultural Cinema & Policy"
        description="In-depth geopolitical analysis, economic roadmaps, and grassroots policy blueprints by H.E. Zeenat Kureshi."
        mediaImage={focusCultural}
        mediaAlt="Strategic Thought Leadership & Policy"
        mediaBadge="Strategic Thought Leadership"
        stats={[
          { value: '15+ Essays', label: 'Policy Analyses' },
          { value: '4 Sectors', label: 'Bilateral Focus' },
          { value: '6 Markets', label: 'GCC Corridors' },
        ]}
        actionButton={
          <a
            href="#articles"
            className="group relative inline-flex h-11 sm:h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-950 via-[#0C221C] to-emerald-950 px-5 sm:px-6 font-label text-2xs sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-[0.12em] text-ivory-500 border border-gold-500/50 shadow-[0_4px_18px_-4px_rgba(7,21,17,0.4)] whitespace-nowrap transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(7,21,17,0.55),0_0_12px_rgba(199,154,61,0.35)] hover:border-gold-400 active:translate-y-0 active:scale-[0.98]"
          >
            <span className="relative z-10">Browse Dispatches</span>
            <span className="relative z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-gold-500 group-hover:text-emerald-950">
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </span>
          </a>
        }
      />

      {/* 
        ======================================================================
        1. CATEGORY FILTER & ARTICLES GRID
        ======================================================================
      */}
      <section id="articles" className="py-20 lg:py-28 bg-[#FAF6F0]">
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
                    : 'bg-white text-charcoal-700 hover:bg-ivory-600 border border-ivory-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-ivory-800 shadow-luxury hover:shadow-luxury-lg hover:-translate-y-1.5 hover:scale-[1.012] hover:border-gold-600/40 transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Featured Image Frame */}
                  <Link to={`/insights/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-emerald-950">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="emerald" size="sm">
                        {post.category}
                      </Badge>
                    </div>
                  </Link>

                  {/* Article Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-xs text-charcoal-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-emerald-950 group-hover:text-gold-700 transition-colors leading-snug mb-3">
                      <Link to={`/insights/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
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
                  <div className="pt-4 border-t border-ivory-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-charcoal-600 font-semibold">
                      <span>By {post.author.name}</span>
                    </div>

                    <Link
                      to={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900 group-hover:text-gold-600 transition-colors"
                    >
                      <span>Read Essay</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};
