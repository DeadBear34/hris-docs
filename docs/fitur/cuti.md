---
sidebar_position: 3
title: Cuti
---

# Cuti

## Alur

```
Karyawan mengajukan ──► pending ──┬── disetujui ──► approved ──┐
                                  ├── ditolak ────► rejected   │ dibatalkan pemohon
                                  └── dibatalkan ──────────────┴──► cancelled
                                                                   (sebelum tanggal mulai)
```

- Pembatalan hanya oleh pemohon sendiri.
- Cuti yang sudah disetujui hanya bisa dibatalkan selama tanggal mulainya belum lewat.
- Bila dua orang bertindak bersamaan (misalnya atasan menyetujui saat pemohon membatalkan), salah satunya menerima 409 dan diminta memuat ulang.

## Siapa yang menyetujui

Persetujuan **satu tingkat** oleh **atasan langsung** pemohon, dihitung dari [struktur jabatan](struktur-organisasi.md) saat pengajuan dibuat.

| Penyetuju | Syarat |
| --- | --- |
| Atasan langsung | Jabatannya memegang `leave.approve_team` |
| HR / admin | Memegang `leave.approve_all` (atau admin). Bisa memutus pengajuan siapa pun, misalnya saat atasan berhalangan |

**Tidak ada yang memutus cutinya sendiri**, termasuk admin. Pengajuan tanpa atasan (misalnya milik CEO) diputus pemegang `leave.approve_all` lain atau admin.

Pengajuan yang masih menunggu **dialihkan otomatis** bila struktur berubah, jadi tidak tertahan di atasan yang sudah pindah atau nonaktif.

## Aturan saat mengajukan

| Aturan | Keterangan |
| --- | --- |
| Durasi | Dihitung dalam hari kerja; Sabtu, Minggu, dan hari libur tidak dihitung |
| Tanggal lampau | Ditolak, kecuali Cuti Sakit |
| Batas hari per pengajuan | `max_days_per_request` jenis cuti |
| Pemberitahuan minimal | `min_notice_days` jenis cuti |
| Saldo | Harus cukup, untuk jenis cuti yang memotong saldo |
| Gender | Misalnya Cuti Melahirkan hanya untuk perempuan |
| Tidak bertumpuk | Tidak boleh ada cuti aktif lain pada tanggal yang sama (409) |
| Batas cuti bersamaan | Lihat di bawah |
| Lampiran | Diperiksa saat persetujuan, misalnya surat dokter untuk sakit lebih dari 1 hari |

Pengajuan yang ditolak sistem tidak disimpan sebagai pengajuan, tetapi tercatat di log aktivitas (`leave.create`, status `failed`) supaya HR dapat merekapnya.

## Saldo

Saldo tidak disimpan sebagai satu angka, melainkan **riwayat transaksi** yang dijumlahkan:

| Transaksi | Nilai | Kapan |
| --- | --- | --- |
| `accrual` | + | Jatah tahunan, dibuat otomatis sekali per tahun |
| `hold` | − | Saat mengajukan, saldo ditahan |
| `deduction` | − | `hold` berubah jadi potongan saat disetujui |
| `refund` | + | Saat ditolak atau dibatalkan |
| `adjustment` | ± | Koreksi manual oleh pemegang `leave.adjust_balance` |

```
accrual   +12  → saldo 12
hold       -3  → saldo  9   pengajuan dibuat
                             ├── disetujui: hold jadi deduction, saldo tetap 9
                             └── ditolak  : refund +3, saldo kembali 12
```

Mulai 0.7.1, besar pengembalian dihitung dari transaksi pengajuan itu sendiri, sehingga tetap benar walaupun pengaturan jenis cuti diubah setelah pengajuan dibuat.

## Batas cuti bersamaan per departemen

Departemen dapat diberi `max_concurrent_leave`: paling banyak berapa orang boleh cuti pada hari yang sama. Kosong berarti tanpa batas.

- Yang dihitung hanya cuti rekan yang **sudah disetujui**.
- Diperiksa saat mengajukan, dan **diperiksa ulang saat menyetujui** (pemeriksaan yang menentukan).
- Cuti Sakit, Duka, dan Melahirkan tidak pernah ditolak karena batas ini.
- Bila penuh, jawabannya 409 `STAFFING_LIMIT_REACHED`. Pemegang `leave.approve_all` dapat memaksa setuju dengan alasan minimal 10 karakter.
