import assert from 'node:assert/strict';
import { test } from 'node:test';
import { collectOptions } from '../src/ha/template-source';

test('collectOptions reads every populated top-level suggested_value', () => {
  const schema = [
    { name: 'state', description: { suggested_value: '{{ states("sensor.x") }}' } },
    { name: 'unit_of_measurement', description: { suggested_value: '°C' } },
    { name: 'device_class', description: { suggested_value: 'temperature' } },
    { name: 'state_class', description: { suggested_value: 'measurement' } },
  ];
  assert.deepEqual(collectOptions(schema), {
    state: '{{ states("sensor.x") }}',
    unit_of_measurement: '°C',
    device_class: 'temperature',
    state_class: 'measurement',
  });
});

test('collectOptions skips unset/empty fields so they are omitted (and thus deleted) on save', () => {
  const schema = [
    { name: 'state', description: { suggested_value: '{{ 1 }}' } },
    { name: 'unit_of_measurement', description: { suggested_value: null } }, // unset
    { name: 'device_class', description: {} }, // absent
  ];
  assert.deepEqual(collectOptions(schema), { state: '{{ 1 }}' });
});

test('collectOptions flattens section fields into nested objects', () => {
  const schema = [
    { name: 'state', description: { suggested_value: '{{ 1 }}' } },
    {
      name: 'additional_options',
      type: 'section',
      schema: [
        { name: 'availability', description: { suggested_value: '{{ is_state("s.e", "on") }}' } },
        { name: 'force_update', description: {} }, // unset -> omitted
      ],
    },
  ];
  assert.deepEqual(collectOptions(schema), {
    state: '{{ 1 }}',
    additional_options: { availability: '{{ is_state("s.e", "on") }}' },
  });
});

test('collectOptions omits an empty section entirely', () => {
  const schema = [
    {
      name: 'additional_options',
      type: 'section',
      schema: [{ name: 'availability', description: {} }],
    },
  ];
  assert.deepEqual(collectOptions(schema), {});
});

test('collectOptions handles an undefined schema', () => {
  assert.deepEqual(collectOptions(undefined), {});
});
