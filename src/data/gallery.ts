import type { GalleryImage } from '../types';
import { eventPhotos as p } from './eventPhotos';

/**
 * Press & event gallery -- real, authenticated summit and cultural photographs.
 */
const toImage = (
  photo: (typeof p)[keyof typeof p],
  category: GalleryImage['category'],
): GalleryImage => ({
  id: `gal-${photo.id}`,
  title: photo.title,
  caption: photo.caption,
  category,
  imageUrl: photo.src,
  date: photo.date,
  location: photo.location,
});

export const galleryImages: GalleryImage[] = [
  toImage(p.mediaCinema, 'Cinema'),
  toImage(p.aaccArabDelegation, 'Trade'),
  toImage(p.aaccCredential, 'Global Events'),
  toImage(p.bilateralAccord, 'Trade'),
  toImage(p.globalTradeSummit, 'Leadership'),
  toImage(p.womenPanel, 'Leadership'),
  toImage(p.agrivoltaics, 'Trade'),
  toImage(p.udcStage, 'Global Events'),
];
