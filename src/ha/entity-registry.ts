// Reads the entity registry so we can find which entities are backed by
// the "template" platform (i.e. UI-created Template Helpers), and look up
// a specific entity's config_entry_id.
import type { HomeAssistant } from './hass';

export interface EntityRegistryEntry {
  entity_id: string;
  platform: string;
  config_entry_id: string | null;
}

export async function fetchEntityRegistry(hass: HomeAssistant): Promise<EntityRegistryEntry[]> {
  return hass.callWS<EntityRegistryEntry[]>({ type: 'config/entity_registry/list' });
}

export async function findEntityRegistryEntry(
  hass: HomeAssistant,
  entityId: string
): Promise<EntityRegistryEntry | undefined> {
  const entries = await fetchEntityRegistry(hass);
  return entries.find((e) => e.entity_id === entityId);
}
