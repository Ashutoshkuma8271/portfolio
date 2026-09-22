import { TimelineEvent, InternationalRole, AwardItem } from '../types';

export const aboutData = {
  headline: 'Architect of Bilateral Commerce, Cinema Visionary & Transformational Leader',
  eyebrow: 'BIOGRAPHY & LEADERSHIP',
  shortIntro: 'Zeenat Kureshi stands at the convergence of international economic diplomacy, high-impact cinematic production, and civic leadership. As GCC–India Trade Commissioner and National President of the All India Jamiatul Quresh Women Cell, she mobilizes cross-border enterprise and grassroots empowerment.',
  
  bioParagraphs: [
    "With over two decades of multifaceted executive and public leadership, Zeenat Kureshi has established herself as a trusted liaison between sovereign trade bodies, high-net-worth family offices in the Gulf Cooperation Council (GCC), and India's rapidly expanding commercial landscape.",
    "Her diplomatic and commercial stewardship has facilitated landmark joint ventures across renewable energy, agro-commodities, logistics, healthcare technology, and entertainment infrastructure. Her unique acumen combines rigorous regulatory understanding with an innate capability to navigate high-stakes bilateral negotiations.",
    "Beyond economic corridors, Zeenat is a trailblazer in Indian cinema, producing internationally celebrated feature films and documentaries that challenge societal status quos, illuminate heritage narratives, and foster international cultural diplomacy.",
    "As National President of the All India Jamiatul Quresh Women Cell, she spearheads policy advocacy, financial literacy, vocational incubation, and legal aid networks impacting over 50,000 women across 14 Indian states."
  ],

  leadershipPillars: [
    {
      title: 'Economic Diplomacy',
      description: 'Catalyzing cross-border foreign direct investments (FDI), resolving trade friction points, and structuring sovereign-aligned private partnerships.',
    },
    {
      title: 'Cultural Storytelling',
      description: 'Leveraging feature cinema and global co-productions as powerful instruments of soft power, intercultural understanding, and socio-economic critique.',
    },
    {
      title: 'Civic & Gender Equality',
      description: 'Dismantling socio-economic barriers through institutionalized micro-finance access, leadership mentorship, and grassroots community defense.',
    },
    {
      title: 'Institutional Governance',
      description: 'Advising industry chambers, parliamentary delegations, and bilateral business councils on sustainable trade treaties and ethical investment benchmarks.',
    }
  ],

  timeline: [
    {
      year: '2024–Present',
      title: 'GCC–India Trade Commissioner',
      organization: 'India–GCC Bilateral Trade Chamber',
      description: 'Spearheading high-level sovereign delegations across Dubai, Riyadh, Doha, and New Delhi. Advising on CEPA implementation and multi-million dollar cross-border trade corridors.',
      category: 'Trade',
      location: 'Dubai & New Delhi'
    },
    {
      year: '2021–Present',
      title: 'National President',
      organization: 'All India Jamiatul Quresh Women Cell',
      description: 'Elected to lead nationwide women empowerment initiatives, skill development centers, and educational endowments across 14 state chapters.',
      category: 'Leadership',
      location: 'National (India)'
    },
    {
      year: '2019–Present',
      title: 'Founder & Principal Producer',
      organization: 'Zeenat Kureshi Productions & Media Ventures',
      description: 'Produced award-winning feature narratives and international documentaries screened at Cannes, IFFI Goa, and Dubai International Film Festival.',
      category: 'Cinema',
      location: 'Mumbai'
    },
    {
      year: '2016–2019',
      title: 'Senior Advisor for Middle East Commerce',
      organization: 'Global Business Alliances Forum',
      description: 'Advised Tier-1 Indian conglomerates on UAE Free Zone incorporation, tax treaty alignment, and strategic joint ventures in Saudi Arabia (Vision 2030 initiatives).',
      category: 'Trade',
      location: 'Abu Dhabi & Mumbai'
    },
    {
      year: '2012–2016',
      title: 'Chairperson for Community Welfare & Education',
      organization: 'National Socio-Economic Council',
      description: 'Instituted vocational training academies for underprivileged young women and pioneered state-level scholarship programs in tertiary education.',
      category: 'Philanthropy',
      location: 'Maharashtra & Delhi'
    }
  ] as TimelineEvent[],

  internationalRoles: [
    {
      title: 'Trade Commissioner (GCC & Middle East)',
      organization: 'India-GCC Trade & Commerce Council',
      region: 'UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait',
      period: '2023 – Present',
      responsibilities: [
        'Strategic facilitation of sovereign and private investments exceeding ₹3,750+ Crores ($450M+)',
        'Direct engagement with ministerial delegations and Chambers of Commerce',
        'Promotion of Indian manufacturing, food security, and green energy in the Gulf',
      ],
      iconName: 'Globe'
    },
    {
      title: 'Member of Executive Board',
      organization: 'World Women Leadership & Economic Congress',
      region: 'MENA & South Asia',
      period: '2022 – Present',
      responsibilities: [
        'Keynote speaker on female entrepreneurship in emerging markets',
        'Framing international policy recommendations for women-led SMEs',
        'Cross-border mentorship matching for female founders',
      ],
      iconName: 'ShieldCheck'
    },
    {
      title: 'Cultural Envoy & Jury Member',
      organization: 'Indo-Arab Cinema & Arts Foundation',
      region: 'International',
      period: '2020 – Present',
      responsibilities: [
        'Curating bilateral film festivals celebrating Indo-Arab cinematic heritage',
        'Facilitating co-production incentives and filming treaties between UAE and India',
      ],
      iconName: 'Film'
    }
  ] as InternationalRole[],

  awards: [
    {
      title: 'Global Statesperson of the Year (Bilateral Commerce)',
      year: '2024',
      issuer: 'Indo-Gulf Leadership Summit, Dubai',
      description: 'Awarded in recognition of exceptional service in strengthening economic ties between India and GCC sovereign markets.',
      category: 'Diplomacy & Trade'
    },
    {
      title: 'National Women Icon Award',
      year: '2023',
      issuer: 'Ministry of Social Justice & Empowerment Forum',
      description: 'Conferred for transformative leadership in grassroots women empowerment and nationwide community development.',
      category: 'Leadership'
    },
    {
      title: 'Golden Peacock Award for Excellence in Cinema',
      year: '2022',
      issuer: 'International Film & Arts Conclave',
      description: 'Honored for producing socially resonant cinema spotlighting gender equality and cultural harmony.',
      category: 'Cinema'
    },
    {
      title: 'Excellence in Cross-Border Advisory',
      year: '2021',
      issuer: 'Middle East Business Leadership Council',
      description: 'Recognized for structuring resilient FDI joint ventures during volatile macroeconomic cycles.',
      category: 'Trade'
    },
    {
      title: 'Rashtriya Samaj Seva Puraskar',
      year: '2019',
      issuer: 'All India Civic Federation',
      description: 'Acknowledging dedicated social reform, educational stipends, and medical relief for disadvantaged women.',
      category: 'Philanthropy'
    }
  ] as AwardItem[]
};
