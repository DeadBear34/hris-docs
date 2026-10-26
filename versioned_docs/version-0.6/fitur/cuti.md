---
sidebar_position: 2
title: Cuti
---

# Cuti

## Alur

```
Karyawan mengajukan ──► pending ──┬── disetujui ──► approved ──┐
                                  ├── ditolak ────► rejected   │ dibatalkan pemohon
                                  └── dibatalkan ──────────────┴──► cancelled
```

## Siapa yang menyetujui

Penyetuju adalah **atasan yang diisi manual** pada data pemohon (`manager_id`), dicatat saat pengajuan dibuat.

| Penyetuju | Syarat |
| --- | --- |
| Atasan (`manager_id`) | Jabatannya memegang `leave.approve_team` |
| HR / admin | Memegang `leave.approve_all` |

Pemohon tanpa `manager_id` tidak punya penyetuju langsung; pengajuannya diputus HR atau admin. Tidak ada yang boleh memutus cutinya sendiri.

:::caution Keterbatasan di 0.6
Penyetuju tidak berubah walaupun atasan pemohon diganti setelah pengajuan dibuat. Pengajuan yang menunjuk atasan yang sudah pindah atau nonaktif hanya bisa diputus HR atau admin. Di 0.7 pengajuan seperti ini dialihkan otomatis.
:::

## Aturan saat mengajukan

| Aturan | Keterangan |
| --- | --- |
| Durasi | Hari kerja; Sabtu, Minggu, dan hari libur tidak dihitung |
| Tanggal lampau | Ditolak, kecuali Cuti Sakit |
| Batas hari dan pemberitahuan minimal | Mengikuti jenis cuti |
| Saldo | Harus cukup untuk jenis cuti yang memotong saldo |
| Tidak bertumpuk | Tidak boleh ada cuti aktif lain pada tanggal yang sama |
| Batas cuti bersamaan | Baru di 0.6.0, lihat di bawah |

## Saldo

Saldo dihitung dari riwayat transaksi: jatah tahunan (`accrual`), penahanan saat mengajukan (`hold`), potongan saat disetujui (`deduction`), pengembalian saat ditolak atau dibatalkan (`refund`), dan koreksi manual (`adjustment`).

## Batas cuti bersamaan per departemen

**Baru di 0.6.0.** Departemen dapat diberi `max_concurrent_leave`. Cuti rekan yang sudah disetujui dihitung; bila penuh, pengajuan dan persetujuan ditolak 409 `STAFFING_LIMIT_REACHED`. Cuti Sakit, Duka, dan Melahirkan dikecualikan. Pemegang `leave.approve_all` dapat memaksa setuju dengan alasan.
