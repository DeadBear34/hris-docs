---
sidebar_position: 1
title: Referensi API
---

# Referensi API 0.6

| Versi backend | Referensi |
| --- | --- |
| 0.6.1 | [Buka Referensi API 0.6.1](pathname:///api/?v=0.6.1) |

Base URL: `https://api.hris.click/api/v1`

Dokumentasi API (OpenAPI dan Swagger) **baru ada di 0.6.0**, untuk pemegang `system.view_api_docs`.

## Perbedaan dengan 0.7

- Belum ada `GET /org/tree`, `GET /employees/:id/line-manager`, `GET /positions/:id/line-manager`, dan `GET /auth/verification-code`.
- `POST /positions` tidak mewajibkan `department_id`; kode jabatan unik secara global.
- `GET /health` belum menampilkan `version`.
