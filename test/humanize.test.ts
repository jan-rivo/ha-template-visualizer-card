import assert from 'node:assert/strict';
import { test } from 'node:test';
import { humanizeLeaf } from '../src/parser/humanize';
import type { HomeAssistant } from '../src/ha/hass';

const hass = {
  states: {
    'sensor.mode': { state: 'home', attributes: { friendly_name: 'Mode' } },
    'sensor.some_sensor': { state: '21', attributes: { friendly_name: 'Some Sensor' } },
    'climate.living_room': { state: 'heat', attributes: { friendly_name: 'Living Room' } },
    'binary_sensor.door': { state: 'off', attributes: { friendly_name: 'Door' } },
    'sensor.snuffy': { state: '0', attributes: { friendly_name: 'Snuffy' } },
  },
} as unknown as HomeAssistant;

test('equality becomes "is"', () => {
  assert.equal(humanizeLeaf("states('sensor.mode') == 'home'", hass), 'Mode is home');
});

test('literal-first comparison is normalized so the entity reads as the subject', () => {
  assert.equal(humanizeLeaf("20 < states('sensor.some_sensor')", hass), 'Some Sensor is greater than 20');
  assert.equal(humanizeLeaf("states('sensor.some_sensor') > 20", hass), 'Some Sensor is greater than 20');
});

test('inequality and range operators map to words', () => {
  assert.equal(humanizeLeaf("states('sensor.mode') != 'home'", hass), 'Mode is not home');
  assert.equal(humanizeLeaf("states('sensor.mode') <= 'z'", hass), 'Mode is less than or equal to z');
  assert.equal(humanizeLeaf("states('sensor.mode') >= 'a'", hass), 'Mode is greater than or equal to a');
});

test('state_attr references include the attribute', () => {
  assert.equal(
    humanizeLeaf("state_attr('climate.living_room','temperature') > 20", hass),
    'Living Room temperature is greater than 20'
  );
});

test('predicate functions is_state / is_state_attr are naturalized', () => {
  assert.equal(humanizeLeaf("is_state('binary_sensor.door','on')", hass), 'Door is on');
  assert.equal(
    humanizeLeaf("is_state_attr('climate.living_room','hvac_action','heating')", hass),
    'Living Room hvac action is heating'
  );
});

test('bare entity leaf becomes its friendly name', () => {
  assert.equal(humanizeLeaf("states('binary_sensor.door')", hass), 'Door');
});

test('friendly name falls back to a prettified entity id when hass has no name', () => {
  assert.equal(humanizeLeaf("states('sensor.outside_temp') == 'cold'", hass), 'outside temp is cold');
});

test('unrecognized leaves fall back to null (caller shows raw source)', () => {
  assert.equal(humanizeLeaf('foo bar baz', hass), null);
  assert.equal(humanizeLeaf("float('not') + 1", hass), null);
});

test('an entity referencing another entity still reads naturally', () => {
  assert.equal(humanizeLeaf("states('sensor.mode') == states('sensor.snuffy')", hass), 'Mode is Snuffy');
});