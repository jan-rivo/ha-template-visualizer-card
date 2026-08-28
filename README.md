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

### Important limitation

Home Assistant does not expose a template sensor's *source* Jinja through
its entity/state APIs — only the rendered value is available at runtime. So
this card takes the template text directly in the card config (copy it from
your `template:` YAML). A future enhancement could add a small backend
integration/API to expose configured templates automatically so you don't
have to paste them by hand.

## Project structure

```
src/
  parser/       tokenizer + recursive-descent parser -> AST (AND/OR/NOT/LEAF)
  tree/         evaluates an AST against a live `hass` object
  ha/           render_template WebSocket helper + truthiness rules
  components/   Lit template for rendering the tree
  card.ts       the Lovelace card (ha-template-editor-card)
  editor.ts     visual config editor (title / entity / template fields)
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
2. Add the card:
   ```yaml
   type: custom:ha-template-editor-card
   title: Alarm arm-ready logic
   entity: binary_sensor.alarm_ready        # optional: shows actual entity state too
   template: >
     {{ is_state('binary_sensor.front_door', 'off')
        and is_state('binary_sensor.back_door', 'off')
        and (states('sensor.house_mode') == 'away' or states('sensor.house_mode') == 'night') }}
   ```

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

- Add a "paste template sensor entity_id, auto-fetch YAML" helper via a
  companion HA custom integration/service.
- Support `{% if %}/{% elif %}/{% else %}` branching sensors as a separate
  visualization mode (decision tree instead of boolean tree).
