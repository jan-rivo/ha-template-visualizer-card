// Best-effort "naturalizer" that turns a low-level boolean leaf like
//   state_attr('climate.living_room','temperature') > 20
// into human-readable text like
//   Living Room temperature is greater than 20
//
// It decomposes the leaf source into subject / operator / value, resolves the
// entity to its HA friendly_name, and maps the comparison operator to a word
// (localized via the card's i18n layer). Anything it can't recognize returns
// null and the caller falls back to the raw source - this is intentionally
// best-effort, since leaves can technically contain arbitrary Jinja.
import type { HomeAssistant } from '../ha/hass';
import { t, type TranslationKey } from '../i18n';
import { extractReferences, type EntityReference } from './references';

type OpToken =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'in'
  | 'not_in'
  | 'is'
  | 'is_not';

const SYMBOL_OPS: Array<[string, OpToken]> = [
  ['<=', 'lte'],
  ['>=', 'gte'],
  ['!=', 'ne'],
  ['==', 'eq'],
  ['<', 'lt'],
  ['>', 'gt'],
];

// Longest word operators first so `not in` wins over `in`, etc.
const WORD_OPS: Array<[string, OpToken]> = [
  ['not in', 'not_in'],
  ['is not', 'is_not'],
  ['in', 'in'],
  ['is', 'is'],
];

const OP_KEYS: Record<OpToken, TranslationKey> = {
  eq: 'humanize.is',
  ne: 'humanize.is_not',
  lt: 'humanize.less_than',
  lte: 'humanize.less_than_or_equal',
  gt: 'humanize.greater_than',
  gte: 'humanize.greater_than_or_equal',
  in: 'humanize.is_in',
  not_in: 'humanize.is_not_in',
  is: 'humanize.is',
  is_not: 'humanize.is_not',
};

function isIdentChar(ch: string): boolean {
  return /[A-Za-z0-9_.\]]/.test(ch);
}

/** Finds the first comparison operator at top level (outside strings and parens). */
function findComparison(src: string): { op: OpToken; left: string; right: string } | null {
  let depth = 0;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === "'" || ch === '"') {
      const quote = ch;
      i++;
      while (i < src.length && src[i] !== quote) {
        if (src[i] === '\\') i++;
        i++;
      }
      continue;
    }
    if (ch === '(') {
      depth++;
      continue;
    }
    if (ch === ')') {
      depth--;
      continue;
    }
    if (depth !== 0) continue;

    for (const [sym, token] of SYMBOL_OPS) {
      if (src.startsWith(sym, i)) {
        const left = src.slice(0, i).trim();
        const right = src.slice(i + sym.length).trim();
        if (left && right) return { op: token, left, right };
      }
    }
    for (const [word, token] of WORD_OPS) {
      if (src.startsWith(word, i)) {
        const before = i > 0 ? src[i - 1] : ' ';
        const afterIdx = i + word.length;
        const after = afterIdx < src.length ? src[afterIdx] : ' ';
        if (!isIdentChar(before) && !isIdentChar(after)) {
          const left = src.slice(0, i).trim();
          const right = src.slice(afterIdx).trim();
          if (left && right) return { op: token, left, right };
        }
      }
    }
  }
  return null;
}

/**
 * Detects a 3-operand chained comparison from the first comparison found in
 * a leaf: `0 < elevation < 20` -> `{ a:'0', op1:'lt', b:'elevation', op2:'lt',
 * c:'20' }`. Returns null if the right operand does not contain exactly one
 * more comparison (e.g. a longer chain or a plain single comparison).
 */
function findChainedComparison(first: { op: OpToken; left: string; right: string }): {
  a: string;
  op1: OpToken;
  b: string;
  op2: OpToken;
  c: string;
} | null {
  const second = findComparison(first.right);
  if (!second) return null;
  // Guard against longer chains: the second comparison's right operand must
  // not itself contain another comparison.
  if (findComparison(second.right)) return null;
  return {
    a: first.left,
    op1: first.op,
    b: second.left,
    op2: second.op,
    c: second.right,
  };
}

/** Inverts a comparison when the entity is on the right side (e.g. `20 < x`). */
function reverseOp(token: OpToken): OpToken | null {
  switch (token) {
    case 'lt':
      return 'gt';
    case 'gt':
      return 'lt';
    case 'lte':
      return 'gte';
    case 'gte':
      return 'lte';
    case 'eq':
      return 'eq';
    case 'ne':
      return 'ne';
    default:
      return null; // in / is and their negations don't invert meaningfully
  }
}

function friendlyName(hass: HomeAssistant | undefined, entityId: string): string {
  const friendly = hass?.states?.[entityId]?.attributes?.friendly_name;
  if (typeof friendly === 'string' && friendly.trim() !== '') return friendly.trim();
  const pretty = entityId.replace(/^[a-z_]+\./, '').replace(/[-_]+/g, ' ').trim();
  return pretty.length > 0 ? pretty : entityId;
}

function attrLabel(attribute: string): string {
  return attribute.replace(/[-_]+/g, ' ');
}

function entityLabel(hass: HomeAssistant | undefined, ref: EntityReference): string {
  const name = friendlyName(hass, ref.entityId);
  return ref.attribute ? `${name} ${attrLabel(ref.attribute)}` : name;
}

function unquote(value: string): string | null {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2)
  ) {
    return trimmed
      .slice(1, -1)
      .replace(/\\(.)/g, '$1');
  }
  return null;
}

