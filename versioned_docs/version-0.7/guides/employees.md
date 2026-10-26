---
title: Employees
description: Creating, editing, and deactivating employees, and how position, department, and manager relate.
---

# Employees

Each employee has one employee record and, if they can sign in, one account. Employee numbers are assigned sequentially (`001`, `002`, and so on).

## Adding employees

| Method | Required permission | Notes |
| --- | --- | --- |
| Add Employee form | `employee.create` | Up to 4 employees at once, with accounts and initial passwords |
| CSV import | `employee.create` | Many employees at once; errors are reported per row and nothing is saved if any row fails |
| Self-registration | None | See [Accessing HRIS](../getting-started/accessing-hris.md) |

Employees created by HR must change their initial password on first sign-in.

## Position, department, and manager

The three fields are linked:

1. **Choose a position.** The position list can be filtered by department.
2. **The department is filled in automatically** from the unit that owns the position. A position from another unit is rejected.
3. **The line manager is derived automatically** from the position structure. The form previews the manager as soon as a position is selected.

The **Manager override** field is only for exceptions, such as an employee who temporarily reports to someone else. When set, it takes precedence over the structure. Clear it to go back to the derived manager. See [Organization structure](organization-structure.md).

**Seat limits.** Positions with a `max_holders` value (for example, one head per unit) reject additional holders once full.

## Editing and deactivating

- Edits use optimistic concurrency: if someone else changed the record after you opened it, the save is rejected with `409 STALE_DATA` and you are asked to reload.
- Changing an employee's position, manager override, or active status **reroutes their pending leave requests** to the current line manager.
- Inactive and resigned employees cannot check in and are never chosen as anyone's manager.
- Deleting an employee is rejected while they are still someone's manager override.
