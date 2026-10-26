---
title: Introduction
description: What HRIS 0.6 covers and how it differs from 0.7.
slug: /intro
---

# Introduction

This documentation covers **HRIS 0.6.x**, released on October 13–14, 2026. This version is no longer maintained; use the [latest version](pathname:///docs/intro) where possible.

## What changed in 0.7

| Area | 0.6 | 0.7 |
| --- | --- | --- |
| Line manager | Set manually per employee (`manager_id`) | Derived from the position structure |
| Departments and positions | Flat lists; positions are company-wide | Nested units; positions belong to units and report to other positions |
| Leave approver | The requester's `manager_id` | The derived line manager, rerouted automatically when the structure changes |
| Sessions | Read from the database on every request | Cached in Redis; signing out revokes the token |
| Verification codes for QA | Read from the email or the server log | `GET /auth/verification-code` for administrators |

## Modules

| Module | Guide |
| --- | --- |
| Employees, departments, and positions | [Employees](guides/employees.md) |
| Leave management | [Leave management](guides/leave-management.md) |
| Attendance | [Attendance](guides/attendance.md) |
| Notifications | [Notifications](guides/notifications.md) |
