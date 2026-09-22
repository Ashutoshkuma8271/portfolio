import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Badge } from '../components/ui/Badge';
import { SEO } from '../components/ui/SEO';
import { blogPosts } from '../data/posts';
import { 
  Clock, 
  ArrowLeft, 
  Twitter,
  Linkedin,
  MessageCircle
} from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/insights" replace />;
  }

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(`${post.title} by Zeenat Kureshi`);

  return (
    <div className="overflow-hidden">
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        articlePublishedTime={post.date}
        image={post.featuredImage}
      />

      {/* Article Hero Banner */}
      <section className="bg-emerald-950 text-ivory-500 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-gold-600/20 relative">
        <Container size="md">
          <Badge variant="gold" className="mb-4">
            {post.category}
          </Badge>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory-500 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-ivory-700 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gold-600 text-emerald-950 flex items-center justify-center font-serif font-bold text-sm">
                ZK
              </div>
              <span className="text-ivory-500 font-semibold">{post.author.name}</span>
            </div>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gold-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </Container>
      </section>

      {/* Article Body */}
      <section className="py-16 lg:py-24 bg-ivory-500">
        <Container size="md">
          {/* Featured Image Frame */}
          <div className="rounded-3xl overflow-hidden border border-gold-500/30 shadow-luxury-lg mb-12 bg-emerald-950 aspect-[16/9]">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Editorial Content */}
          <div className="prose prose-lg max-w-none text-charcoal-800 font-light leading-relaxed space-y-6">
            <p className="text-xl sm:text-2xl font-serif italic text-emerald-950 leading-relaxed border-l-4 border-gold-500 pl-6 py-2 bg-white rounded-r-2xl">
              "{post.excerpt}"
            </p>

            {post.content.map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3
                    key={idx}
                    className="font-serif text-2xl font-bold text-emerald-950 pt-6 pb-2 border-b border-ivory-800"
                  >
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={idx} className="text-base sm:text-lg leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Tags & Social Share Bar */}
          <div className="mt-16 pt-8 border-t border-ivory-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-label font-bold text-charcoal-600 mr-2">
                Topics:
              </span>
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-xs uppercase font-label text-gold-800 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-label font-bold text-charcoal-600">
                Share:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-ivory-800 hover:border-gold-500 text-charcoal-700 hover:text-gold-700 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Share on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-ivory-800 hover:border-gold-500 text-charcoal-700 hover:text-gold-700 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-ivory-800 hover:border-gold-500 text-charcoal-700 hover:text-gold-700 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Author Bio Box */}
          <div className="mt-12 bg-white p-8 rounded-3xl border border-ivory-800 shadow-luxury flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-gold-500 flex items-center justify-center text-gold-400 font-serif font-bold text-2xl shrink-0 shadow-md">
              ZK
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-emerald-950 mb-1">
                About {post.author.name}
              </h4>
              <p className="text-xs uppercase tracking-wider font-label font-semibold text-gold-700 mb-3">
                {post.author.role}
              </p>
              <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed">
                Appointed GCC–India Trade Commissioner, National President of All India Jamiatul Quresh Women Cell, and acclaimed Film Producer pioneering international economic and cultural diplomacy.
              </p>
            </div>
          </div>

          {/* Back to Insights Navigation */}
          <div className="mt-12 text-center">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-xs uppercase font-label font-bold tracking-widest text-emerald-900 hover:text-gold-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Insights</span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};
