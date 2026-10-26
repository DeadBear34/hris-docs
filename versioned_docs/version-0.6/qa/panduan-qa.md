---
sidebar_position: 1
title: Panduan QA
---

# Panduan QA: Pendaftaran di 0.6

Di 0.6 **belum ada endpoint** untuk mengambil kode verifikasi. Kode 6 digit hanya bisa diperoleh dari:

- **kotak masuk email** pendaftar, bila pengiriman email aktif; atau
- **log server** saat pengiriman email gagal atau dimatikan (`MAIL_DRIVER=log`), yang mencetak kode tersebut.

Alur pendaftaran:

1. `POST /auth/register`
2. Ambil kode dari email atau log server
3. `POST /auth/verify-email` dengan `email` dan `code`
4. Admin menyetujui lewat `PATCH /users/{id}/approve`
5. Login dengan akun baru

Untuk QA otomatis, gunakan versi 0.7 yang menyediakan [`GET /auth/verification-code`](pathname:///docs/qa/panduan-qa).
