# HRIS Help Center

Source of **docs.hris.click**, the public help center for HRIS by PT Archenix Komputasi Indonesia: user guides and release notes. Built with [Docusaurus](https://docusaurus.io) 3 and served as static HTML by nginx.

Both this repository and the site are public. They must not contain API references, QA procedures, infrastructure details, real personal data, or secrets; see [RELEASING.md](RELEASING.md) for what goes where. Every push and pull request is scanned for secrets with gitleaks (`.gitleaks.toml`).

## Structure

| Content | Location |
| --- | --- |
| User guides (Next version) | `docs/` |
| User guides (released versions) | `versioned_docs/version-0.7`, `versioned_docs/version-0.6` |
| Release notes | `release-notes/` |
| Versioning policy | `src/pages/versioning.md` |
| Home page | `src/pages/index.js` |

| Version menu | URL |
| --- | --- |
| 0.7.x (latest) | `/docs/...` |
| 0.6.x | `/docs/0.6/...` |
| Next (unreleased) | `/docs/next/...` |

## Local development

Requires Node.js 22.23.4 (`nvm use`).

```bash
npm install
npm start          # http://localhost:3000 with live reload
npm run build      # production build in build/; fails on broken links
npm run serve      # serve the production build
```

## Releasing

See [RELEASING.md](RELEASING.md).

## Deployment

The `hris-docs` container joins the backend's Docker network (`hris-backend_default`), like the frontend.

```bash
cd /home/awanio/hris-docs
git pull origin main
docker compose up -d --build
docker ps --format "table {{.Names}}\t{{.Status}}"   # hris-docs should be (healthy)
```

One-time setup in **Cloudflare Zero Trust → Networks → Tunnels →** the HRIS tunnel **→ Public Hostname → Add:** subdomain `docs`, domain `hris.click`, service `HTTP`, URL `docs:8080`.

## Dependency security

Every package is a build tool (`devDependencies`); only static HTML is deployed. Some transitive Docusaurus dependencies are pinned to patched versions through `overrides` in `package.json` (serialize-javascript, tinypool, postcss-selector-parser, uuid). Remove those overrides once Docusaurus ships the patched versions, and confirm that `npm audit` stays clean and `npm run build` still succeeds.
