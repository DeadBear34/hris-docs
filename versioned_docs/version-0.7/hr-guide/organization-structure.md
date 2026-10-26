---
title: Organization Structure
description: Units, positions, reporting lines, and how line managers are determined.
---

# Organization Structure

:::info New in 0.7
Before 0.7, each employee's manager was set by hand. Since 0.7, reporting lines are defined once, between **positions**, and every employee's manager follows from their position.
:::

The structure has three layers:

```
Units (company, directorates, departments)  →  Positions in each unit  →  Employees holding them
```

Reporting lines belong to positions, not to people. When a manager leaves, the person who takes over their position automatically becomes the manager of the whole team; no employee needs to be edited.

## The PT Archenix structure

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

Each department has the same career levels: **Manager** (head of the unit), **Lead / Supervisor**, then **Senior**, **Mid-level**, and **Junior**, who report to the Lead.

View the full chart, with the people in each position, under **Struktur Organisasi** (Organization Structure).

## How a line manager is determined

1. If HR assigned the employee a manager by hand, that person is the manager.
2. Otherwise, HRIS looks at the position the employee's position reports to. If that position is **vacant**, HRIS moves up one more level, until it finds someone.
3. If nobody is found up to the top, HR handles the employee's leave.

For example, the CPO position is vacant, so the Product Manager's leave goes to the CEO.

## Setting up units and positions

- Create and edit units under **Department**: each unit can sit under a parent unit.
- Create and edit positions under **Position**: choose the unit, the position it reports to, whether it is the head of the unit, and optionally the maximum number of holders.

HRIS keeps the structure consistent and blocks changes that would break it, for example:

- a unit placed under one of its own sub-units, or a position reporting to one of its own subordinates;
- a regular position reporting to a position in a different unit (only unit heads report to the parent unit);
- a second top position next to the CEO;
- deleting a unit or position that still has people, positions, or sub-units in it;
- moving a position to another unit while other positions still report to it.

## When the structure changes

Pending leave requests always follow the current structure. When a reporting line changes, an employee moves, or a manager's account is deactivated, their pending requests are passed to the new manager automatically, and the new manager is notified.
