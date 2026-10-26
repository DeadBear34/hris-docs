---
sidebar_position: 1
title: Karyawan
---

# Karyawan

Setiap karyawan punya satu baris data karyawan dan, bila bisa login, satu akun. Nomor karyawan dibuat otomatis berurutan.

## Menambah karyawan

| Cara | Siapa | Keterangan |
| --- | --- | --- |
| Form Tambah Karyawan | Pemegang `employee.create` | Beserta akun dan password awalnya |
| Impor CSV | Pemegang `employee.create` | Kesalahan dilaporkan per baris |
| Daftar mandiri | Siapa pun | Verifikasi email lalu menunggu persetujuan |

## Departemen, jabatan, dan atasan

Di 0.6 ketiganya **berdiri sendiri** dan diisi manual:

- **Departemen**: daftar datar tanpa induk. Bisa diberi batas cuti bersamaan (`max_concurrent_leave`).
- **Jabatan**: berlaku global, kode dan namanya unik di seluruh perusahaan, tidak terikat departemen.
- **Atasan** (`manager_id`): dipilih manual per karyawan. Inilah yang menentukan siapa penyetuju cutinya.

Akibatnya, bila seorang atasan keluar atau pindah, setiap bawahannya harus diubah satu per satu. Masalah ini yang diselesaikan [struktur organisasi di 0.7](pathname:///docs/fitur/struktur-organisasi).

Sistem menolak atasan yang membuat lingkaran (misalnya A atasan B, B atasan A).

## Mengubah data

Perubahan memakai deteksi edit bersamaan: bila data sudah diubah orang lain sejak dibuka, perubahan ditolak 409.
