import assert from 'node:assert/strict';
import {
  formatAndroidLeadTelegramMessage,
  resolveLeadLocale,
} from '../lib/android-early-access/lead-context';
import { parseEarlyAccessPayload } from '../lib/android-early-access/parse-payload';

const submittedAt = '2026-06-06T12:00:00.000Z';

assert.equal(resolveLeadLocale('/bienvenida'), 'es');
assert.equal(resolveLeadLocale('/en/bienvenida'), 'en');
assert.equal(resolveLeadLocale('/bienvenida', 'en'), 'en');

const esLead = parseEarlyAccessPayload(
  {
    email: '  Test@Example.com ',
    page: '/bienvenida',
    pageUrl: '/bienvenida?ab=c',
    placement: 'bienvenida_hero_android_early_access',
    locale: 'es',
    landingVariant: 'C',
    utm_source: 'instagram',
  },
  submittedAt
);
assert.ok(esLead);
assert.equal(esLead.email, 'test@example.com');
assert.equal(esLead.locale, 'es');
assert.equal(esLead.landingVariant, 'C');
assert.equal(esLead.pageUrl, '/bienvenida?ab=c');

const enLead = parseEarlyAccessPayload(
  {
    email: 'user@mail.com',
    page: '/en/bienvenida',
    placement: 'bienvenida_final_android_early_access',
  },
  submittedAt
);
assert.ok(enLead);
assert.equal(enLead.locale, 'en');

const telegramMessage = formatAndroidLeadTelegramMessage({
  email: 'user@mail.com',
  page: '/en/bienvenida',
  pageUrl: '/en/bienvenida?ab=b',
  placement: 'bienvenida_hero_android_early_access',
  source: 'website',
  locale: 'en',
  landingVariant: 'B',
  submittedAt,
  utmSource: 'meta',
});

assert.match(telegramMessage, /Idioma: English \(en\)/);
assert.match(telegramMessage, /Página: \/en\/bienvenida\?ab=b/);
assert.match(telegramMessage, /Variante landing: B/);
assert.match(telegramMessage, /UTM: source=meta/);

console.log('validate-android-lead-context: OK');
