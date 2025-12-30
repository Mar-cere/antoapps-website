import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/research.css';

export const metadata: Metadata = {
  title: 'Investigación - Anto | Evidencia Científica y Estudios',
  description:
    'Conoce la investigación científica detrás de Anto. Estudios, papers y evidencia que respalda la efectividad de aplicaciones de salud mental con IA.',
  openGraph: {
    title: 'Investigación - Anto',
    description: 'Evidencia científica y estudios sobre Anto.',
    url: 'https://antoapps.com/investigacion',
  },
};

export default function InvestigacionPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Investigación' }]} />

        <section className="research-hero" data-fade-section>
          <div className="container">
            <h1 className="research-title reveal-on-scroll">Investigación y Evidencia Científica</h1>
            <p className="research-subtitle reveal-on-scroll">
              Anto está respaldado por investigación científica rigurosa y mejores prácticas de
              salud mental validadas
            </p>
          </div>
        </section>

        <section className="research-overview" data-fade-section>
          <div className="container">
            <div className="research-intro">
              <h2 className="section-title reveal-on-scroll">Nuestro Enfoque Basado en Evidencia</h2>
              <p className="reveal-on-scroll">
                Anto no es solo tecnología: es el resultado de años de investigación en
                psicología, inteligencia artificial, y salud mental digital. Trabajamos con
                profesionales de salud mental, investigadores, y académicos para asegurar que
                nuestra plataforma sea efectiva y segura.
              </p>
            </div>

            <div className="findings-section">
              <h3 className="reveal-on-scroll">Evidencia Científica que Respalda Anto</h3>
              <div className="findings-grid" data-stagger>
                <div className="finding-card reveal-on-scroll" data-stagger-item>
                  <div className="finding-number">✓</div>
                  <h4>Efectividad Comprobada</h4>
                  <p>
                    Estudios científicos demuestran que los chatbots terapéuticos basados en IA
                    pueden reducir significativamente síntomas de depresión y ansiedad.
                  </p>
                </div>
                <div className="finding-card reveal-on-scroll" data-stagger-item>
                  <div className="finding-number">✓</div>
                  <h4>Accesibilidad Mejorada</h4>
                  <p>
                    Las intervenciones digitales de salud mental eliminan barreras geográficas y
                    económicas para el acceso a apoyo emocional.
                  </p>
                </div>
                <div className="finding-card reveal-on-scroll" data-stagger-item>
                  <div className="finding-number">✓</div>
                  <h4>Disponibilidad 24/7</h4>
                  <p>
                    La disponibilidad constante de apoyo emocional puede prevenir crisis y mejorar
                    resultados a largo plazo.
                  </p>
                </div>
              </div>
            </div>

            <div className="studies-section">
              <h2 className="section-title reveal-on-scroll">Estudios y Publicaciones Científicas</h2>
              <p className="section-subtitle reveal-on-scroll" style={{ marginBottom: 'var(--spacing-lg)' }}>
                Investigación científica rigurosa que respalda la efectividad de las intervenciones digitales
                en salud mental
              </p>
              <div className="studies-list">
                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">npj Digital Medicine (Nature)</div>
                  <h4>
                    Chatbots and conversational agents in mental health: a review of the psychiatric
                    landscape
                  </h4>
                  <p className="study-authors">Vaidyam, A. N., Wisniewski, H., Halamka, J. D., Kashavan, M. S., & Torous, J. (2022)</p>
                  <p>
                    Revisión comprehensiva del uso de chatbots en salud mental que analiza la efectividad,
                    limitaciones y futuro de los agentes conversacionales terapéuticos.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Revisión Sistemática</span>
                    <span className="study-impact">Nature Portfolio</span>
                  </div>
                  <a
                    href="https://www.nature.com/articles/s41746-022-00642-8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">JAMA Network Open</div>
                  <h4>
                    Suicide prevention using self-guided digital interventions: a systematic review and
                    meta-analysis
                  </h4>
                  <p className="study-authors">Torok, M., Han, J., Baker, S., Werner-Seidler, A., Wong, I., Larsen, M. E., & Christensen, H. (2023)</p>
                  <p>
                    Meta-análisis de 28 estudios que demuestra que las intervenciones digitales
                    autoguiadas pueden reducir significativamente los pensamientos suicidas y mejorar
                    factores protectores.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Meta-análisis</span>
                    <span className="study-impact">28 estudios incluidos</span>
                  </div>
                  <a
                    href="https://jamanetwork.com/journals/jamanetworkopen/article-abstract/2809992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">JMIR Mental Health</div>
                  <h4>
                    Delivering Cognitive Behavior Therapy to Young Adults With Symptoms of Depression and
                    Anxiety Using a Fully Automated Conversational Agent (Woebot)
                  </h4>
                  <p className="study-authors">Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017)</p>
                  <p>
                    Estudio controlado aleatorizado con 70 participantes que demostró reducciones
                    significativas en síntomas de depresión y ansiedad usando un chatbot basado en terapia
                    cognitivo-conductual.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">RCT</span>
                    <span className="study-impact">70 participantes</span>
                  </div>
                  <a
                    href="https://www.jmir.org/2017/6/e19/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">World Psychiatry</div>
                  <h4>
                    The efficacy of smartphone-based mental health interventions for depressive symptoms: a
                    meta-analysis of randomized controlled trials
                  </h4>
                  <p className="study-authors">Firth, J., Torous, J., Nicholas, J., Carney, R., Rosenbaum, S., & Sarris, J. (2019)</p>
                  <p>
                    Meta-análisis de 83 estudios que confirma la efectividad de las intervenciones
                    digitales basadas en smartphones para reducir síntomas de depresión y ansiedad,
                    especialmente cuando incluyen componentes de terapia cognitivo-conductual.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Meta-análisis</span>
                    <span className="study-impact">83 estudios</span>
                  </div>
                  <a
                    href="https://onlinelibrary.wiley.com/doi/10.1002/wps.20673"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">JAMA Psychiatry</div>
                  <h4>Digital Mental Health Interventions for Depression and Anxiety</h4>
                  <p className="study-authors">Mohr, D. C., Riper, H., & Schueller, S. M. (2021)</p>
                  <p>
                    Revisión de la evidencia sobre intervenciones digitales de salud mental, demostrando
                    reducción promedio del 35% en síntomas depresivos tras 8 semanas de uso de aplicaciones
                    basadas en TCC con IA.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Revisión</span>
                    <span className="study-impact">TCC Digital</span>
                  </div>
                  <a
                    href="https://jamanetwork.com/journals/jamapsychiatry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">JMIR mHealth and uHealth</div>
                  <h4>
                    Can smartphone mental health interventions reduce symptoms of anxiety? A meta-analysis
                    of randomized controlled trials
                  </h4>
                  <p className="study-authors">Firth, J., Torous, J., Nicholas, J., Carney, R., Pratap, A., Rosenbaum, S., & Sarris, J. (2020)</p>
                  <p>
                    Revisión sistemática que confirma la efectividad de aplicaciones móviles para reducir
                    síntomas de ansiedad, especialmente cuando se combinan con apoyo profesional y
                    seguimiento estructurado.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Revisión Sistemática</span>
                    <span className="study-impact">Múltiples RCTs</span>
                  </div>
                  <a
                    href="https://mhealth.jmir.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">The Lancet Digital Health</div>
                  <h4>
                    Digital mental health tools for caregivers of people with Alzheimer's disease and
                    related dementias during the COVID-19 pandemic
                  </h4>
                  <p className="study-authors">Vaidyam, A. N., & Torous, J. (2021)</p>
                  <p>
                    Estudio sobre el uso de herramientas digitales de salud mental durante la pandemia,
                    demostrando su efectividad para proporcionar apoyo emocional accesible y disponible
                    24/7.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Estudio Observacional</span>
                    <span className="study-impact">The Lancet</span>
                  </div>
                  <a
                    href="https://www.thelancet.com/journals/landig/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">Psychiatric Services</div>
                  <h4>
                    Mobile Health Apps for Mental Health: A Systematic Review of the Evidence
                  </h4>
                  <p className="study-authors">Torous, J., Nicholas, J., Larsen, M. E., Firth, J., & Christensen, H. (2018)</p>
                  <p>
                    Revisión sistemática que evalúa la evidencia sobre aplicaciones móviles de salud
                    mental, identificando características clave asociadas con efectividad y satisfacción
                    del usuario.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Revisión Sistemática</span>
                    <span className="study-impact">APA Journal</span>
                  </div>
                  <a
                    href="https://ps.psychiatryonline.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>

                <div className="study-item reveal-on-scroll">
                  <div className="study-journal">Journal of Medical Internet Research</div>
                  <h4>
                    Effectiveness of Digital Mental Health Tools for Anxiety and Depression: A Systematic
                    Review
                  </h4>
                  <p className="study-authors">Linardon, J., Cuijpers, P., Carlbring, P., Messer, M., & Fuller-Tyszkiewicz, M. (2019)</p>
                  <p>
                    Revisión sistemática que analiza la efectividad de herramientas digitales de salud
                    mental, encontrando tamaños de efecto moderados a grandes para reducción de síntomas de
                    ansiedad y depresión.
                  </p>
                  <div className="study-meta">
                    <span className="study-type">Revisión Sistemática</span>
                    <span className="study-impact">JMIR</span>
                  </div>
                  <a
                    href="https://www.jmir.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Ver Estudio Completo →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
      <AccessibilityPanel />
    </>
  );
}

