---
sidebar_position: 4
title: Absensi
---

# Absensi

Semua aturan jam kerja mengacu ke **zona waktu kantor (WIB)**, walaupun server dan database berjalan di UTC.

## Jadwal kerja

Jadwal yang berlaku ditentukan berurutan: jadwal pribadi karyawan, lalu jadwal departemennya, lalu jadwal bawaan (08:00–17:00, batas absen 08:10).

## Status kehadiran

Contoh dengan jam masuk 08:00, toleransi 5 menit, batas absen 08:10:

| Waktu datang | Status | Terlambat |
| --- | --- | --- |
| 08:00 – 08:05 | `present` | 0 menit |
| 08:06 – 08:10 | `late` | 6 – 10 menit, dihitung penuh dari jam masuk |
| setelah 08:10 | absen masuk ditolak, menjadi `absent` saat penutupan hari | — |

Status lain: `leave` (cuti disetujui) dan `holiday` (hari libur).

## Yang ditolak saat absen masuk

- melewati batas absen;
- bukan hari kerja menurut jadwalnya;
- hari libur atau cuti bersama;
- sedang cuti yang disetujui;
- absen kedua di hari yang sama (409);
- karyawan nonaktif atau sudah resign.

Absen pulang mensyaratkan absen masuk di hari yang sama dan tidak boleh sebelum jam kerja dimulai.

## Absen offline

Bila jaringan mati, aplikasi mengantre absen lalu mengirimnya begitu online, beserta waktu tombol ditekan (`offline_time`). Waktu dari perangkat diperlakukan sebagai klaim:

| Pemeriksaan | Batas |
| --- | --- |
| Tidak di masa depan | toleransi 2 menit |
| Jeda sinkronisasi | maksimal 6 jam |
| Tanggal kantor sama dengan tanggal server | wajib |
| Tidak terlalu jauh sebelum jam masuk | maksimal 2 jam |

Setiap absen offline meninggalkan jejak permanen (waktu diklaim, waktu diterima server, sumber `offline_sync`) yang bisa diperiksa HR lewat laporan absen offline.

## Penutupan hari dan koreksi

- **Penutupan hari** berjalan otomatis setiap malam: karyawan yang tidak absen pada hari kerja ditandai `absent`, kecuali hari libur atau cuti.
- **Koreksi** oleh pemegang `attendance.correct` dicatat di kolom catatan dengan nama pengoreksi dan alasannya. Keterlambatan dihitung ulang dari jadwal.
- Menyetujui cuti membuat baris `leave` untuk setiap hari kerjanya; membatalkan cuti yang disetujui menghapusnya.
