---
sidebar_position: 1
title: Karyawan
---

# Karyawan

Setiap karyawan punya satu baris data karyawan dan, bila bisa login, satu akun. Nomor karyawan dibuat otomatis berurutan (`001`, `002`, ...).

## Menambah karyawan

| Cara | Siapa | Keterangan |
| --- | --- | --- |
| Form Tambah Karyawan | Pemegang `employee.create` | Sampai 4 karyawan sekaligus, beserta akun dan password awalnya |
| Impor CSV | Pemegang `employee.create` | Banyak karyawan sekaligus; kesalahan dilaporkan per baris |
| Daftar mandiri | Siapa pun | Lewat halaman Register, lalu verifikasi email dan menunggu persetujuan |

Akun yang dibuat pengelola langsung aktif. Akun dari daftar mandiri baru bisa login setelah **email terverifikasi dan disetujui** pemegang `employee.approve_user`.

## Jabatan, departemen, dan atasan

Mulai 0.7, ketiganya saling terkait:

1. **Pilih jabatan.** Daftar jabatan bisa disaring per departemen.
2. **Departemen terisi otomatis** dari unit pemilik jabatan. Jabatan dari unit lain ditolak.
3. **Atasan dihitung otomatis** dari struktur jabatan. Form menampilkan pratinjau atasannya begitu jabatan dipilih (`GET /positions/:id/line-manager`).

Kolom **Atasan (pengecualian manual)** hanya diisi untuk kasus khusus, misalnya karyawan yang sementara melapor ke orang lain. Bila diisi, nilainya mengalahkan hasil hitungan struktur. Kosongkan agar atasan kembali dihitung otomatis. Lihat [Struktur Organisasi](struktur-organisasi.md).

**Kuota kursi.** Jabatan dengan `max_holders` (misalnya satu kepala per unit) menolak pemegang tambahan bila sudah penuh.

## Mengubah dan menonaktifkan

- Perubahan memakai deteksi edit bersamaan: bila data sudah diubah orang lain sejak dibuka, perubahan ditolak 409 dan form diminta memuat ulang.
- Mengubah jabatan, atasan manual, atau status aktif karyawan **mengalihkan pengajuan cuti yang masih menunggu** ke atasan yang berlaku sekarang.
- Karyawan nonaktif atau berstatus `resigned` tidak bisa absen dan tidak dihitung sebagai atasan.
