/**
 * The five sectors investors can enquire about.
 *
 * Copy here is deliberately descriptive, not promotional: no returns, yields
 * or guarantees are stated anywhere -- an investment page that implies them
 * is a legal problem for the client. Every focus point is drawn from the
 * corridors and desks already described elsewhere on the site.
 */
export type InvestSectorId = 'trade' | 'gold' | 'fleet' | 'oilgas' | 'realestate';

export interface InvestSector {
  id: InvestSectorId;
  label: string;
  tagline: string;
  focus: string[];
}

export const INVEST_SECTORS: InvestSector[] = [
  {
    id: 'trade',
    label: 'Import & Export',
    tagline: 'India–GCC trade, moved efficiently.',
    focus: ['CEPA-linked duty advantages', 'Sourcing & distribution partners', 'Gems, jewellery & agro-commodities'],
  },
  {
    id: 'gold',
    label: 'Gold',
    tagline: 'Bullion and jewellery between Dubai and Mumbai.',
    focus: ['Physical bullion supply', 'Refining & jewellery chains', 'GIFT City / IIBX access'],
  },
  {
    id: 'fleet',
    label: 'Fleet',
    tagline: 'Shipping and logistics capacity across the Gulf.',
    focus: ['Container & freight corridors', 'Jebel Ali – JNPT port routes', 'Road fleets & last-mile'],
  },
  {
    id: 'oilgas',
    label: 'Oil & Gas',
    tagline: 'Energy trade, and the transition beyond it.',
    focus: ['Crude, LNG & petroleum products', 'Strategic supply agreements', 'Green hydrogen & renewables'],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    tagline: 'Property across DIFC, BKC and GIFT City.',
    focus: ['Commercial & residential assets', 'Cross-border allocation', 'Institutional & family-office structures'],
  },
];

export const sectorById = (id: InvestSectorId | null | undefined) =>
  INVEST_SECTORS.find((s) => s.id === id);
