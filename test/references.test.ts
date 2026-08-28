import assert from 'node:assert/strict';
import { test } from 'node:test';
import { extractReferences, groupReferences } from '../src/parser/references';

test('extracts states() references', () => {
  const refs = extractReferences("{{ states('sensor.mode') == 'home' }}");
  assert.equal(refs.length, 1);
  assert.deepEqual(refs[0], { raw: "states('sensor.mode')", fn: 'states', entityId: 'sensor.mode' });
});

test('extracts is_state() references with compare value', () => {
  const refs = extractReferences("{{ is_state('binary_sensor.door', 'on') }}");
  assert.equal(refs.length, 1);
  assert.equal(refs[0].fn, 'is_state');
  assert.equal(refs[0].entityId, 'binary_sensor.door');
  assert.equal(refs[0].compareValue, 'on');
});

test('extracts state_attr() references with attribute', () => {
  const refs = extractReferences("{{ state_attr('climate.living_room', 'temperature') > 20 }}");
  assert.equal(refs.length, 1);
  assert.equal(refs[0].fn, 'state_attr');
  assert.equal(refs[0].entityId, 'climate.living_room');
  assert.equal(refs[0].attribute, 'temperature');
});

test('extracts is_state_attr() references with attribute and compare value', () => {
  const refs = extractReferences("{{ is_state_attr('climate.a', 'hvac_action', 'heating') }}");
  assert.equal(refs.length, 1);
  assert.equal(refs[0].fn, 'is_state_attr');
  assert.equal(refs[0].attribute, 'hvac_action');
  assert.equal(refs[0].compareValue, 'heating');
});

test('finds multiple references across a full boolean template', () => {
  const refs = extractReferences(
    "{{ is_state('binary_sensor.door','off') and state_attr('climate.a','temperature') > 20 and states('sensor.mode') == 'home' }}"
  );
  assert.equal(refs.length, 3);
});

test('groupReferences dedupes by entity+attribute and merges usages', () => {
  const refs = extractReferences(
    "{{ states('sensor.x') == 'on' or states('sensor.x') == 'off' or state_attr('sensor.x', 'unit') == 'C' }}"
  );
  const grouped = groupReferences(refs);
  assert.equal(grouped.length, 2); // sensor.x (state) + sensor.x.unit
  const stateEntry = grouped.find((g) => !g.attribute);
  assert.equal(stateEntry?.usages.length, 2);
});
