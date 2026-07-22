import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  buildLlmsFullTxt,
  buildLlmsTxt,
  llmsTxtRequiredSnippets,
} from '../lib/seo/build-llms-txt';
import { PSYCHOEDUCATION_SLUGS } from '../lib/i18n/copy/pages/psychoeducation';
import { expectedSitemapUrlCount } from '../lib/seo/build-sitemap';

const ROOT = join(import.meta.dirname, '..');

const errors: string[] = [];

if (!existsSync(join(ROOT, 'app', 'llms.txt', 'route.ts'))) {
  errors.push('Falta app/llms.txt/route.ts — llms.txt debe servirse dinámicamente.');
}

if (!existsSync(join(ROOT, 'app', 'llms-full.txt', 'route.ts'))) {
  errors.push('Falta app/llms-full.txt/route.ts — llms-full.txt para agentes de IA.');
}

if (!existsSync(join(ROOT, 'app', '.well-known', 'llms.txt', 'route.ts'))) {
  errors.push('Falta app/.well-known/llms.txt/route.ts — espejo de descubrimiento IA.');
}

if (existsSync(join(ROOT, 'public', 'llms.txt'))) {
  errors.push(
    'public/llms.txt estático detectado — eliminar; usar app/llms.txt/route.ts para evitar drift.'
  );
}

const content = buildLlmsTxt();
const full = buildLlmsFullTxt();

if (content.length < 8000) {
  errors.push(`llms.txt demasiado corto (${content.length} chars) — contenido incompleto.`);
}

if (full.length <= content.length) {
  errors.push('llms-full.txt debe ser más largo que llms.txt (FAQ ampliado).');
}

for (const snippet of llmsTxtRequiredSnippets()) {
  if (!content.includes(snippet)) {
    errors.push(`llms.txt: falta snippet requerido "${snippet}"`);
  }
}

if (!content.startsWith('# Anto')) {
  errors.push('llms.txt debe empezar con H1 "# Anto" (formato llmstxt).');
}

if (!content.includes('## Optional')) {
  errors.push('llms.txt: falta sección Optional con enlace a llms-full.txt');
}

const guideLinks = PSYCHOEDUCATION_SLUGS.filter((slug) =>
  content.includes(`/recursos/${slug}`)
);

if (guideLinks.length !== PSYCHOEDUCATION_SLUGS.length) {
  errors.push(
    `llms.txt: se esperaban enlaces markdown para ${PSYCHOEDUCATION_SLUGS.length} guías ES, encontrados ${guideLinks.length}.`
  );
}

const expectedPages = expectedSitemapUrlCount();

if (!content.includes('## Indexación / Indexing summary')) {
  errors.push('llms.txt: falta sección de resumen de indexación.');
}

if (!content.includes(`Total sitemap: ${expectedPages} URLs`)) {
  errors.push('llms.txt: falta conteo total de URLs del sitemap.');
}

if (errors.length > 0) {
  console.error('FAIL: validación llms.txt:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(
  `OK: llms.txt (${content.length} chars) + llms-full (${full.length} chars), ${PSYCHOEDUCATION_SLUGS.length} guías, sitemap ${expectedPages} URLs.`
);
