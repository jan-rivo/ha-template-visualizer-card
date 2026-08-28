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
  'editor.hint':
    "Seules les entités créées via Paramètres → Appareils et services → Assistants → Modèle sont prises en charge. La carte lit directement la définition du modèle de cet assistant, elle reste donc toujours synchronisée - rien à coller ni à mettre à jour manuellement.",
};
