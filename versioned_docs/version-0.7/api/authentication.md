---
title: Authentication
description: Obtaining a token, sending it, and when it stops working.
---

# Authentication

The API uses JSON Web Tokens (JWT) sent as Bearer tokens.

## Obtain a token

```http
POST /api/v1/auth/login
Content-Type: application/json

{ "email": "name@hris.click", "password": "your-password" }
```

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOi...",
    "user": { "id": "…", "email": "name@hris.click", "role": "employee", "must_change_password": false }
  }
}
```

## Send the token

Include the token in the `Authorization` header of every request:

```http
GET /api/v1/auth/me
Authorization: Bearer eyJhbGciOi...
```

## Token lifetime

A token is valid for **24 hours**. It stops working earlier, with `401 UNAUTHORIZED`, when:

| Event | Effect |
| --- | --- |
| `POST /auth/logout` | The token used for the request is revoked |
| Password changed or reset | Every token issued before the change is rejected |
| Account deactivated or deleted | Every token of the account is rejected |

## Real-time connection

The WebSocket at `wss://api.hris.click/ws` authenticates with the same token. Send it as the first message after connecting:

```json
{ "action": "auth", "token": "eyJhbGciOi..." }
```

The connection is closed with code `4001` if the token is invalid, or `4002` if no token arrives within 10 seconds.

## Permissions

Endpoints that require a feature respond `403 FORBIDDEN` with `details.required_feature` when the user's position does not hold it. Each operation in the [API reference](pathname:///api/) lists the access it requires.
