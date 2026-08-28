// Walks an AST, renders every LEAF's live value via Home Assistant, and
// evaluates AND/OR/NOT nodes bottom-up so every node in the tree ends up
// with a boolean result plus (for leaves) the raw rendered text.
import type { AstNode } from '../parser/types';
import { isTruthy, renderExpression, type HomeAssistant } from '../ha/render';

export interface EvaluatedNode {
  node: AstNode;
  value: boolean;
  /** Raw rendered string, only present for LEAF nodes. */
  rendered?: string;
  error?: string;
  children?: EvaluatedNode[];
}

export async function evaluateTree(hass: HomeAssistant, node: AstNode): Promise<EvaluatedNode> {
  if (node.kind === 'LEAF') {
    try {
      const rendered = await renderExpression(hass, node.source);
      return { node, value: isTruthy(rendered), rendered };
    } catch (err) {
      return {
        node,
        value: false,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  const children = await Promise.all((node.children ?? []).map((c) => evaluateTree(hass, c)));

  let value: boolean;
  if (node.kind === 'AND') value = children.every((c) => c.value);
  else if (node.kind === 'OR') value = children.some((c) => c.value);
  else value = !children[0].value; // NOT

  return { node, value, children };
}
