---
title: "Issues"
url: https://fleetbase.io/docs/api/fleetbase/issues
module: api
---

# Issues

Issues capture operational problems reported against orders, drivers, vehicles, or other resources. Use issues to track incidents, exceptions, and resolution status during fulfillment.

* [The Issue object](#the-issue-object)
* [Create an Issue

  POST
  `/v1/issues`](#create-an-issue)
* [Query Issues

  GET
  `/v1/issues`](#query-issues)
* [Retrieve an Issue

  GET
  `/v1/issues/:id`](#retrieve-an-issue)
* [Update an Issue

  PUT
  `/v1/issues/:id`](#update-an-issue)
* [Delete an Issue

  DELETE
  `/v1/issues/:id`](#delete-an-issue)

## The Issue object

An issue records a driver- or vehicle-reported operational problem. It includes report text, priority, category, type, status, location, assignee, reporter, and resolution timestamps.

Attributes

`id`

string

optional

Public issue identifier.

`assignee`

object

optional

User assigned to the issue, when loaded.

`reporter`

object

optional

User who reported the issue, when loaded.

`vehicle`

object

optional

Vehicle associated with the issue, when loaded.

`driver`

object

optional

Driver associated with the issue, when loaded.

`issue_id`

string

optional

Human-friendly issue identifier.

`title`

string

optional

Issue title.

`report`

string

optional

Issue report text.

`priority`

string

optional

Issue priority.

`meta`

object

optional

Additional issue metadata.

`type`

string

optional

Issue type.

`category`

string

optional

Issue category.

`tags`

array of strings

optional

Tags associated with the issue.

`status`

string

optional

Issue status.

`location`

object

optional

Location where the issue was reported.

`resolved_at`

timestamp

optional

Timestamp when the issue was resolved.

`updated_at`

timestamp

optional

Timestamp when the issue was last updated.

`created_at`

timestamp

optional

Timestamp when the issue was created.

The
Issue
object

```
{
  "id": "issue_8Qw2YxM3Nf",
  "driver_name": "Alex Driver",
  "vehicle_name": "ABC123",
  "issue_id": "ISS-1001",
  "title": null,
  "report": "Flat tire near the pickup location.",
  "priority": "high",
  "meta": {},
  "type": "vehicle",
  "category": "maintenance",
  "tags": [],
  "status": "open",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "resolved_at": null,
  "updated_at": "2026-05-07T08:30:00.000000Z",
  "created_at": "2026-05-07T08:30:00.000000Z"
}
```

POST
`/v1/issues`

## [Create an Issue](#create-an-issue)

Create an Issue

Body parameters

`driver`

string

required

Driver ID reporting the issue.

`location`

object

required

Location where the issue was reported.

`report`

string

required

Issue report text submitted by the caller.

`category`

string

optional

Category used to classify the issue.

`type`

string

optional

Issue type.

`priority`

string

optional

Priority level for the issue.

POST
`/v1/issues`

curl

JavaScript

PHP

Python

```
curl -X POST https://api.fleetbase.io/v1/issues \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "driver": "{{driver_id}}",
  "location": {
    "latitude": 1.3521,
    "longitude": 103.8198
  },
  "report": "Vehicle tire pressure warning",
  "category": "vehicle",
  "type": "maintenance",
  "priority": "medium",
  "status": "open"
}'
```

GET
`/v1/issues`

## [Query Issues](#query-issues)

Query Issues

Query parameters

`limit`

integer

optional

Maximum number of issues to return.

`offset`

integer

optional

Number of issues to skip before returning results.

`sort`

string

optional

Sort expression for the issue query.

`driver`

string

optional

Filters issues by driver ID.

`vehicle`

string

optional

Filters issues by vehicle ID.

`status`

string

optional

Filters issues by status.

GET
`/v1/issues`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/issues?limit=25&offset=0&sort=created_at \
  -H "Authorization: Bearer flb_live_…"
```

GET
`/v1/issues/:id`

## [Retrieve an Issue](#retrieve-an-issue)

Retrieve an Issue

GET
`/v1/issues/:id`

curl

JavaScript

PHP

Python

```
curl https://api.fleetbase.io/v1/issues/:id \
  -H "Authorization: Bearer flb_live_…"
```

PUT
`/v1/issues/:id`

## [Update an Issue](#update-an-issue)

Update an Issue

Body parameters

`report`

string

required

Issue report text submitted by the caller.

`category`

string

optional

Category used to classify the issue.

`type`

string

optional

Issue type.

`priority`

string

optional

Priority level for the issue.

PUT
`/v1/issues/:id`

curl

JavaScript

PHP

Python

```
curl -X PUT https://api.fleetbase.io/v1/issues/:id \
  -H "Authorization: Bearer flb_live_…" \
  -H "Content-Type: application/json" \
  -d '{
  "report": "Updated issue report",
  "category": "vehicle",
  "type": "maintenance",
  "priority": "high",
  "status": "resolved"
}'
```

DELETE
`/v1/issues/:id`

## [Delete an Issue](#delete-an-issue)

Delete an Issue

DELETE
`/v1/issues/:id`

curl

JavaScript

PHP

Python

```
curl -X DELETE https://api.fleetbase.io/v1/issues/:id \
  -H "Authorization: Bearer flb_live_…"
```
