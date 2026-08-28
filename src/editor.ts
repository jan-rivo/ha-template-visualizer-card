// Minimal visual config editor so the card can be added/edited from the
// Lovelace UI (Settings > Dashboards > Edit Card) instead of only via YAML.
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CardConfig } from './card';

@customElement('ha-template-editor-card-editor')
export class HaTemplateEditorCardEditor extends LitElement {
  @property({ attribute: false }) hass?: unknown;
  @state() private config?: CardConfig;

  setConfig(config: CardConfig): void {
    this.config = config;
  }

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
          Title (optional)
          <input
            type="text"
            .value=${this.config.title ?? ''}
            @change=${(e: Event) => this.emit({ title: (e.target as HTMLInputElement).value })}
          />
        </label>
        <label>
          Entity to compare against (optional)
          <input
            type="text"
            placeholder="sensor.my_template_sensor"
            .value=${this.config.entity ?? ''}
            @change=${(e: Event) => this.emit({ entity: (e.target as HTMLInputElement).value })}
          />
        </label>
        <label>
          Template (paste the value_template Jinja here)
          <textarea
            rows="4"
            .value=${this.config.template ?? ''}
            @change=${(e: Event) => this.emit({ template: (e.target as HTMLTextAreaElement).value })}
          ></textarea>
        </label>
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
    input,
    textarea {
      font-family: monospace;
      font-size: 13px;
      padding: 6px;
    }
  `;
}
