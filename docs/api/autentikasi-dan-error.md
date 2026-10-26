---
sidebar_position: 2
title: Autentikasi dan Error
---

# Autentikasi dan Error

## Login dan token

```http
POST /api/v1/auth/login
Content-Type: application/json

{ "email": "nama@hris.click", "password": "..." }
```

Token dari `data.token` dikirim di setiap permintaan berikutnya:

```http
Authorization: Bearer <token>
```

Token ditolak (401) bila sudah logout, akun dinonaktifkan atau dihapus, atau password diganti setelah token terbit.

## Bentuk respons

```json
{ "success": true, "message": "...", "data": {}, "meta": { "page": 1, "limit": 10, "total": 42, "total_pages": 5 } }
```

```json
{ "success": false, "message": "...", "code": "VALIDATION_ERROR", "errors": [{ "field": "email", "message": "..." }] }
```

## Kode status

| Status | `code` | Arti |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR`, `BAD_REQUEST`, `INVALID_JSON` | Isian tidak valid atau aturan bisnis dilanggar |
| 401 | `UNAUTHORIZED` | Belum login atau token tidak berlaku |
| 403 | `FORBIDDEN` | Tidak punya fitur yang dibutuhkan |
| 404 | `NOT_FOUND` | Data atau rute tidak ada |
| 409 | `CONFLICT`, `STALE_DATA`, `STAFFING_LIMIT_REACHED` | Bentrok dengan data lain, data sudah diubah orang lain, atau kuota cuti departemen penuh |
| 413 | `PAYLOAD_TOO_LARGE` | Body lebih dari 100 KB |
| 415 | `UNSUPPORTED_ENCODING` | Body terkompresi (gzip, br) tidak diterima, mulai 0.7.1 |
| 429 | `RATE_LIMIT_EXCEEDED`, `TOO_MANY_REQUESTS` | Terlalu banyak permintaan, atau meminta ulang kode terlalu cepat; tunggu sesuai header `Retry-After` |

Batas umum 300 permintaan per menit per pengguna, dengan batas lebih ketat untuk login.
