import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseBooleanTemplate, extractExpression } from '../src/parser/parser';
import type { AstNode } from '../src/parser/types';

function kinds(node: AstNode): unknown {
  if (node.kind === 'LEAF') return node.source;
  return { [node.kind]: (node.children ?? []).map(kinds) };
}

test('extractExpression strips {{ }} wrapper', () => {
  assert.equal(extractExpression("{{ states('sensor.x') }}"), "states('sensor.x')");
  assert.equal(extractExpression("a and b"), 'a and b');
});

test('parses simple AND of two is_state calls', () => {
  const { ast, fallback } = parseBooleanTemplate(
    "{{ is_state('binary_sensor.door','on') and states('sensor.mode') == 'home' }}"
  );
  assert.equal(fallback, false);
  assert.deepEqual(kinds(ast), {
    AND: ["is_state('binary_sensor.door','on')", "states('sensor.mode') == 'home'"],
  });
});

test('parses OR with nested AND (precedence: and binds tighter than or)', () => {
  const { ast } = parseBooleanTemplate('{{ a and b or c }}');
  assert.deepEqual(kinds(ast), { OR: [{ AND: ['a', 'b'] }, 'c'] });
});

test('parses explicit parentheses grouping', () => {
  const { ast } = parseBooleanTemplate('{{ (a or b) and c }}');
  assert.deepEqual(kinds(ast), { AND: [{ OR: ['a', 'b'] }, 'c'] });
});

test('parses NOT', () => {
  const { ast } = parseBooleanTemplate("{{ not is_state('sensor.x','on') }}");
  assert.deepEqual(kinds(ast), { NOT: ["is_state('sensor.x','on')"] });
});

test('function-call parens are not mistaken for grouping parens', () => {
  const { ast, fallback } = parseBooleanTemplate(
    "{{ state_attr('climate.a','temperature') > 20 and states('sensor.b') == 'on' }}"
  );
  assert.equal(fallback, false);
  assert.deepEqual(kinds(ast), {
    AND: ["state_attr('climate.a','temperature') > 20", "states('sensor.b') == 'on'"],
  });
});

test('string literals containing "and"/"or" words are not split', () => {
  const { ast } = parseBooleanTemplate("{{ states('sensor.x') == 'sand or gravel' }}");
  assert.deepEqual(kinds(ast), "states('sensor.x') == 'sand or gravel'");
});

test('falls back to a single opaque leaf on unparseable input', () => {
  const { ast, fallback } = parseBooleanTemplate('{{ (a and b }}'); // unbalanced parens
  assert.equal(fallback, true);
  assert.equal(ast.kind, 'LEAF');
});
