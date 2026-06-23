import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { assertSitemapInvariants } from '../lib/seo/sitemap-invariants';
import { expectedSitemapUrlCount } from '../lib/seo/build-sitemap';

const ROOT = join(import.meta.dirname, '..');
const SITEMAP_ARTIFACT = join(ROOT, '.next', 'server', 'app', 'sitemap.xml.body');
const ROBOTS_ARTIFACT = join(ROOT, '.next', 'server', 'app', 'robots.txt.body');

if (!existsSync(join(ROOT, '.next'))) {
  console.error('FAIL: .next/ no existe — ejecutar npm run build antes de validate:sitemap:artifacts');
  process.exit(1);
}

const errors = assertSitemapInvariants({
  root: ROOT,
  sitemapArtifactPath: SITEMAP_ARTIFACT,
  robotsArtifactPath: ROBOTS_ARTIFACT,
});

if (errors.length > 0) {
  console.error('FAIL: validación sitemap/robots (post-build):');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log(
  `OK: sitemap/robots post-build — artefactos .next verificados (${expectedSitemapUrlCount()} URLs, hreflang, robots).`
);
