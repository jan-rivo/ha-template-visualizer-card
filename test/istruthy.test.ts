import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isTruthy } from '../src/ha/render';

test('empty / whitespace-only renders are falsy', () => {
  assert.equal(isTruthy(''), false);
  assert.equal(isTruthy('   '), false);
  assert.equal(isTruthy('\n\t'), false);
});

test('Jinja null representations are falsy', () => {
  assert.equal(isTruthy('None'), false);
  assert.equal(isTruthy('none'), false);
  assert.equal(isTruthy('null'), false);
});

test('boolean-ish strings map correctly', () => {
  assert.equal(isTruthy('True'), true);
  assert.equal(isTruthy('true'), true);
  assert.equal(isTruthy('False'), false);
  assert.equal(isTruthy('false'), false);
});

test('numeric strings are truthy iff nonzero', () => {
  assert.equal(isTruthy('0'), false);
  assert.equal(isTruthy('0.0'), false);
  assert.equal(isTruthy('1'), true);
  assert.equal(isTruthy('-1'), true);
  assert.equal(isTruthy('10'), true);
  assert.equal(isTruthy('0.5'), true);
});

test('whitespace is trimmed before evaluation (falsy zero with padding)', () => {
  assert.equal(isTruthy(' 0 '), false);
  assert.equal(isTruthy('  True\t'), true);
});

test('non-empty non-numeric free text is truthy', () => {
  assert.equal(isTruthy('abc'), true);
  assert.equal(isTruthy('off'), true);
});
