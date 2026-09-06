// Builds a *live* evaluated tree: every LEAF / OUTPUT node subscribes to its
// rendered value via HA's render_template WS subscription (push-based, no
// polling) and every time any of them updates, the whole tree is cheaply
// recomputed bottom-up in JS and handed to `onUpdate`.
import type { AstNode } from '../parser/types';
import {
  isTruthy,
  subscribeLiveExpression,
  subscribeTemplate,
  type HomeAssistant,
  type Unsubscribe,
} from '../ha/render';

export interface EvaluatedNode {
  node: AstNode;
  value: boolean;
  /** True while waiting for this unit's first render_template push. */
  loading?: boolean;
  /** Raw rendered string, present for LEAF (boolean text) and OUTPUT (branch body) nodes. */
  rendered?: string;
  error?: string;
  children?: EvaluatedNode[];
  branches?: EvaluatedBranch[];
}

export interface EvaluatedBranch {
  /** Evaluated condition subtree; undefined for the `else` branch. */
  condition?: EvaluatedNode;
  /** Evaluated branch body (OUTPUT text or a nested conditional). */
  body: EvaluatedNode;
  /** Whether this is the branch whose body HA would currently output. */
  fired: boolean;
}

export interface LiveTreeHandle {
  /** Unsubscribes every leaf/body's WS subscription. Always call on teardown. */
  dispose: () => Promise<void>;
}

export interface LeafState {
  loading: boolean;
  rendered?: string;
  error?: string;
}

/** LeafState for a unit that has not yet received its first render push. */
export function loadingLeafState(): LeafState {
  return { loading: true };
}

/** Collects every renderable node (LEAF and OUTPUT) in the AST, in document order. */
export function collectLeaves(node: AstNode, out: AstNode[] = []): AstNode[] {
  if (node.kind === 'LEAF' || node.kind === 'OUTPUT') {
    out.push(node);
    return out;
  }
  if (node.kind === 'CONDITIONAL') {
    for (const branch of node.branches ?? []) {
      if (branch.condition) collectLeaves(branch.condition, out);
      collectLeaves(branch.body, out);
    }
    return out;
  }
  for (const child of node.children ?? []) collectLeaves(child, out);
  return out;
}

/**
 * Recomputes the whole tree bottom-up from the given per-unit states.
 * Pure (no side effects, no HA dependency), so it is straightforward to
 * unit test in isolation. Handles loading / error states on each unit: a
 * unit that is still loading or errored evaluates to false and the flag is
 * carried up on that node. For CONDITIONAL, marks exactly one branch as
 * `fired` (the first true condition, or the else branch when none match).
 */
export function buildEvaluated(node: AstNode, leafState: Map<AstNode, LeafState>): EvaluatedNode {
  if (node.kind === 'LEAF' || node.kind === 'OUTPUT') {
    const st = leafState.get(node) ?? loadingLeafState();
    if (st.loading) return { node, value: false, loading: true };
    if (st.error !== undefined) return { node, value: false, error: st.error };
    return { node, value: isTruthy(st.rendered ?? ''), rendered: st.rendered };
  }

  if (node.kind === 'CONDITIONAL') {
    let anyFired = false;
    const branches = (node.branches ?? []).map((branch) => {
      const condition = branch.condition ? buildEvaluated(branch.condition, leafState) : undefined;
      const body = buildEvaluated(branch.body, leafState);
      let fired = false;
      if (condition) {
        fired = !anyFired && condition.value;
      } else {
        fired = !anyFired; // else branch fires iff nothing earlier fired
      }
      if (fired) anyFired = true;
      return { condition, body, fired };
    });
    return { node, value: anyFired, branches };
  }

  const children = (node.children ?? []).map((c) => buildEvaluated(c, leafState));
  let value: boolean;
  if (node.kind === 'AND') value = children.every((c) => c.value);
  else if (node.kind === 'OR') value = children.some((c) => c.value);
  else value = !children[0].value; // NOT

  return { node, value, children };
}

/**
 * Sets up live subscriptions for every renderable node (boolean leaves plus
 * conditional-branch bodies) in the AST and calls `onUpdate` with a freshly
 * recomputed tree every time any of them changes (including once
 * synchronously up front, with everything marked loading).
 */
export async function createLiveTree(
  hass: HomeAssistant,
  root: AstNode,
  onUpdate: (tree: EvaluatedNode) => void
): Promise<LiveTreeHandle> {
  const units: AstNode[] = [];
  collectLeaves(root, units);

  const state = new Map<AstNode, LeafState>();
  for (const unit of units) state.set(unit, loadingLeafState());

  const emit = () => onUpdate(buildEvaluated(root, state));
  emit(); // initial "everything loading" frame

  const unsubscribers: Unsubscribe[] = [];
  await Promise.all(
    units.map(async (unit) => {
      const onValue = (rendered: string) => {
        state.set(unit, { loading: false, rendered });
        emit();
      };
      const onError = (error: Error) => {
        state.set(unit, { loading: false, error: error.message });
        emit();
      };
      let unsub: Unsubscribe;
      if (unit.kind === 'LEAF') {
        unsub = await subscribeLiveExpression(hass, unit.source, onValue, onError, unit.preamble);
      } else {
        // OUTPUT: render the branch body text live.
        unsub = await subscribeTemplate(hass, unit.source, onValue, onError, unit.preamble);
      }
      unsubscribers.push(unsub);
    })
  );

  return {
    dispose: async () => {
      await Promise.all(unsubscribers.map((u) => u().catch(() => undefined)));
    },
  };
}
