import assert from 'node:assert/strict';
import { test } from 'node:test';
import { findDefaultTemplateEntity } from '../src/ha/template-entities';
import type { HomeAssistant } from '../src/ha/hass';

function mockHass(entries: Array<{ entity_id: string; platform?: string }>): HomeAssistant {
  return {
    states: {},
    entities: Object.fromEntries(entries.map((e) => [e.entity_id, e])),
    connection: { subscribeMessage: async () => async () => undefined },
    callWS: async () => undefined as never,
    callApi: async () => undefined as never,
  };
}

test('picks the first template-backed sensor from the registry', () => {
  const hass = mockHass([
    { entity_id: 'light.kitchen', platform: 'hue' },
    { entity_id: 'sensor.real_temp', platform: 'mqtt' },
    { entity_id: 'sensor.movie_mode', platform: 'template' },
    { entity_id: 'binary_sensor.door', platform: 'template' },
  ]);
  assert.equal(findDefaultTemplateEntity(hass), 'sensor.movie_mode');
});

test('prefers an explicitly suggested template entity', () => {
  const hass = mockHass([
    { entity_id: 'sensor.movie_mode', platform: 'template' },
    { entity_id: 'binary_sensor.picked', platform: 'template' },
  ]);
  assert.equal(
    findDefaultTemplateEntity(hass, ['binary_sensor.picked'], ['sensor.movie_mode']),
    'binary_sensor.picked'
  );
});

test('ignores suggested entities that are not template-backed', () => {
  const hass = mockHass([
    { entity_id: 'light.kitchen', platform: 'hue' },
    { entity_id: 'sensor.movie_mode', platform: 'template' },
  ]);
  assert.equal(findDefaultTemplateEntity(hass, ['light.kitchen']), 'sensor.movie_mode');
});

test('returns undefined when no template entity exists', () => {
  const hass = mockHass([{ entity_id: 'light.kitchen', platform: 'hue' }]);
  assert.equal(findDefaultTemplateEntity(hass), undefined);
});

test('returns undefined without a registry snapshot', () => {
  assert.equal(findDefaultTemplateEntity({ states: {} } as HomeAssistant), undefined);
  assert.equal(findDefaultTemplateEntity(undefined), undefined);
});
