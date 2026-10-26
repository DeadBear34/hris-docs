---
title: Registration Testing
description: Testing the registration flow in 0.6.
---

# Registration Testing

0.6 has **no endpoint** for retrieving verification codes. The 6-digit code is available only from:

- the registrant's **email inbox**, when email delivery is enabled; or
- the **server log**, when email delivery fails or is disabled (`MAIL_DRIVER=log`).

## Steps

1. `POST /auth/register`
2. Read the code from the email or the server log.
3. `POST /auth/verify-email` with `email` and `code`.
4. An administrator approves the account with `PATCH /users/{id}/approve`.
5. Sign in with the new account.

For automated QA, use 0.7, which provides [`GET /auth/verification-code`](pathname:///docs/testing/registration-testing).
