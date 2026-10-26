---
title: API Overview
description: Base URL and the 0.6.1 API reference.
---

# API Overview

| | |
| --- | --- |
| Base URL | `https://api.hris.click/api/v1` |
| Format | JSON; file uploads use `multipart/form-data` |
| Reference | [Open the 0.6.1 API reference](pathname:///api/?v=0.6.1) |

The in-app API documentation (OpenAPI and Swagger) was introduced in 0.6.0 for holders of `system.view_api_docs`.

## Differences from 0.7

- `GET /org/tree`, `GET /employees/:id/line-manager`, `GET /positions/:id/line-manager`, and `GET /auth/verification-code` do not exist.
- `POST /positions` does not require `department_id`, and position codes are unique across the company.
- `GET /health` does not include `version`.
