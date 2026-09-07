# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Admin-only warning when a template opens more than 30 live subscriptions.
- `showStateValues` card option (`showReferences` still honored as a deprecated
  fallback).
- "Not broken down" README section listing template constructs that render as
  a single live result instead of a tree.

### Changed

- Card renamed to Template Visualizer (picker, HACS title, README).
- README rewritten: concise, HACS-first, with new Relax-mode screenshots.

### Fixed

- Removed a no-op assignment in the template save flow.
