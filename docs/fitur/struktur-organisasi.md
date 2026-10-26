---
sidebar_position: 2
title: Struktur Organisasi
---

# Struktur Organisasi

:::info Baru di 0.7
Sebelum 0.7, atasan diisi manual per karyawan (`manager_id`). Mulai 0.7, hierarki disimpan pada **struktur jabatan**.
:::

Polanya mengikuti *Position Management* yang dipakai SAP, Workday, dan Oracle HCM:

```
Unit organisasi (bertingkat)  →  Jabatan (milik unit, punya atasan jabatan)  →  Pemegang (karyawan)
```

| Lapis | Kolom kunci |
| --- | --- |
| Unit | `parent_id` (unit induk), `unit_type`: company, directorate, division, department, team |
| Jabatan | `department_id` (unit pemilik), `reports_to_position_id` (atasan jabatan), `is_unit_head`, `max_holders` |
| Pemegang | `position_id`. Departemen karyawan diisi otomatis dari unit jabatannya |

Kenapa ditempel di jabatan: bila seorang atasan keluar, penggantinya cukup ditempatkan di jabatan yang sama dan seluruh bawahannya otomatis ikut ke dia, tanpa mengubah data bawahan satu per satu.

## Struktur PT Archenix

```
PT Archenix Komputasi Indonesia ── CEO
├── Direktorat Teknologi ───────── CTO
│   ├── Artificial Intelligence
│   ├── Data Center Infrastructure
│   ├── Engineering
│   └── Quality Assurance
├── Direktorat Bisnis & Produk ─── CPO (kosong)
│   └── Product Management
└── Direktorat Operasional ─────── COO
    ├── Operations (NOC & fasilitas data center)
    ├── Human Resources
    └── Finance
```

Setiap departemen memakai jenjang yang sama:

| Level | Jenjang | Melapor ke |
| --- | --- | --- |
| 7 | Head / Director (C-level) | CEO, atau tidak ada untuk CEO |
| 6 | Manager (kepala unit) | C-level direktoratnya |
| 5 | Lead / Supervisor | Manager |
| 4 | Senior | Lead |
| 3 | Mid | Lead |
| 2 | Junior | Lead |

## Menghitung atasan langsung

1. **Pengecualian manual** (`manager_id`) diisi dan orangnya aktif → itulah atasannya (`source: override`).
2. Selain itu, naik dari jabatan karyawan ke atasan jabatannya. **Jabatan kosong dilewati** sampai ditemukan pemegang aktif (`source: structure`, `levels_up` = jumlah tingkat yang dinaiki).
3. Sampai puncak tetap tidak ada → tidak ada atasan; cutinya ditangani HR dan admin.

Hanya karyawan aktif, belum resign, dengan akun aktif yang dihitung. Rekan sejabatan tidak pernah dianggap atasan.

| Karyawan | Proses | Atasan |
| --- | --- | --- |
| Backend Developer | Naik 1 ke Engineering Lead | Pemegang Engineering Lead |
| Product Manager | CPO kosong, dilewati, naik ke CEO | CEO (`levels_up: 2`) |
| CEO | Puncak | Tidak ada |

## Aturan yang menjaga struktur

| # | Aturan |
| --- | --- |
| V1 | Unit tidak boleh menjadi induk dirinya atau sub-unitnya |
| V2 | Jabatan tidak boleh melapor ke dirinya atau bawahannya |
| V3 | Jabatan biasa melapor ke jabatan di unit yang sama |
| V4 | Kepala unit melapor ke jabatan di unit induknya; unit tidak bisa dipindah bila memutus hubungan ini |
| V5 | Hanya satu jabatan puncak |
| V6 | Unit atau jabatan yang masih berisi tidak boleh dihapus |
| V7 | Jumlah pemegang tidak melebihi `max_holders` |
| V8 | Kedalaman maksimal 15 tingkat |

## Saat struktur berubah

Penyetuju cuti dibekukan saat pengajuan dibuat. Bila sesudahnya struktur berubah (atasan jabatan diganti, karyawan pindah jabatan, akun atasan dinonaktifkan), **pengajuan yang masih menunggu dialihkan otomatis** ke atasan yang berlaku sekarang. Penyetuju baru menerima notifikasi tugas, dan tugas di penyetuju lama ditandai dibaca.

## Endpoint

| Endpoint | Akses | Isi |
| --- | --- | --- |
| `GET /org/tree` | `organization.manage` | Bagan organisasi lengkap |
| `GET /employees/:id/line-manager` | `employee.view_all` | Atasan langsung seorang karyawan |
| `GET /positions/:id/line-manager` | `employee.view_all` | Pratinjau atasan untuk pemegang jabatan itu |
