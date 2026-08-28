// Renders the "Referenced entities & attributes" panel: a flat, deduped
// list of every entity (and entity+attribute pair) the template touches via
// states()/is_state()/state_attr()/is_state_attr(), with each one's current
// live value pulled straight from hass.states.
import { html, type TemplateResult } from 'lit';
import type { ReferencedEntity } from '../parser/references';
import type { HomeAssistant } from '../ha/hass';

export type HassStates = HomeAssistant['states'];

function formatValue(value: unknown): string {
  if (value === undefined) return '—';
  if (value === null) return 'null';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function renderReferencesPanel(entities: ReferencedEntity[], states: HassStates): TemplateResult {
  if (entities.length === 0) {
    return html`<div class="tpl-refs-empty">No states()/is_state()/state_attr() references found.</div>`;
  }

  return html`
    <table class="tpl-refs">
      <thead>
        <tr>
          <th>Entity</th>
          <th>Current value</th>
        </tr>
      </thead>
      <tbody>
        ${entities.map((entry) => {
          const stateObj = states[entry.entityId];
          const missing = stateObj === undefined;
          const value = entry.attribute ? stateObj?.attributes?.[entry.attribute] : stateObj?.state;
          const label = entry.attribute ? `${entry.entityId}.${entry.attribute}` : entry.entityId;
          return html`
            <tr class=${missing ? 'tpl-refs__row--missing' : ''}>
              <td><code>${label}</code></td>
              <td>${missing ? 'entity not found' : formatValue(value)}</td>
            </tr>
          `;
        })}
      </tbody>
    </table>
  `;
}
