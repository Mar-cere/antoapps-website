import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import '@/styles/components/privacy.css';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Anto',
  description:
    'Política de privacidad de Anto. Conoce cómo protegemos y manejamos tus datos personales.',
  openGraph: {
    title: 'Política de Privacidad - Anto',
    description: 'Conoce cómo protegemos y manejamos tus datos personales.',
    url: 'https://antoapps.com/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Privacidad' }]} />

        <section className="privacy-hero">
          <div className="container">
            <h1 className="section-title reveal-on-scroll">Política de Privacidad</h1>
            <p className="section-subtitle reveal-on-scroll">
              Última actualización: Enero 2025
            </p>
          </div>
        </section>

        <section className="privacy-content" data-fade-section>
          <div className="container">
            <div className="privacy-wrapper">
              <div className="privacy-section">
                <h2>1. Información que Recopilamos</h2>
                <h3>1.1. Información que Proporcionas</h3>
                <p>
                  Recopilamos información que nos proporcionas directamente cuando:
                </p>
                <ul>
                  <li>Creas una cuenta en la aplicación</li>
                  <li>Utilizas el asistente AI y compartes conversaciones</li>
                  <li>Completas formularios o encuestas dentro de la aplicación</li>
                  <li>Contactas nuestro soporte</li>
                </ul>
                <p>
                  Esta información puede incluir: nombre, dirección de correo electrónico, conversaciones
                  con el asistente AI, respuestas a escalas clínicas (PHQ-9, GAD-7), y cualquier otra
                  información que elijas compartir.
                </p>

                <h3>1.2. Información Recopilada Automáticamente</h3>
                <p>
                  Cuando usas Anto, recopilamos automáticamente cierta información sobre tu dispositivo y
                  uso de la aplicación, incluyendo:
                </p>
                <ul>
                  <li>Información del dispositivo (modelo, sistema operativo, versión)</li>
                  <li>Identificadores únicos del dispositivo</li>
                  <li>Datos de uso de la aplicación (frecuencia de uso, funciones utilizadas)</li>
                  <li>Información de diagnóstico y rendimiento</li>
                </ul>

                <h3>1.3. Información de Suscripciones</h3>
                <p>
                  Cuando realizas una compra a través de Apple App Store, Apple procesa el pago y nos
                  proporciona información sobre tu suscripción, incluyendo el estado de la suscripción y
                  el período de facturación. No almacenamos información de tarjetas de crédito o métodos
                  de pago, ya que todo se maneja a través de Apple.
                </p>
              </div>

              <div className="privacy-section">
                <h2>2. Cómo Usamos tu Información</h2>
                <p>Utilizamos la información recopilada para:</p>
                <ul>
                  <li>
                    <strong>Proporcionar y mejorar el servicio:</strong> Utilizamos tus conversaciones y
                    datos para personalizar las respuestas del asistente AI y mejorar la calidad del
                    servicio.
                  </li>
                  <li>
                    <strong>Análisis emocional:</strong> Procesamos tus conversaciones para realizar
                    análisis emocional y detectar posibles distorsiones cognitivas, utilizando escalas
                    clínicas validadas.
                  </li>
                  <li>
                    <strong>Detección de crisis:</strong> Analizamos tu contenido para identificar
                    señales de riesgo y ofrecer recursos de apoyo cuando sea necesario.
                  </li>
                  <li>
                    <strong>Gestión de suscripciones:</strong> Procesamos información de suscripción para
                    gestionar tu cuenta y proporcionar acceso a funcionalidades premium.
                  </li>
                  <li>
                    <strong>Comunicación:</strong> Te contactamos sobre actualizaciones del servicio,
                    cambios en términos o políticas, o para responder a tus consultas.
                  </li>
                  <li>
                    <strong>Seguridad y prevención de fraude:</strong> Utilizamos información para
                    proteger la seguridad de la aplicación y prevenir actividades fraudulentas.
                  </li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2>3. Compartir Información</h2>
                <p>
                  <strong>No vendemos ni alquilamos tu información personal a terceros.</strong>
                </p>
                <p>Compartimos información solo en las siguientes circunstancias:</p>
                <ul>
                  <li>
                    <strong>Proveedores de servicios:</strong> Compartimos información con proveedores de
                    servicios que nos ayudan a operar la aplicación (hosting, análisis, procesamiento de
                    pagos a través de Apple).
                  </li>
                  <li>
                    <strong>Cumplimiento legal:</strong> Podemos divulgar información si es requerido por
                    ley o en respuesta a solicitudes legales válidas.
                  </li>
                  <li>
                    <strong>Emergencias de salud:</strong> En casos de emergencia médica o riesgo inminente
                    de daño, podemos compartir información relevante con servicios de emergencia o
                    profesionales de salud mental.
                  </li>
                  <li>
                    <strong>Con tu consentimiento:</strong> Compartimos información cuando nos das
                    consentimiento explícito para hacerlo.
                  </li>
                </ul>
              </div>

              <div className="privacy-section">
                <h2>4. Seguridad de los Datos</h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información
                  personal contra acceso no autorizado, alteración, divulgación o destrucción:
                </p>
                <ul>
                  <li>Encriptación de datos en tránsito y en reposo</li>
                  <li>Autenticación de dos factores cuando sea aplicable</li>
                  <li>Acceso restringido a información personal solo para personal autorizado</li>
                  <li>Monitoreo regular de sistemas para detectar vulnerabilidades</li>
                  <li>Cumplimiento con estándares de seguridad de la industria</li>
                </ul>
                <p>
                  Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es
                  100% seguro. Aunque nos esforzamos por proteger tu información, no podemos garantizar
                  seguridad absoluta.
                </p>
              </div>

              <div className="privacy-section">
                <h2>5. Retención de Datos</h2>
                <p>
                  Conservamos tu información personal mientras tu cuenta esté activa o según sea
                  necesario para proporcionar servicios, cumplir con obligaciones legales, resolver
                  disputas y hacer cumplir nuestros acuerdos.
                </p>
                <p>
                  Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento contactándonos
                  en marcelo.ull@antoapps.com. Eliminaremos tu información de acuerdo con nuestras
                  políticas de retención y requisitos legales.
                </p>
              </div>

              <div className="privacy-section">
                <h2>6. Tus Derechos</h2>
                <p>Tienes derecho a:</p>
                <ul>
                  <li>
                    <strong>Acceso:</strong> Solicitar una copia de la información personal que tenemos
                    sobre ti.
                  </li>
                  <li>
                    <strong>Rectificación:</strong> Corregir información inexacta o incompleta.
                  </li>
                  <li>
                    <strong>Eliminación:</strong> Solicitar la eliminación de tu información personal
                    cuando ya no sea necesaria.
                  </li>
                  <li>
                    <strong>Portabilidad:</strong> Recibir tu información personal en un formato
                    estructurado y de uso común.
                  </li>
                  <li>
                    <strong>Oposición:</strong> Oponerte al procesamiento de tu información personal en
                    ciertas circunstancias.
                  </li>
                  <li>
                    <strong>Retirar consentimiento:</strong> Retirar tu consentimiento para el
                    procesamiento de datos cuando se base en consentimiento.
                  </li>
                </ul>
                <p>
                  Para ejercer estos derechos, contáctanos en marcelo.ull@antoapps.com. Responderemos a
                  tu solicitud dentro de un plazo razonable.
                </p>
              </div>

              <div className="privacy-section">
                <h2>7. Privacidad de Menores</h2>
                <p>
                  Anto no está dirigido a menores de 18 años. No recopilamos intencionalmente información
                  personal de menores de 18 años. Si descubrimos que hemos recopilado información de un
                  menor sin el consentimiento de los padres, tomaremos medidas para eliminar esa
                  información.
                </p>
              </div>

              <div className="privacy-section">
                <h2>8. Cambios a esta Política</h2>
                <p>
                  Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre
                  cambios significativos publicando la nueva política en esta página y actualizando la
                  fecha de &quot;Última actualización&quot;.
                </p>
                <p>
                  Te recomendamos revisar esta política periódicamente para estar informado sobre cómo
                  protegemos tu información.
                </p>
              </div>

              <div className="privacy-section">
                <h2>9. Transferencias Internacionales</h2>
                <p>
                  Tu información puede ser transferida y procesada en países distintos al tuyo. Al usar
                  Anto, consientes la transferencia de tu información a estos países. Nos aseguramos de
                  que se implementen salvaguardas adecuadas para proteger tu información en estas
                  transferencias.
                </p>
              </div>

              <div className="privacy-section">
                <h2>10. Cookies y Tecnologías Similares</h2>
                <p>
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso
                  de la aplicación y personalizar el contenido. Puedes gestionar tus preferencias de
                  cookies a través de la configuración de tu dispositivo o navegador.
                </p>
              </div>

              <div className="privacy-section">
                <h2>11. Contacto</h2>
                <p>
                  Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de
                  Privacidad o el manejo de tus datos personales, contáctanos en:
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:marcelo.ull@antoapps.com">marcelo.ull@antoapps.com</a>
                </p>
                <p>
                  Para más información sobre los términos de uso de la aplicación, consulta nuestros{' '}
                  <Link href="/terminos">Términos de Servicio</Link>.
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

