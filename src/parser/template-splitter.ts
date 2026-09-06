// Scanner that splits a Jinja template into top-level segments: literal
// text, `{{ expr }}` output tags, `{% stmt %}` statement tags, and `{# #}`
// comments. It is brace- and quote-aware so it won't stop a tag early on a
// closing delimiter inside a string (e.g. `{{ "}}" }}`), and it ignores
// whitespace-control markers (`{%-`, `-%}`, etc.) because the raw source is
// preserved verbatim per segment.
//
// It deliberately does NOT try to parse Jinja itself - it only carves the
// template into pieces so higher layers (the boolean parser, and later the
// `{% if %}` handling) can reason about structure.

export type TemplateSegmentType = 'text' | 'expr' | 'stmt' | 'comment';

export interface TemplateSegment {
  type: TemplateSegmentType;
  /** Raw content WITHOUT the surrounding delimiters (e.g. inside `{{ }}`). */
  content: string;
  /** Index of the segment's first character in the original template. */
  start: number;
  /** Index one past the segment's last character in the original template. */
  end: number;
}

const EXPR_OPEN = '{{';
const STMT_OPEN = '{%';
const COMMENT_OPEN = '{#';
const EXPR_CLOSE = '}}';
const STMT_CLOSE = '%}';
const COMMENT_CLOSE = '#}';

/** Returns the relative index of `close` starting at `from`, or -1 if not found (quote-aware). */
function findClosing(src: string, from: number, close: string): number {
  const n = src.length;
  let i = from;
  while (i < n) {
    const c = src[i];
    if (c === "'" || c === '"') {
      const q = c;
      i += 1;
      while (i < n && src[i] !== q) {
        if (src[i] === '\\' && i + 1 < n) i += 2;
        else i += 1;
      }
      if (i < n) i += 1; // consume closing quote
      continue;
    }
    if (src.startsWith(close, i)) return i - from;
    i += 1;
  }
  return -1;
}

export function splitTemplate(template: string): TemplateSegment[] {
  const segments: TemplateSegment[] = [];
  const n = template.length;
  let i = 0;

  while (i < n) {
    // Accumulate literal text up to the next tag opener.
    const textStart = i;
    while (
      i < n &&
      !template.startsWith(EXPR_OPEN, i) &&
      !template.startsWith(STMT_OPEN, i) &&
      !template.startsWith(COMMENT_OPEN, i)
    ) {
      i += 1;
    }
    if (i > textStart) {
      segments.push({ type: 'text', content: template.slice(textStart, i), start: textStart, end: i });
    }
    if (i >= n) break;

    let type: TemplateSegmentType;
    let close: string;
    if (template.startsWith(EXPR_OPEN, i)) {
      type = 'expr';
      close = EXPR_CLOSE;
    } else if (template.startsWith(STMT_OPEN, i)) {
      type = 'stmt';
      close = STMT_CLOSE;
    } else {
      type = 'comment';
      close = COMMENT_CLOSE;
    }

    const contentStart = i + 2; // skip the 2-char opener
    const closeRel = findClosing(template, contentStart, close);
    if (closeRel === -1) {
      // Unterminated tag: treat the remainder as literal text so nothing is lost.
      segments.push({ type: 'text', content: template.slice(textStart), start: textStart, end: n });
      i = n;
      break;
    }
    const contentEnd = contentStart + closeRel;
    segments.push({
      type,
      content: template.slice(contentStart, contentEnd),
      start: i,
      end: contentEnd + close.length,
    });
    i = contentEnd + close.length;
  }

  return segments;
}
