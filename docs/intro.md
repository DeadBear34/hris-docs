---
sidebar_position: 1
title: Pengantar
slug: /intro
---

# HRIS PT Archenix Komputasi Indonesia

HRIS (Human Resource Information System) adalah aplikasi internal untuk mengelola karyawan, struktur organisasi, cuti, dan absensi PT Archenix Komputasi Indonesia, perusahaan yang berfokus pada data center dan kecerdasan buatan.

Dokumentasi ini berlaku untuk **HRIS 0.7.x**. Versi lain dapat dipilih lewat menu versi di kanan atas.

## Bagian aplikasi

| Bagian | Alamat | Isi |
| --- | --- | --- |
| Aplikasi web | [hris.click](https://hris.click) | Antarmuka karyawan, atasan, HR, dan admin (React, PWA) |
| API | [api.hris.click](https://api.hris.click/health) | REST API dan WebSocket notifikasi (Node.js, Express, PostgreSQL) |
| Dokumentasi | docs.hris.click | Halaman ini: panduan fitur, referensi API, dan riwayat versi |

`GET https://api.hris.click/health` menampilkan versi backend yang sedang berjalan:

```json
{ "success": true, "message": "Server running", "version": "0.7.1", "redis": "ready" }
```

## Modul

| Modul | Ringkasan | Panduan |
| --- | --- | --- |
| Karyawan | Data karyawan, akun, foto, impor massal | [Karyawan](fitur/karyawan.md) |
| Struktur organisasi | Unit bertingkat, jabatan, atasan jabatan, bagan organisasi | [Struktur Organisasi](fitur/struktur-organisasi.md) |
| Cuti | Pengajuan, persetujuan satu tingkat, saldo, batas cuti bersamaan | [Cuti](fitur/cuti.md) |
| Absensi | Absen masuk dan pulang, offline, koreksi, laporan | [Absensi](fitur/absensi.md) |
| Notifikasi | Kotak masuk dan notifikasi realtime | [Notifikasi](fitur/notifikasi.md) |

## Peran dan hak akses

Sistem hanya mengenal dua peran: **`admin`** dan **`employee`**. Admin melewati seluruh pemeriksaan hak akses.

Kemampuan lain (misalnya menyetujui cuti atau mengelola struktur) diberikan lewat **fitur yang ditempelkan ke jabatan**, bukan lewat peran. HR Manager, misalnya, adalah jabatan biasa yang memegang fitur `leave.approve_all`, `employee.create`, `organization.manage`, dan seterusnya. Admin dapat mengubah pemberian fitur per jabatan dari menu Fitur tanpa mengubah kode.

| Kelompok | Contoh fitur |
| --- | --- |
| Karyawan | `employee.view_all`, `employee.create`, `employee.update`, `employee.approve_user` |
| Organisasi | `organization.manage`, `organization.schedule`, `organization.holiday` |
| Cuti | `leave.approve_team`, `leave.approve_all`, `leave.view_all`, `leave.adjust_balance` |
| Absensi | `attendance.view_team`, `attendance.view_all`, `attendance.correct`, `attendance.report` |
| Sistem | `system.view_log`, `system.view_api_docs` |

## Riwayat versi

Setiap perubahan dicatat di [Catatan Rilis](pathname:///rilis). Aturan kapan nomor versi naik ada di [Kebijakan Versi](pathname:///kebijakan-versi).
