# Parser expansion plan (v0.3)

Status: accepted plan, not yet implemented. Work happens on the `v0.3` branch.

## Goal

Turn more real-world template-helper `value_template`s into a structured, live,
debuggable tree instead of falling back to a single opaque "couldn't fully
parse" leaf. We keep the architecture: **tokenizer -> AST -> per-node live HA
subscriptions -> truthiness**. HA does all value rendering; we only structure it.

## Current state (what already works)

- Single `{{ expr }}` with `and` / `or` / `not`, parens, comparison leaves
  (`states()`, `is_state()`, `state_attr()`, `float()`, etc.).
- Everything else -> one opaque leaf + `parse_fallback_warning` (graceful, no crash).

## Phase 1 - Statement-aware splitting + `{% set %}` prelude

Problem today: `{% set threshold = 10 %}{{ states('sensor.x') > threshold }}`
fails, because each leaf is rendered as an isolated `{{ (expr) }}` where
`threshold` is undefined.

- New scanner (`template-splitter`) that splits a template into top-level
  pieces: literal text, `{{ expr }}`, and `{% stmt %}` tags (quote/brace-aware,
  honors whitespace control `{%- -%}`).
- Single-output form `{% set ... %}* + {{ expr }}` -> keep existing boolean
  tree, but attach the *applicable* `{% set %}` preamble to each leaf
  subscription: `{{ set_preamble }}{{ (expr) }}`.
- Multi-output / control-flow forms get handed to Phase 2.

Acceptance: the `threshold` example renders correctly; existing
single-expression behavior is byte-for-byte unchanged; `default()` / `|d(...)`
leaves still work.

## Phase 2 - `{% if %} / elif / else` as a real node

Problem today: `{% if is_state('binary_sensor.guest','on') %}We have a guest{% else %}All clear{% endif %}`
is one opaque leaf.

- New AST kind `CONDITIONAL` with ordered branches: each branch = a boolean
  `condition` (parsed by the existing grammar, recursively) + a `body`
  (arbitrary template text, recursively parsed: `{{ }}`, nested `{% if %}`).
- `EvaluatedNode` gains a branch shape: per-branch condition tree (true/false
  badges), each branch body evaluated live, and a marker for **which branch
  fired** (first true condition, else-branch otherwise).
- Humanize: "If 'Guest mode is on' -> We have a guest" style rows.

Acceptance: if/elif/else, nested ifs, `{%- -%}` whitespace control, comments
`{# #}` all behave; the fired branch is always the one HA would output.

## Phase 3 - Lenient fallback ("second-chance" parse)

Problem today: any strict-parse failure = fully opaque leaf.

- On strict-parse failure, run a lenient pass that still splits top-level
  `and` / `or` / `not` / parens / tag boundaries quote-aware, recursing with
  full-catch so each operand becomes an opaque leaf.
- Top-level structure is almost always recoverable.

Acceptance: multi-line, mixed `{{ }}` + operators, slightly malformed templates
that currently show one big leaf now show a tree with per-operand true/false.
Truly opaque templates (e.g. `for` loops) still degrade to the single leaf +
warning.

## Phase 4 - References + humanize upgrades

- Keep the raw-template references scan (it's already separate and fine); add
  dot-access highlight (`states('x').state`) and "local variable used" chips.
- Humanize Conditional rows; reuse existing leaf humanizing for branch conditions.
- Add i18n strings for the new node labels.

## Phase 5 - Tests, docs, release

- Test targets: splitter, prelude rendering, if/elif/else evaluation, lenient
  mode, whitespace control, nested constructs (suite grows well beyond current 49).
- README: supported-syntax matrix + explicit limitations.
- Same HACS pipeline: v0.3 betas on this branch -> merge + stable release.

## Non-goals (documented, not built)

- A Jinja/Python interpreter - HA still computes all values.
- `{% for %}` loops (would need collection iteration semantics) - future candidate.
- Recomputing values in the AST; we stay push-driven via WS subscriptions.

## Risks / mitigations

- **WS subscription count**: more nodes = more `render_template` subscriptions.
  Mitigate with a cap (~50 leaves) that falls back to structured-but-collapsed
  rendering with a notice.
- **Splitter correctness** with nested braces/quotes -> dedicated scanner +
  heavy tests before any UI work.
- Whitespace-control and comment edge cases are the most likely bug source ->
  covered explicitly in Phase 1/2 acceptance tests.

## Sequencing

Phases 1 -> 2 -> 3 are the value; 4 rides along; 5 ships it. Commit and
beta-release after each phase (the `v*` workflow trigger already runs CI +
HACS validation on push).