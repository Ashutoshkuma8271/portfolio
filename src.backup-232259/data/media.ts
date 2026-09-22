import { MediaArticle, VideoInterview, SpeakingEngagement } from '../types';

export const mediaData = {
  hero: {
    eyebrow: 'PUBLIC INTELLECT & PRESS',
    title: 'Media Coverage, Keynotes & Global Press Appearances',
    description: 'Archive of international broadcast interviews, leading print features, policy keynotes, and downloadable press assets.',
  },

  articles: [
    {
      id: 'tribune-india-luxury-diplomacy',
      title: "H.E. Zeenat Kureshi: India's first woman to hold the prestigious GCC-India Trade Commissioner role in luxury diplomacy",
      publication: 'The Tribune India',
      date: 'August 13, 2025',
      excerpt: 'Marking a historic milestone in international commerce, H.E. Zeenat Kureshi becomes the first Indian woman appointed as GCC-India Trade Commissioner, spearheading luxury diplomacy and high-value sovereign partnerships.',
      url: 'https://www.tribuneindia.com/news/business/h-e-zeenat-kureshi-indias-first-woman-to-hold-the-prestigious-gcc-india-trade-commissioner-role-in-luxury-diplomacy/',
      tag: 'Trade Diplomacy'
    },
    {
      id: 'ani-news-trade-commissioner',
      title: "H.E. Zeenat Kureshi: India's first woman to hold prestigious GCC-India Trade Commissioner role",
      publication: 'ANI News (Asian News International)',
      date: 'August 13, 2025',
      excerpt: 'Under an international chamber of commerce, Zeenat Kureshi takes charge of accelerating bilateral trade flows, investor delegations, and cross-border commerce between India and the 6 GCC nations.',
      url: 'https://www.aninews.in/news/business/he-zeenat-kureshi-indias-first-woman-to-hold-the-prestigious-gcc-india-trade-commissioner-role-in-luxury-diplomacy20250813172941/',
      tag: 'Bilateral Commerce'
    },
    {
      id: 'ahmedabad-mirror-centenary-honour',
      title: 'Zeenat Kureshi honoured at Jamiatul Quresh 100-Year Celebration for global contributions',
      publication: 'Ahmedabad Mirror',
      date: '2025',
      excerpt: 'National President of All India Jamiatul Quresh Women Cell, Zeenat Kureshi, is felicitated at the centenary landmark celebration for transformative leadership and nationwide empowerment.',
      url: 'https://www.ahmedabadmirror.com/zeenat-kureshi-honoured-at-jamiatul-quresh-100-year-celebration-for-global-contributions/81902575.html',
      tag: 'National Leadership'
    },
    {
      id: 'hindustan-metro-first-woman-commissioner',
      title: 'H.E. Zeenat Kureshi: First Indian Woman Trade Commissioner (GCC-India)',
      publication: 'Hindustan Metro',
      date: 'August 2025',
      excerpt: 'Highlighting strategic economic roadmaps, investment syndication, and cultural bridging across Mumbai, New Delhi, and the Gulf capitals.',
      url: 'https://www.hindustanmetro.com/h-e-zeenat-kureshi-first-indian-woman-trade-commissioner-gcc-india/',
      tag: 'Diplomacy & Trade'
    },
    {
      id: 'imdb-cinema-producer-profile',
      title: 'Zeenat Kureshi — Film Producer & Cultural Cinema Visionary',
      publication: 'IMDb (Internet Movie Database)',
      date: 'Official Filmography',
      excerpt: 'Official filmography and producer credits showcasing cross-border cinematic productions and cultural storytelling.',
      url: 'https://www.imdb.com/name/nm16165017/',
      tag: 'Film & Cinema'
    },
    {
      id: 'the-print-brics-summit-felicitation',
      title: 'United Diplomatic Council honours H.E. Zeenat Kureshi at BRICS Summit 2026',
      publication: 'ThePrint / Business Standard',
      date: 'September 2026',
      excerpt: 'Felicitated for exemplary statesmanship and pioneering initiatives in expanding the India–GCC bilateral trade corridor and women leadership.',
      url: 'https://theprint.in/',
      tag: 'Global Summits'
    }
  ] as MediaArticle[],

  videos: [
    {
      id: 'interview-1',
      title: 'H.E. Zeenat Kureshi — Keynote Address & GCC Bilateral Dialogue',
      channel: 'Official YouTube (@zeenatkureshiofficial)',
      date: '2025–2026',
      duration: 'Keynote',
      youtubeId: 'ndXivLGTZ6w',
      topic: 'GCC Trade & Luxury Diplomacy'
    },
    {
      id: 'interview-2',
      title: 'A Proud Moment! Zeenat Kureshi Returns to India as GCC Trade Commissioner 🇮🇳🌍',
      channel: 'Official YouTube (@zeenatkureshiofficial)',
      date: '2025',
      duration: 'Summit Brief',
      youtubeId: 'uZmFW5_KYzM',
      topic: 'National Recognition & Diplomatic Role'
    },
    {
      id: 'interview-3',
      title: 'Dubai vs India Capital Markets: Strategic Bilateral Real Estate & Sovereign Portfolios',
      channel: 'Business & GCC Insights (@zeennatkuresshi)',
      date: '2026',
      duration: 'Strategic Brief',
      youtubeId: 'ndXivLGTZ6w',
      topic: 'Investment Portfolios & Market Comparison'
    },
    {
      id: 'interview-4',
      title: 'Women in Cross-Border Leadership & Institutional Reform',
      channel: 'World Diplomatic Forum',
      date: '2026',
      duration: 'Panel Dialogue',
      youtubeId: 'ndXivLGTZ6w',
      topic: 'Women Empowerment & Global Ties'
    }
  ] as VideoInterview[],

  speakingEngagements: [
    {
      title: 'Chief Guest Address: India-GCC Trade Convergence Summit',
      event: 'Indo-Arab Business Conclave',
      location: 'Dubai World Trade Centre (DWTC), UAE',
      date: 'October 2024',
      role: 'Chief Guest',
      topic: 'Next-Generation Supply Chains & CEPA Optimization'
    },
    {
      title: 'Keynote: Women in Sovereign Finance & International Commerce',
      event: 'Global Economic Empowerment Forum',
      location: 'New Delhi, India',
      date: 'August 2024',
      role: 'Keynote Speaker',
      topic: 'Dismantling Structural Bottlenecks in Emerging Markets'
    },
    {
      title: 'Panel: Soft Power of Cinema in Bilateral Diplomacy',
      event: 'International Film & Diplomacy Conclave',
      location: 'Doha, Qatar',
      date: 'April 2024',
      role: 'Panelist',
      topic: 'Film Festivals as Catalysts for Geopolitical Goodwill'
    },
    {
      title: 'Chairperson Remarks: National Convention on Women Welfare',
      event: 'All India Jamiatul Quresh Annual Congress',
      location: 'Mumbai, India',
      date: 'January 2024',
      role: 'Chairperson',
      topic: 'Five-Year Vision for Nationwide Educational & Health Centers'
    }
  ] as SpeakingEngagement[],

  mediaKit: {
    title: 'Official Zeenat Kureshi Media & Press Kit 2024–2025',
    description: 'Comprehensive high-resolution press materials including official statesperson portraits, bio briefs (executive & concise), official designation titles, and approved speech transcripts for conference organizers and journalists.',
    fileSize: '14.2 MB',
    format: 'PDF + High-Res Asset Bundle',
    lastUpdated: 'August 2024',
    contents: [
      'Official high-resolution print & web portraits (RGB & CMYK)',
      'Approved executive bios (50-word, 150-word, and full biography)',
      'Protocol guidelines for introductions and stage remarks',
      'Factsheet on GCC-India trade facilitation & leadership milestones',
      'Official institutional logos & monograms'
    ]
  }
};
