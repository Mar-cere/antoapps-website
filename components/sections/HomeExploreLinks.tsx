'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';

type HomeExploreLinksProps = {
  locale?: Locale;
};

const copy: Record<Locale, { title: string; links: { href: string; label: string; description: string }[] }> = {
  es: {
    title: 'Para los curiosos',
    links: [
      {
        href: '/investigacion',
        label: 'Investigación',
        description: 'Estudios y evidencia clínica',
      },
      {
        href: '/seguridad',
        label: 'Seguridad',
        description: 'AES-256 · E2E · GDPR',
      },
      {
        href: '/desarrollo',
        label: 'Tecnología',
        description: 'Arquitectura y stack técnico',
      },
    ],
  },
  en: {
    title: 'For the curious',
    links: [
      {
        href: '/investigacion',
        label: 'Research',
        description: 'Studies and clinical evidence',
      },
      {
        href: '/seguridad',
        label: 'Security',
        description: 'AES-256 · E2E · GDPR',
      },
      {
        href: '/desarrollo',
        label: 'Technology',
        description: 'Architecture and technical stack',
      },
    ],
  },
};

export default function HomeExploreLinks({ locale = 'es' }: HomeExploreLinksProps) {
  const t = copy[locale];

  return (
    <section className="home-explore" aria-label={t.title}>
      <p className="home-explore__title">{t.title}</p>
      <ul className="home-explore__grid">
        {t.links.map((link) => (
          <li key={link.href}>
            <Link href={localePath(locale, link.href)} className="home-explore__card">
              <span className="home-explore__body">
                <span className="home-explore__label">{link.label}</span>
                <span className="home-explore__desc">{link.description}</span>
              </span>
              <span className="home-explore__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
