---
title: Compatibility
description: Tested combinations of backend, frontend, database migrations, and runtimes.
---

# Compatibility

The backend and the frontend live in separate repositories and are released independently. This page records the combinations that were tested together.

## Backend, frontend, and database

| Backend | Frontend | Required database migration | Documentation |
| --- | --- | --- | --- |
| **0.7.1** | `main` since October 20, 2026 (commit `c9bcc39`) | None | [0.7.x](pathname:///docs/intro) |
| 0.7.0 | `main` since October 19, 2026 | `2026-10-18_hierarki_organisasi.sql` | [0.7.x](pathname:///docs/intro) |
| 0.6.1 | `main` before October 19, 2026 | Per-department concurrent leave limit | [0.6.x](pathname:///docs/0.6/intro) |

The frontend does not have its own version number yet. Until it is tagged, compatible frontend builds are identified by date and commit on `main`.

## Upgrade notes

| From → to | What to change |
| --- | --- |
| 0.6.x → 0.7.0 | Run the organization hierarchy migration before deploying. New positions must include `department_id`, and position codes and names are unique within a unit. Line managers are derived from the position structure; `manager_id` becomes a manual override |
| 0.7.0 → 0.7.1 | No action required. Clients that send compressed request bodies (`gzip`, `br`) receive `415`; the HRIS web app does not |

## Runtimes

| Component | Version | Notes |
| --- | --- | --- |
| Node.js (backend) | **22.23.4** | Pinned in the `Dockerfile` and `.nvmrc`. Earlier versions are affected by the October 21, 2026 Node.js security release |
| Node.js (frontend and docs builds) | 22.23.4 | Build time only; nginx serves the result |
| PostgreSQL | Supabase (PostgreSQL 15 or later) | Requires the `btree_gist` extension |
| Redis | 7 | Optional; the backend runs without it |

Check the deployed backend version at `https://api.hris.click/health`.
