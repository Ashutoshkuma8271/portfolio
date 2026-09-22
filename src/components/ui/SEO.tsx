import React from 'react';
import { Helmet } from 'react-helmet-async';
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

export const SEO: React.FC<SEOProps> = ({
  title,
  description = siteConfig.shortBio,
  keywords,
  image = '/og-image.jpg',
  url = 'https://zeenatkureshi.com',
  type = 'website',
  articlePublishedTime,
}) => {
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
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

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
