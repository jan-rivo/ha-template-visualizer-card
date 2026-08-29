import type { Translation } from './en';

// Norwegian Bokmål
export const nb: Translation = {
  'card.default_title': 'Malogikk',
  'card.parse_fallback_warning':
    'Klarte ikke å analysere hele den boolske strukturen i denne malen - viser den som ett enkelt evaluert uttrykk i stedet.',
  'card.setting_up': 'Setter opp direkteabonnementer…',
  'card.template_source_summary': 'Malkilde (synkronisert direkte fra {entity})',
  'card.references_summary': 'Refererte enheter og attributter',
  'card.edit_template': 'Rediger mal',
  'card.done_editing': 'Ferdig',
  'card.edit_hint':
    'Redigerer et utkast nedenfor. Visualiseringen re-analyseres direkte mens du skriver. Trykk Ferdig for å gå tilbake til hjelperens lagrede mal (lagring støttes ennå ikke).',
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
  'editor.humanize_label': 'Enkelt språk',
  'editor.hint':
    'Kun enheter opprettet via Innstillinger → Enheter og tjenester → Hjelpere → Mal støttes. Kortet leser malens definisjon direkte fra hjelperen, så det holder seg alltid synkronisert - ingenting å lime inn eller oppdatere manuelt.',
  'humanize.is': 'er',
  'humanize.is_not': 'er ikke',
  'humanize.less_than': 'er mindre enn',
  'humanize.less_than_or_equal': 'er mindre enn eller lik',
  'humanize.greater_than': 'er større enn',
  'humanize.greater_than_or_equal': 'er større enn eller lik',
  'humanize.is_in': 'er i',
  'humanize.is_not_in': 'er ikke i',
};
