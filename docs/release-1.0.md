# Release 1.0 plan — Template Visualizer Card

Remaining work, in order. Statuses: `pending` → `in_progress` → `done`
(or `dropped` with a reason).

## 1. Finalize screenshots + tree formatting (A5)

| Status | Notes |
|--------|-------|
| pending | Tree formatting awaiting sign-off: dampened palette (approved) + OUTPUT dedupe — static bodies render once, interpolated bodies keep `template → result` (prototype shots: `output-relax.png`, `output-movie.png`). Then: remove dead `.tpl-node__value-icon` CSS, run tests, rebuild `dist/`, regenerate Relax-mode light/dark heroes from the final bundle, verify both render in HACS on the release candidate. Keep plain relative markdown links — tables/`<picture>` break HACS rendering (beta.1–beta.3 history) |

## 2. Final CHANGELOG (A6)

| Status | Notes |
|--------|-------|
| pending | Do once fully ready to release: rename `[Unreleased]` to `[1.0.0]` with date, complete Added/Changed/Fixed entries covering everything since v0.3.0. Draft sketched in chat 2026-09-07, awaiting review |

## 3. Release (D1–D4)

| # | Item | Status | Notes |
|---|------|--------|-------|
| D1 | Rebuild `dist/`, full `npm run typecheck` + `npm test` + CI green | pending | CI enforces fresh `dist/` |
| D2 | Bump `package.json` to `1.0.0`, commit, push release branch | pending | |
| D3 | Merge release branch to `main` (`--no-ff`, message `Merge branch '<branch>' (v1.0.0 release)`) | pending | Same pattern as v0.2/v0.3 merges |
| D4 | Publish `v1.0.0` GitHub release (`prerelease: false`), verify CI | pending | `curl` with token from `/tmp/opencode/token.env` |

## Post-1.0

- **B8 (pending)** — Submit to HACS defaults (needs the stable release to exist; ~15 min forms + maintainer review wait).

## Done (v1.0 work so far)

- **A1** — README rewritten (concise, HACS-first); card renamed to Template Visualizer; Limitations/Supported-templates dropped; Relax-mode screenshots (shipped `v1.0.0-beta.3`).
- **A2** — Deleted stale `docs/parser-expansion-plan.md`.
- **A3** — Deleted stale `docs/screenshot-1.png`.
- **A4** — Removed `saveDraft` no-op.
- **B1** — `CHANGELOG.md` created.
- **B2** — Translation review (es tag bug, 7 stale hints, warning translations, fr/nb/nn fixes).
- **B3** — Admin-only subscription warning above 30 subs + tests.
- **B4** — Dependabot (weekly) + merge/release policy logged.
- **B5** — Bug-report issue template.
- **B6** — Branch protection on `main`.
- **B7** — About section/topics.

## Dropped

- **C1** — Tap-to-inspect State-values rows (skipped 2026-09-07).
- **C2/C3/C4** — Won't fix (source view for viewers, collapsing trees, extra scope docs).

## Log

| Date (UTC) | Event |
|------------|-------|
| 2026-09-06 | Checklist created from 1.0 readiness review of v0.3.0 (`0a1c845` on `main`). Baseline: typecheck clean, 88/88 tests green. |
| 2026-09-07 | v1.0 branch work: README rewrite, rename to Template Visualizer, `showReferences` → `showStateValues`, Relax-mode screenshots (`v1.0.0-beta.1` → `beta.2` → `beta.3`; plain relative links restored after tables broke HACS rendering). |
| 2026-09-07 | A2/A3/A4 done (plan + stale screenshot deleted, save no-op removed). Tree-format prototype: dampened palette approved, OUTPUT dedupe proposed. |
| 2026-09-07 | B1–B7 done (CHANGELOG, translations, subscription warning, Dependabot + policy, issue template, branch protection, About/topics). C2/C3/C4 dropped. |
| 2026-09-07 | C1 skipped. Tracker refactored to remaining work: screenshots + changelog + release. B8 stays post-1.0. |
