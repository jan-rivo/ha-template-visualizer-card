// Extracts entity/attribute references from the raw template text by
// scanning for the well-known HA template functions:
//   states('entity_id')
//   is_state('entity_id', 'value')
//   state_attr('entity_id', 'attribute')
//   is_state_attr('entity_id', 'attribute', 'value')
//
// This is a separate, simpler pass than the boolean-structure parser: it
// scans the whole template (not just the parsed subset), so it still finds
// references even in templates the boolean parser couldn't fully structure
// (loops, filters, etc.) and even when the same reference is used multiple
// times or fed into arithmetic/string logic outside the boolean tree.
export type ReferenceFn = 'states' | 'is_state' | 'state_attr' | 'is_state_attr';

export interface EntityReference {
  raw: string;
  fn: ReferenceFn;
  entityId: string;
  attribute?: string;
  compareValue?: string;
}

const CALL_RE =
  /\b(states|is_state|state_attr|is_state_attr)\(\s*(['"])((?:\\.|(?!\2).)*)\2\s*(?:,\s*(['"])((?:\\.|(?!\4).)*)\4\s*)?(?:,\s*(['"])((?:\\.|(?!\6).)*)\6\s*)?\)/g;

function unescape(str: string): string {
  return str.replace(/\\(.)/g, '$1');
}

export function extractReferences(template: string): EntityReference[] {
  const refs: EntityReference[] = [];
  const re = new RegExp(CALL_RE.source, 'g');
  let match: RegExpExecArray | null;
  while ((match = re.exec(template)) !== null) {
    const [raw, fn, , arg1, , arg2, , arg3] = match;
    const entityId = unescape(arg1);
    if (fn === 'states') {
      refs.push({ raw, fn: 'states', entityId });
    } else if (fn === 'is_state') {
      refs.push({ raw, fn: 'is_state', entityId, compareValue: arg2 ? unescape(arg2) : undefined });
    } else if (fn === 'state_attr') {
      refs.push({ raw, fn: 'state_attr', entityId, attribute: arg2 ? unescape(arg2) : undefined });
    } else if (fn === 'is_state_attr') {
      refs.push({
        raw,
        fn: 'is_state_attr',
        entityId,
        attribute: arg2 ? unescape(arg2) : undefined,
        compareValue: arg3 ? unescape(arg3) : undefined,
      });
    }
  }
  return refs;
}

/** Dedupes references down to one row per (entityId, attribute) pair. */
export interface ReferencedEntity {
  entityId: string;
  attribute?: string;
  usages: EntityReference[];
}

export function groupReferences(refs: EntityReference[]): ReferencedEntity[] {
  const map = new Map<string, ReferencedEntity>();
  for (const ref of refs) {
    const key = `${ref.entityId}\u0000${ref.attribute ?? ''}`;
    let entry = map.get(key);
    if (!entry) {
      entry = { entityId: ref.entityId, attribute: ref.attribute, usages: [] };
      map.set(key, entry);
    }
    entry.usages.push(ref);
  }
  return Array.from(map.values()).sort((a, b) =>
    a.entityId === b.entityId ? (a.attribute ?? '').localeCompare(b.attribute ?? '') : a.entityId.localeCompare(b.entityId)
  );
}
