---
sidebar_position: 3
title: Absensi
---

# Absensi

Aturan absensi di 0.6 sama dengan 0.7. Ringkasnya:

- Jam kerja mengacu ke zona waktu kantor (WIB).
- Jadwal berurutan: jadwal pribadi, jadwal departemen, lalu jadwal bawaan.
- Status `present`, `late`, `absent`, `leave`, dan `holiday`. Absen masuk ditolak setelah batas absen.
- Absen offline diterima dengan batas waktu dan ditandai sumber `offline_sync`.
- Penutupan hari menandai `absent` bagi yang tidak absen pada hari kerja.

Penjelasan lengkap ada di [Absensi versi terbaru](pathname:///docs/fitur/absensi).
