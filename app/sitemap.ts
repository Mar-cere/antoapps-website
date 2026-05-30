import { MetadataRoute } from 'next';

const baseUrl = 'https://antoapps.com';

const localizedRoutes = [
  { es: '', en: '/en' },
  { es: '/app', en: '/en/app' },
  { es: '/comparar', en: '/en/comparar' },
  { es: '/bienvenida', en: '/en/bienvenida' },
  { es: '/contacto', en: '/en/contacto' },
  { es: '/privacidad', en: '/en/privacidad' },
  { es: '/terminos', en: '/en/terminos' },
  { es: '/desarrollo', en: '/en/desarrollo' },
  { es: '/sobre-nosotros', en: '/en/sobre-nosotros' },
  { es: '/seguridad', en: '/en/seguridad' },
  { es: '/investigacion', en: '/en/investigacion' },
  { es: '/recursos', en: '/en/recursos' },
  { es: '/changelog', en: '/en/changelog' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of localizedRoutes) {
    const esUrl = `${baseUrl}${route.es}`;
    const enUrl = `${baseUrl}${route.en}`;
    const languages = {
      es: esUrl,
      en: enUrl,
      'x-default': esUrl,
    };

    entries.push({
      url: esUrl,
      lastModified: new Date(),
      changeFrequency: route.es === '' ? 'daily' : 'weekly',
      priority: route.es === '' ? 1 : 0.8,
      alternates: { languages },
    });

    entries.push({
      url: enUrl,
      lastModified: new Date(),
      changeFrequency: route.es === '' ? 'daily' : 'weekly',
      priority: route.es === '' ? 0.9 : 0.7,
      alternates: { languages },
    });
  }

  return entries;
}
