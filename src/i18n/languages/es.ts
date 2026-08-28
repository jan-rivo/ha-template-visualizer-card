import type { Translation } from './en';

export const es: Translation = {
  'card.default_title': 'Lógica de la plantilla',
  'card.parse_fallback_warning':
    'No se pudo analizar completamente la estructura booleana de esta plantilla - se muestra como una única expresión evaluada.',
  'card.setting_up': 'Configurando suscripciones en vivo…',
  'card.template_source_summary': 'Origen de la plantilla (sincronizado en vivo desde {entity})',
  'card.references_summary': 'Entidades y atributos referenciados',
  'references.entity_column': 'Entidad',
  'references.value_column': 'Valor actual',
  'references.entity_not_found': 'entidad no encontrada',
  'references.empty': 'No se encontraron referencias states()/is_state()/state_attr().',
  'tree.loading': 'cargando…',
  'tree.and': 'Y',
  'tree.or': 'O',
  'tree.not': 'NO',
  'editor.title_label': 'Título (opcional)',
  'editor.entity_label': 'Entidad de ayudante de plantilla',
  'editor.hint':
    'Solo se admiten entidades creadas mediante Ajustes → Dispositivos y servicios → Ayudantes → Plantilla. La tarjeta lee directamente la definición de la plantilla de ese ayudante, por lo que siempre permanece sincronizada - no hay nada que pegar ni actualizar manualmente.',
};
