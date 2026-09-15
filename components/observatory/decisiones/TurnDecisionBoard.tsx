import { MuteChips } from '@/components/observatory/ui/MuteChips';
import { choiceLabel, factLabel } from '@/lib/observatory/copy/labels';
import { domainLine, extrasOutcomeLabel, muteSummary, turnSignals } from '@/lib/observatory/copy/turnReading';
import type { TurnDecisionStory } from '@/lib/observatory/data/turnDecision';

export function TurnDecisionBoard({
  story,
  density = 'full',
}: {
  story: TurnDecisionStory;
  density?: 'glance' | 'full';
}) {
  const signals = turnSignals(story);
  const emptyKinds =
    story.extrasMode === 'applied' &&
    story.muteFlags.includes('soft_landing') &&
    story.extrasCandidateKindsBefore.length === 0;

  if (density === 'glance') {
    return (
      <section className="turn-story" aria-label="Qué pasó en este turno">
        <ul className="signal-strip">
          {signals.map((signal) => (
            <li key={signal.id} data-tone={signal.tone ?? 'ok'}>
              <p className="signal-v">{signal.value}</p>
              <p className="signal-k">{signal.label}</p>
              {signal.hint ? <p className="s">{signal.hint}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const domain = domainLine(story);
  const extrasKinds =
    story.extrasCandidateKindsBefore.length > 0 || story.extrasCandidateKindsAfter.length > 0;
  const extrasCounts = story.extrasCountBefore != null || story.extrasCountAfter != null;

  return (
    <section className="decision-board" aria-label="Decisión de este turno">
      <article className="decision-col" data-role="engine">
        <h3>Engine</h3>
        <p className="decision-choice">{choiceLabel(story.engineChoice)}</p>
        <dl className="col-facts">
          <div>
            <dt>Cómo</dt>
            <dd>{factLabel(story.engineMode)}</dd>
          </div>
          <div>
            <dt>Vía</dt>
            <dd>{factLabel(story.engineDeliberation)}</dd>
          </div>
          <div>
            <dt>Opciones</dt>
            <dd>{story.engineCandidates == null ? 'Sin recuento' : String(story.engineCandidates)}</dd>
          </div>
        </dl>
        {story.split ? (
          <p className="turn-note">La sombra registró {choiceLabel(story.shadowChoice)}.</p>
        ) : null}
      </article>
      <article className="decision-col" data-role="experience">
        <h3>Forma</h3>
        <p className="decision-choice">{choiceLabel(story.cue)}</p>
        <dl className="col-facts">
          <div>
            <dt>Cue</dt>
            <dd>
              {story.experienceMode === 'applied'
                ? 'Aplicó la forma'
                : story.experienceMode === 'shadow'
                  ? 'Observó'
                  : factLabel(story.experienceMode)}
            </dd>
          </div>
          <div>
            <dt>Canal</dt>
            <dd>{choiceLabel(story.modality)}</dd>
          </div>
          <div>
            <dt>Conversión</dt>
            <dd>
              {story.conversionSuppression === 'none' || !story.conversionSuppression
                ? 'Sin supresión'
                : factLabel(story.conversionSuppression)}
            </dd>
          </div>
        </dl>
      </article>
      <article className="decision-col" data-role="extras">
        <h3>Extras</h3>
        <p className="decision-choice">{extrasOutcomeLabel(story)}</p>
        <dl className="col-facts">
          {domain ? (
            <div>
              <dt>Dominio</dt>
              <dd>{domain}</dd>
            </div>
          ) : null}
          <div>
            <dt>Decisión</dt>
            <dd>{factLabel(story.extrasDecision)}</dd>
          </div>
          <div>
            <dt>Terceros</dt>
            <dd>{factLabel(story.extrasThirdPartyBand)}</dd>
          </div>
        </dl>
        {extrasKinds || extrasCounts || story.extrasReasonCodes.length > 0 ? (
          <details className="obs-fold">
            <summary>Inventario y motivos</summary>
            <dl className="col-facts">
              {extrasKinds ? (
                <div>
                  <dt>Tipos</dt>
                  <dd>
                    {story.extrasCandidateKindsBefore.join(', ') || 'Ninguno'} →{' '}
                    {story.extrasCandidateKindsAfter.join(', ') || 'Ninguno'}
                  </dd>
                </div>
              ) : null}
              {extrasCounts ? (
                <div>
                  <dt>Cantidad</dt>
                  <dd>
                    {factLabel(story.extrasCountBefore)} → {factLabel(story.extrasCountAfter)}
                    {story.extrasSelectedKind && story.extrasSelectedKind !== 'none'
                      ? ` · ${factLabel(story.extrasSelectedKind)}`
                      : ''}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Candidato del turno</dt>
                <dd>{factLabel(story.domainCandidate)}</dd>
              </div>
              {story.extrasReasonCodes.length > 0 ? (
                <div>
                  <dt>Motivos</dt>
                  <dd>{story.extrasReasonCodes.join(' · ')}</dd>
                </div>
              ) : null}
            </dl>
          </details>
        ) : null}
        {emptyKinds ? (
          <p className="turn-note">El aterrizaje suave explica el inventario vacío.</p>
        ) : null}
        {story.surface === 'guest' ? (
          <p className="turn-note">Invitado: extras siempre observan, no llegan al chat.</p>
        ) : null}
      </article>
      <article className="decision-col" data-role="safety">
        <h3>Mute</h3>
        <p className="decision-choice">
          {story.muteFlags.length > 0
            ? muteSummary(story.muteFlags)
            : story.safetyRoute && story.safetyRoute !== 'none'
              ? factLabel(story.safetyRoute)
              : 'Nada silenciado'}
        </p>
        <dl className="col-facts">
          <div>
            <dt>Riesgo</dt>
            <dd>{factLabel(story.riskClass)}</dd>
          </div>
          <div>
            <dt>Quién</dt>
            <dd>{factLabel(story.surface)}</dd>
          </div>
        </dl>
        <MuteChips flags={story.muteFlags} />
      </article>
    </section>
  );
}
