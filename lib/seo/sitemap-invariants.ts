import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { localePath, LOCALES, type Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/metadata';
import { buildSitemapEntries, expectedSitemapUrlCount } from '@/lib/seo/build-sitemap';
import {
  FORBIDDEN_STATIC_SEO_FILENAMES,
  FORBIDDEN_STATIC_SEO_RELATIVE_PATHS,
} from '@/lib/seo/guards';
import {
  INDEXABLE_LOGICAL_PATHS,
  INDEXABLE_ROUTES,
  NON_INDEXABLE_PATH_PREFIXES,
  REDIRECT_ONLY_PATHS,
  type IndexableRoute,
} from '@/lib/seo/indexable-routes';
import {
  DYNAMIC_ROUTE_EXPANSIONS,
  PSYCHOEDUCATION_INDEXABLE_ROUTES,
} from '@/lib/seo/psychoeducation-routes';
import { METADATA_CANONICAL_PATHS } from '@/lib/seo/metadata-paths';
import { buildRobotsConfig } from '@/lib/seo/robots-config';
import { SITE_HOST, SITE_ORIGIN } from '@/lib/seo/site';

const ALL_INDEXABLE_ROUTES: readonly IndexableRoute[] = [
  ...INDEXABLE_ROUTES,
  ...PSYCHOEDUCATION_INDEXABLE_ROUTES,
];

const ALL_INDEXABLE_LOGICAL_PATHS = ALL_INDEXABLE_ROUTES.map((r) => r.path);

const ISO_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export type SitemapInvariantOptions = {
  /** Raíz del repositorio. */
  root?: string;
  /** Fecha de referencia para lastModified (default: hoy UTC). */
  referenceDate?: Date;
  /** Ruta al artefacto sitemap post-build (.next/server/app/sitemap.xml.body). */
  sitemapArtifactPath?: string;
  /** Ruta al artefacto robots post-build (.next/server/app/robots.txt.body). */
  robotsArtifactPath?: string;
};

function sortedUnique(values: readonly string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function logicalPathsMatch(a: readonly string[], b: readonly string[]): boolean {
  const left = sortedUnique(a);
  const right = sortedUnique(b);
  if (left.length !== right.length) return false;
  return left.every((value, index) => value === right[index]);
}

function collectSitePageLogicalPaths(dir: string, segments: string[] = []): string[] {
  const paths: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const nextSegments = [...segments, entry.name];

    if (entry.isDirectory()) {
      paths.push(...collectSitePageLogicalPaths(join(dir, entry.name), nextSegments));
      continue;
    }

    if (entry.name !== 'page.tsx') {
      continue;
    }

    const pageIndex = nextSegments.lastIndexOf('page.tsx');
    const routeSegments = nextSegments.slice(0, pageIndex);
    const withoutEn = routeSegments[0] === 'en' ? routeSegments.slice(1) : routeSegments;
    const logical = withoutEn.length === 0 ? '' : `/${withoutEn.join('/')}`;
    paths.push(logical);
  }

  return paths;
}

function collectAppPagePathsOutsideSite(appDir: string): string[] {
  const paths: string[] = [];

  function walk(currentDir: string, segments: string[]): void {
    if (currentDir.includes(`${join('app', '(site)')}`)) {
      return;
    }

    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const nextSegments = [...segments, entry.name];
      if (entry.isDirectory()) {
        walk(join(currentDir, entry.name), nextSegments);
        continue;
      }
      if (entry.name !== 'page.tsx') {
        continue;
      }
      const pageIndex = nextSegments.lastIndexOf('page.tsx');
      const routeSegments = nextSegments.slice(0, pageIndex);
      const logical = routeSegments.length === 0 ? '' : `/${routeSegments.join('/')}`;
      paths.push(logical);
    }
  }

  walk(appDir, []);
  return paths;
}

function scanPublicForForbiddenSeoFiles(publicDir: string, root: string): string[] {
  const found: string[] = [];

  function walk(dir: string): void {
    if (!existsSync(dir)) return;

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if ((FORBIDDEN_STATIC_SEO_FILENAMES as readonly string[]).includes(entry.name)) {
        found.push(relative(root, fullPath));
      }
    }
  }

  walk(publicDir);
  return found;
}

