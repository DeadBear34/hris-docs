# HRIS Docs

Situs dokumentasi dan riwayat versi HRIS PT Archenix Komputasi Indonesia, tayang di **docs.hris.click**. Dibangun dengan [Docusaurus](https://docusaurus.io) 3 dan disajikan sebagai HTML statis oleh nginx.

## Isi

| Bagian | Folder | Berversi? |
| --- | --- | --- |
| Panduan fitur, API, QA | `docs/` (Next), `versioned_docs/version-X/` | Ya, per MINOR |
| Catatan Rilis | `rilis/` (dibuat dari `CHANGELOG.md` backend) | Satu halaman per rilis |
| Kebijakan Versi, Kompatibilitas, Proses Rilis | `src/pages/*.md` | Tidak |
| Referensi API | `static/api/index.html` + `static/openapi/<versi>.json` | Ya, per rilis |

### Versi dokumentasi

| Menu | Folder | URL |
| --- | --- | --- |
| 0.7.x (terbaru) | `versioned_docs/version-0.7` | `/docs/...` |
| 0.6.x | `versioned_docs/version-0.6` | `/docs/0.6/...` |
| Next (belum rilis) | `docs/` | `/docs/next/...` |

Perubahan untuk rilis berikutnya ditulis di `docs/`. Versi yang sudah rilis hanya diubah untuk memperbaiki kesalahan tulis.

## Menjalankan di laptop

Prasyarat: Node.js 22.23.4 (`nvm use`).

```bash
npm install
npm start          # http://localhost:3000, reload otomatis
npm run build      # build produksi ke folder build/, gagal bila ada tautan rusak
npm run serve      # menyajikan hasil build
```

## Membuat rilis

Langkah lengkapnya ada di halaman **Proses Rilis** (`src/pages/proses-rilis.md`). Ringkasnya:

```bash
# 1. Catatan rilis dari CHANGELOG backend (jangan edit rilis/*.md dengan tangan)
node scripts/sync-changelog.mjs ../hris-backend/CHANGELOG.md

# 2. Referensi API versi ini, lalu tambahkan versinya ke static/openapi/versions.json
(cd ../hris-backend && npm run docs:openapi -- ../hris-docs/static/openapi/0.8.0.json)

# 3. Rilis MINOR/MAYOR: bekukan dokumentasi, lalu perbarui LATEST dan label di docusaurus.config.js
npm run docs:version 0.8
```

## Deploy di VM

Container `hris-docs` ikut jaringan Docker backend (`hris-backend_default`), sama seperti frontend.

```bash
cd /home/awanio/hris-docs
git pull origin main
docker compose up -d --build
docker ps --format "table {{.Names}}\t{{.Status}}"   # hris-docs harus (healthy)
```

Pertama kali saja:

1. **Cloudflare Zero Trust → Networks → Tunnels →** tunnel HRIS **→ Public Hostname → Add**: subdomain `docs`, domain `hris.click`, service `HTTP`, URL `docs:8080`.
2. **Zero Trust → Access → Applications → Add (Self-hosted)**: domain `docs.hris.click`, policy *Allow* untuk email pembimbing, tim, dan QA. Dokumentasi memuat peta API, jadi sengaja tidak dibuka untuk publik.

## Keamanan dependency

Semua package adalah perkakas build (`devDependencies`); yang tayang hanya HTML statis. Beberapa dependency turunan Docusaurus dipaksa ke versi yang sudah ditambal lewat `overrides` di `package.json` (serialize-javascript, tinypool, postcss-selector-parser, uuid). Hapus override tersebut setelah Docusaurus merilis versi yang sudah memakainya, lalu pastikan `npm audit` tetap bersih dan `npm run build` tetap berhasil.
