import type { Translation } from './en';

export const it: Translation = {
  'card.default_title': 'Logica del modello',
  'card.parse_fallback_warning':
    "Impossibile analizzare completamente la struttura booleana di questo modello - visualizzato come un'unica espressione valutata.",
  'card.setting_up': 'Configurazione delle sottoscrizioni live…',
  'card.template_source_summary': 'Sorgente del modello (sincronizzata in tempo reale da {entity})',
  'card.references_summary': 'Entità e attributi referenziati',
  'references.entity_column': 'Entità',
  'references.value_column': 'Valore attuale',
  'references.entity_not_found': 'entità non trovata',
  'references.empty': 'Nessun riferimento states()/is_state()/state_attr() trovato.',
  'tree.loading': 'caricamento…',
  'tree.and': 'E',
  'tree.or': 'O',
  'tree.not': 'NON',
  'editor.title_label': 'Titolo (opzionale)',
  'editor.entity_label': 'Entità helper modello',
  'editor.hint':
    "Sono supportate solo le entità create tramite Impostazioni → Dispositivi e servizi → Helper → Modello. La scheda legge direttamente la definizione del modello di quell'helper, quindi rimane sempre sincronizzata - niente da incollare o aggiornare manualmente.",
};
