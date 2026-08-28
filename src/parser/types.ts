// Shared AST + token types for the lightweight boolean-expression parser.
// This is intentionally NOT a full Jinja/Python grammar. It supports the
// subset that covers the vast majority of Home Assistant template sensor
// "value_template" logic: and / or / not, comparisons, parentheses, and
// function-call / attribute-access leaves such as states('x'), is_state(...),
// state_attr(...), float(...), etc. Anything it can't confidently parse is
// treated as a single opaque leaf covering the whole expression, so the card
// degrades gracefully instead of crashing.

export type NodeKind = 'AND' | 'OR' | 'NOT' | 'LEAF';

export interface AstNode {
  kind: NodeKind;
  /** Exact source text of this node/subtree, used to re-render it via HA. */
  source: string;
  /** Child nodes for AND / OR (2+ for AND/OR chains) and NOT (exactly 1). */
  children?: AstNode[];
}

export type TokenType =
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'LPAREN'
  | 'RPAREN'
  | 'ATOM' // catch-all: identifiers, numbers, strings, function calls, comparisons handled as raw text
  | 'EOF';

export interface Token {
  type: TokenType;
  value: string;
  start: number;
  end: number;
}
