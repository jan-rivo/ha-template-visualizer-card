# Template Visualizer (Home Assistant custom card)

[![Validate](https://github.com/jan-rivo/ha-template-visualizer-card/actions/workflows/validate.yml/badge.svg)](https://github.com/jan-rivo/ha-template-visualizer-card/actions/workflows/validate.yml)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

See *why* your template sensor outputs what it outputs. Template Visualizer
parses a Template Helper's Jinja logic and renders it as a live tree — every
condition badged ✓/✗ against your real entity states, updating instantly when
anything changes.

| Light — without the Edit button | Dark — with the Edit button |
|---|---|
| ![Relax mode card in light theme, no Edit template button](docs/screenshot-light.png) | ![Relax mode card in dark theme, with Edit template button](docs/screenshot-dark.png) |

- **Live logic tree** — `{% if %}` / `{% elif %}` / `{% else %}` branches and
  `and` / `or` / `not` conditions, each with a live pass/fail badge and its
  current rendered value. No polling: every value is a push subscription.
- **Edit in place** (admins) — tweak the template right on the card with a
  live-updating preview, then save straight back to the helper.
- **State values panel** — every entity the template reads, with friendly
  name, icon and current value.
- **Zero config drift** — point the card at a helper; it reads the helper's
  actual template itself. Nothing to paste or keep in sync.

## Requirements

Works with entities created via **Settings → Devices & Services → Helpers →
Template** (UI-based Template Helpers). YAML-defined `template:` sensors are
not supported — Home Assistant exposes no API to read their definition, so
there is nothing for the card to visualize.

## Installation

### HACS (recommended)

1. In Home Assistant, go to **HACS → top-right menu → Custom repositories**,
   add this repository's URL as a **Dashboard** repository.
2. Install **Template Visualizer** from HACS (enable *Show beta versions* for
   pre-releases). HACS adds the Lovelace resource automatically.

### Manual

1. Copy `dist/ha-template-visualizer-card.js` into your HA `www/` folder and
   add it as a Lovelace resource:
   ```yaml
   resources:
     - url: /local/ha-template-visualizer-card.js
       type: module
   ```

## Usage

Add the card (**Add Card → Template Visualizer**) and pick a Template Helper
— or configure it in YAML:

```yaml
type: custom:ha-template-visualizer-card
title: Relax mode
entity: binary_sensor.relax_mode
```

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | — | **Required.** A UI-created Template Helper entity. |
| `title` | string | `Template logic` | Card header title. |
| `icon` | string | `mdi:ab-testing` | Card header icon. |
| `showCode` | boolean | `false` | Show raw template code instead of human-readable conditions. |
| `showStateValues` | boolean | `true` | Show the State values panel. |
| `showHeader` | boolean | `true` | Show the header icon + title. |
| `showEditButton` | boolean | `true` | Show the Edit template button (admin users only). |

## Not broken down

`{% for %}` loops, `{% macro %}`, `{% filter %}`, `{% call %}`,
`{% namespace %}` and similar are not visualized branch-by-branch — nor are
templates that mix several `{{ ... }}` outputs with literal text outside an
`{% if %}` structure. Those still work: the card shows them as a single
live-evaluated result instead of a sub-condition tree.

## Contributing

Issues and pull requests are welcome — please include your Home Assistant
version and the template text when reporting a bug.

```bash
npm install
npm run build      # bundles to dist/ha-template-visualizer-card.js
npm run typecheck
npm test           # unit tests (node:test via tsx)
```

`dist/` is committed: run `npm run build` before pushing (CI fails otherwise).

## Acknowledgments

This card was developed with AI assistance.

## License

[MIT](LICENSE)
