'use client';

import Image from 'next/image';
import HomeV2ChatVignette from '@/components/sections/HomeV2ChatVignette';
import HomeV2DistortionPanel from '@/components/sections/HomeV2DistortionPanel';
import HomeV2EvidencePanel from '@/components/sections/HomeV2EvidencePanel';
import HomeV2PrivacyPanel from '@/components/sections/HomeV2PrivacyPanel';
import HomeV2SessionSummary from '@/components/sections/HomeV2SessionSummary';
import HomeV2TechniqueCard from '@/components/sections/HomeV2TechniqueCard';
import type { Locale } from '@/lib/i18n/config';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import { getHomeV2Copy, type HomeV2MomentMedia } from '@/lib/i18n/copy/home/home-v2';

type HomeV2MomentsProps = {
  locale?: Locale;
};

function MomentMedia({ media, locale }: { media: HomeV2MomentMedia; locale: Locale }) {
  switch (media.kind) {
    case 'chat':
      return <HomeV2ChatVignette thread={media.chat} locale={locale} size="moment" />;
    case 'summary':
      return <HomeV2SessionSummary summary={media.summary} />;
    case 'technique':
      return <HomeV2TechniqueCard technique={media.technique} />;
    case 'distortion':
      return <HomeV2DistortionPanel distortion={media.distortion} />;
    case 'evidence':
      return <HomeV2EvidencePanel evidence={media.evidence} />;
    case 'privacy':
      return <HomeV2PrivacyPanel privacy={media.privacy} />;
  }
}

/** Momentos: resumen, distorsión→técnica, evidencia (GAD), privacidad. */
export default function HomeV2Moments({ locale = 'es' }: HomeV2MomentsProps) {
  const moments = getHomeV2Copy(locale).moments;

  return (
    <div className="home-v2-moments">
      {moments.map((moment) => (
        <section
          key={moment.id}
          className={`home-v2-moment home-v2-moment--${moment.id}`}
          aria-labelledby={`home-v2-moment-${moment.id}`}
          data-fade-section
        >
          {moment.imageAlt ? (
            <figure className="home-v2-moment__bleed" data-home-reveal="image">
              <Image
                src={getEditorialImagePath('thoughtLoop')}
                alt={moment.imageAlt}
                fill
                className="home-v2-moment__bleed-img"
                sizes="100vw"
                quality={80}
              />
            </figure>
          ) : null}
          <div className="home-landing-container home-v2-moment__grid">
            <div className="home-v2-moment__text" data-home-reveal>
              <h2 id={`home-v2-moment-${moment.id}`} className="home-v2-moment__title">
                {moment.title}
              </h2>
              <p className="home-v2-moment__body">{moment.body}</p>
            </div>
            <div className="home-v2-moment__media">
              <MomentMedia media={moment.media} locale={locale} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
