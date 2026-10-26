---
title: Errors
description: Response envelope, HTTP status codes, and error codes.
---

# Errors

## Response envelope

Successful responses:

```json
{ "success": true, "message": "Optional message", "data": {}, "meta": {} }
```

Error responses:

```json
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": [{ "field": "email", "message": "Invalid email format, example: name@domain.com" }]
}
```

`details` carries extra context for some errors, for example `details.full_dates` for a concurrent leave limit or `details.current` for stale data.

## Status codes

| Status | `code` | Meaning |
| --- | --- | --- |
| 400 | `VALIDATION_ERROR` | One or more fields are invalid; see `errors[]` |
| 400 | `BAD_REQUEST` | A business rule was violated, for example an insufficient balance |
| 400 | `INVALID_JSON` | The request body is not valid JSON |
| 401 | `UNAUTHORIZED` | Not signed in, or the token is invalid, expired, or revoked |
| 403 | `FORBIDDEN` | The user lacks the required feature |
| 404 | `NOT_FOUND` | The record or route does not exist |
| 409 | `CONFLICT` | Conflicts with existing data, for example a duplicate email or overlapping leave |
| 409 | `STALE_DATA` | The record changed since it was loaded |
| 409 | `STAFFING_LIMIT_REACHED` | The department's concurrent leave limit is reached |
| 413 | `PAYLOAD_TOO_LARGE` | The request body is larger than 100 KB |
| 415 | `UNSUPPORTED_ENCODING` | Compressed request bodies (`gzip`, `br`, `deflate`) are not accepted (since 0.7.1) |
| 429 | `RATE_LIMIT_EXCEEDED`, `TOO_MANY_REQUESTS` | Too many requests; see [Rate limits](rate-limits.md) |
| 500 | — | Unexpected server error |
