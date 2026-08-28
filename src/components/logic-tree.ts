// Recursive Lit template for rendering one EvaluatedNode and its children as
// an indented logic tree, coloring each node green (true) or red (false).
import { html, nothing, type TemplateResult } from 'lit';
import type { EvaluatedNode } from '../tree/evaluate';
import type { HomeAssistant } from '../ha/hass';
import { t } from '../i18n';

function kindLabel(kind: string, hass: HomeAssistant | undefined): string {
  switch (kind) {
    case 'AND':
      return t(hass, 'tree.and');
    case 'OR':
      return t(hass, 'tree.or');
    case 'NOT':
      return t(hass, 'tree.not');
    default:
      return '';
  }
}

export function renderNode(evalNode: EvaluatedNode, hass?: HomeAssistant, depth = 0): TemplateResult {
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
          ? html`<span class="tpl-node__meta">${t(hass, 'tree.loading')}</span>`
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
      <span class="tpl-node__op">${kindLabel(node.kind, hass)}</span>
    </div>
    <div class="tpl-children">
      ${children.map((c) => renderNode(c, hass, depth + 1))}
    </div>
  `;
}

export const nothingTemplate = nothing;
