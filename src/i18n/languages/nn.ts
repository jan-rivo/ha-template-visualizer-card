import type { Translation } from './en';

// Norwegian Nynorsk
export const nn: Translation = {
  'card.default_title': 'Malogikk',
  'card.parse_fallback_warning':
    'Klarte ikkje å analysere heile den boolske strukturen i denne malen - viser han som eitt enkelt evaluert uttrykk i staden.',
  'card.too_many_subscriptions':
    'This template opens {count} live subscriptions (recommended max {limit}). The card keeps working, but very large templates can slow down the dashboard - consider simplifying the template.',
  'card.setting_up': 'Set opp direkteabonnement…',
  'card.references_summary': 'Tilstandsverdiar',
  'card.edit_template': 'Rediger mal',
  'card.discard_changes': 'Forkast',
  'card.save_template': 'Lagre i hjelparen',
  'card.saving_template': 'Lagrar…',
  'card.empty_title': 'Kan ikkje laste malen',
  'card.empty_hint':
    'Vel ein Malhjelpar oppretta via Innstillingar → Einingar og tenester → Hjelparar i konfigurasjonen til kortet.',
  'card.edit_hint':
    'Redigerer eit utkast nedanfor. Visualiseringa vert analysert på nytt direkte medan du skriv. Trykk Ferdig for å gå attende til den lagra malen til hjelparen (lagring vert enno ikkje støtta).',
  'references.entity_column': 'Eining',
  'references.value_column': 'Gjeldande verdi',
  'references.entity_not_found': 'eininga vart ikkje funnen',
  'references.empty': 'Fann ingen states()/is_state()/state_attr()-referansar.',
  'tree.loading': 'lastar…',
  'tree.and': 'OG',
  'tree.or': 'ELLER',
  'tree.not': 'IKKJE',
  'tree.if': 'VISS',
  'tree.else_if': 'ELLES VISS',
  'tree.else': 'ELLES',
  'tree.empty_output': '(tom utdata)',
  'editor.title_label': 'Tittel (valfritt)',
  'editor.entity_label': 'Malhjelpar-eining',
  'editor.icon_label': 'Ikon (valfritt)',
  'editor.humanize_label': 'Enkelt språk',
  'editor.show_state_values_label': 'Tilstandsverdiar',
  'editor.show_header_label': 'Vis ikon og tittel',
  'editor.show_edit_button_label': 'Vis redigeringsknapp',
  'editor.hint':
    'Berre einingar oppretta via Innstillingar → Einingar og tenester → Hjelparar → Mal er støtta. Kortet les maldefinisjonen til den hjelparen direkte, så det held seg alltid synkronisert - ingenting å lime inn eller oppdatere manuelt.',
  'humanize.is': 'er',
  'humanize.is_not': 'er ikkje',
  'humanize.less_than': 'er mindre enn',
  'humanize.less_than_or_equal': 'er mindre enn eller lik',
  'humanize.greater_than': 'er større enn',
  'humanize.greater_than_or_equal': 'er større enn eller lik',
  'humanize.is_in': 'er i',
  'humanize.is_not_in': 'er ikkje i',
  'humanize.now': 'gjeldande tid',
  'humanize.current': 'gjeldande',
  'humanize.and': 'og',
  'humanize.between': 'er mellom',
};
