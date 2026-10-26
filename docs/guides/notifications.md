---
title: Notifications
description: When notifications are sent, who receives them, and the real-time event stream.
---

# Notifications

Notifications are stored in the database and pushed to the browser over a WebSocket (`wss://api.hris.click/ws`). If the real-time connection drops, the app keeps polling the inbox.

## When notifications are sent

| Event | Recipients | Type |
| --- | --- | --- |
| Leave submitted | The line manager (if their position holds `leave.approve_team`) and every `leave.approve_all` holder, except the requester | `leave_approval_needed` |
| Approver reassigned after a structure change | The new line manager (if their position holds `leave.approve_team`) | `leave_approval_needed` |
| Leave decided | The requester, the decider, the assigned approver, and `leave.view_all` holders | `leave_status_changed` |
| New account verified | Every `employee.approve_user` holder | `account_approval_needed` |

## Completed tasks

An approval notification is **marked as read** (not deleted) as soon as its task is complete, for example when someone else decides the request or the requester cancels it. The history is kept, but the unread badge no longer counts it. The browser is updated through the `notification.read` event.

When an approver is reassigned, the previous approver's task is marked as read, unless they hold `leave.approve_all` and therefore can still decide the request.

## WebSocket events

| Event | Payload |
| --- | --- |
| `ready` | Number of unread notifications after authentication |
| `notification.created` | A new notification |
| `notification.read` | IDs marked as read by the system |
| `notification.cleared` | IDs that were deleted |
