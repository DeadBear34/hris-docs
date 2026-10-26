---
title: Versioning Policy
description: What HRIS version numbers mean and when each one changes.
---

# Versioning Policy

HRIS follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html). Every release has a version number in the form **`MAJOR.MINOR.PATCH`**, for example `0.7.1`.

```
   0   .   7   .   1
   │       │       └─ PATCH : backward-compatible bug fixes and security fixes
   │       └───────── MINOR : backward-compatible new features
   └───────────────── MAJOR : breaking changes
```

When a number increases, every number to its right resets to zero: `0.7.1` → new feature → `0.8.0`.

## Which number to increase

| Change | Example in HRIS | Version |
| --- | --- | --- |
| **Fix**: a bug is fixed | The HR leave summary did not list every request; refunds were wrong after a leave type changed | PATCH |
| **Security**: a vulnerability is fixed without changing usage | Node.js upgrade for CVE-2026-111497; vulnerable dependencies upgraded | PATCH |
| **Feature**: new, backward-compatible functionality | Line manager preview; organization chart; Redis sessions | MINOR |
| **Compatible behavior change** | Per-department concurrent leave limit (empty means no limit) | MINOR |
| **Breaking change**: existing usage stops working | `POST /positions` requires `department_id`; a field is removed or renamed | MAJOR (MINOR while `0.x`) |
| **No release needed** | README updates, comments, refactoring without behavior changes, tests | — |

### Initial development (`0.x`)

HRIS is still in initial development. While the major version is `0`, breaking changes increase the **MINOR** number. Release 0.7.0 is an example: positions now require a unit, which they did not before.

Version **`1.0.0`** will be released when HRIS is declared stable, after passing QA and receiving supervisor approval. From then on, every breaking change **must** increase the MAJOR number.

## Application version and API version

The application version (`0.7.1`) is independent of the API path version (`/api/v1`). The path moves to `/api/v2` only when a breaking change affects clients other than the HRIS web app. While the web app is the only client, breaking API changes are released under `/api/v1` and recorded in the application version and the [changelog](pathname:///changelog).

## Documentation versions

Documentation is frozen per **MINOR** version (`0.6.x`, `0.7.x`). Patch releases do not create a new documentation version because they do not change how HRIS is used; their changes are listed in the changelog.

| Version menu | Content |
| --- | --- |
| `0.7.x (latest)` | The version running in production |
| `0.6.x` | The previous version, no longer maintained |
| `Next (unreleased)` | Documentation for the release in progress |

## Supported versions

Only the latest MINOR version receives fixes. Older versions remain documented for reference.

| Version | Status |
| --- | --- |
| 0.7.x | Supported |
| 0.6.x and earlier | Unsupported |

## Commit conventions

Commit messages and pull request titles follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), so the next version number can be derived from the history:

| Prefix | Example | Version |
| --- | --- | --- |
| `feat:` | `feat: preview the line manager in the employee form` | MINOR |
| `fix:` | `fix: keep form input while typing` | PATCH |
| `feat!:` or `fix!:` | `feat!: require a unit for every position` | MAJOR (MINOR while `0.x`) |
| `docs:`, `test:`, `refactor:`, `chore:` | `docs: update the README` | — |

See the [Release process](pathname:///release-process) for the steps to publish a release.
