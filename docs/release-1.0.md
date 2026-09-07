# Release 1.0 checklist — Template Visualizer Card

Tracking doc for the 1.0 release. Update the `Status` field as items land.
Statuses: `pending` → `in_progress` → `done` (or `dropped` with a reason).

## A. Quality — required before 1.0

| # | Item | Status | Notes |
|---|------|--------|-------|
| A1 | Rewrite README (current features, config-options table, corrected supported-subset incl. `{% if %}`/`{% set %}`, fresh light+dark screenshots; keep "Important limitation") | in_progress | `hacs.json` has `render_readme: true` — README is the HACS storefront. Decisions 2026-09-06: rename to "Template Visualizer" (README + picker + HACS title), harness mock screenshots, concise HACS-user-first rewrite, full draft for review |
| A2 | Reconcile `docs/parser-expansion-plan.md` with shipped v0.3 (update status or archive it) | pending | Currently claims "Phases 2-5 not yet started" |
| A3 | Replace stale `docs/screenshot-1.png` with current screenshots | pending | Harness: `/tmp/opencode/shots/site/`, serve `:8099` |
| A4 | Remove no-op `this.draft = this.draft;` in `src/card.ts` (`saveDraft`) | pending | Then rebuild `dist/`, run typecheck + tests |

## B. Quality — strongly recommended, not blocking

| # | Item | Status | Notes |
|---|------|--------|-------|
| B1 | Start a CHANGELOG (Added/Changed/Fixed per release, from 1.0.0) | pending | |
| B2 | Get native-speaker review of translations (`de/es/fr/it/nl/nb/nn` in `src/i18n/languages/`) | pending | Keys are TS-enforced; quality unverified |
| B3 | Subscription-count guard (surface warning when leaf/output count exceeds ~20) | pending | `src/tree/evaluate.ts` — one sub per leaf, no cap today |
| B4 | Enable Dependabot (npm + GitHub Actions) | pending | |
| B5 | Add bug-report issue template (HA version + template text) | pending | |
| B6 | Branch protection on `main` (require CI) | pending | |
| B7 | Fill in GitHub About section/topics (`home-assistant`, `lovelace`, `hacs`) | pending | |
| B8 | Submit to HACS defaults (post-1.0, removes custom-repo step) | pending | Requires release + README + passing validation — all in place |

## C. Features — optional, post-1.0 unless stated

| # | Item | Status | Notes |
|---|------|--------|-------|
| C1 | Tap-to-inspect on State-values rows (`hass-more-info` dialog) | pending | ~10 lines in `src/components/references-panel.ts` |
| C2 | Read-only whole-template source view for non-admin viewers | pending | Admins already see source in edit mode |
| C3 | Collapse/expand for large trees | pending | Explicitly 1.x scope, not 1.0 |
| C4 | Document out-of-scope items in README (YAML sensors, `{% for %}` structuring, multi-entity cards, trigger-based helpers) | pending | Could fold into A1 |

## D. Release steps (when A is done)

| # | Item | Status | Notes |
|---|------|--------|-------|
| D1 | Rebuild `dist/`, full `npm run typecheck` + `npm test` + CI green | pending | CI enforces fresh `dist/` |
| D2 | Bump `package.json` to `1.0.0`, commit, push release branch | pending | |
| D3 | Merge release branch to `main` (`--no-ff`, message `Merge branch '<branch>' (v1.0.0 release)`) | pending | Same pattern as v0.2/v0.3 merges |
| D4 | Publish `v1.0.0` GitHub release (`prerelease: false`), verify CI | pending | `curl` with token from `/tmp/opencode/token.env` |

## Log

| Date (UTC) | Event |
|------------|-------|
| 2026-09-06 | Checklist created from 1.0 readiness review of v0.3.0 (`0a1c845` on `main`). Baseline: typecheck clean, 88/88 tests green. |
| 2026-09-07 | A1 in progress on `v1.0`: README rewritten (concise, HACS-first), card renamed to "Template Visualizer" (`src/index.ts`, `hacs.json`), fresh light/dark screenshots. Published `v1.0.0-beta.1` prerelease for HACS README review. |
