// Entry point: registers the card with Home Assistant's Lovelace card
// picker and exposes it as a custom element.
import { HaTemplateEditorCard } from './card';
import type { HomeAssistant } from './ha/hass';
import './editor';

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-template-visualizer-card',
  name: 'Template Logic Visualizer',
  description: 'Visualizes a template sensor\'s boolean logic tree and shows which sub-conditions are true/false.',
  preview: false,
  documentationURL: 'https://github.com/jan-rivo/ha-template-visualizer-card',
  getEntitySuggestion: (_hass: HomeAssistant, entityId: string) => {
    // Suggest this card for template-backed sensors/binary sensors picked in the card picker.
    const domain = entityId.split('.')[0];
    if (domain !== 'sensor' && domain !== 'binary_sensor') return null;
    return {
      config: { type: 'custom:ha-template-visualizer-card', entity: entityId },
    };
  },
});

export { HaTemplateEditorCard };
