import { getAppScreenshotAlt, getAppScreenshotPath } from '@/lib/assets/app-screenshots';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import { APP_VERSION_LABEL } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { getAppPageCopy } from '@/lib/i18n/copy/app';
import { getBienvenidaCopy } from '@/lib/i18n/copy/bienvenida';
import { getContactPageCopy } from '@/lib/i18n/copy/contact';
import { getAboutPageCopy } from '@/lib/i18n/copy/pages/about';
import { getChangelogPageCopy } from '@/lib/i18n/copy/pages/changelog';
import { getDesarrolloPageCopy } from '@/lib/i18n/copy/pages/desarrollo';
import { getSecurityPageCopy } from '@/lib/i18n/copy/pages/security';
import { getPrivacyPageCopy } from '@/lib/i18n/copy/privacy';
import { getTermsPageCopy } from '@/lib/i18n/copy/terms';
import { getEditorialWebPageJsonLd } from '@/lib/i18n/copy/seo/json-ld';

const PATHS = [
  '/sobre-nosotros',
  '/app',
  '/seguridad',
  '/contacto',
  '/desarrollo',
  '/bienvenida',
  '/changelog',
  '/privacidad',
  '/terminos',
] as const;

export type EditorialWebPagePath = (typeof PATHS)[number];

type EditorialWebPageJsonLdProps = {
  locale: Locale;
  path: EditorialWebPagePath;
};

function fieldsFor(locale: Locale, path: EditorialWebPagePath) {
  if (path === '/sobre-nosotros') {
    const copy = getAboutPageCopy(locale);
    return {
      name: copy.meta.title,
      headline: copy.h1,
      description: copy.meta.description,
      imagePath: copy.figure.src,
      imageCaption: copy.figure.alt,
    };
  }

  if (path === '/app') {
    const copy = getAppPageCopy(locale);
    const description =
      locale === 'en'
        ? `Download Anto on the App Store (iPhone) or Google Play (Android): ongoing emotional support, privacy, and everyday tools. Trial available when you install. Complements — does not replace — a human therapist or professional. Version ${APP_VERSION_LABEL}.`
        : `Descarga Anto en App Store (iPhone) o Google Play (Android): acompañamiento emocional continuo, privacidad y herramientas para el día a día. Prueba disponible al instalar. Complementa — no reemplaza — a un terapeuta o profesional humano. Versión ${APP_VERSION_LABEL}.`;
    return {
      name: locale === 'en'
        ? 'Anto — iPhone and Android app | Ongoing emotional support'
        : 'Anto — App para iPhone y Android | Acompañamiento emocional',
      headline: copy.hero.title,
      description,
      imagePath: getAppScreenshotPath('chat'),
      imageCaption: getAppScreenshotAlt('chat', locale),
    };
  }

  if (path === '/seguridad') {
    const copy = getSecurityPageCopy(locale);
    return {
      name: copy.meta.title,
      headline: copy.hero.title,
      description: copy.meta.description,
      imagePath: copy.figure.src,
      imageCaption: copy.figure.alt,
    };
  }

  if (path === '/contacto') {
    const copy = getContactPageCopy(locale);
    return {
      name: locale === 'en' ? 'Contact | One person writes back' : 'Contacto | Una persona te responde',
      headline: copy.hero.title,
      description: copy.hero.subtitle,
      imagePath: getEditorialImagePath('deskRain'),
      imageCaption:
        locale === 'en'
          ? 'Rainy night desk with an open notebook and a warm lamp'
          : 'Escritorio de noche con lluvia en la ventana, libreta abierta y lámpara cálida',
    };
  }

  if (path === '/desarrollo') {
    const copy = getDesarrolloPageCopy(locale);
    return {
      name: copy.meta.title,
      headline: copy.hero.title,
      description: copy.meta.description,
      imagePath: getEditorialImagePath('thoughtLoop'),
      imageCaption:
        locale === 'en'
          ? 'Hands holding a phone open to an unanswered chat, beside a notebook with handwritten questions'
          : 'Manos con el teléfono abierto a un chat sin respuesta y, al lado, un cuaderno con preguntas escritas a mano',
    };
  }

  if (path === '/bienvenida') {
    const copy = getBienvenidaCopy(locale);
    return {
      name: copy.meta.title,
      headline: `${copy.v2.heroTitlePrefix} ${copy.v2.heroTitleHighlight}`,
      description: copy.meta.description,
      imagePath: getEditorialImagePath('sleeplessNight'),
      imageCaption: copy.v2.photoAlt,
    };
  }

  if (path === '/changelog') {
    const copy = getChangelogPageCopy(locale);
    return {
      name: copy.meta.title,
      headline: copy.header.title,
      description: copy.meta.description,
    };
  }

  if (path === '/privacidad') {
    const copy = getPrivacyPageCopy(locale);
    return {
      name: locale === 'en' ? 'Privacy Policy - Anto' : 'Política de Privacidad - Anto',
      headline: copy.title,
      description:
        locale === 'en'
          ? 'Anto privacy policy. Learn how we protect and handle your personal data.'
          : 'Política de privacidad de Anto. Conoce cómo protegemos y manejamos tus datos personales.',
    };
  }

  const copy = getTermsPageCopy(locale);
  return {
    name: locale === 'en' ? 'Terms of Service - Anto | Conditions of Use' : 'Términos de Servicio - Anto | Condiciones de Uso',
    headline: copy.title,
    description:
      locale === 'en'
        ? 'Terms and conditions for using the Anto app. Read our terms of service before using the application.'
        : 'Términos y condiciones de uso de la aplicación Anto. Lee nuestras condiciones de servicio antes de usar la aplicación.',
  };
}

export default function EditorialWebPageJsonLd({ locale, path }: EditorialWebPageJsonLdProps) {
  const block = getEditorialWebPageJsonLd({ locale, path, ...fieldsFor(locale, path) });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
    />
  );
}
