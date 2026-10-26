---
title: Organization Structure
description: Units, positions, reporting lines, and how line managers are derived.
---

# Organization Structure

:::info New in 0.7
Before 0.7, managers were set manually per employee (`manager_id`). Since 0.7, reporting lines live in the **position structure**.
:::

HRIS follows the *position management* model used by SAP, Workday, and Oracle HCM:

```
Organizational unit (nested)  →  Position (owned by a unit, reports to a position)  →  Holder (employee)
```

| Layer | Key fields |
| --- | --- |
| Unit | `parent_id` (parent unit), `unit_type`: `company`, `directorate`, `division`, `department`, `team` |
| Position | `department_id` (owning unit), `reports_to_position_id` (superior position), `is_unit_head`, `max_holders` |
| Holder | `position_id`. The employee's department is filled in from the position's unit |

**Why positions and not people:** when a manager leaves, their replacement takes over the same position and every direct report follows automatically. No employee record has to be edited.

## PT Archenix structure

```
PT Archenix Komputasi Indonesia ── CEO
├── Technology Directorate ─────── CTO
│   ├── Artificial Intelligence
│   ├── Data Center Infrastructure
│   ├── Engineering
│   └── Quality Assurance
├── Business & Product Directorate ── CPO (vacant)
│   └── Product Management
└── Operations Directorate ──────── COO
    ├── Operations (NOC and data center facilities)
    ├── Human Resources
    └── Finance
```

Every department uses the same career levels:

| Level | Career level | Reports to |
| --- | --- | --- |
| 7 | Head / Director (C-level) | CEO, or nobody for the CEO |
| 6 | Manager (unit head) | The C-level of its directorate |
| 5 | Lead / Supervisor | Manager |
| 4 | Senior | Lead |
| 3 | Mid-level | Lead |
| 2 | Junior | Lead |

## How the line manager is derived

1. If a **manager override** (`manager_id`) is set and that person is active, they are the line manager (`source: override`).
2. Otherwise, walk up from the employee's position to its superior position. **Vacant positions are skipped** until an active holder is found (`source: structure`; `levels_up` is the number of levels climbed).
3. If nobody is found up to the top, the employee has no line manager and HR or administrators handle their leave.

Only active, non-resigned employees with an active account are considered. Peers holding the same position are never each other's manager.

| Employee | Walk | Line manager |
| --- | --- | --- |
| Backend Developer | Up 1 level to Engineering Lead | The Engineering Lead |
| Product Manager | CPO is vacant and skipped, up to the CEO | The CEO (`levels_up: 2`) |
| CEO | Top of the structure | None |

## Structure rules

| Rule | Description |
| --- | --- |
| V1 | A unit cannot be the parent of itself or of its own sub-unit |
| V2 | A position cannot report to itself or to one of its subordinates |
| V3 | Regular positions report to a position in the same unit |
| V4 | Unit heads report to a position in the parent unit; a unit cannot be moved if that link would break |
| V5 | There is only one top position |
| V6 | Units and positions that still contain something cannot be deleted |
| V7 | A position cannot have more holders than `max_holders` |
| V8 | The structure is at most 15 levels deep |

## When the structure changes

The leave approver is fixed when a request is submitted. If the structure changes afterwards (a superior position changes, an employee moves, or a manager's account is deactivated), **pending requests are rerouted automatically** to the current line manager. The new approver receives a notification, and the task in the previous approver's inbox is marked as read.

## Related endpoints

| Endpoint | Permission | Returns |
| --- | --- | --- |
| `GET /org/tree` | `organization.manage` | The full organization chart |
| `GET /employees/:id/line-manager` | `employee.view_all` | An employee's line manager |
| `GET /positions/:id/line-manager` | `employee.view_all` | The line manager a holder of that position would get |
