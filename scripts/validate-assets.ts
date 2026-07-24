import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  APP_SCREENSHOT_KEYS,
  APP_SCREENSHOT_PATHS,
  HOME_LANDING_SCREENSHOT_PATHS,
  getAppScreenshotAlt,
  getHomeLandingScreenshotAlt,
} from '../lib/assets/app-screenshots';
import type { Locale } from '../lib/i18n/config';
import { getBienvenidaCopy } from '../lib/i18n/copy/bienvenida';

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, 'public');
const LOCALES: readonly Locale[] = ['es', 'en'];

function publicPath(urlPath: string): string {
  return join(PUBLIC_DIR, urlPath.replace(/^\//, ''));
}

function assertAssetInvariants(): string[] {
  const errors: string[] = [];

  for (const key of APP_SCREENSHOT_KEYS) {
    const urlPath = APP_SCREENSHOT_PATHS[key];
    const filePath = publicPath(urlPath);

    if (!existsSync(filePath)) {
      errors.push(`missing screenshot file: ${urlPath}`);
    }

    for (const locale of LOCALES) {
      const alt = getAppScreenshotAlt(key, locale);
      if (!alt.trim()) {
        errors.push(`[${locale}] empty alt for screenshot "${key}"`);
      }
    }
  }

  for (const [key, urlPath] of Object.entries(HOME_LANDING_SCREENSHOT_PATHS)) {
    if (!urlPath.endsWith('.webp')) {
      errors.push(`home landing screenshot must be WebP: ${urlPath}`);
    }
    const filePath = publicPath(urlPath);
    if (!existsSync(filePath)) {
      errors.push(`missing home landing screenshot: ${urlPath}`);
    }
    for (const locale of LOCALES) {
      const alt = getHomeLandingScreenshotAlt(
        key as keyof typeof HOME_LANDING_SCREENSHOT_PATHS,
        locale
      );
      if (!alt.trim()) {
        errors.push(`[${locale}] empty alt for home landing screenshot "${key}"`);
      }
    }
  }

  for (const locale of LOCALES) {
    const copy = getBienvenidaCopy(locale);
    const tag = `[${locale}]`;

    if (copy.v2.chat.messages.length !== 3) {
      errors.push(`${tag} v2.chat.messages must have exactly 3 items (ads vignette)`);
    }

    if (copy.v2.dashboard.image.src !== APP_SCREENSHOT_PATHS.home) {
      errors.push(`${tag} v2.dashboard.image.src must use APP_SCREENSHOT_PATHS.home`);
    }

    if (copy.v2.features.length !== 4) {
      errors.push(`${tag} v2.features must have exactly 4 items`);
    }

    for (const image of copy.screenshots.images) {
      const values = Object.values(APP_SCREENSHOT_PATHS);
      if (!values.includes(image.src as (typeof values)[number])) {
        errors.push(`${tag} screenshots.images contains unknown path: ${image.src}`);
      }
      if (!existsSync(publicPath(image.src))) {
        errors.push(`${tag} missing screenshot referenced in copy: ${image.src}`);
      }
    }
  }

  return errors;
}

const errors = assertAssetInvariants();

if (errors.length > 0) {
  console.error('FAIL: invariantes de assets:');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exit(1);
}

console.log('OK: invariantes de assets (screenshots + copy).');
