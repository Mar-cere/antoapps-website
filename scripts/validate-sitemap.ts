import { join } from 'node:path';
import { assertSitemapInvariants } from '../lib/seo/sitemap-invariants';

const ROOT = join(import.meta.dirname, '..');

const errors = assertSitemapInvariants({ root: ROOT });

if (errors.length > 0) {
  console.error('FAIL: validación sitemap/robots (pre-build):');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('OK: sitemap/robots pre-build — config, rutas, hreflang, robots, sin duplicados estáticos.');
