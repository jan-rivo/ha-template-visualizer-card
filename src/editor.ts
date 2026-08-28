// Minimal visual config editor so the card can be added/edited from the
// Lovelace UI (Settings > Dashboards > Edit Card) instead of only via YAML.
// Uses HA's own <ha-entity-picker> custom element (already globally
// registered by the frontend) for native autocomplete, filtered down to
// entities backed by the "template" platform (UI-created Template Helpers)
// since that's all this card supports.
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CardConfig } from './card';
import type { HomeAssistant } from './ha/hass';
import { fetchEntityRegistry } from './ha/entity-registry';
import { t } from './i18n';

interface EntityPickerStateObj {
  entity_id: string;
}

@customElement('ha-template-editor-card-editor')
export class HaTemplateEditorCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: CardConfig;
  @state() private templateEntityIds?: Set<string>;

  setConfig(config: CardConfig): void {
    this.config = config;
  }

  protected willUpdate(): void {
    if (this.hass && !this.templateEntityIds) {
      void this.loadTemplateEntities();
    }
  }

  private async loadTemplateEntities(): Promise<void> {
    if (!this.hass) return;
    this.templateEntityIds = new Set(); // avoid re-triggering while the request is in flight
    try {
      const entries = await fetchEntityRegistry(this.hass);
      this.templateEntityIds = new Set(entries.filter((e) => e.platform === 'template').map((e) => e.entity_id));
    } catch {
      this.templateEntityIds = new Set();
    }
  }

  private entityFilter = (stateObj: EntityPickerStateObj): boolean =>
    !this.templateEntityIds || this.templateEntityIds.size === 0 || this.templateEntityIds.has(stateObj.entity_id);

  private emit(partial: Partial<CardConfig>): void {
    if (!this.config) return;
    const next = { ...this.config, ...partial };
    this.config = next;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: next } }));
  }

  render() {
    if (!this.config) return html``;
    return html`
      <div class="form">
        <label>
          ${t(this.hass, 'editor.title_label')}
          <input
            type="text"
            .value=${this.config.title ?? ''}
            @change=${(e: Event) => this.emit({ title: (e.target as HTMLInputElement).value })}
          />
        </label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity ?? ''}
          .label=${t(this.hass, 'editor.entity_label')}
          .entityFilter=${this.entityFilter}
          @value-changed=${(e: CustomEvent<{ value: string }>) => this.emit({ entity: e.detail.value })}
        ></ha-entity-picker>
        <p class="tpl-hint">${t(this.hass, 'editor.hint')}</p>
      </div>
    `;
  }

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
    }
    input {
      font-family: monospace;
      font-size: 13px;
      padding: 6px;
    }
    .tpl-hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 0;
    }
  `;
}
