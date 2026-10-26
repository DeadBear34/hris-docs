---
title: Leave Management
description: Leave workflow, approvers, balances, and concurrent leave limits in 0.6.
---

# Leave Management

## Workflow

```
Submitted ──► pending ──┬── approve ──► approved ──┐
                        ├── reject ───► rejected   │ cancel (requester only)
                        └── cancel ────────────────┴──► cancelled
```

## Who approves

The approver is the requester's **manually assigned manager** (`manager_id`), recorded when the request is submitted.

| Approver | Requirement |
| --- | --- |
| Manager (`manager_id`) | Their position holds `leave.approve_team` |
| HR and administrators | Hold `leave.approve_all` |

Requesters without a `manager_id` have no direct approver; HR or an administrator decides their requests. Nobody can decide their own leave.

:::caution Limitation in 0.6
The approver does not change when the requester's manager changes after submission. Requests assigned to a manager who moved or was deactivated can only be decided by HR or an administrator. Since 0.7, such requests are rerouted automatically.
:::

## Validation on submission

| Rule | Details |
| --- | --- |
| Duration | Counted in working days; weekends and holidays are excluded |
| Past dates | Rejected, except for sick leave |
| Maximum days and minimum notice | Defined per leave type |
| Balance | Must be sufficient for leave types that deduct balance |
| No overlap | No other active request may cover the same dates |
| Concurrent leave limit | New in 0.6.0, see below |

## Leave balance

The balance is the sum of a transaction ledger: annual `accrual`, `hold` on submission, `deduction` on approval, `refund` on rejection or cancellation, and manual `adjustment`.

## Concurrent leave limit per department

**New in 0.6.0.** A department can set `max_concurrent_leave`. Colleagues' approved leave counts toward the limit; when it is reached, submission and approval are rejected with `409 STAFFING_LIMIT_REACHED`. Sick, bereavement, and maternity leave are exempt. Holders of `leave.approve_all` can override the limit with a reason.
