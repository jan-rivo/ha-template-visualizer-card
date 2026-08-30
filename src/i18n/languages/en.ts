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
  'card.edit_template': 'Edit template',
  'card.discard_changes': 'Discard',
  'card.save_template': 'Save to helper',
  'card.saving_template': 'Saving…',
  'card.edit_hint':
    'Editing a draft below. The visualization re-parses live as you type. Save writes it back to the helper; Discard reverts to the helper\'s saved template.',
  'references.entity_column': 'Entity',
  'references.value_column': 'Current value',
  'references.entity_not_found': 'entity not found',
  'references.empty': 'No states()/is_state()/state_attr() references found.',
  'tree.loading': 'loading…',
  'tree.and': 'AND',
  'tree.or': 'OR',
  'tree.not': 'NOT',
  'tree.if': 'IF',
  'tree.else_if': 'ELSE IF',
  'tree.else': 'ELSE',
  'tree.empty_output': '(empty output)',
  'editor.title_label': 'Title (optional)',
  'editor.entity_label': 'Template Helper entity',
  'editor.icon_label': 'Icon (optional)',
  'editor.icon_hint': "Leave blank to automatically show an on/off icon based on the entity's state.",
  'editor.humanize_label': 'Plain language',
  'editor.hint':
    'Only entities created via Settings → Devices & Services → Helpers → Template are supported. The card reads that helper\'s template definition directly, so it always stays in sync - nothing to paste or keep updated manually.',
  'humanize.is': 'is',
  'humanize.is_not': 'is not',
  'humanize.less_than': 'is less than',
  'humanize.less_than_or_equal': 'is less than or equal to',
  'humanize.greater_than': 'is greater than',
  'humanize.greater_than_or_equal': 'is greater than or equal to',
  'humanize.is_in': 'is in',
  'humanize.is_not_in': 'is not in',
} as const;

export type TranslationKey = keyof typeof en;
export type Translation = Record<TranslationKey, string>;
