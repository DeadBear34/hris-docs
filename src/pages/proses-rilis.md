---
title: Proses Rilis
description: Langkah membuat rilis HRIS baru, dari changelog sampai dokumentasi
---

# Proses Rilis

Contoh di bawah membuat rilis backend **0.8.0** (fitur baru). Sesuaikan angkanya menurut [Kebijakan Versi](pathname:///kebijakan-versi).

## 1. Backend

Di branch `develop`, setelah semua perubahan untuk rilis ini selesai dan test lolos:

```bash
# Tulis isi rilis di CHANGELOG.md: pindahkan isi "Unreleased" ke bagian ## [0.8.0] - <tanggal>

# Naikkan versi di package.json dan package-lock.json tanpa membuat commit/tag dulu
npm version minor --no-git-tag-version        # patch | minor | major

git add CHANGELOG.md package.json package-lock.json
git commit -m "chore(release): 0.8.0"
```

Buat pull request `develop` → `main`. Setelah di-merge:

```bash
git checkout main && git pull
git tag v0.8.0
git push origin v0.8.0
```

Di GitHub, buat **Release** dari tag `v0.8.0` dan salin isi changelog-nya.

## 2. Dokumentasi

Di repositori `hris-docs`:

```bash
# Referensi API versi ini, dari folder hris-backend yang sudah di tag v0.8.0
cd ../hris-backend
npm run docs:openapi -- ../hris-docs/static/openapi/0.8.0.json
cd ../hris-docs
```

Lalu:

1. Tambahkan `"0.8.0"` di `static/openapi/versions.json`.
2. Perbarui isi `docs/` (versi Next) sesuai perubahan rilis.
3. **Rilis MINOR atau MAYOR saja:** bekukan dokumentasinya.

   ```bash
   npm run docs:version 0.8
   ```

   Lalu di `docusaurus.config.js`, ubah `LATEST` menjadi `"0.8"`, tambahkan label `"0.8": { label: "0.8.x (terbaru)" }`, dan ubah label `"0.7"` menjadi `"0.7.x"` dengan `banner: "unmaintained"`.
4. Tulis catatan rilis di `rilis/2026-11-01-0.8.0.md`, mengikuti contoh rilis sebelumnya.
5. Perbarui tabel di [Kompatibilitas](pathname:///kompatibilitas).

Rilis PATCH cukup langkah 1, 4, dan 5 (ditambah ekspor OpenAPI bila ada perubahan endpoint).

## 3. Deploy

Backend dan docs di VM, masing-masing dari foldernya:

```bash
git pull origin main
docker compose up -d --build
```

Periksa hasilnya:

- `https://api.hris.click/health` menampilkan `"version": "0.8.0"`.
- `docs.hris.click` menampilkan versi 0.8.x sebagai versi terbaru.

Deploy backend lebih dulu dan tunggu sampai container berstatus `healthy`, baru kemudian frontend, supaya tidak ada jeda 502.
