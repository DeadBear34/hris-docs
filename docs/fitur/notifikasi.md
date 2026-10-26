---
sidebar_position: 5
title: Notifikasi
---

# Notifikasi

Notifikasi disimpan di database lalu didorong ke browser lewat WebSocket (`wss://api.hris.click/ws`). Bila koneksi realtime putus, aplikasi tetap mengambil kotak masuk secara berkala.

## Kapan dikirim

| Kejadian | Penerima | Jenis |
| --- | --- | --- |
| Cuti diajukan | Atasan langsung (bila memegang `leave.approve_team`) dan semua pemegang `leave.approve_all`, kecuali pemohon | `leave_approval_needed` |
| Penyetuju dialihkan karena struktur berubah | Atasan baru (bila memegang `leave.approve_team`) | `leave_approval_needed` |
| Cuti diputus | Pemohon, yang memutus, atasan yang ditugaskan, dan pemegang `leave.view_all` | `leave_status_changed` |
| Akun baru terverifikasi | Pemegang `employee.approve_user` | `account_approval_needed` |

## Tugas yang sudah selesai

Notifikasi "perlu disetujui" **ditandai dibaca** (bukan dihapus) begitu tugasnya selesai, misalnya cuti sudah diputus orang lain atau dibatalkan pemohon. Riwayatnya tetap ada, tetapi lencana tidak lagi menghitungnya. Browser diberi tahu lewat event realtime `notification.read`.

Saat penyetuju dialihkan, tugas di penyetuju lama ditandai dibaca, kecuali ia pemegang `leave.approve_all` yang memang tetap berwenang memutus.

## Event WebSocket

| Event | Isi |
| --- | --- |
| `ready` | Jumlah notifikasi belum dibaca setelah autentikasi |
| `notification.created` | Notifikasi baru |
| `notification.read` | Daftar id yang ditandai dibaca oleh sistem |
| `notification.cleared` | Daftar id yang dihapus |
