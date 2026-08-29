import assert from 'node:assert/strict';
import { test } from 'node:test';
import { splitTemplate } from '../src/parser/template-splitter';
import { parseBooleanTemplate, extractExpression } from '../src/parser/parser';
import type { AstNode } from '../src/parser/types';

// --- splitTemplate ---

test('splitTemplate splits a set prelude + expr into stmt + expr segments', () => {
  const segs = splitTemplate("{% set threshold = 10 %}{{ states('sensor.x') > threshold }}");
  assert.deepEqual(segs.map((s) => s.type), ['stmt', 'expr']);
  assert.match(segs[0].content, /set threshold = 10/);
  assert.equal(segs[1].content.trim(), "states('sensor.x') > threshold");
});

test('splitTemplate keeps literal text and tags in order', () => {
  const segs = splitTemplate('hello {{ a }} world {% set x = 1 %}{# c #}');
  assert.deepEqual(
    segs.map((s) => [s.type, s.content]),
    [
      ['text', 'hello '],
      ['expr', ' a '],
      ['text', ' world '],
      ['stmt', ' set x = 1 '],
      ['comment', ' c '],
    ]
  );
});

test('splitTemplate does not terminate a tag on a closing delimiter inside a string', () => {
  const segs = splitTemplate("{{ states('sensor.x') == 'a}}b' }}");
  assert.deepEqual(segs.map((s) => s.type), ['expr']);
  assert.equal(segs[0].content, " states('sensor.x') == 'a}}b' ");
});

test('splitTemplate does not treat a lone { as a tag opener', () => {
  const segs = splitTemplate('a {not a tag} b');
  assert.deepEqual(segs.map((s) => s.type), ['text']);
  assert.equal(segs[0].content, 'a {not a tag} b');
});

test('splitTemplate returns text for an unterminated tag', () => {
  const segs = splitTemplate('{{ a');
  assert.deepEqual(segs.map((s) => s.type), ['text']);
  assert.equal(segs[0].content, '{{ a');
});

test('splitTemplate preserves positions so the original can be sliced back', () => {
  const src = "{% set x = 1 %}{{'a'}}";
  const segs = splitTemplate(src);
  const rebuilt = segs.map((s) => src.slice(s.start, s.end)).join('');
  assert.equal(rebuilt, src);
});

// --- parseBooleanTemplate with prelude (Phase 1) ---

function kinds(node: AstNode): unknown {
  if (node.kind === 'LEAF') return node.source;
  return { [node.kind]: (node.children ?? []).map(kinds) };
}

function preambleOf(node: AstNode): Record<string, string> {
  const out: Record<string, string> = {};
  (function walk(n: AstNode) {
    if (n.kind === 'LEAF') out[n.source] = n.preamble ?? '';
    for (const c of n.children ?? []) walk(c);
  })(node);
  return out;
}

test('attaches the {% set %} prelude to every leaf of a single-output template', () => {
  const { ast, fallback, preamble } = parseBooleanTemplate(
    "{% set threshold = 10 %}{{ states('sensor.x') > threshold and states('sensor.y') > threshold }}"
  );
  assert.equal(fallback, false);
  assert.equal(preamble, '{% set threshold = 10 %}');
  assert.deepEqual(kinds(ast), {
    AND: ["states('sensor.x') > threshold", "states('sensor.y') > threshold"],
  });
  assert.deepEqual(preambleOf(ast), {
    "states('sensor.x') > threshold": '{% set threshold = 10 %}',
    "states('sensor.y') > threshold": '{% set threshold = 10 %}',
  });
});

test('multiple {% set %} statements all contribute to the prelude', () => {
  const { preamble } = parseBooleanTemplate(
    "{% set a = 1 %}{% set b = 2 %}{{ a > 0 and b > 0 }}"
  );
  assert.match(preamble!, /set a = 1/);
  assert.match(preamble!, /set b = 2/);
});

test('plain {{ expr }} has an empty prelude (behavior unchanged)', () => {
  const { ast, preamble } = parseBooleanTemplate("{{ a and b }}");
  assert.equal(preamble, '');
  assert.deepEqual(preambleOf(ast), { a: '', b: '' });
  assert.deepEqual(kinds(ast), { AND: ['a', 'b'] });
});

test('multiple outputs are handed to the legacy path as a single opaque leaf', () => {
  const { ast } = parseBooleanTemplate("{{ a }}{{ b }}");
  assert.equal(ast.kind, 'LEAF');
});

test('control-flow statements are handed to the legacy path (Phase 2 covers if/elif/else)', () => {
  const { ast } = parseBooleanTemplate("{% if x %}{{ y }}{% endif %}");
  assert.equal(ast.kind, 'LEAF');
});

test('extractExpression still behaves as before', () => {
  assert.equal(extractExpression("{{ a }}"), 'a');
  assert.equal(extractExpression('a'), 'a');
});

test('single-output with leading whitespace text and comments still parses', () => {
  const { ast, fallback, preamble } = parseBooleanTemplate(
    "  {# note #} {% set n = 5 %}  {{ n > 0 }}  "
  );
  assert.equal(fallback, false);
  assert.equal(ast.source, 'n > 0');
  assert.match(preamble!, /set n = 5/);
});
