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
   own `{{ ... }}` template and rendered individually via Home Assistant's
   `render_template` WebSocket command (the same API HA's own developer
   tools template editor uses). AND/OR/NOT nodes are then evaluated
   bottom-up in JavaScript from the leaves' live results.
3. **Rendering** — a LitElement-based Lovelace card (`ha-template-editor-card`)
   displays the tree with green/red badges per node.

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
  parser.test.ts  unit tests for the parser subset
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

- Replace polling refresh with live WebSocket subscriptions per leaf so the
  tree updates instantly on state change instead of every 10s.
- Add a "paste template sensor entity_id, auto-fetch YAML" helper via a
  companion HA custom integration/service.
- Support `{% if %}/{% elif %}/{% else %}` branching sensors as a separate
  visualization mode (decision tree instead of boolean tree).
