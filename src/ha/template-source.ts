// Fetches the actual Jinja template text behind a UI-created Template
// Helper entity, so the card always stays in sync with the real definition
// instead of a manually pasted copy that can drift.
//
// Home Assistant does not expose a config entry's stored options through
// any documented, stable public API (this is deliberate - config entries
// can hold secrets). The one place the current values genuinely surface is
// when you *edit* a helper in the UI: HA starts an "options flow" for that
// config entry, and the returned form schema includes each field's current
// value as `description.suggested_value` (that's literally how the edit
// dialog pre-fills itself). We reuse that same mechanism here, then
// immediately delete the flow again. This only works for entities backed by
// a config entry - i.e. UI-created Template Helpers - not YAML-defined
// `template:` sensors, which have no config entry at all.
//
// This intentionally rides on a semi-internal mechanism rather than a
// documented API, so it can break across Home Assistant versions. Only
// UI-created Template Helpers are supported by this card.
import type { HomeAssistant } from './hass';
import { findEntityRegistryEntry } from './entity-registry';

interface HaFormSchemaEntry {
  name: string;
  description?: { suggested_value?: unknown };
}

interface OptionsFlowStep {
  flow_id: string;
  type: string;
  data_schema?: HaFormSchemaEntry[];
}

/** Field names the template integration has used across HA versions. */
const TEMPLATE_FIELD_NAMES = ['state', 'value_template'];

export async function fetchTemplateForEntity(hass: HomeAssistant, entityId: string): Promise<string> {
  const entry = await findEntityRegistryEntry(hass, entityId);
  if (!entry) {
    throw new Error(`No entity registry entry found for "${entityId}".`);
  }
  if (entry.platform !== 'template') {
    throw new Error(
      `"${entityId}" is not a Template entity (platform: "${entry.platform}"). Only entities created via Settings > Devices & Services > Helpers > Template are supported.`
    );
  }
  if (!entry.config_entry_id) {
    throw new Error(
      `"${entityId}" has no config entry - it's likely a YAML-defined template sensor, which this card doesn't support. Only UI-created Template Helpers are supported.`
    );
  }

  const step = await hass.callApi<OptionsFlowStep>('POST', 'config/config_entries/options/flow', {
    handler: entry.config_entry_id,
  });

  try {
    const schema = step.data_schema ?? [];
    const field = schema.find((f) => TEMPLATE_FIELD_NAMES.includes(f.name));
    const suggested = field?.description?.suggested_value;
    if (typeof suggested !== 'string' || suggested.trim() === '') {
      throw new Error(
        `Couldn't find the template field in "${entityId}"'s configuration (looked for: ${TEMPLATE_FIELD_NAMES.join(', ')}).`
      );
    }
    return suggested;
  } finally {
    // Always clean up the flow we started, even on error/early return.
    await hass.callApi('DELETE', `config/config_entries/options/flow/${step.flow_id}`).catch(() => undefined);
  }
}
