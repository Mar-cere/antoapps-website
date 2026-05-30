import Link from 'next/link';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';

type BienvenidaFaqProps = {
  copy: BienvenidaCopy['faq'];
  locale: Locale;
};

export default function BienvenidaFaq({ copy, locale }: BienvenidaFaqProps) {
  const privacyHref = localePath(locale, '/privacidad');

  return (
    <section className="lad-faq lad-section--anchor" id="preguntas" aria-labelledby="lad-faq-title">
      <h2 id="lad-faq-title" className="lad-faq-title">
        {copy.sectionTitle}
      </h2>
      <div className="lad-faq-list">
        {copy.items.map((item, index) => (
          <details key={item.question} className="lad-faq-item">
            <summary className="lad-faq-question">{item.question}</summary>
            <div className="lad-faq-answer">
              {index === 2 ? (
                <>
                  {item.answer}{' '}
                  <Link href={privacyHref}>{item.privacyLinkLabel}</Link>.
                </>
              ) : (
                item.answer
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
