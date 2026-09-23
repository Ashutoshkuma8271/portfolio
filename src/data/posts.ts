import { BlogPost } from '../types';
import cinemaCultureImg from '../assets/images/focus/cinema-culture-hd.png';
import policyGovernanceImg from '../assets/images/focus/policy-governance-hd.png';
import globalTradeImg from '../assets/images/focus/global-trade-hd.png';
import focusWomen from '../assets/images/focus/women.webp';
import heroPortrait from '../assets/images/hero/hero-commissioner-lg.webp';

/**
 * ============================================================================
 * HEADLESS CMS INTEGRATION POINT (Sanity / Strapi / Contentful / Ghost)
 * ----------------------------------------------------------------------------
 * In production with a Headless CMS, replace this static array with an async
 * fetch function, e.g.:
 *   export const getPosts = async () => client.fetch('*[_type == "post"]');
 * ============================================================================
 */

export const blogPosts: BlogPost[] = [
  {
    slug: 'india-gcc-landscape-report-5-year-journey',
    title: 'India GCC Landscape Report: The 5-Year Journey of Tech Corridors & Sovereign Capital',
    category: 'Policy & Governance',
    date: 'September 2024',
    readTime: '8 min read',
    excerpt: 'Key insights from the landmark Nasscom & Zinnov research on GCC capability centers, bilateral trade corridors, and sovereign enterprise expansion between India and the Gulf.',
    author: {
      name: 'Zeenat Kureshi',
      role: 'GCC–India Trade Commissioner',
      avatar: heroPortrait
    },
    featuredImage: policyGovernanceImg,
    tags: ['Nasscom', 'Zinnov', 'GCC', 'Capability Centers', 'Bilateral Commerce', 'Policy'],
    content: [
      "The landmark India GCC Landscape Report ('The 5-Year Journey'), conducted by Nasscom with Zinnov and industry partners, details the transformation of cross-border enterprise architecture, Global Capability Centers (GCCs), and bilateral commerce between India and the Gulf region.",
      "Over the past five years, bilateral technological and economic collaboration has deepened dramatically, establishing resilient commercial pipelines across renewable energy, advanced logistics, digital infrastructure, and sovereign investment syndication.",
      "### Strategic Pillars of the 5-Year Journey",
      "From high-value enterprise innovation hubs to sovereign trade treaties like CEPA, India and the GCC have created the most dynamic South-South economic growth corridor in modern history.",
      "Our office continues to accelerate these high-impact partnerships, ensuring seamless capital deployment, diplomatic alignment, and sustainable cross-border market entry for sovereign and private sector leaders alike."
    ]
  },
  {
    slug: 'india-gcc-cepa-trade-corridor-100b',
    title: 'The Road to $100 Billion: How the India-UAE CEPA is Redefining Non-Oil Commerce',
    category: 'Global Trade',
    date: 'August 28, 2024',
    readTime: '6 min read',
    excerpt: 'An in-depth analysis of tariff liberalizations, gems and jewelry quotas, and renewable supply chains powering the fastest-growing bilateral corridor in the Global South.',
    author: {
      name: 'Zeenat Kureshi',
      role: 'GCC–India Trade Commissioner',
      avatar: heroPortrait
    },
    featuredImage: globalTradeImg,
    tags: ['CEPA', 'Bilateral Trade', 'GCC', 'Economic Policy', 'Investments'],
    content: [
      "The signing and operationalization of the Comprehensive Economic Partnership Agreement (CEPA) between the Republic of India and the United Arab Emirates marks a seismic inflection point in South-South economic architecture.",
      "Historically dominated by hydrocarbon flows, the bilateral trade basket has witnessed a dramatic structural pivot towards value-added goods: high-purity refined gems, precision engineering components, agro-technological outputs, and digital services.",
      "### The Impact of 0% Duty Schedules",
      "One of the most consequential mechanics of the treaty is the phased elimination of customs tariffs across more than 80% of tariff lines. For Indian micro-, small-, and medium-sized enterprises (MSMEs), this eliminates an average 5% tariff barrier, instantly enhancing price competitiveness against regional competitors.",
      "Simultaneously, the UAE serves as an unrivaled springboard for Indian manufacturing into Sub-Saharan Africa, Central Asia, and the wider Arabian Peninsula.",
      "### The Next Frontier: Green Hydrogen & Tech Sandboxes",
      "As we gaze into the 2025–2030 horizon, the convergence between Abu Dhabi's Masdar and India's National Green Hydrogen Mission will likely anchor the next $20 billion in bilateral capital allocations. Trade diplomacy must move in lockstep with technological pragmatism to ensure these capital conduits flow seamlessly."
    ]
  },
  {
    slug: 'cinema-as-diplomatic-soft-power',
    title: 'Beyond the Screen: Why Cinema Remains India’s Most Potent Diplomatic Soft Power in the Gulf',
    category: 'Cinema & Culture',
    date: 'June 14, 2024',
    readTime: '5 min read',
    excerpt: 'Exploring how cinematic co-productions and cultural storytelling bridge geopolitical divides and foster durable cross-border commercial goodwill.',
    author: {
      name: 'Zeenat Kureshi',
      role: 'Film Producer & Cultural Envoy',
      avatar: heroPortrait
    },
    featuredImage: cinemaCultureImg,
    tags: ['Cinema', 'Cultural Diplomacy', 'Soft Power', 'Film Production'],
    content: [
      "Cinema is rarely just entertainment; in its highest form, it is an ambassador of civilization. In the Gulf region, where diaspora ties span decades, cinema forms the emotional tapestry of bilateral relations.",
      "From the vintage eras of Raj Kapoor to contemporary pan-Indian blockbusters shot across Abu Dhabi and Dubai, visual storytelling has fostered mutual empathy and cultural familiarity long before formal trade treaties were signed.",
      "### Co-Productions as Strategic Investments",
      "When we structure an international co-production between Indian production houses and Gulf film commissions, we are doing more than securing scenic locations. We are activating reciprocal tax rebates, cross-pollinating technical crews, and building joint IP that resonates with 400 million Arabic and South Asian speakers worldwide.",
      "Storytelling humanizes diplomacy. It creates the cultural trust required for multi-billion dollar trade pacts to thrive."
    ]
  },
  {
    slug: 'grassroots-women-financial-sovereignty',
    title: 'Dismantling Structural Bottlenecks: A Blueprint for Grassroots Female Financial Sovereignty',
    category: 'Women Empowerment',
    date: 'April 02, 2024',
    readTime: '7 min read',
    excerpt: 'Insights from four years of leading the All India Jamiatul Quresh Women Cell: how micro-enterprise incubation and legal literacy yield intergenerational dividends.',
    author: {
      name: 'Zeenat Kureshi',
      role: 'National President, AIJQ Women Cell',
      avatar: heroPortrait
    },
    featuredImage: focusWomen,
    tags: ['Women In Leadership', 'Financial Literacy', 'Community Reform', 'Micro-Finance'],
    content: [
      "When a woman achieves economic independence, the ripple effect extends far beyond her personal balance sheet. Her children stay in school longer, family nutritional indicators rise, and community decision-making becomes inherently more balanced.",
      "Yet, across emerging economies, millions of capable women remain locked out of formal banking institutions due to collateral requirements, complex paperwork, or societal discouragement.",
      "### The AIJQ Women Cell Model",
      "Through our work across 14 states, we realized that financial literacy without vocational tools is incomplete, and vocational tools without legal rights awareness are fragile.",
      "By integrating digital banking literacy with direct market access (e-commerce platforms and exhibition bazaars) alongside pro-bono legal counseling, we create an impenetrable safety net for female entrepreneurs. True empowerment is not charity; it is the institutional unlocking of inherent potential."
    ]
  },
  {
    slug: 'saudi-vision-2030-indian-enterprise',
    title: 'Navigating Saudi Vision 2030: Strategic Opportunities for Indian EPC & Tech Leaders',
    category: 'Policy & Governance',
    date: 'January 19, 2024',
    readTime: '6 min read',
    excerpt: 'Key strategies for Indian enterprises seeking to qualify for giga-project procurement in NEOM, the Red Sea, and Riyadh’s urban revitalization.',
    author: {
      name: 'Zeenat Kureshi',
      role: 'GCC–India Trade Commissioner',
      avatar: heroPortrait
    },
    featuredImage: policyGovernanceImg,
    tags: ['Saudi Vision 2030', 'Infrastructure', 'EPC', 'FDI', 'Policy'],
    content: [
      "The scale and velocity of transformation underway in the Kingdom of Saudi Arabia under Vision 2030 is unparalleled in modern economic history. From the futuristic linear city of NEOM to massive renewable desalination installations, the capital expenditure commitments are extraordinary.",
      "For Indian engineering, procurement, and construction (EPC) firms, the window of opportunity is historic. However, success requires adapting to the Kingdom’s localized value creation metrics (Iktva) and establishing enduring joint ventures rather than transactional vendor relationships.",
      "Strategic alignment with local regulatory bodies and deep understanding of cultural protocols remain the bedrock of successful entry into Saudi Arabia's premier commercial corridors."
    ]
  }
];

