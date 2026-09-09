# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.0.1] - 2026-09-09

### Fixed

- Card stuck on "Setting up live subscriptions…" in masonry views: a detach during the template fetch aborted setup via `disconnectedCallback` without ever restarting it, so no `render_template` subscription was ever sent. The card now forces a fresh setup on every reconnect and also cleans up the overall template subscription on disconnect ([#5](https://github.com/jan-rivo/ha-template-visualizer-card/issues/5)).

## [1.0.0] - 2026-09-07

- Initial release.
