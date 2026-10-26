---
title: Leave Management
description: Leave workflow, approvers, validation rules, balances, and concurrent leave limits.
---

# Leave Management

## Workflow

```
Submitted ──► pending ──┬── approve ──► approved ──┐
                        ├── reject ───► rejected   │ cancel (requester only,
                        └── cancel ────────────────┴──► cancelled   before the start date)
```

- Only the requester can cancel their own request.
- Approved leave can be cancelled only until its first day.
- If two people act at the same time (for example, a manager approves while the requester cancels), one of them receives `409` and is asked to reload.

## Who approves

Approval is **single-level** and goes to the requester's **line manager**, derived from the [organization structure](organization-structure.md) when the request is submitted.

| Approver | Requirement |
| --- | --- |
| Line manager | Their position holds `leave.approve_team` |
| HR and administrators | Hold `leave.approve_all` (or are administrators). They can decide any request, for example when the manager is unavailable |

**Nobody can decide their own leave**, administrators included. Requests without a line manager (for example, the CEO's) are decided by another `leave.approve_all` holder or an administrator.

Pending requests are **rerouted automatically** when the structure changes, so they never get stuck with a manager who moved or was deactivated.

## Validation on submission

| Rule | Details |
| --- | --- |
| Duration | Counted in working days; weekends and holidays are excluded |
| Past dates | Rejected, except for sick leave |
| Maximum days per request | `max_days_per_request` of the leave type |
| Minimum notice | `min_notice_days` of the leave type |
| Balance | Must be sufficient for leave types that deduct balance |
| Gender | For example, maternity leave is limited to female employees |
| No overlap | No other active request may cover the same dates (`409`) |
| Concurrent leave limit | See below |
| Attachments | Checked at approval time, for example a doctor's note for sick leave longer than one day |

Rejected submissions are not stored as requests, but they are recorded in the activity log (`leave.create` with status `failed`) so HR can review them.

## Leave balance

A balance is not stored as a single number. It is the sum of a transaction ledger:

| Transaction | Sign | When |
| --- | --- | --- |
| `accrual` | + | Annual allocation, created automatically once per year |
| `hold` | − | On submission, the balance is reserved |
| `deduction` | − | The hold becomes a deduction when approved |
| `refund` | + | On rejection or cancellation |
| `adjustment` | ± | Manual correction by a `leave.adjust_balance` holder |

```
accrual   +12  → balance 12
hold       -3  → balance  9   request submitted
                               ├── approved: hold becomes deduction, balance stays 9
                               └── rejected: refund +3, balance back to 12
```

Since 0.7.1, refunds are calculated from the request's own transactions, so they stay correct even if the leave type's settings change after submission.

## Concurrent leave limit per department

A department can set `max_concurrent_leave`: the maximum number of employees who may be on leave on the same day. Empty means no limit.

- Only colleagues' **approved** leave counts toward the limit.
- The limit is checked on submission and **checked again on approval**, which is the decisive check.
- Sick, bereavement, and maternity leave are never rejected by the limit.
- When the limit is reached, the response is `409 STAFFING_LIMIT_REACHED`. Holders of `leave.approve_all` can override it with a reason of at least 10 characters.
