/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Deshabilitar ESLint durante el build para evitar errores con ESLint 9
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization
  images: {
    domains: ['antoapps.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Code splitting y optimizaciones
  // optimizeCss deshabilitado temporalmente debido a dependencias faltantes
  // experimental: {
  //   optimizeCss: true,
  // },
  // Compresión
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/l', destination: '/bienvenida', permanent: false },
      { source: '/login', destination: '/#descargar', permanent: false },
      { source: '/signup', destination: '/#descargar', permanent: false },
      { source: '/chat', destination: '/#descargar', permanent: false },
    ];
  },
  // Preservar archivos estáticos existentes
  async rewrites() {
    return [
      {
        source: '/privacidad',
        destination: '/privacidad',
      },
      {
        source: '/contacto',
        destination: '/contacto',
      },
      {
        source: '/terminos',
        destination: '/terminos',
      },
      {
        source: '/sobre-nosotros',
        destination: '/sobre-nosotros',
      },
      {
        source: '/comparar',
        destination: '/comparar',
      },
      {
        source: '/seguridad',
        destination: '/seguridad',
      },
      {
        source: '/investigacion',
        destination: '/investigacion',
      },
      {
        source: '/desarrollo',
        destination: '/desarrollo',
      },
      {
        source: '/recursos',
        destination: '/recursos',
      },
    ];
  },
  // Headers de seguridad
  async headers() {
    const globalHeaders = [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'geolocation=(), microphone=(), camera=()',
      },
    ];

    const noReferrer = [
      {
        key: 'Referrer-Policy',
        value: 'no-referrer',
      },
    ];

    return [
      {
        source: '/(.*)',
        headers: globalHeaders,
      },
      // Ruta opaca: menos filtración del host al enlazar o pedir recursos externos
      {
        source: '/zt9kq7m2v8n4xpw6rb3yjh1cw5df8a',
        headers: noReferrer,
      },
      {
        source: '/zt9kq7m2v8n4xpw6rb3yjh1cw5df8a/resultado',
        headers: noReferrer,
      },
      {
        source: '/api/rq7vn3k8mx2pw9yt5z',
        headers: noReferrer,
      },
    ];
  },
};

module.exports = nextConfig;

