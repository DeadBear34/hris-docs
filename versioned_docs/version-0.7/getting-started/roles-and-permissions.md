---
title: Roles and Permissions
description: How access is granted through positions and features.
---

# Roles and Permissions

HRIS separates **roles** from **permissions**.

- A **role** is a property of the account. There are only two: `admin` and `employee`. Administrators bypass every permission check.
- A **permission** is a **feature** granted to a **position**. Every employee holding that position gets its features.

HR, for example, is not a role. The HR Manager position simply holds features such as `leave.approve_all`, `employee.create`, and `organization.manage`. Administrators manage these grants on the **Features** page without code changes.

## Feature catalog

| Category | Feature | Grants |
| --- | --- | --- |
| Employees | `employee.view_all` | View every employee |
| | `employee.create` | Add employees and their accounts |
| | `employee.update` | Edit employees |
| | `employee.delete` | Delete employees |
| | `employee.approve_user` | Approve self-registered accounts |
| Organization | `organization.manage` | Manage units, positions, and view the org chart |
| | `organization.schedule` | Manage work schedules |
| | `organization.holiday` | Manage holidays |
| Leave | `leave.approve_team` | Approve leave of direct reports |
| | `leave.approve_all` | Approve anyone's leave |
| | `leave.view_all` | View every leave request |
| | `leave.manage_type` | Manage leave types |
| | `leave.adjust_balance` | Adjust leave balances manually |
| Attendance | `attendance.view_team` | View direct reports' attendance |
| | `attendance.view_all` | View everyone's attendance |
| | `attendance.correct` | Correct attendance records |
| | `attendance.report` | Access attendance reports |
| System | `system.manage_feature` | Manage feature grants |
| | `system.view_log` | View the activity log |
| | `system.view_api_docs` | View the in-app API documentation |

## Default grants

| Position type | Features |
| --- | --- |
| C-level (CEO, CTO, COO, CPO) | Team approval and attendance, plus view-all for employees, leave, and attendance |
| Manager and Lead / Supervisor | `leave.approve_team`, `attendance.view_team` |
| HR Manager | Full HR set, including `leave.approve_all`, `organization.manage`, and `system.view_log` |
| HR Supervisor and HR officers | Employee management and view-all access |
| Other staff | None beyond their own data |

Being someone's manager is not enough to approve their leave: the manager's position must also hold `leave.approve_team`.