/** Splits on a separator at top level (aware of nested brackets and strings). */
function splitTopLevel(src: string, sep: string): string[] {
  const out: string[] = [];
  let cur = '';
  let depth = 0;
  let inStr: string | null = null;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') {
        cur += c + (src[i + 1] ?? '');
        i++;
        continue;
      }
      cur += c;
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"') {
      inStr = c;
      cur += c;
      continue;
    }
    if (c === '[') depth++;
    if (c === ']') depth--;
    if (c === sep && depth === 0) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

/**
 * Humanizes the *subject* (left operand) of a comparison when it is not an
 * entity reference. Handles `now()` / `now().attr` specially and otherwise
 * passes the text through verbatim (e.g. a `{% set %}` local variable).
 */
function humanizeSubject(subject: string, hass: HomeAssistant | undefined): string | null {
  const trimmed = subject.trim();
  const refs = extractReferences(trimmed);
  if (refs.length === 1) return entityLabel(hass, refs[0]);
  const nowMatch = trimmed.match(/^now\s*\(\s*\)\s*(.*)$/);
  if (nowMatch) {
    const rest = nowMatch[1].trim();
    if (rest === '') return t(hass, 'humanize.now');
    const attr = rest.match(/^\.\s*([A-Za-z_]+)\s*$/);
    if (attr) return `${t(hass, 'humanize.current')} ${attrLabel(attr[1])}`;
  }
  return trimmed.length ? trimmed : null;
}

function humanizeValue(value: string, hass: HomeAssistant | undefined): string | null {
  const unquoted = unquote(value);
  if (unquoted !== null) return unquoted;
  const trimmed = value.trim();
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return trimmed;
  if (/^\[.*\]$/.test(trimmed)) {
    const inner = trimmed.slice(1, -1);
    const parts = splitTopLevel(inner, ',');
    const human = parts.map((p) => humanizeValue(p, hass));
    if (human.some((h) => h === null)) return null;
    return (human as string[]).join(', ');
  }
  const refs = extractReferences(trimmed);
  if (refs.length === 1) return entityLabel(hass, refs[0]);
  return trimmed;
}

export function humanizeLeaf(source: string, hass?: HomeAssistant): string | null {
  const cmp = findComparison(source);
  if (cmp) {
    // Chained comparison: `0 < elevation < 20` is `A op1 B op2 C`. Reuse the
    // single-comparison logic on each side so the middle operand (B) becomes
    // the shared subject and both constraints read naturally:
    // -> "elevation is greater than 0 and less than 20".
    const chained = findChainedComparison(cmp);
    if (chained) {
      const { a, op1, b, op2, c } = chained;
      const subject = humanizeSubject(b, hass);
      if (subject === null) return null;
      const relLeft = reverseOp(op1); // b compared against the left bound (a)
      if (relLeft === null) return null;
      const valueA = humanizeValue(a, hass);
      const valueC = humanizeValue(c, hass);
      if (valueA === null || valueC === null) return null;
      const relRight = op2; // b compared against the right bound (c)
      const leftIsLower = relLeft === 'gt' || relLeft === 'gte';
      const leftIsUpper = relLeft === 'lt' || relLeft === 'lte';
      const rightIsLower = relRight === 'gt' || relRight === 'gte';
      const rightIsUpper = relRight === 'lt' || relRight === 'lte';
      // A bounded range, e.g. `0 < elevation < 20` -> "elevation is between 0 and 20".
      if ((leftIsLower && rightIsUpper) || (leftIsUpper && rightIsLower)) {
        const low = leftIsLower ? valueA : valueC;
        const high = leftIsLower ? valueC : valueA;
        return `${subject} ${t(hass, 'humanize.between')} ${low} ${t(hass, 'humanize.and')} ${high}`;
      }
      return `${subject} ${t(hass, OP_KEYS[relLeft])} ${valueA} ${t(hass, 'humanize.and')} ${t(hass, OP_KEYS[relRight])} ${valueC}`;
    }

    const leftRefs = extractReferences(cmp.left);
    const rightRefs = extractReferences(cmp.right);
    let subject: string | null = null;
    let valueSource: string | null = null;
    let token = cmp.op;

    if (leftRefs.length >= 1) {
      subject = entityLabel(hass, leftRefs[0]);
      valueSource = cmp.right;
    } else if (rightRefs.length >= 1) {
      const reversed = reverseOp(cmp.op);
      if (reversed === null) return null;
      subject = entityLabel(hass, rightRefs[0]);
      valueSource = cmp.left;
      token = reversed;
    } else {
      // Neither operand is an entity (e.g. a `{% set %}` local variable or a
      // `now()` call). Humanize generically so the operators still read
      // naturally: `elevation < 0` -> "elevation is less than 0".
      subject = humanizeSubject(cmp.left, hass);
      valueSource = cmp.right;
    }

    const value = humanizeValue(valueSource, hass);
    if (subject === null || value === null) return null;
    return `${subject} ${t(hass, OP_KEYS[token])} ${value}`;
  }

  const refs = extractReferences(source);
  if (refs.length !== 1) return null;
  const ref = refs[0];
  const subject = entityLabel(hass, ref);

  // Predicate functions carry their own comparison value: `is_state('x','on')`.
  if (ref.compareValue !== undefined) {
    const value = humanizeValue(ref.compareValue, hass);
    if (value === null) return null;
    return `${subject} ${t(hass, OP_KEYS.eq)} ${value}`;
  }
  // A bare entity leaf just becomes its friendly name (the rendered value
  // already shows next to it).
  return subject;
}