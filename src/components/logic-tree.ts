// Recursive Lit template for rendering one EvaluatedNode and its children as
// an indented logic tree, coloring each node green (true) or red (false).
import { html, type TemplateResult } from 'lit';
import type { EvaluatedNode, EvaluatedBranch } from '../tree/evaluate';
import type { HomeAssistant } from '../ha/hass';
import { t } from '../i18n';
import { humanizeLeaf } from '../parser/humanize';

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

/** Whether a rendered OUTPUT string is a boolean literal (true/false), which
 *  should keep the check/cross badge rather than the value arrow. */
function isBooleanRendered(rendered: string): boolean {
  const v = rendered.trim().toLowerCase();
  return v === 'true' || v === 'false';
}

export function renderNode(
  evalNode: EvaluatedNode,
  hass?: HomeAssistant,
  showCode = false,
  depth = 0,
): TemplateResult {
  const { node, value, error, loading } = evalNode;
  const stateClass = loading
    ? 'tpl-node--loading'
    : error
      ? 'tpl-node--error'
      : value
        ? 'tpl-node--true'
        : 'tpl-node--false';

  if (node.kind === 'OUTPUT') {
    if (node.source === '') {
      return html`<div class="tpl-node tpl-node--empty" style="--depth: ${depth}">
        <span class="tpl-node__meta">${t(hass, 'tree.empty_output')}</span>
      </div>`;
    }
    const rendered = evalNode.rendered;
    const isBool = rendered !== undefined && isBooleanRendered(rendered);
    return html`<div class="tpl-node ${stateClass} tpl-node--output" style="--depth: ${depth}">
      ${loading
        ? html`<span class="tpl-node__badge">…</span>`
        : error
          ? html`<span class="tpl-node__badge">!</span>`
          : isBool
            ? html`<span class="tpl-node__badge">${value ? '✓' : '✗'}</span>`
            : html`<ha-icon class="tpl-node__value-icon" icon="mdi:triangle-outline"></ha-icon>`}
      <span class="tpl-node__label tpl-node__label--output">
        ${loading ? t(hass, 'tree.loading') : error ? error : isBool ? rendered : html`→ ${rendered}`}
      </span>
    </div>`;
  }

  if (node.kind === 'LEAF') {
    const humanized = humanizeLeaf(node.source, hass);
    const label = showCode ? node.source : humanized ?? node.source;
    return html`
      <div class="tpl-node ${stateClass}" style="--depth: ${depth}">
        <span class="tpl-node__badge">${loading ? '…' : error ? '!' : value ? '✓' : '✗'}</span>
        <span class="tpl-node__label${showCode ? ' tpl-node__label--code' : ''}">${label}</span>
        ${loading
          ? html`<span class="tpl-node__meta">${t(hass, 'tree.loading')}</span>`
          : error
            ? html`<span class="tpl-node__meta tpl-node__meta--error">${error}</span>`
            : ''}
      </div>
    `;
  }

  if (node.kind === 'CONDITIONAL') {
    const branches = evalNode.branches ?? [];
    return html`
      <div class="tpl-children">
        ${branches.map((branch, index) => renderBranch(branch, index, hass, showCode, depth + 1))}
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
      ${children.map((c) => renderNode(c, hass, showCode, depth + 1))}
    </div>
  `;
}

/** Renders one branch of a CONDITIONAL: its if/else-if/else tag with a truthy
 *  checkmark (✓ when this branch fires, ✗ otherwise), its condition tree
 *  (humanized per the showCode toggle), and its output text. */
function renderBranch(
  branch: EvaluatedBranch,
  index: number,
  hass?: HomeAssistant,
  showCode = false,
  depth = 0,
): TemplateResult {
  const isElse = branch.condition === undefined;
  const tag = isElse ? t(hass, 'tree.else') : index === 0 ? t(hass, 'tree.if') : t(hass, 'tree.else_if');
  const fired = branch.fired;
  return html`
    <div class="tpl-branch${fired ? ' tpl-branch--fired' : ''}" style="--depth: ${depth}">
      <div class="tpl-branch__head">
        <span class="tpl-branch__tag tpl-branch__tag--${fired ? 'true' : 'false'}">
          ${fired ? '✓' : '✗'} ${tag}
        </span>
      </div>
      ${branch.condition ? renderNode(branch.condition, hass, showCode, depth) : ''}
      ${renderNode(branch.body, hass, showCode, depth)}
    </div>
  `;
}
