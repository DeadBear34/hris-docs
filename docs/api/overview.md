---
title: API Overview
description: Base URL, conventions, versioned API reference, and changes since 0.6.
---

# API Overview

The HRIS API is a JSON REST API.

| | |
| --- | --- |
| Base URL | `https://api.hris.click/api/v1` |
| Format | JSON (`Content-Type: application/json`); file uploads use `multipart/form-data` |
| Authentication | Bearer token, see [Authentication](authentication.md) |
| Time zone | Timestamps are ISO 8601 in UTC; dates such as `attendance_date` are office dates (WIB) |

## API reference

The complete endpoint reference is generated from the backend routes and validation schemas, and one copy is published for each release.

| Backend version | Reference |
| --- | --- |
| **0.7.1** (latest) | [Open the 0.7.1 API reference](pathname:///api/?v=0.7.1) |
| 0.6.1 | [Open the 0.6.1 API reference](pathname:///api/?v=0.6.1) |

Users with `system.view_api_docs` can also open the API documentation inside the HRIS app, which always matches the running server.

## Pagination

List endpoints accept `page` (starting at 1) and `limit` (at most 100) and return a `meta` object:

```json
{ "page": 1, "limit": 10, "total": 42, "total_pages": 5 }
```

## Optimistic concurrency

Update requests for editable records accept the `updated_at` value the client loaded. If the record changed in the meantime, the API responds `409 STALE_DATA` with the current record in `details.current`, so the client can show what changed.

## Changes since 0.6

| Endpoint | Change |
| --- | --- |
| `GET /org/tree` | New: organization chart |
| `GET /employees/:id/line-manager` | New: an employee's line manager |
| `GET /positions/:id/line-manager` | New: line manager preview for a position |
| `GET /auth/verification-code` | New: verification code for QA (administrators only) |
| `POST /positions` | **Breaking:** `department_id` is required; codes and names are unique within a unit |
| `POST`/`PATCH /departments` | New fields `parent_id` and `unit_type` |
| `GET /health` | New field `version` (0.7.1) |
| All endpoints | Compressed request bodies are rejected with `415` (0.7.1) |
