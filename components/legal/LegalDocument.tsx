import type { ReactNode } from 'react';
import Link from 'next/link';
import type { LegalBlock, LegalPageCopy } from '@/lib/i18n/copy/legal-shared';

export function LegalDocument({ copy }: { copy: LegalPageCopy }) {
  return (
    <>
      <section className="privacy-hero" data-fade-section>
        <div className="container">
          <h1 className="section-title reveal-on-scroll">{copy.title}</h1>
          <p className="section-subtitle reveal-on-scroll">{copy.lastUpdated}</p>
        </div>
      </section>

      <section className="privacy-content" data-fade-section>
        <div className="container">
          <div className="privacy-wrapper reveal-on-scroll">
            {copy.sections.map((section) => (
              <div key={section.title} className="privacy-section">
                <h2>{section.title}</h2>
                {section.blocks.map((block, index) => (
                  <LegalBlockRenderer key={`${section.title}-${index}`} block={block} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function LegalBlockRenderer({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'p':
      return <p>{block.text}</p>;
    case 'ul':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case 'p-link':
      return (
        <p>
          {block.before}{' '}
          <Link href={block.linkHref}>{block.linkText}</Link>
          {block.after ?? ''}
        </p>
      );
    default:
      return null;
  }
}

export function LegalPageShell({
  copy,
  children,
}: {
  copy: LegalPageCopy;
  children?: ReactNode;
}) {
  return children ?? <LegalDocument copy={copy} />;
}
