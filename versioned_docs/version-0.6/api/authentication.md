---
title: Authentication
description: Obtaining and sending a token in 0.6.
---

# Authentication

Sign in with `POST /api/v1/auth/login`, then send the returned token in the `Authorization: Bearer <token>` header of every request.

A token is valid for 24 hours. It is rejected earlier only when the password is changed or reset, or the account is deactivated or deleted. In 0.6, `POST /auth/logout` does not revoke the token on the server; token revocation was introduced in 0.7.0.
