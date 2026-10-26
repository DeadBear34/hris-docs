# Releasing HRIS

Internal process for publishing an HRIS release. This file is not part of the public site.

## What is public and what is not

docs.hris.click is **public**. It contains only end-user guides and user-facing release notes.

| Content | Where it lives |
| --- | --- |
| User guides | `docs/` and `versioned_docs/` in this repository (public site) |
| Release notes (user-facing) | `release-notes/` in this repository (public site) |
| Technical changelog | `CHANGELOG.md` in `hris-backend` |
| API reference | In-app **Dokumentasi API** page, for holders of `system.view_api_docs` only |
| QA procedures | `docs/qa/` in `hris-backend` |
| Compatibility and deployment details | This file |

Never publish on the site: endpoint paths, request or response formats, configuration switches, database or migration names, infrastructure details, internal QA tools, or the specifics of security fixes.

## Release steps

Example for backend version **0.8.0** (a new feature).

### 1. Backend

On `develop`, once every change is merged and the tests pass:

1. Add a `## [0.8.0] - YYYY-MM-DD` section to `CHANGELOG.md`.
2. Bump the version:

   ```bash
   npm version minor --no-git-tag-version   # patch | minor | major
   git add CHANGELOG.md package.json package-lock.json
   git commit -m "chore(release): 0.8.0"
   ```

3. Merge `develop` into `main` through a pull request, then tag the merge commit and push the tag:

   ```bash
   git checkout main && git pull
   git tag v0.8.0 && git push origin v0.8.0
   ```

### 2. Documentation site

1. Write `release-notes/YYYY-MM-DD-v0-8-0.md` in plain language for users: what is new, improved, or fixed, and what they need to do. Translate technical changelog items into their effect on users, and leave out purely internal changes.
2. Update the guides in `docs/` (the Next version).
3. **Minor and major releases only:** freeze the documentation:

   ```bash
   npm run docs:version 0.8
   ```

   Then, in `docusaurus.config.js`, set `LATEST` to `"0.8"`, label it `0.8.x (latest)`, and relabel `"0.7"` as `0.7.x` with `banner: "unmaintained"`.
4. Update the announcement bar in `docusaurus.config.js` and the latest version on the home page (`src/pages/index.js`).
5. Update the compatibility table below.

### 3. Deploy

On the VM, deploy the backend first and wait until it is `healthy`, then the frontend, then the docs:

```bash
git pull origin main
docker compose up -d --build
```

Check that `https://api.hris.click/health` reports the new version.

## Compatibility

| Backend | Frontend | Database migration | Docs version |
| --- | --- | --- | --- |
| **0.7.1** | `3a9d826` (Oct 25, 2026): CSP, error boundary, Add Employee fixes | None | 0.7 |
| 0.7.0 | `3f4d181` (Oct 20, 2026): org chart, automatic line manager, update banner | `2026-10-18_hierarki_organisasi.sql` | 0.7 |
| 0.6.1 | `main` before Oct 19, 2026 | Per-department concurrent leave limit | 0.6 |

Runtimes: Node.js 22.23.4 (backend runtime, frontend and docs builds), PostgreSQL on Supabase with `btree_gist`, Redis 7 (optional).
