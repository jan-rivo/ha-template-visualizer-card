// Recursive Lit template for rendering one EvaluatedNode and its children as
// an indented logic tree, coloring each node green (true) or red (false).
import { html, nothing, type TemplateResult } from 'lit';
import type { EvaluatedNode } from '../tree/evaluate';

function kindLabel(kind: string): string {
  switch (kind) {
    case 'AND':
      return 'AND';
    case 'OR':
      return 'OR';
    case 'NOT':
      return 'NOT';
    default:
      return '';
  }
}

export function renderNode(evalNode: EvaluatedNode, depth = 0): TemplateResult {
  const { node, value, rendered, error, loading } = evalNode;
  const stateClass = loading
    ? 'tpl-node--loading'
    : error
      ? 'tpl-node--error'
      : value
        ? 'tpl-node--true'
        : 'tpl-node--false';

  if (node.kind === 'LEAF') {
    return html`
      <div class="tpl-node ${stateClass}" style="--depth: ${depth}">
        <span class="tpl-node__badge">${loading ? '…' : error ? '!' : value ? '✓' : '✗'}</span>
        <code class="tpl-node__source">${node.source}</code>
        ${loading
          ? html`<span class="tpl-node__meta">loading…</span>`
          : error
            ? html`<span class="tpl-node__meta tpl-node__meta--error">${error}</span>`
            : html`<span class="tpl-node__meta">→ ${rendered}</span>`}
      </div>
    `;
  }

  const children = evalNode.children ?? [];
  return html`
    <div class="tpl-node ${stateClass} tpl-node--group" style="--depth: ${depth}">
      <span class="tpl-node__badge">${value ? '✓' : '✗'}</span>
      <span class="tpl-node__op">${kindLabel(node.kind)}</span>
    </div>
    <div class="tpl-children">
      ${children.map((c) => renderNode(c, depth + 1))}
    </div>
  `;
}

export const nothingTemplate = nothing;
