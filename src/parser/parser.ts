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

export function parseBooleanTemplate(template: string): { ast: AstNode; fallback: boolean } {
  const expr = extractExpression(template);
  try {
    const parser = new Parser(expr);
    const ast = parser.parse();
    return { ast, fallback: false };
  } catch {
    // Graceful degradation: whole expression as one opaque leaf.
    return { ast: { kind: 'LEAF', source: expr }, fallback: true };
  }
}
