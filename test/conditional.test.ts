import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseBooleanTemplate } from '../src/parser/parser';
import { buildEvaluated, collectLeaves, loadingLeafState, type LeafState } from '../src/tree/evaluate';
import type { AstNode } from '../src/parser/types';

function summarize(node: AstNode): unknown {
  if (node.kind === 'LEAF') return node.source;
  if (node.kind === 'OUTPUT') return ['OUTPUT', node.source];
  if (node.kind === 'CONDITIONAL') {
    return {
      CONDITIONAL: (node.branches ?? []).map((b) => ({
        cond: b.condition ? summarize(b.condition) : 'else',
        body: summarize(b.body),
      })),
    };
  }
  return { [node.kind]: (node.children ?? []).map(summarize) };
}

// --- Parser structure ---

test('parses if/else as a CONDITIONAL with two branches', () => {
  const { ast, fallback } = parseBooleanTemplate(
    "{% if is_state('binary_sensor.guest','on') %}We have a guest{% else %}All clear{% endif %}"
  );
  assert.equal(fallback, false);
  assert.deepEqual(summarize(ast), {
    CONDITIONAL: [
      {
        cond: "is_state('binary_sensor.guest','on')",
        body: ['OUTPUT', 'We have a guest'],
      },
      { cond: 'else', body: ['OUTPUT', 'All clear'] },
    ],
  });
});

test('parses if/elif/else with all three branches', () => {
  const { ast } = parseBooleanTemplate('{% if a %}1{% elif b %}2{% else %}3{% endif %}');
  assert.equal(ast.branches!.length, 3);
  assert.deepEqual(summarize(ast), {
    CONDITIONAL: [
      { cond: 'a', body: ['OUTPUT', '1'] },
      { cond: 'b', body: ['OUTPUT', '2'] },
      { cond: 'else', body: ['OUTPUT', '3'] },
    ],
  });
});

test('parses a bare if without else', () => {
  const { ast } = parseBooleanTemplate('{% if a %}yes{% endif %}');
  assert.equal(ast.kind, 'CONDITIONAL');
  assert.equal(ast.branches!.length, 1);
  assert.equal(ast.branches![0].condition?.source, 'a');
  assert.equal(ast.branches![0].body.source, 'yes');
});

test('parses nested if when a body is entirely a conditional', () => {
  const { ast } = parseBooleanTemplate('{% if a %}{% if b %}Y{% endif %}{% endif %}');
  assert.equal(ast.kind, 'CONDITIONAL');
  const inner = ast.branches![0].body;
  assert.equal(inner.kind, 'CONDITIONAL');
  assert.equal(inner.branches![0].condition?.source, 'b');
});

test('whitespace control markers and comments do not break parsing', () => {
  const { ast, fallback } = parseBooleanTemplate(
    '{%- if a -%}x{%- else -%}y{%- endif -%} {# trailing comment #}'
  );
  assert.equal(fallback, false);
  assert.equal(ast.kind, 'CONDITIONAL');
  assert.equal(ast.branches!.length, 2);
});

test('a set prelude before an if is propagated to every leaf and output', () => {
  const { ast } = parseBooleanTemplate('{% set t = 5 %}{% if a > t %}hi{% endif %}');
  const leaf = ast.branches![0].condition!;
  assert.equal(leaf.kind, 'LEAF');
  assert.equal(leaf.preamble, '{% set t = 5 %}');
  assert.equal(ast.branches![0].body.preamble, '{% set t = 5 %}');
});

// --- Evaluation: fired branch ---

function build(condTemplate: string, sets: Record<string, string>): ReturnType<typeof buildEvaluated> {
  const { ast } = parseBooleanTemplate(condTemplate);
  const states = new Map<AstNode, LeafState>();
  for (const unit of collectLeaves(ast)) states.set(unit, loadingLeafState());
  // populate every leaf/output unit with a rendered value for full evaluation
  for (const [unit, st] of Array.from(states)) {
    const src = (unit as AstNode).source;
    const v = sets[src];
    states.set(unit, { loading: false, rendered: v ?? (states.get(unit)!.loading ? '' : '') });
  }
  for (const [unit] of Array.from(states)) {
    const src = (unit as AstNode).source;
    if (!(src in sets)) states.set(unit, { loading: false, rendered: '' });
  }
  return buildEvaluated(ast, states);
}

test('marks the first true condition branch as fired', () => {
  const tree = build('{% if a %}1{% elif b %}2{% else %}3{% endif %}', { a: 'false', b: 'true' });
  assert.deepEqual(tree.branches!.map((b) => b.fired), [false, true, false]);
});

test('falls through to the else branch when no condition is true', () => {
  const tree = build('{% if a %}1{% elif b %}2{% else %}3{% endif %}', { a: 'false', b: 'false' });
  assert.deepEqual(tree.branches!.map((b) => b.fired), [false, false, true]);
});

test('fires the first true condition even if a later one is also true', () => {
  const tree = build('{% if a %}1{% elif b %}2{% endif %}', { a: 'true', b: 'true' });
  assert.deepEqual(tree.branches!.map((b) => b.fired), [true, false]);
});

test('no branch fires when no condition is true and there is no else', () => {
  const tree = build('{% if a %}1{% elif b %}2{% endif %}', { a: 'false', b: 'false' });
  assert.deepEqual(tree.branches!.map((b) => b.fired), [false, false]);
  assert.equal(tree.value, false);
});

test('a condition parsed from an AND tree drives firing by its combined value', () => {
  const tree = build('{% if a and b %}go{% endif %}', { a: 'true', b: 'true' });
  assert.deepEqual(tree.branches!.map((b) => b.fired), [true]);

  const other = build('{% if a and b %}go{% endif %}', { a: 'true', b: 'false' });
  assert.deepEqual(other.branches!.map((b) => b.fired), [false]);
});

test('collectLeaves includes branch bodies (OUTPUT units) for subscription', () => {
  const { ast } = parseBooleanTemplate('{% if a %}x{% else %}y{% endif %}');
  const sources = collectLeaves(ast).map((l) => l.source);
  assert.ok(sources.includes('a')); // condition leaf
  assert.ok(sources.includes('x')); // branch body output
  assert.ok(sources.includes('y')); // else branch body output
});
