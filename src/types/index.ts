export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'instagram' | 'x' | 'youtube' | 'whatsapp';
  url: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
}

export interface VerticalItem {
  id: string;
  title: string;
  role: string;
  description: string;
  iconName: string;
  link: string;
  featuredQuote?: string;
  highlights: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  organization: string;
  description: string;
  category: 'Trade' | 'Cinema' | 'Leadership' | 'Philanthropy';
  location?: string;
}

export interface InternationalRole {
  title: string;
  organization: string;
  region: string;
  period: string;
  responsibilities: string[];
  iconName: string;
}

export interface AwardItem {
  title: string;
  year: string;
  issuer: string;
  description: string;
  category: string;
}

export interface TradeInitiative {
  id: string;
  title: string;
  corridor: string;
  description: string;
  impactMetrics: string;
  sectors: string[];
}

export interface MarketEntryStep {
  step: number;
  title: string;
  description: string;
  deliverables: string[];
}

export interface AdvisoryService {
  title: string;
  description: string;
  benefits: string[];
  iconName: string;
}

export interface MediaArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  excerpt: string;
  url: string;
  imageUrl?: string;
  tag: string;
}

export interface VideoInterview {
  id: string;
  title: string;
  channel: string;
  date: string;
  duration: string;
  youtubeId: string;
  /** Optional override. Omit it and the still is derived from `youtubeId`,
      which keeps the card in step with the live YouTube thumbnail. */
  thumbnailUrl?: string;
  topic: string;
}

export interface SpeakingEngagement {
  title: string;
  event: string;
  location: string;
  date: string;
  role: 'Keynote Speaker' | 'Panelist' | 'Chief Guest' | 'Chairperson';
  topic: string;
}

export interface WomenCellInitiative {
  id: string;
  title: string;
  description: string;
  impact: string;
  beneficiaries: string;
  iconName: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  /** ISO dates (YYYY-MM-DD) so the page can tell upcoming from past on its own. */
  startsOn: string;
  endsOn: string;
  time: string;
  location: string;
  type: 'Virtual' | 'In-Person' | 'Hybrid';
  description: string;
  seats: string;
  status: 'Open' | 'Filling Fast' | 'Closed';
}

export interface BlogPost {
  slug: string;
  title: string;
  category: 'Global Trade' | 'Cinema & Culture' | 'Women Empowerment' | 'Policy & Governance';
  date: string;
  readTime: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  content: string[];
  tags: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  caption: string;
  category: 'All' | 'Trade' | 'Leadership' | 'Cinema' | 'Global Events';
  imageUrl: string;
  date?: string;
  location?: string;
}
