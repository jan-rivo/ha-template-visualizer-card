// Recursive-descent parser turning tokens into an AND/OR/NOT/LEAF tree.
//
// Grammar (lowest to highest precedence):
//   expr    := or_expr
//   or_expr := and_expr ("or" and_expr)*
//   and_expr:= not_expr ("and" not_expr)*
//   not_expr:= "not" not_expr | primary
//   primary := "(" expr ")" | ATOM
//
// Any parse failure falls back to a single LEAF covering the whole input,
// so the UI never hard-crashes on templates outside this subset.
import { tokenize } from './tokenizer';
import { splitTemplate, type TemplateSegment } from './template-splitter';
import type { AstNode, Token } from './types';

class Parser {
  private tokens: Token[];
  private pos = 0;
  private src: string;

  constructor(src: string) {
    this.src = src;
    this.tokens = tokenize(src);
  }

  private peek(): Token {
    return this.tokens[this.pos];
  }

  private advance(): Token {
    return this.tokens[this.pos++];
  }

  private sourceBetween(startTok: Token, endTok: Token): string {
    return this.src.slice(startTok.start, endTok.end).trim();
  }

  parse(): AstNode {
    const node = this.parseOr();
    if (this.peek().type !== 'EOF') {
      throw new Error(`Unexpected token '${this.peek().value}' at position ${this.peek().start}`);
    }
    return node;
  }

  private parseOr(): AstNode {
    const startTok = this.peek();
    const children = [this.parseAnd()];
    while (this.peek().type === 'OR') {
      this.advance();
      children.push(this.parseAnd());
    }
    if (children.length === 1) return children[0];
    const endTok = this.tokens[this.pos - 1];
    return { kind: 'OR', source: this.sourceBetween(startTok, endTok), children };
  }

  private parseAnd(): AstNode {
    const startTok = this.peek();
    const children = [this.parseNot()];
    while (this.peek().type === 'AND') {
      this.advance();
      children.push(this.parseNot());
    }
    if (children.length === 1) return children[0];
    const endTok = this.tokens[this.pos - 1];
    return { kind: 'AND', source: this.sourceBetween(startTok, endTok), children };
  }

  private parseNot(): AstNode {
    if (this.peek().type === 'NOT') {
      const notTok = this.advance();
      const child = this.parseNot();
      return { kind: 'NOT', source: `not ${child.source}`, children: [child] };
    }
    return this.parsePrimary();
  }

  private parsePrimary(): AstNode {
    const tok = this.peek();
    if (tok.type === 'LPAREN') {
      this.advance();
      const inner = this.parseOr();
      const closing = this.peek();
      if (closing.type !== 'RPAREN') {
        throw new Error(`Expected ')' at position ${closing.start}`);
      }
      this.advance();
      // Preserve the parentheses in the node's source so that re-rendering via
      // HA keeps the same operator precedence (e.g. `not (a and b)` must stay
      // `not (a and b)`, not become `not a and b`).
      return { ...inner, source: this.sourceBetween(tok, this.tokens[this.pos - 1]) };
    }
    if (tok.type === 'ATOM') {
      this.advance();
      return { kind: 'LEAF', source: tok.value };
    }
    throw new Error(`Unexpected token '${tok.value}' at position ${tok.start}`);
  }
}

/**
 * Strips the outer `{{ }}` (and optional single-line `{% if %}` forms are
 * NOT supported by this subset) and returns the trimmed expression text.
 */
export function extractExpression(template: string): string {
  const trimmed = template.trim();
  const match = trimmed.match(/^\{\{\s*([\s\S]*?)\s*\}\}$/);
  if (match) return match[1].trim();
  return trimmed;
}

export function parseBooleanTemplate(template: string): { ast: AstNode; fallback: boolean; preamble?: string } {
  const segments = splitTemplate(template);
  const singleOutput = detectSingleOutput(segments, template);

  if (singleOutput) {
    // Single-output form: optional `{% set ... %}` prelude + one `{{ expr }}`.
    // Stamp the prelude onto every leaf so HA re-renders each leaf with its
    // local variables defined.
    try {
      const expr = singleOutput.expr;
      const parser = new Parser(expr);
      const ast = parser.parse();
      collectNodes(ast).forEach((node) => {
        if (node.kind === 'LEAF') node.preamble = singleOutput.preamble;
      });
      return { ast, fallback: false, preamble: singleOutput.preamble };
    } catch {
      // fall through to the legacy single-leaf fallback below
    }
  }

  // Phase 2: a top-level `{% if %}/{% elif %}/{% else %}/{% endif %}` block
  // (with optional `{% set %}` prelude) becomes a CONDITIONAL node.
  const conditional = detectConditional(segments, template);
  if (conditional) {
    return { ast: conditional, fallback: false, preamble: conditional.preamble };
  }

  // Legacy behavior (unchanged): strip `{{ }}` if it wraps the whole input,
  // then either parse it or degrade to one opaque leaf.
  const expr = extractExpression(template);
  try {
    const parser = new Parser(expr);
    const ast = parser.parse();
    return { ast, fallback: false };
  } catch {
    return { ast: { kind: 'LEAF', source: expr }, fallback: true };
  }
}

