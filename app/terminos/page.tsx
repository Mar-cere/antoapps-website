import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/privacy.css';

export const metadata: Metadata = {
  title: 'Términos de Servicio - Anto | Condiciones de Uso',
  description:
    'Términos y condiciones de uso de la aplicación Anto. Lee nuestras condiciones de servicio antes de usar la aplicación.',
  openGraph: {
    title: 'Términos de Servicio - Anto',
    description: 'Términos y condiciones de uso de la aplicación Anto.',
    url: 'https://antoapps.com/terminos',
  },
};

export default function TerminosPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Términos de Servicio' }]} />

        <section className="privacy-hero" data-fade-section>
          <div className="container">
            <h1 className="section-title reveal-on-scroll">Términos de Servicio</h1>
            <p className="section-subtitle reveal-on-scroll">Última actualización: Enero 2025</p>
          </div>
        </section>

        <section className="privacy-content" data-fade-section>
          <div className="container">
            <div className="privacy-wrapper reveal-on-scroll">
              <div className="privacy-section">
                <h2>1. Aceptación de los Términos</h2>
                <p>
                  Al acceder y utilizar la aplicación Anto (&quot;la Aplicación&quot; o &quot;el
                  Servicio&quot;), usted acepta estar sujeto a estos Términos de Servicio
                  (&quot;Términos&quot;). Si no está de acuerdo con alguna parte de estos términos,
                  no debe utilizar la Aplicación.
                </p>
                <p>
                  Estos Términos constituyen un acuerdo legalmente vinculante entre usted
                  (&quot;Usuario&quot; o &quot;usted&quot;) y Anto (&quot;nosotros&quot;,
                  &quot;nuestro&quot; o &quot;la Empresa&quot;).
                </p>
              </div>

              <div className="privacy-section">
                <h2>2. Uso del Servicio</h2>
                <p>
                  Anto es una aplicación de salud mental que proporciona apoyo emocional mediante
                  inteligencia artificial. El servicio está diseñado para complementar, no
                  reemplazar, el tratamiento profesional de salud mental.
                </p>
              </div>

              <div className="privacy-section">
                <h2>3. Suscripciones Auto-Renovables</h2>
                <h3>3.1. Descripción del Servicio de Suscripción</h3>
                <p>
                  Anto ofrece planes de suscripción con renovación automática que proporcionan acceso
                  completo a todas las funcionalidades de la aplicación, incluyendo:
                </p>
                <ul>
                  <li>Asistente AI terapéutico 24/7</li>
                  <li>Análisis emocional avanzado con escalas clínicas (PHQ-9, GAD-7)</li>
                  <li>Detección de distorsiones cognitivas</li>
                  <li>Protocolos terapéuticos estructurados</li>
                  <li>Detección proactiva de crisis</li>
                  <li>Herramientas de bienestar y seguimiento de progreso</li>
                </ul>

                <h3>3.2. Renovación Automática</h3>
                <p>
                  Las suscripciones se renuevan automáticamente al final de cada período de facturación
                  (semanal, mensual, trimestral, semestral o anual, según el plan seleccionado) a menos
                  que se cancele antes del final del período actual.
                </p>
                <p>
                  Al renovarse, se cargará automáticamente el precio de la suscripción a tu método de
                  pago asociado en Apple App Store.
                </p>

                <h3>3.3. Precios y Facturación</h3>
                <p>
                  Los precios de las suscripciones se muestran claramente antes de la compra y pueden
                  variar según el plan seleccionado:
                </p>
                <ul>
                  <li>Plan de 1 Semana: $990 CLP</li>
                  <li>Plan Mensual: $3.990 CLP</li>
                  <li>Plan de 3 Meses: $11.990 CLP (Ahorra 10%)</li>
                  <li>Plan de 6 Meses: $20.990 CLP (Ahorra 12%)</li>
                  <li>Plan Anual: $39.990 CLP (Ahorra 17%)</li>
                </ul>
                <p>
                  Todos los precios incluyen impuestos aplicables. Los pagos se procesan a través de
                  Apple App Store y están sujetos a los términos y condiciones de Apple.
                </p>

                <h3>3.4. Cancelación de Suscripción</h3>
                <p>
                  Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta
                  de Apple ID en App Store. La cancelación entrará en vigor al final del período de
                  facturación actual, y mantendrás acceso a todas las funcionalidades hasta ese momento.
                </p>
                <p>
                  Para cancelar:
                </p>
                <ol>
                  <li>Abre la aplicación Configuración en tu dispositivo iOS</li>
                  <li>Toca tu nombre en la parte superior</li>
                  <li>Toca &quot;Medios y compras&quot; o &quot;Suscripciones&quot;</li>
                  <li>Toca &quot;Administrar&quot; y selecciona tu suscripción a Anto</li>
                  <li>Toca &quot;Cancelar suscripción&quot;</li>
                </ol>

                <h3>3.5. Reembolsos</h3>
                <p>
                  Los reembolsos están sujetos a la política de reembolsos de Apple App Store. Si
                  solicitas un reembolso, contacta directamente con el soporte de Apple a través de
                  reportaproblema.apple.com.
                </p>
                <p>
                  Anto no procesa reembolsos directamente, ya que todas las transacciones se manejan
                  a través de Apple App Store.
                </p>

                <h3>3.6. Cambios de Precio</h3>
                <p>
                  Nos reservamos el derecho de modificar los precios de las suscripciones en cualquier
                  momento. Si aumentamos el precio de tu plan actual, te notificaremos con al menos 30
                  días de anticipación. Si no aceptas el nuevo precio, puedes cancelar tu suscripción
                  antes de que entre en vigor el cambio.
                </p>

                <h3>3.7. Período de Prueba Gratuita</h3>
                <p>
                  Actualmente, Anto no ofrece períodos de prueba gratuita. Todos los planes requieren
                  pago inmediato al momento de la suscripción.
                </p>
              </div>

              <div className="privacy-section">
                <h2>4. Cuenta de Usuario</h2>
                <p>
                  Para utilizar Anto, debes crear una cuenta proporcionando información precisa y
                  actualizada. Eres responsable de mantener la confidencialidad de tus credenciales de
                  cuenta y de todas las actividades que ocurran bajo tu cuenta.
                </p>
              </div>

              <div className="privacy-section">
                <h2>5. Propiedad Intelectual</h2>
                <p>
                  Todo el contenido de la aplicación, incluyendo pero no limitado a texto, gráficos,
                  logos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos,
                  es propiedad de Anto o de sus proveedores de contenido y está protegido por las leyes
                  de propiedad intelectual.
                </p>
              </div>

              <div className="privacy-section">
                <h2>6. Limitación de Responsabilidad</h2>
                <p>
                  Anto es una herramienta de apoyo emocional y no reemplaza el tratamiento profesional de
                  salud mental. En caso de emergencia médica o crisis de salud mental, debes contactar
                  inmediatamente a servicios de emergencia o profesionales de salud mental.
                </p>
                <p>
                  Anto no se hace responsable de decisiones tomadas basándose en el contenido o
                  recomendaciones proporcionadas por la aplicación.
                </p>
              </div>

              <div className="privacy-section">
                <h2>7. Modificaciones de los Términos</h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Las
                  modificaciones entrarán en vigor inmediatamente después de su publicación en esta
                  página. Es tu responsabilidad revisar periódicamente estos términos.
                </p>
                <p>
                  El uso continuado de la aplicación después de cualquier modificación constituye tu
                  aceptación de los nuevos términos.
                </p>
              </div>

              <div className="privacy-section">
                <h2>8. Ley Aplicable</h2>
                <p>
                  Estos términos se rigen por las leyes de Chile. Cualquier disputa relacionada con
                  estos términos o con el uso de la aplicación será resuelta en los tribunales
                  competentes de Chile.
                </p>
              </div>

              <div className="privacy-section">
                <h2>9. Contacto</h2>
                <p>
                  Para preguntas sobre estos términos, contáctanos en:{' '}
                  <a href="mailto:soporte@antoapps.com">soporte@antoapps.com</a>
                </p>
                <p>
                  Para más información sobre cómo manejamos tus datos, consulta nuestra{' '}
                  <Link href="/privacidad">Política de Privacidad</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

