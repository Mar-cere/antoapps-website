import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isSuppressionWatch, windowReading } from './weekReading.ts';

test('no marca sin supresión ni la intersección ni la crisis', () => {
  assert.equal(isSuppressionWatch({
    conversionSuppression: 'none',
    slice: 'none',
    safetyRoute: null,
  }), false);
  assert.equal(isSuppressionWatch({
    conversionSuppression: 'planned',
    slice: 'couple_and_vent',
    safetyRoute: null,
  }), false);
  assert.equal(isSuppressionWatch({
    conversionSuppression: 'planned',
    slice: 'none',
    safetyRoute: 'safeguard_239',
  }), false);
});

test('marca planned o applied fuera de la intersección', () => {
  assert.equal(isSuppressionWatch({
    conversionSuppression: 'planned',
    slice: 'vent',
    safetyRoute: 'none',
  }), true);
  assert.equal(isSuppressionWatch({
    conversionSuppression: 'applied',
    slice: 'couple_and_vent',
    safetyRoute: null,
  }), true);
});

test('la nota de la ventana no pide abrir filas silenciadas sin el caso', () => {
  const quiet = windowReading([
    { conversionSuppression: 'none', slice: 'none', safetyRoute: null },
    { conversionSuppression: 'planned', slice: 'none', safetyRoute: 'hard_stop' },
  ]);
  assert.equal(quiet.note, 'no_es_bug');
  assert.match(quiet.line, /no es bug/);
  assert.match(quiet.line, /Crisis: cubo, sin parche/);
  assert.doesNotMatch(quiet.line, /filas marcadas/);

  const watch = windowReading([
    { conversionSuppression: 'planned', slice: 'vent', safetyRoute: null },
    { conversionSuppression: 'none', slice: null, safetyRoute: null },
  ]);
  assert.equal(watch.note, 'vigilar');
  assert.equal(watch.drifted, 1);
  assert.equal(watch.plans, 2);
  assert.match(watch.line, /1 de 2 planes/);
});