interface SingleOutput {
  expr: string;
  preamble: string;
}

/**
 * Recognizes the Phase-1 "single-output" shape: any number of leading
 * `{% set ... %}` statements (the prelude), then exactly one `{{ expr }}`
 * output tag, with only whitespace text or comments in between. Returns the
 * trimmed expression and its prelude string, or undefined if the template is
 * not of this shape (e.g. multiple outputs, or control-flow tags).
 */
function detectSingleOutput(segments: TemplateSegment[], template: string): SingleOutput | undefined {
  let expr: TemplateSegment | undefined;
  const preludeSegs: TemplateSegment[] = [];
  let sawExpr = false;

  for (const seg of segments) {
    switch (seg.type) {
      case 'text':
        if (seg.content.trim() !== '') return undefined; // non-whitespace literal -> not single output
        break;
      case 'comment':
        break; // comments are value-neutral; allow them anywhere
      case 'stmt':
        if (sawExpr || !isSetStatement(seg.content)) return undefined;
        preludeSegs.push(seg);
        break;
      case 'expr':
        if (sawExpr) return undefined; // multiple outputs -> not single output
        sawExpr = true;
        expr = seg;
        break;
    }
  }

  if (!expr) return undefined; // no output tag at all (pure text/set-only template)

  const preamble = preludeSegs.map((seg) => template.slice(seg.start, seg.end)).join(' ');
  return { expr: expr.content.trim(), preamble };
}

/**
 * Strips Jinja whitespace-control markers (`-`, e.g. `{%- if x -%}`) plus
 * surrounding whitespace from a `{% ... %}` statement's inner content, so a
 * control keyword like `if` is matched regardless of `-` trimming hints.
 */
export function normalizeStmtContent(content: string): string {
  return content.replace(/^[\s-]+/, '').replace(/[\s-]+$/, '').trim();
}

/** Whether a `{% ... %}` statement content is a `{% set %}` assignment. */
function isSetStatement(content: string): boolean {
  return /^\s*set\b/i.test(content);
}

/** Collects every node in the tree, in document order. */
function collectNodes(node: AstNode, out: AstNode[] = []): AstNode[] {
  out.push(node);
  for (const child of node.children ?? []) collectNodes(child, out);
  for (const branch of node.branches ?? []) {
    if (branch.condition) collectNodes(branch.condition, out);
    collectNodes(branch.body, out);
  }
  return out;
}

/** Whether a `{% ... %}` statement content starts with `if` (top-level keyword). */
function isIfStatement(content: string): boolean {
  return /^\s*if\b/i.test(normalizeStmtContent(content));
}

/** Whether a `{% ... %}` statement content starts with `elif` / `else if`. */
function isElifStatement(content: string): boolean {
  const c = normalizeStmtContent(content);
  return /^\s*elif\b/i.test(c) || /^\s*else\s+if\b/i.test(c);
}

/** Whether a `{% ... %}` statement content starts with `else` (bare). */
function isElseStatement(content: string): boolean {
  const c = normalizeStmtContent(content);
  return /^\s*else\b/i.test(c) && !isElifStatement(content);
}

/** Whether a `{% ... %}` statement content starts with `endif`. */
function isEndifStatement(content: string): boolean {
  return /^\s*endif\b/i.test(normalizeStmtContent(content));
}

/**
 * Detects a top-level `{% if %}` block that:
 *  - is preceded only by `{% set %}` statements / whitespace / comments, and
 *  - extends to the end of the template (modulo trailing whitespace/comments).
 * If found, produces a CONDITIONAL AstNode (recursively parsing nested
 * conditionals in branch bodies); otherwise returns undefined.
 */
function detectConditional(
  segments: TemplateSegment[],
  template: string
): AstNode | undefined {
  let ifIdx = -1;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (seg.type === 'stmt' && isIfStatement(seg.content)) {
      ifIdx = i;
      break;
    }
    // Only set statements / whitespace / comments are allowed before the if.
    if (seg.type === 'stmt' && !isSetStatement(seg.content)) return undefined;
    if (seg.type === 'expr') return undefined;
    if (seg.type === 'text' && seg.content.trim() !== '') return undefined;
    if (seg.type === 'comment') continue;
  }
  if (ifIdx === -1) return undefined;

  // Only trailing whitespace/comments allowed after the matching {% endif %}.
  const endifIdx = findEndif(segments, ifIdx);
  if (endifIdx === -1) return undefined;
  for (let i = endifIdx + 1; i < segments.length; i++) {
    const seg = segments[i];
    if (seg.type === 'text') {
      if (seg.content.trim() !== '') return undefined;
      continue;
    }
    if (seg.type === 'comment') continue;
    return undefined;
  }

  const preambleSegs = segments.slice(0, ifIdx).filter((s) => s.type === 'stmt');
  const preamble = preambleSegs.map((s) => template.slice(s.start, s.end)).join(' ');

  const node = parseConditionalBlock(ifIdx, endifIdx, segments, template, preamble);
  stampPreamble(node, preamble);
  return node;
}

