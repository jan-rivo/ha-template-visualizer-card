# Release 1.0 checklist — Template Visualizer Card

Tracking doc for the 1.0 release. Update the `Status` field as items land.
Statuses: `pending` → `in_progress` → `done` (or `dropped` with a reason).

## A. Quality — required before 1.0

| # | Item | Status | Notes |
|---|------|--------|-------|
| A1 | Rewrite README (current features, config-options table, corrected supported-subset incl. `{% if %}`/`{% set %}`, fresh light+dark screenshots; keep "Important limitation") | done | Shipped as `v1.0.0-beta.3`. Decisions 2026-09-06: renamed to "Template Visualizer", concise HACS-user-first rewrite, Limitations/Supported-templates sections dropped per review. Screenshots as plain relative markdown links (HACS renderer chokes on tables/`<picture>`) |
| A2 | Reconcile `docs/parser-expansion-plan.md` with shipped v0.3 (update status or archive it) | done | Deleted the plan per 2026-09-07 review (Phases 1–2 shipped, 3–4 unbuilt); unsupported constructs now covered by a short "Not broken down" section in the README |
| A3 | Replace stale `docs/screenshot-1.png` with current screenshots | done | Deleted `screenshot-1.png`; README now uses `docs/screenshot-light.png` + `docs/screenshot-dark.png` (Relax-mode hero shots). No stale refs remain outside this tracker |
| A4 | Remove no-op `this.draft = this.draft;` in `src/card.ts` (`saveDraft`) | done | Removed; `this.templateText = this.draft` already keeps the baseline. Typecheck clean, 88/88 tests pass, `dist/` rebuilt |
| A5 | Finalize screenshots for release (verify both render in HACS on the final version; keep plain relative markdown links) | pending | HACS renderer does not handle tables/`<picture>` — see beta.1–beta.3 history |

## B. Quality — strongly recommended, not blocking

| # | Item | Status | Notes |
|---|------|--------|-------|
| B1 | Start a CHANGELOG (Added/Changed/Fixed per release, from 1.0.0) | pending | |
| B2 | Get native-speaker review of translations (`de/es/fr/it/nl/nb/nn` in `src/i18n/languages/`) | pending | Keys are TS-enforced; quality unverified |
| B3 | Subscription-count guard (surface warning when leaf/output count exceeds ~20) | done | Implemented 2026-09-07 as admin-only `tpl-warning` above 30 subs (`SUBSCRIPTION_WARNING_LIMIT` + `shouldWarnForSubscriptionCount` in `src/card.ts`, `card.too_many_subscriptions` i18n key in all 8 langs — non-English values are English placeholders for B2 to review; `test/subscription-warning.test.ts` 4 tests). Cap raised 20→30 per review. Screenshot signed off (admin shows warning, viewer + small templates don't) |
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
| 2026-09-07 | Review feedback applied: dropped Limitations/Supported-templates sections; renamed `showReferences` → `showStateValues` (code + editor + i18n keys, deprecated fallback kept); new Relax-mode screenshots side-by-side with absolute raw URLs (superseded: HACS needs plain relative links, fixed in beta.3). Publishing `v1.0.0-beta.2`. |
| 2026-09-07 | A1 marked done after `v1.0.0-beta.3` (plain relative screenshot links like v0.3 restored — tables were what broke HACS rendering). Added A5 to finalize screenshots at release time. |
| 2026-09-07 | A3 done (`screenshot-1.png` deleted, replaced by light/dark Relax-mode shots), A4 done (no-op removed, typecheck + 88/88 green, dist rebuilt). |
| 2026-09-07 | A2 done: deleted `docs/parser-expansion-plan.md`; README gained a concise "Not broken down" section listing unstructured constructs (`for`/`macro`/`filter`/`call`/`namespace`, multi-output mixes). |
| 2026-09-07 | B3 done: admin-only subscription warning above 30 subs implemented, tested (92/92), screenshot-signed-off. |
