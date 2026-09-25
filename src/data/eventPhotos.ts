import agrivoltaics from '../assets/images/events/agrivoltaics-conference.webp';
import unitedEconomicA from '../assets/images/events/united-economic-brics-a.webp';
import felicitation from '../assets/images/events/udc-brics-felicitation.webp';
import womenPanel from '../assets/images/events/udc-brics-women-panel.webp';
import udcStage from '../assets/images/events/udc-stage-delegation-arrival.webp';
import unitedEconomicB from '../assets/images/events/united-economic-brics-b.webp';

// High-Definition Official Press & Summit Photographs
import cinemaAwards from '../assets/images/events/cultural-cinema-honor-hd.png';
import mediaCinemaIndoArab from '../assets/images/events/media-cinema-indo-arab.webp';
import aaccCredential from '../assets/images/events/aacc-commissioner-credential-hd.jpg';
import aaccArabDelegation from '../assets/images/events/aacc-arab-delegation-summit.webp';
import bilateralAccord from '../assets/images/events/bilateral-accord-delegation.png';
import globalTradeSummit from '../assets/images/events/global-trade-summit-leaders.webp';
import tradeSummitAccord from '../assets/images/events/trade-summit-accord-hd.jpg';
import udcDiplomaticAward from '../assets/images/events/udc-diplomatic-award-hd.jpg';
import commonwealthLeadership from '../assets/images/events/commonwealth-leadership-banner-hd.jpg';
import gccNationsMedia from '../assets/images/events/gcc-nations-media-press-hd.jpg';
import insightsSummitDialogue from '../assets/images/events/insights-summit-dialogue-hd.jpg';
import bricsSummitContact from '../assets/images/events/brics-summit-contact-hd.jpg';
import aboutHeroBanner from '../assets/images/events/about-hero-banner-hd.webp';

export interface EventPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  event: string;
  date: string;
  location: string;
  alt: string;
  focal: string;
  /** Portrait frames need a different crop from landscape ones. */
  orientation: 'landscape' | 'portrait';
}

