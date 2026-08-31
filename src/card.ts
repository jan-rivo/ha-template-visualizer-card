// Main Lovelace card. Config:
//   type: custom:ha-template-visualizer-card
//   entity: sensor.my_template_helper   # a UI-created Template Helper entity
//   title: "My logic"                   # optional
//   icon: mdi:ab-testing                # optional; defaults to mdi:ab-testing
//   showCode: false                     # optional; when true show raw template code
//   showReferences: true                # optional; show referenced entities panel
//   showHeader: true                    # optional; show the header icon + title
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
import { fetchTemplateForEntity, saveTemplateForEntity } from './ha/template-source';
import { renderNode } from './components/logic-tree';
import { renderReferencesPanel } from './components/references-panel';
import { t } from './i18n';
import './editor';

export interface CardConfig {
  type: string;
  entity: string;
  title?: string;
  icon?: string;
  /** When true, show the raw template code for leaf conditions instead of humanized text. */
  showCode?: boolean;
  /** Show the referenced entities & attributes panel. Defaults to true. */
  showReferences?: boolean;
  /** Show the header icon + title. Defaults to true. */
  showHeader?: boolean;
}

export const DEFAULT_ICON = 'mdi:ab-testing';

@customElement('ha-template-visualizer-card')
export class HaTemplateEditorCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private config?: CardConfig;
  @state() private tree?: EvaluatedNode;
  @state() private references: ReferencedEntity[] = [];
  @state() private parseFallback = false;
  @state() private globalError?: string;
  @state() private templateText?: string;
  @state() private editing = false;
  @state() private draft = '';
  @state() private saving = false;
  @state() private saveError?: string;

  /** Live WS subscriptions for the currently-configured entity's template (no polling: everything here is push-driven). */
  private liveHandle?: LiveTreeHandle;
  private subscribedEntity?: string;
  private setupGeneration = 0;
  private draftTimer?: number;

  /** Whether the logged-in user can actually edit config entries (admins). Saving uses the same options flow as Settings, which is admin-only. */
  private get canEdit(): boolean {
    return this.hass?.user?.is_admin === true;
  }

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
    const generation = this.beginSetup();

    try {
      const template = await fetchTemplateForEntity(this.hass, entityId);
      if (generation !== this.setupGeneration) return; // superseded by a newer entity selection

      this.templateText = template;
      if (!this.editing) this.draft = template;
      await this.setupFromTemplate(template, generation);
    } catch (err) {
      if (generation !== this.setupGeneration) return;
      this.globalError = err instanceof Error ? err.message : String(err);
    }
  }

  /** Tears down the previous live tree and returns a fresh setup generation id. */
  private beginSetup(): number {
    const generation = ++this.setupGeneration;
    const previousHandle = this.liveHandle;
    this.liveHandle = undefined;
    this.tree = undefined;
    this.references = [];
    this.globalError = undefined;
    if (previousHandle) void previousHandle.dispose();
    return generation;
  }

  /** Runs the parse -> subscribe -> render pipeline against an arbitrary template string (live-synced or a draft). */
  private async setupFromTemplate(template: string, generation: number): Promise<void> {
    this.references = groupReferences(extractReferences(template));

    const { ast, fallback } = parseBooleanTemplate(template);
    this.parseFallback = fallback;
    const handle = await createLiveTree(this.hass, ast, (tree) => {
      if (generation !== this.setupGeneration) return; // superseded
      this.tree = tree;
    });
    if (generation !== this.setupGeneration) {
      // the template/entity changed again while subscriptions were being set up.
      void handle.dispose();
      return;
    }
    this.liveHandle = handle;
  }

  /** Live-editing: re-parse and re-subscribe to the user's draft, debounced to avoid churning WS subscriptions per keystroke. */
  private handleDraftChange(value: string): void {
    this.draft = value;
    window.clearTimeout(this.draftTimer);
    this.draftTimer = window.setTimeout(() => {
      this.editing = true;
      const generation = this.beginSetup();
      void this.setupFromTemplate(this.draft, generation);
    }, 400);
  }

  private startEditing(): void {
    this.editing = true;
    this.saveError = undefined;
    this.draft = this.templateText ?? '';
  }

  /** Discard draft edits and revert the view to the helper's live-synced template. */
  private discardChanges(): void {
    window.clearTimeout(this.draftTimer);
    this.editing = false;
    this.saveError = undefined;
    // Revert to the live-synced helper template.
    if (!this.templateText) return;
    this.draft = this.templateText;
    const generation = this.beginSetup();
    void this.setupFromTemplate(this.templateText, generation);
  }

  /** Persist the draft back to the helper via its options flow, then reload from the saved value. */
  private async saveDraft(): Promise<void> {
    if (!this.config || !this.hass || !this.editing || !this.canEdit) return;
    window.clearTimeout(this.draftTimer);
    this.saving = true;
    this.saveError = undefined;
    try {
      await saveTemplateForEntity(this.hass, this.config.entity, this.draft);
      this.saving = false;
      this.editing = false;
      this.draft = this.draft; // keep the just-saved text as the new baseline
      this.templateText = this.draft;
      const generation = this.beginSetup();
      await this.setupFromTemplate(this.draft, generation);
    } catch (err) {
      this.saving = false;
      this.saveError = err instanceof Error ? err.message : String(err);
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
    const showHeader = this.config.showHeader !== false;
    const headerContent = showHeader
      ? html`
          <ha-icon icon=${this.config.icon ?? DEFAULT_ICON}></ha-icon>
          <span class="card-header__title">${title}</span>
        `
      : '';

    return html`
      <ha-card>
        ${showHeader || this.canEdit
          ? html`<div class="card-header">
              ${headerContent}
              ${this.canEdit
                ? html`<ha-icon-button
                    class="card-header__edit"
                    .label=${t(this.hass, 'card.edit_template')}
                    @click=${this.editing ? this.discardChanges : this.startEditing}
                  >
                    <ha-icon icon=${this.editing ? 'mdi:close' : 'mdi:code-tags'}></ha-icon>
                  </ha-icon-button>`
                : ''}
            </div>`
          : ''}
        <div class="card-content">
          ${this.globalError
            ? html`<div class="tpl-error">${this.globalError}</div>`
            : html`
                ${this.editing
                  ? html`
                      <div class="tpl-edit">
                        <div class="tpl-edit__hint">${t(this.hass, 'card.edit_hint')}</div>
                        <ha-code-editor
                          .value=${this.draft}
                          @value-changed=${(e: CustomEvent<{ value: string }>) =>
                            this.handleDraftChange(e.detail.value ?? '')}
                        ></ha-code-editor>
                        ${this.saveError
                          ? html`<div class="tpl-error">${this.saveError}</div>`
                          : ''}
                        <div class="tpl-edit__actions">
                          <ha-button .disabled=${this.saving} @click=${this.discardChanges}>
                            ${t(this.hass, 'card.discard_changes')}
                          </ha-button>
                          <ha-button
                            class="tpl-edit__save"
                            .disabled=${this.saving || this.draft.trim() === ''}
                            @click=${this.saveDraft}
                          >
                            ${this.saving
                              ? t(this.hass, 'card.saving_template')
                              : t(this.hass, 'card.save_template')}
                          </ha-button>
                        </div>
                      </div>
                    `
                  : ''}
                ${this.parseFallback
                  ? html`<div class="tpl-warning">${t(this.hass, 'card.parse_fallback_warning')}</div>`
                  : ''}
                ${this.tree
                  ? renderNode(this.tree, this.hass, this.config.showCode === true)
                  : html`<div>${t(this.hass, 'card.setting_up')}</div>`}
                ${this.config.showReferences !== false
                  ? html`<details class="tpl-refs-details">
                      <summary>${t(this.hass, 'card.references_summary')}</summary>
                      ${renderReferencesPanel(this.references, this.hass?.states ?? {}, this.hass)}
                    </details>`
                  : ''}
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
    .card-header ha-icon {
      --mdc-icon-size: 24px;
      color: var(--paper-item-icon-color, #44739e);
      flex: none;
    }
    .card-header__edit {
      margin-left: auto;
      --mdc-icon-button-size: 32px;
      color: var(--secondary-text-color);
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
    .tpl-node__label--code {
      font-family: var(--code-editor-font-family, monospace);
      font-size: 12px;
      white-space: pre-wrap;
      word-break: break-word;
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
    .tpl-node--output .tpl-node__label {
      font-weight: 400;
      color: var(--primary-text-color, #000);
    }
    .tpl-node__value-icon {
      flex: none;
      color: var(--secondary-text-color, #888);
    }
    .tpl-node__stmt {
      font-family: var(--code-editor-font-family, monospace);
      font-size: 12px;
      color: var(--secondary-text-color, #888);
    }
    .tpl-node__arrow {
      color: var(--secondary-text-color, #888);
      margin: 0 6px;
    }
    .tpl-node--empty {
      font-style: italic;
    }
    .tpl-branch {
      padding: 4px 0;
    }
    .tpl-branch__head {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }
    .tpl-branch__tag {
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tpl-branch__tag--true {
      color: var(--success-color, #4caf50);
    }
    .tpl-branch__tag--false {
      color: var(--error-color, #db4437);
    }
    .tpl-error {
      color: var(--error-color, #db4437);
    }
    .tpl-edit {
      margin: 12px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .tpl-edit__hint {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .tpl-edit__actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .tpl-edit__save {
      --mdc-theme-primary: var(--green-color, #4caf50);
    }
    ha-code-editor {
      width: 100%;
      min-height: 160px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
    }
    .tpl-warning {
      color: var(--warning-color, #ff9800);
      font-size: 12px;
      margin-bottom: 8px;
    }
    .tpl-refs-details {
      margin: 12px 0 0;
      font-size: 12px;
    }
    .tpl-refs-details summary {
      cursor: pointer;
      color: var(--secondary-text-color);
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
