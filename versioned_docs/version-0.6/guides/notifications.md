---
title: Notifications
description: Notification recipients and known limitations in 0.6.
---

# Notifications

Notifications are stored in the database and pushed to the browser over a WebSocket.

| Event | Recipients |
| --- | --- |
| Leave submitted | The requester's manager (`manager_id`) |
| Leave decided | The requester and `leave.view_all` holders |
| New account verified | Every `employee.approve_user` holder |

:::caution Limitations in 0.6
- Holders of `leave.approve_all`, such as the HR Manager, do not always receive new leave notifications, even though they can decide the requests.
- Approval notifications are **deleted** once a request is decided, so their history is lost.

Both are fixed in 0.7.0: everyone who can decide a request is notified, and completed tasks are marked as read instead of deleted.
:::
