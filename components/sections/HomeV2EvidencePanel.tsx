import HomeV2PanelShell from '@/components/sections/HomeV2PanelShell';
import type { HomeV2EvidencePanel as EvidenceCopy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2EvidencePanelProps = {
  evidence: EvidenceCopy;
  className?: string;
};

/** Chequeo semanal: intensidad suave, no dashboard de barras. */
export default function HomeV2EvidencePanel({
  evidence,
  className = '',
}: HomeV2EvidencePanelProps) {
  const max = evidence.scaleMax > 0 ? evidence.scaleMax : 21;

  return (
    <HomeV2PanelShell
      title={evidence.chromeTitle}
      size="moment"
      className={`home-v2-evidence ${className}`.trim()}
      ariaLabel={evidence.ariaLabel}
    >
      <div className="home-v2-evidence__head">
        <p className="home-v2-evidence__eyebrow">{evidence.eyebrow}</p>
        <div className="home-v2-evidence__scale">
          <span className="home-v2-evidence__scale-name">{evidence.scaleName}</span>
          <span className="home-v2-evidence__scale-range">{evidence.scaleRange}</span>
        </div>
      </div>

      <div className="home-v2-evidence__current">
        <div>
          <span className="home-v2-evidence__kicker">{evidence.currentLabel}</span>
          <p className="home-v2-evidence__value">{evidence.currentValue}</p>
        </div>
        <div>
          <span className="home-v2-evidence__kicker">{evidence.trendLabel}</span>
          <p className="home-v2-evidence__trend">{evidence.trend}</p>
        </div>
      </div>

      <ol
        className="home-v2-evidence__weeks"
        aria-label={evidence.bars.map((bar) => `${bar.label}: ${bar.value}`).join(', ')}
      >
        {evidence.bars.map((bar, index) => {
          const intensity = Math.max(0.28, Math.min(1, bar.value / max));
          return (
            <li
              key={bar.label}
              className="home-v2-evidence__week"
              style={{ '--home-v2-i': index, '--home-v2-intensity': intensity } as React.CSSProperties}
            >
              <span className="home-v2-evidence__pulse" aria-hidden="true" />
              <span className="home-v2-evidence__week-value">{bar.value}</span>
              <span className="home-v2-evidence__week-label">{bar.label}</span>
            </li>
          );
        })}
      </ol>

      <div className="home-v2-evidence__insight">
        <span className="home-v2-evidence__kicker">{evidence.insightLabel}</span>
        <p className="home-v2-evidence__insight-text">{evidence.insight}</p>
      </div>

      <p className="home-v2-evidence__disclaimer">{evidence.disclaimer}</p>
    </HomeV2PanelShell>
  );
}
