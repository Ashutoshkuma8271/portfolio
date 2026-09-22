import { GalleryImage } from '../types';
import focusTrade from '../assets/images/focus/trade.webp';
import focusPartnerships from '../assets/images/focus/partnerships.webp';
import focusWomen from '../assets/images/focus/women.webp';
import focusCultural from '../assets/images/focus/cultural.webp';
import heroPortrait from '../assets/images/hero/hero-commissioner-lg.webp';
import heroZeenat from '../assets/images/hero-zeenat.webp';

export const galleryImages: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Bilateral Trade Summit Keynote',
    caption: 'Addressing ministerial delegates and sovereign investors at the Dubai World Trade Centre.',
    category: 'Trade',
    imageUrl: focusTrade,
    date: 'August 2024',
    location: 'Dubai, UAE'
  },
  {
    id: 'gal-2',
    title: 'All India Jamiatul Quresh National Convention',
    caption: 'Presiding over the annual national convention with female delegates from 14 Indian states.',
    category: 'Leadership',
    imageUrl: focusWomen,
    date: 'November 2023',
    location: 'New Delhi, India'
  },
  {
    id: 'gal-3',
    title: 'International Film Festival Pavilion',
    caption: 'Representing Indian cinema and cross-border co-productions on the global stage.',
    category: 'Cinema',
    imageUrl: focusCultural,
    date: 'May 2024',
    location: 'Cannes, France'
  },
  {
    id: 'gal-4',
    title: 'Ministerial Delegation Roundtable',
    caption: 'High-level dialogue with Gulf investment authorities on non-oil bilateral corridors.',
    category: 'Trade',
    imageUrl: focusPartnerships,
    date: 'January 2024',
    location: 'Riyadh, Saudi Arabia'
  },
  {
    id: 'gal-5',
    title: 'Project Hunar Shakti Graduation Ceremony',
    caption: 'Awarding graduation certificates and micro-enterprise grants to young women artisans.',
    category: 'Leadership',
    imageUrl: heroPortrait,
    date: 'February 2024',
    location: 'Mumbai, India'
  },
  {
    id: 'gal-6',
    title: 'Indo-Arab Business Leadership Awards',
    caption: 'Receiving the Global Statesperson of the Year award in Bilateral Commerce.',
    category: 'Global Events',
    imageUrl: heroZeenat,
    date: 'April 2024',
    location: 'Abu Dhabi, UAE'
  }
];
