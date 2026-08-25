import { POST } from '../app/api/contact/route';
import {
  CONTACT_RATE_LIMIT,
  consumeContactRateLimit,
  getClientIp,
  isAllowedOrigin,
  resetContactRateLimit,
} from '../lib/server/request-guard';

const errors: string[] = [];

function assert(condition: unknown, message: string): void {
  if (!condition) errors.push(message);
}

assert(isAllowedOrigin('https://antoapps.com'), 'allowlist: apex https debe pasar');
assert(isAllowedOrigin('https://www.antoapps.com'), 'allowlist: www https debe pasar');
assert(isAllowedOrigin('HTTPS://ANTOAPPS.COM'), 'allowlist: origin case-insensitive en host');
assert(!isAllowedOrigin(null), 'allowlist: sin Origin debe fallar');
assert(!isAllowedOrigin(undefined), 'allowlist: Origin ausente debe fallar');
assert(!isAllowedOrigin(''), 'allowlist: Origin vacío debe fallar');
assert(!isAllowedOrigin('null'), 'allowlist: Origin literal null debe fallar');
assert(!isAllowedOrigin('http://antoapps.com'), 'allowlist: http no debe pasar');
assert(!isAllowedOrigin('https://evil.antoapps.com'), 'allowlist: subdominio extra no debe pasar');
assert(!isAllowedOrigin('https://antoapps.com.evil.com'), 'allowlist: sufijo no debe pasar');
assert(!isAllowedOrigin('https://antoapps.com:8443'), 'allowlist: puerto extra no debe pasar');
assert(!isAllowedOrigin('*'), 'allowlist: wildcard no debe pasar');
assert(!isAllowedOrigin('https://preview.antoapps.com'), 'allowlist: preview no debe pasar');

assert(getClientIp(new Headers()) === 'unknown', 'ip: sin x-forwarded-for → unknown');
assert(
  getClientIp(new Headers({ 'x-forwarded-for': '203.0.113.10, 10.0.0.1' })) === '203.0.113.10',
  'ip: usar el primer hop de x-forwarded-for'
);
assert(
  getClientIp(new Headers({ 'x-forwarded-for': '  198.51.100.7  ' })) === '198.51.100.7',
  'ip: recortar espacios'
);

resetContactRateLimit();
const ip = '203.0.113.99';
for (let i = 0; i < CONTACT_RATE_LIMIT.maxRequests; i += 1) {
  const result = consumeContactRateLimit(ip, 1_000 + i);
  assert(result.allowed, `rate limit: intento ${i + 1} dentro de la ventana debe pasar`);
}
const blocked = consumeContactRateLimit(ip, 1_000 + CONTACT_RATE_LIMIT.maxRequests);
assert(!blocked.allowed, 'rate limit: ráfaga debe denegar');
assert(blocked.retryAfterSec >= 1, 'rate limit: Retry-After debe ser >= 1');

const later = consumeContactRateLimit(ip, 1_000 + CONTACT_RATE_LIMIT.windowMs + 1);
assert(later.allowed, 'rate limit: tras la ventana debe volver a permitir');

const payload = JSON.stringify({
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Mensaje de prueba con más de diez caracteres.',
});

async function post(headers: Record<string, string>): Promise<Response> {
  return POST(
    new Request('https://antoapps.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: payload,
    })
  );
}

async function runRouteChecks(): Promise<void> {
  resetContactRateLimit();
  const missingOrigin = await post({ 'x-forwarded-for': '203.0.113.1' });
  assert(missingOrigin.status === 403, `POST sin Origin debe ser 403, fue ${missingOrigin.status}`);

  resetContactRateLimit();
  const oddOrigin = await post({
    origin: 'https://evil.example',
    'x-forwarded-for': '203.0.113.2',
  });
  assert(oddOrigin.status === 403, `POST Origin extraño debe ser 403, fue ${oddOrigin.status}`);

  resetContactRateLimit();
  const siteOrigin = await post({
    origin: 'https://antoapps.com',
    'x-forwarded-for': '203.0.113.3',
  });
  assert(
    siteOrigin.status === 503 || siteOrigin.status === 400 || siteOrigin.status === 200,
    `POST del sitio no debe ser 403/429, fue ${siteOrigin.status}`
  );
  assert(siteOrigin.status !== 403, 'POST del sitio no debe ser 403');

  resetContactRateLimit();
  let lastStatus = 0;
  for (let i = 0; i < CONTACT_RATE_LIMIT.maxRequests + 1; i += 1) {
    const response = await post({
      origin: 'https://www.antoapps.com',
      'x-forwarded-for': '203.0.113.4',
    });
    lastStatus = response.status;
  }
  assert(lastStatus === 429, `POST en ráfaga debe ser 429, fue ${lastStatus}`);
}

runRouteChecks()
  .then(() => {
    if (errors.length > 0) {
      console.error('validate-contact-request-guard falló:');
      for (const error of errors) console.error(`- ${error}`);
      process.exit(1);
    }
    console.log('validate-contact-request-guard: ok');
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
