---
title: Kebijakan Versi
description: Arti nomor versi HRIS dan kapan setiap angka naik
---

# Kebijakan Versi

HRIS memakai [Semantic Versioning](https://semver.org/lang/id/) dengan format **`MAYOR.MINOR.PATCH`**, misalnya `0.7.1`.

```
   0   .   7   .   1
   │       │       └─ PATCH : perbaikan bug atau keamanan, tanpa fitur baru, tanpa merusak yang lama
   │       └───────── MINOR : fitur baru; yang lama tetap jalan
   └───────────────── MAYOR : perubahan yang merusak cara pakai lama (breaking change)
```

Saat satu angka naik, angka di kanannya kembali ke 0: `0.7.1` → fitur baru → `0.8.0`.

## Kapan angka mana yang naik

| Jenis perubahan | Contoh di HRIS | Versi |
| --- | --- | --- |
| **Fix**: bug diperbaiki | Rekap cuti HR tidak muncul; pengembalian saldo salah setelah jenis cuti diubah | PATCH |
| **Security**: celah ditutup tanpa mengubah cara pakai | Update Node.js karena CVE-2026-111497; update dependency rentan | PATCH |
| **Feature**: fitur baru yang tidak merusak | Endpoint pratinjau atasan; bagan organisasi; sesi Redis | MINOR |
| **Perilaku baru yang tetap kompatibel** | Batas cuti bersamaan per departemen (kosong = tanpa batas) | MINOR |
| **Breaking**: cara pakai lama tidak berlaku | `POST /positions` wajib `department_id`; field dihapus atau diganti nama | MAYOR (MINOR selama `0.x`) |
| **Tidak menaikkan versi** | README, komentar, refactor tanpa perubahan perilaku, test | — |

### Selama versi `0.x`

HRIS masih tahap pengembangan. Selama nomor depannya `0`, perubahan yang merusak cukup menaikkan **MINOR**. Contohnya 0.7.0: jabatan wajib punya unit, padahal sebelumnya tidak.

Versi **`1.0.0`** diberikan saat HRIS dinyatakan stabil: lolos QA dan disetujui pembimbing. Mulai saat itu, setiap perubahan yang merusak **wajib** menaikkan MAYOR.

## Versi aplikasi dan versi API

Versi aplikasi (`0.7.1`) berbeda dengan versi path API (`/api/v1`). Path API baru berganti ke `/api/v2` bila ada klien lain di luar aplikasi web HRIS yang ikut terdampak perubahan yang merusak. Selama satu-satunya klien adalah aplikasi web HRIS sendiri, path tetap `/api/v1`, dan perubahan cukup dicatat di versi aplikasi.

## Versi dokumentasi

Dokumentasi dibekukan per **MINOR** (`0.6.x`, `0.7.x`). Rilis PATCH tidak membuat versi dokumentasi baru, karena tidak mengubah cara pakai; perubahannya cukup dicatat di [Catatan Rilis](pathname:///rilis).

| Menu versi | Isi |
| --- | --- |
| `0.7.x (terbaru)` | Versi yang sedang berjalan di production |
| `0.6.x` | Versi sebelumnya, tidak lagi dipelihara |
| `Next (belum rilis)` | Dokumentasi untuk rilis berikutnya yang sedang dikerjakan |

## Penamaan commit

Judul commit dan pull request diawali jenis perubahannya ([Conventional Commits](https://www.conventionalcommits.org/id/v1.0.0/)), supaya versi berikutnya mudah ditentukan:

| Awalan | Contoh | Versi |
| --- | --- | --- |
| `feat:` | `feat: pratinjau atasan di form karyawan` | MINOR |
| `fix:` | `fix: form tambah karyawan ter-refresh` | PATCH |
| `feat!:` atau `fix!:` | `feat!: jabatan wajib punya unit` | MAYOR (MINOR selama `0.x`) |
| `docs:`, `test:`, `refactor:`, `chore:` | `docs: perbarui README` | — |

Langkah teknis membuat rilis ada di [Proses Rilis](pathname:///proses-rilis).
