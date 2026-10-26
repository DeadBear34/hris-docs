---
title: Accessing HRIS
description: How accounts are created, how to sign in, and what can block access.
---

# Accessing HRIS

## Getting an account

There are two ways to get an account:

| Method | Who creates it | Can sign in |
| --- | --- | --- |
| Created by HR | A user with `employee.create`, from the Add Employee form or a CSV import | Immediately. The user must change the initial password on first sign-in |
| Self-registration | The user, from the **Register** page | After the email is verified **and** the account is approved by a user with `employee.approve_user` |

### Self-registration steps

1. Open [hris.click](https://hris.click) and select **Register**.
2. Enter your full name, email, phone number (with country code, for example `+62812...`), gender, and password, and accept the terms.
3. Enter the 6-digit verification code sent to your email. The code is valid for 10 minutes.
4. Wait for approval. Approvers are notified as soon as your email is verified.

Password requirements: 8 to 72 characters, including an uppercase letter, a lowercase letter, a number, and a symbol.

## Signing in

Sign in with your email and password. A session lasts 24 hours.

| Message | Meaning |
| --- | --- |
| Incorrect email or password | The credentials do not match |
| Your email is not verified yet | Enter the verification code from your email first |
| Your account is still waiting for admin approval | An approver has not approved the account yet |
| Your account has been deactivated | Contact an administrator |

Signing out revokes the current session immediately. Sessions on other devices stay active; change your password to sign out everywhere.

## Installing the app

HRIS is a Progressive Web App. In a supported browser, choose **Install** (or **Add to Home Screen** on mobile) to use it like a native app. When a new version is deployed, a **New version available** banner appears; select **Reload** when you are ready, so unsaved form input is never lost.
