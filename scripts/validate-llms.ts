import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { buildLlmsTxt, llmsTxtRequiredSnippets } from '../lib/seo/build-llms-txt';
import { PSYCHOEDUCATION_SLUGS } from '../lib/i18n/copy/pages/psychoeducation';
import { expectedSitemapUrlCount } from '../lib/seo/build-sitemap';

const ROOT = join(import.meta.dirname, '..');

const errors: string[] = [];

if (!existsSync(join(ROOT, 'app', 'llms.txt', 'route.ts'))) {
  errors.push('Falta app/llms.txt/route.ts — llms.txt debe servirse dinámicamente.');
}

if (existsSync(join(ROOT, 'public', 'llms.txt'))) {
  errors.push(
    'public/llms.txt estático detectado — eliminar; usar app/llms.txt/route.ts para evitar drift.'
  );
}

const content = buildLlmsTxt();

if (content.length < 2000) {
  errors.push(`llms.txt demasiado corto (${content.length} chars) — contenido incompleto.`);
}

for (const snippet of llmsTxtRequiredSnippets()) {
  if (!content.includes(snippet)) {
    errors.push(`llms.txt: falta snippet requerido "${snippet}"`);
  }
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
const guideUrlCount = PSYCHOEDUCATION_SLUGS.length * 2;
const baseUrlCount = expectedPages - guideUrlCount;

if (!content.includes(`Indexed guides count: ${PSYCHOEDUCATION_SLUGS.length}`)) {
  errors.push('llms.txt: falta conteo de guías indexadas.');
}

if (baseUrlCount + guideUrlCount !== expectedPages) {
  errors.push('llms.txt: conteo interno inconsistente con sitemap.');
}

if (errors.length > 0) {
  console.error('FAIL: validación llms.txt:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(
  `OK: llms.txt (${content.length} chars, ${PSYCHOEDUCATION_SLUGS.length} guías, alineado con sitemap de ${expectedPages} URLs).`
);
