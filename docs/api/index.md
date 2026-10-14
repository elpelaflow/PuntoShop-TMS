---
title: "API Reference"
url: https://fleetbase.io/docs/api
module: api
---

## Introduction

The Fleetbase API is organized around REST. Our API has predictable, resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs. We support cross-origin resource sharing, allowing you to interact securely with our API from a client-side web application — though you should never expose your secret API key in any public website's client-side code.

To make the API as explorable as possible, accounts have
**test mode**
and
**live mode**
API keys. There is no "switch" for changing between modes — use the appropriate key to perform a live or test transaction. Requests made with test mode credentials never hit production data and incur no cost.

### Base URL

```
https://api.fleetbase.io/v1
```

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

## Authentication

The Fleetbase API uses API keys to authenticate requests. You can view and manage your API keys in the
[Developer Console](https://fleetbase.io/docs/platform/developer-console/api-keys)
.

Test mode secret keys have the prefix
`flb_test_`
and live mode secret keys have the prefix
`flb_live_`
. You can also create restricted API keys for granular permissions.

Authenticate by sending your API key as a Bearer token in the
`Authorization`
header:

```
curl https://api.fleetbase.io/v1/orders \
  -H "Authorization: Bearer flb_live_…"
```

Your API keys carry many privileges, so keep them secure. Do not share secret keys in publicly accessible areas such as GitHub repos, client-side code, or chat threads.

## Errors

Fleetbase uses conventional HTTP response codes to indicate the success or failure of an API request:

| Code range | Meaning |
| --- | --- |
| `2xx` | Success |
| `4xx` | Failed given the information provided (missing parameter, validation failure, etc.) |
| `5xx` | An error with Fleetbase's servers (rare) |

When a request fails, the response body contains a single
`error`
field describing what went wrong:

```
{
  "error": "The name field is required."
}
```

The
`error`
value is a human-readable string suitable for surfacing to your end users. The HTTP status code carries the failure category — see the table below.

### Common Status Codes

| Status | Meaning |
| --- | --- |
| `200 OK` | Request succeeded |
| `201 Created` | Resource was created |
| `204 No Content` | Success with no response body (e.g., delete) |
| `400 Bad Request` | Malformed request — check the body |
| `401 Unauthorized` | Missing or invalid API key |
| `403 Forbidden` | API key does not grant access to this resource |
| `404 Not Found` | Resource does not exist |
| `422 Unprocessable Entity` | Validation failed |
| `429 Too Many Requests` | You're being rate-limited |
| `500 Server Error` | Something broke on our end |

## Pagination

List endpoints return a JSON array of records. Pagination is
**request-side**
— pass
`limit`
,
`offset`
, or
`page`
to control the slice of records returned. The response itself doesn't carry pagination metadata; advance pages by issuing follow-up requests with a higher
`offset`
(or
`page`
) until the response array is shorter than
`limit`
.

```
# Offset-based pagination
curl "https://api.fleetbase.io/v1/orders?limit=25&offset=50" \
  -H "Authorization: Bearer flb_live_…"

# Or page-based — page * limit acts as the offset
curl "https://api.fleetbase.io/v1/orders?limit=25&page=3" \
  -H "Authorization: Bearer flb_live_…"
```

| Parameter | Default | Description |
| --- | --- | --- |
| `limit` | 25 | Maximum records per response. Max 100. |
| `offset` | 0 | Number of records to skip from the start of the result set. |
| `page` | 1 | 1-indexed page number. Equivalent to `offset = (page - 1) * limit` . |
| `sort` | `-created_at` | Sort field. Prefix with `-` for descending. |

You've reached the end when a response returns fewer than
`limit`
records.

## Versioning

The current API version is
`v1`
. We don't make breaking changes to a published API version. Backward-incompatible changes ship as a new version (e.g.,
`v2`
) — your integration keeps using
`v1`
until you choose to upgrade.

The version is part of the request URL:

```
https://api.fleetbase.io/v1/orders
```

Non-breaking additions — new endpoints, optional fields, additional response properties, new event types — ship continuously to the current version. Build your client to ignore unknown fields so additions never break it.
