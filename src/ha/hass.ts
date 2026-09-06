// Shared Home Assistant frontend types used across the card. `hass` is the
// object every Lovelace card/panel receives from the frontend; we only
// declare the parts we actually use.
export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

/** Minimal subset of HA's `CurrentUser` (src/types.ts) surfaced to cards. */
export interface CurrentUser {
  id: string;
  is_owner: boolean;
  is_admin: boolean;
  name: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  /** Entity registry snapshot keyed by entity_id, as exposed on the frontend hass object. */
  entities?: Record<string, { entity_id: string; platform?: string } | undefined>;
  /** BCP-47 language code of the logged-in user's selected language (e.g. "en", "nb", "pt-BR"). */
  language?: string;
  /** The logged-in user. `is_admin` is the only client-side gate HA exposes for config-entry editing. */
  user?: CurrentUser;
  connection: {
    subscribeMessage: <T = unknown>(
      callback: (result: T) => void,
      msg: Record<string, unknown>
    ) => Promise<() => Promise<void>>;
  };
  callWS: <T = unknown>(msg: Record<string, unknown>) => Promise<T>;
  callApi: <T = unknown>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, parameters?: unknown) => Promise<T>;
}
