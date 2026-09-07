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

@customElement('ha-template-visualizer-card-editor')
export class HaTemplateEditorCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: CardConfig;
  @state() private templateEntityIds?: Set<string>;

  setConfig(config: CardConfig): void {
    this.config = config;
  }

  /** Mirrors the card's visibility resolution so legacy `showReferences` configs still toggle correctly. */
  private get showStateValues(): boolean {
    return this.config?.showStateValues ?? this.config?.showReferences ?? true;
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
        <ha-input
          .label=${t(this.hass, 'editor.title_label')}
          .value=${this.config.title ?? ''}
          @input=${(e: Event) => this.emit({ title: (e.target as HTMLInputElement).value })}
        ></ha-input>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity ?? ''}
          .label=${t(this.hass, 'editor.entity_label')}
          .entityFilter=${this.entityFilter}
          @value-changed=${(e: CustomEvent<{ value: string }>) => this.emit({ entity: e.detail.value })}
        ></ha-entity-picker>
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this.config.icon ?? ''}
          .label=${t(this.hass, 'editor.icon_label')}
          @value-changed=${(e: CustomEvent<{ value: string }>) => this.emit({ icon: e.detail.value || undefined })}
        ></ha-icon-picker>
        <ha-switch
          .checked=${this.config.showCode !== true}
          @change=${(e: Event) => this.emit({ showCode: !(e.target as HTMLInputElement).checked })}
        >${t(this.hass, 'editor.humanize_label')}</ha-switch>
        <ha-switch
          .checked=${this.showStateValues}
          @change=${(e: Event) =>
            this.emit({ showStateValues: (e.target as HTMLInputElement).checked })}
        >${t(this.hass, 'editor.show_state_values_label')}</ha-switch>
        <ha-switch
          .checked=${this.config.showHeader !== false}
          @change=${(e: Event) => this.emit({ showHeader: (e.target as HTMLInputElement).checked })}
        >${t(this.hass, 'editor.show_header_label')}</ha-switch>
        <ha-switch
          .checked=${this.config.showEditButton !== false}
          @change=${(e: Event) =>
            this.emit({ showEditButton: (e.target as HTMLInputElement).checked })}
        >${t(this.hass, 'editor.show_edit_button_label')}</ha-switch>
        <ha-alert alert-type="info">${t(this.hass, 'editor.hint')}</ha-alert>
      </div>
    `;
  }

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: var(--ha-space-3, 12px);
      padding: 8px 0;
    }
    ha-alert {
      margin-top: var(--ha-space-1, 4px);
    }
  `;
}
