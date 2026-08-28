// Helper for rendering (evaluating) small Jinja sub-expressions against the
// live Home Assistant instance via the WebSocket API, and interpreting the
// resulting string as a boolean/truthy value for the tree visualization.

export interface HomeAssistant {
  connection: {
    subscribeMessage: <T = unknown>(
      callback: (result: T) => void,
      msg: Record<string, unknown>
    ) => Promise<() => Promise<void>>;
  };
}

interface RenderTemplateResult {
  result: unknown;
  listeners?: unknown;
}

/**
 * Renders `{{ <expression> }}` via HA's `render_template` WS command
 * (the same one used by the frontend's own template editor / template
 * sensor preview). This is a subscription command: it pushes an initial
 * result immediately, then pushes updates whenever a referenced entity
 * changes. We resolve on the first push and immediately unsubscribe,
 * giving a one-shot render of the current live state.
 */
export async function renderExpression(hass: HomeAssistant, expression: string): Promise<string> {
  const template = `{{ (${expression}) }}`;
  return new Promise<string>((resolve, reject) => {
    let unsubscribe: (() => Promise<void>) | undefined;
    let settled = false;

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      unsubscribe?.().catch(() => undefined);
      reject(new Error('Template render timed out'));
    }, 8000);

    hass.connection
      .subscribeMessage<RenderTemplateResult>(
        (result) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          resolve(String(result?.result ?? ''));
          unsubscribe?.().catch(() => undefined);
        },
        { type: 'render_template', template }
      )
      .then((unsub) => {
        unsubscribe = unsub;
        if (settled) unsubscribe().catch(() => undefined);
      })
      .catch((err) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        reject(err instanceof Error ? err : new Error(String(err)));
      });
  });
}

/** Home Assistant / Jinja truthiness rules applied to a rendered string. */
export function isTruthy(rendered: string): boolean {
  const v = rendered.trim();
  if (v === '' || v === 'None' || v === 'none' || v === 'null') return false;
  if (v === 'False' || v === 'false' || v === '0') return false;
  if (v === 'True' || v === 'true') return true;
  const num = Number(v);
  if (!Number.isNaN(num)) return num !== 0;
  return v.length > 0;
}
