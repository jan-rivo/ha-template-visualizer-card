import type { Translation } from './en';

export const de: Translation = {
  'card.default_title': 'Vorlagenlogik',
  'card.parse_fallback_warning':
    'Die boolesche Struktur dieser Vorlage konnte nicht vollständig analysiert werden - wird als einzelner ausgewerteter Ausdruck angezeigt.',
  'card.setting_up': 'Live-Abonnements werden eingerichtet…',
  'card.template_source_summary': 'Vorlagenquelle (live synchronisiert von {entity})',
  'card.references_summary': 'Referenzierte Entitäten & Attribute',
  'references.entity_column': 'Entität',
  'references.value_column': 'Aktueller Wert',
  'references.entity_not_found': 'Entität nicht gefunden',
  'references.empty': 'Keine states()/is_state()/state_attr()-Referenzen gefunden.',
  'tree.loading': 'wird geladen…',
  'tree.and': 'UND',
  'tree.or': 'ODER',
  'tree.not': 'NICHT',
  'editor.title_label': 'Titel (optional)',
  'editor.entity_label': 'Vorlagen-Helfer-Entität',
  'editor.icon_label': 'Symbol (optional)',
  'editor.icon_hint':
    'Leer lassen, um automatisch ein Ein/Aus-Symbol basierend auf dem Zustand der Entität anzuzeigen.',
  'editor.humanize_label': 'Einfache Sprache',
  'editor.hint':
    'Es werden nur Entitäten unterstützt, die über Einstellungen → Geräte & Dienste → Helfer → Vorlage erstellt wurden. Die Karte liest die Vorlagendefinition dieses Helfers direkt aus, sodass sie immer synchron bleibt - nichts muss manuell eingefügt oder aktualisiert werden.',
  'humanize.is': 'ist',
  'humanize.is_not': 'ist nicht',
  'humanize.less_than': 'ist kleiner als',
  'humanize.less_than_or_equal': 'ist kleiner oder gleich',
  'humanize.greater_than': 'ist größer als',
  'humanize.greater_than_or_equal': 'ist größer oder gleich',
  'humanize.is_in': 'ist in',
  'humanize.is_not_in': 'ist nicht in',
};
