---
title: Errors
description: Response envelope and status codes in 0.6.
---

# Errors

Error responses use the envelope `{ "success": false, "message", "code", "details"?, "errors"? }`.

| Status | `code` | Meaning |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR`, `BAD_REQUEST`, `INVALID_JSON` | Invalid input or a violated business rule |
| 401 | `UNAUTHORIZED` | Not signed in, or the token is invalid or expired |
| 403 | `FORBIDDEN` | The user lacks the required feature |
| 404 | `NOT_FOUND` | The record or route does not exist |
| 409 | `CONFLICT`, `STALE_DATA`, `STAFFING_LIMIT_REACHED` | Conflicting data, a stale edit, or a full department leave quota |
| 429 | `RATE_LIMIT_EXCEEDED`, `TOO_MANY_REQUESTS` | Too many requests |
