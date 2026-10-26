---
title: Attendance
description: Attendance rules in 0.6.
---

# Attendance

Attendance rules in 0.6 are the same as in 0.7:

- Working hours use the office time zone (WIB, UTC+7).
- Schedules resolve in order: the employee's own schedule, the department's schedule, then the default schedule.
- Statuses are `present`, `late`, `absent`, `leave`, and `holiday`. Check-in is rejected after it closes for the day.
- Offline check-ins are accepted within time limits and recorded with source `offline_sync`.
- A nightly job marks employees who did not check in on a working day as `absent`.

See the [latest attendance guide](pathname:///docs/guides/attendance) for full details.
