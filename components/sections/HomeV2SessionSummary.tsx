import HomeV2PanelShell from '@/components/sections/HomeV2PanelShell';
import type { HomeV2SummaryPanel } from '@/lib/i18n/copy/home/home-v2';

type HomeV2SessionSummaryProps = {
  summary: HomeV2SummaryPanel;
  className?: string;
};

/** Resumen post-sesión: patrones y qué ayudó. */
export default function HomeV2SessionSummary({
  summary,
  className = '',
}: HomeV2SessionSummaryProps) {
  return (
    <HomeV2PanelShell
      title={summary.chromeTitle}
      size="moment"
      className={`home-v2-summary ${className}`.trim()}
      ariaLabel={summary.ariaLabel}
    >
      <p className="home-v2-summary__eyebrow">{summary.eyebrow}</p>
      <div className="home-v2-summary__mood" aria-hidden="true">
        <span className="home-v2-summary__mood-from">{summary.moodFrom}</span>
        <span className="home-v2-summary__mood-arrow">→</span>
        <span className="home-v2-summary__mood-to">{summary.moodTo}</span>
        <span className="home-v2-summary__mood-label">{summary.moodLabel}</span>
      </div>
      <p className="home-v2-summary__theme">{summary.theme}</p>
      <dl className="home-v2-summary__meta">
        <div className="home-v2-summary__row">
          <dt>{summary.patternLabel}</dt>
          <dd>{summary.pattern}</dd>
        </div>
        <div className="home-v2-summary__row">
          <dt>{summary.helpedLabel}</dt>
          <dd>{summary.helped}</dd>
        </div>
      </dl>
    </HomeV2PanelShell>
  );
}
