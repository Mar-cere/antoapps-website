'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';

type HomeExploreLinksProps = {
  locale?: Locale;
};

const copy: Record<Locale, { title: string; links: { href: string; label: string; description: string }[] }> = {
  es: {
    title: 'Profundiza cuando quieras',
    links: [
      {
        href: '/investigacion',
        label: 'Investigación',
        description: 'Estudios y evidencia clínica',
      },
      {
        href: '/seguridad',
        label: 'Seguridad',
        description: 'Cómo protegemos tus datos',
      },
      {
        href: '/desarrollo',
        label: 'Tecnología',
        description: 'Arquitectura y stack técnico',
      },
    ],
  },
  en: {
    title: 'Go deeper when you are ready',
    links: [
      {
        href: '/investigacion',
        label: 'Research',
        description: 'Studies and clinical evidence',
      },
      {
        href: '/seguridad',
        label: 'Security',
        description: 'How we protect your data',
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
      <div className="container">
        <p className="home-explore__title">{t.title}</p>
        <ul className="home-explore__grid">
          {t.links.map((link) => (
            <li key={link.href}>
              <Link href={localePath(locale, link.href)} className="home-explore__card">
                <span className="home-explore__label">{link.label}</span>
                <span className="home-explore__desc">{link.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
