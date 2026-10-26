---
title: Rate Limits
description: Request limits in 0.6.
---

# Rate Limits

| Scope | Limit |
| --- | --- |
| All endpoints | 300 requests per minute per user (or IP when not signed in) |
| `POST /auth/login` | 5 attempts per minute per IP and email pair |
| `GET /employees` | 100 requests per minute per user |
| `POST /employees` | 20 requests per minute per user |

A `429` response includes a `Retry-After` header with the number of seconds to wait.
