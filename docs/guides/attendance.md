---
title: Attendance
description: Work schedules, check-in rules, offline sync, end-of-day processing, and corrections.
---

# Attendance

All working-hour rules use the **office time zone (WIB, UTC+7)**, even though the server and database run in UTC.

## Work schedules

The schedule that applies to an employee is resolved in this order:

1. The employee's own schedule, if assigned.
2. Their department's schedule.
3. The default schedule (08:00–17:00, check-in closes at 08:10).

## Attendance status

Example with a start time of 08:00, a 5-minute grace period, and check-in closing at 08:10:

| Arrival | Status | Minutes late |
| --- | --- | --- |
| 08:00–08:05 | `present` | 0 |
| 08:06–08:10 | `late` | 6–10, counted from the start time |
| After 08:10 | Check-in rejected; marked `absent` at end of day | — |

Other statuses are `leave` (approved leave) and `holiday` (public holiday or collective leave).

## Check-in is rejected when

- check-in has closed for the day;
- the day is not a working day in the employee's schedule;
- the day is a holiday or collective leave;
- the employee is on approved leave;
- the employee already checked in that day (`409`);
- the employee is inactive or has resigned.

Check-out requires a check-in on the same day and cannot happen before the workday starts.

## Offline check-in

When the network is down, the app queues the check-in and sends it once online, together with the time the button was pressed (`offline_time`). The device time is treated as a claim and validated:

| Check | Limit |
| --- | --- |
| Not in the future | 2-minute tolerance |
| Sync delay | At most 6 hours |
| Same office date as the server | Required |
| Not too early before the start time | At most 2 hours |

Every offline record keeps a permanent audit trail (claimed time, time received by the server, and source `offline_sync`), which HR can review in the offline attendance report.

## End-of-day processing and corrections

- **End of day:** a scheduled job runs every night and marks employees who did not check in on a working day as `absent`, unless the day is a holiday or they are on leave.
- **Corrections:** users with `attendance.correct` can correct a record. The corrector and the reason are written to the record's note, and lateness is recalculated from the schedule.
- **Leave:** approving leave creates a `leave` record for each working day; cancelling approved leave removes them.
