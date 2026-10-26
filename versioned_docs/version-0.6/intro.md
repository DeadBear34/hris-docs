---
sidebar_position: 1
title: Pengantar
slug: /intro
---

# HRIS 0.6

Dokumentasi ini berlaku untuk **HRIS 0.6.x** (rilis 13–14 Oktober 2026). Versi ini sudah tidak dipelihara; gunakan [versi terbaru](pathname:///docs/intro) bila memungkinkan.

## Perbedaan utama dengan 0.7

| Hal | 0.6 | 0.7 |
| --- | --- | --- |
| Atasan karyawan | Diisi manual per karyawan (`manager_id`) | Dihitung otomatis dari struktur jabatan |
| Departemen dan jabatan | Daftar datar, jabatan berlaku global | Unit bertingkat, jabatan milik unit dengan atasan jabatan |
| Penyetuju cuti | `manager_id` pemohon | Atasan hasil struktur, dialihkan otomatis bila struktur berubah |
| Sesi login | Selalu dibaca dari database | Disimpan di Redis, logout mencabut token |
| Kode verifikasi untuk QA | Dibaca dari email atau log server | `GET /auth/verification-code` khusus admin |

## Modul

| Modul | Panduan |
| --- | --- |
| Karyawan, departemen, jabatan | [Karyawan](fitur/karyawan.md) |
| Cuti | [Cuti](fitur/cuti.md) |
| Absensi | [Absensi](fitur/absensi.md) |
| Notifikasi | [Notifikasi](fitur/notifikasi.md) |

## Peran dan hak akses

Sama seperti 0.7: peran sistem hanya `admin` dan `employee`, dan kemampuan lain diberikan lewat fitur yang ditempelkan ke jabatan (`leave.approve_team`, `leave.approve_all`, `employee.create`, dan seterusnya).
