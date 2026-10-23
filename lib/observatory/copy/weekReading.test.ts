import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isSuppressionWatch, suppressionMark, weeklyReviewMessage, windowReading } from './weekReading.ts';

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

test('planned por activationBand high no es fallo', () => {
  const story = {
    conversionSuppression: 'planned',
    slice: 'none',
    safetyRoute: 'none',
    activationBand: 'high',
    riskClass: 'LOW',
  };
  assert.equal(suppressionMark(story), 'esperada');
  assert.equal(isSuppressionWatch(story), false);
  const reading = windowReading([story]);
  assert.equal(reading.note, 'no_es_bug');
  assert.equal(reading.drifted, 0);
  assert.match(reading.line, /No es bug/);
});

test('planned fuera de couple_and_vent sin esa causa queda a mirar', () => {
  const story = {
    conversionSuppression: 'planned',
    slice: 'couple',
    safetyRoute: 'none',
    activationBand: 'low',
    riskClass: 'LOW',
  };
  assert.equal(suppressionMark(story), 'a_mirar');
  assert.equal(isSuppressionWatch(story), true);
});

test('la semana con trazas no dice que el runtime no publicó', () => {
  const message = weeklyReviewMessage({
    traces_present: true,
    rows: [],
    note: 'El runtime no publicó turnos en esta ventana.',
  });
  assert.match(message, /Ninguna fila marcada/);
  assert.doesNotMatch(message, /no publicó/);
});
