---
title: Release Process
description: Steps to publish an HRIS release, from the changelog to the documentation.
---

# Release Process

The example below publishes backend version **0.8.0** (a new feature). Choose the number according to the [Versioning policy](pathname:///versioning).

## 1. Backend

On the `develop` branch, once every change for the release is merged and the tests pass:

1. In `CHANGELOG.md`, add a `## [0.8.0] - YYYY-MM-DD` section with the changes grouped under `Added`, `Changed`, `Fixed`, `Security`, `Deprecated`, `Removed`, or `Migration`.
2. Bump the version without creating a tag yet:

   ```bash
   npm version minor --no-git-tag-version   # patch | minor | major
   git add CHANGELOG.md package.json package-lock.json
   git commit -m "chore(release): 0.8.0"
   ```

3. Open a pull request from `develop` to `main`. After it is merged, tag the merge commit:

   ```bash
   git checkout main && git pull
   git tag v0.8.0
   git push origin v0.8.0
   ```

4. Create a GitHub **Release** from the `v0.8.0` tag and paste the changelog section into it.

## 2. Documentation

In the `hris-docs` repository:

1. Generate the changelog pages from the backend changelog. Never edit the files in `changelog/` by hand.

   ```bash
   node scripts/sync-changelog.mjs ../hris-backend/CHANGELOG.md
   ```

2. Export the API reference for this release and add `"0.8.0"` to the top of `static/openapi/versions.json`.

   ```bash
   (cd ../hris-backend && npm run docs:openapi -- ../hris-docs/static/openapi/0.8.0.json)
   ```

3. Update the documentation in `docs/` (the Next version) to describe the release.
4. **MINOR and MAJOR releases only:** freeze the documentation.

   ```bash
   npm run docs:version 0.8
   ```

   Then, in `docusaurus.config.js`, set `LATEST` to `"0.8"`, label `"0.8"` as `0.8.x (latest)`, and relabel `"0.7"` as `0.7.x` with `banner: "unmaintained"`.

5. Update the [Compatibility](pathname:///compatibility) table and the announcement bar in `docusaurus.config.js`.

Patch releases need steps 1, 2 (only if endpoints changed), and 5.

## 3. Deploy

On the VM, in each repository folder:

```bash
git pull origin main
docker compose up -d --build
```

Deploy the backend first and wait until its container is `healthy` before deploying the frontend, to avoid `502` responses during the switch.

Verify the release:

- `https://api.hris.click/health` returns `"version": "0.8.0"`.
- docs.hris.click lists 0.8.x as the latest version.
