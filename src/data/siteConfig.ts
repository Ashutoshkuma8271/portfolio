import { NavItem, SocialLink, StatItem } from '../types';
// Focus-area photography, supplied by the client. Local imports rather than
// remote stock URLs: they get hashed, cached and bundled by Vite, and the
// page no longer depends on a third-party image host staying up.
import focusTrade from '../assets/images/focus/trade.webp';
import focusPartnerships from '../assets/images/focus/partnerships.webp';
import focusWomen from '../assets/images/focus/women.webp';
import focusCultural from '../assets/images/focus/cultural.webp';

export const siteConfig = {
  name: 'H.E. Zeenat Kureshi',
  shortName: 'Zeenat Kureshi',
  monogram: 'HZK',
  role: 'Trade Commissioner – GCC',
  subtitle: 'Trade Commissioner | Investor | Entrepreneur',
  fullTitle: 'Trade Commissioner – GCC | Investor | Entrepreneur | Global Connector',
  title: 'Film Producer | GCC–India Trade Commissioner | National President',
  tagline: 'Bridging Nations. Building Opportunities.',
  shortBio: 'Advancing India–GCC trade, investment and strategic partnerships for a more prosperous tomorrow.',
  
  heroQuote: {
    text: "Economic diplomacy is about people, possibilities and a shared future.",
    author: "H.E. Zeenat Kureshi",
    role: "Trade Commissioner – GCC"
  },

  heroValues: [
    'Stronger Economies',
    'Deeper Partnerships',
    'A Brighter Tomorrow'
  ],

  contact: {
    email: 'contact@zeenatkureshi.com',
    tradeDeskEmail: 'trade.commissioner@zeenatkureshi.com',
    mediaEmail: 'press@zeenatkureshi.com',
    phone: '+971 4 000 0000 / +91 98200 00000',
    whatsappNumber: '919820000000', // Without '+' for wa.me link
    whatsappDisplay: '+91 98200 00000',
    location: 'Mumbai • New Delhi • Dubai',
    primaryOffice: 'Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051, India',
    uaeOffice: 'Dubai International Financial Centre (DIFC), Dubai, UAE',
    workingHours: 'Mon – Fri: 09:30 AM – 06:30 PM IST / GST',
  },

  navItems: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Trade & Investment', path: '/trade-investment' },
    { label: 'Leadership', path: '/women-leadership' },
    { label: 'Media & Press', path: '/media-press' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' },
  ] as NavItem[],

  socialLinks: [
    { platform: 'linkedin', url: 'https://in.linkedin.com/in/zeenat-kureshi-202a62219/', label: 'LinkedIn' },
    { platform: 'instagram', url: 'https://www.instagram.com/zeennatkuresshi/', label: 'Instagram' },
    { platform: 'facebook', url: 'https://www.facebook.com/zeenathkureshe/', label: 'Facebook' },
    { platform: 'youtube', url: 'https://www.youtube.com/@zeenatkureshiofficial', label: 'YouTube' },
    { platform: 'x', url: 'https://x.com/zeenatkureshi', label: 'X (Twitter)' },
    { platform: 'whatsapp', url: 'https://wa.me/919820000000', label: 'WhatsApp' },
  ] as SocialLink[],
  imdbUrl: 'https://www.imdb.com/name/nm16165017/',

  stats: [
    { value: '50+', label: 'International Engagements', subtext: 'High-level diplomatic & bilateral forums' },
    { value: '100+', label: 'Business Delegations', subtext: 'Cross-border commerce & sovereign summits' },
    { value: 'Strategic Partnerships', label: 'Across GCC', subtext: 'UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait' },
    { value: 'A Stronger', label: 'India–GCC Future', subtext: 'Sustainable economic corridors & cultural ties' },
  ] as StatItem[],

  focusAreas: [
    {
      id: 'trade',
      title: 'Trade & Commerce',
      description: 'Accelerating bilateral market access and cross-border commercial corridors.',
      link: '/trade-investment',
      image: focusTrade,
    },
    {
      id: 'media',
      title: 'Media & Cultural Cinema',
      description: 'Championing cross-border film co-productions and cultural diplomacy.',
      link: '/media-press',
      image: focusCultural,
    },
    {
      id: 'women-leadership',
      title: 'Women Leadership',
      description: 'Institutionalizing grassroots female empowerment and legal literacy nationwide.',
      link: '/women-leadership',
      image: focusWomen,
    },
    {
      id: 'investment-advisory',
      title: 'Investment Advisory',
      description: 'Connecting sovereign funds, family offices, and high-growth enterprise capital.',
      link: '/trade-investment',
      image: focusPartnerships,
    },
  ],

  collaborations: [
    {
      country: 'India',
      label: 'Government of India',
      code: 'IND',
      flag: '🇮🇳'
    },
    {
      country: 'UAE',
      label: 'UAE',
      code: 'UAE',
      flag: '🇦🇪'
    },
    {
      country: 'Saudi Arabia',
      label: 'Saudi Arabia',
      code: 'KSA',
      flag: '🇸🇦'
    },
    {
      country: 'Qatar',
      label: 'Qatar',
      code: 'QAT',
      flag: '🇶🇦'
    },
    {
      country: 'Bahrain',
      label: 'Bahrain',
      code: 'BHR',
      flag: '🇧🇭'
    },
    {
      country: 'Oman',
      label: 'Oman',
      code: 'OMN',
      flag: '🇴🇲'
    },
    {
      country: 'Kuwait',
      label: 'Kuwait',
      code: 'KWT',
      flag: '🇰🇼'
    },
  ],

  featuredMediaLogos: [
    { name: 'Khaleej Times', label: 'Khaleej Times' },
    { name: 'Gulf News', label: 'Gulf News' },
    { name: 'The Economic Times', label: 'The Economic Times' },
    { name: 'Arabian Business', label: 'Arabian Business' },
    { name: 'Hindustan Times', label: 'Hindustan Times' },
    { name: 'CNBC-TV18', label: 'CNBC-TV18' },
  ],
};
