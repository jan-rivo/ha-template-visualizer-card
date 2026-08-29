// Main Lovelace card. Config:
//   type: custom:ha-template-visualizer-card
//   entity: sensor.my_template_helper   # a UI-created Template Helper entity
//   title: "My logic"                   # optional
//   icon: mdi:flash                     # optional; defaults to an automatic on/off icon
//
// This card only supports entities created via Settings > Devices &
// Services > Helpers > Template. It reads the helper's actual template text
// directly from its config entry (see src/ha/template-source.ts), so the
// visualization always reflects the real, current definition - never a
// manually pasted copy that can drift out of sync.
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { parseBooleanTemplate } from './parser/parser';
import { extractReferences, groupReferences, type ReferencedEntity } from './parser/references';
import { createLiveTree, type EvaluatedNode, type LiveTreeHandle } from './tree/evaluate';
import type { HomeAssistant } from './ha/hass';
import { fetchTemplateForEntity } from './ha/template-source';
import { renderNode } from './components/logic-tree';
import { renderReferencesPanel } from './components/references-panel';
import { t } from './i18n';
import './editor';

export interface CardConfig {
  type: string;
  entity: string;
  title?: string;
  icon?: string;
}

@customElement('ha-template-visualizer-card')
export class HaTemplateEditorCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private config?: CardConfig;
  @state() private tree?: EvaluatedNode;
  @state() private references: ReferencedEntity[] = [];
  @state() private parseFallback = false;
  @state() private globalError?: string;
  @state() private templateText?: string;

  /** Live WS subscriptions for the currently-configured entity's template (no polling: everything here is push-driven). */
  private liveHandle?: LiveTreeHandle;
  private subscribedEntity?: string;
  private setupGeneration = 0;

  setConfig(config: CardConfig): void {
    if (!config?.entity) {
      throw new Error('ha-template-visualizer-card: "entity" is required in the card config.');
    }
    this.config = config;
  }

  static getConfigElement() {
    return document.createElement('ha-template-visualizer-card-editor');
  }

  static getStubConfig(): CardConfig {
    return {
      type: 'custom:ha-template-visualizer-card',
      entity: 'binary_sensor.example_template_helper',
    };
  }

  protected willUpdate(): void {
    if (this.config && this.hass && this.config.entity !== this.subscribedEntity) {
      void this.setupLiveTree();
    }
  }

  private async setupLiveTree(): Promise<void> {
    if (!this.config || !this.hass) return;
    const entityId = this.config.entity;
    this.subscribedEntity = entityId;
    const generation = ++this.setupGeneration;

    const previousHandle = this.liveHandle;
    this.liveHandle = undefined;
    this.tree = undefined;
    this.references = [];
    this.templateText = undefined;
    this.globalError = undefined;
    if (previousHandle) void previousHandle.dispose();

    try {
      const template = await fetchTemplateForEntity(this.hass, entityId);
      if (generation !== this.setupGeneration) return; // superseded by a newer entity selection

      this.templateText = template;
      this.references = groupReferences(extractReferences(template));

      const { ast, fallback } = parseBooleanTemplate(template);
      this.parseFallback = fallback;
      const handle = await createLiveTree(this.hass, ast, (tree) => {
        if (generation !== this.setupGeneration) return; // superseded by a newer entity selection
        this.tree = tree;
      });
      if (generation !== this.setupGeneration) {
        // Entity changed again while subscriptions were being set up.
        void handle.dispose();
        return;
      }
      this.liveHandle = handle;
    } catch (err) {
      if (generation !== this.setupGeneration) return;
      this.globalError = err instanceof Error ? err.message : String(err);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.setupGeneration++; // invalidates any in-flight setupLiveTree call
    void this.liveHandle?.dispose();
    this.liveHandle = undefined;
  }

  render() {
    if (!this.config) return html``;
    const title = this.config.title ?? t(this.hass, 'card.default_title');
    const stateObj = this.hass?.states?.[this.config.entity];

    return html`
      <ha-card>
        <div class="card-header">
          ${this.config.icon
            ? html`<ha-icon icon=${this.config.icon}></ha-icon>`
            : html`<ha-state-icon .hass=${this.hass} .stateObj=${stateObj}></ha-state-icon>`}
          <span class="card-header__title">${title}</span>
        </div>
        <div class="card-content">
          ${this.globalError
            ? html`<div class="tpl-error">${this.globalError}</div>`
            : html`
                ${this.parseFallback
                  ? html`<div class="tpl-warning">${t(this.hass, 'card.parse_fallback_warning')}</div>`
                  : ''}
                ${this.tree
                  ? renderNode(this.tree, this.hass)
                  : html`<div>${t(this.hass, 'card.setting_up')}</div>`}
                ${this.templateText
                  ? html`<details class="tpl-source">
                      <summary>
                        ${t(this.hass, 'card.template_source_summary', { entity: this.config.entity })}
                      </summary>
                      <pre>${this.templateText}</pre>
                    </details>`
                  : ''}
                <details class="tpl-refs-details">
                  <summary>${t(this.hass, 'card.references_summary')}</summary>
                  ${renderReferencesPanel(this.references, this.hass?.states ?? {}, this.hass)}
                </details>
              `}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 0;
      font-size: 1.2em;
      font-weight: 400;
      color: var(--ha-card-header-color, var(--primary-text-color));
    }
    .card-header ha-icon,
    .card-header ha-state-icon {
      --mdc-icon-size: 24px;
      color: var(--paper-item-icon-color, #44739e);
      flex: none;
    }
    .card-content {
      padding: 8px 16px 16px;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .tpl-node {
      display: flex;
      align-items: baseline;
      gap: 8px;
      padding: 4px 0 4px calc(var(--depth, 0) * 18px);
      font-size: 13px;
      line-height: 1.4;
    }
    .tpl-node__badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 11px;
      font-weight: bold;
      flex: none;
    }
    .tpl-node--true .tpl-node__badge {
      background: var(--success-color, #4caf50);
      color: white;
    }
    .tpl-node--false .tpl-node__badge {
      background: var(--error-color, #db4437);
      color: white;
    }
    .tpl-node--error .tpl-node__badge {
      background: var(--warning-color, #ff9800);
      color: white;
    }
    .tpl-node--loading .tpl-node__badge {
      background: var(--disabled-text-color, #9e9e9e);
      color: white;
    }
    .tpl-node__op {
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
    }
    .tpl-node__label {
      font-weight: 500;
    }
    .tpl-node__source {
      background: var(--code-editor-background-color, rgba(127, 127, 127, 0.08));
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 12px;
    }
    .tpl-node__meta {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .tpl-node__meta--error {
      color: var(--error-color, #db4437);
    }
    .tpl-children {
      border-left: 1px dashed var(--divider-color, #ccc);
      margin-left: 8px;
    }
    .tpl-error {
      color: var(--error-color, #db4437);
    }
    .tpl-warning {
      color: var(--warning-color, #ff9800);
      font-size: 12px;
      margin-bottom: 8px;
    }
    .tpl-source,
    .tpl-refs-details {
      margin: 12px 0 0;
      font-size: 12px;
    }
    .tpl-refs-details summary,
    .tpl-source summary {
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .tpl-source pre {
      white-space: pre-wrap;
      background: var(--code-editor-background-color, rgba(127, 127, 127, 0.08));
      padding: 8px;
      border-radius: 4px;
      margin: 6px 0 0;
    }
    .tpl-loading {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
    .tpl-refs {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .tpl-refs th {
      text-align: left;
      font-weight: 600;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color, #ccc);
      padding: 4px 8px 4px 0;
    }
    .tpl-refs td {
      padding: 4px 8px 4px 0;
      border-bottom: 1px solid var(--divider-color, rgba(127, 127, 127, 0.15));
      vertical-align: top;
    }
    .tpl-refs__row--missing td {
      color: var(--error-color, #db4437);
    }
    .tpl-refs-empty {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
  `;
}
