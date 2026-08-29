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

test('unescapes escaped quotes inside entity/attribute strings', () => {
  const refs = extractReferences("{{ states('sensor.it\\'s') }}");
  assert.equal(refs.length, 1);
  assert.equal(refs[0].entityId, "sensor.it's");

  const attrRefs = extractReferences("{{ state_attr('sensor.x', 'temp\"unit') }}");
  assert.equal(attrRefs[0].attribute, 'temp"unit');
});

test('single-arg is_state() and state_attr() yield undefined for missing parts', () => {
  const state = extractReferences("{{ is_state('binary_sensor.x') }}")[0];
  assert.equal(state.fn, 'is_state');
  assert.equal(state.compareValue, undefined);

  const attr = extractReferences("{{ state_attr('sensor.x') }}")[0];
  assert.equal(attr.fn, 'state_attr');
  assert.equal(attr.attribute, undefined);
});

test('does not extract references with unquoted or malformed arguments', () => {
  assert.equal(extractReferences("{{ states(sensor.x) }}").length, 0); // unquoted
  assert.equal(extractReferences("{{ states('sensor.x') }}").length, 1); // sanity: quoted works
  assert.equal(extractReferences("{{ mystates('sensor.x') }}").length, 0); // not our function
});

test('groupReferences sorts by entity then attribute', () => {
  const refs = extractReferences("{{ states('sensor.z') or states('sensor.a') or state_attr('sensor.a','zz') }}");
  const grouped = groupReferences(refs);
  assert.deepEqual(
    grouped.map((g) => `${g.entityId}${g.attribute ? '.' + g.attribute : ''}`),
    ['sensor.a', 'sensor.a.zz', 'sensor.z']
  );
});

test('records the raw matched call text on each reference', () => {
  const refs = extractReferences("{{ is_state('binary_sensor.door','on') }}");
  assert.equal(refs[0].raw, "is_state('binary_sensor.door','on')");
});

