'use client';

import { useId } from 'react';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2AndroidProps = {
  locale?: Locale;
};

/** Acceso Android fuera del hero para no romper el primer viewport. */
export default function HomeV2Android({ locale = 'es' }: HomeV2AndroidProps) {
  const { android } = getHomeV2Copy(locale);
  const pagePath = locale === 'en' ? '/en' : '/';
  const formId = useId().replace(/:/g, '');

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
          <AndroidEarlyAccessForm
            locale={locale}
            id={formId}
            placement="home_android_early_access"
            page={pagePath}
            compact
            buttonLabel={android.cta}
          />
        </div>
      </div>
    </section>
  );
}
