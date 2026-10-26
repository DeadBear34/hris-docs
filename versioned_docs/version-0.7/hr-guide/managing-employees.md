---
title: Managing Employees
description: Add, update, and deactivate employees.
---

# Managing Employees

Employees are managed from the **Karyawan** (Employees) menu.

## Add employees

| Option | Menu | Use it to |
| --- | --- | --- |
| Form | **Karyawan › Tambah Karyawan** | Add up to 4 employees at once |
| CSV import | **Karyawan › Impor CSV** | Add many employees from a spreadsheet; download the template first |

For each employee, choose a **position** first. The **department** is filled in from the position, and the form shows who the employee's **line manager** will be. New employees receive an account and must change their initial password at first sign-in.

If any row of a CSV import has a problem, nothing is imported and every problem is listed by row, so you can fix the file and try again.

## The manager field

The line manager is worked out from the organization structure, so you normally leave the manager field empty. Set it only for exceptions, for example an employee who temporarily reports to someone outside their unit. Clear it to return to the automatic manager. See [Organization structure](organization-structure.md).

## Update employees

Open an employee from **Karyawan › Daftar Karyawan** (Employee List) and select edit. If someone else changed the same employee while you were editing, HRIS asks you to reload so nothing is overwritten.

Changing an employee's position, manager, or active status moves their pending leave requests to the right manager automatically.

## Deactivate or remove employees

- **Deactivate** an employee who should no longer sign in or record attendance. Their history is kept.
- **Delete** removes the employee and their account. An employee can't be deleted while other employees are assigned to them as their manager.

Positions have a maximum number of holders where configured (for example, one head per unit). An employee can't be added to a position that is already full.
