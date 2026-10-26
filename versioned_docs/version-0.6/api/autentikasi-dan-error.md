---
sidebar_position: 2
title: Autentikasi dan Error
---

# Autentikasi dan Error

Login lewat `POST /api/v1/auth/login`, lalu kirim `Authorization: Bearer <token>` di setiap permintaan.

Di 0.6, token tidak dicabut di server saat logout: token yang sama tetap berlaku sampai kedaluwarsa (24 jam), kecuali password diganti atau akun dinonaktifkan. Pencabutan token saat logout baru ada di 0.7.0.

| Status | `code` | Arti |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR`, `BAD_REQUEST` | Isian tidak valid |
| 401 | `UNAUTHORIZED` | Belum login atau token tidak berlaku |
| 403 | `FORBIDDEN` | Tidak punya fitur yang dibutuhkan |
| 404 | `NOT_FOUND` | Data atau rute tidak ada |
| 409 | `CONFLICT`, `STALE_DATA`, `STAFFING_LIMIT_REACHED` | Bentrok data, data sudah diubah, atau kuota cuti penuh |
| 429 | `RATE_LIMIT_EXCEEDED` | Terlalu banyak permintaan |
