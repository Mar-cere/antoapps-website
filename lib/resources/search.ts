const LOCALE_PREFIXES = new Set(['en', 'pt', 'es']);

/** Comparación de búsqueda: minúsculas, sin tildes y con guiones como espacios. */
export function foldSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Último tramo de la ruta, más el ancla. Ignora el prefijo de idioma. */
export function resourceSlug(link: string): string {
  const hashAt = link.indexOf('#');
  const hash = hashAt >= 0 ? link.slice(hashAt + 1) : '';
  const path = (hashAt >= 0 ? link.slice(0, hashAt) : link).split('?')[0] ?? '';
  const segments = path.split('/').filter(Boolean);
  let last = segments.at(-1) ?? '';
  if (LOCALE_PREFIXES.has(last)) last = '';
  return [last, hash].filter(Boolean).join(' ');
}

export function resourceMatchesQuery(
  item: { title: string; description: string; link: string },
  query: string
): boolean {
  const needle = foldSearchText(query);
  if (needle === '') return true;
  const haystack = foldSearchText(`${item.title} ${item.description} ${resourceSlug(item.link)}`);
  return haystack.includes(needle);
}
