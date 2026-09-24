import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  articlePublishedTime?: string;
}

const SITE_ORIGIN = 'https://zeenatkureshi.com';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = siteConfig.shortBio,
  keywords,
  image = '/og-image.jpg',
  url,
  type = 'website',
  articlePublishedTime,
}) => {
  const { pathname } = useLocation();
  // Each page is its own canonical (a site-wide default would mark every page a duplicate of Home).
  const canonical = url ?? `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`;
  // Link previews (WhatsApp, LinkedIn, X) need an absolute image URL.
  const imageUrl = /^https?:\/\//.test(image) ? image : `${SITE_ORIGIN}${image.startsWith('/') ? '' : '/'}${image}`;
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | ${siteConfig.title}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Structured Data / Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? "Article" : "Person",
          "name": "Zeenat Kureshi",
          "url": "https://zeenatkureshi.com",
          "jobTitle": "GCC-India Trade Commissioner & Film Producer",
          "worksFor": {
            "@type": "Organization",
            "name": "All India Jamiatul Quresh Women Cell"
          },
          "sameAs": siteConfig.socialLinks.map(s => s.url),
          ...(articlePublishedTime ? { "datePublished": articlePublishedTime } : {})
        })}
      </script>
    </Helmet>
  );
};