function pathnameFromAbsolute(url: string): string {
  return url.slice(SITE_ORIGIN.length);
}

function isForbiddenPathname(pathname: string): boolean {
  for (const forbidden of [...NON_INDEXABLE_PATH_PREFIXES, ...REDIRECT_ONLY_PATHS]) {
    if (pathname === forbidden || pathname.startsWith(forbidden)) {
      return true;
    }
  }
  return pathname.includes('/404');
}

function assertNoStaticDuplicates(root: string, errors: string[]): void {
  for (const relPath of FORBIDDEN_STATIC_SEO_RELATIVE_PATHS) {
    const filePath = join(root, relPath);
    if (existsSync(filePath)) {
      errors.push(
        `Archivo estático SEO prohibido: ${relPath} — eliminar; usar app/sitemap.ts y app/robots.ts`
      );
    }
  }

  for (const relPath of scanPublicForForbiddenSeoFiles(join(root, 'public'), root)) {
    errors.push(`public/ contiene archivo SEO estático prohibido: ${relPath}`);
  }
}

function assertAppEntrypointsUseLibSeo(root: string, errors: string[]): void {
  const sitemapSource = readFileSync(join(root, 'app', 'sitemap.ts'), 'utf8');
  const robotsSource = readFileSync(join(root, 'app', 'robots.ts'), 'utf8');

  if (!sitemapSource.includes('@/lib/seo/build-sitemap')) {
    errors.push('app/sitemap.ts debe importar buildSitemapEntries desde @/lib/seo/build-sitemap');
  }
  if (!robotsSource.includes('@/lib/seo/robots-config')) {
    errors.push('app/robots.ts debe importar buildRobotsConfig desde @/lib/seo/robots-config');
  }
  if (/localizedRoutes|urlset xmlns/.test(sitemapSource)) {
    errors.push('app/sitemap.ts no debe definir rutas inline — usar lib/seo/indexable-routes.ts');
  }
}

function assertMetadataPathsSynced(errors: string[]): void {
  if (!logicalPathsMatch(INDEXABLE_LOGICAL_PATHS, METADATA_CANONICAL_PATHS)) {
    errors.push(
      'INDEXABLE_LOGICAL_PATHS y METADATA_CANONICAL_PATHS divergen — sincronizar lib/seo/indexable-routes.ts y lib/seo/metadata-paths.ts'
    );
  }
}

function expandDynamicFilesystemPaths(paths: readonly string[]): string[] {
  const expanded: string[] = [];
  for (const path of paths) {
    const dynamic = DYNAMIC_ROUTE_EXPANSIONS[path];
    if (dynamic) {
      expanded.push(...dynamic);
    } else {
      expanded.push(path);
    }
  }
  return expanded;
}

function assertFilesystemCoverage(root: string, errors: string[]): void {
  const sitePagesDir = join(root, 'app', '(site)');
  const filesystemPaths = new Set(
    expandDynamicFilesystemPaths(collectSitePageLogicalPaths(sitePagesDir))
  );
  const configPaths = new Set(ALL_INDEXABLE_LOGICAL_PATHS);

  for (const fsPath of filesystemPaths) {
    if (!configPaths.has(fsPath)) {
      errors.push(
        `Página en app/(site) sin entrada en INDEXABLE_ROUTES: "${fsPath || '/'}".`
      );
    }
  }

  for (const configPath of configPaths) {
    if (!filesystemPaths.has(configPath)) {
      errors.push(
        `Entrada en INDEXABLE_ROUTES sin page.tsx correspondiente: "${configPath || '/'}".`
      );
    }
  }
}

