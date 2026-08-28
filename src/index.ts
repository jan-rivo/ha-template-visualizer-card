// Entry point: registers the card with Home Assistant's Lovelace card
// picker and exposes it as a custom element.
import { HaTemplateEditorCard } from './card';
import './editor';

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-template-editor-card',
  name: 'Template Logic Editor',
  description: 'Visualizes a template sensor\'s boolean logic tree and shows which sub-conditions are true/false.',
});

export { HaTemplateEditorCard };
