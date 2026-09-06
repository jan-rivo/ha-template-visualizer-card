// Renders the "State values" panel: a flat, deduped list of every entity
// (and entity+attribute pair) the template touches via
// states()/is_state()/state_attr()/is_state_attr(), styled like HA entity
// rows - state icon in state color, friendly name primary, entity id
// secondary, live value right-aligned straight from hass.states.
import { html, type TemplateResult } from 'lit';
import type { ReferencedEntity } from '../parser/references';
import type { HomeAssistant } from '../ha/hass';
import { t } from '../i18n';

export type HassStates = HomeAssistant['states'];

function formatValue(value: unknown): string {
  if (value === undefined) return '—';
  if (value === null) return 'null';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function renderReferencesPanel(
  entities: ReferencedEntity[],
  states: HassStates,
  hass?: HomeAssistant,
): TemplateResult {
  if (entities.length === 0) {
    return html`<div class="tpl-refs-empty">${t(hass, 'references.empty')}</div>`;
  }

  return html`
    <table class="tpl-refs">
      <thead>
        <tr>
          <th>${t(hass, 'references.entity_column')}</th>
          <th class="tpl-refs__value">${t(hass, 'references.value_column')}</th>
        </tr>
      </thead>
      <tbody>
        ${entities.map((entry) => {
          const stateObj = states[entry.entityId];
          const missing = stateObj === undefined;
          const rawValue = entry.attribute
            ? stateObj?.attributes?.[entry.attribute]
            : stateObj?.state;
          const friendly =
            !missing && typeof stateObj.attributes?.friendly_name === 'string'
              ? stateObj.attributes.friendly_name
              : entry.entityId;
          const idLabel = entry.attribute ? `${entry.entityId}.${entry.attribute}` : entry.entityId;
          const unit =
            !entry.attribute && !missing && typeof stateObj.attributes?.unit_of_measurement === 'string'
              ? ` ${stateObj.attributes.unit_of_measurement}`
              : '';
          return html`
            <tr class=${missing ? 'tpl-refs__row--missing' : ''}>
              <td>
                <div class="tpl-refs__entity">
                  ${missing ? '' : html`<ha-state-icon .stateObj=${stateObj}></ha-state-icon>`}
                  <span class="tpl-refs__text">
                    <span class="tpl-refs__name">${friendly}</span>
                    <span class="tpl-refs__id">${idLabel}</span>
                  </span>
                </div>
              </td>
              <td class="tpl-refs__value">
                ${missing ? t(hass, 'references.entity_not_found') : html`${formatValue(rawValue)}${unit}`}
              </td>
            </tr>
          `;
        })}
      </tbody>
    </table>
  `;
}
