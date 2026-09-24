import ahmedabadMirror from '../assets/images/news-logos/ahmedabadmirror-logo.png';
import aniNews from '../assets/images/news-logos/aninews-logo.png';
import awazTheVoice from '../assets/images/news-logos/awazthevoice-logo.png';
import businessStandard from '../assets/images/news-logos/businessstandard-logo.png';
import businessToday from '../assets/images/news-logos/businesstoday-logo.png';
import ddNews from '../assets/images/news-logos/ddnews-logo.png';
import economicTimes from '../assets/images/news-logos/economictimes-logo.png';
import financialExpress from '../assets/images/news-logos/financialexpress-logo.png';
import forbesIndia from '../assets/images/news-logos/forbesindia-logo.png';
import gulfBusiness from '../assets/images/news-logos/gulfbusiness-logo.png';
import gulfNews from '../assets/images/news-logos/gulfnews-logo.png';
import hindustanMetro from '../assets/images/news-logos/hindustanmetro-logo.png';
import hindustanTimes from '../assets/images/news-logos/hindustantimes-logo.png';
import imdb from '../assets/images/news-logos/imdb-logo.jpg';
import indiaNews from '../assets/images/news-logos/indiacom-logo.png';
import indianExpress from '../assets/images/news-logos/indianexpress-logo.png';
import indiaShippingNews from '../assets/images/news-logos/indiashippingnews-logo.png';
import indiaToday from '../assets/images/news-logos/indiatoday-logo.png';
import investIndia from '../assets/images/news-logos/invest-india-logo.png';
import jll from '../assets/images/news-logos/jll-logo.png';
import livemint from '../assets/images/news-logos/livemint-logo.png';
import magzter from '../assets/images/news-logos/magzter-logo.png';
import moneycontrol from '../assets/images/news-logos/moneycontrol-logo.png';
import nagalandPost from '../assets/images/news-logos/nagaland-post-logo.png';
import ndtv from '../assets/images/news-logos/ndtv-logo.png';
import newsOnAir from '../assets/images/news-logos/newsonair-logo.png';
import reuters from '../assets/images/news-logos/reuters-logo.png';
import sarkaritel from '../assets/images/news-logos/sarkaritel-logo.png';
import theHindu from '../assets/images/news-logos/thehindu-logo.png';
import theNational from '../assets/images/news-logos/thenationalnews-logo.png';
import thePrint from '../assets/images/news-logos/theprint-logo.png';
import timesOfIndia from '../assets/images/news-logos/timesofindia-logo.png';
import tribuneIndia from '../assets/images/news-logos/tribuneindia-logo.jpg';
import pib from '../assets/images/news-logos/pib-logo.png';

export interface NewsLogo {
  src: string;
  alt: string;
  /** Wordmarks are much wider than tall and need a wider tile than icon marks. */
  wide?: boolean;
}

interface Entry extends NewsLogo {
  /** Matched against the whole normalised name. */
  exact?: string[];
  /** Matched against the start of the normalised name ("aninews" hits "ANI News (Asian News International)"). */
  prefix?: string[];
}

