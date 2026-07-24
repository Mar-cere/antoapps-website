import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2ExploreProps = {
  locale?: Locale;
};

/** Discovery editorial + coda legal — un solo cierre, sin strip suelto. */
export default function HomeV2Explore({ locale = 'es' }: HomeV2ExploreProps) {
  const { explore } = getHomeV2Copy(locale);

  return (
    <section className="home-v2-explore" aria-labelledby="home-v2-explore-title" data-fade-section>
      <div className="home-landing-container">
        <h2 id="home-v2-explore-title" className="home-v2-explore__title reveal-on-scroll">
          {explore.title}
        </h2>
        <ul className="home-v2-explore__list">
          {explore.links.map((link) => (
            <li key={link.href} className="reveal-on-scroll" data-stagger-item>
              <Link href={localePath(locale, link.href)} className="home-v2-explore__link">
                <span className="home-v2-explore__label">{link.label}</span>
                <span className="home-v2-explore__desc">{link.description}</span>
                <span className="home-v2-explore__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="home-v2-explore__coda reveal-on-scroll">
          <p className="home-v2-explore__trust">
            {explore.coda.trust.map((item, index) => (
              <span key={item}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                {item}
              </span>
            ))}
          </p>
          <p className="home-v2-explore__legal">{explore.coda.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