function assertNonSitePagesAreNonIndexable(root: string, errors: string[]): void {
  const outsidePaths = collectAppPagePathsOutsideSite(join(root, 'app'));
  const allowedOutside = NON_INDEXABLE_PATH_PREFIXES.map((p) =>
    p.endsWith('/') ? p.slice(0, -1) : p
  ).filter((p) => p.startsWith('/'));

  for (const logical of outsidePaths) {
    const normalized = logical || '/';
    const isAllowed = allowedOutside.some(
      (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
    );
    if (!isAllowed) {
      errors.push(
        `page.tsx fuera de app/(site) no listado como no-indexable: "${normalized}". Añadir a NON_INDEXABLE_PATH_PREFIXES o mover a (site).`
      );
    }
  }
}

function assertRouteConfig(referenceDate: Date, errors: string[]): void {
  const seenPaths = new Set<string>();

  for (const route of ALL_INDEXABLE_ROUTES) {
    if (seenPaths.has(route.path)) {
      errors.push(`INDEXABLE_ROUTES: path duplicado "${route.path || '/'}".`);
    }
    seenPaths.add(route.path);

    if (!ISO_DATE_ONLY.test(route.lastModified)) {
      errors.push(
        `INDEXABLE_ROUTES: lastModified debe ser YYYY-MM-DD en "${route.path || '/'}": ${route.lastModified}`
      );
    } else if (Number.isNaN(Date.parse(route.lastModified))) {
      errors.push(`INDEXABLE_ROUTES: lastModified inválido en "${route.path || '/'}".`);
    } else {
      // Comparar solo YYYY-MM-DD (UTC). Usar fin de día vs Date.now() marca
      // "hoy" como futuro durante casi todo el día y rompe el build en Vercel.
      const todayUtc = referenceDate.toISOString().slice(0, 10);
      if (route.lastModified > todayUtc) {
        errors.push(
          `INDEXABLE_ROUTES: lastModified en el futuro en "${route.path || '/'}": ${route.lastModified}`
        );
      }
    }

    if (route.priorityEs < route.priorityEn) {
      errors.push(
        `INDEXABLE_ROUTES: priorityEs (${route.priorityEs}) debe ser >= priorityEn (${route.priorityEn}) en "${route.path || '/'}".`
      );
    }

    if (route.path.startsWith('/en')) {
      errors.push(`INDEXABLE_ROUTES: path no debe incluir prefijo /en: ${route.path}`);
    }

    for (const locale of LOCALES) {
      const absolute = siteUrl(locale, route.path);
      const expectedPathname = localePath(locale, route.path);
      const actualPathname = pathnameFromAbsolute(absolute);

      if (!absolute.startsWith(SITE_ORIGIN)) {
        errors.push(`siteUrl(${locale}, "${route.path}") fuera de SITE_ORIGIN: ${absolute}`);
      }
      if (actualPathname !== expectedPathname) {
        errors.push(
          `localePath inconsistente para "${route.path || '/'}" [${locale}]: esperado "${expectedPathname}", obtuvo "${actualPathname}"`
        );
      }
    }
  }
}

function assertSitemapStructure(errors: string[]): void {
  const entries = buildSitemapEntries();
  const expectedCount = expectedSitemapUrlCount();

  if (entries.length !== expectedCount) {
    errors.push(
      `Sitemap: se esperaban ${expectedCount} URLs (${ALL_INDEXABLE_ROUTES.length} rutas × 2 idiomas), hay ${entries.length}.`
    );
  }

  const urlSet = new Set(entries.map((e) => e.url));
  const esUrls = entries.filter((e) => !pathnameFromAbsolute(e.url).startsWith('/en'));
  const enUrls = entries.filter((e) => pathnameFromAbsolute(e.url).startsWith('/en'));

  if (esUrls.length !== ALL_INDEXABLE_ROUTES.length || enUrls.length !== ALL_INDEXABLE_ROUTES.length) {
    errors.push(
      `Sitemap: se esperaban ${ALL_INDEXABLE_ROUTES.length} URLs ES y ${ALL_INDEXABLE_ROUTES.length} EN.`
    );
  }

  for (const entry of entries) {
    const pathname = pathnameFromAbsolute(entry.url);

    if (urlSet.has(entry.url) === false) {
      errors.push(`Sitemap: URL interna inconsistente: ${entry.url}`);
    }

    if (isForbiddenPathname(pathname)) {
      errors.push(`Sitemap: URL prohibida incluida: ${entry.url}`);
    }

    if (!entry.url.startsWith(SITE_ORIGIN)) {
      errors.push(`Sitemap: URL fuera del origen canónico: ${entry.url}`);
    }

    const alternates = entry.alternates?.languages;
    if (!alternates?.es || !alternates.en || !alternates['x-default']) {
      errors.push(`Sitemap: hreflang incompleto en ${entry.url}`);
      continue;
    }

    if (alternates['x-default'] !== alternates.es) {
      errors.push(`Sitemap: x-default debe apuntar a ES en ${entry.url}`);
    }

    for (const altUrl of [alternates.es, alternates.en, alternates['x-default']]) {
      if (!urlSet.has(altUrl)) {
        errors.push(`Sitemap: hreflang apunta a URL ausente del sitemap: ${altUrl} (desde ${entry.url})`);
      }
    }

    if (entry.priority !== undefined && (entry.priority < 0 || entry.priority > 1)) {
      errors.push(`Sitemap: priority fuera de [0,1] en ${entry.url}: ${entry.priority}`);
    }

    const lastMod =
      entry.lastModified instanceof Date
        ? entry.lastModified
        : entry.lastModified
          ? new Date(entry.lastModified)
          : null;
    if (!lastMod || Number.isNaN(lastMod.getTime())) {
      errors.push(`Sitemap: lastModified inválido en ${entry.url}`);
    }

    if (!entry.changeFrequency) {
      errors.push(`Sitemap: changeFrequency ausente en ${entry.url}`);
    }

    const isEn = pathname.startsWith('/en');
    if (isEn && pathname === '/en') {
      // home EN ok
    } else if (isEn && !pathname.startsWith('/en/') && pathname !== '/en') {
      errors.push(`Sitemap: URL EN mal formada: ${entry.url}`);
    }
    if (!isEn && pathname.startsWith('/en')) {
      errors.push(`Sitemap: URL ES no debe usar prefijo /en: ${entry.url}`);
    }
  }

  for (const route of ALL_INDEXABLE_ROUTES) {
    const es = siteUrl('es', route.path);
    const en = siteUrl('en', route.path);
    if (!urlSet.has(es)) errors.push(`Sitemap: falta URL ES para "${route.path || '/'}": ${es}`);
    if (!urlSet.has(en)) errors.push(`Sitemap: falta URL EN para "${route.path || '/'}": ${en}`);
  }
}

function assertRobotsConfig(errors: string[]): void {
  const config = buildRobotsConfig();
  const sitemap = config.sitemap?.toString() ?? '';

  if (sitemap !== `${SITE_ORIGIN}/sitemap.xml`) {
    errors.push(`robots: Sitemap debe ser exactamente ${SITE_ORIGIN}/sitemap.xml (actual: ${sitemap})`);
  }

  if (config.host !== SITE_HOST) {
    errors.push(`robots: host debe ser ${SITE_HOST} (actual: ${String(config.host)})`);
  }

  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const starRule = rules.find((r) => r.userAgent === '*' || r.userAgent === undefined);

  if (!starRule?.allow) {
    errors.push('robots: regla user-agent * debe incluir Allow: /');
  }

  for (const rule of rules) {
    const disallow = Array.isArray(rule.disallow)
      ? rule.disallow
      : rule.disallow
        ? [rule.disallow]
        : [];

    for (const prefix of NON_INDEXABLE_PATH_PREFIXES) {
      if (!disallow.includes(prefix)) {
        errors.push(
          `robots (${String(rule.userAgent ?? '*')}): falta disallow "${prefix}".`
        );
      }
    }
  }

  const userAgents = rules.map((r) => r.userAgent).filter(Boolean);
  if (!userAgents.includes('*')) {
    errors.push('robots: falta regla User-Agent: *');
  }
  if (!userAgents.includes('GPTBot')) {
    errors.push('robots: falta regla explícita para GPTBot (crawlers IA)');
  }
}

function assertBuildArtifacts(options: SitemapInvariantOptions, errors: string[]): void {
  const { sitemapArtifactPath, robotsArtifactPath } = options;
  if (!sitemapArtifactPath || !robotsArtifactPath) return;

  if (!existsSync(sitemapArtifactPath)) {
    errors.push(`Artefacto post-build ausente: ${sitemapArtifactPath}`);
    return;
  }
  if (!existsSync(robotsArtifactPath)) {
    errors.push(`Artefacto post-build ausente: ${robotsArtifactPath}`);
    return;
  }

  const sitemapXml = readFileSync(sitemapArtifactPath, 'utf8');
  const robotsTxt = readFileSync(robotsArtifactPath, 'utf8');

  const urlTagCount = (sitemapXml.match(/<url>/g) ?? []).length;
  if (urlTagCount !== expectedSitemapUrlCount()) {
    errors.push(
      `Artefacto sitemap.xml: se esperaban ${expectedSitemapUrlCount()} entradas <url>, hay ${urlTagCount}.`
    );
  }

  if (!sitemapXml.includes('xmlns:xhtml=')) {
    errors.push('Artefacto sitemap.xml: falta namespace xmlns:xhtml (hreflang).');
  }

  if (/<loc>[^<]*\/404<\/loc>/.test(sitemapXml)) {
    errors.push('Artefacto sitemap.xml: contiene /404 — prohibido.');
  }

  for (const url of buildSitemapEntries().map((e) => e.url)) {
    if (!sitemapXml.includes(`<loc>${url}</loc>`)) {
      errors.push(`Artefacto sitemap.xml: falta <loc>${url}</loc>`);
    }
  }

  if (!robotsTxt.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
    errors.push('Artefacto robots.txt: falta directiva Sitemap canónica.');
  }
  if (!robotsTxt.includes(`Host: ${SITE_HOST}`)) {
    errors.push('Artefacto robots.txt: falta directiva Host.');
  }

  for (const prefix of NON_INDEXABLE_PATH_PREFIXES) {
    if (!robotsTxt.includes(`Disallow: ${prefix}`)) {
      errors.push(`Artefacto robots.txt: falta Disallow: ${prefix}`);
    }
  }
}

function assertNextRedirectsSynced(root: string, errors: string[]): void {
  const configSource = readFileSync(join(root, 'next.config.js'), 'utf8');
  const redirectSources = [...configSource.matchAll(/source:\s*'([^']+)'/g)].map((m) => m[1]);

  const marketingRedirects = redirectSources.filter(
    (source) =>
      source === '/l' ||
      source === '/en/l' ||
      source === '/welcome' ||
      source === '/login' ||
      source === '/signup' ||
      source === '/chat'
  );

  for (const source of marketingRedirects) {
    if (!(REDIRECT_ONLY_PATHS as readonly string[]).includes(source)) {
      errors.push(
        `next.config.js redirect "${source}" no está en REDIRECT_ONLY_PATHS — sincronizar lib/seo/indexable-routes.ts`
      );
    }
  }
}

/**
 * Ejecuta todas las invariantes de sitemap/robots.
 * Usado en pre-build (scripts/validate-sitemap.ts) y post-build (artefactos .next).
 */
export function assertSitemapInvariants(options: SitemapInvariantOptions = {}): string[] {
  const root = options.root ?? join(import.meta.dirname, '..', '..');
  const referenceDate = options.referenceDate ?? new Date();

  const errors: string[] = [];

  assertNoStaticDuplicates(root, errors);
  assertAppEntrypointsUseLibSeo(root, errors);
  assertMetadataPathsSynced(errors);
  assertFilesystemCoverage(root, errors);
  assertNonSitePagesAreNonIndexable(root, errors);
  assertRouteConfig(referenceDate, errors);
  assertSitemapStructure(errors);
  assertRobotsConfig(errors);
  assertNextRedirectsSynced(root, errors);
  assertBuildArtifacts(options, errors);

  return errors;
}
