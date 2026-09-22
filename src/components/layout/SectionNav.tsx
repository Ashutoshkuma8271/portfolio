import React, { useEffect, useState } from 'react';
import { Container } from './Container';

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

/**
 * Sticky in-page navigation with scroll-spy. Long pages (Trade, Media) hold
 * five or six distinct chapters; this lets a visitor jump between them and
 * always see where they are.
 */
export const SectionNav: React.FC<SectionNavProps> = ({ items }) => {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length || typeof IntersectionObserver === 'undefined') return;

    // A section is "current" once it crosses the upper third of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-b border-hairline bg-surface/90 backdrop-blur-lg sm:top-20"
    >
      <Container>
        <ul className="scrollbar-hidden -mx-1 flex items-center gap-1 overflow-x-auto py-2.5">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative inline-flex items-center rounded-full px-4 py-2 font-label text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-200 ${
                    isActive
                      ? 'bg-emerald-950 text-gold-300'
                      : 'text-ink-soft hover:bg-gold-500/10 hover:text-ink-heading'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
};
