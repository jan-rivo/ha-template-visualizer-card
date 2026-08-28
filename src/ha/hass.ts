// Shared Home Assistant frontend types used across the card. `hass` is the
// object every Lovelace card/panel receives from the frontend; we only
// declare the parts we actually use.
export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  /** BCP-47 language code of the logged-in user's selected language (e.g. "en", "nb", "pt-BR"). */
  language?: string;
  connection: {
    subscribeMessage: <T = unknown>(
      callback: (result: T) => void,
      msg: Record<string, unknown>
    ) => Promise<() => Promise<void>>;
  };
  callWS: <T = unknown>(msg: Record<string, unknown>) => Promise<T>;
  callApi: <T = unknown>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, parameters?: unknown) => Promise<T>;
}
