# HRIS Documentation

Source of **docs.hris.click**: guides, API reference, and release history for the HRIS platform of PT Archenix Komputasi Indonesia. Built with [Docusaurus](https://docusaurus.io) 3 and served as static HTML by nginx.

## Structure

| Content | Location | Versioned |
| --- | --- | --- |
| Getting started, guides, API, testing | `docs/` (Next), `versioned_docs/version-X/` | Per MINOR version |
| Changelog | `changelog/`, generated from the backend `CHANGELOG.md` | One page per release |
| Versioning policy, compatibility, release process | `src/pages/*.md` | No |
| API reference | `static/api/index.html` and `static/openapi/<version>.json` | Per release |

### Documentation versions

| Menu label | Folder | URL |
| --- | --- | --- |
| 0.7.x (latest) | `versioned_docs/version-0.7` | `/docs/...` |
| 0.6.x | `versioned_docs/version-0.6` | `/docs/0.6/...` |
| Next (unreleased) | `docs/` | `/docs/next/...` |

Write changes for the upcoming release in `docs/`. Released versions are edited only to fix mistakes.

## Local development

Requires Node.js 22.23.4 (`nvm use`).

```bash
npm install
npm start          # http://localhost:3000 with live reload
npm run build      # production build in build/; fails on broken links
npm run serve      # serve the production build
```

## Publishing a release

See the **Release process** page (`src/pages/release-process.md`). In short:

```bash
# 1. Changelog pages from the backend changelog (never edit changelog/*.md by hand)
node scripts/sync-changelog.mjs ../hris-backend/CHANGELOG.md

# 2. API reference for the release, then add the version to static/openapi/versions.json
(cd ../hris-backend && npm run docs:openapi -- ../hris-docs/static/openapi/0.8.0.json)

# 3. MINOR/MAJOR releases: freeze the docs, then update LATEST and the labels in docusaurus.config.js
npm run docs:version 0.8
```

## Deployment

The `hris-docs` container joins the backend's Docker network (`hris-backend_default`), like the frontend.

```bash
cd /home/awanio/hris-docs
git pull origin main
docker compose up -d --build
docker ps --format "table {{.Names}}\t{{.Status}}"   # hris-docs should be (healthy)
```

One-time setup:

1. **Cloudflare Zero Trust → Networks → Tunnels →** the HRIS tunnel **→ Public Hostname → Add:** subdomain `docs`, domain `hris.click`, service `HTTP`, URL `docs:8080`.
2. **Zero Trust → Access → Applications → Add (Self-hosted):** domain `docs.hris.click`, with an *Allow* policy for the supervisor, the team, and QA. The documentation exposes the API surface, so it is not public.

## Dependency security

Every package is a build tool (`devDependencies`); only static HTML is deployed. Some transitive Docusaurus dependencies are pinned to patched versions through `overrides` in `package.json` (serialize-javascript, tinypool, postcss-selector-parser, uuid). Remove those overrides once Docusaurus ships the patched versions, and confirm that `npm audit` stays clean and `npm run build` still succeeds.
