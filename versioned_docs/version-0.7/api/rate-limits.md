---
title: Rate Limits
description: Request limits per endpoint and how to handle them.
---

# Rate Limits

| Scope | Limit | Counted per |
| --- | --- | --- |
| All endpoints | 300 requests per minute | Signed-in user, or IP address when not signed in |
| `POST /auth/login` | 5 attempts per minute | IP address and email pair |
| `GET /employees` | 100 requests per minute | Signed-in user |
| `POST /employees` | 20 requests per minute | Signed-in user |
| `POST /auth/resend-verification` | 1 request per 60 seconds | Email |

Sign-in attempts are counted per IP **and** email, so a whole office sharing one public IP is not locked out together, and nobody can lock someone else's account from elsewhere.

## Response headers

| Header | Meaning |
| --- | --- |
| `X-RateLimit-Limit` | The limit that applies to this request |
| `X-RateLimit-Remaining` | Requests left in the current window |
| `Retry-After` | Seconds to wait, sent with `429` responses |

When a request passes through more than one limit, the headers describe the limit with the fewest requests remaining.

## Handling 429

Wait for the number of seconds in `Retry-After`, then retry. Do not retry immediately in a loop.
