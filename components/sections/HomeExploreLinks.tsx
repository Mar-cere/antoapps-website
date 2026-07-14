'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';

type HomeExploreLinksProps = {
  locale?: Locale;
};

const copy: Record<Locale, { title: string; links: { href: string; label: string; description: string }[] }> = {
  es: {
    title: 'Explorar Anto',
    links: [
      {
        href: '/recursos',
        label: 'Recursos',
        description: 'Biblioteca de psicoeducación',
      },
      {
        href: '/recursos/escalas-phq9-gad7',
        label: 'PHQ-9 y GAD-7',
        description: 'Qué miden y cómo interpretarlas',
      },
      {
        href: '/recursos/que-es-tcc',
        label: 'Qué es la TCC',
        description: 'Guía breve de terapia cognitivo-conductual',
      },
      {
        href: '/recursos/grounding-ansiedad-crisis',
        label: 'Grounding',
        description: 'Técnicas para ansiedad y crisis',
      },
      {
        href: '/app',
        label: 'La app',
        description: 'Anto en iPhone — qué incluye',
      },
      {
        href: '/seguridad',
        label: 'Seguridad',
        description: 'Cifrado, privacidad y límites clínicos',
      },
    ],
  },
  en: {
    title: 'Explore Anto',
    links: [
      {
        href: '/recursos',
        label: 'Resources',
        description: 'Psychoeducation library',
      },
      {
        href: '/recursos/escalas-phq9-gad7',
        label: 'PHQ-9 & GAD-7',
        description: 'What they measure and how to read them',
      },
      {
        href: '/recursos/que-es-tcc',
        label: 'What is CBT',
        description: 'Brief cognitive behavioural therapy guide',
      },
      {
        href: '/recursos/grounding-ansiedad-crisis',
        label: 'Grounding',
        description: 'Techniques for anxiety and crisis',
      },
      {
        href: '/app',
        label: 'The app',
        description: 'Anto on iPhone — what is included',
      },
      {
        href: '/seguridad',
        label: 'Security',
        description: 'Encryption, privacy, and clinical limits',
      },
    ],
  },
};

export default function HomeExploreLinks({ locale = 'es' }: HomeExploreLinksProps) {
  const t = copy[locale];

  return (
    <section className="home-explore" aria-label={t.title} data-fade-section>
      <p className="home-explore__title reveal-on-scroll">{t.title}</p>
      <ul className="home-explore__grid">
        {t.links.map((link) => (
          <li key={link.href} className="reveal-on-scroll" data-stagger-item>
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
