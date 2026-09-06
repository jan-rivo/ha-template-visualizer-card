// Shared AST + token types for the lightweight boolean-expression parser.
// This is intentionally NOT a full Jinja/Python grammar. It supports the
// subset that covers the vast majority of Home Assistant template sensor
// "value_template" logic: and / or / not, comparisons, parentheses, and
// function-call / attribute-access leaves such as states('x'), is_state(...),
// state_attr(...), float(...), etc. Anything it can't confidently parse is
// treated as a single opaque leaf covering the whole expression, so the card
// degrades gracefully instead of crashing.

export type NodeKind = 'AND' | 'OR' | 'NOT' | 'LEAF' | 'CONDITIONAL' | 'OUTPUT';

export interface ConditionalBranch {
  /** Parsed boolean condition subtree; undefined for the `else` branch. */
  condition?: AstNode;
  /**
   * Recursively parsed branch body. Plain template text becomes an OUTPUT
   * node (rendered live as a string); a body that is itself a single nested
   * conditional becomes a CONDITIONAL node.
   */
  body: AstNode;
  /** Raw source text of this branch (condition tag + body). */
  source: string;
}

export interface AstNode {
  kind: NodeKind;
  /** Exact source text of this node/subtree, used to re-render it via HA. */
  source: string;
  /** Child nodes for AND / OR (2+ for AND/OR chains) and NOT (exactly 1). */
  children?: AstNode[];
  /** Ordered branches for CONDITIONAL. */
  branches?: ConditionalBranch[];
  /**
   * For LEAF nodes: a `{% set ... %}` prelude that must be prepended to this
   * leaf's expression so referenced local variables (e.g. `threshold`) are
   * defined when HA renders it in isolation (Phase 1 "single-output" form).
   */
  preamble?: string;
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
