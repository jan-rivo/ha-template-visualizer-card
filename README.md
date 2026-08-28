# Template Logic Editor (Home Assistant custom card)

Visualizes a Home Assistant template sensor's boolean logic as an indented
tree, showing which sub-conditions are currently `true`/`false` against your
live entities, and why the overall result comes out the way it does.

## Why

Home Assistant template sensors built from long `and`/`or`/`not` chains are
easy to write but hard to debug — you only see the final `on`/`off`, not
which leg of the condition is failing. This card parses the boolean
structure of your template and renders every AND/OR/NOT node plus every leaf
condition (e.g. `is_state('binary_sensor.door','on')`) with a live pass/fail
indicator and its current rendered value.

## How it works

1. **Parsing** — a small hand-written recursive-descent parser (see
   `src/parser/`) extracts the boolean tree (`AND` / `OR` / `NOT` / leaf
   comparisons) from the `{{ ... }}` template text. It intentionally
   supports a *subset* of Jinja (boolean logic, comparisons, function calls
   like `states()`, `is_state()`, `state_attr()`, `float()`, etc. as opaque
   leaves) rather than reimplementing all of Jinja. Anything it can't
   confidently parse degrades gracefully to a single leaf covering the
   whole expression.
2. **Live evaluation** — each leaf's exact source text is re-wrapped as its
   own `{{ ... }}` template and subscribed to individually via Home
   Assistant's `render_template` WebSocket command (the same one HA's own
   developer tools template editor uses). This is a genuine push
   subscription: HA tracks which entities each leaf depends on and pushes a
   new value only when one of them actually changes - there is no polling
   anywhere in this card. AND/OR/NOT nodes are recomputed bottom-up in JS
   every time any leaf pushes an update.
3. **Rendering** — a LitElement-based Lovelace card (`ha-template-editor-card`)
   displays the tree with green/red badges per node, plus a **Referenced
   entities & attributes** table below it: every `states()`, `is_state()`,
   `state_attr()`, and `is_state_attr()` call found anywhere in the template
   (via a separate regex-based scan of the full text, not just the parsed
   boolean subset) is deduped down to one row per entity/attribute pair and
   shown with its live current value straight from `hass.states` - so you can
   see exactly what data the template is working with, even for parts of the
   template the boolean-tree parser couldn't structure.
4. **Auto-sync with the real template** — you pick an entity (via a native
   `<ha-entity-picker>`, filtered to Template Helper entities), and the card
   fetches that helper's actual template text itself (see
   `src/ha/template-source.ts`) instead of you pasting it. There is nothing
   to keep in sync manually.

### Important limitation

This card **only supports entities created via Settings > Devices &
Services > Helpers > Template** (the UI-based "Template" helper), not
YAML-defined `template:` sensors. Home Assistant doesn't expose a config
entry's stored options through any documented, stable public API (this is
deliberate - entries can hold secrets), so we reuse the same semi-internal
mechanism HA's own "edit helper" dialog uses: starting that helper's config
entry *options flow* and reading the `suggested_value` it returns for the
template field, then immediately discarding the flow. This is not a
documented API, so it can break across Home Assistant versions - if that
happens, the card will show a clear error rather than silently failing.
YAML-defined template sensors have no config entry at all, so there's no
equivalent for them and they are out of scope for this project - this card
only ever supports UI-created Template Helpers.

## Project structure

```
src/
  parser/       tokenizer + recursive-descent parser -> AST (AND/OR/NOT/LEAF)
                plus the states()/is_state()/state_attr() reference extractor
  tree/         builds a live, subscription-backed evaluated tree from an AST
  ha/           hass types, entity registry lookup, template-source fetcher,
                render_template WebSocket helper + truthiness rules
  components/   Lit templates for rendering the tree and references panel
  card.ts       the Lovelace card (ha-template-editor-card)
  editor.ts     visual config editor (title field + <ha-entity-picker>)
  index.ts      registers the card with Lovelace's custom card picker
test/
  parser.test.ts      unit tests for the boolean-expression parser subset
  references.test.ts  unit tests for the states()/is_state()/state_attr() reference extractor
```

## Development

```powershell
npm install
npm run build     # bundles to dist/ha-template-editor-card.js
npm run watch      # rebuild on change
npm run typecheck
npm test           # parser unit tests (node:test via tsx)
```

## Using the card

1. Copy `dist/ha-template-editor-card.js` into your HA `www/` folder (or
   install via HACS once published as a custom repository), and add it as a
   Lovelace resource:
   ```yaml
   resources:
     - url: /local/ha-template-editor-card.js
       type: module
   ```
2. Add the card and pick a Template Helper entity, either via the visual
   editor (Add Card > Template Logic Editor) or YAML:
   ```yaml
   type: custom:ha-template-editor-card
   title: Alarm arm-ready logic
   entity: binary_sensor.alarm_ready   # must be a UI-created Template Helper
   ```
   That's it - no template text to paste. The card fetches the helper's
   actual template definition itself and stays in sync automatically.

## Supported template subset

- `and`, `or`, `not`, parentheses for grouping
- Comparisons (`==`, `!=`, `<`, `>`, `<=`, `>=`) treated as opaque leaves
- Function calls as leaves: `states(...)`, `is_state(...)`, `state_attr(...)`,
  `is_state_attr(...)`, `float(...)`, `int(...)`, attribute chains, etc.
- String literals containing the words "and"/"or"/"not" are handled
  correctly (not mistaken for keywords)

Not supported (falls back to a single opaque leaf so the card still works,
just without the sub-tree breakdown): Jinja control flow (`{% if %}` /
`{% for %}`), filters/pipes as top-level operators, macros, multi-line
templates with statements outside a single boolean expression.

## Roadmap ideas

- Support `{% if %}/{% elif %}/{% else %}` branching sensors as a separate
  visualization mode (decision tree instead of boolean tree).
