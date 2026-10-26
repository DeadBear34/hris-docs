---
sidebar_position: 1
title: Panduan QA
---

# Panduan QA: Pendaftaran Tanpa Membuka Email

Saat seseorang mendaftar, sistem mengirim **kode verifikasi 6 digit** ke emailnya. Untuk pengujian, admin dapat mengambil kode baru langsung lewat API:

```
GET /api/v1/auth/verification-code?email=<email>
```

Alur lengkap:

```
1. Register  →  2. Login admin  →  3. Ambil kode  →  4. Verifikasi email  →  5. Setujui akun  →  6. Login akun baru
```

Base URL: `https://api.hris.click/api/v1`

## 1. Register

`POST /auth/register` tanpa token:

```json
{
  "email": "qa.test01@gmail.com",
  "password": "Password123!",
  "full_name": "Akun Uji QA",
  "phone": "+6281299990001",
  "gender": "male",
  "terms_accepted": true
}
```

- Password 8–72 karakter, berisi huruf besar, huruf kecil, angka, dan simbol.
- Nomor telepon diawali kode negara dan tidak boleh sama dengan akun lain.

Hasil benar: **201**.

## 2. Login sebagai admin

`POST /auth/login` dengan akun **ber-role admin**, lalu salin `data.token`. Di Swagger, tempel di tombol **Authorize**.

## 3. Ambil kode

`GET /auth/verification-code?email=qa.test01@gmail.com` dengan token admin:

```json
{
  "success": true,
  "message": "A new verification code was issued. Earlier codes no longer work.",
  "data": { "email": "qa.test01@gmail.com", "code": "482913", "expires_in_minutes": 10 }
}
```

- Kode ada di **`data.code`**, berlaku 10 menit.
- **Setiap panggilan membuat kode baru** dan membatalkan kode sebelumnya. Pakai kode dari panggilan terakhir.

## 4. Verifikasi email

`POST /auth/verify-email` tanpa token:

```json
{ "email": "qa.test01@gmail.com", "code": "482913" }
```

Maksimal 5 percobaan per kode.

## 5. Setujui akun

1. `GET /users/pending` dengan token admin, salin `id` akun.
2. `PATCH /users/{id}/approve`.

## 6. Login akun baru

`POST /auth/login` dengan email dan password dari langkah 1.

## Arti respons langkah 3

| Status | Pesan | Artinya |
| --- | --- | --- |
| 200 | `data.code` terisi | Berhasil |
| 401 | Token tidak ada atau tidak berlaku | Ulangi login admin |
| 403 | You don't have access | Token bukan milik admin |
| 404 | No account is registered with this email | Email belum terdaftar |
| 404 | Route ... not found | Fitur QA dimatikan di server (`QA_TOOLS_ENABLED`) |
| 409 | This email is already verified | Sudah terverifikasi, lanjut ke langkah 5 |

:::caution
Endpoint ini hanya untuk masa pengujian dan dimatikan setelah QA selesai. Jangan bagikan tangkapan layar yang memperlihatkan token admin.
:::
