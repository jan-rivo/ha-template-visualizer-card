// Main Lovelace card. Config:
//   type: custom:ha-template-editor-card
//   template: "{{ is_state('binary_sensor.door','on') and states('sensor.mode') == 'home' }}"
//   entity: sensor.my_template_sensor   # optional, just for comparing actual vs computed
//   title: "My logic"                   # optional
//
// Note: Home Assistant does not expose a template sensor's source Jinja via
// its state/entity registry - only the rendered value. So this card takes
// the template text directly in YAML (copy/paste from your template sensor
// definition). See README for the reasoning and future ideas (e.g. a backend
// component that could expose config-defined templates automatically).
import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { parseBooleanTemplate } from './parser/parser';
import { evaluateTree, type EvaluatedNode } from './tree/evaluate';
import type { HomeAssistant } from './ha/render';
import { renderNode } from './components/logic-tree';
import './editor';

export interface CardConfig {
  type: string;
  template: string;
  entity?: string;
  title?: string;
}

@customElement('ha-template-editor-card')
export class HaTemplateEditorCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant & {
    states: Record<string, { state: string }>;
  };

  @state() private config?: CardConfig;
  @state() private tree?: EvaluatedNode;
  @state() private loading = false;
  @state() private parseFallback = false;
  @state() private globalError?: string;

  private refreshTimer?: ReturnType<typeof setTimeout>;

  setConfig(config: CardConfig): void {
    if (!config?.template) {
      throw new Error('ha-template-editor-card: "template" is required in the card config.');
    }
    this.config = config;
  }

  static getConfigElement() {
    return document.createElement('ha-template-editor-card-editor');
  }

  static getStubConfig(): CardConfig {
    return {
      type: 'custom:ha-template-editor-card',
      template: "{{ is_state('binary_sensor.front_door', 'on') and states('sensor.mode') == 'home' }}",
    };
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('config') && this.config) {
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    if (!this.config || !this.hass) return;
    this.loading = true;
    this.globalError = undefined;
    try {
      const { ast, fallback } = parseBooleanTemplate(this.config.template);
      this.parseFallback = fallback;
      this.tree = await evaluateTree(this.hass, ast);
    } catch (err) {
      this.globalError = err instanceof Error ? err.message : String(err);
    } finally {
      this.loading = false;
    }
  }

  protected updated(changed: PropertyValues): void {
    // Cheap live-ish refresh: re-render every 10s while the card is visible.
    // (A future enhancement is to keep the render_template WS subscriptions
    // open and push updates instead of polling.)
    if (changed.has('hass') && !this.refreshTimer) {
      this.refreshTimer = setInterval(() => void this.refresh(), 10000);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }

  render() {
    if (!this.config) return html``;
    const title = this.config.title ?? 'Template logic';
    const actualState = this.config.entity ? this.hass?.states?.[this.config.entity]?.state : undefined;

    return html`
      <ha-card header=${title}>
        <div class="card-content">
          ${this.globalError
            ? html`<div class="tpl-error">${this.globalError}</div>`
            : html`
                ${this.parseFallback
                  ? html`<div class="tpl-warning">
                      Couldn't fully parse this template's boolean structure - showing it as a
                      single evaluated expression instead.
                    </div>`
                  : ''}
                ${this.config.entity
                  ? html`<div class="tpl-summary">
                      <span>Entity state:</span> <b>${actualState ?? 'unknown'}</b>
                    </div>`
                  : ''}
                ${this.tree ? renderNode(this.tree) : html`<div>Loading…</div>`}
                ${this.loading ? html`<div class="tpl-loading">Refreshing…</div>` : ''}
              `}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
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
    .tpl-node__op {
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
    }
    .tpl-node__source {
      background: var(--code-editor-background-color, rgba(127, 127, 127, 0.08));
      padding: 1px 6px;
      border-radius: 4px;
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
    .tpl-summary {
      margin-bottom: 8px;
      font-size: 13px;
    }
    .tpl-loading {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 8px;
    }
  `;
}
