---
title: Introduction
description: What HRIS is, what it covers, and how this documentation is organized.
slug: /intro
---

# Introduction

HRIS (Human Resource Information System) is the internal platform PT Archenix Komputasi Indonesia uses to manage employees, the organization structure, leave, and attendance. PT Archenix is a data center and artificial intelligence company.

This documentation covers **HRIS 0.7.x**. Use the version menu in the top-right corner to read the documentation for other versions.

## Components

| Component | URL | Description |
| --- | --- | --- |
| Web app | [hris.click](https://hris.click) | Interface for employees, managers, HR, and administrators (React, installable as a PWA) |
| API | [api.hris.click](https://api.hris.click/health) | REST API and real-time notification WebSocket (Node.js, Express, PostgreSQL) |
| Documentation | docs.hris.click | This site: guides, API reference, and release history |

## Modules

| Module | What it does | Guide |
| --- | --- | --- |
| Employees | Employee records, accounts, photos, and bulk import | [Employees](guides/employees.md) |
| Organization structure | Nested units, positions, reporting lines, and the org chart | [Organization structure](guides/organization-structure.md) |
| Leave management | Requests, single-level approval, balances, and concurrent leave limits | [Leave management](guides/leave-management.md) |
| Attendance | Check-in and check-out, offline sync, corrections, and reports | [Attendance](guides/attendance.md) |
| Notifications | Inbox and real-time notifications | [Notifications](guides/notifications.md) |

## How this documentation is organized

- **Getting Started** explains how to access HRIS and how roles and permissions work.
- **Guides** describe each module: its workflow, business rules, and edge cases.
- **API** covers authentication, errors, and rate limits. The full endpoint reference is in [API Reference](pathname:///api/).
- **Testing** contains procedures for QA.
- The [Changelog](pathname:///changelog) lists every release. The [Versioning policy](pathname:///versioning) explains what each version number means.

## Check the running version

`GET https://api.hris.click/health` returns the backend version that is currently deployed:

```json
{ "success": true, "message": "Server running", "version": "0.7.1", "redis": "ready" }
```
