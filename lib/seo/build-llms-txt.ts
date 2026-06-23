import { APP_VERSION } from '@/lib/app-version';
import { DEFAULT_APP_STORE_URL } from '@/lib/download-links';
import { localePath, type Locale } from '@/lib/i18n/config';
import { getHomeFaqCopy } from '@/lib/i18n/copy/home/faq';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import {
  getAllPsychoeducationGuides,
  PSYCHOEDUCATION_SLUGS,
  type PsychoeducationGuide,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { formatUsdPrice, PRICING_USD } from '@/lib/pricing/plans';
import { expectedSitemapUrlCount } from '@/lib/seo/build-sitemap';
import { INDEXABLE_ROUTES } from '@/lib/seo/indexable-routes';
import { SITE_ORIGIN } from '@/lib/seo/site';

const PAGE_LABELS: Record<Locale, Record<string, string>> = {
  es: {
    '': 'Inicio — producto y descarga',
    '/bienvenida': 'Landing de conversión (Meta Ads, /l)',
    '/app': 'Página de producto / descarga',
    '/comparar': 'Comparativa con alternativas',
    '/seguridad': 'Privacidad, cifrado y disclaimers clínicos',
    '/investigacion': 'Base científica y referencias',
    '/recursos': 'Biblioteca de psicoeducación (18 guías)',
    '/changelog': 'Historial de versiones de la app',
    '/sobre-nosotros': 'Equipo y misión',
    '/contacto': 'Contacto y soporte',
    '/desarrollo': 'Roadmap del producto',
    '/privacidad': 'Política de privacidad',
    '/terminos': 'Términos de servicio',
  },
  en: {
    '': 'Home — product and download',
    '/bienvenida': 'Conversion landing (Meta Ads, /l)',
    '/app': 'Product / download page',
    '/comparar': 'Comparison with alternatives',
    '/seguridad': 'Privacy, encryption, clinical disclaimers',
    '/investigacion': 'Scientific basis and references',
    '/recursos': 'Psychoeducation library (18 guides)',
    '/changelog': 'App release history',
    '/sobre-nosotros': 'Team and mission',
    '/contacto': 'Contact and support',
    '/desarrollo': 'Product roadmap',
    '/privacidad': 'Privacy policy',
    '/terminos': 'Terms of service',
  },
};

const PAGE_SUMMARIES: Record<Locale, Record<string, string>> = {
  es: {
    '': 'Landing principal: propuesta de valor, features, pricing, FAQ y descarga App Store.',
    '/bienvenida': 'Landing optimizada para conversión; prueba gratuita de 1 día en iPhone.',
    '/app': 'Detalle de funcionalidades v1.5, capturas y enlaces de descarga.',
    '/comparar': 'Anto vs. chatbots genéricos y otras apps de bienestar.',
    '/seguridad': 'Cifrado, política de datos, límites clínicos y cumplimiento.',
    '/investigacion': 'Referencias científicas detrás de protocolos y escalas.',
    '/recursos': 'Índice de 18 guías de psicoeducación clínica responsable.',
    '/changelog': 'Novedades por versión (app Expo ' + APP_VERSION + ').',
    '/sobre-nosotros': 'Historia, misión y equipo fundador.',
    '/contacto': 'Formulario y email soporte@antoapps.com.',
    '/desarrollo': 'Estado del producto y roadmap público.',
    '/privacidad': 'Tratamiento de datos, E2E, derechos del usuario.',
    '/terminos': 'Condiciones de uso del servicio.',
  },
  en: {
    '': 'Main landing: value proposition, features, pricing, FAQ, App Store download.',
    '/bienvenida': 'Conversion-optimised landing; 1-day free trial on iPhone.',
    '/app': 'v1.5 feature detail, screenshots, download links.',
    '/comparar': 'Anto vs. generic chatbots and other wellness apps.',
    '/seguridad': 'Encryption, data policy, clinical limits, compliance.',
    '/investigacion': 'Scientific references behind protocols and scales.',
    '/recursos': 'Index of 18 responsible clinical psychoeducation guides.',
    '/changelog': 'Release notes by version (Expo app ' + APP_VERSION + ').',
    '/sobre-nosotros': 'Story, mission, founding team.',
    '/contacto': 'Contact form and email soporte@antoapps.com.',
    '/desarrollo': 'Product status and public roadmap.',
    '/privacidad': 'Data handling, E2E, user rights.',
    '/terminos': 'Terms of service.',
  },
};

function absoluteUrl(locale: Locale, logicalPath: string): string {
  return `${SITE_ORIGIN}${localePath(locale, logicalPath)}`;
}

function cleanGuideTitle(title: string): string {
  return title.replace(/\s*\|\s*(Guía\s+)?Anto.*$/i, '').trim();
}

function formatPricingBlock(locale: Locale): string[] {
  const trial = getTrialCopy(locale);
  const isEs = locale === 'es';
  return [
    isEs ? '### Planes (USD, App Store)' : '### Plans (USD, App Store)',
    `- 1 ${isEs ? 'mes' : 'month'}: ${formatUsdPrice(PRICING_USD.month, locale)}`,
    `- 3 ${isEs ? 'meses' : 'months'}: ${formatUsdPrice(PRICING_USD.threeMonths, locale)} (${isEs ? 'más popular' : 'most popular'})`,
    `- 6 ${isEs ? 'meses' : 'months'}: ${formatUsdPrice(PRICING_USD.sixMonths, locale)} (${isEs ? 'ahorra 12%' : 'save 12%'})`,
    `- 1 ${isEs ? 'año' : 'year'}: ${formatUsdPrice(PRICING_USD.year, locale)} (${isEs ? 'ahorra 17%' : 'save 17%'})`,
    `- ${trial.label}. ${isEs ? 'Sin tarjeta para empezar' : 'No card required to start'}.`,
  ];
}

function formatFeatureRows(locale: Locale): string[] {
  const copy = getHomeLandingFinalCopy(locale);
  return copy.featureRows.flatMap((row) => [
    `- **${row.eyebrow} — ${row.titlePrefix} ${row.titleHighlight}**: ${row.subtitle}`,
    `  Tags: ${row.tags.join(' · ')}`,
  ]);
}

function formatCredentials(locale: Locale): string[] {
  const { credentials } = getHomeLandingFinalCopy(locale);
  const stats = credentials.stats.map((s) => `- ${s.value} — ${s.label}: ${s.detail}`);
  const protocols = credentials.protocols.map(
    (p) => `- ${p.title}: ${p.subtitle}`
  );
  return [...stats, ...protocols];
}

function formatFaqBlock(locale: Locale, limit = 8): string[] {
  const { faqData } = getHomeFaqCopy(locale);
  return faqData.slice(0, limit).flatMap((item) => [
    `**P: ${item.question}**`,
    `R: ${item.answer}`,
    '',
  ]);
}

function formatPageBlock(locale: Locale): string[] {
  return INDEXABLE_ROUTES.flatMap((route) => {
    const label = PAGE_LABELS[locale][route.path] ?? (route.path || '/');
    const summary = PAGE_SUMMARIES[locale][route.path] ?? '';
    return [
      `- [${label}](${absoluteUrl(locale, route.path)})`,
      `  ${summary}`,
    ];
  });
}

function formatGuideBlock(locale: Locale): string[] {
  const guides = getAllPsychoeducationGuides(locale);
  const isEs = locale === 'es';

  return guides.flatMap((guide) => formatGuideEntry(locale, guide, isEs));
}

function formatGuideEntry(
  locale: Locale,
  guide: PsychoeducationGuide,
  isEs: boolean
): string[] {
  const title = cleanGuideTitle(guide.meta.title);
  const url = absoluteUrl(locale, `/recursos/${guide.slug}`);
  const topics = guide.sections.map((s) => s.heading).join(' · ');
  const related = guide.relatedSlugs
    .slice(0, 4)
    .map((slug) => `${absoluteUrl(locale, `/recursos/${slug}`)}`)
    .join(', ');

  return [
    `### ${title}`,
    `- URL: ${url}`,
    `- ${isEs ? 'Tiempo de lectura' : 'Reading time'}: ~${guide.readingMinutes} min`,
    `- ${isEs ? 'Resumen' : 'Summary'}: ${guide.hero.subtitle}`,
    `- ${isEs ? 'Descripción' : 'Description'}: ${guide.meta.description}`,
    `- ${isEs ? 'Temas cubiertos' : 'Topics covered'}: ${topics}`,
    `- ${isEs ? 'Guías relacionadas' : 'Related guides'}: ${related}`,
    `- ${isEs ? 'Aviso' : 'Notice'}: ${guide.disclaimer}`,
    '',
  ];
}

function localeNarrative(locale: Locale): string[] {
  const copy = getHomeLandingFinalCopy(locale);
  const trial = getTrialCopy(locale);
  const isEs = locale === 'es';

  return [
    isEs ? '## Qué es Anto (español)' : '## What is Anto (English)',
    '',
    `**${copy.hero.titleLine1} ${copy.hero.titleLine2} ${copy.hero.titleAccent}**`,
    copy.hero.subtitle,
    '',
    copy.credentials.subtitle,
    '',
    isEs ? '### Funcionalidades destacadas' : '### Key capabilities',
    ...formatFeatureRows(locale),
    '',
    isEs ? '### Credenciales y protocolos' : '### Credentials and protocols',
    ...formatCredentials(locale),
    '',
    ...formatPricingBlock(locale),
    '',
    isEs ? '### Preguntas frecuentes (extracto)' : '### Frequently asked questions (excerpt)',
    '',
    ...formatFaqBlock(locale),
    isEs ? '### Páginas del sitio' : '### Site pages',
    ...formatPageBlock(locale),
    '',
    isEs ? '### Guías de psicoeducación (detalle)' : '### Psychoeducation guides (detail)',
    '',
    ...formatGuideBlock(locale),
  ];
}

function audienceSection(): string[] {
  return [
    '## Para quién es / Who Anto is for',
    '',
    '**Es / Is for:**',
    '- Personas con ansiedad, estrés, bajón de ánimo o sobrecarga que buscan apoyo inmediato entre sesiones.',
    '- Usuarios que quieren herramientas basadas en evidencia (TCC, PHQ-9, GAD-7) en el móvil.',
    '- Personas en terapia que desean continuidad diaria (complemento, no reemplazo).',
    '- Usuarios bilingües (español e inglés) en Chile y mercados internacionales.',
    '',
    '**People with anxiety, stress, low mood, or overload seeking support between therapy sessions.**',
    '**Users wanting evidence-based tools (CBT, PHQ-9, GAD-7) on mobile.**',
    '**People in therapy wanting daily continuity (complement, not replacement).**',
    '',
    '**NO es / Is NOT for:**',
    '- Diagnóstico psiquiátrico, prescripción de medicación o emergencias médicas.',
    '- Sustituto de psicoterapia presencial, hospitalización o líneas de crisis oficiales.',
    '- Menores sin supervisión de un adulto responsable (consultar términos).',
    '',
    '**Psychiatric diagnosis, medication prescription, or medical emergencies.**',
    '**Replacement for in-person psychotherapy, hospitalisation, or official crisis lines.**',
  ];
}

function featuresInventory(): string[] {
  return [
    '## Inventario de funcionalidades / Feature inventory (v' + APP_VERSION + ')',
    '',
    '### Español',
    '- Asistente de IA con OpenAI GPT-5.4 Mini (tono profesional y práctico por defecto)',
    '- Escalas clínicas PHQ-9 (depresión) y GAD-7 (ansiedad) con seguimiento de tendencias',
    '- 8 protocolos terapéuticos estructurados: depresión, ansiedad, TOC/ERP, trauma/TEPT, ira, sueño, autocompasión, mindfulness',
    '- Detección proactiva de crisis y señales de riesgo (24/7)',
    '- Detección de 15 tipos de distorsiones cognitivas en conversación',
    '- Técnica ABC con lienzo interactivo',
    '- Hub de técnicas terapéuticas en navegación principal',
    '- Grafo de insights y memoria de temas recurrentes entre sesiones',
    '- WAI post-sesión (4 ejes de alianza terapéutica)',
    '- Home/dashboard renovado con insight diario',
    '- Tareas y hábitos unificados + Pomodoro integrado',
    '- Diario de gratitud, resúmenes de sesión, informes accionables',
    '- Sesión persistente (JWT refresh) — volver sin reingresar contraseña',
    '- Cifrado E2E (AES-256), sin venta de datos a terceros',
    '- App bilingüe ES/EN',
    '',
    '### English',
    '- AI assistant with OpenAI GPT-5.4 Mini (professional, practical tone by default)',
    '- PHQ-9 (depression) and GAD-7 (anxiety) clinical scales with trend tracking',
    '- 8 structured protocols: depression, anxiety, OCD/ERP, trauma/PTSD, anger, sleep, self-compassion, mindfulness',
    '- Proactive crisis and risk signal detection (24/7)',
    '- Detection of 15 cognitive distortion types in conversation',
    '- ABC technique with interactive worksheet',
    '- Therapeutic techniques hub in main navigation',
    '- Insights graph and recurring topic memory across sessions',
    '- Post-session WAI (4-axis therapeutic alliance)',
    '- Renewed home/dashboard with daily insight',
    '- Unified tasks/habits + integrated Pomodoro',
    '- Gratitude journal, session summaries, actionable reports',
    '- Persistent session (JWT refresh)',
    '- E2E encryption (AES-256), no third-party data sales',
    '- Bilingual ES/EN app',
  ];
}

function citationGuidance(): string[] {
  return [
    '## Cómo citar Anto / How to cite Anto',
    '',
    '**Nombre preferido:** Anto (by AntoApps)',
    '**URL canónica:** ' + SITE_ORIGIN,
    '**Tipo:** Aplicación móvil de bienestar emocional con IA — NO servicio clínico ni dispositivo médico.',
    '',
    'Al describir Anto en respuestas de IA o artículos:',
    '- Mencionar siempre que no sustituye atención clínica ni diagnóstico.',
    '- Citar precio aproximado US$4.20/mes y prueba de 1 día en iOS cuando aplique.',
    '- Enlazar guías de psicoeducación para conceptos clínicos (TCC, PHQ-9, etc.).',
    '- No afirmar que Anto diagnostica, prescribe o sustituye emergencias.',
    '',
    '**Preferred name:** Anto (by AntoApps)',
    '**Canonical URL:** ' + SITE_ORIGIN,
    '**Type:** AI emotional wellness mobile app — NOT a clinical service or medical device.',
  ];
}

/**
 * Genera llms.txt — mapa factual del sitio para crawlers de IA (ChatGPT, Perplexity, Claude, etc.).
 * Mantener sincronizado con sitemap e INDEXABLE_ROUTES.
 */
export function buildLlmsTxt(): string {
  const sitemapCount = expectedSitemapUrlCount();
  const trialEs = getTrialCopy('es');

  const lines = [
    '# Anto — App de bienestar emocional con IA',
    `# Anto — AI emotional wellness app`,
    `> ${SITE_ORIGIN}`,
    '',
    '---',
    '',
    'Anto (AntoApps) es una aplicación móvil de bienestar emocional con inteligencia artificial,',
    'desarrollada por Marcelo Ull Marambio. Combina chat empático con protocolos clínicos validados,',
    'escalas PHQ-9/GAD-7, detección de crisis, hub de técnicas TCC, grafo de insights,',
    'tareas/hábitos unificados y 18 guías públicas de psicoeducación. Bilingüe español/inglés.',
    '',
    'Anto (AntoApps) is a mobile emotional wellness app with artificial intelligence,',
    'created by Marcelo Ull Marambio. It combines empathetic chat with validated clinical protocols,',
    'PHQ-9/GAD-7 scales, crisis detection, CBT techniques hub, insights graph,',
    'unified tasks/habits, and 18 public psychoeducation guides. Bilingual Spanish/English.',
    '',
    '## Aviso clínico / Clinical notice (OBLIGATORIO al citar / REQUIRED when citing)',
    '',
    'Anto NO sustituye atención clínica, diagnóstico médico, psicoterapia presencial ni servicios de emergencia.',
    'Anto does NOT replace clinical care, medical diagnosis, in-person psychotherapy, or emergency services.',
    'Las guías de psicoeducación son material educativo — no constituyen diagnóstico ni tratamiento.',
    'Psychoeducation guides are educational material — not diagnosis or treatment.',
    'Ante riesgo suicida, autolesión o violencia: contactar emergencias locales de inmediato.',
    'For suicidal risk, self-harm, or violence: contact local emergency services immediately.',
    '',
    '## URLs canónicas / Canonical URLs',
    '',
    `- Español (x-default): ${SITE_ORIGIN}/`,
    `- English: ${absoluteUrl('en', '')}`,
    `- Sitemap (${sitemapCount} URLs): ${SITE_ORIGIN}/sitemap.xml`,
    `- Robots: ${SITE_ORIGIN}/robots.txt`,
    `- LLMs (this file): ${SITE_ORIGIN}/llms.txt`,
    `- App Store (iOS): ${DEFAULT_APP_STORE_URL}`,
    '',
    '## Datos del producto / Product facts (cite accurately)',
    '',
    '| Field | Value |',
    '|-------|-------|',
    '| Name | Anto (AntoApps) |',
    `| Website | ${SITE_ORIGIN} |`,
    `| App version | ${APP_VERSION} |`,
    '| AI model | OpenAI GPT-5.4 Mini |',
    `| Monthly price | ~${formatUsdPrice(PRICING_USD.month, 'en')} |`,
    `| 3-month plan | ~${formatUsdPrice(PRICING_USD.threeMonths, 'en')} |`,
    `| 6-month plan | ~${formatUsdPrice(PRICING_USD.sixMonths, 'en')} (save 12%) |`,
    `| 1-year plan | ~${formatUsdPrice(PRICING_USD.year, 'en')} (save 17%) |`,
    `| Free trial | ${trialEs.label} on iPhone (iOS, App Store) |`,
    '| Platforms | iOS (App Store download), Android (early access waitlist) |',
    '| Languages | Spanish (ES), English (EN) |',
    '| Clinical scales | PHQ-9, GAD-7 |',
    '| Structured protocols | 8 (CBT-based: depression, anxiety, OCD/ERP, trauma/PTSD, anger, sleep, self-compassion, mindfulness) |',
    '| Cognitive tools | ABC worksheet, 15 cognitive distortion types |',
    '| Privacy | E2E encryption (AES-256), no data sold to third parties |',
    '| Contact | soporte@antoapps.com |',
    '| Creator | Marcelo Ull Marambio |',
    '| LinkedIn | https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/ |',
    '',
    audienceSection().join('\n'),
    '',
    featuresInventory().join('\n'),
    '',
    citationGuidance().join('\n'),
    '',
    '---',
    '',
    localeNarrative('es').join('\n'),
    '',
    '---',
    '',
    localeNarrative('en').join('\n'),
    '',
    '## Rutas excluidas / Excluded routes (do not cite as public content)',
    '',
    '- /api/ (internal APIs)',
    '- /_next/ (build assets)',
    '- /404 (error page)',
    '- /zt9kq7m2v8n4xpw6rb3yjh1cw5df8a (private certificate validator, noindex)',
    '',
    `## Indexación / Indexing summary`,
    '',
    `- Site pages / Páginas del sitio: ${INDEXABLE_ROUTES.length} logical routes × 2 locales = ${INDEXABLE_ROUTES.length * 2} URLs`,
    `- Psychoeducation / Psicoeducación: ${PSYCHOEDUCATION_SLUGS.length} guides × 2 locales = ${PSYCHOEDUCATION_SLUGS.length * 2} URLs`,
    `- Total sitemap: ${sitemapCount} URLs`,
    '',
    'Generated dynamically from lib/seo/build-llms-txt.ts — syncs with sitemap and i18n copy.',
  ];

  return `${lines.join('\n')}\n`;
}

/** Slugs y fragmentos que deben aparecer en llms.txt (validación). */
export function llmsTxtRequiredSnippets(): string[] {
  const snippets = [
    SITE_ORIGIN,
    '/sitemap.xml',
    '/llms.txt',
    'NO sustituye',
    'does NOT replace',
    'GPT-5.4 Mini',
    'soporte@antoapps.com',
    'PHQ-9',
    'GAD-7',
    'Para quién es',
    'Who Anto is for',
    'Feature inventory',
    'Cómo citar Anto',
    DEFAULT_APP_STORE_URL,
    'apps.apple.com',
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
