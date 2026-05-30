import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import type { LegalPageCopy } from '@/lib/i18n/copy/legal-shared';

export type TermsPageMetadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
};

const metadataByLocale: Record<Locale, TermsPageMetadata> = {
  es: {
    title: 'Términos de Servicio - Anto | Condiciones de Uso',
    description:
      'Términos y condiciones de uso de la aplicación Anto. Lee nuestras condiciones de servicio antes de usar la aplicación.',
    openGraph: {
      title: 'Términos de Servicio - Anto',
      description: 'Términos y condiciones de uso de la aplicación Anto.',
      url: 'https://antoapps.com/terminos',
    },
  },
  en: {
    title: 'Terms of Service - Anto | Conditions of Use',
    description:
      'Terms and conditions for using the Anto app. Read our terms of service before using the application.',
    openGraph: {
      title: 'Terms of Service - Anto',
      description: 'Terms and conditions for using the Anto app.',
      url: 'https://antoapps.com/en/terminos',
    },
  },
};

function buildTermsSections(locale: Locale): LegalPageCopy['sections'] {
  if (locale === 'en') {
    return [
      {
        title: '1. Acceptance of Terms',
        blocks: [
          {
            kind: 'p',
            text: 'By accessing and using the Anto application ("the Application" or "the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these terms, you must not use the Application.',
          },
          {
            kind: 'p',
            text: 'These Terms constitute a legally binding agreement between you ("User" or "you") and Anto ("we", "our", or "the Company").',
          },
        ],
      },
      {
        title: '2. Use of the Service',
        blocks: [
          {
            kind: 'p',
            text: 'Anto is a mental health application that provides emotional support through artificial intelligence. The service is designed to complement, not replace, professional mental health treatment.',
          },
        ],
      },
      {
        title: '3. Auto-Renewable Subscriptions',
        blocks: [
          { kind: 'h3', text: '3.1. Subscription Service Description' },
          {
            kind: 'p',
            text: 'Anto offers auto-renewable subscription plans that provide full access to all app features, including:',
          },
          {
            kind: 'ul',
            items: [
              '24/7 AI assistant for emotional wellness (does not replace clinical care)',
              'Advanced emotional analysis with clinical scales (PHQ-9, GAD-7)',
              'Cognitive distortion detection',
              'Structured therapeutic protocols',
              'Proactive crisis detection',
              'Wellness tools and progress tracking',
            ],
          },
          { kind: 'h3', text: '3.2. Automatic Renewal' },
          {
            kind: 'p',
            text: 'Subscriptions automatically renew at the end of each billing period (monthly, quarterly, semi-annual, or annual, depending on the selected plan) unless canceled before the end of the current period.',
          },
          {
            kind: 'p',
            text: 'Upon renewal, the subscription price will be automatically charged to your payment method associated with the Apple App Store.',
          },
          { kind: 'h3', text: '3.3. Pricing and Billing' },
          {
            kind: 'p',
            text: 'Subscription prices are clearly displayed before purchase and may vary depending on the selected plan:',
          },
          {
            kind: 'ul',
            items: [
              'Monthly Plan: $3,990 CLP / approx. US$4.20',
              '3-Month Plan: $11,990 CLP / approx. US$12.62 (Save 10%)',
              '6-Month Plan: $20,990 CLP / approx. US$22.09 (Save 12%)',
              'Annual Plan: $39,990 CLP / approx. US$42.09 (Save 17%)',
            ],
          },
          {
            kind: 'p',
            text: 'All prices include applicable taxes. Payments are processed through the Apple App Store and are subject to Apple\'s terms and conditions.',
          },
          { kind: 'h3', text: '3.4. Subscription Cancellation' },
          {
            kind: 'p',
            text: 'You can cancel your subscription at any time from your Apple ID account settings in the App Store. Cancellation will take effect at the end of the current billing period, and you will retain access to all features until that time.',
          },
          { kind: 'p', text: 'To cancel:' },
          {
            kind: 'ol',
            items: [
              'Open the Settings app on your iOS device',
              'Tap your name at the top',
              'Tap "Media & Purchases" or "Subscriptions"',
              'Tap "Manage" and select your Anto subscription',
              'Tap "Cancel Subscription"',
            ],
          },
          { kind: 'h3', text: '3.5. Refunds' },
          {
            kind: 'p',
            text: 'Refunds are subject to the Apple App Store refund policy. If you request a refund, contact Apple Support directly through reportaproblema.apple.com.',
          },
          {
            kind: 'p',
            text: 'Anto does not process refunds directly, as all transactions are handled through the Apple App Store.',
          },
          { kind: 'h3', text: '3.6. Price Changes' },
          {
            kind: 'p',
            text: 'We reserve the right to modify subscription prices at any time. If we increase the price of your current plan, we will notify you at least 30 days in advance. If you do not accept the new price, you may cancel your subscription before the change takes effect.',
          },
          { kind: 'h3', text: '3.7. Free Trial Period' },
          {
            kind: 'p',
            text: 'Anto may offer a 1-day trial period to explore the features, depending on the plan and app store. The exact conditions (start, scope, and billing after the trial) are shown at the time of purchase or subscription in the app and on the Apple App Store.',
          },
        ],
      },
      {
        title: '4. User Account',
        blocks: [
          {
            kind: 'p',
            text: 'To use Anto, you must create an account by providing accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
          },
        ],
      },
      {
        title: '5. Intellectual Property',
        blocks: [
          {
            kind: 'p',
            text: 'All app content, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and data compilations, is the property of Anto or its content providers and is protected by intellectual property laws.',
          },
        ],
      },
      {
        title: '6. Limitation of Liability',
        blocks: [
          {
            kind: 'p',
            text: 'Anto is an emotional support tool and does not replace professional mental health treatment. In case of a medical emergency or mental health crisis, you must immediately contact emergency services or mental health professionals.',
          },
          {
            kind: 'p',
            text: 'Anto is not responsible for decisions made based on content or recommendations provided by the application.',
          },
        ],
      },
      {
        title: '7. Modifications to the Terms',
        blocks: [
          {
            kind: 'p',
            text: 'We reserve the right to modify these terms at any time. Modifications will take effect immediately after they are posted on this page. It is your responsibility to review these terms periodically.',
          },
          {
            kind: 'p',
            text: 'Continued use of the application after any modification constitutes your acceptance of the new terms.',
          },
        ],
      },
      {
        title: '8. Governing Law',
        blocks: [
          {
            kind: 'p',
            text: 'These terms are governed by the laws of Chile. Any dispute related to these terms or the use of the application will be resolved in the competent courts of Chile.',
          },
        ],
      },
      {
        title: '9. Contact',
        blocks: [
          {
            kind: 'p',
            text: 'For questions about these terms, contact us at: soporte@antoapps.com',
          },
          {
            kind: 'p-link',
            before: 'For more information about how we handle your data, see our ',
            linkText: 'Privacy Policy',
            linkHref: localePath(locale, '/privacidad'),
            after: '.',
          },
        ],
      },
    ];
  }

  return [
    {
      title: '1. Aceptación de los Términos',
      blocks: [
        {
          kind: 'p',
          text: 'Al acceder y utilizar la aplicación Anto ("la Aplicación" o "el Servicio"), usted acepta estar sujeto a estos Términos de Servicio ("Términos"). Si no está de acuerdo con alguna parte de estos términos, no debe utilizar la Aplicación.',
        },
        {
          kind: 'p',
          text: 'Estos Términos constituyen un acuerdo legalmente vinculante entre usted ("Usuario" o "usted") y Anto ("nosotros", "nuestro" o "la Empresa").',
        },
      ],
    },
    {
      title: '2. Uso del Servicio',
      blocks: [
        {
          kind: 'p',
          text: 'Anto es una aplicación de salud mental que proporciona apoyo emocional mediante inteligencia artificial. El servicio está diseñado para complementar, no reemplazar, el tratamiento profesional de salud mental.',
        },
      ],
    },
    {
      title: '3. Suscripciones Auto-Renovables',
      blocks: [
        { kind: 'h3', text: '3.1. Descripción del Servicio de Suscripción' },
        {
          kind: 'p',
          text: 'Anto ofrece planes de suscripción con renovación automática que proporcionan acceso completo a todas las funcionalidades de la aplicación, incluyendo:',
        },
        {
          kind: 'ul',
          items: [
            'Asistente de IA para bienestar emocional 24/7 (no sustituye atención clínica)',
            'Análisis emocional avanzado con escalas clínicas (PHQ-9, GAD-7)',
            'Detección de distorsiones cognitivas',
            'Protocolos terapéuticos estructurados',
            'Detección proactiva de crisis',
            'Herramientas de bienestar y seguimiento de progreso',
          ],
        },
        { kind: 'h3', text: '3.2. Renovación Automática' },
        {
          kind: 'p',
          text: 'Las suscripciones se renuevan automáticamente al final de cada período de facturación (mensual, trimestral, semestral o anual, según el plan seleccionado) a menos que se cancele antes del final del período actual.',
        },
        {
          kind: 'p',
          text: 'Al renovarse, se cargará automáticamente el precio de la suscripción a tu método de pago asociado en Apple App Store.',
        },
        { kind: 'h3', text: '3.3. Precios y Facturación' },
        {
          kind: 'p',
          text: 'Los precios de las suscripciones se muestran claramente antes de la compra y pueden variar según el plan seleccionado:',
        },
        {
          kind: 'ul',
          items: [
            'Plan Mensual: $3.990 CLP / US$4.20 aprox.',
            'Plan de 3 Meses: $11.990 CLP / US$12.62 aprox. (Ahorra 10%)',
            'Plan de 6 Meses: $20.990 CLP / US$22.09 aprox. (Ahorra 12%)',
            'Plan Anual: $39.990 CLP / US$42.09 aprox. (Ahorra 17%)',
          ],
        },
        {
          kind: 'p',
          text: 'Todos los precios incluyen impuestos aplicables. Los pagos se procesan a través de Apple App Store y están sujetos a los términos y condiciones de Apple.',
        },
        { kind: 'h3', text: '3.4. Cancelación de Suscripción' },
        {
          kind: 'p',
          text: 'Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta de Apple ID en App Store. La cancelación entrará en vigor al final del período de facturación actual, y mantendrás acceso a todas las funcionalidades hasta ese momento.',
        },
        { kind: 'p', text: 'Para cancelar:' },
        {
          kind: 'ol',
          items: [
            'Abre la aplicación Configuración en tu dispositivo iOS',
            'Toca tu nombre en la parte superior',
            'Toca "Medios y compras" o "Suscripciones"',
            'Toca "Administrar" y selecciona tu suscripción a Anto',
            'Toca "Cancelar suscripción"',
          ],
        },
        { kind: 'h3', text: '3.5. Reembolsos' },
        {
          kind: 'p',
          text: 'Los reembolsos están sujetos a la política de reembolsos de Apple App Store. Si solicitas un reembolso, contacta directamente con el soporte de Apple a través de reportaproblema.apple.com.',
        },
        {
          kind: 'p',
          text: 'Anto no procesa reembolsos directamente, ya que todas las transacciones se manejan a través de Apple App Store.',
        },
        { kind: 'h3', text: '3.6. Cambios de Precio' },
        {
          kind: 'p',
          text: 'Nos reservamos el derecho de modificar los precios de las suscripciones en cualquier momento. Si aumentamos el precio de tu plan actual, te notificaremos con al menos 30 días de anticipación. Si no aceptas el nuevo precio, puedes cancelar tu suscripción antes de que entre en vigor el cambio.',
        },
        { kind: 'h3', text: '3.7. Período de Prueba Gratuita' },
        {
          kind: 'p',
          text: 'Anto puede ofrecer un período de prueba de 1 día para explorar las funcionalidades, según el plan y la tienda de aplicaciones. Las condiciones exactas (inicio, alcance y facturación tras la prueba) se muestran en el momento de la compra o suscripción en la app y en Apple App Store.',
        },
      ],
    },
    {
      title: '4. Cuenta de Usuario',
      blocks: [
        {
          kind: 'p',
          text: 'Para utilizar Anto, debes crear una cuenta proporcionando información precisa y actualizada. Eres responsable de mantener la confidencialidad de tus credenciales de cuenta y de todas las actividades que ocurran bajo tu cuenta.',
        },
      ],
    },
    {
      title: '5. Propiedad Intelectual',
      blocks: [
        {
          kind: 'p',
          text: 'Todo el contenido de la aplicación, incluyendo pero no limitado a texto, gráficos, logos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Anto o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.',
        },
      ],
    },
    {
      title: '6. Limitación de Responsabilidad',
      blocks: [
        {
          kind: 'p',
          text: 'Anto es una herramienta de apoyo emocional y no reemplaza el tratamiento profesional de salud mental. En caso de emergencia médica o crisis de salud mental, debes contactar inmediatamente a servicios de emergencia o profesionales de salud mental.',
        },
        {
          kind: 'p',
          text: 'Anto no se hace responsable de decisiones tomadas basándose en el contenido o recomendaciones proporcionadas por la aplicación.',
        },
      ],
    },
    {
      title: '7. Modificaciones de los Términos',
      blocks: [
        {
          kind: 'p',
          text: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en esta página. Es tu responsabilidad revisar periódicamente estos términos.',
        },
        {
          kind: 'p',
          text: 'El uso continuado de la aplicación después de cualquier modificación constituye tu aceptación de los nuevos términos.',
        },
      ],
    },
    {
      title: '8. Ley Aplicable',
      blocks: [
        {
          kind: 'p',
          text: 'Estos términos se rigen por las leyes de Chile. Cualquier disputa relacionada con estos términos o con el uso de la aplicación será resuelta en los tribunales competentes de Chile.',
        },
      ],
    },
    {
      title: '9. Contacto',
      blocks: [
        {
          kind: 'p',
          text: 'Para preguntas sobre estos términos, contáctanos en: soporte@antoapps.com',
        },
        {
          kind: 'p-link',
          before: 'Para más información sobre cómo manejamos tus datos, consulta nuestra ',
          linkText: 'Política de Privacidad',
          linkHref: localePath(locale, '/privacidad'),
          after: '.',
        },
      ],
    },
  ];
}

function buildTermsPageCopy(locale: Locale): LegalPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Terms of Service',
      },
      title: 'Terms of Service',
      lastUpdated: 'Last updated: January 2025',
      sections: buildTermsSections(locale),
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Términos de Servicio',
    },
    title: 'Términos de Servicio',
    lastUpdated: 'Última actualización: Enero 2025',
    sections: buildTermsSections(locale),
  };
}

export function termsPageMetadata(locale: Locale): Metadata {
  const meta = metadataByLocale[locale];
  return buildLocalizedPageMetadata(locale, '/terminos', meta);
}

export function getTermsPageCopy(locale: Locale): LegalPageCopy {
  return buildTermsPageCopy(locale);
}
