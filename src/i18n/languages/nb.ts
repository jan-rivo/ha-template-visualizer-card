import type { Translation } from './en';

// Norwegian Bokmål
export const nb: Translation = {
  'card.default_title': 'Malogikk',
  'card.parse_fallback_warning':
    'Klarte ikke å analysere hele den boolske strukturen i denne malen - viser den som ett enkelt evaluert uttrykk i stedet.',
  'card.setting_up': 'Setter opp direkteabonnementer…',
  'card.template_source_summary': 'Malkilde (synkronisert direkte fra {entity})',
  'card.references_summary': 'Refererte enheter og attributter',
  'references.entity_column': 'Enhet',
  'references.value_column': 'Nåværende verdi',
  'references.entity_not_found': 'enheten ble ikke funnet',
  'references.empty': 'Fant ingen states()/is_state()/state_attr()-referanser.',
  'tree.loading': 'laster…',
  'tree.and': 'OG',
  'tree.or': 'ELLER',
  'tree.not': 'IKKE',
  'editor.title_label': 'Tittel (valgfritt)',
  'editor.entity_label': 'Malhjelper-enhet',
  'editor.icon_label': 'Ikon (valgfritt)',
  'editor.icon_hint': 'La stå tomt for å automatisk vise et på/av-ikon basert på enhetens tilstand.',
  'editor.hint':
    'Kun enheter opprettet via Innstillinger → Enheter og tjenester → Hjelpere → Mal støttes. Kortet leser malens definisjon direkte fra hjelperen, så det holder seg alltid synkronisert - ingenting å lime inn eller oppdatere manuelt.',
};
