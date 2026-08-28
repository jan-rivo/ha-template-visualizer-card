// Helper for rendering (evaluating) small Jinja sub-expressions against the
// live Home Assistant instance via the WebSocket API, and interpreting the
// resulting string as a boolean/truthy value for the tree visualization.
//
// This uses HA's `render_template` WS command as a *live subscription*: it
// pushes an initial result immediately, then pushes a new result every time
// a referenced entity changes - HA does the dependency tracking for us. We
// keep the subscription open for the lifetime of the card (see
// subscribeLiveExpression) instead of resolving once and unsubscribing, so
// the whole card is push-driven with no polling anywhere.
import type { HomeAssistant } from './hass';

export type { HomeAssistant };

interface RenderTemplateResult {
  result: unknown;
  listeners?: unknown;
}

export type Unsubscribe = () => Promise<void>;

/**
 * Subscribes to the live rendered value of `{{ <expression> }}`. `onValue`
 * is invoked immediately with the initial render, then again every time HA
 * pushes an update because a referenced entity changed. `onError` is
 * invoked if the subscription itself fails to establish (e.g. invalid
 * template syntax). Returns an unsubscribe function - callers MUST call it
 * when the expression is no longer being displayed (e.g. on card teardown
 * or when the template config changes) to avoid leaking WS subscriptions.
 */
export async function subscribeLiveExpression(
  hass: HomeAssistant,
  expression: string,
  onValue: (rendered: string) => void,
  onError: (error: Error) => void
): Promise<Unsubscribe> {
  const template = `{{ (${expression}) }}`;
  try {
    return await hass.connection.subscribeMessage<RenderTemplateResult>(
      (result) => onValue(String(result?.result ?? '')),
      { type: 'render_template', template }
    );
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
    return async () => undefined;
  }
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
