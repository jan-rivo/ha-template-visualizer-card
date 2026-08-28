// English (base/fallback language). Every other language file must supply
// exactly these keys - this object also drives the TranslationKey type via
// `keyof typeof en`, so a typo or missing key in another language file is a
// compile error.
export const en = {
  'card.default_title': 'Template logic',
  'card.parse_fallback_warning':
    "Couldn't fully parse this template's boolean structure - showing it as a single evaluated expression instead.",
  'card.setting_up': 'Setting up live subscriptions…',
  'card.template_source_summary': 'Template source (live-synced from {entity})',
  'card.references_summary': 'Referenced entities & attributes',
  'references.entity_column': 'Entity',
  'references.value_column': 'Current value',
  'references.entity_not_found': 'entity not found',
  'references.empty': 'No states()/is_state()/state_attr() references found.',
  'tree.loading': 'loading…',
  'tree.and': 'AND',
  'tree.or': 'OR',
  'tree.not': 'NOT',
  'editor.title_label': 'Title (optional)',
  'editor.entity_label': 'Template Helper entity',
  'editor.icon_label': 'Icon (optional)',
  'editor.icon_hint': "Leave blank to automatically show an on/off icon based on the entity's state.",
  'editor.hint':
    'Only entities created via Settings → Devices & Services → Helpers → Template are supported. The card reads that helper\'s template definition directly, so it always stays in sync - nothing to paste or keep updated manually.',
} as const;

export type TranslationKey = keyof typeof en;
export type Translation = Record<TranslationKey, string>;
