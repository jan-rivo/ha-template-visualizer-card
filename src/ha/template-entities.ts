// Resolves the default entity for a newly-added card so it starts in a
// valid state whenever the user already has a template helper: prefers an
// explicitly suggested entity (card picker opened from an entity), then the
// first template-backed sensor/binary_sensor in the registry. Returns
// undefined when nothing suitable exists and the caller should fall back to
// a placeholder.
//
// Pure function over the hass registry snapshot (no DOM, no Lit), so it is
// straightforward to unit test in isolation.
import type { HomeAssistant } from './hass';

function isTemplateSensor(entityId: string, hass?: HomeAssistant): boolean {
  if (!entityId.startsWith('sensor.') && !entityId.startsWith('binary_sensor.')) return false;
  return hass?.entities?.[entityId]?.platform === 'template';
}

export function findDefaultTemplateEntity(
  hass?: HomeAssistant,
  entities: string[] = [],
  entitiesFallback: string[] = []
): string | undefined {
  for (const candidate of [...entities, ...entitiesFallback]) {
    if (isTemplateSensor(candidate, hass)) return candidate;
  }
  const registry = hass?.entities;
  if (registry) {
    for (const entry of Object.values(registry)) {
      if (entry && isTemplateSensor(entry.entity_id, hass)) return entry.entity_id;
    }
  }
  return undefined;
}
