import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://antoapps.com';

  const routes = [
    '',
    '/en',
    '/app',
    '/en/app',
    '/comparar',
    '/en/comparar',
    '/bienvenida',
    '/en/bienvenida',
    '/contacto',
    '/en/contacto',
    '/privacidad',
    '/en/privacidad',
    '/terminos',
    '/en/terminos',
    '/desarrollo',
    '/en/desarrollo',
    '/sobre-nosotros',
    '/en/sobre-nosotros',
    '/seguridad',
    '/en/seguridad',
    '/investigacion',
    '/en/investigacion',
    '/recursos',
    '/en/recursos',
    '/changelog',
    '/en/changelog',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
