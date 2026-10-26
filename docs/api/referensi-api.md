---
sidebar_position: 1
title: Referensi API
---

# Referensi API

Referensi lengkap setiap endpoint dibangkitkan otomatis dari route dan skema validasi backend, lalu disimpan satu salinan per versi rilis.

| Versi backend | Referensi |
| --- | --- |
| **0.7.1** (terbaru) | [Buka Referensi API 0.7.1](pathname:///api/?v=0.7.1) |
| 0.6.1 | [Buka Referensi API 0.6.1](pathname:///api/?v=0.6.1) |

Base URL: `https://api.hris.click/api/v1`

## Perubahan dibanding 0.6

| Endpoint | Perubahan |
| --- | --- |
| `GET /org/tree` | Baru: bagan organisasi |
| `GET /employees/:id/line-manager` | Baru: atasan langsung karyawan |
| `GET /positions/:id/line-manager` | Baru: pratinjau atasan untuk jabatan |
| `GET /auth/verification-code` | Baru: kode verifikasi untuk QA (khusus admin) |
| `POST /positions` | **Breaking:** `department_id` wajib; kode dan nama jabatan unik per unit |
| `POST`/`PATCH /departments` | Tambahan `parent_id` dan `unit_type` |
| `GET /health` | Tambahan `version` (0.7.1) |

Referensi API juga tersedia langsung di aplikasi (menu Dokumentasi API) untuk pemegang `system.view_api_docs`, selalu sesuai dengan server yang sedang berjalan.
