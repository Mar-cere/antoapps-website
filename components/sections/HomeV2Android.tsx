'use client';

import DownloadLink from '@/components/DownloadLink';
import GooglePlayBadge from '@/components/GooglePlayBadge';
import { googlePlayHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2AndroidProps = {
  locale?: Locale;
};

/** Google Play fuera del hero para no romper el primer viewport. */
export default function HomeV2Android({ locale = 'es' }: HomeV2AndroidProps) {
  const { android } = getHomeV2Copy(locale);
  const pagePath = locale === 'en' ? '/en' : '/';

  return (
    <section
      id="android"
      className="home-v2-android"
      aria-labelledby="home-v2-android-title"
      data-fade-section
    >
      <div className="home-landing-container home-v2-android__inner">
        <div className="home-v2-android__copy reveal-on-scroll">
          <h2 id="home-v2-android-title" className="home-v2-android__title">
            {android.title}
          </h2>
          <p className="home-v2-android__body">{android.body}</p>
        </div>
        <div className="home-v2-android__form reveal-on-scroll">
          <DownloadLink
            href={googlePlayHref(locale)}
            className="store-badge-link"
            trackingPlacement="home_android_play_store"
            trackingPage={pagePath}
            trackingLabel="home_android_badge"
            aria-label={android.storeAria}
          >
            <GooglePlayBadge locale={locale} />
          </DownloadLink>
        </div>
      </div>
    </section>
  );
}