export const eventPhotos = {
  mediaCinema: {
    id: 'media-cinema-indo-arab',
    src: mediaCinemaIndoArab,
    title: 'Indo-Arab International Excellence Award — Media Fashion League',
    caption: 'H.E. Zeenat Kureshi on the red carpet at the Indo-Arab International Excellence Awards under the Media Fashion League banner.',
    event: 'Indo-Arab International Excellence Awards',
    date: '2025–2026',
    location: 'Dubai & New Delhi',
    alt: 'H.E. Zeenat Kureshi at the Indo-Arab International Excellence Awards on the red carpet',
    focal: '50% 25%',
    orientation: 'portrait',
  },
  cinemaAwards: {
    id: 'cinema-awards',
    src: cinemaAwards,
    title: 'Cultural Cinema & Creative Leadership Honor',
    caption: 'H.E. Zeenat Kureshi honored for exemplary contributions to purposeful storytelling, international film syndication, and cultural diplomacy.',
    event: 'National Cultural Cinema & Leadership Conclave',
    date: '2026',
    location: 'Mumbai & New Delhi, India',
    alt: 'H.E. Zeenat Kureshi portrait in ceremonial gold embroidered couture',
    focal: '50% 18%',
    orientation: 'portrait',
  },
  aaccCredential: {
    id: 'aacc-credential',
    src: aaccCredential,
    title: 'Asian Arab Chamber of Commerce — Trade Commissioner Accreditation',
    caption: 'Official appointment citation and credentials under the Asian Arab Chamber of Commerce (AACC).',
    event: 'Asian Arab Chamber of Commerce (AACC)',
    date: '2026',
    location: 'New Delhi & GCC Secretariat',
    alt: 'H.E. Zeenat Kureshi holding official Asian Arab Chamber of Commerce Trade Commissioner appointment certificate and citation',
    focal: '50% 25%',
    orientation: 'portrait',
  },
  aaccArabDelegation: {
    id: 'aacc-arab-delegation',
    src: aaccArabDelegation,
    title: 'GCC–India Bilateral Chamber Delegation',
    caption: 'High-level diplomatic assembly uniting GCC Arab delegations, business leaders, and chamber dignitaries.',
    event: 'Asian Arab Chamber of Commerce Summit',
    date: '2026',
    location: 'GCC–India Bilateral Conclave',
    alt: 'H.E. Zeenat Kureshi alongside Arab dignitaries and international trade delegations under the AACC banner',
    focal: '32% 28%',
    orientation: 'landscape',
  },
  bilateralAccord: {
    id: 'bilateral-accord',
    src: bilateralAccord,
    title: 'Bilateral Trade Accord & Economic Partnership Signing',
    caption: 'Ratification and signing of bilateral trade development and economic cooperation initiatives.',
    event: 'Sovereign Trade & Economic Partnership Assembly',
    date: '2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi with delegates presenting official signed bilateral trade charter and declaration',
    focal: '44% 30%',
    orientation: 'landscape',
  },
  globalTradeSummit: {
    id: 'global-trade-summit',
    src: globalTradeSummit,
    title: 'Global Trade & Industrial Commerce Convention',
    caption: 'Multilateral assembly advancing international commerce, infrastructure, and sovereign corridors.',
    event: 'Global Trade & Investment Summit',
    date: '2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi with distinguished commerce delegates and business leaders',
    focal: '50% 30%',
    orientation: 'landscape',
  },
  agrivoltaics: {
    id: 'agrivoltaics',
    src: agrivoltaics,
    title: 'Agrivoltaics World Conference 2026 — Curtain Raiser',
    caption: 'At the registration desk of the curtain-raiser for the Agrivoltaics World Conference 2026.',
    event: 'Agrivoltaics World Conference 2026',
    date: '9 September 2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi standing between the Indian and German flags at the Agrivoltaics World Conference curtain raiser',
    focal: '52% 40%',
    orientation: 'landscape',
  },
  unitedEconomicA: {
    id: 'united-economic-a',
    src: unitedEconomicA,
    title: 'United Economic BRICS Summit',
    caption: 'In front of the summit backdrop at the United Economic BRICS Summit, New Delhi.',
    event: 'United Economic BRICS Summit',
    date: 'September 2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi at the United Economic BRICS Summit, New Delhi',
    focal: '46% 26%',
    orientation: 'landscape',
  },
  felicitation: {
    id: 'felicitation',
    src: felicitation,
    title: 'UDC BRICS Business Summit 2026 — on stage',
    caption: 'On stage at the United Diplomatic Council BRICS Business Summit 2026, FIEO Niryat Bhawan, New Delhi.',
    event: 'UDC BRICS Business Summit 2026',
    date: '10 September 2026',
    location: 'FIEO Niryat Bhawan, New Delhi',
    alt: 'Delegates on stage at the UDC BRICS Business Summit 2026',
    focal: '72% 25%',
    orientation: 'landscape',
  },
  womenPanel: {
    id: 'women-panel',
    src: womenPanel,
    title: 'UDC BRICS Summit 2026 — Keynote Panel & Diplomatic Dialogue',
    caption: 'H.E. Zeenat Kureshi addressing international delegates during the keynote panel discussion at the United Diplomatic Council Summit.',
    event: 'UDC BRICS Summit 2026',
    date: 'September 2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi speaking on stage during the diplomatic panel discussion at the UDC BRICS Summit 2026',
    focal: '62% 35%',
    orientation: 'landscape',
  },
  udcStage: {
    id: 'udc-stage',
    src: udcStage,
    title: 'Official State & Diplomatic Reception Delegation',
    caption: 'H.E. Zeenat Kureshi welcomed by state delegates and dignitaries with ceremonial floral honors upon arrival.',
    event: 'State & Diplomatic Welcome Conclave',
    date: '2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi received by state delegates with ceremonial flower garlands upon arrival',
    focal: '50% 30%',
    orientation: 'portrait',
  },
  unitedEconomicB: {
    id: 'united-economic-b',
    src: unitedEconomicB,
    title: 'United Economic BRICS Summit — New Delhi',
    caption: 'At the United Economic BRICS Summit, New Delhi, September 2026.',
    event: 'United Economic BRICS Summit',
    date: 'September 2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi with a fellow attendee at the United Economic BRICS Summit',
    focal: '46% 26%',
    orientation: 'landscape',
  },
  tradeSummitAccord: {
    id: 'trade-summit-accord-hd',
    src: tradeSummitAccord,
    title: 'World Economic Summit & Bilateral Trade Accord Signing',
    caption: 'H.E. Zeenat Kureshi presiding over high-level international trade accord and bilateral delegation pacts.',
    event: 'World Economic Summit & Bilateral Trade Delegation',
    date: '2025–2026',
    location: 'Klang, Malaysia & New Delhi',
    alt: 'H.E. Zeenat Kureshi holding official bilateral trade delegation accord at international summit table',
    focal: '8% 25%',
    orientation: 'landscape',
  },
  udcDiplomaticAward: {
    id: 'udc-diplomatic-award-hd',
    src: udcDiplomaticAward,
    title: 'United Diplomatic Council — Diplomatic Excellence Honor',
    caption: 'H.E. Zeenat Kureshi conferred with the Diplomatic Excellence Award by the United Diplomatic Council under the Saudi Economic Diplomacy framework.',
    event: 'United Diplomatic Council (UDC)',
    date: '2025–2026',
    location: 'Riyadh & New Delhi',
    alt: 'H.E. Zeenat Kureshi holding the Diplomatic Excellence Award beside the United Diplomatic Council Saudi Vision 2030 pavilion',
    focal: '68% 22%',
    orientation: 'portrait',
  },
  commonwealthLeadership: {
    id: 'commonwealth-leadership-banner-hd',
    src: commonwealthLeadership,
    title: 'India Commonwealth Business Meeting 2025 — Leadership & Civic Mandate',
    caption: 'H.E. Zeenat Kureshi presented with the Leadership Certificate of Appreciation at the India Commonwealth Business Meeting 2025.',
    event: 'India Commonwealth Business Meeting 2025',
    date: '2025',
    location: 'Kolkata, India',
    alt: 'H.E. Zeenat Kureshi receiving Certificate of Appreciation at India Commonwealth Business Meeting 2025 in Kolkata',
    focal: '72% 28%',
    orientation: 'landscape',
  },
  gccNationsMedia: {
    id: 'gcc-nations-media-press-hd',
    src: gccNationsMedia,
    title: 'GCC Nations — Global Diplomatic & Economic Broadcast Dialogue',
    caption: 'H.E. Zeenat Kureshi in official broadcast dialogue exploring India-GCC sovereign trade corridors, energy security, and media innovation.',
    event: 'GCC Nations Broadcast & Press Dialogue',
    date: '2025–2026',
    location: 'Dubai, UAE',
    alt: 'H.E. Zeenat Kureshi on GCC Nations media broadcast interview with GCC sovereign flags and skyline',
    focal: '80% 28%',
    orientation: 'landscape',
  },
  insightsSummitDialogue: {
    id: 'insights-summit-dialogue-hd',
    src: insightsSummitDialogue,
    title: 'International Economic Summit & Diplomatic Dialogue',
    caption: 'H.E. Zeenat Kureshi engaging with international trade delegates and diplomatic leadership.',
    event: 'International Economic Summit & Trade Conclave',
    date: '2025–2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi in diplomatic dialogue with international delegates and dignitaries',
    focal: '35% 24%',
    orientation: 'landscape',
  },
  bricsSummitContact: {
    id: 'brics-summit-contact-hd',
    src: bricsSummitContact,
    title: 'United Economic BRICS Summit — Bilateral Investment Secretariat',
    caption: 'H.E. Zeenat Kureshi at the United Economic BRICS Summit strengthening bilateral investment partnerships.',
    event: 'United Economic BRICS Summit',
    date: 'September 2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi at the United Economic BRICS Summit representing diplomatic and investment mandates',
    focal: '50% 20%',
    orientation: 'landscape',
  },
  aboutHeroBanner: {
    id: 'about-hero-banner-hd',
    src: aboutHeroBanner,
    title: 'International Leadership & Economic Summit Panel Address',
    caption: 'H.E. Zeenat Kureshi addressing distinguished international delegates and dignitaries during high-level summit proceedings.',
    event: 'Global Leadership & Economic Summit',
    date: '2025–2026',
    location: 'Dubai & New Delhi',
    alt: 'H.E. Zeenat Kureshi speaking on stage with microphone at the international leadership keynote panel',
    focal: '64% 36%',
    orientation: 'landscape',
  },
} satisfies Record<string, EventPhoto>;

/** The official state frames the home hero cycles through, in order. */
export const heroSlides: EventPhoto[] = [
  eventPhotos.agrivoltaics,
  eventPhotos.udcStage,
  eventPhotos.felicitation,
  eventPhotos.womenPanel,
];
