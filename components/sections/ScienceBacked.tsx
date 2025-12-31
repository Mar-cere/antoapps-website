'use client';

import { useScrollAnimations } from '@/lib/hooks/useScrollAnimations';
import Link from 'next/link';

export default function ScienceBacked() {
  useScrollAnimations();
  return (
    <section id="investigacion" className="science-backed" data-fade-section>
      <div className="container">
        <div className="science-header">
          <div className="science-badge">🔬</div>
          <h2 className="section-title reveal-on-scroll">Respaldado por Ciencia</h2>
          <p className="section-subtitle reveal-on-scroll">
            Anto está respaldado por estudios científicos publicados en revistas reconocidas
            internacionalmente
          </p>
        </div>

        <div className="studies-preview-grid" data-stagger>
          <div className="study-preview-card reveal-on-scroll stagger-item" data-stagger-item>
            <div className="study-preview-badge">📄 JMIR Mental Health</div>
            <h3>Efectividad de Chatbots Terapéuticos</h3>
            <p className="study-preview-authors">Fitzpatrick et al. (2017)</p>
            <p className="study-preview-abstract">
              Estudio controlado aleatorizado que demostró reducciones significativas en síntomas de
              depresión y ansiedad con chatbots basados en terapia cognitivo-conductual.
            </p>
            <div className="study-preview-metrics">
              <span className="metric-badge">RCT</span>
              <span className="metric-badge">70 participantes</span>
            </div>
            <a
              href="https://www.jmir.org/2017/6/e19/"
              target="_blank"
              rel="noopener noreferrer"
              className="study-link"
            >
              Ver Estudio Completo →
            </a>
          </div>

          <div className="study-preview-card reveal-on-scroll stagger-item" data-stagger-item>
            <div className="study-preview-badge">📊 World Psychiatry</div>
            <h3>Meta-Análisis de Apps Móviles</h3>
            <p className="study-preview-authors">Firth et al. (2019)</p>
            <p className="study-preview-abstract">
              Meta-análisis de 83 estudios confirma que las intervenciones digitales son efectivas para
              reducir síntomas de depresión y ansiedad.
            </p>
            <div className="study-preview-metrics">
              <span className="metric-badge">Meta-análisis</span>
              <span className="metric-badge">83 estudios</span>
            </div>
            <a
              href="https://onlinelibrary.wiley.com/doi/10.1002/wps.20673"
              target="_blank"
              rel="noopener noreferrer"
              className="study-link"
            >
              Ver Estudio Completo →
            </a>
          </div>

          <div className="study-preview-card reveal-on-scroll stagger-item" data-stagger-item>
            <div className="study-preview-badge">🔬 npj Digital Medicine</div>
            <h3>Chatbots de IA en Salud Mental</h3>
            <p className="study-preview-authors">Vaidyam et al. (2022)</p>
            <p className="study-preview-abstract">
              Revisión que analiza la efectividad de chatbots de IA, concluyendo que son herramientas
              valiosas para apoyo emocional y detección temprana.
            </p>
            <div className="study-preview-metrics">
              <span className="metric-badge">Nature</span>
              <span className="metric-badge">Revisión</span>
            </div>
            <a
              href="https://www.nature.com/articles/s41746-022-00642-8"
              target="_blank"
              rel="noopener noreferrer"
              className="study-link"
            >
              Ver Estudio Completo →
            </a>
          </div>
        </div>

        <div className="science-cta reveal-on-scroll">
          <Link href="/investigacion" className="btn btn-primary btn-large">
            Ver todos los estudios científicos →
          </Link>
        </div>
      </div>
    </section>
  );
}
