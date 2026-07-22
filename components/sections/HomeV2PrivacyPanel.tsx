import HomeV2PanelShell from '@/components/sections/HomeV2PanelShell';
import type { HomeV2PrivacyPanel as HomeV2PrivacyPanelCopy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2PrivacyPanelProps = {
  privacy: HomeV2PrivacyPanelCopy;
  className?: string;
};

/** Panel de privacidad — confianza sin otro hilo de chat. */
export default function HomeV2PrivacyPanel({
  privacy,
  className = '',
}: HomeV2PrivacyPanelProps) {
  return (
    <HomeV2PanelShell
      title={privacy.chromeTitle}
      size="moment"
      className={`home-v2-privacy ${className}`.trim()}
      ariaLabel={privacy.ariaLabel}
    >
      <p className="home-v2-privacy__eyebrow">{privacy.eyebrow}</p>
      <p className="home-v2-privacy__lead">{privacy.lead}</p>
      <ul className="home-v2-privacy__list">
        {privacy.points.map((point) => (
          <li key={point} className="home-v2-privacy__item">
            <span className="home-v2-privacy__mark" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </HomeV2PanelShell>
  );
}
