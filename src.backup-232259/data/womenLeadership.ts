import { WomenCellInitiative, EventItem } from '../types';

export const womenLeadershipData = {
  hero: {
    eyebrow: 'COMMUNITY & GENDER TRANSFORMATION',
    title: 'All India Jamiatul Quresh Women Cell',
    subtitle: 'Under the National Presidency of Zeenat Kureshi',
    description: 'A transformative socio-civic movement mobilizing grassroots women across 14 Indian states through education, vocational incubation, health accessibility, and institutional leadership development.',
  },

  missionStatement: {
    quote: "True community advancement is impossible when half its populace remains on the periphery. Our mission is to transform every daughter into a self-reliant architect of economic and social dignity.",
    author: "Zeenat Kureshi",
    designation: "National President, All India Jamiatul Quresh Women Cell"
  },

  pillars: [
    {
      title: 'Economic Self-Sufficiency',
      description: 'Incubating micro-enterprises, imparting advanced tailoring, digital bookkeeping, and artisanal export linkages.',
      stat: '18,500+ Micro-Enterprises Funded'
    },
    {
      title: 'Higher Education Endowments',
      description: 'Scholarships for girls pursuing degrees in law, medicine, engineering, civil services, and media arts.',
      stat: '12,000+ Scholarships Disbursed'
    },
    {
      title: 'Legal Literacy & Family Counseling',
      description: 'Dedicated legal aid cells providing dispute resolution, property rights defense, and domestic protection counseling.',
      stat: '3,200+ Cases Resolved Without Litigation'
    },
    {
      title: 'Preventative Health & Nutrition',
      description: 'Statewide maternal health camps, adolescent nutrition programs, and subsidized diagnostic partnerships.',
      stat: '65,000+ Health Checkups Conducted'
    }
  ],

  initiatives: [
    {
      id: 'hunnar-shakti',
      title: 'Project "Hunar Shakti" — Vocational Incubation Centers',
      description: 'State-of-the-art training centers established in Mumbai, Delhi, Lucknow, Hyderabad, and Ahmedabad equipping women with modern culinary arts, computer programming, fashion designing, and e-commerce selling skills.',
      impact: 'Over 82% of graduates establish home-based micro-enterprises or secure formal employment within 6 months.',
      beneficiaries: '22,000+ Trainees to date',
      iconName: 'Briefcase'
    },
    {
      id: 'taleem-e-niswan',
      title: 'Project "Taleem-e-Niswan" — Girls Tertiary Education Fund',
      description: 'Targeted tuition stipends, digital laptop grants, and university admission mentorship for girls from economically vulnerable households, ensuring zero dropout rates after high school.',
      impact: '100% completion rate among scholarship recipients, with over 350 girls entering civil services and corporate roles.',
      beneficiaries: '12,000+ Students Supported',
      iconName: 'GraduationCap'
    },
    {
      id: 'adalat-e-nisa',
      title: 'Legal Defense & Women Protection Helpline',
      description: 'A round-the-clock grievance redressal network staffed by senior female advocates, psychologists, and community mediators offering confidential guidance on matrimonial, property, and civil rights.',
      impact: 'Reduced formal litigation stress by achieving amicably mediated settlements in 85% of domestic property disputes.',
      beneficiaries: '3,400+ Free Legal Consultations',
      iconName: 'Scale'
    },
    {
      id: 'swasthya-chetna',
      title: 'Maternal & Reproductive Health Caravans',
      description: 'Mobile medical clinics visiting urban slums and rural hamlets, providing free breast cancer screenings, anemia treatments, gynecological consultations, and sanitary hygiene kits.',
      impact: 'Early detection of high-risk pregnancies and severe nutritional deficiencies in over 4,500 mothers.',
      beneficiaries: '65,000+ Women & Infants',
      iconName: 'HeartPulse'
    }
  ] as WomenCellInitiative[],

  upcomingEvents: [
    {
      id: 'national-conclave-2024',
      title: 'National Women Leadership & Entrepreneurship Conclave 2024',
      date: 'November 15–16, 2024',
      time: '09:30 AM – 05:30 PM IST',
      location: 'Vigyan Bhawan, New Delhi',
      type: 'In-Person',
      description: 'A flagship two-day gathering of female parliamentarians, civil society leaders, venture capitalists, and grassroots champions celebrating breakthroughs in female leadership.',
      seats: '500 Delegates (Registration Mandatory)',
      status: 'Filling Fast'
    },
    {
      id: 'artisan-bazaar-mumbai',
      title: 'Annual Quresh Artisan & Craft Exhibition',
      date: 'December 20–22, 2024',
      time: '11:00 AM – 08:00 PM IST',
      location: 'World Trade Centre (WTC), Mumbai',
      type: 'In-Person',
      description: 'Showcasing handcrafted textiles, jewelry, spices, and gourmet foods crafted by women entrepreneurs incubated under Project Hunar Shakti.',
      seats: 'Open to Public & B2B Buyers',
      status: 'Open'
    },
    {
      id: 'webinar-financial-freedom',
      title: 'Masterclass: Digital Banking, Micro-Loans & Sovereign Grants for Women',
      date: 'January 10, 2025',
      time: '04:00 PM – 06:00 PM IST',
      location: 'Live Zoom & YouTube Broadcast',
      type: 'Virtual',
      description: 'Practical financial literacy training detailing government subsidies (Mudra loans, Stand-Up India) and smart digital accounting.',
      seats: 'Unlimited Virtual Seats',
      status: 'Open'
    }
  ] as EventItem[]
};
