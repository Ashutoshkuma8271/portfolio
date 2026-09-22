import { TradeInitiative, MarketEntryStep, AdvisoryService } from '../types';

export const tradeData = {
  hero: {
    eyebrow: 'GCC–INDIA ECONOMIC ARTERY',
    title: 'Unlocking High-Yield Bilateral Trade & Sovereign Investment Corridors',
    description: 'Providing strategic counsel, governmental alignment, and bespoke market-entry roadmaps for enterprises, sovereign funds, and high-net-worth investors across the GCC and India.',
  },

  tradeStats: [
    { value: '₹3,750+ Cr', label: 'Bilateral Deal Volume Facilitated', subtext: 'In energy, commodities, tech, and infra ($450M+)' },
    { value: '18+', label: 'High-Level Trade Delegations', subtext: 'Connecting GCC Ministers and Indian State Leadership' },
    { value: '94%', label: 'Joint Venture Success Rate', subtext: 'Through de-risked regulatory frameworks' },
    { value: '6 GCC States', label: 'Direct Institutional Network', subtext: 'UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait' },
  ],

  initiatives: [
    {
      id: 'cepa-acceleration',
      title: 'India-UAE Comprehensive Economic Partnership (CEPA) Acceleration',
      corridor: 'New Delhi • Mumbai ⟷ Dubai • Abu Dhabi',
      description: 'Operationalizing preferential tariff schedules and duty exemptions for high-value Indian manufacturing and agricultural exports into the United Arab Emirates and broader GCC redistribution hubs.',
      impactMetrics: '₹1,500+ Cr ($180M+) export volume enabled with 0% duty advantages',
      sectors: ['Agro-Commodities', 'Gems & Jewelry', 'Textiles', 'Renewable Components']
    },
    {
      id: 'saudi-vision-2030',
      title: 'Saudi Vision 2030 Inbound Infrastructure Corridor',
      corridor: 'India ⟷ Riyadh • Jeddah • NEOM',
      description: 'Facilitating consortium partnerships between leading Indian engineering/EPC contractors and Saudi gigaproject developers under the Kingdom’s Vision 2030 transformation agenda.',
      impactMetrics: 'Strategic advisory on ₹1,000+ Cr ($120M+) turnkey EPC bids',
      sectors: ['Smart Infrastructure', 'Renewable Energy', 'Civil Engineering', 'Digital Twins']
    },
    {
      id: 'qatar-oman-logistics',
      title: 'Maritime Trade & Food Security Gateway',
      corridor: 'Gujarat / Maharashtra ⟷ Doha • Muscat • Salalah',
      description: 'Structuring resilient cold-chain maritime corridors and dedicated food-grain supply pacts guaranteeing bilateral food security and accelerated port customs clearance.',
      impactMetrics: '45,000 MT agro-cargo monthly throughput secured',
      sectors: ['Cold-Chain Logistics', 'Food Processing', 'Port Operations', 'Grain Terminals']
    },
    {
      id: 'fintech-crossborder',
      title: 'Cross-Border Fintech & Sovereign Wealth Placements',
      corridor: 'Mumbai / GIFT City ⟷ DIFC • ADGM',
      description: 'Connecting Indian technology unicorns and late-stage growth ventures with institutional LP capital, sovereign family offices, and cross-border regulatory sandboxes.',
      impactMetrics: '₹1,250+ Cr ($150M+) private equity and LP commitments coordinated',
      sectors: ['Fintech', 'HealthTech', 'Enterprise SaaS', 'Green Hydrogen']
    }
  ] as TradeInitiative[],

  marketEntryProcess: [
    {
      step: 1,
      title: 'Bilateral Feasibility & Regulatory Diagnostic',
      description: 'Comprehensive evaluation of target market tariffs, local partner requisites, Double Taxation Avoidance Agreements (DTAA), and CEPA benefit qualification.',
      deliverables: ['Regulatory Viability Blueprint', 'Tariff & Duty Optimization Model', 'Jurisdiction Selection (Free Zone vs. Mainland)']
    },
    {
      step: 2,
      title: 'Governmental & Ministerial Stakeholder Alignment',
      description: 'Leveraging diplomatic access to interface directly with Chambers of Commerce, investment promotion agencies (e.g. Invest India, Dubai FDI, MISA), and trade ministries.',
      deliverables: ['Ministerial Briefings', 'Expedited Regulatory Clearances', 'Incentive Negotiation Protocol']
    },
    {
      step: 3,
      title: 'Counterparty Vetting & JV Partner Structuring',
      description: 'Rigorous due diligence on local sponsors, distribution partners, and institutional investors to ensure ethical compliance, financial health, and strategic synergy.',
      deliverables: ['Counterparty Due Diligence Dossier', 'Joint Venture Term Sheets', 'Governance & Dispute Resolution Architecture']
    },
    {
      step: 4,
      title: 'Entity Setup, Licensing & Banking Infrastructure',
      description: 'End-to-end facilitation of corporate incorporation, capital repatriation arrangements, and institutional banking relationships in premier financial centers.',
      deliverables: ['Corporate Entity Formation', 'Multi-Currency Bank Account Opening', 'Trade License & Customs Registration']
    },
    {
      step: 5,
      title: 'Commercial Scale-Up & Ongoing Trade Advisory',
      description: 'Active governance support, delegation hosting, dispute mitigation, and commercial scaling strategies across neighboring GCC and South Asian economies.',
      deliverables: ['Quarterly Trade Governance Reviews', 'B2B Matchmaking Delegations', 'Expansion Roadmaps']
    }
  ] as MarketEntryStep[],

  advisoryServices: [
    {
      title: 'Sovereign & Ministerial Delegation Management',
      description: 'Conceptualizing, curating, and leading high-profile bilateral business delegations with direct access to sovereign ministers, royal court representatives, and enterprise CEOs.',
      benefits: ['High-level diplomatic protocol adherence', 'Curated private B2B roundtables', 'Media & press orchestration'],
      iconName: 'Building2'
    },
    {
      title: 'Cross-Border M&A and Joint Venture Structuring',
      description: 'Structuring cross-border mergers, equity acquisitions, and joint ventures designed to maximize tax efficiency and safeguard intellectual property rights.',
      benefits: ['DTAA and CEPA treaty optimization', 'Ironclad shareholder agreements', 'Dispute mitigation under international arbitration'],
      iconName: 'Scale'
    },
    {
      title: 'Foreign Direct Investment (FDI) Syndication',
      description: 'Connecting high-growth Indian sectors with Gulf sovereign wealth funds (SWFs), private family offices, and institutional investors seeking diversified yield.',
      benefits: ['Access to premier GCC family offices', 'Bespoke investor pitch packaging', 'Regulatory sandbox approval support'],
      iconName: 'TrendingUp'
    },
    {
      title: 'Trade Policy Advocacy & Tariff Optimization',
      description: 'Representing commercial interests in bilateral policy dialogues, tariff classification appeals, and non-tariff barrier resolutions.',
      benefits: ['Direct representations to trade ministries', 'Harmonized System (HS) code optimization', 'Anti-dumping review advisory'],
      iconName: 'FileCheck'
    }
  ] as AdvisoryService[]
};
