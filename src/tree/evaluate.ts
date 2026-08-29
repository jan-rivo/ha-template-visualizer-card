// Builds a *live* evaluated tree: every LEAF subscribes to its expression's
// rendered value via HA's render_template WS subscription (push-based, no
// polling) and every time any leaf updates, the whole tree is cheaply
// recomputed bottom-up in JS and handed to `onUpdate`.
import type { AstNode } from '../parser/types';
import { isTruthy, subscribeLiveExpression, type HomeAssistant, type Unsubscribe } from '../ha/render';

export interface EvaluatedNode {
  node: AstNode;
  value: boolean;
  /** True while waiting for this leaf's first render_template push. */
  loading?: boolean;
  /** Raw rendered string, only present for LEAF nodes. */
  rendered?: string;
  error?: string;
  children?: EvaluatedNode[];
}

export interface LiveTreeHandle {
  /** Unsubscribes every leaf's WS subscription. Always call on teardown. */
  dispose: () => Promise<void>;
}

export interface LeafState {
  loading: boolean;
  rendered?: string;
  error?: string;
}

/** LeafState for a leaf that has not yet received its first render push. */
export function loadingLeafState(): LeafState {
  return { loading: true };
}

/** Collects every LEAF node in the AST, in document order. */
export function collectLeaves(node: AstNode, out: AstNode[] = []): AstNode[] {
  if (node.kind === 'LEAF') {
    out.push(node);
    return out;
  }
  for (const child of node.children ?? []) collectLeaves(child, out);
  return out;
}

/**
 * Recomputes the whole tree bottom-up from the given per-leaf states.
 * Pure (no side effects, no HA dependency), so it is straightforward to
 * unit test in isolation. Handles loading / error states on each leaf:
 * a leaf that is still loading or errored evaluates to false and the flag
 * is carried up on that node.
 */
export function buildEvaluated(node: AstNode, leafState: Map<AstNode, LeafState>): EvaluatedNode {
  if (node.kind === 'LEAF') {
    const st = leafState.get(node)!;
    if (st.loading) return { node, value: false, loading: true };
    if (st.error !== undefined) return { node, value: false, error: st.error };
    return { node, value: isTruthy(st.rendered ?? ''), rendered: st.rendered };
  }

  const children = (node.children ?? []).map((c) => buildEvaluated(c, leafState));
  let value: boolean;
  if (node.kind === 'AND') value = children.every((c) => c.value);
  else if (node.kind === 'OR') value = children.some((c) => c.value);
  else value = !children[0].value; // NOT

  return { node, value, children };
}

/**
 * Sets up live subscriptions for every leaf in the AST and calls `onUpdate`
 * with a freshly recomputed tree every time any leaf's value changes
 * (including once synchronously up front, with every leaf marked loading).
 */
export async function createLiveTree(
  hass: HomeAssistant,
  root: AstNode,
  onUpdate: (tree: EvaluatedNode) => void
): Promise<LiveTreeHandle> {
  const leaves: AstNode[] = [];
  collectLeaves(root, leaves);

  const leafState = new Map<AstNode, LeafState>();
  for (const leaf of leaves) leafState.set(leaf, loadingLeafState());

  const emit = () => onUpdate(buildEvaluated(root, leafState));
  emit(); // initial "everything loading" frame

  const unsubscribers: Unsubscribe[] = [];
  await Promise.all(
    leaves.map(async (leaf) => {
      const unsub = await subscribeLiveExpression(
        hass,
        leaf.source,
        (rendered) => {
          leafState.set(leaf, { loading: false, rendered });
          emit();
        },
        (error) => {
          leafState.set(leaf, { loading: false, error: error.message });
          emit();
        }
      );
      unsubscribers.push(unsub);
    })
  );

  return {
    dispose: async () => {
      await Promise.all(unsubscribers.map((u) => u().catch(() => undefined)));
    },
  };
}
