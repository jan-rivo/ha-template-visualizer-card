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
import { findEntityRegistryEntry, type EntityRegistryEntry } from './entity-registry';

interface HaFormSchemaEntry {
  name: string;
  type?: string;
  schema?: HaFormSchemaEntry[];
  description?: { suggested_value?: unknown };
}

interface OptionsFlowStep {
  flow_id: string;
  type: string;
  data_schema?: HaFormSchemaEntry[];
  errors?: Record<string, string>;
  title?: string;
}

/** Field names the template integration has used across HA versions. */
const TEMPLATE_FIELD_NAMES = ['state', 'value_template'];

/** Resolves an entity to its template config entry, throwing a clear message when unsupported. */
async function resolveTemplateEntry(
  hass: HomeAssistant,
  entityId: string
): Promise<EntityRegistryEntry> {
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
  return entry;
}

/**
 * The options-flow schema's fields are pre-filled with each field's current
 * value as `description.suggested_value` (this is how HA's edit dialog
 * pre-fills itself). We read every populated field out of the schema into a
 * plain object so we can round-trip the helper's full configuration. Nested
 * `section` fields (e.g. `additional_options` -> `availability`) are
 * flattened into nested objects.
 */
function collectOptions(schema: HaFormSchemaEntry[] | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of schema ?? []) {
    if (field.type === 'section' && field.schema) {
      const nested = collectOptions(field.schema);
      if (Object.keys(nested).length > 0) out[field.name] = nested;
    } else {
      const value = field.description?.suggested_value;
      if (value !== undefined && value !== null && value !== '') {
        out[field.name] = value;
      }
    }
  }
  return out;
}
export { collectOptions };

export async function fetchTemplateForEntity(hass: HomeAssistant, entityId: string): Promise<string> {
  const entry = await resolveTemplateEntry(hass, entityId);

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

/**
 * Saves a new template back to a UI-created Template helper by driving the
 * same options flow the Settings UI uses. Submits the helper's FULL current
 * configuration (every field read from the flow schema) with only the
 * template field replaced: HA's options flow deletes any optional schema key
 * it doesn't receive, so omitting e.g. `unit_of_measurement` / `device_class`
 * / `state_class` / `additional_options` would silently wipe them.
 *
 * Because the template integration sets `options_flow_reloads = True`, a
 * successful submit immediately reloads the helper with the new options, so
 * the saved change takes effect live.
 */
export async function saveTemplateForEntity(
  hass: HomeAssistant,
  entityId: string,
  newTemplate: string
): Promise<void> {
  const entry = await resolveTemplateEntry(hass, entityId);

  const step = await hass.callApi<OptionsFlowStep>('POST', 'config/config_entries/options/flow', {
    handler: entry.config_entry_id,
  });

  try {
    const schema = step.data_schema ?? [];
    const templateField = schema.find((f) => TEMPLATE_FIELD_NAMES.includes(f.name))?.name;
    if (!templateField) {
      throw new Error(
        `Couldn't find the template field in "${entityId}"'s configuration (looked for: ${TEMPLATE_FIELD_NAMES.join(', ')}).`
      );
    }

    const options = collectOptions(schema);
    options[templateField] = newTemplate;

    const result = await hass.callApi<OptionsFlowStep>(
      'POST',
      `config/config_entries/options/flow/${step.flow_id}`,
      options
    );

    // A successful submit resolves the flow into `create_entry`; any
    // validation failure comes back as another `form` step with `errors`.
    if (result.type !== 'create_entry') {
      const detail = result.errors
        ? Object.values(result.errors).join(' ')
        : 'the configuration flow rejected the update';
      throw new Error(`Couldn't save the template: ${detail}`);
    }
  } finally {
    // The flow is consumed on success (create_entry removes it). Deleting a
    // non-existent flow is a harmless no-op, kept for the error path.
    await hass.callApi('DELETE', `config/config_entries/options/flow/${step.flow_id}`).catch(() => undefined);
  }
}
