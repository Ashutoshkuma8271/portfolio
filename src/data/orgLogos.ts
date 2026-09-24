/**
 * Organisation logos, picked up automatically from src/assets/images/org-logos/.
 * A file named after the organisation's slug is used wherever that organisation
 * is shown, e.g. "Indo-Gulf Leadership Summit, Dubai" -> indo-gulf-leadership-summit.png
 * (the part after a comma is ignored and "&" is spelled "and").
 */
const files = import.meta.glob('../assets/images/org-logos/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const orgSlug = (name: string) =>
  name
    .split(',')[0]
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const bySlug = new Map(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), url]),
);

export const orgLogo = (name: string): string | undefined => bySlug.get(orgSlug(name));
