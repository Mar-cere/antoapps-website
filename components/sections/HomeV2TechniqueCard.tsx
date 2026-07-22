import HomeV2PanelShell from '@/components/sections/HomeV2PanelShell';
import type { HomeV2TechniquePanel } from '@/lib/i18n/copy/home/home-v2';

type HomeV2TechniqueCardProps = {
  technique: HomeV2TechniquePanel;
  className?: string;
};

/** Ejemplo de técnica del hub (ABC u otra) — no es un chat. */
export default function HomeV2TechniqueCard({
  technique,
  className = '',
}: HomeV2TechniqueCardProps) {
  return (
    <HomeV2PanelShell
      title={technique.chromeTitle}
      size="moment"
      className={`home-v2-technique ${className}`.trim()}
      ariaLabel={technique.ariaLabel}
    >
      <div className="home-v2-technique__head">
        <p className="home-v2-technique__eyebrow">{technique.eyebrow}</p>
        <div className="home-v2-technique__tags">
          <span className="home-v2-technique__tag">{technique.tag}</span>
          <span className="home-v2-technique__duration">{technique.duration}</span>
        </div>
        <h3 className="home-v2-technique__name">{technique.name}</h3>
      </div>
      <ol className="home-v2-technique__steps">
        {technique.steps.map((step) => (
          <li key={step.letter} className="home-v2-technique__step">
            <span className="home-v2-technique__letter" aria-hidden="true">
              {step.letter}
            </span>
            <div className="home-v2-technique__step-body">
              <span className="home-v2-technique__step-label">{step.label}</span>
              <span className="home-v2-technique__step-value">{step.value}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="home-v2-technique__next">
        <span className="home-v2-technique__next-label">{technique.nextMoveLabel}</span>
        <p className="home-v2-technique__next-value">{technique.nextMove}</p>
      </div>
    </HomeV2PanelShell>
  );
}
