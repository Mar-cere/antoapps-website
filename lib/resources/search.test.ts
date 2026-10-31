import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getResourcesPageCopy } from '../i18n/copy/pages/resources';
import { resourceMatchesQuery } from './search';

function titlesFor(locale: 'es' | 'en' | 'pt', query: string): string[] {
  return getResourcesPageCopy(locale).library.groups.flatMap((group) =>
    group.items.filter((item) => resourceMatchesQuery(item, query)).map((item) => item.link)
  );
}

const sleep = {
  title: 'Cuando no puedes dormir',
  description: 'Un sueño pobre amplifica ansiedad e irritabilidad.',
  link: '/recursos/higiene-sueno-salud-mental',
};

const grounding = {
  title: 'Cuando la ansiedad sube',
  description: 'Primero hay que aterrizar.',
  link: '/pt/recursos/grounding-ansiedad-crisis',
};

test('encuentra con y sin tilde', () => {
  assert.equal(resourceMatchesQuery(sleep, 'sueño'), true);
  assert.equal(resourceMatchesQuery(sleep, 'sueno'), true);
  assert.equal(resourceMatchesQuery(sleep, 'SUEÑO'), true);
});

test('encuentra por slug, con o sin guiones', () => {
  assert.equal(resourceMatchesQuery(grounding, 'grounding-ansiedad-crisis'), true);
  assert.equal(resourceMatchesQuery(grounding, 'grounding ansiedad crisis'), true);
  assert.equal(resourceMatchesQuery(sleep, 'higiene-sueno-salud-mental'), true);
});

test('el slug no está en el título y aun así coincide', () => {
  const evidence = {
    title: 'Evidencia que informa Anto',
    description: 'Literatura de categoría, puente a producto y citas APA.',
    link: '/investigacion',
  };
  assert.equal(resourceMatchesQuery(evidence, 'investigacion'), true);
});

test('el ancla faq cuenta como slug y el prefijo de idioma no', () => {
  const faq = {
    title: 'FAQ',
    description: 'Privacy and the free trial.',
    link: '/en#faq',
  };
  assert.equal(resourceMatchesQuery(faq, 'faq'), true);
  assert.equal(resourceMatchesQuery(faq, 'en'), false);
});

test('portugués de Brasil: você y não con y sin tilde', () => {
  const pt = {
    title: 'Quando você não consegue dormir',
    description: 'Um sono ruim amplifica a ansiedade.',
    link: '/pt/recursos/higiene-sueno-salud-mental',
  };
  assert.equal(resourceMatchesQuery(pt, 'voce'), true);
  assert.equal(resourceMatchesQuery(pt, 'você'), true);
  assert.equal(resourceMatchesQuery(pt, 'nao'), true);
  assert.equal(resourceMatchesQuery(pt, 'não'), true);
});

test('una consulta vacía deja pasar el ítem y una ajena no', () => {
  assert.equal(resourceMatchesQuery(sleep, '   '), true);
  assert.equal(resourceMatchesQuery(sleep, 'xyzzy'), false);
});

test('el catálogo real responde a tilde y a slug en los tres idiomas', () => {
  for (const locale of ['es', 'en', 'pt'] as const) {
    const byAccent = titlesFor(locale, 'sueno');
    const byTilde = titlesFor(locale, 'sueño');
    const bySlug = titlesFor(locale, 'higiene-sueno-salud-mental');
    assert.ok(bySlug.some((link) => link.endsWith('/higiene-sueno-salud-mental')));
    assert.deepEqual(byAccent, byTilde);
    assert.ok(byAccent.some((link) => link.endsWith('/higiene-sueno-salud-mental')));
    assert.ok(titlesFor(locale, 'investigacion').some((link) => link.endsWith('/investigacion')));
  }
});
