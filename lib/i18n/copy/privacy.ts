import { localePath, type Locale } from '@/lib/i18n/config';
import type { LegalPageCopy } from '@/lib/i18n/copy/legal-shared';

export type PrivacyPageMetadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
};

const metadataByLocale: Record<Locale, PrivacyPageMetadata> = {
  es: {
    title: 'Política de Privacidad - Anto',
    description:
      'Política de privacidad de Anto. Conoce cómo protegemos y manejamos tus datos personales.',
    openGraph: {
      title: 'Política de Privacidad - Anto',
      description: 'Conoce cómo protegemos y manejamos tus datos personales.',
      url: 'https://antoapps.com/privacidad',
    },
  },
  en: {
    title: 'Privacy Policy - Anto',
    description:
      'Anto privacy policy. Learn how we protect and handle your personal data.',
    openGraph: {
      title: 'Privacy Policy - Anto',
      description: 'Learn how we protect and handle your personal data.',
      url: 'https://antoapps.com/en/privacidad',
    },
  },
};

function buildPrivacySections(locale: Locale): LegalPageCopy['sections'] {
  if (locale === 'en') {
    return [
      {
        title: '1. Information We Collect',
        blocks: [
          { kind: 'h3', text: '1.1. Information You Provide' },
          {
            kind: 'p',
            text: 'We collect information that you provide directly when you:',
          },
          {
            kind: 'ul',
            items: [
              'Create an account in the app',
              'Use the AI assistant and share conversations',
              'Complete forms or surveys within the app',
              'Contact our support team',
            ],
          },
          {
            kind: 'p',
            text: 'This information may include: name, email address, conversations with the AI assistant, responses to clinical scales (PHQ-9, GAD-7), and any other information you choose to share.',
          },
          { kind: 'h3', text: '1.2. Information Collected Automatically' },
          {
            kind: 'p',
            text: 'When you use Anto, we automatically collect certain information about your device and app usage, including:',
          },
          {
            kind: 'ul',
            items: [
              'Device information (model, operating system, version)',
              'Unique device identifiers',
              'App usage data (frequency of use, features used)',
              'Diagnostic and performance information',
            ],
          },
          { kind: 'h3', text: '1.3. Subscription Information' },
          {
            kind: 'p',
            text: 'When you make a purchase through the Apple App Store, Apple processes the payment and provides us with information about your subscription, including subscription status and billing period. We do not store credit card or payment method information, as everything is handled through Apple.',
          },
        ],
      },
      {
        title: '2. How We Use Your Information',
        blocks: [
          { kind: 'p', text: 'We use the information we collect to:' },
          {
            kind: 'ul',
            items: [
              'Provide and improve the service: We use your conversations and data to personalize AI assistant responses and improve service quality.',
              'Emotional analysis: We process your conversations to perform emotional analysis and detect possible cognitive distortions, using validated clinical scales.',
              'Crisis detection: We analyze your content to identify risk signals and offer support resources when needed.',
              'Subscription management: We process subscription information to manage your account and provide access to premium features.',
              'Communication: We contact you about service updates, changes to terms or policies, or to respond to your inquiries.',
              'Security and fraud prevention: We use information to protect app security and prevent fraudulent activity.',
            ],
          },
        ],
      },
      {
        title: '3. Sharing Information',
        blocks: [
          {
            kind: 'p',
            text: 'We do not sell or rent your personal information to third parties.',
          },
          { kind: 'p', text: 'We share information only in the following circumstances:' },
          {
            kind: 'ul',
            items: [
              'Service providers: We share information with service providers that help us operate the app (hosting, analytics, payment processing through Apple).',
              'Legal compliance: We may disclose information if required by law or in response to valid legal requests.',
              'Health emergencies: In cases of medical emergency or imminent risk of harm, we may share relevant information with emergency services or mental health professionals.',
              'With your consent: We share information when you give us explicit consent to do so.',
            ],
          },
        ],
      },
      {
        title: '4. Data Security',
        blocks: [
          {
            kind: 'p',
            text: 'We implement technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:',
          },
          {
            kind: 'ul',
            items: [
              'Encryption of data in transit and at rest',
              'Two-factor authentication where applicable',
              'Restricted access to personal information for authorized personnel only',
              'Regular system monitoring to detect vulnerabilities',
              'Compliance with industry security standards',
            ],
          },
          {
            kind: 'p',
            text: 'However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.',
          },
        ],
      },
      {
        title: '5. Data Retention',
        blocks: [
          {
            kind: 'p',
            text: 'We retain your personal information while your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.',
          },
          {
            kind: 'p',
            text: 'You may request deletion of your account and data at any time by contacting us at soporte@antoapps.com. We will delete your information in accordance with our retention policies and legal requirements.',
          },
        ],
      },
      {
        title: '6. Your Rights',
        blocks: [
          { kind: 'p', text: 'You have the right to:' },
          {
            kind: 'ul',
            items: [
              'Access: Request a copy of the personal information we hold about you.',
              'Rectification: Correct inaccurate or incomplete information.',
              'Deletion: Request deletion of your personal information when it is no longer necessary.',
              'Portability: Receive your personal information in a structured, commonly used format.',
              'Objection: Object to the processing of your personal information in certain circumstances.',
              'Withdraw consent: Withdraw your consent for data processing when it is based on consent.',
            ],
          },
          {
            kind: 'p',
            text: 'To exercise these rights, contact us at soporte@antoapps.com. We will respond to your request within a reasonable timeframe.',
          },
        ],
      },
      {
        title: '7. Children\'s Privacy',
        blocks: [
          {
            kind: 'p',
            text: 'Anto is not directed at anyone under 18 years of age. We do not knowingly collect personal information from anyone under 18. If we discover that we have collected information from a minor without parental consent, we will take steps to delete that information.',
          },
        ],
      },
      {
        title: '8. Changes to This Policy',
        blocks: [
          {
            kind: 'p',
            text: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date.',
          },
          {
            kind: 'p',
            text: 'We recommend reviewing this policy periodically to stay informed about how we protect your information.',
          },
        ],
      },
      {
        title: '9. International Transfers',
        blocks: [
          {
            kind: 'p',
            text: 'Your information may be transferred to and processed in countries other than your own. By using Anto, you consent to the transfer of your information to these countries. We ensure that appropriate safeguards are in place to protect your information in these transfers.',
          },
        ],
      },
      {
        title: '10. Cookies and Similar Technologies',
        blocks: [
          {
            kind: 'p',
            text: 'We use cookies and similar technologies to improve your experience, analyze app usage, and personalize content. You can manage your cookie preferences through your device or browser settings.',
          },
        ],
      },
      {
        title: '11. Contact',
        blocks: [
          {
            kind: 'p',
            text: 'If you have questions, concerns, or requests related to this Privacy Policy or the handling of your personal data, contact us at:',
          },
          { kind: 'p', text: 'Email: soporte@antoapps.com' },
          {
            kind: 'p-link',
            before: 'For more information about the app terms of use, see our ',
            linkText: 'Terms of Service',
            linkHref: localePath(locale, '/terminos'),
            after: '.',
          },
        ],
      },
    ];
  }

  return [
    {
      title: '1. Información que Recopilamos',
      blocks: [
        { kind: 'h3', text: '1.1. Información que Proporcionas' },
        {
          kind: 'p',
          text: 'Recopilamos información que nos proporcionas directamente cuando:',
        },
        {
          kind: 'ul',
          items: [
            'Creas una cuenta en la aplicación',
            'Utilizas el asistente AI y compartes conversaciones',
            'Completas formularios o encuestas dentro de la aplicación',
            'Contactas nuestro soporte',
          ],
        },
        {
          kind: 'p',
          text: 'Esta información puede incluir: nombre, dirección de correo electrónico, conversaciones con el asistente AI, respuestas a escalas clínicas (PHQ-9, GAD-7), y cualquier otra información que elijas compartir.',
        },
        { kind: 'h3', text: '1.2. Información Recopilada Automáticamente' },
        {
          kind: 'p',
          text: 'Cuando usas Anto, recopilamos automáticamente cierta información sobre tu dispositivo y uso de la aplicación, incluyendo:',
        },
        {
          kind: 'ul',
          items: [
            'Información del dispositivo (modelo, sistema operativo, versión)',
            'Identificadores únicos del dispositivo',
            'Datos de uso de la aplicación (frecuencia de uso, funciones utilizadas)',
            'Información de diagnóstico y rendimiento',
          ],
        },
        { kind: 'h3', text: '1.3. Información de Suscripciones' },
        {
          kind: 'p',
          text: 'Cuando realizas una compra a través de Apple App Store, Apple procesa el pago y nos proporciona información sobre tu suscripción, incluyendo el estado de la suscripción y el período de facturación. No almacenamos información de tarjetas de crédito o métodos de pago, ya que todo se maneja a través de Apple.',
        },
      ],
    },
    {
      title: '2. Cómo Usamos tu Información',
      blocks: [
        { kind: 'p', text: 'Utilizamos la información recopilada para:' },
        {
          kind: 'ul',
          items: [
            'Proporcionar y mejorar el servicio: Utilizamos tus conversaciones y datos para personalizar las respuestas del asistente AI y mejorar la calidad del servicio.',
            'Análisis emocional: Procesamos tus conversaciones para realizar análisis emocional y detectar posibles distorsiones cognitivas, utilizando escalas clínicas validadas.',
            'Detección de crisis: Analizamos tu contenido para identificar señales de riesgo y ofrecer recursos de apoyo cuando sea necesario.',
            'Gestión de suscripciones: Procesamos información de suscripción para gestionar tu cuenta y proporcionar acceso a funcionalidades premium.',
            'Comunicación: Te contactamos sobre actualizaciones del servicio, cambios en términos o políticas, o para responder a tus consultas.',
            'Seguridad y prevención de fraude: Utilizamos información para proteger la seguridad de la aplicación y prevenir actividades fraudulentas.',
          ],
        },
      ],
    },
    {
      title: '3. Compartir Información',
      blocks: [
        {
          kind: 'p',
          text: 'No vendemos ni alquilamos tu información personal a terceros.',
        },
        { kind: 'p', text: 'Compartimos información solo en las siguientes circunstancias:' },
        {
          kind: 'ul',
          items: [
            'Proveedores de servicios: Compartimos información con proveedores de servicios que nos ayudan a operar la aplicación (hosting, análisis, procesamiento de pagos a través de Apple).',
            'Cumplimiento legal: Podemos divulgar información si es requerido por ley o en respuesta a solicitudes legales válidas.',
            'Emergencias de salud: En casos de emergencia médica o riesgo inminente de daño, podemos compartir información relevante con servicios de emergencia o profesionales de salud mental.',
            'Con tu consentimiento: Compartimos información cuando nos das consentimiento explícito para hacerlo.',
          ],
        },
      ],
    },
    {
      title: '4. Seguridad de los Datos',
      blocks: [
        {
          kind: 'p',
          text: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción:',
        },
        {
          kind: 'ul',
          items: [
            'Encriptación de datos en tránsito y en reposo',
            'Autenticación de dos factores cuando sea aplicable',
            'Acceso restringido a información personal solo para personal autorizado',
            'Monitoreo regular de sistemas para detectar vulnerabilidades',
            'Cumplimiento con estándares de seguridad de la industria',
          ],
        },
        {
          kind: 'p',
          text: 'Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por proteger tu información, no podemos garantizar seguridad absoluta.',
        },
      ],
    },
    {
      title: '5. Retención de Datos',
      blocks: [
        {
          kind: 'p',
          text: 'Conservamos tu información personal mientras tu cuenta esté activa o según sea necesario para proporcionar servicios, cumplir con obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos.',
        },
        {
          kind: 'p',
          text: 'Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento contactándonos en soporte@antoapps.com. Eliminaremos tu información de acuerdo con nuestras políticas de retención y requisitos legales.',
        },
      ],
    },
    {
      title: '6. Tus Derechos',
      blocks: [
        { kind: 'p', text: 'Tienes derecho a:' },
        {
          kind: 'ul',
          items: [
            'Acceso: Solicitar una copia de la información personal que tenemos sobre ti.',
            'Rectificación: Corregir información inexacta o incompleta.',
            'Eliminación: Solicitar la eliminación de tu información personal cuando ya no sea necesaria.',
            'Portabilidad: Recibir tu información personal en un formato estructurado y de uso común.',
            'Oposición: Oponerte al procesamiento de tu información personal en ciertas circunstancias.',
            'Retirar consentimiento: Retirar tu consentimiento para el procesamiento de datos cuando se base en consentimiento.',
          ],
        },
        {
          kind: 'p',
          text: 'Para ejercer estos derechos, contáctanos en soporte@antoapps.com. Responderemos a tu solicitud dentro de un plazo razonable.',
        },
      ],
    },
    {
      title: '7. Privacidad de Menores',
      blocks: [
        {
          kind: 'p',
          text: 'Anto no está dirigido a menores de 18 años. No recopilamos intencionalmente información personal de menores de 18 años. Si descubrimos que hemos recopilado información de un menor sin el consentimiento de los padres, tomaremos medidas para eliminar esa información.',
        },
      ],
    },
    {
      title: '8. Cambios a esta Política',
      blocks: [
        {
          kind: 'p',
          text: 'Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización".',
        },
        {
          kind: 'p',
          text: 'Te recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos tu información.',
        },
      ],
    },
    {
      title: '9. Transferencias Internacionales',
      blocks: [
        {
          kind: 'p',
          text: 'Tu información puede ser transferida y procesada en países distintos al tuyo. Al usar Anto, consientes la transferencia de tu información a estos países. Nos aseguramos de que se implementen salvaguardas adecuadas para proteger tu información en estas transferencias.',
        },
      ],
    },
    {
      title: '10. Cookies y Tecnologías Similares',
      blocks: [
        {
          kind: 'p',
          text: 'Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso de la aplicación y personalizar el contenido. Puedes gestionar tus preferencias de cookies a través de la configuración de tu dispositivo o navegador.',
        },
      ],
    },
    {
      title: '11. Contacto',
      blocks: [
        {
          kind: 'p',
          text: 'Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de tus datos personales, contáctanos en:',
        },
        { kind: 'p', text: 'Email: soporte@antoapps.com' },
        {
          kind: 'p-link',
          before: 'Para más información sobre los términos de uso de la aplicación, consulta nuestros ',
          linkText: 'Términos de Servicio',
          linkHref: localePath(locale, '/terminos'),
          after: '.',
        },
      ],
    },
  ];
}

function buildPrivacyPageCopy(locale: Locale): LegalPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Privacy',
      },
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2025',
      sections: buildPrivacySections(locale),
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Privacidad',
    },
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Enero 2025',
    sections: buildPrivacySections(locale),
  };
}

export function privacyPageMetadata(locale: Locale): PrivacyPageMetadata {
  return metadataByLocale[locale];
}

export function getPrivacyPageCopy(locale: Locale): LegalPageCopy {
  return buildPrivacyPageCopy(locale);
}
