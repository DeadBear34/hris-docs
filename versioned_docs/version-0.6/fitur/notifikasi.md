---
sidebar_position: 4
title: Notifikasi
---

# Notifikasi

Notifikasi disimpan di database lalu didorong ke browser lewat WebSocket.

| Kejadian | Penerima |
| --- | --- |
| Cuti diajukan | Atasan pemohon (`manager_id`) |
| Cuti diputus | Pemohon dan pemegang `leave.view_all` |
| Akun baru terverifikasi | Pemegang `employee.approve_user` |

:::caution Keterbatasan di 0.6
- Pemegang `leave.approve_all` (misalnya HR Manager) tidak selalu menerima notifikasi pengajuan baru, walaupun berwenang memutusnya.
- Notifikasi "perlu disetujui" **dihapus** setelah pengajuan diputus, sehingga riwayatnya hilang.

Keduanya diperbaiki di 0.7.0: semua yang berwenang menerima notifikasi, dan tugas yang selesai ditandai dibaca, bukan dihapus.
:::