// Exact/prefix aliases rather than substring search: a loose `includes('express')`
// put the Indian Express logo on Financial Express stories, `includes('dd')` put
// DD News on "Middle East Monitor", and so on.
const ENTRIES: Entry[] = [
  { src: ddNews, alt: 'DD News', exact: ['dd', 'ddindia', 'doordarshan'], prefix: ['ddnews'] },
  { src: newsOnAir, alt: 'News On AIR', exact: ['air', 'allindiaradio'], prefix: ['newsonair', 'allindiaradionews'] },
  { src: theNational, alt: 'The National', exact: ['national'], prefix: ['nationalnews', 'thenationalnews'] },
  { src: economicTimes, alt: 'The Economic Times', exact: ['et'], prefix: ['economictimes'] },
  { src: indianExpress, alt: 'The Indian Express', prefix: ['indianexpress', 'newindianexpress'] },
  { src: financialExpress, alt: 'Financial Express', prefix: ['financialexpress'] },
  { src: moneycontrol, alt: 'Moneycontrol', prefix: ['moneycontrol'], wide: true },
  { src: timesOfIndia, alt: 'The Times of India', exact: ['toi'], prefix: ['timesofindia'], wide: true },
  { src: hindustanTimes, alt: 'Hindustan Times', exact: ['ht'], prefix: ['hindustantimes'] },
  { src: hindustanMetro, alt: 'Hindustan Metro', prefix: ['hindustanmetro'] },
  { src: gulfNews, alt: 'Gulf News', prefix: ['gulfnews'] },
  { src: gulfBusiness, alt: 'Gulf Business', prefix: ['gulfbusiness'] },
  { src: indiaNews, alt: 'India News', exact: ['indianews'], wide: true },
  { src: indiaShippingNews, alt: 'India Shipping News', prefix: ['indiashippingnews'] },
  { src: livemint, alt: 'Mint', exact: ['mint'], prefix: ['livemint'], wide: true },
  { src: reuters, alt: 'Reuters', prefix: ['reuters', 'thomsonreuters'] },
  { src: sarkaritel, alt: 'Sarkaritel', prefix: ['sarkaritel'], wide: true },
  { src: ndtv, alt: 'NDTV', prefix: ['ndtv'] },
  { src: indiaToday, alt: 'India Today', prefix: ['indiatoday'] },
  { src: businessToday, alt: 'Business Today', prefix: ['businesstoday'] },
  { src: businessStandard, alt: 'Business Standard', exact: ['bs'], prefix: ['businessstandard'] },
  { src: forbesIndia, alt: 'Forbes India', prefix: ['forbesindia'], wide: true },
  { src: jll, alt: 'JLL', exact: ['jll'], prefix: ['joneslanglasalle'], wide: true },
  { src: thePrint, alt: 'ThePrint', exact: ['print'], prefix: ['theprint'], wide: true },
  { src: magzter, alt: 'Magzter', prefix: ['magzter'], wide: true },
  { src: aniNews, alt: 'ANI News', exact: ['ani'], prefix: ['aninews', 'asiannewsinternational'] },
  { src: awazTheVoice, alt: 'Awaz The Voice', exact: ['awaz'], prefix: ['awazthevoice'], wide: true },
  { src: ahmedabadMirror, alt: 'Ahmedabad Mirror', prefix: ['ahmedabadmirror'], wide: true },
  { src: investIndia, alt: 'Invest India', prefix: ['investindia'] },
  { src: nagalandPost, alt: 'Nagaland Post', prefix: ['nagalandpost'] },
  { src: tribuneIndia, alt: 'The Tribune', exact: ['tribune'], prefix: ['tribuneindia'] },
  { src: theHindu, alt: 'The Hindu', exact: ['hindu', 'thehindu'] },
  { src: imdb, alt: 'IMDb', prefix: ['imdb'] },
  { src: pib, alt: 'PIB (Press Information Bureau)', exact: ['pib', 'pibdelhi', 'pibindia'], prefix: ['pib', 'pressinformationbureau'] },
];

const normalise = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/^the\s+/, '')
    .replace(/\.(co\.in|gov\.in|com|in|ae|net|org|news)$/, '')
    .replace(/[^a-z0-9]/g, '');

export const findNewsLogo = (publication?: string): NewsLogo | null => {
  if (!publication) return null;
  const key = normalise(publication);
  if (!key) return null;
  const hit = ENTRIES.find(
    (e) => e.exact?.includes(key) || e.prefix?.some((p) => key.startsWith(p)),
  );
  return hit ? { src: hit.src, alt: hit.alt, wide: hit.wide } : null;
};

/** Publications that arrive as a bare domain ("ddnews.gov.in") can still show their own favicon. */
export const faviconFor = (publication?: string): string | null => {
  const p = (publication || '').trim().toLowerCase();
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(p)
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(p)}&sz=128`
    : null;
};