/**
 * Finds the index of the `{% endif %}` that closes the `{% if %}` at
 * `startIdx`, respecting nesting (a nested `{% if %}` bumps depth). Returns
 * -1 if the block is unbalanced.
 */
function findEndif(segments: TemplateSegment[], startIdx: number): number {
  let depth = 0;
  for (let i = startIdx; i < segments.length; i++) {
    const seg = segments[i];
    if (seg.type !== 'stmt') continue;
    if (isIfStatement(seg.content)) depth += 1;
    else if (isEndifStatement(seg.content)) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/**
 * Parses segments[ifIdx..endifIdx] (the whole `{% if %}...{% endif %}` block)
 * into a CONDITIONAL AstNode. Splits the block into ordered branches at
 * top-level `{% elif %}` / `{% else %}` boundaries (nested ifs stay inside a
 * branch body), parses each condition with the boolean grammar, and
 * recursively parses each body (which may itself be a nested conditional).
 */
function parseConditionalBlock(
  ifIdx: number,
  endifIdx: number,
  segments: TemplateSegment[],
  template: string,
  preamble: string
): AstNode {
  // Branch boundaries: each top-level elif/else tag plus the final endif.
  interface Range {
    conditionContent?: string; // absent for else
    bodyStart: number; // char offset of the body start
    bodyEnd: number; // char offset of the body end
  }
  const ranges: Range[] = [];
  let depth = 0;
  let current: Range | undefined;

  // Helper to initialise a branch whose body starts right after a tag.
  const initRange = (condContent: string | undefined, tagEndIdx: number): Range => ({
    conditionContent: condContent,
    bodyStart: segments[tagEndIdx].end,
    bodyEnd: template.length,
  });

  for (let i = ifIdx; i <= endifIdx; i++) {
    const seg = segments[i];
    if (seg.type !== 'stmt') continue;
    const content = seg.content;
    if (isIfStatement(content)) {
      if (depth === 0) {
        current = initRange(extractCond(content), i);
        ranges.push(current);
      }
      depth += 1;
    } else if (isEndifStatement(content)) {
      depth -= 1;
      if (depth === 0 && current) {
        current.bodyEnd = seg.start;
      }
    } else if (isElifStatement(content) || isElseStatement(content)) {
      if (depth === 1) {
        if (current) current.bodyEnd = seg.start;
        current = initRange(isElseStatement(content) ? undefined : extractCond(content), i);
        ranges.push(current);
      }
    }
  }

  const branches = ranges.map((r) => {
    const bodyText = template.slice(r.bodyStart, r.bodyEnd).trim();
    let condition: AstNode | undefined;
    if (r.conditionContent !== undefined) {
      condition = parseConditionBoolean(r.conditionContent);
      stampPreamble(condition, preamble);
    }
    const body = parseBody(bodyText);
    return {
      condition,
      body,
      source: template.slice(segments[ifIdx].start, segments[endifIdx].end),
    };
  });

  return {
    kind: 'CONDITIONAL',
    source: template.slice(segments[ifIdx].start, segments[endifIdx].end),
    branches,
    preamble,
  };
}

/** Extracts the trimmed condition expression from an `{% if X %}` tag content. */
function extractCond(content: string): string {
  return normalizeStmtContent(content).replace(/^(if|elif)\b/i, '').trim();
}

/** Parses a condition expression using the boolean grammar (single leaf on failure). */
function parseConditionBoolean(cond: string): AstNode {
  try {
    const parser = new Parser(cond);
    return parser.parse();
  } catch {
    return { kind: 'LEAF', source: cond };
  }
}

/**
 * Parses a conditional branch body. If the body is exactly one nested
 * conditional block (nothing but a `{% if %}...{% endif %}`), it becomes a
 * CONDITIONAL node (so nested ifs are structured). Otherwise it becomes an
 * OUTPUT node that renders the raw body text live.
 */
function parseBody(bodyText: string): AstNode {
  if (bodyText.trim() === '') {
    return { kind: 'OUTPUT', source: '' };
  }
  const bodySegs = splitTemplate(bodyText.trim());
  const nested = detectConditional(bodySegs, bodyText.trim());
  if (nested) {
    return nested;
  }
  return { kind: 'OUTPUT', source: bodyText };
}

/** Recursively stamps a prelude onto every renderable node (LEAF, OUTPUT) in a subtree. */
function stampPreamble(node: AstNode, preamble: string): void {
  collectNodes(node).forEach((n) => {
    if (n.kind === 'LEAF' || n.kind === 'OUTPUT') n.preamble = preamble;
  });
}
