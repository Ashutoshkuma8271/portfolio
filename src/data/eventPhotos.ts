import agrivoltaics from '../assets/images/events/agrivoltaics-conference.webp';
import unitedEconomicA from '../assets/images/events/united-economic-brics-a.webp';
import felicitation from '../assets/images/events/udc-brics-felicitation.webp';
import womenPanel from '../assets/images/events/udc-brics-women-panel.webp';
import udcStage from '../assets/images/events/udc-brics-stage.webp';
import unitedEconomicB from '../assets/images/events/united-economic-brics-b.webp';

// 5 High-Definition Official Press & Summit Photographs
import cinemaAwards from '../assets/images/events/cinema-awards-dia-mirza.png';
import mediaCinemaIndoArab from '../assets/images/events/media-cinema-indo-arab.png';
import aaccCredential from '../assets/images/events/aacc-commissioner-credential.png';
import aaccArabDelegation from '../assets/images/events/aacc-arab-delegation-summit.png';
import bilateralAccord from '../assets/images/events/bilateral-accord-delegation.png';
import globalTradeSummit from '../assets/images/events/global-trade-summit-leaders.png';

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
    title: 'Cultural Cinema & Creative Leadership Honor with Dia Mirza',
    caption: 'H.E. Zeenat Kureshi presented with the prestigious Cultural Cinema & Film Producer citation alongside Bollywood actress Dia Mirza.',
    event: 'National Cultural Cinema & Leadership Conclave',
    date: '2026',
    location: 'Mumbai & New Delhi, India',
    alt: 'H.E. Zeenat Kureshi receiving cultural cinema & film producer award alongside Dia Mirza',
    focal: '50% 25%',
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
    focal: '58% 38%',
    orientation: 'portrait',
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
    focal: '60% 20%',
    orientation: 'landscape',
  },
  womenPanel: {
    id: 'women-panel',
    src: womenPanel,
    title: 'UDC BRICS Summit 2026 — women leaders’ panel',
    caption: 'A panel of women leaders on stage at the United Diplomatic Council BRICS Summit 2026.',
    event: 'UDC BRICS Summit 2026',
    date: 'September 2026',
    location: 'New Delhi, India',
    alt: 'Panel of ten women seated on stage under the UDC BRICS Summit 2026 backdrop',
    focal: '50% 62%',
    orientation: 'landscape',
  },
  udcStage: {
    id: 'udc-stage',
    src: udcStage,
    title: 'UDC BRICS Summit 2026 — delegates on stage',
    caption: 'Delegates on stage beneath the United Diplomatic Council BRICS Summit 2026 backdrop.',
    event: 'UDC BRICS Summit 2026',
    date: 'September 2026',
    location: 'New Delhi, India',
    alt: 'H.E. Zeenat Kureshi with fellow delegates on stage at the UDC BRICS Summit 2026',
    focal: '47% 34%',
    orientation: 'landscape',
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
} satisfies Record<string, EventPhoto>;

/** The official state frames the home hero cycles through, in order. */
export const heroSlides: EventPhoto[] = [
  eventPhotos.agrivoltaics,
  eventPhotos.udcStage,
  eventPhotos.felicitation,
  eventPhotos.womenPanel,
];
