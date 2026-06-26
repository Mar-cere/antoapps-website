/**
 * Validación rápida de lógica de dispositivo / in-app browser.
 * Mantener en sync con lib/device/*.ts y lib/download-links.ts
 * Ejecutar: npm run validate:landing
 */

function detectLandingDevice(ua) {
  if (!ua) return 'unknown';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'desktop';
}

function detectInAppBrowser(ua) {
  if (!ua || !/Instagram|FBAN|FBAV|FBIOS|FB_IAB|TikTok|Musical_ly|Twitter|Line\/|Snapchat|LinkedInApp/i.test(ua)) {
    return null;
  }
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return null;
}

function isAppStoreUrl(href) {
  if (!href.startsWith('http://') && !href.startsWith('https://')) return false;
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === 'apps.apple.com' || host === 'itunes.apple.com';
  } catch {
    return false;
  }
}

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    failed += 1;
  }
}

assert(detectLandingDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)') === 'ios', 'iPhone → ios');
assert(detectLandingDevice('Mozilla/5.0 (Linux; Android 14; Pixel 8)') === 'android', 'Android → android');
assert(detectLandingDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)') === 'desktop', 'Mac desktop → desktop');
assert(detectLandingDevice('') === 'unknown', 'empty UA → unknown');

assert(
  detectInAppBrowser('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0; Instagram 300.0)') === 'ios',
  'Instagram iOS → ios'
);
assert(
  detectInAppBrowser('Mozilla/5.0 (Linux; Android 14; wv) TikTok') === 'android',
  'TikTok Android → android'
);
assert(
  detectInAppBrowser('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0; Safari)') === null,
  'Safari iOS → null'
);

assert(isAppStoreUrl('https://apps.apple.com/cl/app/anto/id6756631911'), 'App Store URL válida');
assert(!isAppStoreUrl('https://evil.com/apps.apple.com'), 'host malicioso rechazado');
assert(!isAppStoreUrl('/bienvenida'), 'ruta relativa rechazada');

function resolveWaitlistDisplayCount(actual, floor = 847) {
  return Math.max(actual, floor);
}

assert(resolveWaitlistDisplayCount(12) === 847, 'waitlist: aplica piso mínimo');
assert(resolveWaitlistDisplayCount(900) === 900, 'waitlist: respeta conteo real si es mayor');

function parseBienvenidaVariant(value) {
  const raw = Array.isArray(value) ? value[0] : value;
  const normalized = raw?.trim().toLowerCase();
  if (normalized === 'a') return 'A';
  if (normalized === 'b') return 'B';
  return 'C';
}

assert(parseBienvenidaVariant('a') === 'A', 'variant a → A');
assert(parseBienvenidaVariant('B') === 'B', 'variant B → B');
assert(parseBienvenidaVariant('c') === 'C', 'variant c → C');
assert(parseBienvenidaVariant(undefined) === 'C', 'variant undefined → C (default)');
assert(parseBienvenidaVariant(['C']) === 'C', 'variant array → C');
assert(parseBienvenidaVariant('invalid') === 'C', 'variant invalid → C (default)');

if (failed > 0) {
  console.error(`\n${failed} validación(es) fallida(s).`);
  process.exit(1);
}

console.log('OK: validación de landing logic pasó.');
