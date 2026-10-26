---
title: Kompatibilitas
description: Pasangan versi backend, frontend, database, dan runtime
---

# Kompatibilitas

Backend dan frontend punya repositori dan nomor versi masing-masing, karena rilisnya tidak selalu bersamaan. Tabel ini mencatat pasangan yang diuji bersama.

## Backend, frontend, dan database

| Backend | Frontend | Migrasi database wajib | Dokumentasi |
| --- | --- | --- | --- |
| **0.7.1** | `main` sejak 20 Okt 2026 (commit `c9bcc39`) | Tidak ada tambahan | [0.7.x](pathname:///docs/intro) |
| 0.7.0 | `main` sejak 19 Okt 2026 | `2026-10-18_hierarki_organisasi.sql` | [0.7.x](pathname:///docs/intro) |
| 0.6.1 | `main` sebelum 19 Okt 2026 | Batas cuti bersamaan per departemen | [0.6.x](pathname:///docs/0.6/intro) |

Frontend belum memakai nomor versi sendiri. Sampai frontend diberi tag versi, pasangannya dicatat dengan tanggal dan commit di `main`.

### Yang merusak saat berpindah versi

| Dari → ke | Yang perlu disesuaikan |
| --- | --- |
| 0.6.x → 0.7.0 | Jabatan baru wajib menyertakan `department_id`. Kode dan nama jabatan unik per unit. Atasan dihitung dari struktur jabatan; `manager_id` menjadi pengecualian manual. Jalankan migrasi hierarki sebelum deploy |
| 0.7.0 → 0.7.1 | Tidak ada. Klien yang mengirim body terkompresi (gzip, br) akan mendapat 415; aplikasi web HRIS tidak melakukannya |

## Runtime

| Komponen | Versi | Catatan |
| --- | --- | --- |
| Node.js (backend) | **22.23.4** | Dikunci di `Dockerfile` dan `.nvmrc`. Versi di bawahnya terdampak Security Release 21 Oktober 2026 |
| Node.js (build frontend dan docs) | 22.23.4 | Hanya dipakai saat build; yang melayani pengguna adalah nginx |
| PostgreSQL | Supabase (PostgreSQL 15+) | Membutuhkan ekstensi `btree_gist` |
| Redis | 7 | Opsional; tanpa Redis backend tetap berjalan |

Versi backend yang sedang berjalan dapat dicek di `https://api.hris.click/health`.
