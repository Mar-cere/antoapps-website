import { MuteChips } from '@/components/observatory/ui/MuteChips';
import { choiceLabel, factLabel } from '@/lib/observatory/copy/labels';
import type { TurnDecisionStory } from '@/lib/observatory/data/turnDecision';

export function TurnDecisionBoard({ story }: { story: TurnDecisionStory }) {
  const emptyKinds =
    story.extrasMode === 'applied' &&
    story.muteFlags.includes('soft_landing') &&
    story.extrasCandidateKindsBefore.length === 0;

  return (
    <section className="decision-board" aria-label="Decisión de este turno">
      <article className="decision-col" data-role="engine">
        <h3>Engine</h3>
        <p className="decision-choice">{choiceLabel(story.engineChoice)}</p>
        <dl className="col-facts">
          <div>
            <dt>mode</dt>
            <dd>{factLabel(story.engineMode)}</dd>
          </div>
          <div>
            <dt>deliberation</dt>
            <dd>{factLabel(story.engineDeliberation)}</dd>
          </div>
          <div>
            <dt>candidates</dt>
            <dd>
              {story.engineCandidates == null
                ? 'Sin recuento'
                : `${story.engineCandidates} ids servibles`}
            </dd>
          </div>
        </dl>
        <p className="s">Psyche no decide. Participó si hubo candidates.</p>
      </article>
      <article className="decision-col" data-role="experience">
        <h3>Experience</h3>
        <p className="decision-choice">{factLabel(story.cue)}</p>
        <dl className="col-facts">
          <div>
            <dt>cue mode</dt>
            <dd>{factLabel(story.experienceMode)}</dd>
          </div>
          <div>
            <dt>modalidad</dt>
            <dd>{choiceLabel(story.modality)}</dd>
          </div>
          <div>
            <dt>conversionSuppression</dt>
            <dd>{factLabel(story.conversionSuppression)}</dd>
          </div>
        </dl>
        <p className="s">Apply de cue es un flag distinto al de extras.</p>
      </article>
      <article className="decision-col" data-role="extras">
        <h3>Extras</h3>
        <p className="decision-choice">
          {story.extrasMode ? `${story.extrasMode} / ${factLabel(story.extrasDecision)}` : 'Sin evento'}
        </p>
        <dl className="col-facts">
          <div>
            <dt>applied</dt>
            <dd>{factLabel(story.extrasApplied)}</dd>
          </div>
          <div>
            <dt>activeDomain</dt>
            <dd>{factLabel(story.extrasActiveDomain)}</dd>
          </div>
          <div>
            <dt>domainSource</dt>
            <dd>{factLabel(story.extrasDomainSource)}</dd>
          </div>
          <div>
            <dt>thirdPartyBand</dt>
            <dd>{factLabel(story.extrasThirdPartyBand)}</dd>
          </div>
          <div>
            <dt>domainCandidate</dt>
            <dd>{factLabel(story.domainCandidate)} (candidato)</dd>
          </div>
          <div>
            <dt>kinds</dt>
            <dd>
              before {story.extrasCandidateKindsBefore.join(', ') || '[]'} → after{' '}
              {story.extrasCandidateKindsAfter.join(', ') || '[]'}
            </dd>
          </div>
          <div>
            <dt>counts</dt>
            <dd>
              {factLabel(story.extrasCountBefore)} → {factLabel(story.extrasCountAfter)} · selected{' '}
              {factLabel(story.extrasSelectedKind)}
            </dd>
          </div>
          {story.extrasReasonCodes.length > 0 ? (
            <div>
              <dt>reasonCodes</dt>
              <dd>{story.extrasReasonCodes.join(' · ')}</dd>
            </div>
          ) : null}
        </dl>
        {story.extrasMode ? (
          <p className="s">
            mode={story.extrasMode} es el canary. applied={String(story.extrasApplied)} no equivale a flag off.
          </p>
        ) : null}
        {story.surface === 'guest' ? (
          <p className="s">Guest: extras siempre shadow. Applied exige flag, canary hex y surface=registered.</p>
        ) : null}
        {story.familyCarried ? (
          <p className="s">Carry familiar: activeDomain=family y domainSource=carried, aunque domainCandidate sea unknown.</p>
        ) : null}
        {emptyKinds ? (
          <p className="s">Canary vivo con inventario vacío: soft_landing explica candidateKindsBefore=[].</p>
        ) : null}
      </article>
      <article className="decision-col" data-role="safety">
        <h3>Mute / Safety</h3>
        <p className="decision-choice">{factLabel(story.safetyRoute)}</p>
        <dl className="col-facts">
          <div>
            <dt>riskClass</dt>
            <dd>{factLabel(story.riskClass)}</dd>
          </div>
          <div>
            <dt>surface</dt>
            <dd>{factLabel(story.surface)}</dd>
          </div>
        </dl>
        <MuteChips flags={story.muteFlags} />
        <p className="s">Consent purpose-deny no entra en muteFlags. Crisis no se mueve al prompt.</p>
      </article>
    </section>
  );
}
