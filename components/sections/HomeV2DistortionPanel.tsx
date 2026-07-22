import HomeV2PanelShell from '@/components/sections/HomeV2PanelShell';
import type { HomeV2DistortionPanel as DistortionCopy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2DistortionPanelProps = {
  distortion: DistortionCopy;
  className?: string;
};

/** Pensamiento → etiqueta de distorsión → reformulación → técnica. */
export default function HomeV2DistortionPanel({
  distortion,
  className = '',
}: HomeV2DistortionPanelProps) {
  return (
    <HomeV2PanelShell
      title={distortion.chromeTitle}
      size="moment"
      className={`home-v2-distortion ${className}`.trim()}
      ariaLabel={distortion.ariaLabel}
    >
      <p className="home-v2-distortion__eyebrow">{distortion.eyebrow}</p>

      <div className="home-v2-distortion__block">
        <span className="home-v2-distortion__kicker">{distortion.thoughtLabel}</span>
        <p className="home-v2-distortion__thought">{distortion.thought}</p>
      </div>

      <div className="home-v2-distortion__label-wrap">
        <span className="home-v2-distortion__kicker">{distortion.labelHint}</span>
        <span className="home-v2-distortion__badge">{distortion.labelName}</span>
      </div>

      <div className="home-v2-distortion__block home-v2-distortion__block--reframe">
        <span className="home-v2-distortion__kicker">{distortion.reframeLabel}</span>
        <p className="home-v2-distortion__reframe">{distortion.reframe}</p>
      </div>

      <div className="home-v2-distortion__next">
        <span className="home-v2-distortion__kicker">{distortion.techniqueLabel}</span>
        <p className="home-v2-distortion__technique">{distortion.technique}</p>
      </div>
    </HomeV2PanelShell>
  );
}
