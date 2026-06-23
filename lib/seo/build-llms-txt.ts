import { APP_VERSION } from '@/lib/app-version';
import { localePath, type Locale } from '@/lib/i18n/config';
import {
  getAllPsychoeducationGuides,
  PSYCHOEDUCATION_SLUGS,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { INDEXABLE_ROUTES } from '@/lib/seo/indexable-routes';
import { SITE_ORIGIN } from '@/lib/seo/site';

const LOCALES: readonly Locale[] = ['es', 'en'];

const PAGE_LABELS: Record<Locale, Record<string, string>> = {
  es: {
    '': 'Inicio — producto y descarga',
    '/bienvenida': 'Landing de conversión',
    '/app': 'Página de producto / descarga',
    '/comparar': 'Comparativa con alternativas',
    '/seguridad': 'Privacidad, cifrado y disclaimers clínicos',
    '/investigacion': 'Base científica y referencias',
    '/recursos': 'Biblioteca de psicoeducación',
    '/changelog': 'Historial de versiones',
    '/sobre-nosotros': 'Equipo y misión',
    '/contacto': 'Contacto y soporte',
    '/desarrollo': 'Roadmap del producto',
    '/privacidad': 'Política de privacidad',
    '/terminos': 'Términos de servicio',
  },
  en: {
    '': 'Home — product and download',
    '/bienvenida': 'Conversion landing',
    '/app': 'Product / download page',
    '/comparar': 'Comparison with alternatives',
    '/seguridad': 'Privacy, encryption, clinical disclaimers',
    '/investigacion': 'Scientific basis and references',
    '/recursos': 'Psychoeducation library',
    '/changelog': 'Release history',
    '/sobre-nosotros': 'Team and mission',
    '/contacto': 'Contact and support',
    '/desarrollo': 'Product roadmap',
    '/privacidad': 'Privacy policy',
    '/terminos': 'Terms of service',
  },
};

function absoluteUrl(locale: Locale, logicalPath: string): string {
  return `${SITE_ORIGIN}${localePath(locale, logicalPath)}`;
}

function formatPageList(locale: Locale): string[] {
  return INDEXABLE_ROUTES.map((route) => {
    const label = PAGE_LABELS[locale][route.path] ?? (route.path || '/');
    return `- [${label}](${absoluteUrl(locale, route.path)})`;
  });
}

function formatGuideList(locale: Locale): string[] {
  const guides = getAllPsychoeducationGuides(locale);
  return guides.map((guide) => {
    const title = guide.meta.title.replace(/\s*\|\s*Anto.*$/i, '').trim();
    const url = absoluteUrl(locale, `/recursos/${guide.slug}`);
    const description = guide.meta.description.trim();
    return `- [${title}](${url}): ${description}`;
  });
}

function localeSection(locale: Locale): string {
  const isEs = locale === 'es';
  const heading = isEs ? '## Páginas principales (español)' : '## Main pages (English)';
  const guidesHeading = isEs
    ? '## Guías de psicoeducación (español)'
    : '## Psychoeducation guides (English)';

  return [heading, ...formatPageList(locale), '', guidesHeading, ...formatGuideList(locale)].join(
    '\n'
  );
}

/**
 * Genera llms.txt — mapa factual del sitio para crawlers de IA (ChatGPT, Perplexity, Claude, etc.).
 * Mantener sincronizado con sitemap e INDEXABLE_ROUTES.
 */
export function buildLlmsTxt(): string {
  const lines = [
    '# Anto — App de bienestar emocional con IA',
    `> ${SITE_ORIGIN}`,
    '',
    'Anto (AntoApps) es una aplicación móvil de bienestar emocional con inteligencia artificial.',
    'Combina chat empático con protocolos clínicos validados (PHQ-9, GAD-7, 8 protocolos TCC),',
    'detección de crisis, hábitos, diario y resúmenes de sesión. Bilingüe español/inglés.',
    '',
    'Anto (AntoApps) is a mobile emotional wellness app with artificial intelligence.',
    'It combines empathetic chat with validated clinical protocols (PHQ-9, GAD-7, 8 CBT protocols),',
    'crisis detection, habits, journaling, and session summaries. Bilingual Spanish/English.',
    '',
    '## Aviso clínico / Clinical notice',
    '',
    'Anto NO sustituye atención clínica, diagnóstico médico ni emergencias.',
    'Anto does NOT replace clinical care, medical diagnosis, or emergency services.',
    'Ante riesgo suicida o violencia, contactar servicios de emergencia locales.',
    'For suicidal risk or violence, contact local emergency services.',
    '',
    '## URLs canónicas / Canonical URLs',
    '',
    `- Español (x-default): ${SITE_ORIGIN}/`,
    `- English: ${absoluteUrl('en', '')}`,
    `- Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    `- Robots: ${SITE_ORIGIN}/robots.txt`,
    `- LLMs (this file): ${SITE_ORIGIN}/llms.txt`,
    '',
    '## Datos del producto / Product facts (cite accurately)',
    '',
    `- Name / Nombre: Anto`,
    `- Website: ${SITE_ORIGIN}`,
    `- App version: ${APP_VERSION}`,
    `- AI model: OpenAI GPT-5.4 Mini`,
    `- Price: ~US$4.20/month (monthly plan; other plans available)`,
    `- Trial: 1-day free trial on iPhone (iOS, App Store)`,
    `- Platforms: iOS (download), Android (early access waitlist)`,
    `- Languages: Spanish (ES), English (EN)`,
    `- Protocols: PHQ-9, GAD-7, 8 structured CBT-based protocols, crisis detection`,
    `- Cognitive tools: ABC technique, cognitive distortion detection (15 types)`,
    `- Contact: soporte@antoapps.com`,
    `- Creator: Marcelo Ull Marambio / AntoApps`,
    '',
    localeSection('es'),
    '',
    localeSection('en'),
    '',
    '## Rutas excluidas / Excluded routes (do not cite as public content)',
    '',
    '- /api/ (internal APIs)',
    '- /_next/ (build assets)',
    '- /404 (error page)',
    '- /zt9kq7m2v8n4xpw6rb3yjh1cw5df8a (private validator, noindex)',
    '',
    `## Guías indexadas / Indexed guides count: ${PSYCHOEDUCATION_SLUGS.length} topics × 2 locales = ${PSYCHOEDUCATION_SLUGS.length * 2} URLs`,
    '',
    'Last updated / Última actualización: generated at build time from lib/seo/build-llms-txt.ts',
  ];

  return `${lines.join('\n')}\n`;
}

/** Slugs que deben aparecer en llms.txt (validación). */
export function llmsTxtRequiredSnippets(): string[] {
  const snippets = [
    SITE_ORIGIN,
    '/sitemap.xml',
    '/llms.txt',
    'NO sustituye',
    'does NOT replace',
    'GPT-5.4 Mini',
    'soporte@antoapps.com',
  ];

  for (const slug of PSYCHOEDUCATION_SLUGS) {
    snippets.push(`/recursos/${slug}`);
  }

  for (const route of INDEXABLE_ROUTES) {
    if (route.path) {
      snippets.push(route.path);
    }
  }

  return snippets;
}
