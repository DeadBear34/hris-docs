---
title: Employees
description: Employee records, departments, positions, and manually assigned managers.
---

# Employees

Each employee has one employee record and, if they can sign in, one account.

## Departments, positions, and managers

In 0.6 these fields are **independent** and set manually:

| Field | Behavior in 0.6 |
| --- | --- |
| Department | A flat list without parents. A department can set a concurrent leave limit (`max_concurrent_leave`) |
| Position | Company-wide; codes and names are unique across the company and not tied to a department |
| Manager (`manager_id`) | Chosen manually per employee. This is who approves the employee's leave |

The consequence: when a manager leaves or moves, every one of their reports must be updated one by one. The [organization structure in 0.7](pathname:///docs/guides/organization-structure) removes this limitation.

HRIS rejects manager assignments that would create a cycle (A manages B while B manages A).

## Editing

Edits use optimistic concurrency: if someone else changed the record after you opened it, the save is rejected with `409 STALE_DATA`.
