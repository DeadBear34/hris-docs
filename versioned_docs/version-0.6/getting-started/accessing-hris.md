---
title: Accessing HRIS
description: How accounts are created and how to sign in.
---

# Accessing HRIS

| Method | Who creates it | Can sign in |
| --- | --- | --- |
| Created by HR | A user with `employee.create` | Immediately; the initial password must be changed on first sign-in |
| Self-registration | The user, from the **Register** page | After the email is verified **and** an approver approves the account |

To self-register, enter your details on the **Register** page, verify the 6-digit code sent to your email (valid for 10 minutes), and wait for approval.

A session lasts 24 hours. In 0.6, signing out does not revoke the token on the server: the token stays valid until it expires, unless the password is changed or the account is deactivated.
