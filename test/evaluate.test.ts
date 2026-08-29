import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseBooleanTemplate } from '../src/parser/parser';
import { buildEvaluated, collectLeaves, loadingLeafState, type LeafState } from '../src/tree/evaluate';

/** Parses an expression and returns the AST plus a fresh LeafState map. */
function setup(expr: string): { ast: ReturnType<typeof parseBooleanTemplate>['ast']; states: Map<unknown, LeafState> } {
  const { ast } = parseBooleanTemplate(expr);
  const states = new Map<unknown, LeafState>();
  for (const leaf of collectLeaves(ast)) states.set(leaf, loadingLeafState());
  return { ast, states };
}

function setValue(states: Map<unknown, LeafState>, leafSource: string, rendered: string): void {
  for (const [leaf, st] of states) {
    if ((leaf as { source: string }).source === leafSource) {
      states.set(leaf, { loading: false, rendered });
      return;
    }
  }
  throw new Error(`No leaf with source "${leafSource}"`);
}

test('collectLeaves returns leaves in document order', () => {
  const { ast } = parseBooleanTemplate('{{ a and b or c }}');
  assert.deepEqual(collectLeaves(ast).map((l) => l.source), ['a', 'b', 'c']);
});

test('AND is true only when every leaf is true', () => {
  const { ast, states } = setup('{{ a and b }}');
  setValue(states, 'a', 'true');
  setValue(states, 'b', 'false');
  let tree = buildEvaluated(ast, states);
  assert.equal(tree.value, false);

  setValue(states, 'b', 'true');
  tree = buildEvaluated(ast, states);
  assert.equal(tree.value, true);
});

test('OR is true when any leaf is true', () => {
  const { ast, states } = setup('{{ a or b }}');
  setValue(states, 'a', 'false');
  setValue(states, 'b', 'true');
  assert.equal(buildEvaluated(ast, states).value, true);
});

test('NOT inverts its child', () => {
  const { ast, states } = setup('{{ not a }}');
  setValue(states, 'a', 'true');
  assert.equal(buildEvaluated(ast, states).value, false);
  setValue(states, 'a', 'false');
  assert.equal(buildEvaluated(ast, states).value, true);
});

test('truthiness flows from rendered strings via isTruthy', () => {
  const { ast, states } = setup("{{ states('sensor.x') == 'on' }}");
  setValue(states, "states('sensor.x') == 'on'", '0');
  assert.equal(buildEvaluated(ast, states).value, false); // rendered "0" is falsy
  setValue(states, "states('sensor.x') == 'on'", '1');
  assert.equal(buildEvaluated(ast, states).value, true);
});

test('loading leaves render as false and stay flagged', () => {
  const { ast, states } = setup('{{ a and b }}');
  // only set 'a'; leave 'b' loading
  setValue(states, 'a', 'true');
  const tree = buildEvaluated(ast, states);
  assert.equal(tree.value, false);
  assert.ok(tree.children![1].loading);
});

test('an errored leaf evaluates false and carries the error up', () => {
  const { ast, states } = setup('{{ a or b }}');
  setValue(states, 'a', 'true');
  states.set(
    collectLeaves(ast).find((l) => l.source === 'b')!,
    { loading: false, error: 'boom' }
  );
  const tree = buildEvaluated(ast, states);
  assert.equal(tree.children![1].error, 'boom');
  // OR with a true branch is still true; the error leaf itself is false
  assert.equal(tree.children![1].value, false);
});

test('nested AND/OR/NOT recompute correctly', () => {
  const { ast, states } = setup('{{ (a and b) or not c }}');
  setValue(states, 'a', 'true');
  setValue(states, 'b', 'true');
  setValue(states, 'c', 'false'); // not c => true
  assert.equal(buildEvaluated(ast, states).value, true);

  setValue(states, 'c', 'true'); // not c => false; a and b => true
  assert.equal(buildEvaluated(ast, states).value, true);

  setValue(states, 'b', 'false'); // a and b => false; not c => false
  assert.equal(buildEvaluated(ast, states).value, false);
});
