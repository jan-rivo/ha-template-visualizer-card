import type { Translation } from './en';

export const fr: Translation = {
  'card.default_title': 'Logique du modèle',
  'card.parse_fallback_warning':
    "Impossible d'analyser entièrement la structure booléenne de ce modèle - affichage sous forme d'expression unique évaluée.",
  'card.setting_up': 'Configuration des abonnements en direct…',
  'card.template_source_summary': 'Source du modèle (synchronisée en direct depuis {entity})',
  'card.references_summary': 'Entités et attributs référencés',
  'references.entity_column': 'Entité',
  'references.value_column': 'Valeur actuelle',
  'references.entity_not_found': 'entité introuvable',
  'references.empty': 'Aucune référence states()/is_state()/state_attr() trouvée.',
  'tree.loading': 'chargement…',
  'tree.and': 'ET',
  'tree.or': 'OU',
  'tree.not': 'NON',
  'editor.title_label': 'Titre (facultatif)',
  'editor.entity_label': "Entité d'assistant modèle",
  'editor.icon_label': 'Icône (facultative)',
  'editor.icon_hint':
    "Laissez vide pour afficher automatiquement une icône marche/arrêt selon l'état de l'entité.",
  'editor.hint':
    "Seules les entités créées via Paramètres → Appareils et services → Assistants → Modèle sont prises en charge. La carte lit directement la définition du modèle de cet assistant, elle reste donc toujours synchronisée - rien à coller ni à mettre à jour manuellement.",
  'humanize.is': 'est',
  'humanize.is_not': "n'est pas",
  'humanize.less_than': 'est inférieur à',
  'humanize.less_than_or_equal': 'est inférieur ou égal à',
  'humanize.greater_than': 'est supérieur à',
  'humanize.greater_than_or_equal': 'est supérieur ou égal à',
  'humanize.is_in': 'est dans',
  'humanize.is_not_in': "n'est pas dans",
};
